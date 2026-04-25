# External Integrations

**Analysis Date:** 2026-04-25

## APIs & External Services

---

### Supabase

**Role:** PostgreSQL database host + authentication provider  
**SDK:** `@supabase/supabase-js ^2.104.0` (server + both clients), `@supabase/ssr ^0.10.2` (clients only)

**Server usage (`server/src/lib/supabase.ts`):**
- Service role client (`supabaseAdmin`) — used exclusively server-side
- Validates incoming JWT tokens via `supabaseAdmin.auth.getUser(token)`
- Signs staff in via `supabaseAdmin.auth.signInWithPassword({ email, password })`
- Refreshes sessions via `supabaseAdmin.auth.refreshSession({ refresh_token })`
- Auth flow: `POST /api/auth/login` → Supabase validates credentials → returns JWT access token + refresh token → clients store in localStorage

**Client usage:**
- `client/cms/` and `client/main/` both include `@supabase/ssr` for SSR-compatible Supabase client

**Required env vars (server):**
- `SUPABASE_URL` — project URL (e.g. `https://xxxx.supabase.co`)
- `SUPABASE_SERVICE_ROLE_KEY` — service role secret key (never exposed to clients)

**Required env vars (clients):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Notes:**
- Staff table in Postgres mirrors Supabase Auth `auth.users` — `staff.id` = `auth.users.id`
- Token validation happens on every CMS API request via `requireAuth` middleware (`server/src/middleware/auth.ts`)

---

### Cloudinary

**Role:** Cloud image storage and transformation for menu item photos  
**SDK:** `cloudinary ^2.9.0`  
**Config:** `server/src/lib/cloudinary.ts`  
**Storage folder:** `StoneOven/menu` (constant `MENU_FOLDER`)

**Usage:**
- `POST /api/cms/menu/items/:id/image` — uploads image via `cloudinary.uploader.upload_stream`, applies transform: `{ width: 800, height: 800, crop: 'limit', quality: 'auto', fetch_format: 'auto' }`
- `DELETE /api/cms/menu/items/:id/image` — deletes image via `cloudinary.uploader.destroy(publicId)`
- `DELETE /api/cms/menu/items/:id` — also deletes Cloudinary image before DB delete
- Public ID pattern: `StoneOven/menu/item_{menuItemId}`

**Required env vars:**
- `CLOUDINARY_CLOUD_NAME` — defaults to `dfc95tllh` if not set
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

**Notes:**
- Upload uses streaming (no temp files) — multer stores file buffer in memory
- Old image is deleted before overwrite to avoid orphaned assets

---

### Twilio (WhatsApp Business)

**Role:** WhatsApp notification delivery for automation campaigns  
**SDK:** `twilio ^6.0.0`  
**Config:** `server/src/lib/notifications.ts`

**Current status: DRY_RUN mode** — Twilio SDK is installed but the call is commented out. The system logs the payload and returns `success=true` for testing. Live mode activates automatically when `TWILIO_ACCOUNT_SID` is set in `.env`.

**Automation types that use WhatsApp:**
- Birthday (5 days before, 1 day before, on day)
- Anniversary (5 days before, 1 day before, on day)
- Re-engagement (30 days since last visit)
- Welcome (on first registration — inactive by default)
- Promotional offers (manual trigger)
- Announcements (manual trigger)

**Message format:** Meta-approved WhatsApp Business templates. Template names follow pattern `stoneoven_{type}_{stage}` (e.g. `stoneoven_birthday_five_days_before`).

**Required env vars (to activate live mode):**
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_FROM` — E.164 sender number (e.g. `+14155238886`)

**Phone normalization:** All customer phones are converted to E.164 (`+91XXXXXXXXXX`) before sending via `normalizePone()` in `server/src/routes/automation.ts`.

---

### Resend

**Role:** Transactional email delivery for automation campaigns  
**SDK:** `resend ^6.12.2`  
**Config:** `server/src/lib/notifications.ts`

**Current status: DRY_RUN mode** — Resend SDK is installed but the call is commented out. Activates automatically when `RESEND_API_KEY` is set in `.env`.

**Email types:**
- Birthday HTML email (`buildBirthdayEmail`)
- Anniversary HTML email (`buildAnniversaryEmail`)
- Re-engagement HTML email (`buildReengagementEmail`)
- Generic template email with variable substitution (`buildGenericEmail`) — used for welcome, promotional, announcement campaigns
- All emails use inline CSS, dark theme (`#111` background, `#F26522` orange accent)

**From address:** `RESEND_FROM_EMAIL` env var, defaults to `StoneOven <noreply@stoneoven.in>`

