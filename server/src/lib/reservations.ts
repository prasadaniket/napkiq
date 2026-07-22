import { prisma } from './prisma'
import type { Prisma, ReservationStatus } from '../../generated/prisma'

// ─── Table reservation service ──────────────────────────────────────────────────
//
// Shared by the public customer routes (/api/reservations) and the CMS staff routes
// (/api/cms/reservations). Owns availability math and the BookMyShow-style hold →
// confirm flow. A table is offered for a slot only when it seats the party and has no
// overlapping active reservation; the hold takes a row lock so two guests can never
// grab the same table for overlapping time.

/** Thrown for client-correctable problems; routes translate this to a 4xx response. */
export class ReservationError extends Error {
  status: number
  constructor(message: string, status = 400) {
    super(message)
    this.name = 'ReservationError'
    this.status = status
  }
}

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000

// Statuses that occupy a table (block the slot). Held is only blocking while its
// hold is still alive — expired holds are filtered out by holdExpiresAt.
const BLOCKING_STATUSES: ReservationStatus[] = ['held', 'confirmed', 'seated']

// ─── Time helpers (all outlets are IST) ─────────────────────────────────────────

/** Build the UTC instant for an IST wall-clock date + time, e.g. ("2026-07-10","19:30"). */
export function istToUtc(dateStr: string, timeStr: string): Date {
  const d = new Date(`${dateStr}T${timeStr}:00.000+05:30`)
  if (isNaN(d.getTime())) throw new ReservationError('Invalid date or time')
  return d
}

/** IST wall-clock "HH:mm" for a UTC instant. */
export function utcToIstTime(d: Date): string {
  return new Date(d.getTime() + IST_OFFSET_MS).toISOString().slice(11, 16)
}

/** IST calendar day ("YYYY-MM-DD") for a UTC instant. */
export function istDateStr(d: Date = new Date()): string {
  return new Date(d.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10)
}

