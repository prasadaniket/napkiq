import { randomUUID } from 'crypto'
import { prisma } from './prisma'
import { emitOrderEvent } from './orderEvents'

// ─── Business day + daily token numbers ─────────────────────────────────────────

/**
 * The current business date as a `YYYY-MM-DD` string in IST (UTC+5:30).
 * All Napkiq outlets are in India, so the daily token sequence rolls over at
 * IST midnight (Domino's-style), regardless of where the server runs (UTC on Render).
 */
export function istBusinessDate(now: Date = new Date()): string {
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000)
  return ist.toISOString().slice(0, 10)
}

/**
 * Atomically allocate the next per-outlet token number for the given business day.
 * A single `INSERT … ON CONFLICT DO UPDATE … RETURNING` is race-safe under concurrent
 * orders — Postgres serialises the upsert, so no two orders share a number. A new day
 * has no row yet, so its first order gets 1 (the sequence resets daily).
 */
async function nextDailyNumber(outletId: string, dateStr: string): Promise<number> {
  // Column identifiers are camelCase (Prisma only maps the table name, not columns),
  // so they must be double-quoted in raw SQL.
  const rows = await prisma.$queryRaw<{ last_number: number }[]>`
    INSERT INTO order_counters (id, "outletId", "date", "lastNumber")
    VALUES (${randomUUID()}::uuid, ${outletId}::uuid, ${dateStr}::date, 1)
    ON CONFLICT ("outletId", "date")
    DO UPDATE SET "lastNumber" = order_counters."lastNumber" + 1
    RETURNING "lastNumber" AS last_number;
  `
  return rows[0].last_number
}

// ─── Shared order creation ──────────────────────────────────────────────────────
//
// Used by both the public customer route (POST /api/orders) and the staff CMS route
// (POST /api/cms/orders). Prices/names are snapshotted server-side from the DB — the
// client's prices are never trusted. On success the new order is broadcast to the KDS.

/** Thrown for client-correctable problems; routes translate this to a 4xx response. */
export class OrderValidationError extends Error {
  status: number
  constructor(message: string, status = 400) {
    super(message)
    this.name = 'OrderValidationError'
    this.status = status
  }
}

export interface CreateOrderInput {
  outletId: string
  customerId?: string | null
  deviceId?: string | null
  createdById?: string | null
  source: 'customer' | 'staff'
  serviceType: 'table' | 'self'
  boardNumber?: string | null
  tableId?: string | null    // real RestaurantTable (dine-in); null for self-service
  sessionId?: string | null  // the running tab (TableSession) this order belongs to
  note?: string | null
  items: { menuItemId: string; quantity: number; variantLabel?: string | null; note?: string | null }[]
}

export async function createOrderWithItems(input: CreateOrderInput) {
  if (input.items.length === 0) {
    throw new OrderValidationError('Order must contain at least one item')
  }

  // Snapshot name/price from the DB, and confirm every item belongs to this outlet
  // (menu items are scoped per-outlet via their category).
  const menuItemIds = [...new Set(input.items.map((i) => i.menuItemId))]
  const menuItems = await prisma.menuItem.findMany({
    where: { id: { in: menuItemIds }, category: { outletId: input.outletId } },
    select: { id: true, name: true, price: true, priceVariants: true },
  })
  const byId = new Map(menuItems.map((m) => [m.id, m]))

  const itemData = input.items.map((i) => {
    const mi = byId.get(i.menuItemId)
    if (!mi) {
      throw new OrderValidationError('One or more items are not on this outlet\'s menu')
    }

    // Price is always derived server-side. For variant-priced items, resolve the
    // chosen variant's price; otherwise use the single price.
    const variants = (mi.priceVariants ?? null) as Record<string, number> | null
    let priceSnapshot: typeof mi.price | number = mi.price
    let variantLabel: string | null = null
    if (variants && Object.keys(variants).length > 0) {
      const label = i.variantLabel ?? undefined
      if (!label || !(label in variants)) {
        throw new OrderValidationError(`Select a valid option for "${mi.name}"`)
      }
      variantLabel  = label
      priceSnapshot = variants[label] // Prisma accepts number for a Decimal field
    }

    return {
      menuItemId:    mi.id,
      nameSnapshot:  mi.name,
      variantLabel,
      priceSnapshot,
      quantity:      i.quantity,
      note:          i.note ?? null,
    }
  })

  // Allocate this outlet's next daily token number (resets each IST business day).
  const dateStr = istBusinessDate()
  const dailyNumber = await nextDailyNumber(input.outletId, dateStr)

  const order = await prisma.order.create({
    data: {
      outletId:     input.outletId,
      customerId:   input.customerId ?? null,
      deviceId:     input.deviceId ?? null,
      createdById:  input.createdById ?? null,
      source:       input.source,
      serviceType:  input.serviceType,
      boardNumber:  input.boardNumber ?? null,
      tableId:      input.tableId ?? null,
      sessionId:    input.sessionId ?? null,
      note:         input.note ?? null,
      dailyNumber,
      businessDate: new Date(`${dateStr}T00:00:00.000Z`),
      items:        { create: itemData },
    },
    include: { items: true },
  })

  emitOrderEvent(order.outletId, { type: 'created', order })
  return order
}
