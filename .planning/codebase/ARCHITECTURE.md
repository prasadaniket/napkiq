# Architecture

**Analysis Date:** 2026-04-25

## Pattern Overview

**Overall:** Multi-tier monorepo — Express REST API + two Next.js frontends + a Cloudflare Worker cron scheduler

**Key Characteristics:**
- All business logic lives in the Express server (`server/`); the two Next.js apps are pure UI consumers
- No controllers layer — routes ARE the controllers (thin route handlers calling Prisma directly, or calling a service class)
- OOP service layer (`BaseService` → `SentimentService`, `QRService`) used only where shared logic or encapsulation is warranted; simple CRUD routes stay inline
- Auth is stateless JWT: Supabase issues the token, the server verifies it via `supabaseAdmin.auth.getUser()` on every protected request
- Role-based access enforced as Express middleware composed inline (`requireAuth → requireAdmin / requireOwnerOrAbove`)
- The Cloudflare Worker is a pure HTTP client / cron trigger — it contains zero business logic, only calls the server

---

## Layers

**Public REST API:**
- Purpose: Serve the customer-facing Next.js app (main client)
- Location: `server/src/routes/` (top-level files)
- Contains: `outlets.ts`, `customers.ts`, `reviews.ts`, `visits.ts`, `menu.ts`
- Auth: None — fully public
- Depends on: Prisma client, `SentimentService` (for reviews)

**CMS REST API:**
- Purpose: Serve the staff CMS Next.js app
- Location: `server/src/routes/cms/`
- Contains: `dashboard.ts`, `customers.ts`, `reviews.ts`, `outlets.ts`, `visits.ts`, `automationLogs.ts`, `automationTemplates.ts`, `export.ts`, `menu.ts`, `qr.ts`
- Auth: `requireAuth` middleware applied to every CMS router via `router.use(requireAuth)`; specific routes additionally require `requireAdmin` or `requireOwnerOrAbove`
- Depends on: Prisma client, `QRService`

**Auth Routes:**
- Purpose: Login, token refresh, session restoration
- Location: `server/src/routes/auth.ts`
- Endpoints: `POST /api/auth/login`, `POST /api/auth/refresh`, `GET /api/auth/me`
- Pattern: Resolves username → email via Prisma Staff lookup → delegates password check to `supabaseAdmin.auth.signInWithPassword()`

**Automation Routes:**
- Purpose: Daily birthday/anniversary/re-engagement messaging; triggered by Cloudflare Worker or CMS admin
- Location: `server/src/routes/automation.ts`
- Auth: Dual — either `x-automation-secret` header (Worker) OR `requireAuth + requireAdmin` (CMS manual trigger)
- Endpoints: `POST /api/automation/run`, `/reengagement`, `/welcome`, `/promotional`, `/announcement`

**Services Layer (OOP):**
- Purpose: Encapsulate non-trivial cross-cutting logic
- Location: `server/src/services/`

  - `BaseService.ts` — Abstract parent class. Provides `protected prisma`, `handleError(error, context)`, and `paginate<T>(items, total, page, size)`. All service classes extend this.
  - `SentimentService.ts` — Analyzes review text + star rating. Blends keyword-based text score (60%) with normalized star score (40%). Returns `{ label: 'positive'|'negative'|'neutral'|'mixed', score: 0.0–1.0, keywords: string[] }`. Includes Indian restaurant custom word list. Singleton exported as `sentimentService`.
  - `QRService.ts` — Generates SVG / dataURL / PNG QR codes for outlet landing pages. URL pattern: `{APP_URL}/outlet/{outletCode}`. Error correction level H. Singleton exported as `qrService`.

**Middleware:**
- Location: `server/src/middleware/`
- `auth.ts` — `requireAuth` (Bearer JWT verify via `supabaseAdmin.auth.getUser()` + Prisma Staff lookup → attaches `req.staff: StaffPayload`), `requireAdmin` (role === 'admin'), `requireOwnerOrAbove` (role admin|owner), `requireMainOwner` (deprecated alias → `requireAdmin`)
- `errorHandler.ts` — Global Express error handler; logs stack trace, returns `{ error: message }` JSON with HTTP 500

**Library Singletons:**
- Location: `server/src/lib/`
- `prisma.ts` — PrismaClient singleton using `@prisma/adapter-pg` (PostgreSQL connection pool via `pg.Pool`)
- `supabase.ts` — `supabaseAdmin` client using service-role key (server-only; `autoRefreshToken: false`, `persistSession: false`)
- `cloudinary.ts` — Cloudinary v2 client configured from env; exports `cloudinary` instance and `MENU_FOLDER = 'StoneOven/menu'`
- `notifications.ts` — WhatsApp (Twilio) + Email (Resend) send functions. Currently in DRY_RUN mode (logs payload, returns `true`) until API credentials are set in env. Upgrade path: uncomment Twilio / Resend blocks.
- `templateStore.ts` — File-based automation template store at `server/data/automationTemplates.json`. Provides `readTemplates()`, `getTemplate(key)`, `updateTemplate(key, updates)`. On read, merges persisted data with `DEFAULT_TEMPLATES` so new keys appear automatically.
- `paginate.ts` — Standalone `paginate<T>()` helper (also available as `BaseService.paginate()`)