function minutesFromHHmm(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
function hhmmFromMinutes(mins: number): string {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

// ─── Booking code ───────────────────────────────────────────────────────────────

// Human-friendly, unambiguous alphabet (no 0/O/1/I). A fresh code per confirmed
// booking — the "unique customer number" sent to the guest over WhatsApp.
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
export function generateBookingCode(): string {
  let code = 'NQ'
  for (let i = 0; i < 6; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
  }
  return code
}

// ─── Overlap ────────────────────────────────────────────────────────────────────

/** Do [aStart, aStart+aDur) and [bStart, bStart+bDur) intersect? */
function overlaps(aStart: Date, aDur: number, bStart: Date, bDur: number): boolean {
  const aEnd = aStart.getTime() + aDur * 60_000
  const bEnd = bStart.getTime() + bDur * 60_000
  return aStart.getTime() < bEnd && bStart.getTime() < aEnd
}

/** Flip lapsed holds to `expired` so they stop blocking slots (called before reads). */
export async function expireStaleHolds(outletId?: string): Promise<void> {
  await prisma.reservation.updateMany({
    where: {
      status: 'held',
      holdExpiresAt: { lt: new Date() },
      ...(outletId ? { outletId } : {}),
    },
    data: { status: 'expired' },
  })
}

// ─── Slots ──────────────────────────────────────────────────────────────────────

export interface OutletReservationConfig {
  reservationOpenTime: string | null
  reservationCloseTime: string | null
  reservationSlotMinutes: number
  reservationDurationMinutes: number
}

/**
 * Generate the bookable slot start times (IST "HH:mm") for a date. Slots run from
 * open → (close − duration) so a booking always fits before closing. When the date
 * is today, past slots are dropped.
 */
export function generateSlots(dateStr: string, cfg: OutletReservationConfig): string[] {
  const open = cfg.reservationOpenTime ?? '11:00'
  const close = cfg.reservationCloseTime ?? '23:00'
  const step = Math.max(15, cfg.reservationSlotMinutes || 60)
  const duration = cfg.reservationDurationMinutes || 90

  const startMin = minutesFromHHmm(open)
  const lastMin = minutesFromHHmm(close) - duration
  if (lastMin < startMin) return []

  const isToday = dateStr === istDateStr()
  const nowMin = isToday ? minutesFromHHmm(utcToIstTime(new Date())) : -1

  const slots: string[] = []
  for (let m = startMin; m <= lastMin; m += step) {
    if (m <= nowMin) continue // don't offer slots already past today
    slots.push(hhmmFromMinutes(m))
  }
  return slots
}

// ─── Availability ───────────────────────────────────────────────────────────────

export interface AvailableTable {
  id: string
  name: string
  capacity: number
  zone: string
  posX: number | null
  posY: number | null
  shape: string
}

/**
 * Tables at an outlet that can seat the party for a given slot: active, capacity ≥
 * partySize, and no overlapping active reservation. Reads the day's reservations once
 * and computes overlap in JS (volume is small per outlet-day).
 */
// A blocking reservation may occupy several tables (a combined large-party booking):
// its PRIMARY table plus any `additionalTables`. All of them are busy for the window.
type BlockingReservation = {
  tableId: string
  reservedAt: Date
  durationMinutes: number
  status: ReservationStatus
  holdExpiresAt: Date | null
  additionalTables?: { tableId: string }[]
}

const BLOCKING_SELECT = {
  tableId: true, reservedAt: true, durationMinutes: true, status: true, holdExpiresAt: true,
  additionalTables: { select: { tableId: true } },
} as const

/** Table ids blocked by an overlapping active reservation for the requested window. */
function busyTableIds(reservations: BlockingReservation[], reservedAt: Date, durationMinutes: number): Set<string> {
  const now = Date.now()
  const busy = new Set<string>()
  for (const r of reservations) {
    // A held row past its expiry no longer blocks (expireStaleHolds may race).
    if (r.status === 'held' && r.holdExpiresAt && r.holdExpiresAt.getTime() <= now) continue
    if (!overlaps(reservedAt, durationMinutes, r.reservedAt, r.durationMinutes)) continue
    busy.add(r.tableId)
    for (const at of r.additionalTables ?? []) busy.add(at.tableId)
  }
  return busy
}

export async function availableTablesForSlot(opts: {
  outletId: string
  reservedAt: Date
  durationMinutes: number
  partySize: number
  excludeReservationId?: string
}): Promise<AvailableTable[]> {
  await expireStaleHolds(opts.outletId)
  const dayStart = istToUtc(istDateStr(opts.reservedAt), '00:00')
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60_000)

  const [tables, reservations] = await Promise.all([
    prisma.restaurantTable.findMany({
      where: { outletId: opts.outletId, isActive: true, isBlocked: false, capacity: { gte: opts.partySize } },
      orderBy: [{ zone: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
      select: { id: true, name: true, capacity: true, zone: true, posX: true, posY: true, shape: true },
    }),
    prisma.reservation.findMany({
      where: {
        outletId: opts.outletId, status: { in: BLOCKING_STATUSES },
        reservedAt: { gte: dayStart, lt: dayEnd },
        ...(opts.excludeReservationId ? { id: { not: opts.excludeReservationId } } : {}),
      },
      select: BLOCKING_SELECT,
    }),
  ])

  const busy = busyTableIds(reservations, opts.reservedAt, opts.durationMinutes)
  return tables
    .filter((t) => !busy.has(t.id))
    .map((t) => ({ id: t.id, name: t.name, capacity: t.capacity, zone: t.zone as string, posX: t.posX, posY: t.posY, shape: t.shape as string }))
}

export interface MapTable extends AvailableTable {
  available: boolean
  blocked: boolean
}

export interface SlotMap {
  tables: MapTable[]
  bestTableId: string | null  // smallest single free table that alone seats the party
  maxCapacity: number         // largest single table (helps the client decide single vs combine)
  seatsFree: number           // total seats across all free tables
  canSeat: boolean            // party can be seated (single or by combining free tables)
}

/**
 * Every active table for a slot, each flagged available or taken — powers the
 * BookMyShow-style visual floor map. Since a large party may combine tables, ALL
 * active tables are returned (not just those that fit alone). `bestTableId` is the
 * smallest single table that fits; `canSeat` is true when the free tables' seats
 * (single or combined) cover the party.
 */
export async function tableMapForSlot(opts: {
  outletId: string
  reservedAt: Date
  durationMinutes: number
  partySize: number
  skipExpire?: boolean
}): Promise<SlotMap> {
  if (!opts.skipExpire) await expireStaleHolds(opts.outletId)

  const dayStart = istToUtc(istDateStr(opts.reservedAt), '00:00')
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60_000)

  const [tables, reservations] = await Promise.all([
    prisma.restaurantTable.findMany({
      where: { outletId: opts.outletId, isActive: true },
      orderBy: [{ zone: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
      select: { id: true, name: true, capacity: true, zone: true, isBlocked: true, posX: true, posY: true, shape: true },
    }),
    prisma.reservation.findMany({
      where: { outletId: opts.outletId, status: { in: BLOCKING_STATUSES }, reservedAt: { gte: dayStart, lt: dayEnd } },
      select: BLOCKING_SELECT,
    }),
  ])

  const busy = busyTableIds(reservations, opts.reservedAt, opts.durationMinutes)
  const mapped: MapTable[] = tables.map((t) => ({
    id: t.id, name: t.name, capacity: t.capacity, zone: t.zone as string,
    posX: t.posX, posY: t.posY, shape: t.shape as string,
    blocked: t.isBlocked,
    available: !t.isBlocked && !busy.has(t.id),
  }))

  let bestTableId: string | null = null
  let bestCap = Infinity
  let seatsFree = 0
  let maxCapacity = 0
  for (const t of mapped) {
    maxCapacity = Math.max(maxCapacity, t.capacity)
    if (!t.available) continue
    seatsFree += t.capacity
    if (t.capacity >= opts.partySize && t.capacity < bestCap) { bestCap = t.capacity; bestTableId = t.id }
  }

  return { tables: mapped, bestTableId, maxCapacity, seatsFree, canSeat: seatsFree >= opts.partySize }
}

// ─── Hold (BookMyShow-style lock) ───────────────────────────────────────────────

export interface HoldInput {
  outletId: string
  tableIds: string[] // one or more; the first is the PRIMARY table. Combine several for a large party.
  reservedAt: Date
  durationMinutes: number
  holdMinutes: number
  partySize: number
  joinRequested?: boolean
  deviceId?: string | null
  customerId?: string | null
  source: 'customer' | 'staff'
  createdById?: string | null
  // Staff walk-in bookings pass guest details up front (no separate confirm step).
  guest?: { name: string; phone: string; email?: string | null; specialRequests?: string | null; occasion?: string | null; dietaryNotes?: string | null }
}

const HOLD_INCLUDE = {
  table: { select: { name: true, zone: true, capacity: true } },
  additionalTables: { include: { table: { select: { name: true, zone: true, capacity: true } } } },
} as const

/**
 * Atomically place a hold on one OR MORE tables for a slot (a large party may combine
 * tables). Locks every chosen table row FOR UPDATE in a stable order (deadlock-safe),
 * re-checks that none overlaps an existing booking, and that their combined seats cover
 * the party. Returns the held reservation with its full table set.
 */
export async function holdTable(input: HoldInput) {
  const ids = [...new Set(input.tableIds)]
  if (ids.length === 0) throw new ReservationError('Please pick a table')
  if (ids.length > 6) throw new ReservationError('A booking can combine at most 6 tables', 400)
  const holdExpiresAt = new Date(Date.now() + Math.max(2, input.holdMinutes) * 60_000)
  const sorted = ids.slice().sort() // stable lock order across concurrent holds

  return prisma.$transaction(async (tx) => {
    // Serialise holds on each chosen table through its row lock (sorted → deadlock-safe).
    for (const id of sorted) {
      await tx.$queryRaw`SELECT id FROM restaurant_tables WHERE id = ${id}::uuid FOR UPDATE`
    }

    const tables = await tx.restaurantTable.findMany({
      where: { id: { in: ids }, outletId: input.outletId, isActive: true },
      select: { id: true, capacity: true, isBlocked: true },
    })
    if (tables.length !== ids.length) throw new ReservationError('One or more tables are not available', 404)
    if (tables.some((t) => t.isBlocked)) throw new ReservationError('A selected table is temporarily unavailable', 409)
    const totalCapacity = tables.reduce((s, t) => s + t.capacity, 0)
    if (totalCapacity < input.partySize) {
      throw new ReservationError('The selected tables cannot seat your whole party', 409)
    }

    // Re-check overlap inside the lock against the freshest data (incl. combined bookings).
    const dayStart = istToUtc(istDateStr(input.reservedAt), '00:00')
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60_000)
    const existing = await tx.reservation.findMany({
      where: { outletId: input.outletId, status: { in: BLOCKING_STATUSES }, reservedAt: { gte: dayStart, lt: dayEnd } },
      select: BLOCKING_SELECT,
    })
    const busy = busyTableIds(existing, input.reservedAt, input.durationMinutes)
    if (ids.some((id) => busy.has(id))) {
      throw new ReservationError('Sorry, one of those tables was just taken. Please choose again.', 409)
    }

    const [primary, ...extras] = ids
    const data: Prisma.ReservationUncheckedCreateInput = {
      outletId: input.outletId,
      tableId: primary,
      joinRequested: input.joinRequested ?? (extras.length > 0),
      customerId: input.customerId ?? null,
      deviceId: input.deviceId ?? null,
      partySize: input.partySize,
      reservedAt: input.reservedAt,
      durationMinutes: input.durationMinutes,
      source: input.source,
      createdById: input.createdById ?? null,
      // Placeholder until confirmed; a real code is minted on confirm.
      bookingCode: `HOLD-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      status: 'held',
      holdExpiresAt,
      guestName: input.guest?.name ?? 'Guest',
      guestPhone: input.guest?.phone ?? '',
      guestEmail: input.guest?.email ?? null,
      specialRequests: input.guest?.specialRequests ?? null,
      occasion: input.guest?.occasion ?? null,
      dietaryNotes: input.guest?.dietaryNotes ?? null,
      additionalTables: extras.length > 0 ? { create: extras.map((tableId) => ({ tableId })) } : undefined,
    }

    return tx.reservation.create({ data, include: HOLD_INCLUDE })
  })
}

// ─── Confirm ────────────────────────────────────────────────────────────────────

export interface ConfirmInput {
  reservationId: string
  deviceId?: string | null // customer confirm must match the holding device
  guestName: string
  guestPhone: string
  guestEmail?: string | null
  specialRequests?: string | null
  occasion?: string | null
  dietaryNotes?: string | null
  customerId?: string | null
}

/** Finalise a held reservation → confirmed, minting a fresh booking code. */
export async function confirmReservation(input: ConfirmInput) {
  const existing = await prisma.reservation.findUnique({
    where: { id: input.reservationId },
    select: { id: true, status: true, deviceId: true, holdExpiresAt: true },
  })
  if (!existing) throw new ReservationError('Reservation not found', 404)

  if (existing.status === 'confirmed') {
    // Idempotent: a double-submit just returns the confirmed reservation.
    return prisma.reservation.findUnique({
      where: { id: existing.id },
      include: {
        table: { select: { name: true, zone: true, capacity: true } },
        additionalTables: { include: { table: { select: { name: true, zone: true, capacity: true } } } },
        outlet: { select: { name: true } },
      },
    })
  }
  if (existing.status !== 'held') {
    throw new ReservationError('This reservation can no longer be confirmed', 409)
  }
  if (existing.holdExpiresAt && existing.holdExpiresAt.getTime() <= Date.now()) {
    throw new ReservationError('Your hold expired. Please start again.', 409)
  }
  if (input.deviceId && existing.deviceId && existing.deviceId !== input.deviceId) {
    throw new ReservationError('Not permitted', 403)
  }

  // Retry on the rare booking-code collision (@unique).
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return await prisma.reservation.update({
        where: { id: existing.id },
        data: {
          status: 'confirmed',
          confirmedAt: new Date(),
          holdExpiresAt: null,
          bookingCode: generateBookingCode(),
          guestName: input.guestName,
          guestPhone: input.guestPhone,
          guestEmail: input.guestEmail ?? null,
          specialRequests: input.specialRequests ?? null,
          occasion: input.occasion ?? undefined,
          dietaryNotes: input.dietaryNotes ?? undefined,
          customerId: input.customerId ?? undefined,
        },
        include: {
        table: { select: { name: true, zone: true, capacity: true } },
        additionalTables: { include: { table: { select: { name: true, zone: true, capacity: true } } } },
        outlet: { select: { name: true } },
      },
      })
    } catch (err) {
      if ((err as { code?: string }).code === 'P2002' && attempt < 4) continue
      throw err
    }
  }
  throw new ReservationError('Could not confirm reservation, please retry', 500)
}

// ─── Floor state (CMS live floor view) ──────────────────────────────────────────

export type FloorStatus = 'available' | 'reserved' | 'occupied' | 'blocked'

export interface FloorTable {
  id: string
  name: string
  capacity: number
  zone: string
  posX: number | null
  posY: number | null
  shape: string
  isBlocked: boolean
  blockReason: string | null
  status: FloorStatus
  // The reservation that defines the tile's state (seated now, or the next booking today).
  current: {
    id: string
    guestName: string
    partySize: number
    reservedAt: Date
    status: ReservationStatus
    bookingCode: string
    joinRequested: boolean
    tableCount: number // how many tables this booking spans (>1 = combined)
  } | null
  upcomingCount: number // remaining confirmed bookings on this table today
}

/**
 * Per-table live state for an outlet's floor view (Petpooja-style). Occupied = a
 * seated booking whose window covers now; Reserved = an upcoming/active confirmed
 * booking not yet seated; Blocked = manually out of service; else Available.
 */
export async function getFloorState(outletId: string): Promise<FloorTable[]> {
  await expireStaleHolds(outletId)

  const now = new Date()
  const dayStart = istToUtc(istDateStr(now), '00:00')
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60_000)

  const [tables, reservations] = await Promise.all([
    prisma.restaurantTable.findMany({
      where: { outletId, isActive: true },
      orderBy: [{ zone: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
      select: { id: true, name: true, capacity: true, zone: true, isBlocked: true, blockReason: true, posX: true, posY: true, shape: true },
    }),
    prisma.reservation.findMany({
      where: { outletId, status: { in: ['confirmed', 'seated'] }, reservedAt: { gte: dayStart, lt: dayEnd } },
      orderBy: { reservedAt: 'asc' },
      select: {
        id: true, tableId: true, guestName: true, partySize: true, reservedAt: true, durationMinutes: true,
        status: true, bookingCode: true, joinRequested: true,
        additionalTables: { select: { tableId: true } },
      },
    }),
  ])

  // A combined booking appears on every one of its tables (primary + additional).
  const byTable = new Map<string, typeof reservations>()
  for (const r of reservations) {
    for (const tid of [r.tableId, ...r.additionalTables.map((a) => a.tableId)]) {
      const arr = byTable.get(tid) ?? []
      arr.push(r)
      byTable.set(tid, arr)
    }
  }
  const nowMs = now.getTime()

  return tables.map((t) => {
    const rows = byTable.get(t.id) ?? []
    const seatedNow = rows.find((r) => r.status === 'seated' &&
      nowMs >= r.reservedAt.getTime() - 30 * 60_000 &&
      nowMs < r.reservedAt.getTime() + r.durationMinutes * 60_000)
    const upcoming = rows.filter((r) => r.status === 'confirmed' && r.reservedAt.getTime() + r.durationMinutes * 60_000 > nowMs)
    const anySeated = rows.find((r) => r.status === 'seated')

    let status: FloorStatus = 'available'
    let current: FloorTable['current'] = null
    if (t.isBlocked) {
      status = 'blocked'
    } else if (seatedNow || anySeated) {
      status = 'occupied'
      const s = seatedNow ?? anySeated!
      current = { id: s.id, guestName: s.guestName, partySize: s.partySize, reservedAt: s.reservedAt, status: s.status, bookingCode: s.bookingCode, joinRequested: s.joinRequested, tableCount: s.additionalTables.length + 1 }
    } else if (upcoming.length > 0) {
      status = 'reserved'
      const s = upcoming[0]
      current = { id: s.id, guestName: s.guestName, partySize: s.partySize, reservedAt: s.reservedAt, status: s.status, bookingCode: s.bookingCode, joinRequested: s.joinRequested, tableCount: s.additionalTables.length + 1 }
    }

    return {
      id: t.id, name: t.name, capacity: t.capacity, zone: t.zone as string,
      posX: t.posX, posY: t.posY, shape: t.shape as string,
      isBlocked: t.isBlocked, blockReason: t.blockReason,
      status, current, upcomingCount: upcoming.length,
    }
  })
}

// ─── Seating guard ──────────────────────────────────────────────────────────────

export interface SeatingConflict {
  guestName: string
  bookingCode: string
  tableName: string
}

/**
 * A physical table can hold only ONE seated party at a time. Two bookings may share
 * a table across the day (e.g. 5pm and 7pm) — that's fine — but the earlier party must
 * be Completed/Cancelled before the next is seated. Returns the blocking booking when
 * any of the reservation's tables (primary + combined) is already seated, else null.
 */
export async function findSeatingConflict(reservationId: string): Promise<SeatingConflict | null> {
  const target = await prisma.reservation.findUnique({
    where: { id: reservationId },
    select: { outletId: true, tableId: true, additionalTables: { select: { tableId: true } } },
  })
  if (!target) return null

  const tableIds = [target.tableId, ...target.additionalTables.map((a) => a.tableId)]

  const clash = await prisma.reservation.findFirst({
    where: {
      outletId: target.outletId,
      status: 'seated',
      id: { not: reservationId },
      OR: [
        { tableId: { in: tableIds } },
        { additionalTables: { some: { tableId: { in: tableIds } } } },
      ],
    },
    select: {
      guestName: true,
      bookingCode: true,
      table: { select: { id: true, name: true } },
      additionalTables: { select: { tableId: true, table: { select: { name: true } } } },
    },
  })
  if (!clash) return null

  // Name the exact shared table so staff know which seat to clear first.
  const targetSet = new Set(tableIds)
  const clashTables = [
    { id: clash.table?.id, name: clash.table?.name },
    ...clash.additionalTables.map((a) => ({ id: a.tableId, name: a.table?.name })),
  ]
  const shared = clashTables.find((t) => t.id && targetSet.has(t.id))
  return {
    guestName: clash.guestName,
    bookingCode: clash.bookingCode,
    tableName: shared?.name ?? clash.table?.name ?? 'that table',
  }
}

// ─── Reminders & no-show sweep (called by the automation worker) ─────────────────

export interface SweepResult { remindersSent: number; noShows: number }

/**
 * One pass for the reservation cron: send a WhatsApp reminder for confirmed bookings
 * starting within `remindWithinMinutes`, and flip long-overdue un-seated bookings to
 * no_show. `sendReminder` is injected to keep this module free of the notifications dep.
 */
export async function sweepReservations(opts: {
  remindWithinMinutes?: number
  noShowAfterMinutes?: number
  sendReminder: (r: {
    guestPhone: string; guestName: string; outletName: string
    tableName: string; zone: string; partySize: number; reservedAt: Date; bookingCode: string
  }) => Promise<boolean>
}): Promise<SweepResult> {
  const remindWithin = opts.remindWithinMinutes ?? 120
  const noShowAfter = opts.noShowAfterMinutes ?? 30
  const now = Date.now()

  // ── Reminders ──
  const dueForReminder = await prisma.reservation.findMany({
    where: {
      status: 'confirmed',
      reminderSentAt: null,
      reservedAt: { gte: new Date(now), lte: new Date(now + remindWithin * 60_000) },
    },
    include: { table: { select: { name: true, zone: true } }, outlet: { select: { name: true } } },
    take: 200,
  })
  let remindersSent = 0
  for (const r of dueForReminder) {
    const ok = await opts.sendReminder({
      guestPhone: r.guestPhone, guestName: r.guestName, outletName: r.outlet?.name ?? 'Napkiq',
      tableName: r.table?.name ?? '', zone: (r.table?.zone as string) ?? '',
      partySize: r.partySize, reservedAt: r.reservedAt, bookingCode: r.bookingCode,
    })
    if (ok) {
      await prisma.reservation.update({ where: { id: r.id }, data: { reminderSentAt: new Date() } })
      remindersSent++
    }
  }

  // ── No-show: confirmed, never seated, well past the start time ──
  const noShow = await prisma.reservation.updateMany({
    where: { status: 'confirmed', reservedAt: { lt: new Date(now - noShowAfter * 60_000) } },
    data: { status: 'no_show' },
  })

  return { remindersSent, noShows: noShow.count }
}
