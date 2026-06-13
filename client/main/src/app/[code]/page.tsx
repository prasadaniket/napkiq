'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { api } from '@/lib/api'
import { useDeviceFingerprint } from '@/hooks/useDeviceFingerprint'
import { useCustomer } from '@/hooks/useCustomer'
import { useOutlet } from '@/hooks/useOutlet'
import Loader from '@/components/ui/Loader'

export default function OutletPage() {
  const params = useParams()
  const code = params.code as string

  const { deviceId, loading: fpLoading } = useDeviceFingerprint()
  const { outlet, loading: outletLoading } = useOutlet(code)
  const { customer, loading: customerLoading, setCustomer } = useCustomer(deviceId)
  const [visitRecorded, setVisitRecorded] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (!deviceId || !outlet || visitRecorded) return
    const sessionKey = `so_visit_${outlet.id}`
    if (sessionStorage.getItem(sessionKey)) {
      setVisitRecorded(true)
      return
    }
    api.post('/visits', { deviceId, outletId: outlet.id, visitType: 'qr_scan' })
      .catch(console.error)
      .finally(() => {
        sessionStorage.setItem(sessionKey, '1')
        setVisitRecorded(true)
      })
  }, [deviceId, outlet, visitRecorded])

  useEffect(() => {
    if (outlet) {
      document.title = `${outlet.name} | Napkiq - Woodfired Pizza & Cafe`
    }
  }, [outlet])

  const handleFormSuccess = () => {
    if (deviceId) {
      api.get(`/customers/by-device/${deviceId}`)
        .then((res) => setCustomer(res.data))
        .catch(console.error)
    }
    setRefreshKey((k) => k + 1)
  }

  const loading = fpLoading || outletLoading || customerLoading

  const gradientStyle = { background: 'linear-gradient(135deg, #E85D52 0%, #D64238 50%, #A62B22 100%)' }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={gradientStyle}>
      <Loader />
    </div>
  )

  if (!outlet) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={gradientStyle}>
        <p className="text-white/70 text-lg">Outlet not found</p>
      </div>
    )
  }

  const showOngoingForm = customer && customer.hasSubmittedFirstReview

  /* Reusable glass button base style */
  const glassBtn = 'w-full h-[60px] flex items-center justify-center gap-2.5 rounded-full transition-all duration-300'

  return (
    <div
      id="outlet-page"
      className="relative min-h-screen flex flex-col items-center pt-10 px-6 overflow-x-hidden"
      style={gradientStyle}
    >

      {/* Ambient glow */}
      <motion.div
        className="absolute top-[5%] left-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ x: '-50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.06, 1], x: ['-50%', '-48%', '-52%', '-50%'], y: [0, 14, -9, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <main id="outlet-main" className="relative z-10 flex-1 w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto flex flex-col pt-4 pb-10">

        {/* Logo + branding */}
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
            className="rounded-full mb-5 relative group"
            style={{ boxShadow: '0 16px 40px rgba(0,2,29,0.18), 0 0 0 4px rgba(255,255,255,0.3)' }}
          >
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: '0 0 32px rgba(255,255,255,0.4)' }} />
            <Avatar className="w-24 h-24 border-2 border-white/40" style={{ background: 'white' }}>
              <AvatarImage src="/images/logo/logo.jpg" alt="Napkiq Restaurant" className="object-cover" />
              <AvatarFallback className="text-secondary text-2xl font-bold bg-white">NQ</AvatarFallback>
            </Avatar>
          </motion.div>
          <p className="text-white/75 text-[13px] text-center font-medium">
            Authentic flavours, crafted with love
          </p>
        </motion.div>

        {/* Outlet name + location */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-8 flex flex-col items-center"
        >
          <p className="font-bold text-lg" style={{ color: '#00021D' }}>{outlet.name}</p>
          <p className="text-white/80 text-sm mt-1 font-medium">{outlet.location}</p>

          {/* Moved Connect With Us directly under location */}
          {(outlet.instagramUrl || outlet.facebookUrl) && (
            <div className="flex flex-col items-center mt-4">
              <p className="text-[10.5px] text-white/50 tracking-[0.2em] font-bold uppercase mb-2">Connect With Us</p>
              <div className="flex items-center gap-4">
                {outlet.instagramUrl && (
                  <a href={outlet.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/70 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                )}
                {outlet.facebookUrl && (
                  <a href={outlet.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/70 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Action buttons */}
        <div id="outlet-actions" className="w-full flex flex-col gap-4 mb-10">

          {/* View Menu — primary white selected state */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Link href={`/${code}/menu`} className="block w-full" id="btn-view-menu">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className={`${glassBtn} font-bold text-[17px] tracking-wide`}
                style={{
                  background: '#ffffff',
                  color: '#00021D',
                  boxShadow: '0 8px 24px rgba(0,2,29,0.18)',
                  border: '2px solid rgba(255,255,255,0.9)',
                }}
              >
                <span>View Menu</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Get Directions */}
          {outlet.googleMapsUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.30, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.a
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                href={outlet.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-get-directions"
                aria-label="Get directions to this outlet"
                className={glassBtn}
                style={{ background: 'rgba(255,255,255,0.22)', border: '1.5px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00021D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="font-semibold text-[15px] tracking-wide text-white">Get Directions</span>
              </motion.a>
            </motion.div>
          )}

          {/* Your First Visit / Already Submitted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {showOngoingForm ? (
              <div
                className="w-full flex flex-col items-center justify-center px-6 py-3.5 rounded-[32px] cursor-not-allowed"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px dashed rgba(255,255,255,0.3)' }}
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span className="font-bold text-[15px] tracking-wide text-white/40">Your First Visit</span>
                </div>
                <span className="text-[11px] text-white/50 font-medium mt-0.5">Already submitted — thank you!</span>
              </div>
            ) : (
              <Link href={`/${code}/feedback`} className="block w-full" id="btn-first-visit">
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full flex flex-col items-center justify-center px-6 py-3.5 rounded-[32px] transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.22)', border: '1.5px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }}
                >
                  <span className="font-bold text-[16px] tracking-wide text-white">Your First Visit</span>
                  <span className="text-[12px] text-white/70 font-medium mt-0.5">Tell us how it went</span>
                </motion.div>
              </Link>
            )}
          </motion.div>

          {/* Share Your Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.40, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Link href={`/${code}/review`} className="block w-full" id="btn-share-experience">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="w-full flex flex-col items-center justify-center px-6 py-3.5 rounded-[32px] transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.22)', border: '1.5px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }}
              >
                <span className="font-bold text-[16px] tracking-wide text-white">Share Your Experience</span>
                <span className="text-[12px] text-white/70 font-medium mt-0.5">Rate your visit and leave a review</span>
              </motion.div>
            </Link>
          </motion.div>
        </div>

      </main>

      {/* Simple footer copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="relative z-10 w-full text-center pb-8 pt-4 text-white/20 text-[10px] tracking-wide font-medium"
      >
        © 2026 UniCord. All rights reserved.
      </motion.div>
    </div>
  )
}
