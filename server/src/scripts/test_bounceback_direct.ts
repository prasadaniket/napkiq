import { prisma } from '../lib/prisma'
import { getTemplate } from '../lib/templateStore'
import { sendWhatsApp } from '../lib/notifications'

async function main() {
  const customerId = "ef5d95c2-5d42-4162-9875-1075af83f176" // Mercer
  const fullName = "Alex Mercer"
  const phone = "6450988550"
  const outletId = "4b46dc45-9b83-4e31-ab58-894ef081f306"

  console.log("Directly invoking bounceback trigger logic...")
  try {
    const tmpl = getTemplate('bounceback_whatsapp')
    console.log("Template fetched:", tmpl)

    if (!tmpl || !tmpl.isActive) {
      console.log(`[BOUNCE-BACK] Skip sending - template bounceback_whatsapp is inactive or missing.`)
      return
    }

    const outlet = await prisma.outlet.findUnique({ where: { id: outletId } })
    console.log("Outlet fetched:", outlet)
    if (!outlet) {
      console.log(`[BOUNCE-BACK] Skip sending - outlet ${outletId} not found.`)
      return
    }

    const digits = phone.replace(/\D/g, '')
    const to     = digits.startsWith('91') ? `+${digits}` : `+91${digits}`

    const ok = await sendWhatsApp({
      to,
      templateName: 'napkiq_bounceback',
      variables: {
        customer_name: fullName,
        outlet_name:   outlet.name,
        outlet_code:   outlet.code.toUpperCase()
      }
    })
    console.log("sendWhatsApp returned:", ok)

    const log = await prisma.automationLog.create({
      data: {
        customerId,
        automationType: 'bounceback_whatsapp' as any,
        messageStage:   'on_day' as any,
        status:          ok ? 'success' : 'failed',
        errorMessage:    null,
      }
    })
    console.log("AutomationLog entry created:", log)
  } catch (err) {
    console.error("Error inside test:", err)
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
