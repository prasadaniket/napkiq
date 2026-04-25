# Codebase Concerns

**Analysis Date:** 2026-04-25

---

## Tech Debt

**Prisma schema source-of-truth confusion:**
- Issue: `server/prisma.config.ts` points `schema` at `server/prisma/schema.prisma`, which contains only a 4-line stub (blank generator + empty datasource, zero models). The real schema (212 lines, all models and enums) lives in `server/generated/prisma/schema.prisma`. The Prisma CLI uses `DIRECT_URL` via `prisma.config.ts`; the runtime client uses `DATABASE_URL` via the `PrismaPg` adapter in `server/src/lib/prisma.ts`. These are two separate connection paths and the config file points to the wrong schema.
- Files: `server/prisma/schema.prisma`, `server/generated/prisma/schema.prisma`, `server/prisma.config.ts`, `server/src/lib/prisma.ts`
- Impact: Running any Prisma CLI command (`prisma generate`, `prisma migrate`) via the config operates on the empty stub and produces a useless result. Any developer following standard Prisma docs will be confused. Migrations require manual redirection.
- Fix approach: Either move the full schema into `server/prisma/schema.prisma` so the config is correct, or update `server/prisma.config.ts` to set `schema: 'generated/prisma/schema.prisma'`. Reconcile so CLI and runtime share the same schema file.

**DB columns are camelCase — raw SQL requires double-quoted identifiers:**
- Issue: Prisma field names are camelCase (e.g. `fullName`, `birthDate`, `firstVisitOutletId`). Because no `@map` directives are used, Prisma generates PostgreSQL columns with exactly those names. PostgreSQL folds unquoted identifiers to lowercase, so any raw SQL or manual migration must double-quote column names (e.g. `"fullName"` not `full_name` or `fullName`).
- Files: `server/generated/prisma/schema.prisma` — all models
- Impact: Any raw SQL query, admin tool, or migration script that does not quote identifiers will silently resolve to wrong columns or fail. New fields added without `@map` conventions will continue this pattern.
- Fix approach: Either run a migration to rename all columns to `snake_case` with `@map` directives (large, risky), or document clearly that all raw SQL targeting this database must use double-quoted camelCase column names.

**`main_owner` role is deprecated but still in DB enum and auth middleware:**
- Issue: `StaffRole` enum in `server/generated/prisma/schema.prisma` retains `main_owner` marked `@deprecated`. The auth middleware at `server/src/middleware/auth.ts:54` maps it to `admin` for backward compat. No migration removes it.
- Files: `server/generated/prisma/schema.prisma`, `server/src/middleware/auth.ts`
- Impact: Any `main_owner` rows in the DB silently become `admin`. This is intentional but the deprecated enum value will never be cleaned up without an explicit migration. Such rows will not appear as `admin` in any CMS staff listing that reads the raw role value.
- Fix approach: Write a Prisma migration that updates all `main_owner` rows to `admin`, then remove the enum value and the compat branch in `requireAuth`.

**`requireMainOwner` middleware is deprecated but still exported:**
- Issue: `server/src/middleware/auth.ts:102` exports `requireMainOwner` marked `@deprecated` — it simply delegates to `requireAdmin`. No routes currently use it but it adds unnecessary surface area.
- Files: `server/src/middleware/auth.ts`
- Fix approach: Grep all routes for `requireMainOwner` usage, confirm zero, then delete the export.

**Hardcoded per-outlet menu components not driven by the DB menu system:**
- Issue: `client/main/src/components/menu/virarmenu.tsx`, `boisarmenu.tsx`, `vasaimenu.tsx`, `palgharmenu.tsx` each export static arrays of menu items hardcoded in TypeScript. These are completely disconnected from the `MenuCategory` / `MenuItem` DB tables managed via the CMS.
- Files: `client/main/src/components/menu/virarmenu.tsx`, `client/main/src/components/menu/boisarmenu.tsx`, `client/main/src/components/menu/vasaimenu.tsx`, `client/main/src/components/menu/palgharmenu.tsx`
- Impact: Menu changes made in the CMS are not reflected on the public-facing site for any outlet using these components. Only the dynamic `client/main/src/app/outlet/[code]/menu/page.tsx` route reads from the API.
- Fix approach: Replace all hardcoded menu arrays with API-driven data using the `GET /api/menu?outletId=` endpoint, matching the pattern already used in `client/main/src/app/outlet/[code]/menu/page.tsx`.

