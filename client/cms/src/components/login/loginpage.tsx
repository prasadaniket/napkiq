'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { api } from '@/lib/api'
import { saveSession } from '@/lib/auth'
import { loginSchema, type LoginFormData } from '@/lib/validators'
import type { LoginResponse } from '@/types/api'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [greeting, setGreeting] = useState('Welcome back')
  const router = useRouter()

  useEffect(() => {
    const hrs = new Date().getHours()
    if (hrs < 12) setGreeting('Good morning')
    else if (hrs < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      const res = await api.post<LoginResponse>('/auth/login', data)
      saveSession(res.data)
      toast.success(`Welcome back, ${res.data.fullName}!`)
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Invalid User ID or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Dynamic Background Blobs */}
      <div className="bg-blobs">
        <div className="bg-blob bg-blob-1"></div>
        <div className="bg-blob bg-blob-2"></div>
        <div className="bg-blob bg-blob-3"></div>
      </div>

      <div className="login-card">
        {/* Logo and CMS Label */}
        <div className="login-logo">
          <div className="login-logo-ring">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/logo-circle.png"
              alt="Napkiq"
              style={{ width: 84, height: 84, objectFit: 'contain', borderRadius: '50%' }}
            />
          </div>
          <p className="login-subtitle">CMS Portal</p>
        </div>

        {/* Dynamic Greeting Header */}
        <div className="login-header-group">
          <h2 className="login-heading">{greeting}</h2>
          <p className="login-desc">Sign in to access your Napkiq CMS dashboard.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          {/* User ID Field */}
          <div className="login-field">
            <label htmlFor="cms-username" className="login-label">
              User ID
            </label>
            <div className="login-input-wrap">
              <input
                id="cms-username"
                {...register('username')}
                className={`login-input ${errors.username ? 'login-input-error' : ''}`}
                placeholder="e.g. unicord26"
                autoComplete="username"
                autoFocus
              />
              <span className="login-input-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
            </div>
            {errors.username && <p className="login-error">{errors.username.message}</p>}
          </div>

          {/* Password Field */}
          <div className="login-field">
            <label htmlFor="cms-password" className="login-label">
              Password
            </label>
            <div className="login-input-wrap">
              <input
                id="cms-password"
                {...register('password')}
                type={showPass ? 'text' : 'password'}
                className={`login-input login-input-pass ${errors.password ? 'login-input-error' : ''}`}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <span className="login-input-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="login-error">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            id="cms-login-btn"
            type="submit"
            disabled={loading}
            className="login-btn"
          >
            {loading ? (
              <>
                <span className="login-spinner" />
                Signing in…
              </>
            ) : 'Sign In'}
          </button>
        </form>

        {/* Footer info inside the card */}
        <div className="login-footer">
          <span>Napkiq CMS</span>
          <span className="login-footer-dot"></span>
          <span>Powered by UniCord</span>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fcfbfa; /* Luxury light warm cream base */
          position: relative;
          overflow: hidden;
          padding: 24px;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }

        /* ─── Background Blobs ─── */
        .bg-blobs {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.55;
          mix-blend-mode: multiply;
          animation: orb-drift 22s infinite alternate ease-in-out;
        }
        .bg-blob-1 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(214,66,56,0.14) 0%, rgba(214,66,56,0) 70%);
          top: -10%;
          left: -5%;
        }
        .bg-blob-2 {
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(245,147,0,0.09) 0%, rgba(245,147,0,0) 70%);
          bottom: -15%;
          right: -5%;
          animation-delay: -5s;
        }
        .bg-blob-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(214,66,56,0.06) 0%, rgba(214,66,56,0) 70%);
          top: 35%;
          right: 15%;
          animation-delay: -10s;
        }
        @keyframes orb-drift {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -60px) scale(1.08); }
          100% { transform: translate(-20px, 30px) scale(0.95); }
        }

        /* ─── Login Card ─── */
        .login-card {
          position: relative;
          z-index: 10;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(28, 25, 23, 0.05);
          border-radius: 32px;
          padding: 40px 36px 36px;
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.005),
            0 24px 50px -8px rgba(28, 25, 23, 0.04),
            0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
          width: 100%;
          max-width: 410px;
          box-sizing: border-box;
          transform: translateY(0);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
          animation: card-appear 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes card-appear {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .login-card:hover {
          transform: translateY(-3px);
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.01),
            0 36px 72px -12px rgba(28, 25, 23, 0.07),
            0 1px 0 0 rgba(255, 255, 255, 0.9) inset;
        }
        .login-card:focus-within {
          border-color: rgba(214, 66, 56, 0.12);
        }

        /* ─── Logo Wrapper ─── */
        .login-logo {
          text-align: center;
          margin-bottom: 24px;
        }
        .login-logo-ring {
          display: inline-flex;
          padding: 6px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 
            0 4px 16px rgba(0, 2, 29, 0.03),
            0 12px 32px rgba(28, 25, 23, 0.04);
          border: 1px solid rgba(28, 25, 23, 0.03);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .login-logo-ring:hover {
          transform: scale(1.08) rotate(-4deg);
        }
        .login-subtitle {
          font-size: 0.72rem;
          color: rgba(28, 25, 23, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-weight: 700;
          margin: 10px 0 0;
        }

        /* ─── Header Group ─── */
        .login-header-group {
          text-align: center;
          margin-bottom: 30px;
        }
        .login-heading {
          font-size: 1.45rem;
          font-weight: 700;
          color: #1c1917;
          margin: 0;
          font-family: var(--font-serif), Georgia, serif;
          letter-spacing: -0.015em;
        }
        .login-desc {
          font-size: 0.84rem;
          color: rgba(28, 25, 23, 0.45);
          margin: 8px 0 0;
          line-height: 1.5;
        }

        /* ─── Form Elements ─── */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .login-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .login-label {
          font-size: 0.81rem;
          font-weight: 600;
          color: rgba(28, 25, 23, 0.65);
          margin-left: 2px;
          transition: color 0.2s;
        }
        .login-field:focus-within .login-label {
          color: #D64238;
        }
        .login-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .login-input {
          width: 100%;
          background: rgba(28, 25, 23, 0.02);
          border: 1px solid rgba(28, 25, 23, 0.07);
          border-radius: 12px;
          padding: 12px 14px 12px 42px;
          font-size: 0.9375rem;
          color: #1c1917;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
          font-family: inherit;
        }
        .login-input::placeholder {
          color: rgba(28, 25, 23, 0.25);
        }
        .login-input:hover {
          background: rgba(28, 25, 23, 0.04);
          border-color: rgba(28, 25, 23, 0.12);
        }
        .login-input:focus {
          border-color: #D64238;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(214, 66, 56, 0.08);
        }
        .login-input-pass {
          padding-right: 44px;
        }
        
        /* ─── Input Micro-interactions ─── */
        .login-input-icon {
          position: absolute;
          left: 14px;
          color: rgba(28, 25, 23, 0.35);
          display: flex;
          align-items: center;
          pointer-events: none;
          transition: color 0.2s, transform 0.2s;
        }
        .login-input:focus ~ .login-input-icon {
          color: #D64238;
          transform: scale(1.05);
        }
        .login-eye {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: rgba(28, 25, 23, 0.35);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s, transform 0.2s;
        }
        .login-eye:hover {
          color: rgba(28, 25, 23, 0.6);
          transform: scale(1.1);
        }
        .login-eye:active {
          transform: scale(0.92);
        }

        /* ─── Error Handling ─── */
        .login-input-error {
          border-color: rgba(220, 38, 38, 0.25) !important;
          background: rgba(220, 38, 38, 0.01) !important;
          animation: shake 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        .login-input-error:focus {
          box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.08) !important;
        }
        .login-error {
          font-size: 0.75rem;
          color: #dc2626;
          margin: 2px 0 0 2px;
          font-weight: 500;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
          40%, 60% { transform: translate3d(3px, 0, 0); }
        }

        /* ─── Sign In Button ─── */
        .login-btn {
          width: 100%;
          padding: 13.5px;
          background: #00021D; /* Warm rich navy black */
          border: none;
          border-radius: 12px;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.25s, transform 0.15s, box-shadow 0.25s;
          font-family: inherit;
          margin-top: 8px;
          box-shadow: 0 4px 12px rgba(0, 2, 29, 0.06);
          position: relative;
          overflow: hidden;
        }
        .login-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
          transition: none;
        }
        .login-btn:hover:not(:disabled)::after {
          left: 100%;
          transition: left 0.8s ease-in-out;
        }
        .login-btn:hover:not(:disabled) {
          background: #0a0f3d;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0, 2, 29, 0.12);
        }
        .login-btn:active:not(:disabled) {
          transform: translateY(1px);
        }
        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .login-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ─── Footer ─── */
        .login-footer {
          margin-top: 36px;
          text-align: center;
          font-size: 0.72rem;
          color: rgba(28, 25, 23, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          letter-spacing: 0.02em;
          font-weight: 500;
        }
        .login-footer-dot {
          width: 3px;
          height: 3px;
          background: rgba(28, 25, 23, 0.25);
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
}
