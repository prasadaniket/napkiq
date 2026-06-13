import { Router } from 'express'
import { requireAuth } from '../../middleware/auth'
import { qrService } from '../../services/QRService'
import { prisma } from '../../lib/prisma'

const router = Router()
router.use(requireAuth)

// GET /api/cms/qr — all active outlets (admin/owner/franchise_owner)
router.get('/', async (req, res, next) => {
  try {
    let where: any = { isActive: true }
    if (req.staff!.role === 'franchise_owner') {
      where.id = req.staff!.assignedOutletId
    }

    const outlets = await prisma.outlet.findMany({
      where,
      select: { code: true, name: true, slug: true },
      orderBy: { name: 'asc' },
    })

    const results = await qrService.generateAll(outlets, 'dataURL')
    res.json({ success: true, data: results })
  } catch (err) {
    next(err)
  }
})

// GET /api/cms/qr/:outletCode?format=svg|png|dataURL
router.get('/:outletCode', async (req, res, next) => {
  try {
    const { outletCode } = req.params
    const fmt = req.query.format as string
    const format = (['svg', 'png', 'dataURL'].includes(fmt) ? fmt : 'svg') as 'svg' | 'png' | 'dataURL'

    const outlet = await prisma.outlet.findFirst({
      where: { OR: [{ code: outletCode }, { slug: outletCode }], isActive: true },
    })
    if (!outlet) { res.status(404).json({ error: 'Outlet not found' }); return }

    // Franchise owners can only get QR for their own outlet
    if (req.staff!.role === 'franchise_owner' && outlet.id !== req.staff!.assignedOutletId) {
      res.status(403).json({ error: 'Access denied' }); return
    }

    const qr = await qrService.generateForOutlet(outlet.code, format)

    if (format === 'svg') {
      res.setHeader('Content-Type', 'image/svg+xml')
      return res.send(qr)
    }
    if (format === 'png') {
      res.setHeader('Content-Type', 'image/png')
      res.setHeader('Content-Disposition', `attachment; filename=napkiq-qr-${outlet.code}.png`)
      return res.send(qr)
    }
    res.json({
      success: true,
      data: {
        qrCode: qr,
        outletCode: outlet.code,
        outletName: outlet.name,
        url: `${process.env.NEXT_PUBLIC_APP_URL}/outlet/${outlet.code}`,
      },
    })
  } catch (err) {
    next(err)
  }
})

export default router
