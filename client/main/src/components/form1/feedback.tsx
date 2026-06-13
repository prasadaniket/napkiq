'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { copyToClipboard } from '@/lib/clipboard'
import { firstVisitFormSchema, type FirstVisitFormData } from '@/lib/validators'
import Modal from '@/components/ui/Modal'
import type { Outlet } from '@/types/outlet'

interface Props {
  outlet: Outlet
  deviceId: string
  onSuccess: () => void
}

export default function FeedbackForm({ outlet, deviceId, onSuccess }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [showGooglePopup, setShowGooglePopup] = useState(false)
  const [stars, setStars] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FirstVisitFormData>({
    resolver: zodResolver(firstVisitFormSchema),
    defaultValues: { maritalStatus: '' as any, gender: '' as any },
  })

  const maritalStatus = watch('maritalStatus')

  const onSubmit = async (data: FirstVisitFormData) => {
    setSubmitting(true)
    try {
      const customerRes = await api.post('/customers', {
        deviceId,
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        birthDate: data.birthDate,
        anniversaryDate: data.anniversaryDate || null,
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        firstVisitOutletId: outlet.id,
      })

      await api.post('/reviews', {
        customerId: customerRes.data.id,
        outletId: outlet.id,
        stars: data.stars,
        reviewText: data.reviewText || '',
        reviewType: 'first_visit',
      })

      if (data.reviewText) {
        await copyToClipboard(data.reviewText)
        toast.success('Review copied to clipboard!')
      }

      setShowGooglePopup(true)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.')
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
    onSuccess()
  }

  /* Frosted glass input — deep navy text on white/80 bg */
  const inputStyles = "w-full bg-white/80 border border-[#00021D]/10 rounded-[12px] px-4 py-3 text-[14px] text-[#00021D] placeholder-[#00021D]/30 focus:outline-none focus:bg-white focus:border-[#00021D]/40 focus:ring-2 focus:ring-[#00021D]/8 transition-all duration-300 shadow-sm"
  const labelStyles = "block text-[13px] font-semibold text-[#00021D]/70 mb-1.5 ml-1"
  const errorStyles = "mt-1 ml-1 text-[12px] text-red-500"

  return (
    <>
      {/* Frosted glass card */}
      <div
        className="rounded-[28px] shadow-[0_20px_48px_rgba(0,2,29,0.15)] p-6 relative overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)' }}
      >
        {/* Subtle inner highlight */}
        <div className="absolute top-0 left-0 w-full h-[180px] bg-gradient-to-b from-[#D64238]/[0.04] to-transparent pointer-events-none rounded-t-[28px]" />

        <div className="relative z-10 text-center mb-8">
          <h2 className="text-[20px] font-serif font-bold text-[#00021D] mb-1 tracking-wide">
            Share Your Experience
          </h2>
          <p className="text-[13px] text-[#00021D]/50 font-medium tracking-wide">
            First visit? Tell us about yourself!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-5">

          <div>
            <label htmlFor="feedback-fullname" className={labelStyles}>Full Name <span className="text-[#D64238]">*</span></label>
            <input id="feedback-fullname" {...register('fullName')} className={inputStyles} placeholder="Your full name" />
            {errors.fullName && <p className={errorStyles}>{errors.fullName.message}</p>}
          </div>

          <div>
            <label htmlFor="feedback-phone" className={labelStyles}>Phone Number <span className="text-[#D64238]">*</span></label>
            <input
              id="feedback-phone"
              type="tel"
              {...register('phone')}
              className={inputStyles}
              placeholder="10-digit mobile number"
              maxLength={10}
              onInput={(e) => {
                const input = e.currentTarget
                input.value = input.value.replace(/\D/g, '').slice(0, 10)
              }}
            />
            {errors.phone && <p className={errorStyles}>{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="feedback-email" className={labelStyles}>Email <span className="text-[#D64238]">*</span></label>
            <input id="feedback-email" type="email" {...register('email')} className={inputStyles} placeholder="your@email.com" />
            {errors.email && <p className={errorStyles}>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="feedback-birthdate" className={labelStyles}>Date of Birth <span className="text-[#D64238]">*</span></label>
            <input id="feedback-birthdate" type="date" {...register('birthDate')} className={inputStyles} style={{ colorScheme: 'light' }} />
            {errors.birthDate && <p className={errorStyles}>{errors.birthDate.message}</p>}
          </div>

          <div>
            <label htmlFor="feedback-marital-status" className={labelStyles}>Marital Status <span className="text-[#D64238]">*</span></label>
            <select id="feedback-marital-status" {...register('maritalStatus')} className={`${inputStyles} appearance-none`}>
              <option value="" disabled>Select</option>
              <option value="Married" className="bg-white text-[#00021D]">Married</option>
              <option value="Unmarried" className="bg-white text-[#00021D]">Unmarried</option>
            </select>
            {errors.maritalStatus && <p className={errorStyles}>{errors.maritalStatus.message}</p>}
          </div>

          {maritalStatus === 'Married' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <label htmlFor="feedback-anniversary" className={labelStyles}>Anniversary Date <span className="text-[#D64238]">*</span></label>
              <input id="feedback-anniversary" type="date" {...register('anniversaryDate')} className={inputStyles} style={{ colorScheme: 'light' }} />
              {errors.anniversaryDate && <p className={errorStyles}>{errors.anniversaryDate.message}</p>}
            </motion.div>
          )}

          <div>
            <label htmlFor="feedback-gender" className={labelStyles}>Gender <span className="text-[#D64238]">*</span></label>
            <select id="feedback-gender" {...register('gender')} className={`${inputStyles} appearance-none`}>
              <option value="" disabled>Select</option>
              <option value="Male" className="bg-white text-[#00021D]">Male</option>
              <option value="Female" className="bg-white text-[#00021D]">Female</option>
              <option value="RatherNotSay" className="bg-white text-[#00021D]">Others</option>
            </select>
            {errors.gender && <p className={errorStyles}>{errors.gender.message}</p>}
          </div>

          {/* STAR RATING */}
          <div className="flex flex-col items-center pt-4">
            <p className="text-[14px] font-medium text-[#00021D]/80 mb-3">
              Rate Your Experience <span className="text-[#D64238]">*</span>
            </p>
            <div className="flex gap-2 justify-center" id="feedback-star-rating" role="group" aria-label="Star rating">
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
                      (hoveredStar || stars) >= star
                        ? 'drop-shadow-[0_0_6px_rgba(0,2,29,0.3)]'
                        : ''
                    }`}
                    fill={(hoveredStar || stars) >= star ? '#00021D' : 'rgba(0,2,29,0.15)'}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </motion.button>
              ))}
            </div>
            {errors.stars && <p className={errorStyles}>{errors.stars.message}</p>}
          </div>

          {/* REVIEW TEXT */}
          <div className="pt-2">
            <label htmlFor="feedback-review-text" className={labelStyles}>
              Share Your Experience <span className="text-[#00021D]/30">(Optional)</span>
            </label>
            <textarea
              id="feedback-review-text"
              {...register('reviewText')}
              rows={4}
              className={`${inputStyles} resize-none`}
              placeholder="Share your dining experience..."
            />
            {errors.reviewText && <p className={errorStyles}>{errors.reviewText.message}</p>}
          </div>

          {/* SUBMIT */}
          <div className="pt-4">
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              id="feedback-submit-btn"
              className="w-full font-bold text-[16px] py-4 rounded-[16px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: '#00021D',
                color: '#ffffff',
                boxShadow: '0 6px 20px rgba(0,2,29,0.25)',
              }}
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </motion.button>
          </div>
        </form>
      </div>

      {/* Google popup modal */}
      <Modal isOpen={showGooglePopup} onClose={() => { setShowGooglePopup(false); onSuccess() }}>
        <div className="text-center p-2">
          {stars >= 4 ? (
            <>
              <h3 className="text-2xl font-serif font-bold text-[#00021D] mb-2">Thank you! 🎉</h3>
              <p className="text-[#00021D]/70 text-[14px] mb-6 leading-relaxed">
                We are so happy you loved your experience! 🌟 Your review has been copied to your clipboard. Help us grow by posting it on Google!
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
                onClick={() => { setShowGooglePopup(false); onSuccess() }}
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
                onClick={() => { setShowGooglePopup(false); onSuccess() }}
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
