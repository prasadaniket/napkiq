'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import type { OutletStats } from '@/types/api'

// ─── Star Rating Bar ───────────────────────────────────────────────────────────
function StarBar({ rating, total }: { rating: number | null; total: number }) {
  const pct = rating ? ((rating / 5) * 100).toFixed(0) : '0'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#f59e0b', borderRadius: 99, transition: 'width 0.6s ease' }} />
      </div>
      <span style={{ fontSize: 11, color: 'var(--color-text-3)', minWidth: 28 }}>{pct}%</span>
    </div>
  )
}

export default function OutletsPage() {
  const { isOwnerOrAbove } = useAuth()
  const [stats, setStats] = useState<OutletStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isOwnerOrAbove) { setLoading(false); return }
    api.get<OutletStats[]>('/cms/outlets/stats')
      .then(res => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [isOwnerOrAbove])

  if (!isOwnerOrAbove) {
    return (
      <div>
        <div className="page-header"><h1 className="page-title">Outlets</h1></div>
        <div className="page-content">
          <div className="empty-state">
            <div className="empty-state-icon">🔒</div>
            <div className="empty-state-title">Access Restricted</div>
            <div className="empty-state-desc">Only Admin and Owners can view all outlet performance.</div>
          </div>
        </div>
      </div>
    )
  }

  // Summary totals across all outlets
  const totals = stats.reduce((acc, o) => ({
    customers: acc.customers + o.totalCustomers,
    visits:    acc.visits    + o.visitsThisMonth,
    reviews:   acc.reviews   + o.totalReviews,
    inactive:  acc.inactive  + o.inactiveCustomers,
  }), { customers: 0, visits: 0, reviews: 0, inactive: 0 })

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Outlet Performance</h1>
        <p className="page-subtitle">Real-time statistics across all 4 branches</p>
      </div>

      <div className="page-content">

        {/* Summary Bar */}
        {!loading && stats.length > 0 && (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
            marginBottom: 28, background: 'var(--color-surface)',
            border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '16px 20px',
          }}>
            {[
              { label: 'Total Customers', value: totals.customers, color: 'var(--color-primary)' },
              { label: 'Visits This Month', value: totals.visits, color: 'var(--color-info)' },
              { label: 'Total Reviews', value: totals.reviews, color: '#f59e0b' },
              { label: 'At-Risk (30d+)', value: totals.inactive, color: totals.inactive > 20 ? 'var(--color-danger)' : 'var(--color-text-1)' },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: item.color }}>{item.value}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ height: 300, background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', opacity: 0.5, animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
            <style>{`@keyframes pulse { 0%,100% { opacity:0.5 } 50% { opacity:1 } }`}</style>
          </div>
        )}

        {!loading && stats.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🏪</div>
            <div className="empty-state-title">No outlets found</div>
            <div className="empty-state-desc">Outlet data could not be loaded.</div>
          </div>
        )}

        {/* Outlet Cards */}
        {!loading && stats.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
            {stats.map(os => (
              <div key={os.outletId} className="card" style={{ display: 'flex', flexDirection: 'column' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                  <div>
                    <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-text-1)', marginBottom: 5 }}>
                      {os.outletName}
                    </h2>
                    <span style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-2)' }}>
                      {os.outletCode}
                    </span>
                  </div>
                  {os.googleMapsUrl && (
                    <a href={os.googleMapsUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', fontSize: 12, fontWeight: 500 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Maps
                    </a>
                  )}
                </div>

                {/* Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 16px', marginBottom: 18 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>Customers</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-1)' }}>{os.totalCustomers}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-success)', marginTop: 2 }}>+{os.newCustomersThisMonth} this month</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>Avg Rating</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b' }}>
                      {os.averageRating?.toFixed(1) ?? '—'} <span style={{ fontSize: 14 }}>★</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-3)', marginTop: 2 }}>{os.totalReviews} reviews</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>Visits / Month</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-1)' }}>{os.visitsThisMonth}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-3)', marginTop: 2 }}>{os.totalVisits} total</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>At Risk</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: os.inactiveCustomers > 10 ? 'var(--color-danger)' : 'var(--color-text-1)' }}>
                      {os.inactiveCustomers}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-3)', marginTop: 2 }}>30d+ no visit</div>
                  </div>
                </div>

                {/* Rating progress bar */}
                <div style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: 'var(--color-text-3)' }}>Rating progress</span>
                    <span style={{ fontSize: 11, color: 'var(--color-text-3)' }}>out of 5.0</span>
                  </div>
                  <StarBar rating={os.averageRating} total={os.totalReviews} />
                </div>

                {/* Upcoming this month */}
                {(os.birthdaysThisMonth > 0 || os.anniversariesThisMonth > 0) && (
                  <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                    {os.birthdaysThisMonth > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--color-text-2)', background: 'rgba(245,158,11,0.1)', padding: '4px 10px', borderRadius: 99 }}>
                        🎂 {os.birthdaysThisMonth} birthday{os.birthdaysThisMonth > 1 ? 's' : ''} this month
                      </div>
                    )}
                    {os.anniversariesThisMonth > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--color-text-2)', background: 'rgba(59,130,246,0.1)', padding: '4px 10px', borderRadius: 99 }}>
                        💍 {os.anniversariesThisMonth} anniversary{os.anniversariesThisMonth > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Bar */}
                <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--color-border)', display: 'flex', gap: 10 }}>
                  <Link href={`/outlets/${os.outletId}`} style={{ flex: 1, textDecoration: 'none' }}>
                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 12 }}>
                      Full Dashboard →
                    </button>
                  </Link>
                  <Link href={`/customers?outletId=${os.outletId}`} style={{ textDecoration: 'none' }}>
                    <button className="btn-ghost" style={{ fontSize: 12 }}>Customers</button>
                  </Link>
                  <Link href={`/reviews?outletId=${os.outletId}`} style={{ textDecoration: 'none' }}>
                    <button className="btn-ghost" style={{ fontSize: 12 }}>Reviews</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
