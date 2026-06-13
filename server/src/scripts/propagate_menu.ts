import { prisma } from '../lib/prisma'

const CONFIG = [
  { slug: 'palghar', delta: -10, name: 'Palghar' },
  { slug: 'virar', delta: 20, name: 'Virar' },
  { slug: 'vasai', delta: 15, name: 'Vasai' },
]

async function main() {
  // 1. Fetch Boisar outlet (BSR / boisar)
  const boisar = await prisma.outlet.findFirst({
    where: { OR: [{ code: 'BSR' }, { slug: 'boisar' }] },
  })

  if (!boisar) {
    console.error('Boisar outlet not found in database.')
    process.exit(1)
  }

  console.log(`Source Outlet: ${boisar.name} (ID: ${boisar.id})`)

  // 2. Fetch all active categories and their items from Boisar
  const boisarCategories = await prisma.menuCategory.findMany({
    where: { outletId: boisar.id, isActive: true },
    include: {
      items: {
        orderBy: { displayOrder: 'asc' },
      },
    },
    orderBy: { displayOrder: 'asc' },
  })

  console.log(`Loaded ${boisarCategories.length} active categories from Boisar.`)

  // 3. Propagate to each target outlet
  for (const target of CONFIG) {
    console.log(`\n--------------------------------------------`)
    console.log(`Propagating to: ${target.name} (${target.slug}) with delta: ${target.delta >= 0 ? '+' : ''}${target.delta} Rs`)

    // Find the target outlet
    const outlet = await prisma.outlet.findFirst({
      where: { slug: target.slug },
    })

    if (!outlet) {
      console.warn(`⚠️ Target outlet with slug "${target.slug}" not found in database. Skipping...`)
      continue
    }

    // Clean existing menu items & categories for target outlet
    const existingCats = await prisma.menuCategory.findMany({
      where: { outletId: outlet.id },
      select: { id: true },
    })

    if (existingCats.length > 0) {
      const catIds = existingCats.map(c => c.id)
      await prisma.menuItem.deleteMany({ where: { categoryId: { in: catIds } } })
      await prisma.menuCategory.deleteMany({ where: { id: { in: catIds } } })
      console.log(`Cleared ${existingCats.length} existing categories from target outlet.`)
    }

    let createdCategoriesCount = 0
    let createdItemsCount = 0

    // Propagate categories and items
    for (const sourceCat of boisarCategories) {
      // Create Category
      const targetCat = await prisma.menuCategory.create({
        data: {
          name: sourceCat.name,
          displayOrder: sourceCat.displayOrder,
          isActive: true,
          outletId: outlet.id,
        },
      })
      createdCategoriesCount++

      // Create Items with adjusted prices
      for (const sourceItem of sourceCat.items) {
        // Adjust main price
        let adjustedPrice: number | null = null
        if (sourceItem.price !== null) {
          const originalPrice = Number(sourceItem.price)
          adjustedPrice = Math.max(0, originalPrice + target.delta)
        }

        // Adjust price variants
        let adjustedVariants: any = null
        if (sourceItem.priceVariants && typeof sourceItem.priceVariants === 'object') {
          adjustedVariants = {}
          for (const [key, value] of Object.entries(sourceItem.priceVariants)) {
            const originalVal = Number(value)
            if (!isNaN(originalVal)) {
              adjustedVariants[key] = Math.max(0, originalVal + target.delta)
            } else {
              adjustedVariants[key] = value // keep as is if not a number
            }
          }
        }

        await prisma.menuItem.create({
          data: {
            categoryId: targetCat.id,
            name: sourceItem.name,
            description: sourceItem.description,
            price: adjustedPrice,
            priceVariants: adjustedVariants ?? undefined,
            isVeg: sourceItem.isVeg,
            imageUrl: sourceItem.imageUrl,
            isAvailable: sourceItem.isAvailable,
            displayOrder: sourceItem.displayOrder,
          },
        })
        createdItemsCount++
      }
    }

    console.log(`Successfully completed ${target.name}: created ${createdCategoriesCount} categories, ${createdItemsCount} items.`)
  }

  console.log(`\n============================================`)
  console.log(`All propagation completed successfully!`)
}

main()
  .catch(e => {
    console.error('Error during menu propagation:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
