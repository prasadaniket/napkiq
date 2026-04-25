# Codebase Structure

**Analysis Date:** 2026-04-25

## Top-Level Layout

```
StoneOven/
├── client/
│   ├── main/          # Public customer frontend (stoneoven.in)
│   ├── cms/           # CMS admin frontend
│   └── shared/        # Placeholder — empty, no shared code yet
├── server/            # Express REST API
├── worker/            # Cloudflare Worker cron scheduler
├── .planning/
│   └── codebase/      # Codebase map documents (this file)
└── .git/
```

---

## server/

```
server/
├── src/
│   ├── index.ts              # Entrypoint: Google DNS override, createApp(), HTTP listen()
│   ├── app.ts                # Express factory: CORS allowlist, JSON body, all route mounts, errorHandler
│   ├── middleware/
│   │   ├── auth.ts           # requireAuth (JWT + Prisma Staff lookup), requireAdmin, requireOwnerOrAbove, requireMainOwner (deprecated)
│   │   └── errorHandler.ts   # Global error handler → { error: message } JSON with 500
│   ├── routes/
│   │   ├── outlets.ts        # GET /api/outlets, GET /api/outlets/:code (public)
│   │   ├── customers.ts      # GET /api/customers/by-device/:id, POST /api/customers (upsert on deviceId)
│   │   ├── visits.ts         # POST /api/visits (records QR scan / payment visit)
│   │   ├── reviews.ts        # POST /api/reviews (calls SentimentService inline)
│   │   ├── menu.ts           # GET /api/menu (public)
│   │   ├── auth.ts           # POST /api/auth/login, POST /api/auth/refresh, GET /api/auth/me
│   │   ├── automation.ts     # POST /api/automation/run|reengagement|welcome|promotional|announcement (dual-auth)
│   │   └── cms/
│   │       ├── dashboard.ts         # GET /api/cms/dashboard/stats (scoped by role/outlet)
│   │       ├── customers.ts         # GET /api/cms/customers, GET /api/cms/customers/:id
│   │       ├── reviews.ts           # GET /api/cms/reviews (paginated, filterable)
│   │       ├── outlets.ts           # GET /api/cms/outlets, /stats, /:id (analytics)
│   │       ├── visits.ts            # GET /api/cms/visits, /summary
│   │       ├── automationLogs.ts    # GET /api/cms/automation-logs
│   │       ├── automationTemplates.ts # GET/PATCH /api/cms/automation-templates/:key
│   │       ├── export.ts            # GET /api/cms/export/customers|visits (CSV download)
│   │       ├── menu.ts              # Full CRUD /api/cms/menu (categories + items + Cloudinary image upload)
│   │       └── qr.ts                # GET /api/cms/qr/:outletCode (SVG/dataURL QR generation)
│   ├── services/
│   │   ├── BaseService.ts    # Abstract parent — protected prisma, handleError(), paginate()
│   │   ├── SentimentService.ts # Text + star sentiment analysis; singleton sentimentService
│   │   └── QRService.ts      # QR code generation (SVG/dataURL/PNG); singleton qrService
│   ├── lib/
│   │   ├── prisma.ts         # PrismaClient singleton via @prisma/adapter-pg (pg.Pool)
│   │   ├── supabase.ts       # supabaseAdmin (service-role key; autoRefreshToken: false)
│   │   ├── cloudinary.ts     # Cloudinary v2 config; MENU_FOLDER = 'StoneOven/menu'
│   │   ├── notifications.ts  # sendWhatsApp(), sendEmail(), HTML email builders (DRY_RUN until providers configured)
│   │   ├── templateStore.ts  # File-based template store at server/data/automationTemplates.json
│   │   └── paginate.ts       # Stateless paginate<T>() → PageResponse envelope
│   └── scripts/
│       ├── setup_staff.ts    # One-time: create Staff records in Prisma + Supabase Auth
│       ├── remove_old_staff.ts # One-time: remove deprecated staff accounts
│       └── wipe_data.ts      # Dev utility: truncate customer/visit/review data
├── prisma/
│   └── schema.prisma         # Prisma schema source-of-truth (models: Outlet, Customer, CustomerVisit, Review, Staff, MenuItem, MenuCategory, AutomationLog)
├── generated/
│   └── prisma/               # Auto-generated Prisma client (output of npx prisma generate)
├── data/
│   └── automationTemplates.json # Persisted automation template overrides (auto-created on first boot)
└── scratch/                  # Throwaway dev files (not part of app)
```

