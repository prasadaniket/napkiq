/**
 * One-off migration: rename outlets + staff usernames, and reset ALL passwords.
 *
 * Run once (from the `server` directory):
 *     npx tsx src/scripts/rename_and_reset.ts
 *
 * Requires the usual server env (DATABASE_URL + SUPABASE_SERVICE_ROLE_KEY, etc).
 * Safe to re-run: outlet/username updates match on the OLD value, so a second
 * run simply finds nothing left to change. The password reset always re-applies.
 */
import { prisma } from '../lib/prisma'
import { supabaseAdmin } from '../lib/supabase'

const NEW_PASSWORD = '12345678'

// old slug/code  →  new outlet data
const OUTLETS = [
  { oldSlug: 'boisar',  oldCode: 'BSR', slug: 'mumbai',    code: 'MUM', name: 'Napkiq Mumbai',    location: 'Mumbai, Maharashtra' },
  { oldSlug: 'palghar', oldCode: 'PLG', slug: 'pune',      code: 'PUN', name: 'Napkiq Pune',      location: 'Pune, Maharashtra' },
  { oldSlug: 'virar',   oldCode: 'VIR', slug: 'delhi',     code: 'DEL', name: 'Napkiq Delhi',     location: 'Delhi' },
  { oldSlug: 'vasai',   oldCode: 'VSI', slug: 'bangalore', code: 'BLR', name: 'Napkiq Bangalore', location: 'Bangalore, Karnataka' },
]

// email (stable key)          →  new username + refreshed fullName
const USERNAMES: { email: string; username: string; fullName?: string }[] = [
  { email: 'unicord26@gmail.com',    username: 'admin' },
  { email: 'owner@stoneoven.com',    username: 'owner' },
  { email: 'fbowner@stoneoven.com',  username: 'f1owner', fullName: 'Franchise Owner — Mumbai' },
  { email: 'fpowner@stoneoven.com',  username: 'f2owner', fullName: 'Franchise Owner — Pune' },
  { email: 'fviowner@stoneoven.com', username: 'f3owner', fullName: 'Franchise Owner — Delhi' },
  { email: 'fvaowner@stoneoven.com', username: 'f4owner', fullName: 'Franchise Owner — Bangalore' },
]

async function archiveStrayOutlets() {
  console.log('\n=== Archiving stray/empty conflicting outlets ===')
  // A pre-existing INACTIVE, empty "Napkiq Delhi" placeholder occupies the
  // delhi/DEL identity that Virar should take. Park it out of the way so the
  // rename can proceed. Matches only the inactive placeholder — the real
  // (active) Delhi produced by renaming Virar is never touched, so re-runs are safe.
  const res = await prisma.outlet.updateMany({
    where: { slug: 'delhi', isActive: false },
    data:  { slug: 'delhi-archived', code: 'DELX', name: 'Napkiq Delhi (archived)' },
  })
  console.log(`  delhi (inactive placeholder) → delhi-archived (${res.count} row${res.count === 1 ? '' : 's'})`)
}

async function renameOutlets() {
  console.log('\n=== Outlets ===')
  for (const o of OUTLETS) {
    const res = await prisma.outlet.updateMany({
      where: { OR: [{ slug: o.oldSlug }, { code: o.oldCode }] },
      data:  { slug: o.slug, code: o.code, name: o.name, location: o.location },
    })
    console.log(`  ${o.oldSlug.padEnd(8)} → ${o.slug.padEnd(10)} (${res.count} row${res.count === 1 ? '' : 's'})`)
  }
}

async function renameUsernames() {
  console.log('\n=== Usernames ===')
  for (const u of USERNAMES) {
    const data: { username: string; fullName?: string } = { username: u.username }
    if (u.fullName) data.fullName = u.fullName
    const res = await prisma.staff.updateMany({ where: { email: u.email }, data })
    console.log(`  ${u.email.padEnd(24)} → ${u.username.padEnd(8)} (${res.count} row${res.count === 1 ? '' : 's'})`)
  }
}

async function resetAllPasswords() {
  console.log(`\n=== Resetting EVERY password to "${NEW_PASSWORD}" ===`)
  let page = 1
  let done = 0
  for (;;) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 100 })
    if (error) throw error
    const users = data?.users ?? []
    if (users.length === 0) break
    for (const u of users) {
      const { error: upErr } = await supabaseAdmin.auth.admin.updateUserById(u.id, { password: NEW_PASSWORD })
      if (upErr) console.error(`  ❌ ${u.email ?? u.id}: ${upErr.message}`)
      else { console.log(`  ✅ ${u.email ?? u.id}`); done++ }
    }
    page++
  }
  console.log(`  Reset ${done} account(s).`)
}

async function main() {
  await archiveStrayOutlets()
  await renameOutlets()
  await renameUsernames()
  await resetAllPasswords()
  console.log('\nDone.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
