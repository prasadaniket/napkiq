# Technology Stack

**Analysis Date:** 2026-04-25

## Languages

**Primary:**
- TypeScript — All four packages (server, client/main, client/cms, worker)

**Secondary:**
- None — pure TypeScript throughout

## Runtime

**Environment:**
- Node.js — `server/` (Express API) and both Next.js frontends
- Cloudflare Workers runtime — `worker/` (cron automation scheduler)

**Package Manager:**
- npm — lockfiles present per package directory

## Monorepo Layout

Four independent packages, each with its own `package.json` and `node_modules`:

| Package | Path | Port | Role |
|---|---|---|---|
| API Server | `server/` | 8080 | Express REST API |
| Main Frontend | `client/main/` | 3000 | Customer-facing public site |
| CMS Frontend | `client/cms/` | 3001 | Staff/admin dashboard |
| Automation Worker | `worker/` | — | Cloudflare cron scheduler |

---

## Server (`server/`)

**Language:** TypeScript 6.x  
**Module system:** CommonJS (`"type": "commonjs"`)  
**TS target:** ES2020  
**Dev runner:** `ts-node-dev ^2.0.0` (watch + transpile-only)  
**Build:** `tsc` → `server/dist/`  
**Entry:** `server/src/index.ts` → `server/src/app.ts`

### Framework
- `express ^5.2.1` — HTTP server, routing, middleware

### Database
- `prisma ^7.7.0` — ORM, migrations, schema
- `@prisma/client ^7.7.0` — generated query client (output to `server/src/generated/prisma/`)
- `@prisma/adapter-pg ^7.7.0` — native Prisma driver adapter for `pg`
- `pg ^8.20.0` — PostgreSQL connection pool
- Database: **PostgreSQL** hosted on Supabase

### Authentication
- `@supabase/supabase-js ^2.104.0` — Supabase Auth (service role — server-side only)
- `jsonwebtoken ^9.0.3` — type support (Supabase issues the actual JWTs)

### File Uploads
- `multer ^2.1.1` — multipart/form-data (in-memory, 5 MB limit per file)
- `cloudinary ^2.9.0` — menu item image storage and transformation

### Messaging (both currently in DRY_RUN mode)
- `twilio ^6.0.0` — WhatsApp Business API (stubbed, code ready in `server/src/lib/notifications.ts`)
- `resend ^6.12.2` — transactional email (stubbed, code ready in `server/src/lib/notifications.ts`)

### Data Processing
- `sentiment ^5.0.2` — keyword-based NLP sentiment analysis for reviews (`server/src/services/SentimentService.ts`)
- `qrcode ^1.5.4` — QR code generation (SVG, PNG, dataURL) (`server/src/services/QRService.ts`)
- `csv-stringify ^6.7.0` — CSV data export for customers and visits (`server/src/routes/cms/export.ts`)

### Validation
- `zod ^4.3.6` — request body validation (used in auth and CMS routes)

### Utilities
- `dotenv ^17.4.2` — `.env` loading
- `cors ^2.8.6` — CORS middleware (origin allowlist from `CORS_ORIGINS` env var)

### TypeScript Config (`server/tsconfig.json`)
- `strict: true`, `resolveJsonModule: true`, `declaration: true`, `declarationMap: true`, `sourceMap: true`

---

## Client: Main (`client/main/`)

**Framework:** Next.js 16.2.4 (App Router)  
**React:** 19  
**Language:** TypeScript 5.x  
**Styling:** Tailwind CSS 3.4.4 + `tailwind-merge ^3.5.0` + `clsx ^2.1.1`  
**Linting:** ESLint 9 + `eslint-config-next 16.2.4`

