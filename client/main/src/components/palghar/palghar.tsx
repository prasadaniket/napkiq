'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { api } from '@/lib/api'
import { outletConfig } from '@/lib/outletConfig'
import { useDeviceFingerprint } from '@/hooks/useDeviceFingerprint'
import { useCustomer } from '@/hooks/useCustomer'
import { useOutlet } from '@/hooks/useOutlet'
import Loader from '@/components/ui/Loader'

const CODE = 'palghar'
const config = outletConfig[CODE]

export default function PalgharPage() {
  const { deviceId, loading: fpLoading } = useDeviceFingerprint()
  const { outlet, loading: outletLoading } = useOutlet(CODE)
  const { customer, loading: customerLoading, setCustomer } = useCustomer(deviceId)
  const [visitRecorded, setVisitRecorded] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (!deviceId || !outlet || visitRecorded) return
    api.post('/visits', { deviceId, outletId: outlet.id, visitType: 'qr_scan' })
      .catch(console.error)
      .finally(() => setVisitRecorded(true))
  }, [deviceId, outlet, visitRecorded])

  const handleFormSuccess = () => {
    if (deviceId) {
      api.get(`/customers/by-device/${deviceId}`)
        .then((res) => setCustomer(res.data))
        .catch(console.error)
    }
    setRefreshKey((k) => k + 1)
  }

  if (fpLoading || customerLoading || outletLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A1A1A] to-[#000000]">
      <Loader />
    </div>
  )

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-10 px-6 bg-gradient-to-b from-[#1A1A1A] to-[#000000] overflow-x-hidden">

      <motion.div
        className="absolute top-[5%] left-1/2 w-[400px] h-[400px] bg-[#E88C3A] opacity-10 blur-[130px] rounded-full pointer-events-none"
        style={{ x: '-50%' }}
        animate={{ scale: [1, 1.05, 1], x: ['-50%', '-48%', '-52%', '-50%'], y: [0, 15, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <main className="relative z-10 flex-1 w-full max-w-sm mx-auto flex flex-col pt-4 pb-10">

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center mb-6"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
            className="rounded-full shadow-[0_15px_35px_rgba(232,140,58,0.25)] ring-1 ring-white/10 mb-5 relative group"
          >
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_25px_rgba(232,140,58,0.4)] transition-opacity duration-300 pointer-events-none" />
            <Avatar className="w-24 h-24 bg-[#1A1A1A]">
              <AvatarImage src="/images/logo/logo.jpg" alt="Napkiq" className="object-cover" />
              <AvatarFallback className="text-white text-2xl font-bold bg-[#1A1A1A]">NQ</AvatarFallback>
            </Avatar>
          </motion.div>

          <h1 className="font-extrabold text-2xl mb-1 text-center tracking-[0.5px]">
            <span className="text-white">Nap</span>
            <motion.span
              animate={{ textShadow: ['0 0 4px rgba(232,140,58,0.1)', '0 0 12px rgba(232,140,58,0.4)', '0 0 4px rgba(232,140,58,0.1)'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'linear-gradient(to right, #F2A65A, #E88C3A, #D96A1D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >kiq</motion.span>
          </h1>
          <p className="text-white/70 text-[13px] text-center font-medium">Authentic flavours, crafted with love</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-8"
        >
          <p className="text-white font-bold text-lg">{outlet?.name ?? config.name}</p>
          <p className="text-[#E88C3A] text-sm mt-1 opacity-80">{outlet?.location ?? config.location}</p>
        </motion.div>

        <div className="w-full flex flex-col gap-4 mb-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Link href={`/outlet/${CODE}/menu`} className="block w-full">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="relative overflow-hidden w-full h-[64px] flex flex-col items-center justify-center rounded-full transition-shadow duration-300 bg-gradient-to-b from-[#F2A65A] via-[#E88C3A] to-[#D96A1D] shadow-[0_0_16px_rgba(232,140,58,0.3)] hover:shadow-[0_0_24px_rgba(232,140,58,0.4)] border border-white/10"
              >
                <span className="relative z-10 font-bold text-[17px] tracking-wide text-white mb-0.5">View Our Menu</span>
                <span className="relative z-10 text-[11px] font-medium text-white/90">Browse all dishes & prices</span>
              </motion.div>
            </Link>
          </motion.div>

          {outlet?.googleMapsUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.30, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.a
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                href={outlet.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                className="w-full h-[60px] flex items-center justify-center gap-2.5 rounded-full bg-[#EEEEEE] shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-transparent transition-shadow duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E88C3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="font-semibold text-[15px] tracking-wide text-[#1A1A1A]">Get Directions</span>
              </motion.a>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Link href={`/outlet/${CODE}/feedback`} className="block w-full">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="w-full flex flex-col items-center justify-center px-6 py-3.5 rounded-[32px] bg-[#EEEEEE] shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-transparent transition-shadow duration-300"
              >
                <div className="flex flex-col items-center">
                  <span className="font-bold text-[16px] tracking-wide text-[#1A1A1A]">Your First Visit</span>
                  <span className="text-[12px] text-[#1A1A1A]/60 font-medium mt-0.5">Tell us how it went</span>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.40, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Link href={`/outlet/${CODE}/review`} className="block w-full">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="w-full flex flex-col items-center justify-center px-6 py-3.5 rounded-[32px] bg-[#EEEEEE] shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-transparent transition-shadow duration-300"
              >
                <div className="flex flex-col items-center">
                  <span className="font-bold text-[16px] tracking-wide text-[#1A1A1A]">Share Your Experience</span>
                  <span className="text-[12px] text-[#1A1A1A]/60 font-medium mt-0.5">Rate your visit and leave a review</span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

      </main>

      {(outlet?.instagramUrl || outlet?.facebookUrl) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center gap-2 mb-6 relative z-10"
        >
          <p className="text-white/30 text-[10px] font-medium uppercase tracking-[0.3em]">Connect with us</p>
          <div className="flex gap-2">
          {outlet?.instagramUrl && (
            <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              href={outlet.instagramUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center text-white/40 hover:text-[#E88C3A] transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </motion.a>
          )}
          {outlet?.facebookUrl && (
            <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              href={outlet.facebookUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center text-white/40 hover:text-[#E88C3A] transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </motion.a>
          )}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="relative z-10 w-full text-center pb-6 text-[10px] text-white/30 tracking-wide font-medium"
      >
        © 2026 UniCord. All rights reserved.
      </motion.div>
    </div>
  )
}
