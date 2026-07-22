/**
 * Notification stubs — WhatsApp (Twilio) and Email (Resend).
 *
 * WHEN APIS ARE READY:
 *   WhatsApp: uncomment the Twilio block and set TWILIO_ACCOUNT_SID,
 *             TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM in .env
 *   Email:    uncomment the Resend block and set RESEND_API_KEY,
 *             RESEND_FROM_EMAIL in .env
 *
 * Until then, DRY_RUN mode logs the payload and returns success=true
 * so automation_logs populate correctly for testing.
 *
 * TEMPORARY TESTING: set WASENDER_API_KEY to send real WhatsApp messages
 * via WaSenderAPI while Twilio is not yet configured.
 */

import { createWasender, WasenderAPIError } from 'wasenderapi'
import { getTemplate } from './templateStore'

// Evaluated per-call so env vars set dynamically (e.g. forwarded from Cloudflare Worker)
// are respected. A module-level constant would freeze at server-startup values.
const isWADryRun  = () => process.env.AUTOMATION_DRY_RUN === 'true' ||
  (!process.env.TWILIO_ACCOUNT_SID && !process.env.WASENDER_API_KEY)
const isEmailDryRun = () => process.env.AUTOMATION_DRY_RUN === 'true' ||
  !process.env.RESEND_API_KEY

// Maps Twilio template name prefix → automationTemplates.json key
const WASENDER_TEMPLATE_MAP: Record<string, string> = {
  birthday:     'birthday_whatsapp',
  anniversary:  'anniversary_whatsapp',
  reengagement: 'reengagement_whatsapp',
  welcome:      'welcome_whatsapp',
  promotional:  'promotional_whatsapp',
  announcement: 'announcement_whatsapp',
  bounceback:   'bounceback_whatsapp',
  reservation:  'reservation_confirmation',
  reminder:     'reservation_reminder',
}

// ─── WhatsApp ────────────────────────────────────────────────────────────────

export interface WhatsAppPayload {
  to:           string // E.164 phone, e.g. +919876543210
  templateName: string
  variables:    Record<string, string>
}

export async function sendWhatsApp(payload: WhatsAppPayload): Promise<boolean> {
  if (isWADryRun()) {
    console.log(`[AUTOMATION:DRY_RUN] WhatsApp → ${payload.to}`, {
      template: payload.templateName,
      vars:     payload.variables,
    })
    return true
  }

  try {
    // ── WaSenderAPI (temporary testing path) ─────────────────────────────
    if (process.env.WASENDER_API_KEY) {
      // Prefer an exact template-key match (e.g. "reservation_reminder"); otherwise
      // fall back to the first-word map (e.g. "birthday_..." → birthday_whatsapp).
      const cleanName  = payload.templateName.replace('napkiq_', '')
      const baseWord   = cleanName.split('_')[0]
      const templateKey = getTemplate(cleanName) ? cleanName : WASENDER_TEMPLATE_MAP[baseWord]
      const tmpl       = templateKey ? getTemplate(templateKey) : null
      const text       = tmpl
        ? tmpl.body.replace(/\{(\w+)\}/g, (_, k) => payload.variables[k] ?? '')
        : Object.entries(payload.variables).map(([k, v]) => `${k}: ${v}`).join('\n')

      const wasender = createWasender(process.env.WASENDER_API_KEY)
      await wasender.sendText({ to: payload.to, text })
      console.log(`[AUTOMATION] WhatsApp sent via WaSenderAPI to ${payload.to}`)
      return true
    }
    // ─────────────────────────────────────────────────────────────────────

    // ── Twilio WhatsApp (uncomment when configured) ──────────────────────
    // const twilio = require('twilio')
    // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    //
    // Meta template message body — replace with actual approved template content:
    // const body = buildTemplateBody(payload.templateName, payload.variables)
    //
    // await client.messages.create({
    //   from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,  // e.g. whatsapp:+14155238886
    //   to:   `whatsapp:${payload.to}`,
    //   body,
    //   // OR use contentSid + contentVariables for Meta template messages:
    //   // contentSid:       '<TWILIO_CONTENT_SID_FOR_TEMPLATE>',
    //   // contentVariables: JSON.stringify(payload.variables),
    // })
    // ─────────────────────────────────────────────────────────────────────

    console.log(`[AUTOMATION] WhatsApp sent to ${payload.to}`)
    return true
  } catch (err) {
    if (err instanceof WasenderAPIError) {
      console.error(`[AUTOMATION] WhatsApp failed to ${payload.to}: ${err.apiMessage}`, {
        status: err.statusCode, rateLimit: err.rateLimit,
      })
    } else {
      console.error(`[AUTOMATION] WhatsApp failed to ${payload.to}:`, err)
    }
    return false
  }
}

