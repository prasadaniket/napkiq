import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import outletsRouter from './routes/outlets'
import customersRouter from './routes/customers'
import reviewsRouter from './routes/reviews'
import visitsRouter from './routes/visits'
import menuRouter from './routes/menu'
import ordersRouter from './routes/orders'
import reservationsRouter from './routes/reservations'
import authRouter from './routes/auth'
import dashboardRouter from './routes/cms/dashboard'
import cmsCustomersRouter from './routes/cms/customers'
import cmsReviewsRouter from './routes/cms/reviews'
import cmsOutletsRouter from './routes/cms/outlets'
import cmsVisitsRouter from './routes/cms/visits'
import automationLogsRouter from './routes/cms/automationLogs'
import exportRouter from './routes/cms/export'
import cmsMenuRouter from './routes/cms/menu'
import cmsOrdersRouter from './routes/cms/orders'
import cmsReservationsRouter from './routes/cms/reservations'
import cmsSessionsRouter from './routes/cms/sessions'
import cmsTablesRouter from './routes/cms/tables'
import cmsWaitlistRouter from './routes/cms/waitlist'
import cmsCrmRouter from './routes/cms/crm'
import automationRouter          from './routes/automation'
import automationTemplatesRouter from './routes/cms/automationTemplates'
import qrRouter from './routes/cms/qr'
import cmsVaultRouter from './routes/cms/vault'
import cmsProfileRouter from './routes/cms/profile'
import { errorHandler } from './middleware/errorHandler'
import { generalLimiter, automationLimiter } from './middleware/rateLimit'

export function createApp() {
  const app = express()

  // Behind Render/other reverse proxies — required so rate limiting keys on the
  // real client IP (X-Forwarded-For) rather than the proxy's.
  app.set('trust proxy', 1)

  // Baseline security headers (HSTS, nosniff, frameguard, etc.) + hides the
  // Express fingerprint. CSP is intentionally left off here — this service only
  // returns JSON, and the HTML-rendering Next apps enforce their own CSP. CORP is
  // set cross-origin so the separate-origin frontend can consume the API.
  app.disable('x-powered-by')
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  )

  const allowedOrigins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
  const isProduction = process.env.NODE_ENV === 'production'

  // Fail closed in production: an empty allow-list means CORS_ORIGINS is
  // misconfigured, which must never fall through to "allow every origin". Outside
  // production an empty list stays permissive for local dev convenience.
  if (isProduction && allowedOrigins.length === 0) {
    console.error('[CORS] CORS_ORIGINS is not set in production — all cross-origin requests will be denied.')
  }

  app.use(
    cors({
      origin: (origin, callback) => {
        // Requests without an Origin header (curl, same-origin, server-to-server)
        // are not subject to browser CORS — always allow them.
        if (!origin) {
          callback(null, true)
          return
        }
        // In the allow-list, or dev with no list configured → allow. In production a
        // missing list denies everything (fail closed).
        if (allowedOrigins.includes(origin) || (!isProduction && allowedOrigins.length === 0)) {
          callback(null, true)
        } else {
          console.error(`[CORS Error] Origin "${origin}" is not allowed. Allowed:`, allowedOrigins)
          callback(new Error(`CORS: origin ${origin} not allowed`))
        }
      },
      credentials: true,
    })
  )

  app.use(express.json())

  // Broad rate-limit safety net across the whole API.
  app.use('/api', generalLimiter)

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // Public routes
  app.use('/api/outlets', outletsRouter)
  app.use('/api/customers', customersRouter)
  app.use('/api/reviews', reviewsRouter)
  app.use('/api/visits', visitsRouter)
  app.use('/api/menu', menuRouter)
  app.use('/api/orders', ordersRouter)
  app.use('/api/reservations', reservationsRouter)

  // Auth
  app.use('/api/auth', authRouter)  // POST /api/auth/login, GET /api/auth/me

  // CMS (protected)
  app.use('/api/cms/dashboard',       dashboardRouter)
  app.use('/api/cms/customers',       cmsCustomersRouter)
  app.use('/api/cms/reviews',         cmsReviewsRouter)
  app.use('/api/cms/outlets',         cmsOutletsRouter)
  app.use('/api/cms/visits',          cmsVisitsRouter)
  app.use('/api/cms/automation-logs', automationLogsRouter)
  app.use('/api/cms/export',          exportRouter)
  app.use('/api/cms/menu',                 cmsMenuRouter)
  app.use('/api/cms/orders',               cmsOrdersRouter)
  app.use('/api/cms/reservations',         cmsReservationsRouter)
  app.use('/api/cms/sessions',             cmsSessionsRouter)
  app.use('/api/cms/tables',               cmsTablesRouter)
  app.use('/api/cms/waitlist',             cmsWaitlistRouter)
  app.use('/api/cms/crm',                  cmsCrmRouter)
  app.use('/api/cms/automation-templates', automationTemplatesRouter)
  app.use('/api/cms/qr',                  qrRouter)
  app.use('/api/cms/vault',               cmsVaultRouter)
  app.use('/api/cms/profile',             cmsProfileRouter)

  // Automation (Cloudflare Worker cron + CMS manual trigger — dual-auth)
  app.use('/api/automation',               automationLimiter, automationRouter)

  app.use(errorHandler)

  return app
}
