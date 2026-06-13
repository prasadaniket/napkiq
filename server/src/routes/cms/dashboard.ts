import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { requireAuth } from '../../middleware/auth'

const router = Router()
router.use(requireAuth)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function daysAgo(n: number): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - n)
  return d
}

function startOf(unit: 'week' | 'month' | 'year'): Date {
  const now = new Date()
  if (unit === 'week')  { const d = new Date(now); d.setDate(d.getDate() - 7); d.setHours(0,0,0,0); return d }
  if (unit === 'month') return new Date(now.getFullYear(), now.getMonth(), 1)
  return new Date(now.getFullYear(), 0, 1)
}

function monthRange(): { start: Date; end: Date } {
  const now = new Date()
  return {
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end:   new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
  }
}

// ─── Route ────────────────────────────────────────────────────────────────────

/**
 * GET /api/cms/dashboard/stats
 *
 * Query params:
 *   ?outletId=uuid   — scope to a single outlet (admin/owner may pass this)
 *   (no param)       — admin & owner see all outlets combined
 *
 * Scoping rules:
 *   admin / owner      — all outlets (or filtered by ?outletId)
 *   franchise_owner    — always scoped to assignedOutletId (query param ignored)
 */
router.get('/stats', async (req, res, next) => {
  try {
    const role            = req.staff!.role
    const assignedOutlet  = req.staff!.assignedOutletId
    const isFranchise     = role === 'franchise_owner'

    // Determine which outlets to aggregate
    let outletIds: string[]

    if (isFranchise) {
      // Franchise owner is always locked to their outlet
      if (!assignedOutlet) { res.status(403).json({ error: 'No outlet assigned' }); return }
      outletIds = [assignedOutlet]
    } else if (req.query.outletId) {
      // Admin / owner filtering to a specific outlet
      outletIds = [req.query.outletId as string]
    } else {
      // Admin / owner — all active outlets
      const outlets = await prisma.outlet.findMany({
        where: { isActive: true },
        select: { id: true },
      })
      outletIds = outlets.map(o => o.id)
    }

    const thirtyDaysAgo = daysAgo(30)
    const { start: monthStart, end: monthEnd } = monthRange()

    const reviewWhere = { outletId: { in: outletIds } }
    const visitWhere  = { outletId: { in: outletIds } }

    // Customer counts: outlet-scoped roles count customers who have a review at their outlet(s).
    // Admin/owner viewing all outlets count unique customers directly (no double-counting).
    const isScoped = isFranchise || !!req.query.outletId
    const customerWhere: any = isScoped
      ? { reviews: { some: { outletId: { in: outletIds } } } }
      : {}

    const [
      totalCustomers,
      totalReviews,
      totalVisits,
      avgStarsResult,
      inactiveCustomers,
      newCustomersThisWeek,
      newCustomersThisMonth,
      newCustomersThisYear,
      newReviewsThisWeek,
      totalVisitsThisMonth,
      totalVisitsThisYear,
      birthdaysThisMonthRaw,
      anniversariesThisMonthRaw,
    ] = await Promise.all([
      prisma.customer.count({ where: customerWhere }),
      prisma.review.count({ where: reviewWhere }),
      prisma.customerVisit.count({ where: visitWhere }),

      prisma.review.aggregate({ where: reviewWhere, _avg: { stars: true } }),

      // Inactive: no visit in 30+ days
      prisma.customer.count({
        where: { ...customerWhere, lastVisitDate: { lt: thirtyDaysAgo } },
      }),

      // New customers — week / month / year
      prisma.customer.count({ where: { ...customerWhere, createdAt: { gte: startOf('week') } } }),
      prisma.customer.count({ where: { ...customerWhere, createdAt: { gte: startOf('month') } } }),
      prisma.customer.count({ where: { ...customerWhere, createdAt: { gte: startOf('year') } } }),

      // Reviews this week
      prisma.review.count({ where: { ...reviewWhere, createdAt: { gte: startOf('week') } } }),

      // Visits — month / year
      prisma.customerVisit.count({ where: { ...visitWhere, visitedAt: { gte: startOf('month') } } }),
      prisma.customerVisit.count({ where: { ...visitWhere, visitedAt: { gte: startOf('year') } } }),

      // Birthdays & anniversaries this calendar month
      prisma.customer.findMany({
        where: customerWhere,
        select: { birthDate: true },
      }),
      prisma.customer.findMany({
        where: { ...customerWhere, anniversaryDate: { not: null } },
        select: { anniversaryDate: true },
      }),
    ])

    const currentMonth = new Date().getMonth()
    const birthdaysThisMonth = (birthdaysThisMonthRaw as any[]).filter(c => new Date(c.birthDate).getMonth() === currentMonth).length
    const anniversariesThisMonth = (anniversariesThisMonthRaw as any[]).filter(c => c.anniversaryDate && new Date(c.anniversaryDate).getMonth() === currentMonth).length

    res.json({
      totalCustomers,
      totalReviews,
      totalVisits,
      averageRating:         avgStarsResult._avg.stars ?? null,
      inactiveCustomers,
      newCustomersThisWeek,
      newCustomersThisMonth,
      newCustomersThisYear,
      newReviewsThisWeek,
      totalVisitsThisMonth,
      totalVisitsThisYear,
      birthdaysThisMonth,
      anniversariesThisMonth,
    })
  } catch (err) {
    next(err)
  }
})

export default router
