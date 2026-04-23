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

function monthRange() {
  const now = new Date()
  return {
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end:   new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
  }
}

// ─── GET /api/cms/outlets ─────────────────────────────────────────────────────
// List of all outlets (admin / owner only; franchise_owner sees only their outlet)
router.get('/', async (req, res, next) => {
  try {
    const role = req.staff!.role

    const where = role === 'franchise_owner'
      ? { id: req.staff!.assignedOutletId ?? '' }
      : { isActive: true }

    const outlets = await prisma.outlet.findMany({
      where,
      orderBy: { name: 'asc' },
      select: {
        id:            true,
        name:          true,
        code:          true,
        slug:          true,
        address:       true,
        googleMapsUrl: true,
        isActive:      true,
      },
    })

    res.json(outlets)
  } catch (err) {
    next(err)
  }
})

// ─── GET /api/cms/outlets/stats ───────────────────────────────────────────────
// Per-outlet performance card data (admin/owner only or franchise_owner for their outlet)
router.get('/stats', async (req, res, next) => {
  try {
    const role = req.staff!.role
    const thirtyDaysAgo = daysAgo(30)
    const { start: monthStart, end: monthEnd } = monthRange()

    // Determine which outlets to compute stats for
    const outletWhere = role === 'franchise_owner'
      ? { id: req.staff!.assignedOutletId ?? '' }
      : { isActive: true }

    const outlets = await prisma.outlet.findMany({
      where: outletWhere,
      orderBy: { name: 'asc' },
      select: { id: true, name: true, code: true, slug: true, googleMapsUrl: true },
    })

    const stats = await Promise.all(
      outlets.map(async (outlet) => {
        const oId = outlet.id
        const cWhere = { firstVisitOutletId: oId }
        const rWhere = { outletId: oId }
        const vWhere = { outletId: oId }

        const [
          totalCustomers,
          totalReviews,
          totalVisits,
          avgStars,
          inactiveCustomers,
          newCustomersThisWeek,
          newCustomersThisMonth,
          newCustomersThisYear,
          reviewsThisWeek,
          visitsThisMonth,
          birthdaysThisMonth,
          anniversariesThisMonth,
        ] = await Promise.all([
          prisma.customer.count({ where: cWhere }),
          prisma.review.count({ where: rWhere }),
          prisma.customerVisit.count({ where: vWhere }),
          prisma.review.aggregate({ where: rWhere, _avg: { stars: true } }),
          prisma.customer.count({ where: { ...cWhere, lastVisitDate: { lt: thirtyDaysAgo } } }),
          prisma.customer.count({ where: { ...cWhere, createdAt: { gte: startOf('week') } } }),
          prisma.customer.count({ where: { ...cWhere, createdAt: { gte: startOf('month') } } }),
          prisma.customer.count({ where: { ...cWhere, createdAt: { gte: startOf('year') } } }),
          prisma.review.count({ where: { ...rWhere, createdAt: { gte: startOf('week') } } }),
          prisma.customerVisit.count({ where: { ...vWhere, visitedAt: { gte: startOf('month') } } }),
          prisma.customer.count({ where: { ...cWhere, birthDate: { gte: monthStart, lte: monthEnd } } }),
          prisma.customer.count({ where: { ...cWhere, anniversaryDate: { gte: monthStart, lte: monthEnd } } }),
        ])

        return {
          outletId:              outlet.id,
          outletName:            outlet.name,
          outletCode:            outlet.code,
          outletSlug:            outlet.slug,
          googleMapsUrl:         outlet.googleMapsUrl,
          totalCustomers,
          totalReviews,
          totalVisits,
          averageRating:         avgStars._avg.stars ?? null,
          inactiveCustomers,
          newCustomersThisWeek,
          newCustomersThisMonth,
          newCustomersThisYear,
          reviewsThisWeek,
          visitsThisMonth,
          birthdaysThisMonth,
          anniversariesThisMonth,
        }
      })
    )

    res.json(stats)
  } catch (err) {
    next(err)
  }
})

