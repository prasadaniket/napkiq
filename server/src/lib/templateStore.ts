import * as fs   from 'fs'
import * as path from 'path'

// Stored at <server_root>/data/automationTemplates.json
const DATA_DIR       = path.join(process.cwd(), 'data')
const TEMPLATES_FILE = path.join(DATA_DIR, 'automationTemplates.json')

export interface AutomationTemplate {
  key:         string
  label:       string
  channel:     'whatsapp' | 'email'
  trigger:     'automatic' | 'manual'
  triggerDesc: string
  subject:     string | null  // email only
  body:        string
  imageUrl:    string | null
  linkUrl:     string | null
  isActive:    boolean
}

type TemplateMap = Record<string, AutomationTemplate>

// ─── Defaults (seeded on first boot) ─────────────────────────────────────────

export const DEFAULT_TEMPLATES: TemplateMap = {
  birthday_whatsapp: {
    key: 'birthday_whatsapp', label: 'Birthday', channel: 'whatsapp',
    trigger: 'automatic', triggerDesc: '5 days before & 1 day before birthday',
    subject: null,
    body: "Hey {customer_name}, your birthday is coming up! 🎂 Celebrate with us at Napkiq — we have something special waiting for you.",
    imageUrl: null, linkUrl: null, isActive: true,
  },
  birthday_email: {
    key: 'birthday_email', label: 'Birthday', channel: 'email',
    trigger: 'automatic', triggerDesc: '5 days before & 1 day before birthday',
    subject: 'Your birthday is coming up, {name}!',
    body: "We'd love to celebrate your special day with you at Napkiq. Visit any outlet and enjoy a complimentary treat on us.",
    imageUrl: null, linkUrl: null, isActive: true,
  },
  anniversary_whatsapp: {
    key: 'anniversary_whatsapp', label: 'Anniversary', channel: 'whatsapp',
    trigger: 'automatic', triggerDesc: '5 days before & 1 day before anniversary',
    subject: null,
    body: "Hey {customer_name}, your anniversary is almost here! 💑 Come celebrate at Napkiq with a romantic dining experience.",
    imageUrl: null, linkUrl: null, isActive: true,
  },
  anniversary_email: {
    key: 'anniversary_email', label: 'Anniversary', channel: 'email',
    trigger: 'automatic', triggerDesc: '5 days before & 1 day before anniversary',
    subject: 'Your anniversary is coming up, {name}!',
    body: "Celebrate your love at Napkiq. Book a table for two and enjoy a romantic dining experience curated just for you.",
    imageUrl: null, linkUrl: null, isActive: true,
  },
  reengagement_whatsapp: {
    key: 'reengagement_whatsapp', label: 'Re-engagement', channel: 'whatsapp',
    trigger: 'automatic', triggerDesc: '30 days since last visit',
    subject: null,
    body: "Hey {customer_name}, we miss you! 👋 It's been a while since your last visit — come back to Napkiq, your favourite table is waiting.",
    imageUrl: null, linkUrl: null, isActive: true,
  },
  reengagement_email: {
    key: 'reengagement_email', label: 'Re-engagement', channel: 'email',
    trigger: 'automatic', triggerDesc: '30 days since last visit',
    subject: 'We miss you, {name}!',
    body: "It's been {days} days since your last visit and we'd love to have you back. Our kitchen is ready and your favourite table is waiting.",
    imageUrl: null, linkUrl: null, isActive: true,
  },
  welcome_whatsapp: {
    key: 'welcome_whatsapp', label: 'Welcome', channel: 'whatsapp',
    trigger: 'automatic', triggerDesc: 'Sent on first customer registration',
    subject: null,
    body: "Welcome to Napkiq, {customer_name}! 🍽️ We're thrilled to have you. Scan your QR on every visit to unlock rewards and surprises.",
    imageUrl: null, linkUrl: null, isActive: true,
  },
  welcome_email: {
    key: 'welcome_email', label: 'Welcome', channel: 'email',
    trigger: 'automatic', triggerDesc: 'Sent on first customer registration',
    subject: 'Welcome to Napkiq, {name}!',
    body: "We're thrilled to welcome you to the Napkiq family. Every visit earns you loyalty points and exclusive birthday & anniversary surprises.",
    imageUrl: null, linkUrl: null, isActive: true,
  },
  promotional_whatsapp: {
    key: 'promotional_whatsapp', label: 'Promotional Offer', channel: 'whatsapp',
    trigger: 'manual', triggerDesc: 'Admin triggers manually to active customers',
    subject: null,
    body: "Hey {customer_name}! 🎉 We have a special offer just for you at Napkiq. Visit us this week and enjoy exclusive deals.",
    imageUrl: null, linkUrl: null, isActive: false,
  },
  promotional_email: {
    key: 'promotional_email', label: 'Promotional Offer', channel: 'email',
    trigger: 'manual', triggerDesc: 'Admin triggers manually to active customers',
    subject: 'Special offer for you at Napkiq!',
    body: "We have an exclusive offer waiting for you at Napkiq. Visit us this week and enjoy special deals curated just for our loyal customers.",
    imageUrl: null, linkUrl: null, isActive: false,
  },
  announcement_whatsapp: {
    key: 'announcement_whatsapp', label: 'Product Announcement', channel: 'whatsapp',
    trigger: 'manual', triggerDesc: 'Admin triggers manually to all customers',
    subject: null,
    body: "Exciting news, {customer_name}! 🍽️ We've added something new to our menu at Napkiq. Come in and be the first to try it!",
    imageUrl: null, linkUrl: null, isActive: false,
  },
  announcement_email: {
    key: 'announcement_email', label: 'Product Announcement', channel: 'email',
    trigger: 'manual', triggerDesc: 'Admin triggers manually to all customers',
    subject: 'Something new at Napkiq!',
    body: "We are excited to announce a new addition to our menu. Come visit us at Napkiq and be among the first to experience it.",
    imageUrl: null, linkUrl: null, isActive: false,
  },
  bounceback_whatsapp: {
    key: 'bounceback_whatsapp', label: 'Bounce-back Campaign', channel: 'whatsapp',
    trigger: 'automatic', triggerDesc: 'Sent 2 hours after first scan/visit',
    subject: null,
    body: "Hey {customer_name}! 🍕 Thank you for dining with us at {outlet_name} today. We hope you loved our pizza! Come visit us again in the next 14 days and get a Free Cheese Garlic Bread on us! Just show this message to your server. Code: BOUNCE-{outlet_code}",
    imageUrl: null, linkUrl: null, isActive: true,
  },
  bounceback_email: {
    key: 'bounceback_email', label: 'Bounce-back Campaign', channel: 'email',
    trigger: 'automatic', triggerDesc: 'Sent 2 hours after first scan/visit',
    subject: 'Thank you for visiting {outlet_name}! Here is a special treat...',
    body: "We hope you enjoyed your woodfired pizza today. Visit us again within the next 14 days and enjoy a complimentary Free Cheese Garlic Bread on us! Simply present this email on your next visit.",
    imageUrl: null, linkUrl: null, isActive: true,
  },
  reservation_confirmation: {
    key: 'reservation_confirmation', label: 'Reservation Confirmation', channel: 'whatsapp',
    trigger: 'automatic', triggerDesc: 'Sent when a table reservation is confirmed',
    subject: null,
    body: "Hi {customer_name}, your table at {outlet_name} is confirmed! ✅\n\n🍽️ Table: {table_name} ({zone})\n👥 Guests: {party_size}\n📅 {date} at {time}\n🎟️ Booking code: {booking_code}\n\nPlease show this code at the restaurant. See you soon!",
    imageUrl: null, linkUrl: null, isActive: true,
  },
  reservation_reminder: {
    key: 'reservation_reminder', label: 'Reservation Reminder', channel: 'whatsapp',
    trigger: 'automatic', triggerDesc: 'Sent a couple of hours before the reservation',
    subject: null,
    body: "Hi {customer_name}, a reminder of your table at {outlet_name} today 🍽️\n\n🪑 Table: {table_name} ({zone})\n👥 Guests: {party_size}\n🕐 {time}\n🎟️ Code: {booking_code}\n\nSee you soon! Reply to this message if your plans change.",
    imageUrl: null, linkUrl: null, isActive: true,
  },
}

