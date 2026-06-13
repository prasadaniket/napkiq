import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { sentimentService } from '../services/SentimentService'
import { z } from 'zod'

const router = Router()

const CreateReviewSchema = z.object({
  customerId: z.string().uuid().nullable().optional(),
  outletId: z.string().uuid(),
  reviewText: z.string().nullable().optional(),
  stars: z.number().int().min(1).max(5),
  reviewType: z.enum(['first_visit', 'repeat']),
})

// POST /reviews
router.post('/', async (req, res, next) => {
  try {
    const body = CreateReviewSchema.parse(req.body)

    // Auto-analyze sentiment — caller doesn't need to know this runs
    const sentiment = sentimentService.analyze(body.reviewText, body.stars)

    const review = await prisma.review.create({
      data: {
        ...body,
        sentimentLabel: sentiment.label,
        sentimentScore: sentiment.score,
        sentimentKeywords: sentiment.keywords,
      },
    })

    // Mark hasSubmittedFirstReview on first visit
    if (body.customerId && body.reviewType === 'first_visit') {
      await prisma.customer.update({
        where: { id: body.customerId },
        data: { hasSubmittedFirstReview: true },
      })
    }

    // For repeat reviews: create a linked visit row + increment totalVisits
    // so the visit history and counter stay in sync
    if (body.customerId && body.reviewType === 'repeat') {
      // Fetch deviceId so the visit row is consistent with QR-scan rows
      const cust = await prisma.customer.findUnique({
        where: { id: body.customerId },
        select: { deviceId: true },
      })
      await prisma.customerVisit.create({
        data: {
          customerId: body.customerId,
          deviceId:   cust?.deviceId ?? body.customerId, // fallback to id if no deviceId
          outletId:   body.outletId,
          visitType:  'qr_scan',
        },
      })
      await prisma.customer.update({
        where: { id: body.customerId },
        data: {
          lastVisitDate: new Date(),
          totalVisits:   { increment: 1 },
        },
      })
    }

    res.status(201).json(review)
  } catch (err) {
    next(err)
  }
})

export default router
