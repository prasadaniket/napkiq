import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { paginate } from '../../lib/paginate'
import { requireAuth } from '../../middleware/auth'

const router = Router()
router.use(requireAuth)

// ─── GET /api/cms/visits ──────────────────────────────────────────────────────
// Query params:
//   page, size              — pagination
//   outletId                — filter by outlet (admin/owner only)
//   customerId              — filter to a single customer's visits
//   dateFrom, dateTo        — ISO date range
//   type                    — qr_scan | payment
//   search                  — fuzzy search on customer name/phone
//   sortDir                 — asc | desc (default: desc)
router.get('/', async (req, res, next) => {
  try {
    const page    = Math.max(0, parseInt(req.query.page as string) || 0)
    const size    = Math.min(100, Math.max(1, parseInt(req.query.size as string) || 20))
    const sortDir = req.query.sortDir === 'asc' ? 'asc' : 'desc'
    const search  = (req.query.search as string)?.trim() || ''

    let outletId: string | undefined
    if (req.staff!.role === 'franchise_owner') {
      outletId = req.staff!.assignedOutletId ?? undefined
    } else if (req.query.outletId) {
      outletId = req.query.outletId as string
    }

    const where: any = {}
    if (outletId)             where.outletId   = outletId
    if (req.query.customerId) where.customerId = req.query.customerId
    if (req.query.type && ['qr_scan', 'payment'].includes(req.query.type as string)) {
      where.visitType = req.query.type
    }
    if (req.query.dateFrom || req.query.dateTo) {
      where.visitedAt = {}
      if (req.query.dateFrom) where.visitedAt.gte = new Date(req.query.dateFrom as string)
      if (req.query.dateTo)   where.visitedAt.lte = new Date(req.query.dateTo as string)
    }
    if (search) {
      where.customer = {
        OR: [
          { fullName: { contains: search, mode: 'insensitive' } },
          { phone:    { contains: search } },
        ],
      }
    }

    const [visits, total] = await Promise.all([
      prisma.customerVisit.findMany({
        where,
        skip: page * size,
        take: size,
        orderBy: { visitedAt: sortDir },
        include: {
          customer: { select: { fullName: true, phone: true } },
          outlet:   { select: { name: true, code: true } },
        },
      }),
      prisma.customerVisit.count({ where }),
    ])

    res.json(paginate(visits, total, page, size))
  } catch (err) {
    next(err)
  }
})

// ─── GET /api/cms/visits/summary ──────────────────────────────────────────────
// Returns qr_scan vs payment breakdown — mirrors same filters as GET /
router.get('/summary', async (req, res, next) => {
  try {
    const search = (req.query.search as string)?.trim() || ''

    let outletId: string | undefined
    if (req.staff!.role === 'franchise_owner') {
      outletId = req.staff!.assignedOutletId ?? undefined
    } else if (req.query.outletId) {
      outletId = req.query.outletId as string
    }

    const where: any = {}
    if (outletId)             where.outletId   = outletId
    if (req.query.customerId) where.customerId = req.query.customerId
    if (req.query.type && ['qr_scan', 'payment'].includes(req.query.type as string)) {
      where.visitType = req.query.type
    }
    if (req.query.dateFrom || req.query.dateTo) {
      where.visitedAt = {}
      if (req.query.dateFrom) where.visitedAt.gte = new Date(req.query.dateFrom as string)
      if (req.query.dateTo)   where.visitedAt.lte = new Date(req.query.dateTo as string)
    }
    if (search) {
      where.customer = {
        OR: [
          { fullName: { contains: search, mode: 'insensitive' } },
          { phone:    { contains: search } },
        ],
      }
    }

    const breakdown = await prisma.customerVisit.groupBy({
      by: ['visitType'],
      where,
      _count: { visitType: true },
    })

    const qrCount  = breakdown.find(b => b.visitType === 'qr_scan')?._count.visitType  ?? 0
    const payCount = breakdown.find(b => b.visitType === 'payment')?._count.visitType   ?? 0

    res.json({ totalVisits: qrCount + payCount, qrScans: qrCount, payments: payCount })
  } catch (err) {
    next(err)
  }
})

export default router
