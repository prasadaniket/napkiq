import { prisma } from './prisma'
import { emitOrderEvent } from './orderEvents'
import { emitReservationEvent } from './reservationEvents'
import { getFloorState, type FloorTable } from './reservations'
import type { OrderStatus, PaymentMethod, SessionStatus } from '../../generated/prisma'

// ─── Table session (POS running tab) service ────────────────────────────────────
//
// A TableSession is one dine-in table's running tab: opened when a party sits (walk-in
// or from a reservation), orders attach as rounds are placed, and it is settled once
// with a single payment method. The running total is always derived server-side from
// the orders' item price snapshots — the client never sends money amounts.
//
// Invariant: at most ONE open/billed session per table at a time. Enforced in
// openSession() (checked before create) since it can't be expressed as a Prisma
// unique constraint.

/** Thrown for client-correctable problems; routes translate this to a 4xx response. */
export class SessionError extends Error {
  status: number
  constructor(message: string, status = 400) {
    super(message)
    this.name = 'SessionError'
    this.status = status
  }
}

// Sessions that still hold the table (block a second open). Settled/cancelled are done.
const LIVE_SESSION_STATUSES: SessionStatus[] = ['open', 'billed']
// Order statuses still live on the kitchen board.
const ACTIVE_ORDER_STATUSES: OrderStatus[] = ['new', 'preparing', 'ready']

// What we need from a session's orders to price the tab + summarise kitchen state.
const TAB_INCLUDE = {
  orders: {
    orderBy: { createdAt: 'asc' },
    include: { items: true },
  },
} as const

type OrderWithItems = {
  status: OrderStatus
  items: { priceSnapshot: unknown; quantity: number }[]
}

/** Running total across a session's non-cancelled orders (item price × qty). */
export function computeSessionTotal(orders: OrderWithItems[]): number {
  let total = 0
  for (const o of orders) {
    if (o.status === 'cancelled') continue
    for (const it of o.items) {
      if (it.priceSnapshot != null) total += Number(it.priceSnapshot) * it.quantity
    }
  }
  return total
}

/** Coarsest live kitchen state for the tab's orders (drives the floor tile dot). */
export function kitchenState(orders: { status: OrderStatus }[]): 'preparing' | 'ready' | 'served' | null {
  const active = orders.filter((o) => ACTIVE_ORDER_STATUSES.includes(o.status))
  if (active.length === 0) {
    // No live orders: served if anything was fulfilled, else nothing sent yet.
    return orders.some((o) => o.status === 'served') ? 'served' : null
  }
  if (active.some((o) => o.status === 'new' || o.status === 'preparing')) return 'preparing'
  return 'ready' // all remaining active orders are ready
}

/** Shape a raw session (with orders+items) into the tab payload the CMS drawer reads. */
export function shapeTab(session: any) {
  const total = computeSessionTotal(session.orders)
  return {
    ...session,
    total,
    orderCount: session.orders.filter((o: OrderWithItems) => o.status !== 'cancelled').length,
    kitchenState: kitchenState(session.orders),
  }
}

// ─── Open ──────────────────────────────────────────────────────────────────────

export interface OpenSessionInput {
  outletId: string
  tableId: string
  reservationId?: string | null
  partySize?: number | null
  openedById?: string | null
}

/**
 * Open a running tab for a table. Rejects (409) if the table already has a live
 * (open/billed) session. When the seating came from a booking, the reservation is
 * flipped to `seated` so the two views stay in agreement.
 */
export async function openSession(input: OpenSessionInput) {
  const table = await prisma.restaurantTable.findFirst({
    where: { id: input.tableId, outletId: input.outletId },
    select: { id: true },
  })
  if (!table) throw new SessionError('Table not found for this outlet', 404)

  const existing = await prisma.tableSession.findFirst({
    where: { tableId: input.tableId, status: { in: LIVE_SESSION_STATUSES } },
    select: { id: true },
  })
  if (existing) throw new SessionError('This table already has an open tab', 409)

  const session = await prisma.tableSession.create({
    data: {
      outletId:      input.outletId,
      tableId:       input.tableId,
      reservationId: input.reservationId ?? null,
      partySize:     input.partySize ?? null,
      openedById:    input.openedById ?? null,
    },
    include: TAB_INCLUDE,
  })

  // If seated from a booking, reflect that on the reservation (best-effort).
  if (input.reservationId) {
    await prisma.reservation
      .updateMany({
        where: { id: input.reservationId, status: { in: ['confirmed', 'seated'] } },
        data: { status: 'seated' },
      })
      .catch(() => {})
  }

  emitReservationEvent(input.outletId, { type: 'table' }) // floor refetch
  return shapeTab(session)
}

// ─── Settle ──────────────────────────────────────────────────────────────────────

/**
 * Settle a running tab: record the single payment method + total snapshot, mark every
 * still-active order `served`, complete any linked reservation, and free the table.
 */
