import { EventEmitter } from 'events'

// ─── In-process CRM event broker (SSE fan-out) ──────────────────────────────────
//
// Mirrors lib/reservationEvents.ts. Bridges public customer/visit/review writes →
// live SSE streams on the CMS Customers / Visits / Reviews pages. A single global
// channel carries every event tagged with its outlet; the /api/cms/crm/stream
// handler forwards them (scoped to the franchise owner's outlet when applicable).
//
// NOTE: In-process only — correct for the current single-instance Render deploy.
// If the API is scaled horizontally, replace with Postgres LISTEN/NOTIFY or Redis
// pub/sub behind this same interface.

export type CrmEventType = 'customer' | 'visit' | 'review'

export interface CrmEvent {
  type: CrmEventType
  outletId: string | null
}

const emitter = new EventEmitter()
emitter.setMaxListeners(0)

const CHANNEL = 'crm'

/** Broadcast a CRM change to every open stream. */
export function emitCrmEvent(event: CrmEvent): void {
  emitter.emit(CHANNEL, event)
}

/** Subscribe to CRM changes. Returns an unsubscribe function. */
export function onCrmEvent(handler: (event: CrmEvent) => void): () => void {
  emitter.on(CHANNEL, handler)
  return () => emitter.off(CHANNEL, handler)
}
