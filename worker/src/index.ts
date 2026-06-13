/**
 * Napkiq Automation Worker
 *
 * Runs daily at 03:00 UTC (08:30 IST) via Cloudflare Cron Trigger.
 * Calls the Napkiq API server which handles the DB logic, WhatsApp,
 * and email sending. The worker is purely a scheduler + HTTP client.
 *
 * Setup:
 *   1. wrangler secret put AUTOMATION_SECRET   (must match server .env)
 *   2. wrangler deploy
 *
 * Manual trigger (dev):
 *   POST https://napkiq-automation.unicord26.workers.dev/trigger
 *   Header: x-trigger-key: <your trigger key>
 */

export interface Env {
  SERVER_URL:         string
  AUTOMATION_SECRET:  string
  TRIGGER_KEY?:       string   // optional key for manual HTTP trigger
  WASENDER_API_KEY?:  string   // temporary testing key — remove when Twilio is live
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export default {
  // ── Cron trigger (daily 03:00 UTC) ──────────────────────────────────────
  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(runAutomation(env, 'cron'))
  },

  // ── HTTP handler (health check + manual trigger) ─────────────────────────
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/') {
      return new Response(
        JSON.stringify({
          service: 'Napkiq Automation Worker',
          status:  'ok',
          cron:    '0 3 * * * (03:00 UTC = 08:30 IST)',
          server:  env.SERVER_URL,
        }),
        { headers: { 'Content-Type': 'application/json' } },
      )
    }

    // POST /trigger — manual fire, protected by TRIGGER_KEY
    if (url.pathname === '/trigger' && request.method === 'POST') {
      const triggerKey = env.TRIGGER_KEY
      if (triggerKey) {
        const provided = request.headers.get('x-trigger-key')
        if (provided !== triggerKey) {
          return new Response(JSON.stringify({ error: 'Invalid trigger key' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      }

      ctx.waitUntil(runAutomation(env, 'manual'))
      return new Response(
        JSON.stringify({ ok: true, message: 'Automation triggered manually' }),
        { headers: { 'Content-Type': 'application/json' } },
      )
    }

    // POST /trigger/reengagement — manual re-engagement only
    if (url.pathname === '/trigger/reengagement' && request.method === 'POST') {
      const triggerKey = env.TRIGGER_KEY
      if (triggerKey) {
        const provided = request.headers.get('x-trigger-key')
        if (provided !== triggerKey) {
          return new Response(JSON.stringify({ error: 'Invalid trigger key' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      }

      ctx.waitUntil(runReengagement(env))
      return new Response(
        JSON.stringify({ ok: true, message: 'Re-engagement triggered' }),
        { headers: { 'Content-Type': 'application/json' } },
      )
    }

    return new Response('Not found', { status: 404 })
  },
}

// ─── Automation call helpers ──────────────────────────────────────────────────

async function runAutomation(env: Env, source: 'cron' | 'manual'): Promise<void> {
  const endpoint = `${env.SERVER_URL}/api/automation/run`

  console.log(`[${source.toUpperCase()}] Calling automation at ${endpoint}`)

  const headers: Record<string, string> = {
    'Content-Type':        'application/json',
    'x-automation-secret': env.AUTOMATION_SECRET ?? '',
  }
  if (env.WASENDER_API_KEY) headers['x-wasender-api-key'] = env.WASENDER_API_KEY

  try {
    const res = await fetch(endpoint, { method: 'POST', headers })

    const body = await res.json() as Record<string, unknown>

    if (!res.ok) {
      console.error(`[AUTOMATION] Server returned ${res.status}:`, JSON.stringify(body))
      return
    }

    console.log(`[AUTOMATION] Completed:`, JSON.stringify(body))
  } catch (err) {
    console.error(`[AUTOMATION] Network error:`, err)
  }
}

async function runReengagement(env: Env): Promise<void> {
  const endpoint = `${env.SERVER_URL}/api/automation/reengagement`

  console.log(`[REENGAGEMENT] Calling ${endpoint}`)

  const headers: Record<string, string> = {
    'Content-Type':        'application/json',
    'x-automation-secret': env.AUTOMATION_SECRET ?? '',
  }
  if (env.WASENDER_API_KEY) headers['x-wasender-api-key'] = env.WASENDER_API_KEY

  try {
    const res = await fetch(endpoint, { method: 'POST', headers })

    const body = await res.json() as Record<string, unknown>

    if (!res.ok) {
      console.error(`[REENGAGEMENT] Server returned ${res.status}:`, JSON.stringify(body))
      return
    }

    console.log(`[REENGAGEMENT] Completed:`, JSON.stringify(body))
  } catch (err) {
    console.error(`[REENGAGEMENT] Network error:`, err)
  }
}
