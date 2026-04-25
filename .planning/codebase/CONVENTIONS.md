# Coding Conventions

**Analysis Date:** 2026-04-25

## Naming Patterns

**Files:**
- Server route files: `camelCase.ts` matching the resource (`customers.ts`, `reviews.ts`, `visits.ts`)
- CMS sub-routes live under `server/src/routes/cms/` — same naming pattern
- Service files: `PascalCase` with `Service` suffix (`BaseService.ts`, `SentimentService.ts`, `QRService.ts`)
- Client page files: `page.tsx` (Next.js App Router convention)
- Client component files: `PascalCase.tsx` (`ReviewCard.tsx`, `CMSSidebar.tsx`)
- Client lib/util files: `camelCase.ts` (`api.ts`, `auth.ts`, `validators.ts`)

**Database Column Names (CRITICAL — camelCase only):**
- ALL Prisma model fields use **camelCase** — never snake_case
- Correct: `fullName`, `totalVisits`, `lastVisitDate`, `firstVisitOutletId`, `birthDate`, `anniversaryDate`, `hasSubmittedFirstReview`, `reviewType`, `sentimentLabel`, `sentimentScore`, `sentimentKeywords`, `visitedAt`, `displayOrder`, `priceVariants`, `isActive`, `isVeg`, `isAvailable`, `visitType`, `googleMapsUrl`
- Wrong (will fail): `full_name`, `total_visits`, `last_visit_date`, `first_visit_outlet_id`

**Functions:**
- Route handlers: anonymous async arrow functions passed directly to `router.get/post/put/delete`
- Named helper functions in route files: `camelCase` (`resolveOutletFilter`, `daysAgo`, `normalizePone`, `alreadySent`, `logSend`, `dualAuth`)
- Service methods: `camelCase` (`analyze`, `generateForOutlet`, `generateAll`, `handleError`)
- Zod schema constants: `PascalCase` + `Schema` suffix (`CreateCustomerSchema`, `LoginSchema`, `CreateReviewSchema`, `CreateVisitSchema`)

**Variables:**
- Local variables: `camelCase`
- Destructured query params explicitly cast: `req.query.xxx as string`
- Prisma `where` filter objects typed as `any` to allow dynamic key assignment: `const where: any = {}`

**Types/Interfaces:**
- TypeScript interfaces: `PascalCase` (`StaffPayload`, `PageResponse<T>`, `SentimentResult`, `Customer`, `Review`, `Visit`, `Outlet`)
- Type aliases: `PascalCase` (`SentimentLabel`, `QRFormat`, `CmsRole`)
- Zod inferred types exported alongside schema: `export type XxxData = z.infer<typeof xxxSchema>`

**Enum-style string literals (used as types throughout):**
- Visit types: `'qr_scan' | 'payment'`
- Review types: `'first_visit' | 'repeat'`
- Gender values: `'Male' | 'Female' | 'Transgender' | 'RatherNotSay'`
- Sentiment labels: `'positive' | 'negative' | 'neutral' | 'mixed'`
- Staff roles: `'admin' | 'owner' | 'franchise_owner'`
- Automation log status: `'success' | 'failed'`

## Code Style

**TypeScript:**
- `strict: true` enforced in `server/tsconfig.json` (target: ES2020, module: commonjs)
- Client: TypeScript 5, Next.js 16 App Router
- Non-null assertion `req.staff!` used throughout CMS routes after `requireAuth` confirms presence
- `as any` used only for dynamic Prisma `where` filter accumulation — nowhere else
- `as string` cast for query params when type narrowing is needed

**Formatting:**
- 2-space indentation throughout
- Single quotes for strings
- No trailing semicolons omitted — semicolons always present
- Property column-alignment in objects with many fields:
  ```typescript
  req.staff = {
    id:               staff.id,
    fullName:         staff.fullName,
    email:            staff.email,
    role,
    assignedOutletId: staff.assignedOutletId,
  }
  ```