### Key server files

| File | Purpose |
|------|---------|
| `server/src/app.ts` | All route mounts are here — start here to trace any endpoint |
| `server/src/middleware/auth.ts` | All RBAC logic — `requireAuth`, `requireAdmin`, `requireOwnerOrAbove` |
| `server/src/routes/automation.ts` | All automation types + dual-auth pattern (Worker secret OR CMS admin JWT) |
| `server/src/lib/notifications.ts` | WhatsApp + Email stubs + HTML email builders — uncomment providers here |
| `server/src/lib/templateStore.ts` | Template persistence + `DEFAULT_TEMPLATES` seed values |
| `server/prisma/schema.prisma` | DB schema — edit this first for any model change |
| `server/src/services/BaseService.ts` | Parent class for all services — extend this when creating new service |

---

## client/main/

Public customer-facing app — served at `stoneoven.in`.

```
client/main/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (fonts, globals, metadata)
│   │   ├── page.tsx                      # Home page (stoneoven.in/)
│   │   ├── outlet/
│   │   │   └── [code]/
│   │   │       ├── page.tsx              # QR landing page — fingerprint + visit record + CTAs
│   │   │       ├── feedback/page.tsx     # First-visit registration form page
│   │   │       ├── review/page.tsx       # Repeat review form page
│   │   │       └── menu/page.tsx         # Dynamic API-driven menu page
│   │   ├── boisar/
│   │   │   ├── page.tsx                  # Static Boisar outlet landing page
│   │   │   └── menu/page.tsx             # Static Boisar menu
│   │   ├── palghar/page.tsx              # Static Palghar outlet landing page
│   │   ├── virar/page.tsx                # Static Virar outlet landing page
│   │   └── vasai/page.tsx                # Static Vasai outlet landing page
│   ├── components/
│   │   ├── form1/
│   │   │   └── feedback.tsx              # First-visit form — collects customer data + first review + clipboard copy
│   │   ├── form2/
│   │   │   └── review.tsx                # Repeat review form — stars + text only
│   │   ├── menu/                         # Menu display components (API-driven + static legacy)
│   │   ├── ui/
│   │   │   ├── Loader.tsx                # Spinner
│   │   │   ├── Modal.tsx                 # Modal wrapper (used for Google Review prompt)
│   │   │   ├── StarRating.tsx            # Interactive star rating input
│   │   │   ├── DatePicker.tsx            # Date picker for birthday/anniversary fields
│   │   │   ├── avatar.tsx                # shadcn Avatar component
│   │   │   └── ...                       # Button, Input, Select
│   │   ├── layout/
│   │   │   └── Footer.tsx                # Footer
│   │   ├── home/                         # Home page sections
│   │   ├── map/                          # Google Maps embed
│   │   ├── social/                       # Social links section
│   │   ├── boisar/                       # Static Boisar content component
│   │   ├── palghar/                      # Static Palghar content component
│   │   ├── virar/                        # Static Virar content component
│   │   └── vasai/                        # Static Vasai content component
│   ├── hooks/
│   │   ├── useDeviceFingerprint.ts       # FingerprintJS → stable deviceId; must run before any customer API call
│   │   ├── useCustomer.ts                # GET /api/customers/by-device/:id
│   │   ├── useOutlet.ts                  # GET /api/outlets/:code
│   │   └── useAuth.ts                    # Auth hook (not used in public app flow)
│   ├── lib/
│   │   ├── api.ts                        # Axios instance; baseURL = NEXT_PUBLIC_API_URL
│   │   ├── fingerprint.ts                # getDeviceFingerprint() — module-scoped FingerprintJS singleton
│   │   ├── validators.ts                 # Zod schemas for form validation (firstVisitFormSchema, etc.)
│   │   ├── outletConfig.ts               # Static map of outlet codes to display config
│   │   ├── clipboard.ts                  # copyToClipboard() — used to pre-fill Google Review
│   │   ├── mock-api.ts                   # Mock responses (NEXT_PUBLIC_MOCK_API=true in dev)
│   │   ├── auth.ts                       # Auth helpers (not active in public flow)
│   │   └── utils.ts                      # General utilities
│   ├── types/
│   │   ├── api.ts                        # Generic API types
│   │   ├── customer.ts                   # Customer type
│   │   ├── outlet.ts                     # Outlet type
│   │   ├── review.ts                     # Review type
│   │   └── menu.ts                       # MenuCategory, MenuItem types
│   ├── utils/supabase/
│   │   ├── client.ts                     # Supabase browser client (not active in public flow)
│   │   └── server.ts                     # Supabase server client (not active in public flow)
│   └── styles/                           # Global CSS
└── public/
    ├── images/
    │   ├── logo/logo.jpg                 # StoneOven logo (used in outlet landing pages)
    │   └── menu/                         # Static menu images (legacy)
    └── qr-codes/                         # Per-outlet QR code PNGs (printed for tables)
```

