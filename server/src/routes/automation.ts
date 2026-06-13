import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { requireAuth, requireAdmin } from '../middleware/auth'
import {
  sendWhatsApp,
  sendEmail,
  buildBirthdayWhatsApp,
  buildBirthdayEmail,
  buildAnniversaryEmail,
  buildReengagementEmail,
  buildGenericEmail,
} from '../lib/notifications'
import { getTemplate } from '../lib/templateStore'

const router = Router()

// Apply WaSenderAPI key forwarded by the Cloudflare Worker (temporary testing).
// When WASENDER_API_KEY is managed as a Worker secret, the Worker forwards it
// here so the Render server doesn't need it in its own env vars.
router.use((req, _res, next) => {
  const key = req.headers['x-wasender-api-key'] as string | undefined
  if (key) process.env.WASENDER_API_KEY = key
  next()
})

// ─── Worker secret guard ──────────────────────────────────────────────────────

function requireWorkerSecret(req: any, res: any, next: any) {
  const secret = process.env.AUTOMATION_SECRET
  if (!secret) {
    // No secret configured — allow only in development
    if (process.env.NODE_ENV === 'production') {
      res.status(403).json({ error: 'Automation secret not configured' })
      return
    }
    return next()
  }
  const provided = req.headers['x-automation-secret']
  if (provided !== secret) {
    res.status(403).json({ error: 'Invalid automation secret' })
    return
  }
  next()
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalizePone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return digits.startsWith('91') ? `+${digits}` : `+91${digits}`
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

function isSameMonthDay(a: Date, b: Date): boolean {
  return a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

async function alreadySent(
  customerId: string,
  automationType: string,
  stage: string,
): Promise<boolean> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const existing = await prisma.automationLog.findFirst({
    where: {
      customerId,
      automationType: automationType as any,
      messageStage:   stage as any,
      sentAt:         { gte: today, lt: tomorrow },
    },
  })
  return existing !== null
}

async function logSend(
  customerId: string,
  automationType: string,
  messageStage: string,
  status: 'success' | 'failed',
  errorMessage?: string,
) {
  await prisma.automationLog.create({
    data: {
      customerId,
      automationType: automationType as any,
      messageStage:   messageStage as any,
      status,
      errorMessage: errorMessage ?? null,
    },
  })
}

// ─── Core automation runner ───────────────────────────────────────────────────

async function runAutomation() {
  const today = new Date()
  const in1   = addDays(today, 1)
  const in5   = addDays(today, 5)

  const allCustomers = await prisma.customer.findMany({
    select: {
      id:              true,
      fullName:        true,
      phone:           true,
      email:           true,
      birthDate:       true,
      anniversaryDate: true,
      lastVisitDate:   true,
    },
  })

  const results = { sent: 0, skipped: 0, failed: 0 }

  for (const customer of allCustomers) {
    const phone = normalizePone(customer.phone)
    const email = customer.email

    // ── Birthday ──────────────────────────────────────────────────────────
    if (customer.birthDate) {
      const bd = new Date(customer.birthDate)

      const stages: Array<{ target: Date; stage: string; daysUntil: number }> = [
        { target: in5,   stage: 'five_days_before', daysUntil: 5 },
        { target: in1,   stage: 'one_day_before',   daysUntil: 1 },
        { target: today, stage: 'on_day',            daysUntil: 0 },
      ]

      for (const { target, stage, daysUntil } of stages) {
        if (!isSameMonthDay(bd, target)) continue

        // WhatsApp
        if (!await alreadySent(customer.id, 'birthday_whatsapp', stage)) {
          const ok = await sendWhatsApp({
            to:           phone,
            templateName: `napkiq_birthday_${stage}`,
            variables:    buildBirthdayWhatsApp(customer.fullName, daysUntil),
          })
          await logSend(customer.id, 'birthday_whatsapp', stage, ok ? 'success' : 'failed')
          ok ? results.sent++ : results.failed++
        } else { results.skipped++ }

        // Email
        if (email && !await alreadySent(customer.id, 'birthday_email', stage)) {
          const { subject, html } = buildBirthdayEmail(customer.fullName, daysUntil)
          const ok = await sendEmail({ to: email, subject, html })
          await logSend(customer.id, 'birthday_email', stage, ok ? 'success' : 'failed')
          ok ? results.sent++ : results.failed++
        } else { results.skipped++ }
      }
    }

    // ── Anniversary ───────────────────────────────────────────────────────
    if (customer.anniversaryDate) {
      const ad = new Date(customer.anniversaryDate)

      const stages: Array<{ target: Date; stage: string; daysUntil: number }> = [
        { target: in5,   stage: 'five_days_before', daysUntil: 5 },
        { target: in1,   stage: 'one_day_before',   daysUntil: 1 },
        { target: today, stage: 'on_day',            daysUntil: 0 },
      ]

      for (const { target, stage, daysUntil } of stages) {
        if (!isSameMonthDay(ad, target)) continue

        if (!await alreadySent(customer.id, 'anniversary_whatsapp', stage)) {
          const ok = await sendWhatsApp({
            to:           phone,
            templateName: `napkiq_anniversary_${stage}`,
            variables: {
              customer_name: customer.fullName,
              days_until:    daysUntil.toString(),
              restaurant:    'Napkiq',
            },
          })
          await logSend(customer.id, 'anniversary_whatsapp', stage, ok ? 'success' : 'failed')
          ok ? results.sent++ : results.failed++
        } else { results.skipped++ }

        if (email && !await alreadySent(customer.id, 'anniversary_email', stage)) {
          const { subject, html } = buildAnniversaryEmail(customer.fullName, daysUntil)
          const ok = await sendEmail({ to: email, subject, html })
          await logSend(customer.id, 'anniversary_email', stage, ok ? 'success' : 'failed')
          ok ? results.sent++ : results.failed++
        } else { results.skipped++ }
      }
    }

    // ── Re-engagement ─────────────────────────────────────────────────────
    if (customer.lastVisitDate) {
      const daysSince = Math.floor(
        (today.getTime() - new Date(customer.lastVisitDate).getTime()) / 86_400_000
      )
      if (daysSince >= 30) {
        if (!await alreadySent(customer.id, 'reengagement_whatsapp', 'thirty_days_inactive')) {
          const ok = await sendWhatsApp({
            to:           phone,
            templateName: 'napkiq_reengagement',
            variables: {
              customer_name: customer.fullName,
              days_since:    daysSince.toString(),
              restaurant:    'Napkiq',
            },
          })
          await logSend(customer.id, 'reengagement_whatsapp', 'thirty_days_inactive', ok ? 'success' : 'failed')
          ok ? results.sent++ : results.failed++
        } else { results.skipped++ }

        if (email && !await alreadySent(customer.id, 'reengagement_email', 'thirty_days_inactive')) {
          const { subject, html } = buildReengagementEmail(customer.fullName, daysSince)
          const ok = await sendEmail({ to: email, subject, html })
          await logSend(customer.id, 'reengagement_email', 'thirty_days_inactive', ok ? 'success' : 'failed')
          ok ? results.sent++ : results.failed++
        } else { results.skipped++ }
      }
    }
  }

  return results
}

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * POST /api/automation/run
 * Called daily by the Cloudflare Worker cron scheduler.
 * Authenticated via x-automation-secret header.
 */
router.post('/run', requireWorkerSecret, async (_req, res, next) => {
  try {
    const started = Date.now()
    const results = await runAutomation()
    res.json({
      ok:      true,
      elapsed: `${Date.now() - started}ms`,
      ...results,
    })
  } catch (err) {
    next(err)
  }
})

/**
 * POST /api/automation/reengagement
 * Two auth paths:
 *   - Cloudflare Worker: x-automation-secret header
 *   - CMS admin: JWT Bearer token (requireAuth + requireAdmin)
 */
router.post('/reengagement', async (req, res, next) => {
  const workerSecret = process.env.AUTOMATION_SECRET
  const providedSecret = req.headers['x-automation-secret']

  if (workerSecret && providedSecret === workerSecret) {
    return next()
  }

  // Fall back to JWT auth
  requireAuth(req, res, () => requireAdmin(req, res, next))
}, async (_req, res, next) => {
  try {
    const today = new Date()
    const customers = await prisma.customer.findMany({
      where: {
        email:         { not: null },
        lastVisitDate: { lte: addDays(today, -30) },
      },
      select: {
        id:            true,
        fullName:      true,
        phone:         true,
        email:         true,
        lastVisitDate: true,
      },
    })

    let sent = 0, skipped = 0, failed = 0

    for (const c of customers) {
      const daysSince = Math.floor(
        (today.getTime() - new Date(c.lastVisitDate!).getTime()) / 86_400_000
      )

      if (!await alreadySent(c.id, 'reengagement_whatsapp', 'thirty_days_inactive')) {
        const ok = await sendWhatsApp({
          to:           normalizePone(c.phone),
          templateName: 'napkiq_reengagement',
          variables: { customer_name: c.fullName, days_since: daysSince.toString(), restaurant: 'Napkiq' },
        })
        await logSend(c.id, 'reengagement_whatsapp', 'thirty_days_inactive', ok ? 'success' : 'failed')
        ok ? sent++ : failed++
      } else { skipped++ }

      if (c.email && !await alreadySent(c.id, 'reengagement_email', 'thirty_days_inactive')) {
        const { subject, html } = buildReengagementEmail(c.fullName, daysSince)
        const ok = await sendEmail({ to: c.email, subject, html })
        await logSend(c.id, 'reengagement_email', 'thirty_days_inactive', ok ? 'success' : 'failed')
        ok ? sent++ : failed++
      } else { skipped++ }
    }

    res.json({ ok: true, customers: customers.length, sent, skipped, failed })
  } catch (err) {
    next(err)
  }
})

// ─── Dual-auth helper (worker secret OR CMS admin JWT) ───────────────────────

function dualAuth(req: any, res: any, next: any) {
  const secret   = process.env.AUTOMATION_SECRET
  const provided = req.headers['x-automation-secret']
  if (secret && provided === secret) return next()
  // No secret configured (e.g. not set in Render env) — allow worker calls in non-production
  if (!secret && process.env.NODE_ENV !== 'production') return next()
  requireAuth(req, res, () => requireAdmin(req, res, next))
}

// ─── POST /api/automation/welcome ────────────────────────────────────────────
// Sends welcome messages to customers who haven't received one yet.

router.post('/welcome', dualAuth, async (_req, res, next) => {
  try {
    const waT  = getTemplate('welcome_whatsapp')
    const emT  = getTemplate('welcome_email')

    const customers = await prisma.customer.findMany({
      select: { id: true, fullName: true, phone: true, email: true },
    })

    let sent = 0, skipped = 0, failed = 0

    for (const c of customers) {
      const phone = normalizePone(c.phone)

      if (waT?.isActive && !await alreadySent(c.id, 'welcome_whatsapp', 'on_registration')) {
        const ok = await sendWhatsApp({
          to:           phone,
          templateName: 'napkiq_welcome',
          variables:    { customer_name: c.fullName, restaurant: 'Napkiq' },
        })
        await logSend(c.id, 'welcome_whatsapp', 'on_registration', ok ? 'success' : 'failed')
        ok ? sent++ : failed++
      } else { skipped++ }

      if (emT?.isActive && c.email && !await alreadySent(c.id, 'welcome_email', 'on_registration')) {
        const { subject, html } = buildGenericEmail({
          subject:  emT.subject ?? 'Welcome to Napkiq!',
          body:     emT.body,
          name:     c.fullName,
          imageUrl: emT.imageUrl,
          linkUrl:  emT.linkUrl,
        })
        const ok = await sendEmail({ to: c.email, subject, html })
        await logSend(c.id, 'welcome_email', 'on_registration', ok ? 'success' : 'failed')
        ok ? sent++ : failed++
      } else { skipped++ }
    }

    res.json({ ok: true, customers: customers.length, sent, skipped, failed })
  } catch (err) {
    next(err)
  }
})

// ─── POST /api/automation/promotional ────────────────────────────────────────
// Sends promotional offer to all active customers (no dedup — admin decides).

router.post('/promotional', dualAuth, async (_req, res, next) => {
  try {
    const waT = getTemplate('promotional_whatsapp')
    const emT = getTemplate('promotional_email')

    const customers = await prisma.customer.findMany({
      select: { id: true, fullName: true, phone: true, email: true },
    })

    let sent = 0, skipped = 0, failed = 0

    for (const c of customers) {
      if (waT?.isActive) {
        const ok = await sendWhatsApp({
          to:           normalizePone(c.phone),
          templateName: 'napkiq_promotional',
          variables:    { customer_name: c.fullName, restaurant: 'Napkiq' },
        })
        await logSend(c.id, 'promotional_whatsapp', 'manual_campaign', ok ? 'success' : 'failed')
        ok ? sent++ : failed++
      } else { skipped++ }

      if (emT?.isActive && c.email) {
        const { subject, html } = buildGenericEmail({
          subject:  emT.subject ?? 'Special offer at Napkiq!',
          body:     emT.body,
          name:     c.fullName,
          imageUrl: emT.imageUrl,
          linkUrl:  emT.linkUrl,
        })
        const ok = await sendEmail({ to: c.email, subject, html })
        await logSend(c.id, 'promotional_email', 'manual_campaign', ok ? 'success' : 'failed')
        ok ? sent++ : failed++
      } else { skipped++ }
    }

    res.json({ ok: true, customers: customers.length, sent, skipped, failed })
  } catch (err) {
    next(err)
  }
})

// ─── POST /api/automation/announcement ───────────────────────────────────────
// Sends product announcement to all customers.

router.post('/announcement', dualAuth, async (_req, res, next) => {
  try {
    const waT = getTemplate('announcement_whatsapp')
    const emT = getTemplate('announcement_email')

    const customers = await prisma.customer.findMany({
      select: { id: true, fullName: true, phone: true, email: true },
    })

    let sent = 0, skipped = 0, failed = 0

    for (const c of customers) {
      if (waT?.isActive) {
        const ok = await sendWhatsApp({
          to:           normalizePone(c.phone),
          templateName: 'napkiq_announcement',
          variables:    { customer_name: c.fullName, restaurant: 'Napkiq' },
        })
        await logSend(c.id, 'announcement_whatsapp', 'manual_campaign', ok ? 'success' : 'failed')
        ok ? sent++ : failed++
      } else { skipped++ }

      if (emT?.isActive && c.email) {
        const { subject, html } = buildGenericEmail({
          subject:  emT.subject ?? 'Something new at Napkiq!',
          body:     emT.body,
          name:     c.fullName,
          imageUrl: emT.imageUrl,
          linkUrl:  emT.linkUrl,
        })
        const ok = await sendEmail({ to: c.email, subject, html })
        await logSend(c.id, 'announcement_email', 'manual_campaign', ok ? 'success' : 'failed')
        ok ? sent++ : failed++
      } else { skipped++ }
    }

    res.json({ ok: true, customers: customers.length, sent, skipped, failed })
  } catch (err) {
    next(err)
  }
})

export default router
