import { prisma } from '../lib/prisma'

async function main() {
  console.log("Waiting 11 seconds for setTimeout to complete on the server...")
  await new Promise(resolve => setTimeout(resolve, 11000))

  const logs = await prisma.automationLog.findMany({
    orderBy: { sentAt: 'desc' },
    take: 5,
    include: { customer: true }
  })
  console.log("LATEST AUTOMATION LOGS IN DB:")
  console.log(JSON.stringify(logs, null, 2))
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