### Key client/main files

| File | Purpose |
|------|---------|
| `client/main/src/app/outlet/[code]/page.tsx` | Core QR journey entry — fingerprint, visit record, outlet display, CTAs |
| `client/main/src/components/form1/feedback.tsx` | First-visit form — customer registration + review + Google Review clipboard copy |
| `client/main/src/components/form2/review.tsx` | Repeat review form — stars + text, no re-registration |
| `client/main/src/hooks/useDeviceFingerprint.ts` | Device identity — call this before any customer lookup or visit post |
| `client/main/src/lib/fingerprint.ts` | FingerprintJS singleton — module-level promise cache (one load per session) |
| `client/main/src/lib/validators.ts` | Zod form schemas — shared between form components and API layer |

---

## client/cms/

Staff admin portal.

```
client/cms/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (fonts, globals)
│   │   ├── page.tsx                      # Root redirect → /dashboard
│   │   ├── login/page.tsx                # Login page (renders LoginPage component)
│   │   └── (cms)/                        # Route group — all pages share CMS shell + auth guard
│   │       ├── layout.tsx                # Wraps AuthProvider + CMSSidebar + auth redirect
│   │       ├── dashboard/page.tsx        # Aggregate stats cards + outlet list + admin shortcuts
│   │       ├── outlets/
│   │       │   ├── page.tsx              # Per-outlet performance cards (admin/owner only)
│   │       │   └── [id]/page.tsx         # Single outlet full analytics (recent customers, reviews, visits, star chart)
│   │       ├── customers/
│   │       │   ├── page.tsx              # Paginated customer list — search, outlet filter, inactive flag
│   │       │   └── [id]/page.tsx         # Customer profile — timeline of visits + reviews
│   │       ├── reviews/page.tsx          # Paginated review list — outlet/star/type filters, sentiment display
│   │       ├── visits/page.tsx           # Paginated visit list — QR vs payment breakdown
│   │       ├── automation/page.tsx       # Automation templates editor + log viewer + manual trigger buttons
│   │       └── media/page.tsx            # Menu management — categories, items, Cloudinary image upload (admin only)
│   ├── components/
│   │   ├── layout/
│   │   │   └── CMSSidebar.tsx            # Navigation sidebar — role-aware nav items, logout
│   │   ├── login/
│   │   │   └── loginpage.tsx             # Login form UI (username + password)
│   │   └── cms/
│   │       └── ReviewCard.tsx            # Reusable review card with sentiment badge
│   ├── context/
│   │   └── AuthContext.tsx               # Auth context — user, loading, logout, isAdmin, isOwner, isFranchise, isOwnerOrAbove
│   ├── hooks/
│   │   └── useAuth.ts                    # Re-export of useAuth() from AuthContext
│   ├── lib/
│   │   ├── api.ts                        # Axios instance — Bearer token from cookie, 401 → refresh → retry
│   │   ├── auth.ts                       # Cookie session: saveSession, getToken, getRefreshToken, saveTokens, clearSession, isAuthenticated
│   │   ├── utils.ts                      # cn() and general utilities
│   │   └── validators.ts                 # Form validation helpers
│   ├── types/
│   │   ├── api.ts                        # All API types: LoginResponse, DashboardStats, OutletStats, Customer, Review, Visit, AutomationTemplate, MenuItem, MenuCategory, PageResponse<T>
│   │   └── outlet.ts                     # Outlet type
│   ├── utils/supabase/
│   │   ├── client.ts                     # Supabase browser client (not primary auth path)
│   │   └── server.ts                     # Supabase server client
│   ├── proxy.ts                          # Dev proxy utility (not active in main flows)
│   └── styles/                           # Global CMS CSS (dark theme, CSS custom properties)
└── public/
    ├── diagram/                          # Architecture diagram images
    └── logo/                             # Logo assets
```

