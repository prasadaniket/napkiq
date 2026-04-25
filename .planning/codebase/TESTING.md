# Testing Patterns

**Analysis Date:** 2026-04-25

## Test Framework

**Runner:** None installed.

No test runner, assertion library, or testing framework is present in any `package.json` across the project:
- `server/package.json` — no `jest`, `vitest`, `mocha`, `supertest`, or similar
- `client/cms/package.json` — no `jest`, `vitest`, `@testing-library/*`
- `client/main/package.json` — no `jest`, `vitest`, `@testing-library/*`

No test config files exist (`jest.config.*`, `vitest.config.*`, `.mocharc.*`).

No test files exist anywhere in the codebase (no `*.test.*`, `*.spec.*` files found).

**Current test coverage: zero.**

## Manual Testing Approach

All verification is currently done by running the services locally and using a browser or HTTP client.

**Start all services:**
```bash
# Terminal 1 — API server (port 8080)
cd server && npm run dev

# Terminal 2 — CMS client (port 3001)
cd client/cms && npm run dev

# Terminal 3 — Main client (port 3000)
cd client/main && npm run dev
```

**Test public routes (no auth required):**
```bash
# Health check
curl http://localhost:8080/api/health

# Get outlet by code
curl http://localhost:8080/api/outlets/boisar

# Submit customer registration (first visit form)
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{"deviceId":"test-device-1","fullName":"Test User","phone":"9876543210","email":"test@example.com","birthDate":"1990-01-15","maritalStatus":"Unmarried","gender":"Male","firstVisitOutletId":"<outlet-uuid>"}'

# Submit a review
curl -X POST http://localhost:8080/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"customerId":"<customer-uuid>","outletId":"<outlet-uuid>","stars":5,"reviewType":"first_visit","reviewText":"Great food!"}'

# Record a visit
curl -X POST http://localhost:8080/api/visits \
  -H "Content-Type: application/json" \
  -d '{"customerId":"<customer-uuid>","deviceId":"test-device-1","outletId":"<outlet-uuid>","visitType":"qr_scan"}'
```

**Test CMS routes (JWT required):**
```bash
# 1. Log in to get a token
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"unicord26","password":"<password>"}' | jq -r '.token')

# 2. Use token on CMS endpoints
curl http://localhost:8080/api/cms/customers?page=0&size=20 \
  -H "Authorization: Bearer $TOKEN"

curl http://localhost:8080/api/cms/reviews?page=0&size=10 \
  -H "Authorization: Bearer $TOKEN"

curl http://localhost:8080/api/cms/visits/summary \
  -H "Authorization: Bearer $TOKEN"

curl http://localhost:8080/api/cms/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

**Test Zod validation rejection:**
```bash
# Missing required field — should return 500 with ZodError message
curl -X POST http://localhost:8080/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"outletId":"not-a-uuid","stars":6}'
```

**Test auth rejection:**
```bash
# No token — should return 401
curl http://localhost:8080/api/cms/customers

# Wrong role — log in as franchise_owner, try admin-only endpoint
curl http://localhost:8080/api/cms/menu \
  -H "Authorization: Bearer $FRANCHISE_TOKEN"
```

**Browser / UI manual checks:**
- Navigate to `http://localhost:3000/outlet/<code>` — QR landing page, FingerprintJS runs, visit recorded
- Submit feedback form — customer created at `POST /api/customers`
- Submit review form — review created at `POST /api/reviews`
- Log into CMS at `http://localhost:3001/login` with `unicord26` credentials
- Verify paginated tables load on `/customers`, `/reviews`, `/visits`
- Verify filter/search controls update results
- Verify franchise_owner login scopes all data to their outlet

## Recommended Testing Approach

When tests are added, the following setup is recommended based on the existing codebase structure:

### Server — Unit + Integration Tests

**Recommended framework:** `vitest` (fast, TypeScript-native, no config overhead)

**Install:**
```bash
cd server
npm install --save-dev vitest @vitest/coverage-v8 supertest @types/supertest
```

**Recommended `vitest.config.ts`:**
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: { provider: 'v8', reporter: ['text', 'lcov'] },
  },
})
```

**Add to `server/package.json` scripts:**
```json
"test":     "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

**Test file location:** co-located with source, `*.test.ts` suffix:
- `server/src/services/SentimentService.test.ts`
- `server/src/lib/paginate.test.ts`
- `server/src/routes/customers.test.ts`

### Unit Test Targets (highest value, lowest effort)

