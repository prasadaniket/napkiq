import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

const router = Router()

const CreateVisitSchema = z.object({
  customerId: z.string().uuid().nullable().optional(),
  deviceId: z.string().min(1),
  outletId: z.string().uuid(),
  visitType: z.enum(['qr_scan', 'payment']).default('qr_scan'),
})

// POST /visits
router.post('/', async (req, res, next) => {
  try {
    const body = CreateVisitSchema.parse(req.body)

    // Dedup: one visit per device per outlet per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    const existing = await prisma.customerVisit.findFirst({
      where: {
        deviceId: body.deviceId,
        outletId: body.outletId,
        visitedAt: { gte: oneHourAgo },
      },
    })
    if (existing) {
      res.status(200).json(existing)
      return
    }

    // Resolve customerId from deviceId if not explicitly provided
    let resolvedCustomerId = body.customerId ?? null
    if (!resolvedCustomerId && body.deviceId) {
      const byDevice = await prisma.customer.findUnique({
        where: { deviceId: body.deviceId },
        select: { id: true },
      })
      resolvedCustomerId = byDevice?.id ?? null
    }

    const visit = await prisma.customerVisit.create({
      data: { ...body, customerId: resolvedCustomerId },
    })

    // Update customer's lastVisitDate and totalVisits
    if (resolvedCustomerId) {
      await prisma.customer.update({
        where: { id: resolvedCustomerId },
        data: {
          lastVisitDate: new Date(),
          totalVisits: { increment: 1 },
        },
      })
    }

    res.status(201).json(visit)
  } catch (err) {
    next(err)
  }
})

export default router