**`outletConfig` hardcodes outlet slugs and `hasMenu` flag:**
- Issue: `client/main/src/lib/outletConfig.ts` hardcodes four outlet slugs (boisar, palghar, virar, vasai) and whether each has a menu. Adding a new outlet requires a code change and a frontend deploy.
- Files: `client/main/src/lib/outletConfig.ts`, `client/main/src/app/outlet/[code]/menu/page.tsx`
- Fix approach: Derive `hasMenu` dynamically by checking whether the outlet has any active `MenuCategory` rows, removing the need for `outletConfig` entirely.

**`normalizePone` function has a typo in its name:**
- Issue: `server/src/routes/automation.ts:37` defines `normalizePone` (missing an 'h'). It is called in multiple places within the same file.
- Files: `server/src/routes/automation.ts`
- Impact: Cosmetic, but will cause confusion when the automation module is extended.
- Fix approach: Rename to `normalizePhone` in both definition and all call sites (6 occurrences).

**Automation route uses `as any` for Prisma enum fields:**
- Issue: `server/src/routes/automation.ts` passes `automationType` and `messageStage` strings as `as any` casts to Prisma queries in `alreadySent()` and `logSend()`. The helper functions `requireWorkerSecret` and `dualAuth` also type their Express parameters as `req: any, res: any, next: any`.
- Files: `server/src/routes/automation.ts`
- Impact: Type safety is lost — wrong enum values would compile successfully but fail at runtime. Middleware typing loses Express type inference.
- Fix approach: Import and use the Prisma-generated `AutomationType` and `MessageStage` enums for string → enum conversion. Type middleware parameters with Express `Request`, `Response`, `NextFunction`.

**Template store uses filesystem instead of the database:**
- Issue: Automation templates are stored in `server/data/automationTemplates.json` on the local filesystem via `fs.writeFileSync`. The store reads the file on every GET and writes on every PUT.
- Files: `server/src/lib/templateStore.ts`
- Impact: On a multi-instance or containerised deployment, each instance has its own copy of the file. Template edits on one instance are not visible to others. With ephemeral storage, edits are lost on restart. No startup check that `data/` is writable.
- Fix approach: Move templates to a `AutomationTemplate` database table managed via Prisma. This eliminates filesystem dependency and works correctly at scale.

---

## Security Considerations

**`AUTOMATION_SECRET` defaults to `change-me-before-deploy`:**
- Risk: If deployed without changing the secret, any caller who knows the default can trigger the full automation run (birthday/anniversary/reengagement sends for all customers) without authentication.
- Files: `server/.env`, `server/src/routes/automation.ts:18`, `worker/wrangler.toml`
- Current mitigation: The header check is present in `requireWorkerSecret`. Only protection is that the default must be manually changed.
- Recommendations: Add a server startup assertion that hard-fails at boot if `AUTOMATION_SECRET` is absent or still set to the default value.

**CORS defaults to deny all — no production domains configured:**
- Risk: `CORS_ORIGINS` is read from env. If unset, `allowedOrigins` is `['']` and all browser requests from any non-empty origin are rejected. Browser requests from `stoneoven.in` and the CMS domain will fail silently in production.
- Files: `server/src/app.ts:27-42`, `server/.env`
- Current mitigation: None — env var must be set manually before go-live.
- Recommendations: Create a `.env.example` file documenting required env vars. Production value should include `https://stoneoven.in`, `https://www.stoneoven.in`, and the CMS subdomain.

**No rate limiting on public write endpoints:**
- Risk: `POST /api/customers`, `POST /api/reviews`, and `POST /api/visits` are unauthenticated and have no IP-level rate limiting. A script could flood the customers table with fake entries, inflate review ratings, or corrupt visit counts.
- Files: `server/src/routes/customers.ts`, `server/src/routes/reviews.ts`, `server/src/routes/visits.ts`, `server/src/app.ts`
- Current mitigation: Zod validation rejects malformed payloads; phone uniqueness limits duplicate phones. No token-bucket or IP-based limiting.
- Recommendations: Add `express-rate-limit` on all three public write routes before production launch (suggested: 10 requests per IP per minute).

