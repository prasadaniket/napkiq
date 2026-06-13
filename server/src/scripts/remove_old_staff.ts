import { prisma } from '../lib/prisma'
import { supabaseAdmin } from '../lib/supabase'

const OLD_EMAIL = 'franchise@napkiq.in'

async function main() {
  // Find the staff record
  const staff = await prisma.staff.findUnique({ where: { email: OLD_EMAIL } })
  if (!staff) {
    console.log(`No staff record found for ${OLD_EMAIL} — already deleted.`)
    return
  }

  console.log(`Found staff: ${staff.fullName} (${staff.id})`)

  // Delete from DB
  await prisma.staff.delete({ where: { email: OLD_EMAIL } })
  console.log('✅ Deleted from staff table')

  // Delete from Supabase Auth
  const { error } = await supabaseAdmin.auth.admin.deleteUser(staff.id)
  if (error) {
    console.warn(`⚠️  Could not delete Supabase Auth user: ${error.message}`)
  } else {
    console.log('✅ Deleted from Supabase Auth')
  }

  console.log('Done.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