**`server/src/lib/paginate.ts`** — pure function, trivial to test:
```typescript
import { describe, it, expect } from 'vitest'
import { paginate } from '../lib/paginate'

describe('paginate', () => {
  it('calculates totalPages correctly', () => {
    const result = paginate(['a', 'b'], 45, 0, 20)
    expect(result.totalPages).toBe(3)
    expect(result.first).toBe(true)
    expect(result.last).toBe(false)
  })

  it('marks last page correctly', () => {
    const result = paginate([], 20, 1, 20)
    expect(result.last).toBe(true)
  })
})
```

**`server/src/services/SentimentService.ts`** — deterministic, no DB:
```typescript
import { describe, it, expect } from 'vitest'
import { sentimentService } from '../services/SentimentService'

describe('SentimentService.analyze', () => {
  it('returns positive for high stars + positive text', () => {
    const result = sentimentService.analyze('amazing food, delicious!', 5)
    expect(result.label).toBe('positive')
    expect(result.score).toBeGreaterThan(0.65)
  })

  it('falls back to star-only when text is null', () => {
    const result = sentimentService.analyze(null, 1)
    expect(result.label).toBe('negative')
    expect(result.keywords).toHaveLength(0)
  })
})
```

**`server/src/middleware/auth.ts`** — mock Supabase + Prisma:
```typescript
// Mock supabaseAdmin.auth.getUser and prisma.staff.findUnique
// Verify: missing token → 401, inactive staff → 403, valid token → next()
// Verify: requireAdmin blocks non-admin, requireOwnerOrAbove blocks franchise_owner
```

### Integration Test Targets (route-level with supertest)

**Use `createApp()` from `server/src/app.ts`** — it returns the Express app without starting a server:
```typescript
import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'
import { createApp } from '../app'

const app = createApp()

describe('POST /api/customers', () => {
  it('rejects invalid phone with 500 (ZodError)', async () => {
    const res = await request(app)
      .post('/api/customers')
      .send({ deviceId: 'x', fullName: 'Test', phone: '123' })   // invalid phone
    expect(res.status).toBe(500)
  })

  it('returns 201 on valid payload', async () => {
    // Requires a real DB or mocked prisma
    // ...
  })
})
```

**What to mock for integration tests:**
- `server/src/lib/prisma.ts` — mock the prisma client to avoid real DB calls
- `server/src/lib/supabase.ts` — mock `supabaseAdmin.auth.getUser` for auth tests
- `server/src/lib/notifications.ts` — mock `sendEmail` and `sendWhatsApp`

### Client — Component Tests

**Recommended framework:** `@testing-library/react` + `vitest`

**Highest value targets:**
- Form validation in `client/main/src/lib/validators.ts` — pure Zod schemas, zero-setup tests
- `AuthContext` behavior — mock `getUser()`, verify role helpers (`isAdmin`, `isFranchise`, etc.)
- Pagination logic in CMS pages — verify page increment/decrement buttons disable correctly

### Priority Order for Adding Tests

1. **`server/src/lib/paginate.ts`** — 10 min, pure function, zero mocking needed
2. **`server/src/services/SentimentService.ts`** — 30 min, no DB, high business logic value
3. **`client/main/src/lib/validators.ts`** — 20 min, Zod schemas are pure, test edge cases (anniversary required when married, phone regex)
4. **`server/src/middleware/auth.ts`** — 1 hr, mock Supabase + Prisma, covers all auth paths
5. **`server/src/routes/customers.ts` (integration)** — 2 hr, covers Zod validation + upsert logic + unique violation handling
6. **`server/src/routes/reviews.ts` (integration)** — 1 hr, covers sentiment auto-attach
7. **`server/src/routes/cms/customers.ts` (integration)** — 2 hr, covers pagination + outlet scoping + franchise_owner restriction

## Test Coverage Gaps (Current)

**All application logic is untested.** Specific high-risk areas:

**`server/src/routes/customers.ts`** — unique constraint recovery logic (Prisma P2002 handling, device→phone remapping) is complex and has no test coverage.

**`server/src/middleware/auth.ts`** — role mapping logic (`main_owner` → `admin` backward compat), inactive staff rejection, all untested.

**`server/src/routes/automation.ts`** — `alreadySent()` deduplication and `isSameMonthDay()` date matching are silent failure paths with no coverage.

**`server/src/services/SentimentService.ts`** — custom word scoring and label boundary thresholds (0.65 positive, 0.35 negative) are untested.

**`client/main/src/lib/validators.ts`** — `superRefine` conditional (anniversary required when married) is untested.

**`server/src/lib/paginate.ts`** — edge cases (0 total, size larger than total) untested.

---

*Testing analysis: 2026-04-25*