export async function settleSession(sessionId: string, paymentMethod: PaymentMethod, settledById?: string | null) {
  const session = await prisma.tableSession.findUnique({
    where: { id: sessionId },
    include: TAB_INCLUDE,
  })
  if (!session) throw new SessionError('Session not found', 404)
  if (session.status === 'settled') throw new SessionError('This tab is already settled', 409)
  if (session.status === 'cancelled') throw new SessionError('This tab was cancelled', 409)

  const total = computeSessionTotal(session.orders)
  const now = new Date()

  // Fulfil any orders still on the board — a paid tab means the food is out.
  const activeOrders = session.orders.filter((o) => ACTIVE_ORDER_STATUSES.includes(o.status))
  for (const o of activeOrders) {
    const updated = await prisma.order.update({
      where: { id: o.id },
      data: { status: 'served', closedAt: now },
      include: { items: true },
    })
    emitOrderEvent(session.outletId, { type: 'status', order: updated }) // drop from KDS board
  }

  const settled = await prisma.tableSession.update({
    where: { id: session.id },
    data: {
      status:        'settled',
      paymentMethod,
      paidAmount:    total,
      settledById:   settledById ?? null,
      settledAt:     now,
      closedAt:      now,
    },
    include: TAB_INCLUDE,
  })

  // Complete the linked booking so the floor frees the table.
  if (session.reservationId) {
    await prisma.reservation
      .updateMany({ where: { id: session.reservationId, status: 'seated' }, data: { status: 'completed' } })
      .catch(() => {})
  }

  emitReservationEvent(session.outletId, { type: 'table' })
  return shapeTab(settled)
}

// ─── Cancel (void) ───────────────────────────────────────────────────────────────

/** Void a tab (comp / opened by mistake): cancels the session and its live orders. */
export async function cancelSession(sessionId: string, cancelledById?: string | null) {
  const session = await prisma.tableSession.findUnique({
    where: { id: sessionId },
    include: TAB_INCLUDE,
  })
  if (!session) throw new SessionError('Session not found', 404)
  if (session.status === 'settled') throw new SessionError('A settled tab cannot be cancelled', 409)
  if (session.status === 'cancelled') return shapeTab(session)

  const now = new Date()
  const activeOrders = session.orders.filter((o) => ACTIVE_ORDER_STATUSES.includes(o.status))
  for (const o of activeOrders) {
    const updated = await prisma.order.update({
      where: { id: o.id },
      data: { status: 'cancelled', cancelledBy: 'staff', closedAt: now },
      include: { items: true },
    })
    emitOrderEvent(session.outletId, { type: 'status', order: updated })
  }

  const cancelled = await prisma.tableSession.update({
    where: { id: session.id },
    data: { status: 'cancelled', settledById: cancelledById ?? null, closedAt: now },
    include: TAB_INCLUDE,
  })

  emitReservationEvent(session.outletId, { type: 'table' })
  return shapeTab(cancelled)
}

// ─── Lookups ─────────────────────────────────────────────────────────────────────

/** The live (open/billed) tab for a table, priced — or null if the table is free. */
export async function getLiveTabForTable(outletId: string, tableId: string) {
  const session = await prisma.tableSession.findFirst({
    where: { outletId, tableId, status: { in: LIVE_SESSION_STATUSES } },
    orderBy: { openedAt: 'desc' },
    include: TAB_INCLUDE,
  })
  return session ? shapeTab(session) : null
}

/** A single session by id, priced. */
export async function getSessionById(sessionId: string) {
  const session = await prisma.tableSession.findUnique({ where: { id: sessionId }, include: TAB_INCLUDE })
  return session ? shapeTab(session) : null
}

// ─── POS floor (reservation floor + billing overlay) ─────────────────────────────

export interface PosFloorTable extends FloorTable {
  // The live tab on this table, if any. An open tab makes a table `occupied` even when
  // there's no reservation (walk-ins) — the one thing pure-reservation floor can't show.
  session: {
    id: string
    status: SessionStatus
    total: number
    orderCount: number
    kitchenState: 'preparing' | 'ready' | 'served' | null
  } | null
}

/**
 * The reservation floor with a billing overlay. Reuses getFloorState() unchanged, then
 * attaches each table's live tab. A table with a live tab reads as `occupied` (billing),
 * so walk-in tabs appear alongside reservation-driven occupancy.
 */
export async function buildPosFloor(outletId: string): Promise<PosFloorTable[]> {
  const [floor, sessions] = await Promise.all([
    getFloorState(outletId),
    prisma.tableSession.findMany({
      where: { outletId, status: { in: LIVE_SESSION_STATUSES } },
      include: TAB_INCLUDE,
    }),
  ])

  const byTable = new Map<string, (typeof sessions)[number]>()
  for (const s of sessions) byTable.set(s.tableId, s) // one live session per table (invariant)

  return floor.map((t) => {
    const s = byTable.get(t.id)
    if (!s) return { ...t, session: null }
    return {
      ...t,
      // A live tab occupies the table (unless it's manually blocked).
      status: t.isBlocked ? t.status : 'occupied',
      session: {
        id: s.id,
        status: s.status,
        total: computeSessionTotal(s.orders),
        orderCount: s.orders.filter((o) => o.status !== 'cancelled').length,
        kitchenState: kitchenState(s.orders),
      },
    }
  })
}