**Error handler exposes raw error messages in production:**
- Risk: `server/src/middleware/errorHandler.ts` returns `err.message` to the client in all environments. Prisma errors frequently include table names, column names, and constraint details which expose schema internals.
- Files: `server/src/middleware/errorHandler.ts`
- Current mitigation: None.
- Recommendations: In production (`NODE_ENV === 'production'`), return a generic `'Internal server error'` message only. Log the full error and stack server-side.

---

## Notifications — DRY_RUN Active

**All notification sending is disabled (DRY_RUN mode):**
- Issue: `DRY_RUN` is `true` whenever `TWILIO_ACCOUNT_SID` or `RESEND_API_KEY` are absent from env. Both are currently unset. All `sendWhatsApp` and `sendEmail` calls log to console and return `true` without sending. `automation_logs` records are written with `status: 'success'` even though no message was delivered.
- Files: `server/src/lib/notifications.ts:14-17`
- Impact: All automation runs appear successful in the CMS logs but no customer has received any WhatsApp or email. Historical log data showing "success" is unreliable and will need to be cleared or flagged before going live.
- Fix approach:
  - Provision Twilio account + get Meta WhatsApp template approvals. Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` in env. Uncomment the Twilio block in `sendWhatsApp`.
  - Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL` in env. Uncomment the Resend block in `sendEmail`.
  - Consider adding a `DRY_RUN` flag to `AutomationLog` so test runs are distinguishable from real sends in the CMS.

**Twilio WhatsApp Meta template integration not implemented:**
- Issue: Even after Twilio credentials are set, the commented-out Twilio block references `buildTemplateBody()` (a function that does not exist) and has two placeholder approaches (`body` text vs `contentSid`) for Meta template delivery with neither implemented. Template names like `stoneoven_birthday_five_days_before` are referenced in code but not validated against Meta Business Manager.
- Files: `server/src/lib/notifications.ts:37-52`, `server/src/routes/automation.ts`
- Fix approach: Decide on Twilio Content API (contentSid + contentVariables) or plain body approach. Implement one path. Register and obtain Meta approval for all templates referenced in the automation router before enabling.

**No OpenAI API key configured — keyword-based sentiment only:**
- Issue: No `OPENAI_API_KEY` is present and the `openai` package is not in `server/package.json`. The upgrade path to AI-based sentiment is documented in comments but not implemented.
- Files: `server/src/services/SentimentService.ts`, `server/package.json`
- Impact: All reviews use keyword-based scoring. Complex reviews, sarcasm, Hinglish text, or context-dependent phrases will be misclassified. `sentimentLabel` and `sentimentScore` stored in the `reviews` table are low-confidence signals.
- Fix approach: Add `openai` to dependencies, configure `OPENAI_API_KEY`, and implement the AI path inside `SentimentService.analyze()`. The service interface is already abstracted — callers require no changes.

---

## Automation Logic Concerns

**Automation runner loads all customers into memory at once:**
- Issue: `runAutomation()` calls `prisma.customer.findMany()` with no pagination or batching. Promotional and announcement route handlers also load all customers in a single query without even an email filter.
- Files: `server/src/routes/automation.ts:100`, promotional and announcement handlers
- Impact: As the customer base grows, this will cause memory pressure. At 10k+ customers, a single automation run may load several megabytes into Node.js heap and risk OOM errors.
- Fix approach: Process customers in batches (100–500 at a time) using cursor-based pagination with `skip`/`take`. Non-breaking refactor to each automation handler.

**Automation only targets customers with non-null email — WhatsApp excluded for no-email customers:**
- Issue: `runAutomation()` filters `where: { email: { not: null } }`. Customers who registered without an optional email are excluded from all automation, including birthday WhatsApp which does not require email.
- Files: `server/src/routes/automation.ts:99-111`
- Impact: WhatsApp birthday/anniversary messages are never sent to the subset of customers who skipped the optional email field.
- Fix approach: Split the customer query — fetch all customers for WhatsApp automation, fetch only customers with email for email automation.

