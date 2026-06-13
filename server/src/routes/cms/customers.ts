import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { paginate } from '../../lib/paginate'
import { requireAuth } from '../../middleware/auth'

const router = Router()
router.use(requireAuth)

// ─── Scope helper ─────────────────────────────────────────────────────────────
// Returns the outlet ID to filter by, based on role + optional ?outletId query.
// franchise_owner is always locked to their assignedOutletId.
function resolveOutletFilter(req: any): string | null {
  if (req.staff!.role === 'franchise_owner') {
    return req.staff!.assignedOutletId
  }
  return (req.query.outletId as string) || null
}

// ─── GET /api/cms/customers ───────────────────────────────────────────────────
// Query params:
//   page, size              — pagination (default 0, 20)
//   outletId                — filter by first-visit outlet (admin/owner only)
//   search                  — fuzzy search on name/phone/email
//   inactive                — "true" → only customers inactive 30+ days
//   gender                  — Male | Female | Transgender | RatherNotSay
//   hasReview               — "true" | "false"
//   sortBy                  — createdAt | lastVisitDate | totalVisits (default: createdAt)
//   sortDir                 — asc | desc (default: desc)
router.get('/', async (req, res, next) => {
  try {
    const page    = Math.max(0, parseInt(req.query.page as string) || 0)
    const size    = Math.min(100, Math.max(1, parseInt(req.query.size as string) || 20))
    const search  = (req.query.search as string)?.trim() || ''
    const sortBy  = (['createdAt', 'lastVisitDate', 'totalVisits'].includes(req.query.sortBy as string)
      ? req.query.sortBy
      : 'createdAt') as string
    const sortDir = req.query.sortDir === 'asc' ? 'asc' : 'desc'

    const outletId = resolveOutletFilter(req)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    const where: any = {}
    // Franchise owners see customers who have a review at their outlet
    // (visits have nullable customerId so can't be used for joining)
    if (outletId) where.reviews = { some: { outletId } }
    if (req.query.inactive === 'true') where.lastVisitDate = { lt: thirtyDaysAgo }
    if (req.query.gender)              where.gender = req.query.gender
    if (req.query.hasReview === 'true')  where.hasSubmittedFirstReview = true
    if (req.query.hasReview === 'false') where.hasSubmittedFirstReview = false
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { phone:    { contains: search } },
        { email:    { contains: search, mode: 'insensitive' } },
      ]
    }

    const [rawCustomers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip: page * size,
        take: size,
        orderBy: { [sortBy]: sortDir },
        include: {
          firstVisitOutlet: { select: { name: true, code: true } },
          _count: {
            select: {
              reviews: outletId ? { where: { outletId } } : true,
            },
          },
        },
      }),
      prisma.customer.count({ where }),
    ])

    // Flatten _count.reviews → totalReviews for a clean API shape
    const customers = rawCustomers.map(({ _count, ...c }) => ({
      ...c,
      totalReviews: _count.reviews,
    }))

    res.json(paginate(customers, total, page, size))
  } catch (err) {
    next(err)
  }
})

// ─── GET /api/cms/customers/birthdays ──────────────────────────────────────────
router.get('/birthdays', async (req, res, next) => {
  try {
    const outletId = resolveOutletFilter(req)
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const yearStart = new Date(currentYear, 0, 1)

    const where: any = {}
    if (outletId) {
      where.reviews = { some: { outletId } }
    }

    const customers = await prisma.customer.findMany({
      where,
      include: {
        firstVisitOutlet: { select: { name: true, code: true } },
        automationLogs: {
          where: {
            automationType: { in: ['birthday_whatsapp', 'birthday_email'] },
            status: 'success',
            sentAt: { gte: yearStart },
          },
          select: {
            messageStage: true,
          },
        },
      },
      orderBy: { fullName: 'asc' },
    })

    const matchingCustomers = customers.filter(c => {
      const d = new Date(c.birthDate)
      return d.getMonth() === currentMonth
    })

    const results = matchingCustomers.map(c => {
      const stages = c.automationLogs.map(l => l.messageStage)
      return {
        id: c.id,
        fullName: c.fullName,
        phone: c.phone,
        email: c.email,
        birthDate: c.birthDate,
        firstVisitOutlet: c.firstVisitOutlet,
        message5DaysStatus: stages.includes('five_days_before') ? 'send' : 'pending',
        message1DayStatus: stages.includes('one_day_before') ? 'send' : 'pending',
      }
    })

    res.json(results)
  } catch (err) {
    next(err)
  }
})

// ─── GET /api/cms/customers/anniversaries ──────────────────────────────────────
router.get('/anniversaries', async (req, res, next) => {
  try {
    const outletId = resolveOutletFilter(req)
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const yearStart = new Date(currentYear, 0, 1)

    const where: any = {}
    if (outletId) {
      where.reviews = { some: { outletId } }
    }

    const customers = await prisma.customer.findMany({
      where: {
        ...where,
        anniversaryDate: { not: null },
      },
      include: {
        firstVisitOutlet: { select: { name: true, code: true } },
        automationLogs: {
          where: {
            automationType: { in: ['anniversary_whatsapp', 'anniversary_email'] },
            status: 'success',
            sentAt: { gte: yearStart },
          },
          select: {
            messageStage: true,
          },
        },
      },
      orderBy: { fullName: 'asc' },
    })

    const matchingCustomers = customers.filter(c => {
      if (!c.anniversaryDate) return false
      const d = new Date(c.anniversaryDate)
      return d.getMonth() === currentMonth
    })

    const results = matchingCustomers.map(c => {
      const stages = c.automationLogs.map(l => l.messageStage)
      return {
        id: c.id,
        fullName: c.fullName,
        phone: c.phone,
        email: c.email,
        anniversaryDate: c.anniversaryDate,
        firstVisitOutlet: c.firstVisitOutlet,
        message5DaysStatus: stages.includes('five_days_before') ? 'send' : 'pending',
        message1DayStatus: stages.includes('one_day_before') ? 'send' : 'pending',
      }
    })

    res.json(results)
  } catch (err) {
    next(err)
  }
})

// ─── GET /api/cms/customers/:id ───────────────────────────────────────────────
// Full customer profile with visit history + reviews
router.get('/:id', async (req, res, next) => {
  try {
    const scopedOutletId = req.staff!.role === 'franchise_owner'
      ? req.staff!.assignedOutletId ?? undefined
      : undefined

    // For franchise owners: deny if this customer has no reviews at their outlet
    if (scopedOutletId) {
      const hasReview = await prisma.review.count({
        where: { customerId: req.params.id, outletId: scopedOutletId },
      })
      if (!hasReview) { res.status(403).json({ error: 'Access denied' }); return }
    }

    const customer = await prisma.customer.findUnique({
      where:   { id: req.params.id },
      include: {
        firstVisitOutlet: { select: { name: true, code: true } },
        visits: {
          where:   scopedOutletId ? { outletId: scopedOutletId } : {},
          orderBy: { visitedAt: 'desc' },
          take:    20,
          include: { outlet: { select: { name: true, code: true } } },
        },
        reviews: {
          where:   scopedOutletId ? { outletId: scopedOutletId } : {},
          orderBy: { createdAt: 'desc' },
          include: { outlet: { select: { name: true, code: true } } },
        },
      },
    })

    if (!customer) { res.status(404).json({ error: 'Customer not found' }); return }

    res.json(customer)
  } catch (err) {
    next(err)
  }
})

export default router
