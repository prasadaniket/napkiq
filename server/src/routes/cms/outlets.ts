import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { requireAuth } from '../../middleware/auth'
import { supabaseAdmin } from '../../lib/supabase'

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
        const cWhere = { reviews: { some: { outletId: oId } } }
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
          birthdaysThisMonthRaw,
          anniversariesThisMonthRaw,
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
          prisma.customer.findMany({
            where: cWhere,
            select: { birthDate: true },
          }),
          prisma.customer.findMany({
            where: { ...cWhere, anniversaryDate: { not: null } },
            select: { anniversaryDate: true },
          }),
        ])

        const currentMonth = new Date().getMonth()
        const birthdaysThisMonth = (birthdaysThisMonthRaw as any[]).filter(c => new Date(c.birthDate).getMonth() === currentMonth).length
        const anniversariesThisMonth = (anniversariesThisMonthRaw as any[]).filter(c => c.anniversaryDate && new Date(c.anniversaryDate).getMonth() === currentMonth).length

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
    const cWhere = { reviews: { some: { outletId } } }
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
      birthdaysThisMonthRaw,
      anniversariesThisMonthRaw,
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
      prisma.customer.findMany({
        where: cWhere,
        select: { birthDate: true },
      }),
      prisma.customer.findMany({
        where: { ...cWhere, anniversaryDate: { not: null } },
        select: { anniversaryDate: true },
      }),
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

    const currentMonth = new Date().getMonth()
    const birthdaysThisMonth = (birthdaysThisMonthRaw as any[]).filter(c => new Date(c.birthDate).getMonth() === currentMonth).length
    const anniversariesThisMonth = (anniversariesThisMonthRaw as any[]).filter(c => c.anniversaryDate && new Date(c.anniversaryDate).getMonth() === currentMonth).length

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

// DELETE /cms/outlets/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const role = req.staff!.role
    if (role !== 'admin' && role !== 'owner') {
      res.status(403).json({ error: 'Permission denied' })
      return
    }

    await prisma.outlet.update({
      where: { id: req.params.id },
      data: { isActive: false },
    })

    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

// POST /cms/outlets
router.post('/', async (req, res, next) => {
  try {
    const role = req.staff!.role
    if (role !== 'admin' && role !== 'owner') {
      res.status(403).json({ error: 'Permission denied' })
      return
    }

    const {
      name,
      code,
      slug,
      location,
      address,
      googlePlaceId,
      googleMapsUrl,
      instagramUrl,
      facebookUrl,
      ownerName,
      ownerEmail,
      ownerPhone,
      ownerUsername,
      ownerPassword,
    } = req.body

    if (!name || !code || !slug || !googlePlaceId) {
      res.status(400).json({ error: 'Missing required outlet fields (name, code, slug, googlePlaceId)' })
      return
    }

    // 1. Create the outlet in Postgres
    const outlet = await prisma.outlet.create({
      data: {
        name,
        code: code.toUpperCase(),
        slug: slug.toLowerCase(),
        location: location ?? null,
        address: address ?? null,
        googlePlaceId,
        googleMapsUrl: googleMapsUrl ?? null,
        instagramUrl: instagramUrl ?? null,
        facebookUrl: facebookUrl ?? null,
        isActive: true,
      },
    })

    // 2. Create the franchise owner in Supabase Auth & Staff table if email is provided
    if (ownerEmail && ownerPassword && ownerUsername && ownerName) {
      try {
        // Create user in Supabase
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: ownerEmail,
          password: ownerPassword,
          email_confirm: true,
        })

        if (authError || !authData.user) {
          throw new Error(authError?.message ?? 'Supabase user creation failed')
        }

        // Create the staff member record linked to this outlet
        await prisma.staff.create({
          data: {
            id: authData.user.id,
            email: ownerEmail,
            username: ownerUsername.toLowerCase(),
            fullName: ownerName,
            phone: ownerPhone ?? null,
            role: 'franchise_owner',
            isAdmin: false,
            assignedOutletId: outlet.id,
            isActive: true,
          },
        })
      } catch (err: any) {
        console.error('Error creating franchise owner:', err)
        // Non-fatal for the outlet creation, but notify in response
        res.status(201).json({
          outlet,
          warning: `Outlet created but franchise owner setup failed: ${err.message}`,
        })
        return
      }
    }

    // 3. Clone the Boisar Menu for this new outlet as a convenience seed!
    try {
      const boisar = await prisma.outlet.findFirst({
        where: { OR: [{ code: 'BSR' }, { slug: 'boisar' }] },
      })

      if (boisar) {
        const boisarCategories = await prisma.menuCategory.findMany({
          where: { outletId: boisar.id, isActive: true },
          include: { items: { orderBy: { displayOrder: 'asc' } } },
        })

        for (const sourceCat of boisarCategories) {
          const targetCat = await prisma.menuCategory.create({
            data: {
              name: sourceCat.name,
              displayOrder: sourceCat.displayOrder,
              isActive: true,
              outletId: outlet.id,
            },
          })

          for (const sourceItem of sourceCat.items) {
            await prisma.menuItem.create({
              data: {
                categoryId: targetCat.id,
                name: sourceItem.name,
                description: sourceItem.description,
                price: sourceItem.price,
                priceVariants: sourceItem.priceVariants ?? undefined,
                isVeg: sourceItem.isVeg,
                imageUrl: sourceItem.imageUrl,
                isAvailable: sourceItem.isAvailable,
                displayOrder: sourceItem.displayOrder,
              },
            })
          }
        }
      }
    } catch (menuErr) {
      console.error('Failed to clone menu for new outlet:', menuErr)
      // Non-fatal, return outlet
    }

    res.status(201).json({ outlet })
  } catch (err) {
    next(err)
  }
})

export default router
