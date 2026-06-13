"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Loader from '@/components/ui/Loader'
import { api } from '@/lib/api'
import type { Outlet } from '@/types/outlet'

export default function HomePage() {
  const [outlets, setOutlets] = useState<Outlet[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Napkiq | Artisanal Woodfired Pizzas & Fresh Bakes'
    api.get<Outlet[]>('/outlets')
      .then((res) => setOutlets(res.data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div
      id="home-page"
      className="relative min-h-screen flex flex-col items-center pt-20 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #E85D52 0%, #D64238 50%, #A62B22 100%)' }}
    >

      {/* Animated ambient glow */}
      <motion.div
        className="absolute top-[5%] left-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ x: '-50%', background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.08, 1],
          x: ['-50%', '-48%', '-52%', '-50%'],
          y: [0, 12, -8, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <main id="home-main" className="relative z-10 flex-1 w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto flex flex-col items-center">

        {/* LOGO AREA */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
            className="rounded-full mb-5 relative group"
            style={{ boxShadow: '0 16px 40px rgba(0,2,29,0.18), 0 0 0 4px rgba(255,255,255,0.3)' }}
          >
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: '0 0 32px rgba(255,255,255,0.4)' }} />
            <Avatar className="w-24 h-24 border-2 border-white/40" style={{ background: 'white' }}>
              <AvatarImage src="/images/logo/logo.jpg" alt="Napkiq Restaurant" className="object-cover" />
              <AvatarFallback className="text-secondary text-2xl font-bold bg-white">NQ</AvatarFallback>
            </Avatar>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-white/80 text-[13px] mb-10 text-center font-medium"
        >
          Authentic flavours, crafted with love
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-white/60 text-[10px] font-semibold uppercase tracking-[0.45em] mb-4 w-full text-center"
        >
          Select Outlet
        </motion.p>

        {/* OUTLET LIST */}
        {loading ? (
          <div className="flex justify-center py-4 w-full mb-10">
            <Loader />
          </div>
        ) : (
          <div id="outlet-list" className="w-full flex flex-col gap-4 mb-10">
            {outlets.map((outlet, index) => {
              const isSelected = selectedId === outlet.id
              const isOtherSelected = selectedId !== null && selectedId !== outlet.id

              return (
                <motion.div
                  key={outlet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.08, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    href={`/${(outlet.slug ?? outlet.name.split(' ').pop()!).toLowerCase()}`}
                    onClick={() => setSelectedId(outlet.id)}
                    id={`outlet-btn-${outlet.id}`}
                    aria-label={`Select ${outlet.name} outlet`}
                  >
                    <motion.div
                      whileHover={!isSelected ? { y: -3, scale: 1.02 } : { scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      animate={
                        isOtherSelected
                          ? { opacity: 0.7, filter: 'blur(0.5px)' }
                          : { opacity: 1, filter: 'blur(0px)' }
                      }
                      className={`
                        relative overflow-hidden w-full h-[60px] flex items-center justify-center rounded-full transition-all duration-300
                        ${isSelected
                          ? 'shadow-[0_8px_24px_rgba(0,2,29,0.18)]'
                          : 'shadow-[0_2px_12px_rgba(0,2,29,0.08)]'
                        }
                      `}
                      style={
                        isSelected
                          ? { background: '#ffffff', border: '2px solid rgba(255,255,255,0.9)' }
                          : { background: 'rgba(255,255,255,0.22)', border: '1.5px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }
                      }
                    >
                      <span
                        className={`relative z-10 font-semibold text-[15px] tracking-wide transition-colors duration-300 ${
                          isSelected ? 'text-[#00021D]' : 'text-white'
                        }`}
                      >
                        {outlet.name}
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}

      </main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative z-10 w-full text-center pb-8 pt-6 text-white/40 text-[11px] tracking-wide font-medium"
      >
        © 2026 UniCord. All rights reserved.
      </motion.div>
    </div>
  )
}
