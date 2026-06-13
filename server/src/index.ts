import 'dotenv/config'
import dns from 'dns'

// Override DNS to use Google DNS since local DNS may not resolve *.supabase.co
dns.setDefaultResultOrder('ipv4first')
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])

import { createApp } from './app'
import { prisma } from './lib/prisma'

const PORT = parseInt(process.env.PORT ?? '8080', 10)

const app = createApp()

const server = app.listen(PORT, () => {
  console.log(`Napkiq server running on port ${PORT}`)
  console.log(`Health: http://localhost:${PORT}/api/health`)
})

const shutdown = (signal: string) => {
  console.log(`${signal} received — shutting down gracefully`)
  server.close(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  // Force exit if graceful shutdown takes too long
  setTimeout(() => process.exit(1), 10_000).unref()
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
