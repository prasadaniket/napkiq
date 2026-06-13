'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { format, differenceInDays } from 'date-fns'
import type { Customer, Review, PageResponse } from '@/types/api'

function useDebounce<T>(value: T, delay: number): T {
  const [dv, setDv] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDv(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return dv
}

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(' ')
  const ini = (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
  return (
    <div style={{
      width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
      background: 'var(--color-primary-dim)', border: '1px solid var(--color-primary-border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase',
    }}>
      {ini.toUpperCase()}
    </div>
  )
}

type SentimentLabel = 'positive' | 'negative' | 'neutral' | 'mixed'

function sentimentStyle(label: SentimentLabel) {
  const map: Record<SentimentLabel, { bg: string; color: string; emoji: string }> = {
    positive: { bg: 'rgba(34,197,94,0.10)',   color: '#16a34a', emoji: '😊' },
    negative: { bg: 'rgba(239,68,68,0.10)',   color: '#dc2626', emoji: '😞' },
    neutral:  { bg: 'rgba(100,116,139,0.10)', color: '#64748b', emoji: '😐' },
    mixed:    { bg: 'rgba(234,88,12,0.10)',   color: '#ea580c', emoji: '🤔' },
  }
  return map[label] ?? map.neutral
}

function starBadgeStyle(stars: number) {
  if (stars >= 4) return { bg: 'rgba(34,197,94,0.12)',  color: '#22c55e' }
  if (stars === 3) return { bg: 'rgba(234,179,8,0.12)', color: '#ca8a04' }
  return               { bg: 'rgba(239,68,68,0.12)',  color: '#ef4444' }
}

// ─── Expandable reviews sub-row ───────────────────────────────────────────────
function CustomerReviewsRow({
  customerId,
  fullName,
  colSpan,
}: {
  customerId: string
  fullName: string
  colSpan: number
}) {
  const [reviews, setReviews] = useState<Review[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<Customer>(`/cms/customers/${customerId}`)
      .then(res => setReviews(res.data.reviews ?? []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false))
  }, [customerId])

  return (
    <tr>
      <td colSpan={colSpan} style={{ padding: '0 0 0 16px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ borderLeft: '2px solid var(--color-primary-border)', paddingLeft: 16, paddingTop: 12, paddingBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
            Reviews by {fullName}
          </div>

          {loading && (
            <div style={{ fontSize: 12, color: 'var(--color-text-3)' }}>Loading…</div>
          )}

          {!loading && reviews?.length === 0 && (
            <div style={{ fontSize: 12, color: 'var(--color-text-3)', fontStyle: 'italic' }}>No reviews yet.</div>
          )}

          {!loading && reviews && reviews.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {reviews.map(r => {
                const badge = starBadgeStyle(r.stars)
                const sent = r.sentimentLabel
                  ? sentimentStyle(r.sentimentLabel as SentimentLabel)
                  : null
                return (
                  <div key={r.id} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '10px 14px', borderRadius: 8,
                    background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                  }}>
                    {/* Star badge */}
                    <span style={{
                      flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 3,
                      padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                      background: badge.bg, color: badge.color,
                    }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill={badge.color} stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      {r.stars}★
                    </span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      {r.reviewText ? (
                        <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-2)', lineHeight: 1.5 }}>
                          "{r.reviewText}"
                        </p>
                      ) : (
                        <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-3)', fontStyle: 'italic' }}>
                          No comment
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: 'var(--color-text-3)' }}>
                          {format(new Date(r.createdAt), 'dd MMM yyyy')}
                        </span>
                        {r.outlet?.code && (
                          <span style={{
                            fontSize: 10, padding: '1px 6px', borderRadius: 99,
                            background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-3)',
                          }}>
                            {r.outlet.name ?? r.outlet.code}
                          </span>
                        )}
                        {sent && r.sentimentLabel && (
                          <span style={{
                            fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 99,
                            background: sent.bg, color: sent.color,
                          }}>
                            {sent.emoji} {r.sentimentLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </td>
    </tr>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CustomersPage() {
  const { isAdmin, isOwnerOrAbove } = useAuth()
  const searchParams = useSearchParams()

  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [inactive, setInactive] = useState(false)
  const [gender, setGender] = useState('')
  const [hasReview, setHasReview] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const [outletId] = useState(() => searchParams.get('outletId') ?? '')
  const debouncedSearch = useDebounce(search, 400)

  const fetchCustomers = useCallback(async () => {
    setLoading(true)
    try {
      const q = new URLSearchParams({ page: page.toString(), size: '20', sortBy, sortDir })
      if (debouncedSearch) q.append('search', debouncedSearch)
      if (inactive)   q.append('inactive', 'true')
      if (gender)     q.append('gender', gender)
      if (hasReview)  q.append('hasReview', hasReview)
      if (outletId)   q.append('outletId', outletId)

      const res = await api.get<PageResponse<Customer>>(`/cms/customers?${q}`)
      setCustomers(res.data.content)
      setTotal(res.data.totalElements)
    } catch { setCustomers([]) }
    finally { setLoading(false) }
  }, [page, debouncedSearch, inactive, gender, hasReview, sortBy, sortDir, outletId])

  useEffect(() => { fetchCustomers() }, [fetchCustomers])
  useEffect(() => { setPage(0) }, [debouncedSearch, inactive, gender, hasReview, sortBy, sortDir])

  const hasFilters = inactive || !!gender || !!hasReview || !!debouncedSearch
  const clearFilters = () => {
    setSearch(''); setInactive(false); setGender(''); setHasReview('')
    setSortBy('createdAt'); setSortDir('desc')
  }

  const totalPages = Math.ceil(total / 20)

  // How many visible columns (for colSpan on expanded row)
  const colCount = isOwnerOrAbove ? 8 : 7

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="page-title">Customers</h1>
            <p className="page-subtitle">
              {outletId ? 'Filtered by outlet — ' : ''}
              {total > 0 && !loading ? `${total.toLocaleString()} total` : 'Manage your customer base'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <input
                className="input"
                placeholder="Search name, phone, email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: 240, paddingLeft: 36 }}
              />
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-3)" strokeWidth="2"
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            {isAdmin && (
              <button 
                onClick={() => toast.success('🚀 CSV Export is coming soon in the next update!')}
                className="btn-ghost" 
                style={{ gap: 6, fontSize: 13, border: '1px solid var(--color-border)', cursor: 'pointer' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Export CSV</span>
                <span className="text-[9px] font-extrabold bg-[#D64238]/10 text-[#D64238] px-1.5 py-0.5 rounded-md uppercase tracking-wider select-none">Soon</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Filter bar */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <select className="input" style={{ width: 'auto', padding: '6px 10px', fontSize: 13 }}
            value={gender} onChange={e => setGender(e.target.value)}>
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="RatherNotSay">Others</option>
          </select>

          <select className="input" style={{ width: 'auto', padding: '6px 10px', fontSize: 13 }}
            value={hasReview} onChange={e => setHasReview(e.target.value)}>
            <option value="">All Review Status</option>
            <option value="true">Review Submitted</option>
            <option value="false">Review Pending</option>
          </select>

          <select className="input" style={{ width: 'auto', padding: '6px 10px', fontSize: 13 }}
            value={`${sortBy}-${sortDir}`}
            onChange={e => {
              const [s, d] = e.target.value.split('-')
              setSortBy(s); setSortDir(d as 'asc' | 'desc')
            }}>
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="lastVisitDate-desc">Recent Visit</option>
            <option value="totalVisits-desc">Most Visits</option>
          </select>

          <label style={{
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
            color: 'var(--color-text-2)', cursor: 'pointer',
            background: inactive ? 'rgba(239,68,68,0.1)' : 'transparent',
            border: `1px solid ${inactive ? 'rgba(239,68,68,0.3)' : 'var(--color-border)'}`,
            borderRadius: 8, padding: '5px 10px', transition: 'all 0.2s',
          }}>
            <input type="checkbox" checked={inactive} onChange={e => setInactive(e.target.checked)} style={{ accentColor: 'var(--color-danger)' }}/>
            <span style={{ color: inactive ? 'var(--color-danger)' : 'var(--color-text-2)' }}>Inactive 30d+</span>
          </label>

          {hasFilters && (
            <button className="btn-ghost" style={{ fontSize: 12, color: 'var(--color-text-3)' }} onClick={clearFilters}>
              ✕ Clear filters
            </button>
          )}
        </div>

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ height: 56, background: 'var(--color-surface)', borderRadius: 8, opacity: 0.5, animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
            <style>{`@keyframes pulse { 0%,100%{opacity:0.4}50%{opacity:0.8} }`}</style>
          </div>
        )}

        {!loading && customers.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-title">No customers found</div>
            <div className="empty-state-desc">Try adjusting your search or filters.</div>
            {hasFilters && <button className="btn-ghost" style={{ marginTop: 16 }} onClick={clearFilters}>Clear all filters</button>}
          </div>
        )}

        {!loading && customers.length > 0 && (
          <>
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    {isOwnerOrAbove && <th>Outlet</th>}
                    <th>Visits</th>
                    <th>Reviews</th>
                    <th>Last Visit</th>
                    <th>Status</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(c => {
                    const daysSinceVisit = c.lastVisitDate
                      ? differenceInDays(new Date(), new Date(c.lastVisitDate))
                      : null
                    const isInactive = daysSinceVisit !== null && daysSinceVisit >= 30
                    const isExpanded = expandedId === c.id
                    const reviewCount = c.totalReviews ?? 0

                    return (
                      <React.Fragment key={c.id}>
                        <tr>
                          <td>
                            <Link href={`/customers/${c.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                              <Initials name={c.fullName} />
                              <div>
                                <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{c.fullName}</div>
                                <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{c.gender === 'RatherNotSay' || c.gender === 'Transgender' ? 'Others' : c.gender} · {c.maritalStatus}</div>
                              </div>
                            </Link>
                          </td>
                          <td>
                            <div style={{ fontSize: 13, color: 'var(--color-text-1)' }}>{c.phone}</div>
                            {c.email && <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{c.email}</div>}
                          </td>
                          {isOwnerOrAbove && (
                            <td>
                              <span style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-2)' }}>
                                {c.firstVisitOutlet?.code ?? '—'}
                              </span>
                            </td>
                          )}
                          <td>
                            <span style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600, background: 'var(--color-primary-dim)', color: 'var(--color-primary)' }}>
                              {c.totalVisits}
                            </span>
                          </td>
                          {/* Review count badge + expand toggle */}
                          <td>
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : c.id)}
                              style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                background: 'none', border: 'none', cursor: reviewCount > 0 ? 'pointer' : 'default',
                                padding: 0,
                              }}
                              title={reviewCount > 0 ? (isExpanded ? 'Collapse reviews' : 'View reviews') : 'No reviews'}
                            >
                              <span style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                width: 26, height: 26, borderRadius: '50%', fontSize: 11, fontWeight: 700, color: '#fff',
                                background: reviewCount > 0 ? 'var(--color-primary)' : 'var(--color-border-strong)',
                              }}>
                                {reviewCount}
                              </span>
                              {reviewCount > 0 && (
                                <svg
                                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                                  stroke="var(--color-text-3)" strokeWidth="2.5"
                                  style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                                >
                                  <polyline points="6 9 12 15 18 9"/>
                                </svg>
                              )}
                            </button>
                          </td>
                          <td style={{ fontSize: 12 }}>
                            {c.lastVisitDate ? (
                              <div>
                                <div style={{ color: isInactive ? 'var(--color-danger)' : 'var(--color-text-1)' }}>
                                  {format(new Date(c.lastVisitDate), 'dd MMM yy')}
                                </div>
                                <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>
                                  {daysSinceVisit === 0 ? 'Today' : `${daysSinceVisit}d ago`}
                                </div>
                              </div>
                            ) : '—'}
                          </td>
                          <td>
                            {c.hasSubmittedFirstReview ? (
                              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: 'rgba(34,197,94,0.12)', color: 'var(--color-success)' }}>
                                ✓ Review
                              </span>
                            ) : (
                              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: 'rgba(239,68,68,0.10)', color: 'var(--color-danger)' }}>
                                Pending
                              </span>
                            )}
                          </td>
                          <td style={{ fontSize: 12, color: 'var(--color-text-3)' }}>
                            {format(new Date(c.createdAt), 'dd MMM yy')}
                          </td>
                        </tr>

                        {/* Expanded reviews row */}
                        {isExpanded && (
                          <CustomerReviewsRow
                            key={`${c.id}-reviews`}
                            customerId={c.id}
                            fullName={c.fullName}
                            colSpan={colCount}
                          />
                        )}
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: 'var(--color-text-3)' }}>
                {total.toLocaleString()} customers · Page {page + 1} of {totalPages}
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-ghost" disabled={page === 0} onClick={() => setPage(p => p - 1)}>← Prev</button>
                <button className="btn-ghost" disabled={page + 1 >= totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