// ─── Reservation confirmation ────────────────────────────────────────────────
// Sent when a table reservation is confirmed. Carries the assigned table + the
// fresh booking code (the guest's "unique customer number"). Uses the same
// DRY_RUN / WaSenderAPI path as every other WhatsApp message.

export interface ReservationConfirmationInput {
  to:          string // E.164 phone
  customerName: string
  outletName:  string
  tableName:   string
  zone:        string
  partySize:   number
  date:        string // e.g. "Fri, 10 Jul 2026"
  time:        string // e.g. "7:30 PM"
  bookingCode: string
}

const ZONE_LABEL: Record<string, string> = {
  ac:      'AC',
  non_ac:  'Non-AC',
  outdoor: 'Outdoor',
}

export async function sendReservationConfirmation(input: ReservationConfirmationInput): Promise<boolean> {
  return sendWhatsApp({
    to:           input.to,
    templateName: 'reservation_confirmation',
    variables: {
      customer_name: input.customerName,
      outlet_name:   input.outletName,
      table_name:    input.tableName,
      zone:          ZONE_LABEL[input.zone] ?? input.zone,
      party_size:    String(input.partySize),
      date:          input.date,
      time:          input.time,
      booking_code:  input.bookingCode,
    },
  })
}

/** Pre-visit reminder — same fields as the confirmation, different template body. */
export async function sendReservationReminder(input: ReservationConfirmationInput): Promise<boolean> {
  return sendWhatsApp({
    to:           input.to,
    templateName: 'reservation_reminder',
    variables: {
      customer_name: input.customerName,
      outlet_name:   input.outletName,
      table_name:    input.tableName,
      zone:          ZONE_LABEL[input.zone] ?? input.zone,
      party_size:    String(input.partySize),
      date:          input.date,
      time:          input.time,
      booking_code:  input.bookingCode,
    },
  })
}

// ─── Email ───────────────────────────────────────────────────────────────────

export interface EmailPayload {
  to:      string
  subject: string
  html:    string
}

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (isEmailDryRun()) {
    console.log(`[AUTOMATION:DRY_RUN] Email → ${payload.to}`, {
      subject: payload.subject,
    })
    return true
  }

  try {
    // ── Resend (uncomment when configured) ──────────────────────────────
    // const { Resend } = require('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    //
    // await resend.emails.send({
    //   from:    process.env.RESEND_FROM_EMAIL ?? 'Napkiq <noreply@napkiq.in>',
    //   to:      payload.to,
    //   subject: payload.subject,
    //   html:    payload.html,
    // })
    // ─────────────────────────────────────────────────────────────────────

    console.log(`[AUTOMATION] Email sent to ${payload.to}`)
    return true
  } catch (err) {
    console.error(`[AUTOMATION] Email failed to ${payload.to}:`, err)
    return false
  }
}

// ─── Template builders ───────────────────────────────────────────────────────

export function buildBirthdayWhatsApp(customerName: string, daysUntil: number): WhatsAppPayload['variables'] {
  return {
    customer_name: customerName,
    days_until:    daysUntil.toString(),
    restaurant:    'Napkiq',
  }
}

