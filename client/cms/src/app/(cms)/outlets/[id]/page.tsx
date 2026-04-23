'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'
import ReviewCard from '@/components/cms/ReviewCard'
import type { OutletDetail } from '@/types/api'

// ─── Star Distribution Chart ────────────────────────────────────────────────────
function StarDistribution({ distribution, total }: { distribution: { stars: number; count: number }[]; total: number }) {
  const byStars = Object.fromEntries(distribution.map(d => [d.stars, d.count]))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[5, 4, 3, 2, 1].map(s => {
        const count = byStars[s] ?? 0
        const pct = total > 0 ? (count / total) * 100 : 0
        return (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--color-text-2)', width: 14, textAlign: 'right' }}>{s}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: '#f59e0b', borderRadius: 99, transition: 'width 0.6s ease' }} />
            </div>
            <span style={{ fontSize: 11, color: 'var(--color-text-3)', width: 28, textAlign: 'right' }}>{count}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Stat Tile ──────────────────────────────────────────────────────────────────
function Tile({ label, value, sub, accent }: { label: string; value: string | number | null; sub?: string; accent?: string }) {
  return (
    <div style={{ padding: '16px 20px', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
      <div style={{ fontSize: 11, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: accent ?? 'var(--color-text-1)', lineHeight: 1 }}>{value ?? '—'}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--color-text-3)', marginTop: 5 }}>{sub}</div>}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function OutletDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { isOwnerOrAbove } = useAuth()
  const [data, setData] = useState<OutletDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.get<OutletDetail>(`/cms/outlets/${id}`)
      .then(res => setData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ padding: 64, textAlign: 'center', color: 'var(--color-text-3)' }}>
      Loading outlet data…
    </div>
  )

  if (error || !data) return (
    <div>
      <div className="page-header">
        <Link href="/outlets" style={{ textDecoration: 'none', color: 'var(--color-text-3)', fontSize: 13, display: 'inline-block', marginBottom: 12 }}>← Back to Outlets</Link>
        <h1 className="page-title">Outlet not found</h1>
      </div>
    </div>
  )

  const { outlet, stats, recentCustomers, recentReviews, recentVisits } = data

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Link href="/outlets" style={{ textDecoration: 'none', color: 'var(--color-text-3)', fontSize: 13, display: 'inline-block', marginBottom: 12 }}>
          ← All Outlets
        </Link>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="page-title">{outlet.name}</h1>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-2)' }}>{outlet.code}</span>
              {outlet.address && <span style={{ fontSize: 12, color: 'var(--color-text-3)' }}>· {outlet.address}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {outlet.googleMapsUrl && (
              <a href={outlet.googleMapsUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <button className="btn-ghost" style={{ gap: 6, fontSize: 13 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Google Maps
                </button>
              </a>
            )}
            <Link href={`/customers?outletId=${outlet.id}`} style={{ textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ fontSize: 13 }}>All Customers</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="page-content">

        {/* Primary Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
          <Tile label="Total Customers"   value={stats.totalCustomers}   sub={`+${stats.newCustomersThisMonth} this month`} accent="var(--color-primary)" />
          <Tile label="Avg Rating"        value={stats.averageRating ? `${stats.averageRating.toFixed(1)} ★` : '—'} sub={`${stats.totalReviews} reviews`} accent="#f59e0b" />
          <Tile label="Visits This Month" value={stats.visitsThisMonth}  sub={`${stats.totalVisits} all time`} />
          <Tile label="At Risk (30d+)"    value={stats.inactiveCustomers} sub="no recent visit" accent={stats.inactiveCustomers > 10 ? 'var(--color-danger)' : undefined} />
          <Tile label="New This Week"     value={stats.newCustomersThisWeek} sub="customers" />
          <Tile label="Reviews This Week" value={stats.reviewsThisWeek} />
          <Tile label="Birthdays"         value={stats.birthdaysThisMonth} sub="this month" accent="#f59e0b" />
          <Tile label="Anniversaries"     value={stats.anniversariesThisMonth} sub="this month" />
        </div>

        {/* Two-column layout: Rating chart + Activity feed */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, marginBottom: 28, alignItems: 'start' }}>

          {/* Rating Distribution */}
          <div className="card">
            <div className="section-title">Rating Distribution</div>
            {stats.totalReviews > 0 ? (
              <>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: '#f59e0b', lineHeight: 1 }}>
                    {stats.averageRating?.toFixed(1) ?? '—'}
                  </span>
                  <span style={{ fontSize: 18, color: '#f59e0b' }}>★</span>
                  <span style={{ fontSize: 13, color: 'var(--color-text-3)' }}>/ 5.0</span>
                </div>
                <StarDistribution distribution={stats.starDistribution} total={stats.totalReviews} />
              </>
            ) : (
              <div style={{ color: 'var(--color-text-3)', fontSize: 13, padding: '16px 0' }}>No reviews yet.</div>
            )}
          </div>

          {/* Recent Visits Feed */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div className="section-title" style={{ margin: 0 }}>Recent Visits</div>
              <Link href={`/visits?outletId=${outlet.id}`} style={{ fontSize: 12, color: 'var(--color-primary)', textDecoration: 'none' }}>View all →</Link>
            </div>
            {recentVisits.length === 0 ? (
              <div style={{ color: 'var(--color-text-3)', fontSize: 13, padding: '12px 0' }}>No visits yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {recentVisits.map(v => (
                  <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      display: 'inline-flex', padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 600,
                      background: v.visitType === 'qr_scan' ? 'rgba(59,130,246,0.12)' : 'rgba(34,197,94,0.12)',
                      color: v.visitType === 'qr_scan' ? 'var(--color-info)' : 'var(--color-success)',
                      flexShrink: 0,
                    }}>
                      {v.visitType === 'qr_scan' ? 'QR' : 'Pay'}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {v.customer?.fullName ?? 'Unknown'}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{v.customer?.phone}</div>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-3)', flexShrink: 0 }}>
                      {format(new Date(v.visitedAt), 'dd MMM, HH:mm')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Customers */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div className="section-title" style={{ margin: 0 }}>Recent Customers</div>
            <Link href={`/customers?outletId=${outlet.id}`} style={{ fontSize: 12, color: 'var(--color-primary)', textDecoration: 'none' }}>View all →</Link>
          </div>
          {recentCustomers.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', color: 'var(--color-text-3)', padding: 32 }}>No customers yet.</div>
          ) : (
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Visits</th>
                    <th>Last Visit</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCustomers.map(c => (
                    <tr key={c.id}>
                      <td>
                        <Link href={`/customers/${c.id}`} style={{ textDecoration: 'none', fontWeight: 600, color: 'var(--color-primary)' }}>
                          {c.fullName}
                        </Link>
                      </td>
                      <td style={{ fontSize: 13 }}>{c.phone}</td>
                      <td>
                        <span style={{ display: 'inline-flex', padding: '2px 7px', borderRadius: 99, fontSize: 11, fontWeight: 600, background: 'var(--color-primary-dim)', color: 'var(--color-primary)' }}>
                          {c.totalVisits}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--color-text-3)' }}>
                        {c.lastVisitDate ? format(new Date(c.lastVisitDate), 'dd MMM yy') : '—'}
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--color-text-3)' }}>
                        {format(new Date(c.createdAt), 'dd MMM yy')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Reviews */}
        {recentReviews.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div className="section-title" style={{ margin: 0 }}>Recent Reviews</div>
              <Link href={`/reviews?outletId=${outlet.id}`} style={{ fontSize: 12, color: 'var(--color-primary)', textDecoration: 'none' }}>View all →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
              {recentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