**Linting:**
- Server: no ESLint config detected — TypeScript strict mode provides coverage
- Client: `eslint-config-next` (ESLint 9) configured in both `client/cms/` and `client/main/`

## Route Structure Pattern

Every resource gets its own `Router` instance in a dedicated file:

```typescript
// server/src/routes/cms/customers.ts — typical CMS route file
import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { paginate } from '../../lib/paginate'
import { requireAuth } from '../../middleware/auth'

const router = Router()
router.use(requireAuth)   // applied once at top for ALL routes in file

router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(0, parseInt(req.query.page as string) || 0)
    const size = Math.min(100, Math.max(1, parseInt(req.query.size as string) || 20))
    // ... build where filter ...
    const [items, total] = await Promise.all([
      prisma.model.findMany({ where, skip: page * size, take: size }),
      prisma.model.count({ where }),
    ])
    res.json(paginate(items, total, page, size))
  } catch (err) {
    next(err)   // ALWAYS — never res.status(500) inline
  }
})

export default router
```

Route files with this pattern: `server/src/routes/cms/customers.ts`, `server/src/routes/cms/reviews.ts`, `server/src/routes/cms/visits.ts`, `server/src/routes/cms/outlets.ts`, `server/src/routes/cms/menu.ts`, `server/src/routes/customers.ts`, `server/src/routes/reviews.ts`, `server/src/routes/visits.ts`

## Error Handling Pattern

**Server — Universal rule: `try/catch + next(err)` in every handler:**
```typescript
router.post('/', async (req, res, next) => {
  try {
    const body = Schema.parse(req.body)   // Zod throws ZodError → caught below
    // ... logic ...
    res.status(201).json(result)
  } catch (err) {
    next(err)   // delegates to global errorHandler middleware
  }
})
```

**Global error handler** at `server/src/middleware/errorHandler.ts`:
```typescript
export function errorHandler(err: Error, req, res, next): void {
  console.error(`[Error] ${err.message}`, err.stack)
  res.status(500).json({ error: err.message || 'Internal server error' })
}
```
Registered last in `server/src/app.ts`: `app.use(errorHandler)`

**4xx inline before catch:**
```typescript
if (!customer) { res.status(404).json({ error: 'Customer not found' }); return }
if (req.staff!.role === 'franchise_owner' && ...) {
  res.status(403).json({ error: 'Access denied' }); return
}
```
Always `return` immediately after inline error responses.

**Service layer** — `BaseService.handleError()`:
```typescript
protected handleError(error: Error, context: string): never {
  console.error(`[${this.constructor.name}] ${context}:`, error.message)
  throw new Error(`${context} failed: ${error.message}`)
}
```

**Client** — silent fallback on fetch failure:
```typescript
try {
  const res = await api.get<PageResponse<Customer>>(`/cms/customers?${q}`)
  setCustomers(res.data.content)
} catch {
  setCustomers([])   // empty state shown to user
} finally {
  setLoading(false)
}
```

## Response Format

**Paginated lists** — ALL list endpoints use `paginate()` from `server/src/lib/paginate.ts`:
```typescript
// Shape returned:
{
  content:       T[],
  totalElements: number,
  totalPages:    number,
  size:          number,
  number:        number,   // current page, 0-indexed
  first:         boolean,
  last:          boolean,
}
```
TypeScript interface: `PageResponse<T>` at `client/cms/src/types/api.ts`

**Single resource:** `res.json(record)` — plain object, no envelope

**Create (POST) success:** `res.status(201).json(record)`

**Update (PUT) success:** `res.json(record)`

**Delete success:** `res.json({ ok: true })`

**Error responses:** `res.status(NNN).json({ error: 'message string' })` — always key `error`, never `message`

**Summary endpoints (not paginated):** custom shape documented per-route:
- `/api/cms/reviews/summary` → `{ averageRating, totalReviews, distribution: [{stars, count}] }`
- `/api/cms/visits/summary` → `{ totalVisits, qrScans, payments }`
- Automation run → `{ ok, elapsed, sent, skipped, failed }`

## Zod Validation

