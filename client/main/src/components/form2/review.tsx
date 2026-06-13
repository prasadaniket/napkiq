'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { copyToClipboard } from '@/lib/clipboard'
import { ongoingReviewSchema, type OngoingReviewData } from '@/lib/validators'
import Modal from '@/components/ui/Modal'
import type { Customer } from '@/types/customer'
import type { Outlet } from '@/types/outlet'

interface Props {
  customer?: Customer | null
  outlet: Outlet
  onSuccess?: () => void
}

export default function ReviewForm({ customer, outlet, onSuccess }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [showGooglePopup, setShowGooglePopup] = useState(false)
  const [stars, setStars] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<OngoingReviewData>({
    resolver: zodResolver(ongoingReviewSchema),
  })

  const onSubmit = async (data: OngoingReviewData) => {
    setSubmitting(true)
    try {
      await api.post('/reviews', {
        customerId: customer?.id || null,
        outletId: outlet.id,
        stars: data.stars,
        reviewText: data.reviewText || '',
        reviewType: 'repeat',
      })

      if (data.reviewText) {
        await copyToClipboard(data.reviewText)
        toast.success('Review copied to clipboard!')
      }

      setShowGooglePopup(true)
    } catch {
      toast.error('Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogleReview = () => {
    const reviewUrl = outlet.googleMapsUrl
    if (reviewUrl) {
      window.open(reviewUrl, '_blank', 'noopener,noreferrer')
    }
    setShowGooglePopup(false)
    onSuccess?.()
  }

  return (
    <>
      {/* Frosted glass card */}
      <div
        className="rounded-[28px] shadow-[0_20px_48px_rgba(0,2,29,0.15)] p-6 md:p-8 relative overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)' }}
      >
        {/* Subtle inner highlight */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#D64238]/[0.03] to-transparent pointer-events-none rounded-t-[28px]" />

        {customer && customer.fullName ? (
          <div className="relative z-10 text-center mb-8">
            <h2 className="text-[20px] font-serif font-bold text-[#00021D] mb-1 tracking-wide">
              Welcome back, {customer.fullName?.split(' ')[0]}!
            </h2>
            <p className="text-[13px] text-[#00021D]/50 font-medium">
              Visit #{customer.totalVisits || 1} · {outlet.name}
            </p>
          </div>
        ) : (
          <div className="relative z-10 text-center mb-8">
            <h2 className="text-[20px] font-serif font-bold text-[#00021D] mb-1 tracking-wide">
              Share Your Experience
            </h2>
            <p className="text-[13px] text-[#00021D]/50 font-medium">
              Leave a review for {outlet.name}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6">

          {/* STAR RATING */}
          <div className="flex flex-col items-center">
            <p className="text-[14px] font-medium text-[#00021D]/80 mb-3">
              How was your visit today? <span className="text-[#D64238]">*</span>
            </p>
            <div className="flex gap-2 justify-center" id="review-star-rating" role="group" aria-label="Star rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setStars(star); setValue('stars', star) }}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="relative p-1 focus:outline-none"
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  <svg
                    className={`w-9 h-9 transition-colors duration-200 ${
                      (hoveredStar || stars) >= star ? 'drop-shadow-[0_0_6px_rgba(0,2,29,0.3)]' : ''
                    }`}
                    fill={(hoveredStar || stars) >= star ? '#00021D' : 'rgba(0,2,29,0.15)'}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </motion.button>
              ))}
            </div>
            {errors.stars && <p className="mt-2 text-[12px] text-red-500">{errors.stars.message}</p>}
          </div>

          {/* REVIEW TEXT */}
          <div className="pt-2">
            <label htmlFor="review-text" className="block text-[13px] font-semibold text-[#00021D]/70 mb-2 ml-1">
              Share Your Experience <span className="text-[#00021D]/30">(Optional)</span>
            </label>
            <textarea
              id="review-text"
              {...register('reviewText')}
              rows={4}
              className="w-full bg-white/80 border border-[#00021D]/10 rounded-[16px] p-4 text-[14px] text-[#00021D] placeholder-[#00021D]/30 focus:outline-none focus:bg-white focus:border-[#00021D]/40 focus:ring-2 focus:ring-[#00021D]/8 transition-all duration-300 resize-none shadow-sm"
              placeholder="Share your experience today..."
            />
            {errors.reviewText && <p className="mt-1 ml-1 text-[12px] text-red-500">{errors.reviewText.message}</p>}
          </div>

          {/* SUBMIT */}
          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            id="review-submit-btn"
            className="w-full font-bold text-[16px] py-4 rounded-[16px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: '#00021D',
              color: '#ffffff',
              boxShadow: '0 6px 20px rgba(0,2,29,0.25)',
            }}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </motion.button>
        </form>
      </div>

      {/* Google popup modal */}
      <Modal isOpen={showGooglePopup} onClose={() => { setShowGooglePopup(false); onSuccess?.() }}>
        <div className="text-center p-2">
          {stars >= 4 ? (
            <>
              <h3 className="text-2xl font-serif font-bold text-[#00021D] mb-2">Thank you! 🎉</h3>
              <p className="text-[#00021D]/70 text-[14px] mb-6 leading-relaxed">
                Your feedback means a lot to us! Help others discover <strong className="text-[#D64238]">Napkiq</strong> by posting on Google Reviews.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGoogleReview}
                className="w-full font-bold py-3.5 rounded-[16px] mb-4 text-white"
                style={{ background: '#00021D', boxShadow: '0 6px 16px rgba(0,2,29,0.2)' }}
              >
                Open Google Reviews
              </motion.button>
              <button
                onClick={() => { setShowGooglePopup(false); onSuccess?.() }}
                className="text-[13px] font-medium text-[#00021D]/50 hover:text-[#00021D] transition-colors underline underline-offset-4"
              >
                Skip for now
              </button>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-serif font-bold text-[#00021D] mb-2">Thank you! 🙏</h3>
              <p className="text-[#00021D]/70 text-[14px] mb-6 leading-relaxed">
                Thank you for your valuable feedback. We are sorry your experience wasn't perfect, and we are committed to making it right. Our branch management team has been notified to review your comments immediately.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setShowGooglePopup(false); onSuccess?.() }}
                className="w-full font-bold py-3.5 rounded-[16px] mb-2 text-white"
                style={{ background: '#00021D', boxShadow: '0 6px 16px rgba(0,2,29,0.2)' }}
              >
                Back to Menu
              </motion.button>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}
