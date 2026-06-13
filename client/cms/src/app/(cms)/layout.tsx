'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import CMSSidebar from '@/components/layout/CMSSidebar'

// ─── Auth guard (inner — has access to useAuth) ───────────────────────────────

function CmsShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg)',
      }}>
        <div style={{
          width: 24, height: 24,
          border: '2px solid rgba(0, 2, 29, 0.08)',
          borderTop: '2px solid var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="cms-shell">
      <CMSSidebar />
      <main className="cms-main">
        {children}
      </main>
    </div>
  )
}

// ─── Layout wrapper (provides AuthContext) ────────────────────────────────────

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CmsShell>{children}</CmsShell>
    </AuthProvider>
  )
}
