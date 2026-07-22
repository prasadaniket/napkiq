import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Client input errors — surface as 400 with field-level detail rather than a
  // generic 500 (which would otherwise mask bad requests as server faults).
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Invalid request',
      details: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    })
    return
  }

  // CORS allow-list rejections (thrown from the origin callback in app.ts) fail
  // closed with a clean 403 instead of a confusing 500.
  if (err.message?.startsWith('CORS:')) {
    res.status(403).json({ error: 'Origin not allowed' })
    return
  }

  // Log the full error server-side, but never leak internal messages/stack
  // (Prisma/pg errors expose table, column and constraint details) to clients.
  console.error(`[Error] ${err.message}`, err.stack)
  res.status(500).json({ error: 'Internal server error' })
}