**Required env vars (to activate live mode):**
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (optional, has default)

---

### Cloudflare Workers (Automation Cron)

**Role:** Daily cron scheduler that triggers the automation pipeline  
**Tooling:** `wrangler ^3.0.0`  
**Config:** `worker/wrangler.toml`  
**Source:** `worker/src/index.ts`

**How it works:**
1. Cloudflare fires the Worker at `0 3 * * *` (03:00 UTC = 08:30 IST)
2. Worker calls `POST https://api.stoneoven.in/api/automation/run` with `x-automation-secret` header
3. Express server runs the full automation loop (birthday, anniversary, re-engagement)
4. Worker also exposes `POST /trigger` for manual fire (protected by `TRIGGER_KEY`)
5. Worker exposes `POST /trigger/reengagement` for re-engagement-only manual trigger

**Wrangler secrets (set via `wrangler secret put`):**
- `AUTOMATION_SECRET` — must match `AUTOMATION_SECRET` on the Express server

**Wrangler vars (in `wrangler.toml`):**
- `SERVER_URL` = `https://api.stoneoven.in` (production)
- `SERVER_URL` = `http://localhost:8080` (development env)

**Required server env vars:**
- `AUTOMATION_SECRET` — shared secret for worker-to-server auth
- `AUTOMATION_DRY_RUN=true` — set to skip actual Twilio/Resend calls during testing

**Worker URL:** `https://stoneoven-automation.unicord26.workers.dev`

---

### FingerprintJS

**Role:** Anonymous device fingerprinting for visit deduplication and customer identification  
**SDK:** `@fingerprintjs/fingerprintjs ^5` (open-source, free tier — no API key)  
**Config:** `client/main/src/lib/fingerprint.ts`

**How it works:**
- `getDeviceFingerprint()` loads FingerprintJS once (singleton), calls `fp.get()`, returns `result.visitorId`
- Used when a customer scans a QR code at an outlet: `GET /outlet/{outletCode}` page → fingerprint runs → visit recorded via `POST /api/visits`
- Fallback if FingerprintJS fails: `fallback-{timestamp}-{random}` string
- The `deviceId` is stored on the `Customer` model and used as a unique identifier alongside phone number

**No env vars required** — open-source package, no API key needed.

---

### QR Code (qrcode npm package)

**Role:** Generate QR codes for outlet landing pages  
**Package:** `qrcode ^1.5.4`  
**Service:** `server/src/services/QRService.ts`  
**Routes:** `server/src/routes/cms/qr.ts`

**QR URL pattern:** `{NEXT_PUBLIC_APP_URL}/outlet/{outletCode}`

**Formats supported:** SVG (default), dataURL (base64 PNG), PNG buffer  
**Options:** 512px width, margin 2, dark `#1A1A1A`, light `#FFFFFF`, error correction level H

**API endpoints:**
- `GET /api/cms/qr` — all outlets, returns dataURL array
- `GET /api/cms/qr/:outletCode?format=svg|png|dataURL` — single outlet

**Required env vars:**
- `NEXT_PUBLIC_APP_URL` — base URL for QR target (defaults to `https://stoneoven.in`)

---

### Sentiment Analysis (sentiment npm package)

**Role:** Analyze customer review text for sentiment scoring  
**Package:** `sentiment ^5.0.2` (free, offline — no API key)  
**Service:** `server/src/services/SentimentService.ts`

**How it works:**
- Uses AFINN word list + custom Indian restaurant vocabulary
- Scores blend text analysis (60%) + star rating (40%)
- Output: `label` (positive/negative/neutral/mixed), `score` (0.0–1.0), `keywords` (matched words)
- Called at review submission; results stored as `sentimentLabel`, `sentimentScore`, `sentimentKeywords` on the `Review` model

**Custom domain words (weighted):** `tasty+3`, `yummy+3`, `delicious+3`, `rude-3`, `dirty-3`, `tasteless-3`, etc.

**Upgrade path noted in code:** Swap `analyze()` internals to OpenAI `gpt-4o-mini` when budget allows (no OpenAI integration currently exists).

**No env vars required.**

---

## Data Storage

### Database

- **Provider:** PostgreSQL via Supabase
- **ORM:** Prisma 7.x
- **Connection:** `pg.Pool` using `DATABASE_URL` env var, passed to `PrismaPg` adapter
- **Client init:** `server/src/lib/prisma.ts`
- **Schema source:** `server/prisma/schema.prisma`
- **Generated client:** `server/src/generated/prisma/` (also committed at `server/generated/prisma/schema.prisma`)

