import { prisma } from '../lib/prisma'
import { supabaseAdmin } from '../lib/supabase'

// ─── Staff definitions with usernames ─────────────────────────────────────────
// Passwords are NEVER hardcoded. If a password is needed (e.g. to create the
// Supabase auth user), provide it via an environment variable such as
// STAFF_ADMIN_PASSWORD / STAFF_OWNER_PASSWORD / STAFF_FB_PASSWORD, ...

const STAFF = [
  { email: 'unicord26@gmail.com', password: process.env.STAFF_ADMIN_PASSWORD, username: 'admin', fullName: 'Aniket (UniCord)',          role: 'admin'           as const, outlet: null      },
  { email: 'owner@stoneoven.com',    password: process.env.STAFF_OWNER_PASSWORD, username: 'owner', fullName: 'Nitesh Save',               role: 'owner'           as const, outlet: null      },
  { email: 'fbowner@stoneoven.com',  password: process.env.STAFF_FB_PASSWORD,    username: 'f1owner',   fullName: 'Franchise Owner — Mumbai',  role: 'franchise_owner' as const, outlet: 'mumbai'  },
  { email: 'fpowner@stoneoven.com',  password: process.env.STAFF_FP_PASSWORD,    username: 'f2owner',   fullName: 'Franchise Owner — Pune', role: 'franchise_owner' as const, outlet: 'pune' },
  { email: 'fviowner@stoneoven.com', password: process.env.STAFF_FVI_PASSWORD,   username: 'f3owner',  fullName: 'Franchise Owner — Delhi',   role: 'franchise_owner' as const, outlet: 'delhi'   },
  { email: 'fvaowner@stoneoven.com', password: process.env.STAFF_FVA_PASSWORD,   username: 'f4owner',  fullName: 'Franchise Owner — Bangalore',   role: 'franchise_owner' as const, outlet: 'bangalore'   },
]

async function main() {
  console.log('=== Setting usernames for all staff ===\n')

  const outlets = await prisma.outlet.findMany({ select: { id: true, slug: true } })
  const bySlug: Record<string, string> = Object.fromEntries(outlets.map(o => [o.slug, o.id]))

  for (const s of STAFF) {
    const outletId = s.outlet ? bySlug[s.outlet] : null

    // Find auth user by email
    const { data: list } = await supabaseAdmin.auth.admin.listUsers()
    const authUser = list?.users?.find(u => u.email === s.email)
    if (!authUser) { console.error(`  ❌ No auth user for ${s.email}`); continue }

    // Upsert staff record with username
    await prisma.staff.upsert({
      where:  { id: authUser.id },
      create: { id: authUser.id, email: s.email, username: s.username, fullName: s.fullName, role: s.role, assignedOutletId: outletId, isActive: true },
      update: { username: s.username, fullName: s.fullName, role: s.role, assignedOutletId: outletId },
    })
    console.log(`  ✅  ${s.username.padEnd(12)} → ${s.email}`)
  }

  console.log('\nFinal staff table:')
  const all = await prisma.staff.findMany({ include: { assignedOutlet: { select: { name: true } } } })
  for (const s of all) {
    console.log(`  ${(s.username ?? '—').padEnd(12)} | ${s.role.padEnd(16)} | ${s.email}`)
  }
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