### Key Libraries
- `framer-motion ^12` — page/component animations
- `recharts ^3` — charts (visit stats, dashboard data visualizations)
- `axios ^1.7.2` — HTTP client; interceptors for JWT attach + mock-api switch (`client/main/src/lib/api.ts`)
- `@fingerprintjs/fingerprintjs ^5` — anonymous device fingerprinting for visit tracking (`client/main/src/lib/fingerprint.ts`)
- `@supabase/supabase-js ^2.104.0` + `@supabase/ssr ^0.10.2` — Supabase browser client
- `react-hook-form ^7.51.5` + `@hookform/resolvers ^5` — form state management
- `zod ^4` — form validation schemas
- `date-fns ^4` — date formatting utilities
- `react-hot-toast ^2.4.1` — toast notifications
- `@radix-ui/react-avatar ^1.1.11` — avatar UI primitive

### Build
- `next dev -p 3000` / `next build` / `next start -p 3000`

---

## Client: CMS (`client/cms/`)

**Framework:** Next.js 16.2.4 (App Router)  
**React:** 19  
**Language:** TypeScript 5.x  
**Styling:** Tailwind CSS 3.4.4 + `tailwind-merge ^2.5.2` + `clsx ^2.1.1`  
**UI system:** shadcn/ui (configured via `client/cms/components.json`, Radix UI primitives)  
**Linting:** ESLint 9 + `eslint-config-next 16.2.4`

### Key Libraries
- `axios ^1.7.2` — HTTP client; JWT attach + automatic refresh-token rotation on 401 (`client/cms/src/lib/api.ts`)
- `@supabase/supabase-js ^2.104.0` + `@supabase/ssr ^0.10.2` — Supabase browser client
- `react-hook-form ^7.51.5` + `@hookform/resolvers ^5` — form state management
- `zod ^4` — validation schemas
- `date-fns ^4` — date formatting
- `react-hot-toast ^2.4.1` — toast notifications
- `lucide-react ^0.468.0` — icon library
- `@radix-ui/react-avatar ^1.1.11` — avatar primitive
- `class-variance-authority ^0.7.1` — variant-based class composition (shadcn pattern)

### Build
- `next dev -p 3001` / `next build` / `next start -p 3001`

---

## Worker (`worker/`)

**Platform:** Cloudflare Workers  
**Language:** TypeScript 5.x (ES2022 modules)  
**Tooling:** `wrangler ^3.0.0` — local dev, deploy, secrets management  
**Types:** `@cloudflare/workers-types ^4.20241230.0`

**Role:** Pure HTTP scheduler — no business logic. Fires `POST /api/automation/run` at 03:00 UTC daily via cron trigger. Also exposes manual trigger endpoint at `POST /trigger`.

**Cron schedule:** `0 3 * * *` (03:00 UTC = 08:30 IST)

---

## Configuration Files

| File | Purpose |
|---|---|
| `server/tsconfig.json` | Server TS config (CommonJS, ES2020, strict) |
| `server/prisma/schema.prisma` | Prisma source schema (bare — no models, used for migration) |
| `server/generated/prisma/schema.prisma` | Full schema with all models and enums (committed) |
| `client/main/next.config.js` | Next.js image remote patterns (`api.stoneoven.in`, `localhost`) |
| `client/cms/next.config.js` | Next.js image remote patterns (same as main) |
| `client/cms/components.json` | shadcn/ui component registry config |
| `client/main/tailwind.config.ts` | Tailwind configuration |
| `client/cms/tailwind.config.ts` | Tailwind configuration |
| `worker/wrangler.toml` | Cloudflare Worker: cron, account ID, `SERVER_URL` env var |

## Platform Requirements

**Development:**
- Node.js (no `.nvmrc` — version unpinned)
- PostgreSQL via Supabase (cloud-hosted, no local DB required)
- `npm install` must be run independently in each package directory

**Production:**
- Express server → `https://api.stoneoven.in`
- Main frontend → `https://stoneoven.in`
- CMS frontend → separate deployment (port 3001 locally)
- Worker → Cloudflare account `11de51483dbed991a23c44341f0ca00d`, deployed as `stoneoven-automation`

---

*Stack analysis: 2026-04-25*