**Tables:**
- `outlets` — restaurant locations
- `customers` — registered customers (deviceId, phone unique keys)
- `reviews` — customer reviews with sentiment fields
- `customer_visits` — visit log (QR scan or payment)
- `menu_categories` — per-outlet menu sections
- `menu_items` — menu items with Cloudinary image URLs
- `automation_logs` — sent notification audit trail
- `staff` — CMS users (id mirrors Supabase Auth users.id)

**Required env var:**
- `DATABASE_URL` — PostgreSQL connection string

### File Storage

- **Images:** Cloudinary (menu item photos only)
- **Automation templates:** Local filesystem — `server/data/automationTemplates.json` (managed by `server/src/lib/templateStore.ts`, seeded with defaults on first boot)
- No other file storage.

### Caching

- None detected.

---

## Authentication & Identity

**Provider:** Supabase Auth  
**Flow:**
1. Staff submits username + password to `POST /api/auth/login`
2. Server looks up email by username from `staff` table
3. Server calls `supabaseAdmin.auth.signInWithPassword({ email, password })`
4. Supabase returns JWT access token + refresh token
5. CMS stores tokens in `localStorage` (`cms_token`, `cms_refresh_token`)
6. Every CMS API request attaches `Authorization: Bearer <token>`
7. `requireAuth` middleware validates token via `supabaseAdmin.auth.getUser(token)`
8. CMS auto-refreshes expired tokens (`client/cms/src/lib/api.ts` refresh queue)

**Roles (defined in `StaffRole` enum):**
- `admin` — UniCord, full access including automation
- `owner` — Nitesh Save, all outlets, no automation
- `franchise_owner` — per-outlet staff, single outlet only
- `main_owner` — deprecated, aliased to `admin`

---

## Monitoring & Observability

**Error Tracking:** None detected (no Sentry, Datadog, etc.)

**Logs:** `console.log` / `console.error` only. Automation results are logged to `automation_logs` table in PostgreSQL for audit trail.

**Health check:** `GET /api/health` returns `{ status: 'ok', timestamp }`.

---

## CI/CD & Deployment

**Hosting:**
- API server → `api.stoneoven.in`
- Main frontend → `stoneoven.in`
- Worker → Cloudflare (`stoneoven-automation.unicord26.workers.dev`)

**CI Pipeline:** None detected (no `.github/workflows/`, no CI config files).

**Worker deployment:** `wrangler deploy` from `worker/` directory.

---

## Webhooks & Callbacks

**Incoming:** None detected.

**Outgoing:**
- Worker → `POST https://api.stoneoven.in/api/automation/run` (daily cron)
- Worker → `POST https://api.stoneoven.in/api/automation/reengagement` (manual trigger endpoint)

---

## Environment Variables Summary

| Var | Package | Required | Notes |
|---|---|---|---|
| `DATABASE_URL` | server | Yes | PostgreSQL connection string |
| `SUPABASE_URL` | server | Yes | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | server | Yes | Supabase service role secret |
| `CLOUDINARY_CLOUD_NAME` | server | No | Defaults to `dfc95tllh` |
| `CLOUDINARY_API_KEY` | server | Yes (for uploads) | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | server | Yes (for uploads) | Cloudinary API secret |
| `TWILIO_ACCOUNT_SID` | server | No | Absence = DRY_RUN mode |
| `TWILIO_AUTH_TOKEN` | server | No | Absence = DRY_RUN mode |
| `TWILIO_WHATSAPP_FROM` | server | No | WhatsApp sender E.164 number |
| `RESEND_API_KEY` | server | No | Absence = DRY_RUN mode |
| `RESEND_FROM_EMAIL` | server | No | Defaults to `noreply@stoneoven.in` |
| `AUTOMATION_SECRET` | server + worker | Yes (prod) | Shared secret for worker→server auth |
| `AUTOMATION_DRY_RUN` | server | No | Set `true` to skip sends |
| `CORS_ORIGINS` | server | Yes | Comma-separated allowed origins |
| `PORT` | server | No | Defaults to `8080` |
| `NEXT_PUBLIC_API_URL` | client/main + cms | No | Defaults to `http://localhost:8080/api` |
| `NEXT_PUBLIC_APP_URL` | server (QR) | No | Defaults to `https://stoneoven.in` |
| `NEXT_PUBLIC_MOCK_API` | client/main | No | Set `true` to use mock API |
| `NEXT_PUBLIC_SUPABASE_URL` | client/main + cms | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client/main + cms | Yes | Supabase anon/public key |
| `AUTOMATION_SECRET` | worker (wrangler secret) | Yes | Must match server value |
| `TRIGGER_KEY` | worker (wrangler secret) | No | Optional manual trigger protection |

---

*Integration audit: 2026-04-25*
