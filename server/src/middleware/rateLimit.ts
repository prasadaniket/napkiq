import rateLimit from 'express-rate-limit'

// Standardized limiter factory — JSON 429 responses, standard RateLimit headers.
function make(windowMs: number, max: number, message: string) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: message },
  })
}

/** Broad safety net for the whole API. */
export const generalLimiter = make(
  60 * 1000, 300,
  'Too many requests, please slow down.',
)

/** Strict — login is the brute-force target. */
export const authLimiter = make(
  15 * 60 * 1000, 10,
  'Too many login attempts. Try again later.',
)

/** Public unauthenticated writes (registration, reviews, visits). */
export const writeLimiter = make(
  10 * 60 * 1000, 30,
  'Too many submissions, please try again later.',
)

/**
 * Public unauthenticated device-scoped reads (my-orders, returning-customer lookup).
 * Stricter than the global net to blunt enumeration of the device-token keyspace.
 */
export const readLimiter = make(
  60 * 1000, 60,
  'Too many requests, please slow down.',
)

/** Automation triggers — expensive fan-out (mass WhatsApp/email). */
export const automationLimiter = make(
  60 * 60 * 1000, 20,
  'Automation rate limit exceeded.',
)