export function buildBirthdayEmail(customerName: string, daysUntil: number): Pick<EmailPayload, 'subject' | 'html'> {
  const greeting = daysUntil === 0
    ? `Happy Birthday, ${customerName}!`
    : daysUntil === 1
    ? `Your birthday is tomorrow, ${customerName}!`
    : `Your birthday is coming up, ${customerName}!`

  return {
    subject: greeting,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#111;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:#F26522;padding:32px 24px;text-align:center">
          <h1 style="margin:0;font-size:24px;color:#fff">🎂 ${greeting}</h1>
        </div>
        <div style="padding:32px 24px">
          <p>We'd love to celebrate your special day with you at <strong>Napkiq</strong>.</p>
          <p style="margin-top:16px">Visit any of our outlets and enjoy a complimentary treat on us. Show this email to our team.</p>
          <p style="margin-top:32px;color:rgba(255,255,255,0.5);font-size:12px">Napkiq Restaurant · napkiq.in</p>
        </div>
      </div>
    `,
  }
}

export function buildAnniversaryEmail(customerName: string, daysUntil: number): Pick<EmailPayload, 'subject' | 'html'> {
  const greeting = daysUntil === 0
    ? `Happy Anniversary, ${customerName}!`
    : daysUntil === 1
    ? `Your anniversary is tomorrow, ${customerName}!`
    : `Your anniversary is coming up, ${customerName}!`

  return {
    subject: greeting,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#111;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:#1A1A1A;padding:32px 24px;text-align:center;border-bottom:2px solid #F26522">
          <h1 style="margin:0;font-size:24px;color:#F26522">💑 ${greeting}</h1>
        </div>
        <div style="padding:32px 24px">
          <p>Celebrate your love at <strong>Napkiq</strong>. We'd love to be part of your special day.</p>
          <p style="margin-top:16px">Book a table for two and enjoy a romantic dining experience.</p>
          <p style="margin-top:32px;color:rgba(255,255,255,0.5);font-size:12px">Napkiq Restaurant · napkiq.in</p>
        </div>
      </div>
    `,
  }
}

export function buildReengagementEmail(customerName: string, daysSince: number): Pick<EmailPayload, 'subject' | 'html'> {
  return {
    subject: `We miss you, ${customerName}!`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#111;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:#1A1A1A;padding:32px 24px;text-align:center;border-bottom:2px solid #F26522">
          <h1 style="margin:0;font-size:24px;color:#fff">We miss you, ${customerName}! 👋</h1>
        </div>
        <div style="padding:32px 24px">
          <p>It's been <strong>${daysSince} days</strong> since your last visit and we'd love to have you back at <strong>Napkiq</strong>.</p>
          <p style="margin-top:16px">Our kitchen is ready and your favourite table is waiting.</p>
          <p style="margin-top:32px;color:rgba(255,255,255,0.5);font-size:12px">Napkiq Restaurant · napkiq.in</p>
        </div>
      </div>
    `,
  }
}

// ─── Generic builder (used for welcome / promotional / announcement) ───────────
// Renders any admin-editable template body with variable substitution.

export function buildGenericEmail(opts: {
  subject:    string
  body:       string
  name:       string
  imageUrl?:  string | null
  linkUrl?:   string | null
  extraVars?: Record<string, string>
}): Pick<EmailPayload, 'subject' | 'html'> {
  const vars: Record<string, string> = {
    customer_name: opts.name,
    name:          opts.name,
    ...opts.extraVars,
  }

  const interpolate = (s: string) =>
    s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`)

  const subj = interpolate(opts.subject)
  const body = interpolate(opts.body)

  const imageBlock = opts.imageUrl
    ? `<img src="${opts.imageUrl}" alt="" style="width:100%;max-height:240px;object-fit:cover;display:block;">`
    : ''

  const linkBlock = opts.linkUrl
    ? `<a href="${opts.linkUrl}" style="display:inline-block;margin-top:20px;padding:12px 28px;background:#F26522;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">View Offer →</a>`
    : ''

  return {
    subject: subj,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#111;color:#fff;border-radius:16px;overflow:hidden">
        ${imageBlock}
        <div style="background:#F26522;padding:24px;text-align:center">
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.8);font-weight:600;letter-spacing:0.05em;text-transform:uppercase">Napkiq</p>
        </div>
        <div style="padding:32px 24px">
          <p style="font-size:16px;line-height:1.7;color:#fff">${body}</p>
          ${linkBlock}
          <p style="margin-top:32px;color:rgba(255,255,255,0.4);font-size:12px">Napkiq Restaurant · napkiq.in</p>
        </div>
      </div>
    `,
  }
}