**Customer-facing Frontend (`client/main`):**
- Purpose: QR landing page, first-visit feedback form, repeat review form, menu display, outlet-specific static landing pages
- Location: `client/main/src/`
- Framework: Next.js 14 App Router
- Auth: None (all routes public). Device identity via FingerprintJS.
- API: Axios instance at `client/main/src/lib/api.ts` pointing to `NEXT_PUBLIC_API_URL`

**CMS Frontend (`client/cms`):**
- Purpose: Staff dashboard — customers, reviews, visits, outlets, automation templates, menu management, QR download, CSV export
- Location: `client/cms/src/`
- Framework: Next.js 14 App Router with route group `(cms)` protected by auth guard
- Auth: Cookie-based JWT (`cms_token`, `cms_refresh_token`, `cms_user`). `AuthContext` (`client/cms/src/context/AuthContext.tsx`) provides `isAdmin`, `isOwner`, `isFranchise`, `isOwnerOrAbove` boolean helpers. Axios interceptor in `client/cms/src/lib/api.ts` auto-refreshes on 401.

**Cloudflare Worker (`worker/`):**
- Purpose: Cron scheduler only — fires `POST /api/automation/run` daily at 03:00 UTC (08:30 IST)
- Location: `worker/src/index.ts`
- Contains zero business logic; authenticates via `AUTOMATION_SECRET` header
- Manual HTTP endpoint: `POST /trigger` (guarded by `TRIGGER_KEY`)

---

## Data Flow

**QR Scan → Visit Recorded:**

1. Customer scans outlet QR code → browser opens `client/main` at `/outlet/{code}`
2. `useDeviceFingerprint` (`client/main/src/hooks/useDeviceFingerprint.ts`) loads FingerprintJS, returns stable `visitorId` as `deviceId`
3. `useOutlet(code)` calls `GET /api/outlets/{code}` → resolves Outlet by `slug` or `code` field
4. `useCustomer(deviceId)` calls `GET /api/customers/by-device/{deviceId}` → returns existing Customer or 404 (new visitor)
5. On mount: `POST /api/visits` with `{ deviceId, outletId, visitType: 'qr_scan' }` — fires and forgets
6. Server creates `CustomerVisit` record; if `customerId` present, increments `customer.totalVisits` and updates `lastVisitDate`

**First Visit Feedback → Customer + Review Created:**

1. Customer taps "Your First Visit" → `/outlet/{code}/feedback`
2. `FeedbackForm` (`client/main/src/components/form1/feedback.tsx`) collects: name, phone, email, birthDate, anniversaryDate, gender, maritalStatus, stars (1–5), reviewText
3. Submit: `POST /api/customers` (upsert on `deviceId`; handles P2002 phone collision by relinking deviceId)
4. Then: `POST /api/reviews` with `reviewType: 'first_visit'`
5. Server calls `sentimentService.analyze(reviewText, stars)` → stores `sentimentLabel`, `sentimentScore`, `sentimentKeywords` on Review
6. If first-visit review: sets `customer.hasSubmittedFirstReview = true`
7. If review text present: copied to clipboard so customer can paste into Google Review

**Repeat Visit Review:**

1. Customer taps "Share Your Experience" → `/outlet/{code}/review`
2. `ReviewForm` (`client/main/src/components/form2/review.tsx`) collects stars + text (no re-registration)
3. `POST /api/reviews` with `reviewType: 'repeat'` → same sentiment pipeline

**CMS Auth Flow:**

1. Staff navigates to CMS `/login`
2. `POST /api/auth/login` with `{ username, password }`
3. Server: Prisma lookup `Staff.username` → gets email → `supabaseAdmin.auth.signInWithPassword(email, password)`
4. Returns JWT `access_token` + `refresh_token` + Staff profile (role, assignedOutletId)
5. CMS saves tokens to `SameSite=Lax` cookies; user object to `cms_user` cookie
6. `AuthContext` hydrates from cookies on mount; sets role booleans
7. All CMS API calls attach `Authorization: Bearer {token}` via Axios request interceptor
8. On 401: interceptor calls `POST /api/auth/refresh`, queues in-flight requests, retries with new token

**Automation Daily Run:**

1. Cloudflare Worker cron fires at 03:00 UTC
2. `POST /api/automation/run` with `x-automation-secret` header
3. Server: loads all customers with emails; iterates birthday / anniversary / re-engagement rules
4. Deduplicates via `automationLog` lookup — checks if same `customerId + automationType + stage` was already sent today
5. Calls `sendWhatsApp()` and `sendEmail()` — DRY_RUN mode until provider env vars set
6. Creates `AutomationLog` row per attempt with `status: 'success' | 'failed'`

---

## Key Abstractions

**BaseService (`server/src/services/BaseService.ts`):**
- Pattern: Extend with `class XyzService extends BaseService { ... }`; export singleton instance
- Provides: `protected prisma`, `handleError(error, context): never`, `paginate<T>(items, total, page, size)`

