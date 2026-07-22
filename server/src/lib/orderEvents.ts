import { EventEmitter } from 'events'

// ─── In-process order event broker (SSE fan-out) ────────────────────────────────
//
// Bridges order writes → live SSE streams on the KDS. Every order create and every
// status change emits here; the /api/cms/orders/stream handler subscribes per outlet.
//
// NOTE: This is in-process only — correct for the current single-instance Render
// deploy. If the API is ever scaled horizontally, a client connected to instance A
// would NOT receive events emitted on instance B. At that point replace this with a
// shared bus (Postgres LISTEN/NOTIFY or Redis pub/sub) behind the same interface.

export type OrderEvent =
  | { type: 'created'; order: unknown }
  | { type: 'status'; order: unknown }

const emitter = new EventEmitter()
// A busy kitchen may have many kitchen tablets subscribed to one outlet.
emitter.setMaxListeners(0)

function channel(outletId: string) {
  return `order:${outletId}`
}

/** Broadcast an order change to every stream listening to this outlet. */
export function emitOrderEvent(outletId: string, event: OrderEvent): void {
  emitter.emit(channel(outletId), event)
}

/** Subscribe to an outlet's order stream. Returns an unsubscribe function. */
export function onOrderEvent(
  outletId: string,
  handler: (event: OrderEvent) => void
): () => void {
  const ch = channel(outletId)
  emitter.on(ch, handler)
  return () => emitter.off(ch, handler)
}
