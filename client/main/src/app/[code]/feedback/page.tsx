'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useDeviceFingerprint } from '@/hooks/useDeviceFingerprint'
import { useCustomer } from '@/hooks/useCustomer'
import { useOutlet } from '@/hooks/useOutlet'
import FeedbackForm from '@/components/form1/feedback'
import Loader from '@/components/ui/Loader'

const gradientStyle = { background: 'linear-gradient(135deg, #E85D52 0%, #D64238 50%, #A62B22 100%)' }

export default function FeedbackPage() {
  const params = useParams()
  const router = useRouter()
  const code = params.code as string

  const { deviceId, loading: fpLoading } = useDeviceFingerprint()
  const { outlet, loading: outletLoading } = useOutlet(code)
  const { customer, loading: customerLoading } = useCustomer(deviceId)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (outlet) {
      document.title = `Feedback — ${outlet.name} | Napkiq`
    }
  }, [outlet])

  const loading = fpLoading || outletLoading || customerLoading

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={gradientStyle}>
      <Loader />
    </div>
  )

  if (!outlet || !deviceId) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={gradientStyle}>
        <p className="text-white/70 text-lg">Unable to load form data</p>
      </div>
    )
  }

  const handleSuccess = () => {
    setSuccess(true)
    setTimeout(() => {
      router.push(`/${code}`)
    }, 2000)
  }

  return (
    <div
      id="feedback-page"
      className="relative min-h-screen flex flex-col items-center pt-8 px-4 overflow-x-hidden"
      style={gradientStyle}
    >
      {/* Ambient glow */}
      <motion.div
        className="fixed top-[-5%] left-1/2 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ x: '-50%', background: 'radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.05, 1], x: ['-50%', '-48%', '-52%', '-50%'], y: [0, 15, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <main id="feedback-main" className="relative z-10 w-full max-w-md mx-auto flex flex-col">
        {/* Header / back nav */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <Link href={`/${code}`} id="feedback-back-btn" aria-label="Go back to outlet page">
            <motion.div
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/80 hover:text-white transition-colors p-2 -ml-2 rounded-full cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </motion.div>
          </Link>
          <h1 className="text-2xl font-serif font-extrabold text-white tracking-[0.5px]" style={{ textShadow: '0 2px 8px rgba(0,2,29,0.15)' }}>
            Feedback
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {customer?.hasSubmittedFirstReview ? (
            <div className="rounded-[28px] p-10 text-center" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 16px 40px rgba(0,2,29,0.12)' }}>
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D64238" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-secondary mb-2">Already Submitted</h3>
              <p className="text-secondary/50 text-[13px] font-medium leading-relaxed mb-6">
                You've already filled out your first visit form.<br />Want to share another experience?
              </p>
              <Link href={`/${code}/review`} id="feedback-goto-review-btn">
                <motion.div
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full font-bold text-[15px] py-3.5 rounded-[14px] text-center"
                  style={{ background: '#00021D', color: '#ffffff', boxShadow: '0 6px 16px rgba(0,2,29,0.25)' }}
                >
                  Share Your Experience
                </motion.div>
              </Link>
            </div>
          ) : success ? (
            <div className="rounded-[28px] p-8 text-center" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 16px 40px rgba(0,2,29,0.12)' }}>
              <h3 className="text-2xl font-serif font-bold text-secondary mb-2">Thank You!</h3>
              <p className="text-secondary/60 mb-6 font-medium">Your feedback has been successfully submitted.</p>
              <Loader />
            </div>
          ) : (
            <FeedbackForm outlet={outlet} deviceId={deviceId} onSuccess={handleSuccess} />
          )}
        </motion.div>
      </main>

      {/* Social footer */}
      {(outlet.instagramUrl || outlet.facebookUrl) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-auto relative z-10 w-full flex flex-col items-center gap-4 pb-8 pt-8"
        >
          <p className="text-[11px] text-white/40 tracking-[0.2em] font-medium uppercase">Connect With Us</p>
          <div className="flex items-center gap-5">
            {outlet.instagramUrl && (
              <a href={outlet.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/40 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            )}
            {outlet.facebookUrl && (
              <a href={outlet.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/40 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            )}
          </div>
          <p className="text-[10px] text-white/25 tracking-wide font-medium">© 2026 UniCord. All rights reserved.</p>
        </motion.div>
      )}

      {!outlet.instagramUrl && !outlet.facebookUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-auto relative z-10 w-full text-center pb-8 pt-8 text-[11px] text-white/25 tracking-wide font-medium"
        >
          © 2026 UniCord. All rights reserved.
        </motion.div>
      )}
    </div>
  )
}