### Key client/cms files

| File | Purpose |
|------|---------|
| `client/cms/src/app/(cms)/layout.tsx` | Auth guard + CMS shell layout — all protected pages inherit this |
| `client/cms/src/context/AuthContext.tsx` | Single source of truth for auth state + role booleans across all CMS pages |
| `client/cms/src/lib/api.ts` | All API calls go through this instance — token injection + 401 auto-refresh + queue |
| `client/cms/src/lib/auth.ts` | Cookie session helpers — use `saveSession()` after login, `getToken()` in api.ts |
| `client/cms/src/types/api.ts` | Type definitions for every CMS API response — check here before adding new calls |

---

## worker/

```
worker/
├── src/
│   └── index.ts              # Cloudflare Worker: scheduled() cron + fetch() HTTP handler
├── wrangler.toml             # Cloudflare Worker config: cron = "0 3 * * *", bindings
└── package.json
```

The Worker calls `POST {SERVER_URL}/api/automation/run` with `x-automation-secret` header. All business logic is in the server.

---

## Naming Conventions

**Files:**
- Next.js pages: `page.tsx` (App Router convention)
- React components: PascalCase (`CMSSidebar.tsx`, `ReviewCard.tsx`, `FeedbackForm`)
- Hooks: camelCase prefixed with `use` (`useDeviceFingerprint.ts`, `useCustomer.ts`)
- Lib utilities: camelCase (`fingerprint.ts`, `paginate.ts`, `validators.ts`)
- Server routes: camelCase resource name (`customers.ts`, `automationLogs.ts`)

**Directories:**
- CMS pages use route group `(cms)` to share layout without affecting URL paths
- Server routes split into top-level (public) and `cms/` subdirectory (protected)
- Components grouped by feature/domain, not by type

---

## Where to Add New Code

**New public customer page:**
- Route: `client/main/src/app/outlet/[code]/[new-route]/page.tsx`
- Component: `client/main/src/components/[feature]/[ComponentName].tsx`

**New CMS page:**
- Route: `client/cms/src/app/(cms)/[feature]/page.tsx`
- Automatically receives CMS layout (sidebar + AuthProvider)
- Add nav link in `client/cms/src/components/layout/CMSSidebar.tsx`
- Guard with `const { isAdmin } = useAuth()` inside the page component

**New public API endpoint:**
- Add route file: `server/src/routes/[resource].ts`
- Mount in `server/src/app.ts` under `/api/`

**New CMS-protected API endpoint:**
- Add route file: `server/src/routes/cms/[resource].ts`
- Apply `router.use(requireAuth)` at the top
- Mount in `server/src/app.ts` under `/api/cms/`

**New DB model:**
- Edit `server/prisma/schema.prisma`
- Run `npx prisma generate` from `server/`

**New service class:**
- Create `server/src/services/[Name]Service.ts`
- Extend `BaseService`
- Export a singleton instance at the bottom of the file

**New automation campaign type:**
1. Add template key to `DEFAULT_TEMPLATES` in `server/src/lib/templateStore.ts`
2. Add sending logic in `server/src/routes/automation.ts`
3. Add HTML builder in `server/src/lib/notifications.ts` if needed
4. Add template card in `client/cms/src/app/(cms)/automation/page.tsx`

**New type definition:**
- CMS API types: `client/cms/src/types/api.ts`
- Public app types: `client/main/src/types/[resource].ts`
- Note: no shared type package between main and cms — duplicate as needed

---

## Special Directories

**`server/generated/prisma/`**
- Auto-generated by `npx prisma generate`
- Do not edit directly — regenerate from `server/prisma/schema.prisma`

**`server/src/scripts/`**
- One-time admin scripts; run via `npx ts-node` directly, not part of the API
- `setup_staff.ts` creates initial staff records; `wipe_data.ts` resets dev data

**`server/data/`**
- Runtime-created directory holding `automationTemplates.json`
- Created automatically by `templateStore.ts` on first access
- Should be committed or backed up — holds admin template edits

**`client/main/public/qr-codes/`**
- QR code PNGs per outlet — printed and placed on restaurant tables
- Generated once via CMS QR download; committed to repo

**`client/shared/`**
- Intended for shared types between main and cms clients
- Currently empty — types are duplicated between the two apps

---

*Structure analysis: 2026-04-25*