**SentimentService (`server/src/services/SentimentService.ts`):**
- Called inline in `server/src/routes/reviews.ts` before every Review create
- Caller only calls `sentimentService.analyze(text, stars)` — internals are fully encapsulated

**QRService (`server/src/services/QRService.ts`):**
- Called from `server/src/routes/cms/qr.ts`
- Derives outlet URL from `NEXT_PUBLIC_APP_URL` env var

**AutomationTemplate (`server/src/lib/templateStore.ts`):**
- Flat-file persistence at `server/data/automationTemplates.json` (not in DB)
- 12 default template keys: `birthday_*`, `anniversary_*`, `reengagement_*`, `welcome_*`, `promotional_*`, `announcement_*` (each with `_whatsapp` and `_email` variants)
- CMS can update `subject`, `body`, `linkUrl`, `imageUrl`, `isActive` per template

**StaffPayload (`server/src/middleware/auth.ts`):**
- Type: `{ id: string, fullName: string, email: string, role: 'admin'|'owner'|'franchise_owner', assignedOutletId: string|null }`
- Attached to `req.staff` after every successful `requireAuth`

**PageResponse (pagination envelope):**
- Server side: `server/src/lib/paginate.ts`
- Client type: `client/cms/src/types/api.ts` → `PageResponse<T>`
- Shape: `{ content: T[], totalElements, totalPages, size, number, first, last }`

---

## Entry Points

**Server process (`server/src/index.ts`):**
- Sets DNS servers to Google (8.8.8.8 / 8.8.4.4 / 1.1.1.1) before imports to resolve `*.supabase.co`
- Calls `createApp()` from `server/src/app.ts`; starts HTTP on `PORT` (default 8080)

**Express app factory (`server/src/app.ts`):**
- CORS: allowlist from `CORS_ORIGINS` env var; `credentials: true`
- Registers all public routes under `/api/`, CMS routes under `/api/cms/`, automation under `/api/automation/`
- Mounts global `errorHandler` last

**CMS root layout (`client/cms/src/app/layout.tsx`):**
- Minimal — provides font, global CSS

**CMS auth-guarded layout (`client/cms/src/app/(cms)/layout.tsx`):**
- Wraps all CMS pages in `<AuthProvider>` + `<CmsShell>` (redirects unauthenticated users to `/login`)
- Renders `<CMSSidebar>` + `<main>` shell

**Main app root (`client/main/src/app/layout.tsx`):**
- Minimal — no auth; all pages public

**Cloudflare Worker (`worker/src/index.ts`):**
- `scheduled()` handler: fires daily at `0 3 * * *` (Cloudflare cron syntax)
- `fetch()` handler: health check at `/`, manual trigger at `POST /trigger`

---

## Error Handling

**Strategy:** Express centralised error handler at `server/src/middleware/errorHandler.ts`. All route handlers use `try/catch` and call `next(err)`. The handler logs the stack and returns `{ error: message }` with HTTP 500.

**Notable patterns:**
- Zod `parse()` throws `ZodError` on invalid input — global handler catches and serialises
- Prisma error code `P2002` (unique constraint) caught explicitly in `POST /api/customers` to handle phone number collision gracefully (relinks `deviceId` to existing customer)
- `BaseService.handleError()` logs with class name context before re-throwing for upstream handling

---

## Auth Model

**Roles (3 active, 1 deprecated):**
- `admin` — UniCord staff; full access + automation trigger
- `owner` — Restaurant owner; all outlets read, no automation
- `franchise_owner` — Branch manager; scoped to `assignedOutletId` only
- `main_owner` — Deprecated; transparently remapped to `admin` in `requireAuth`

**Franchise outlet scoping:**
- `dashboard.ts`, `reviews.ts`, `visits.ts`, `outlets.ts` all check `req.staff.role === 'franchise_owner'` and substitute `assignedOutletId` — query-param outlet filters are ignored for franchise owners

**Token lifecycle:**
- Supabase issues `access_token` (short TTL) + `refresh_token`
- CMS Axios interceptor auto-refreshes on 401 via `POST /api/auth/refresh`, queues concurrent requests
- Stored in `SameSite=Lax` cookies (not localStorage) for middleware compatibility

---

## Cross-Cutting Concerns

**Logging:** `console.error` / `console.log` only; no structured logging library. Automation logs prefixed `[AUTOMATION]` or `[AUTOMATION:DRY_RUN]`.

**Validation:** Zod schemas inline in route files on server. Frontend uses `react-hook-form` + `zodResolver` + schemas from `client/main/src/lib/validators.ts`.

**Pagination:** All CMS list endpoints call the standalone `paginate()` helper, returning the `PageResponse` envelope. CMS `types/api.ts` has the `PageResponse<T>` generic type.

**CORS:** Allowlist-based via `CORS_ORIGINS` env var (comma-separated). `credentials: true` required for cookie-bearing CMS requests.

**DNS override:** `server/src/index.ts` sets Google DNS servers before all other imports to ensure `*.supabase.co` resolves in development/production environments where ISP DNS may fail.

---

*Architecture analysis: 2026-04-25*
