/**
 * One-off DESTRUCTIVE reset: wipe all customer-generated data for a clean start.
 *
 * Why: the customer `deviceId` was historically a browser fingerprint (guessable /
 * collision-prone). We switched to random device tokens, so the old fingerprint-keyed
 * records are discarded rather than migrated (owner decision).
 *
 * Deletes: orders (+ order items via cascade), order counters, reviews, customer
 * visits, automation logs, customers.
 * KEEPS:   outlets, menu categories, menu items, staff.
 *
 * Run once (from the `server` directory), passing the confirmation flag so it can
 * never fire by accident (e.g. via a mistaken import):
 *     npx tsx src/scripts/reset_customer_data.ts --yes
 *
 * Requires the usual server env (DATABASE_URL, etc). Point it at the intended DB —
 * do NOT run against production until the owner confirms.
 */
import { prisma } from '../lib/prisma'

async function main() {
  if (!process.argv.includes('--yes')) {
    console.error(
      'Refusing to run without confirmation.\n' +
        'This permanently deletes ALL customers, orders, visits, reviews and\n' +
        'automation logs. Re-run with --yes if that is what you intend:\n' +
        '    npx tsx src/scripts/reset_customer_data.ts --yes'
    )
    process.exit(1)
  }

  console.log('\n=== Wiping customer-generated data ===')

  // FK-safe order: children that reference customerId (nullable, no cascade) must go
  // before customers. Deleting orders cascades their items (OrderItem onDelete: Cascade),
  // but we clear items first anyway so the counts are explicit.
  const orderItems     = await prisma.orderItem.deleteMany({})
  const orders         = await prisma.order.deleteMany({})
  const orderCounters  = await prisma.orderCounter.deleteMany({})
  const reviews        = await prisma.review.deleteMany({})
  const visits         = await prisma.customerVisit.deleteMany({})
  const automationLogs = await prisma.automationLog.deleteMany({})
  const customers      = await prisma.customer.deleteMany({})

  console.log(`  order items:      ${orderItems.count}`)
  console.log(`  orders:           ${orders.count}`)
  console.log(`  order counters:   ${orderCounters.count}`)
  console.log(`  reviews:          ${reviews.count}`)
  console.log(`  customer visits:  ${visits.count}`)
  console.log(`  automation logs:  ${automationLogs.count}`)
  console.log(`  customers:        ${customers.count}`)
  console.log('\nDone. Outlets, menus and staff were left untouched.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