Zod schemas defined at **top of the route file**, called via `.parse()` inside the handler:

```typescript
// server/src/routes/reviews.ts
const CreateReviewSchema = z.object({
  customerId: z.string().uuid().nullable().optional(),
  outletId:   z.string().uuid(),
  reviewText: z.string().nullable().optional(),
  stars:      z.number().int().min(1).max(5),
  reviewType: z.enum(['first_visit', 'repeat']),
})

router.post('/', async (req, res, next) => {
  try {
    const body = CreateReviewSchema.parse(req.body)   // throws ZodError on invalid input
    // ...
  } catch (err) { next(err) }
})
```

Server-side files using Zod: `server/src/routes/customers.ts`, `server/src/routes/reviews.ts`, `server/src/routes/visits.ts`, `server/src/routes/auth.ts`

Client-side form validation uses Zod + react-hook-form + `@hookform/resolvers/zod`:
- `client/cms/src/lib/validators.ts` — `loginSchema`
- `client/main/src/lib/validators.ts` — `firstVisitFormSchema`, `ongoingReviewSchema`, `loginSchema`

## OOP Service Pattern

Services are ES6 classes exported as singleton instances:

```typescript
// server/src/services/SentimentService.ts
class SentimentService {
  private readonly analyzer = new Sentiment()
  private readonly customWords: Record<string, number> = { ... }

  analyze(text: string | null | undefined, stars: number): SentimentResult { ... }
  private defaultResult(stars: number): SentimentResult { ... }
  private normalize(raw: number): number { ... }
  private getLabel(score: number, rawScore: number): SentimentLabel { ... }
}

export const sentimentService = new SentimentService()
```

**Always export the singleton instance, not the class.** Routes import the instance:
```typescript
import { sentimentService } from '../services/SentimentService'
const sentiment = sentimentService.analyze(body.reviewText, body.stars)
```

`BaseService` at `server/src/services/BaseService.ts` provides:
- `protected readonly prisma` — shared Prisma client
- `protected handleError(error, context): never` — log + rethrow
- `protected paginate<T>(items, total, page, size)` — same shape as standalone `paginate()`

Services extending `BaseService` should use `this.prisma` instead of importing prisma directly.

Current services: `BaseService.ts`, `SentimentService.ts`, `QRService.ts`

## Auth Middleware Pattern

Three guards from `server/src/middleware/auth.ts`:

| Guard | Role requirement |
|---|---|
| `requireAuth` | Any active staff (validates Supabase JWT → populates `req.staff`) |
| `requireAdmin` | `admin` only (UniCord account) |
| `requireOwnerOrAbove` | `admin` or `owner` |

**Usage patterns:**

```typescript
// All routes in a file — applied once at top:
router.use(requireAuth)

// All routes in a file need admin:
router.use(requireAuth, requireAdmin)   // e.g., server/src/routes/cms/menu.ts

// Dual-auth (automation routes): worker secret OR CMS admin JWT:
function dualAuth(req, res, next) {
  const secret = process.env.AUTOMATION_SECRET
  if (secret && req.headers['x-automation-secret'] === secret) return next()
  requireAuth(req, res, () => requireAdmin(req, res, next))
}
```

`req.staff` is always a `StaffPayload` after `requireAuth`:
```typescript
interface StaffPayload {
  id: string
  fullName: string
  email: string
  role: 'admin' | 'owner' | 'franchise_owner'
  assignedOutletId: string | null
}
```

**Franchise owner scoping** — enforced in every CMS route:
```typescript
function resolveOutletFilter(req: any): string | null {
  if (req.staff!.role === 'franchise_owner') {
    return req.staff!.assignedOutletId   // always locked to their outlet
  }
  return (req.query.outletId as string) || null
}
```

Deprecated: `requireMainOwner` (maps to `requireAdmin`) — do not use in new routes.

## CSS Approach

**CMS client** (`client/cms/`) — hybrid of CSS variables + CSS utility classes + inline styles:

