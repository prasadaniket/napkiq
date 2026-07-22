import { EventEmitter } from 'events'

// ─── In-process reservation event broker (SSE fan-out) ──────────────────────────
//
// Mirrors lib/orderEvents.ts. Bridges reservation writes → live SSE streams on the
// CMS reservations board. Every hold / confirm / status change emits here; the
// /api/cms/reservations/stream handler subscribes per outlet.
//
// NOTE: In-process only — correct for the current single-instance Render deploy.
// If the API is scaled horizontally, replace with Postgres LISTEN/NOTIFY or Redis
// pub/sub behind this same interface.

export type ReservationEvent =
  | { type: 'created'; reservation: unknown }
  | { type: 'status'; reservation: unknown }
  | { type: 'table' } // a table changed (block/unblock/added) — floor view should refetch
  | { type: 'waitlist' } // the walk-in queue changed — waitlist view should refetch

const emitter = new EventEmitter()
emitter.setMaxListeners(0)

function channel(outletId: string) {
  return `reservation:${outletId}`
}

/** Broadcast a reservation change to every stream listening to this outlet. */
export function emitReservationEvent(outletId: string, event: ReservationEvent): void {
  emitter.emit(channel(outletId), event)
}

/** Subscribe to an outlet's reservation stream. Returns an unsubscribe function. */
export function onReservationEvent(
  outletId: string,
  handler: (event: ReservationEvent) => void
): () => void {
  const ch = channel(outletId)
  emitter.on(ch, handler)
  return () => emitter.off(ch, handler)
}
