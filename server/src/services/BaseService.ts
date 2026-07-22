import { prisma } from '../lib/prisma'

/**
 * BaseService — Parent class for all services.
 * Provides shared Prisma client, error handling, and pagination.
 * OOP Concept: Inheritance (child services extend this)
 */
export class BaseService {
  protected readonly prisma = prisma

  protected handleError(error: Error, context: string): never {
    console.error(`[${this.constructor.name}] ${context}:`, error.message)
    throw new Error(`${context} failed: ${error.message}`)
  }

  protected paginate<T>(items: T[], total: number, page: number, size: number) {
    return {
      content: items,
      totalElements: total,
      totalPages: Math.ceil(total / size),
      size,
      number: page,
      first: page === 0,
      last: (page + 1) * size >= total,
    }
  }
}