1. **CSS variables** in `client/cms/src/styles/globals.css` under `:root` — ALL design tokens:
   - Brand: `--color-primary` (#F26522), `--color-primary-hover`, `--color-primary-dim`, `--color-primary-border`
   - Surfaces: `--color-bg` (#0a0a0a), `--color-surface` (#111111), `--color-surface-2` (#181818), `--color-surface-3` (#222222)
   - Text: `--color-text-1` (white), `--color-text-2` (60% white), `--color-text-3` (35% white)
   - Semantic: `--color-success` (#22c55e), `--color-warning` (#f59e0b), `--color-danger` (#ef4444), `--color-info` (#3b82f6)
   - Radii: `--radius-sm` (6px), `--radius-md` (10px), `--radius-lg` (16px), `--radius-xl` (20px)
   - Layout: `--sidebar-width` (220px)

2. **Pre-defined CSS classes** in `globals.css` — use these in className:
   - Layout: `.cms-shell`, `.cms-sidebar`, `.cms-main`
   - Pages: `.page-header`, `.page-title`, `.page-subtitle`, `.page-content`
   - Components: `.stat-card`, `.stat-label`, `.stat-value`, `.data-table-wrap`, `.data-table`
   - Elements: `.card`, `.input`, `.btn-primary`, `.btn-ghost`, `.empty-state`
   - Badges: `.role-badge`, `.role-badge-admin`, `.role-badge-owner`, `.role-badge-franchise`

3. **Inline styles** for per-component dynamic values and one-off styles — extensively used in CMS pages:
   ```tsx
   <div style={{ color: 'var(--color-primary)', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
   ```

Tailwind is installed in CMS but used sparingly — prefer CSS variable classes for new CMS components.

**Main client** (`client/main/`) — Tailwind utility classes as primary approach.

## Import Organization

**Server — observed order:**
1. Framework/third-party (`express`, `zod`, `multer`, `cloudinary`)
2. Internal lib (`../../lib/prisma`, `../../lib/paginate`, `../../lib/cloudinary`)
3. Internal middleware (`../../middleware/auth`)
4. Internal services (`../../services/SentimentService`)

**Client — observed order:**
1. React/Next.js core (`react`, `next/link`, `next/navigation`)
2. Third-party packages (`axios`, `date-fns`, `zod`)
3. Internal lib/context/hooks (`@/lib/api`, `@/lib/auth`, `@/context/AuthContext`)
4. TypeScript types (`@/types/api`)

**Path aliases:** Both clients use `@/` → `src/`

## Comments

**Section dividers** used to break large files:
```typescript
// ─── Section Name ──────────────────────────────────────────────────────────────
```

**Route documentation block** at top of each GET endpoint listing all accepted query params:
```typescript
// ─── GET /api/cms/customers ───────────────────────────────────────────────────
// Query params:
//   page, size  — pagination (default 0, 20)
//   search      — fuzzy search on name/phone/email
```

**JSDoc-style** used on service classes only — documents OOP pattern and upgrade notes.

**Inline comments** for non-obvious logic: Prisma error codes, deprecated role aliases, auth fallback paths.

## Function Design

**Pagination param extraction** — always use this exact pattern:
```typescript
const page = Math.max(0, parseInt(req.query.page as string) || 0)
const size = Math.min(100, Math.max(1, parseInt(req.query.size as string) || 20))
```

**Parallel DB queries** — always `Promise.all` for independent count + findMany:
```typescript
const [items, total] = await Promise.all([
  prisma.model.findMany({ where, skip: page * size, take: size, orderBy }),
  prisma.model.count({ where }),
])
```

**Early return after 4xx** — one-liner with explicit `return`:
```typescript
if (!item) { res.status(404).json({ error: 'Item not found' }); return }
```

**Conditional Prisma field updates** — spread conditional property inclusion for PATCH-like PUTs:
```typescript
data: {
  ...(name         !== undefined && { name }),
  ...(displayOrder !== undefined && { displayOrder }),
  ...(isActive     !== undefined && { isActive }),
}
```

---

*Convention analysis: 2026-04-25*