// ─── GET /api/cms/outlets/:id ─────────────────────────────────────────────────
// Single outlet full analytics dashboard
router.get('/:id', async (req, res, next) => {
  try {
    const role = req.staff!.role
    const outletId = req.params.id

    // Franchise owner can only see their assigned outlet
    if (role === 'franchise_owner' && outletId !== req.staff!.assignedOutletId) {
      res.status(403).json({ error: 'Access denied' })
      return
    }

    const outlet = await prisma.outlet.findUnique({ where: { id: outletId } })
    if (!outlet) { res.status(404).json({ error: 'Outlet not found' }); return }

    const thirtyDaysAgo = daysAgo(30)
    const { start: monthStart, end: monthEnd } = monthRange()
    const cWhere = { firstVisitOutletId: outletId }
    const rWhere = { outletId }
    const vWhere = { outletId }

    const [
      totalCustomers,
      totalReviews,
      totalVisits,
      avgStars,
      inactiveCustomers,
      newCustomersThisWeek,
      newCustomersThisMonth,
      newCustomersThisYear,
      reviewsThisWeek,
      visitsThisMonth,
      birthdaysThisMonth,
      anniversariesThisMonth,
      starDistribution,
      recentCustomers,
      recentReviews,
      recentVisits,
    ] = await Promise.all([
      prisma.customer.count({ where: cWhere }),
      prisma.review.count({ where: rWhere }),
      prisma.customerVisit.count({ where: vWhere }),
      prisma.review.aggregate({ where: rWhere, _avg: { stars: true } }),
      prisma.customer.count({ where: { ...cWhere, lastVisitDate: { lt: thirtyDaysAgo } } }),
      prisma.customer.count({ where: { ...cWhere, createdAt: { gte: startOf('week') } } }),
      prisma.customer.count({ where: { ...cWhere, createdAt: { gte: startOf('month') } } }),
      prisma.customer.count({ where: { ...cWhere, createdAt: { gte: startOf('year') } } }),
      prisma.review.count({ where: { ...rWhere, createdAt: { gte: startOf('week') } } }),
      prisma.customerVisit.count({ where: { ...vWhere, visitedAt: { gte: startOf('month') } } }),
      prisma.customer.count({ where: { ...cWhere, birthDate: { gte: monthStart, lte: monthEnd } } }),
      prisma.customer.count({ where: { ...cWhere, anniversaryDate: { gte: monthStart, lte: monthEnd } } }),
      // Star distribution for rating bar chart
      prisma.review.groupBy({
        by: ['stars'],
        where: rWhere,
        _count: { stars: true },
        orderBy: { stars: 'desc' },
      }),
      // Recent customers
      prisma.customer.findMany({
        where: cWhere,
        orderBy: { createdAt: 'desc' },
        take: 8,
        select: { id: true, fullName: true, phone: true, totalVisits: true, lastVisitDate: true, createdAt: true },
      }),
      // Recent reviews
      prisma.review.findMany({
        where: rWhere,
        orderBy: { createdAt: 'desc' },
        take: 6,
        include: { customer: { select: { fullName: true, phone: true } } },
      }),
      // Recent visits
      prisma.customerVisit.findMany({
        where: vWhere,
        orderBy: { visitedAt: 'desc' },
        take: 8,
        include: { customer: { select: { fullName: true, phone: true } } },
      }),
    ])

    res.json({
      outlet,
      stats: {
        totalCustomers,
        totalReviews,
        totalVisits,
        averageRating:          avgStars._avg.stars ?? null,
        inactiveCustomers,
        newCustomersThisWeek,
        newCustomersThisMonth,
        newCustomersThisYear,
        reviewsThisWeek,
        visitsThisMonth,
        birthdaysThisMonth,
        anniversariesThisMonth,
        starDistribution: starDistribution.map(s => ({ stars: s.stars, count: s._count.stars })),
      },
      recentCustomers,
      recentReviews,
      recentVisits,
    })
  } catch (err) {
    next(err)
  }
})

export default router