**QR codes embed `NEXT_PUBLIC_APP_URL` — wrong URL if env is unset:**
- Issue: `QRService.baseUrl` returns `process.env.NEXT_PUBLIC_APP_URL ?? 'https://stoneoven.in'`. If the env var is not set in the server environment, QR codes fall back to production URL. In dev/staging, downloaded or printed QR codes permanently embed the wrong domain.
- Files: `server/src/services/QRService.ts:13-15`, `server/src/routes/cms/qr.ts:64`
- Impact: A QR code downloaded from a non-production CMS instance will scan to the production domain. Physically printed QR codes cannot be corrected after printing.
- Fix approach: Assert `NEXT_PUBLIC_APP_URL` is explicitly set and non-empty at server startup. Throw at boot rather than silently falling back.

**Birthday/anniversary dashboard count compares full date (includes year) — always returns 0:**
- Issue: `birthdaysThisMonth` and `anniversariesThisMonth` in the dashboard stats are counted using `{ birthDate: { gte: monthStart, lte: monthEnd } }`. This compares the full stored `DateTime` including year against the current calendar month range. A customer born on 1995-03-15 only matches when the current year is 1995 — i.e. never.
- Files: `server/src/routes/cms/dashboard.ts:116-117`
- Impact: The dashboard birthday and anniversary stats show 0 in virtually all cases. This is a silent data accuracy bug affecting CMS reporting.
- Fix approach: Use `EXTRACT(MONTH FROM "birthDate") = EXTRACT(MONTH FROM NOW())` via a Prisma `$queryRaw`, or add indexed computed columns for `birthMonth` and `anniversaryMonth` to the schema.

---

## Schema / Type Mismatches

**`Outlet.location` and `address` are nullable in DB but typed as non-nullable in frontend:**
- Issue: `server/generated/prisma/schema.prisma` declares `location String?` and `address String?`. The TypeScript type in `client/main/src/types/outlet.ts` declares `location: string` and `address: string` (non-nullable).
- Files: `client/main/src/types/outlet.ts`, `server/generated/prisma/schema.prisma`
- Impact: If any outlet row has a null `location`, pages that render `{outlet.location}` directly will render `"null"` or throw. `client/main/src/app/outlet/[code]/page.tsx` renders `{outlet.location}` without a null guard.
- Fix approach: Update `client/main/src/types/outlet.ts` to `location: string | null` and `address: string | null`, then add null guards at all render call sites.

**`Staff.username` is nullable — staff without username will render broken UI:**
- Issue: `server/generated/prisma/schema.prisma` declares `username String?`. Any staff row created without running the setup script will have `username = null`. CMS UI elements displaying the username will render nothing or crash.
- Files: `server/generated/prisma/schema.prisma`, `server/src/routes/auth.ts`
- Fix approach: Add a non-null fallback (`staff.username ?? staff.email`) wherever `username` is displayed in the CMS frontend.

---

## Missing Infrastructure

**No test suite:**
- Issue: Zero `.test.ts`, `.spec.ts`, or `.test.tsx` files exist in `server/`, `client/main/`, `client/cms/`, or `worker/`. No test runner is configured in any `package.json`. No `test` script in `server/package.json`.
- Files: All `package.json` files
- Impact: No regression protection on auth middleware, RBAC logic, automation date calculations, sentiment analysis, or API contracts. Any refactor proceeds without a safety net.
- Priority: High — especially for `server/src/middleware/auth.ts`, `server/src/routes/automation.ts`, and the `requireWorkerSecret` guard.
- Fix approach: Add Vitest to `server/`. Priority test targets:
  - `server/src/middleware/auth.ts` — `requireAuth`, `requireAdmin`, `requireOwnerOrAbove`, and the `main_owner → admin` mapping
  - `server/src/routes/automation.ts` — `isSameMonthDay`, `addDays`, `alreadySent`, stage selection logic, re-engagement threshold
  - `server/src/routes/customers.ts` — phone-collision upsert edge case (`P2002` handler)
  - `server/src/services/SentimentService.ts` — pure functions, easiest to start

**Cloudflare Worker `account_id` hardcoded in wrangler.toml:**
- Issue: `worker/wrangler.toml:5` contains a literal Cloudflare account ID. This is not a secret but it ties the worker to a specific account and cannot be overridden per environment without editing the file.
- Files: `worker/wrangler.toml`
- Impact: Low security risk; operational concern if account ownership changes or if the project is handed off.

---

*Concerns audit: 2026-04-25*
