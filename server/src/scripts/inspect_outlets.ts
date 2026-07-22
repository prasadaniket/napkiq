import { prisma } from '../lib/prisma'

async function main() {
  const outlets = await prisma.outlet.findMany()
  console.log("OUTLETS IN DB:")
  console.log(JSON.stringify(outlets, null, 2))
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
