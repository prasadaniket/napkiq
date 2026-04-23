'use client'

import { useState } from 'react'
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
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      const res = await api.post<LoginResponse>('/auth/login', data)
      saveSession(res.data)
      toast.success(`Welcome back, ${res.data.fullName}!`)
      // All roles land on /dashboard — the layout + sidebar + backend scoping
      // ensure each role only sees what they're allowed to see
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Invalid User ID or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
              <path d="M16 3L28 10V22L16 29L4 22V10L16 3Z" fill="#F26522" fillOpacity="0.15" stroke="#F26522" strokeWidth="1.5"/>
              <path d="M16 8L24 13V19L16 24L8 19V13L16 8Z" fill="#F26522"/>
            </svg>
          </div>
          <h1 className="login-brand">StoneOven</h1>
          <p className="login-subtitle">CMS Portal</p>
        </div>

        {/* Card */}
        <div className="login-card">
          <h2 className="login-heading">Sign in to continue</h2>
          <p className="login-desc">Use your assigned User ID and password</p>

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">

            {/* User ID */}
            <div className="login-field">
              <label className="login-label">
                <span className="login-label-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                User ID
              </label>
              <div className="login-input-wrap">
                <input
                  {...register('username')}
                  className={`login-input ${errors.username ? 'login-input-error' : ''}`}
                  placeholder="e.g. unicord26"
                  autoComplete="username"
                  autoFocus
                />
              </div>
              {errors.username && <p className="login-error">{errors.username.message}</p>}
            </div>

            {/* Password */}
            <div className="login-field">
              <label className="login-label">
                <span className="login-label-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                Password
              </label>
              <div className="login-input-wrap">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  className={`login-input login-input-pass ${errors.password ? 'login-input-error' : ''}`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-eye"
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="login-error">{errors.password.message}</p>}
            </div>

            <button
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
        </div>

        <p className="login-footer">StoneOven CMS · Powered by UniCord</p>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          background-image: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(242,101,34,0.12), transparent);
          padding: 24px;
          font-family: 'Inter', sans-serif;
        }
        .login-container {
          width: 100%;
          max-width: 400px;
        }
        .login-logo {
          text-align: center;
          margin-bottom: 32px;
        }
        .login-logo-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          background: rgba(242,101,34,0.1);
          border: 1px solid rgba(242,101,34,0.25);
          border-radius: 14px;
          margin-bottom: 12px;
        }
        .login-brand {
          font-size: 1.75rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.5px;
          margin: 0 0 4px;
        }
        .login-subtitle {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }
        .login-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.4);
        }
        .login-heading {
          font-size: 1.125rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 6px;
        }
        .login-desc {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.4);
          margin: 0 0 28px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .login-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .login-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
        }
        .login-label-icon {
          display: flex;
          align-items: center;
          color: rgba(242,101,34,0.8);
        }
        .login-input-wrap {
          position: relative;
        }
        .login-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 0.9375rem;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
          font-family: inherit;
        }
        .login-input::placeholder {
          color: rgba(255,255,255,0.2);
        }
        .login-input:focus {
          border-color: rgba(242,101,34,0.6);
          background: rgba(242,101,34,0.04);
        }
        .login-input-pass {
          padding-right: 44px;
        }
        .login-input-error {
          border-color: rgba(239,68,68,0.5) !important;
        }
        .login-eye {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        .login-eye:hover { color: rgba(255,255,255,0.7); }
        .login-error {
          font-size: 0.75rem;
          color: #f87171;
          margin: 0;
        }
        .login-btn {
          width: 100%;
          padding: 13px;
          background: #F26522;
          border: none;
          border-radius: 10px;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.1s, opacity 0.2s;
          font-family: inherit;
          margin-top: 4px;
        }
        .login-btn:hover:not(:disabled) { background: #e05515; }
        .login-btn:active:not(:disabled) { transform: scale(0.99); }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .login-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .login-footer {
          text-align: center;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.2);
          margin: 24px 0 0;
        }
      `}</style>
    </div>
  )
}