// ─── I/O ──────────────────────────────────────────────────────────────────────

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

export function readTemplates(): TemplateMap {
  ensureDir()
  if (!fs.existsSync(TEMPLATES_FILE)) {
    fs.writeFileSync(TEMPLATES_FILE, JSON.stringify(DEFAULT_TEMPLATES, null, 2), 'utf8')
    return { ...DEFAULT_TEMPLATES }
  }
  try {
    const stored: TemplateMap = JSON.parse(fs.readFileSync(TEMPLATES_FILE, 'utf8'))
    // Always merge defaults so newly-added keys appear automatically
    return { ...DEFAULT_TEMPLATES, ...stored }
  } catch {
    return { ...DEFAULT_TEMPLATES }
  }
}

function writeTemplates(store: TemplateMap): void {
  ensureDir()
  fs.writeFileSync(TEMPLATES_FILE, JSON.stringify(store, null, 2), 'utf8')
}

export function getTemplate(key: string): AutomationTemplate | null {
  return readTemplates()[key] ?? null
}

export function updateTemplate(
  key: string,
  updates: Partial<Pick<AutomationTemplate, 'subject' | 'body' | 'linkUrl' | 'imageUrl' | 'isActive'>>,
): AutomationTemplate {
  const store = readTemplates()
  if (!store[key]) throw new Error(`Unknown template key: ${key}`)
  store[key] = { ...store[key], ...updates }
  writeTemplates(store)
  return store[key]
}
