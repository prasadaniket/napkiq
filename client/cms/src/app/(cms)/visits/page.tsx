'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'
import type { PageResponse, Visit, VisitSummary } from '@/types/api'
import toast from 'react-hot-toast'

function useDebounce<T>(value: T, delay: number): T {
  const [dv, setDv] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDv(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return dv
}

function DateInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  const ref = useRef<HTMLInputElement>(null)
  const display = value ? new Date(value + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : placeholder

  return (
    <div
      className="input"
      onClick={() => ref.current?.showPicker()}
      style={{ width: 'auto', padding: '6px 10px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', minWidth: 155, userSelect: 'none' }}
    >
      <span style={{ flex: 1, color: value ? 'var(--color-text-1)' : 'var(--color-text-3)' }}>{display}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      <input
        ref={ref}
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
      />
    </div>
  )
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

// ─── Summary card ─────────────────────────────────────────────────────────────
function SummaryCard({ summary }: { summary: VisitSummary }) {
  const qrPct  = summary.totalVisits > 0 ? Math.round((summary.qrScans  / summary.totalVisits) * 100) : 0
  const payPct = summary.totalVisits > 0 ? Math.round((summary.payments / summary.totalVisits) * 100) : 0

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '14px 18px',
      minWidth: 220,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
        Visit Breakdown
      </div>

      {/* QR Scan row */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: 'var(--color-info)', fontWeight: 600 }}>QR Scan</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)' }}>
            {summary.qrScans.toLocaleString()}
            <span style={{ fontSize: 10, color: 'var(--color-text-3)', fontWeight: 400, marginLeft: 4 }}>{qrPct}%</span>
          </span>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: `${qrPct}%`, height: '100%', background: 'var(--color-info)', borderRadius: 99, transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* Payment row */}
      <div 
        title="Table order payment integration is coming in a future update!"
        style={{ opacity: 0.65, cursor: 'help' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--color-success)', fontWeight: 600 }}>Payment</span>
            <span style={{
              fontSize: 8.5,
              fontWeight: 800,
              color: 'var(--color-primary)',
              background: 'var(--color-primary-dim)',
              padding: '1px 5px',
              borderRadius: 4,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>Soon</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)' }}>
            {summary.payments.toLocaleString()}
            <span style={{ fontSize: 10, color: 'var(--color-text-3)', fontWeight: 400, marginLeft: 4 }}>{payPct}%</span>
          </span>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: `${payPct}%`, height: '100%', background: 'var(--color-success)', borderRadius: 99, transition: 'width 0.5s ease' }} />
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)', marginTop: 12, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--color-text-3)' }}>Total Filtered</span>
        <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-text-1)' }}>{summary.totalVisits.toLocaleString()}</span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function VisitsPage() {
  const { user, isAdmin, isOwnerOrAbove } = useAuth()
  const searchParams = useSearchParams()

  const [visits, setVisits]   = useState<Visit[]>([])
  const [summary, setSummary] = useState<VisitSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage]       = useState(0)
  const [total, setTotal]     = useState(0)

  // Filters
  const [search, setSearch]     = useState('')
  const [type, setType]         = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo]     = useState('')
  const [sortDir, setSortDir]   = useState<'asc' | 'desc'>('desc')

  const [outletId] = useState(() => searchParams.get('outletId') ?? '')
  const debouncedSearch = useDebounce(search, 400)

  const buildQuery = useCallback(() => {
    const q = new URLSearchParams({ page: page.toString(), size: '20', sortDir })
    if (debouncedSearch) q.append('search', debouncedSearch)
    if (type)     q.append('type', type)
    if (dateFrom) q.append('dateFrom', dateFrom)
    if (dateTo)   q.append('dateTo', dateTo)
    if (outletId) q.append('outletId', outletId)
    return q.toString()
  }, [page, debouncedSearch, type, dateFrom, dateTo, outletId, sortDir])

  const fetchVisits = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const q = buildQuery()
      const [visRes, sumRes] = await Promise.all([
        api.get<PageResponse<Visit>>(`/cms/visits?${q}`),
        api.get<VisitSummary>(`/cms/visits/summary?${q}`),
      ])
      setVisits(visRes.data.content)
      setTotal(visRes.data.totalElements)
      setSummary(sumRes.data)
    } catch { setVisits([]) }
    finally { setLoading(false) }
  }, [user, buildQuery])

  useEffect(() => { fetchVisits() }, [fetchVisits])
  useEffect(() => { setPage(0) }, [debouncedSearch, type, dateFrom, dateTo, sortDir])

  const hasFilters = !!type || !!dateFrom || !!dateTo || !!debouncedSearch
  const clearFilters = () => { setSearch(''); setType(''); setDateFrom(''); setDateTo(''); setSortDir('desc') }
  const totalPages = Math.ceil(total / 20)

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="page-title">Visits</h1>
            <p className="page-subtitle">
              {outletId ? 'Filtered by outlet — ' : ''}
              {total > 0 && !loading
                ? `${total.toLocaleString()} visits`
                : isOwnerOrAbove ? 'All outlet visit activity' : `Visits · ${user?.assignedOutletName}`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <input
                className="input"
                placeholder="Search customer…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: 230, paddingLeft: 36 }}
              />
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-3)" strokeWidth="2"
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            {/* Export — admin only (backend enforces requireAdmin) */}
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

        {/* Filters + summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, marginBottom: 24, alignItems: 'start' }}>

          {/* Filter bar */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <select className="input" style={{ width: 'auto', padding: '6px 10px', fontSize: 13 }}
              value={type} onChange={e => setType(e.target.value)}>
              <option value="">All Types</option>
              <option value="qr_scan">QR Scan</option>
              <option value="payment" disabled style={{ color: 'var(--color-text-3)', opacity: 0.5 }}>Payment (Soon)</option>
            </select>

            <DateInput value={dateFrom} onChange={setDateFrom} placeholder="Select Date From" />
            <span style={{ fontSize: 12, color: 'var(--color-text-3)' }}>–</span>
            <DateInput value={dateTo} onChange={setDateTo} placeholder="Select Date To" />

            <select className="input" style={{ width: 'auto', padding: '6px 10px', fontSize: 13 }}
              value={sortDir} onChange={e => setSortDir(e.target.value as 'asc' | 'desc')}>
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>

            {hasFilters && (
              <button className="btn-ghost" style={{ fontSize: 12, color: 'var(--color-text-3)' }} onClick={clearFilters}>
                ✕ Clear
              </button>
            )}
          </div>

          {/* Summary panel */}
          {summary && <SummaryCard summary={summary} />}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ height: 52, background: 'var(--color-surface)', borderRadius: 8, opacity: 0.5, animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
            <style>{`@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}}`}</style>
          </div>
        )}

        {/* Empty */}
        {!loading && visits.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <div className="empty-state-title">No visits found</div>
            <div className="empty-state-desc">
              {hasFilters ? 'Try adjusting your filters or search query.' : 'Visits from QR scans and payments will appear here.'}
            </div>
            {hasFilters && <button className="btn-ghost" style={{ marginTop: 16 }} onClick={clearFilters}>Clear all filters</button>}
          </div>
        )}

        {/* Table */}
        {!loading && visits.length > 0 && (
          <>
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Status</th>
                    {isOwnerOrAbove && <th>Outlet</th>}
                    <th>Type</th>
                    <th>Visited At</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map(v => (
                    <tr key={v.id}>
                      <td>
                        {v.converted && v.customerId ? (
                          <Link href={`/customers/${v.customerId}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Initials name={v.customer?.fullName ?? ''} />
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: 13 }}>
                                {v.customer?.fullName}
                              </div>
                              <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>
                                {v.customer?.phone}
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 14, color: 'var(--color-text-3)',
                            }}>?</div>
                            <div>
                              <div style={{ fontWeight: 500, color: 'var(--color-text-3)', fontSize: 13 }}>
                                Anonymous Visitor
                              </div>
                              <div style={{ fontSize: 10, color: 'var(--color-text-3)', opacity: 0.5, fontFamily: 'monospace' }}>
                                No form submitted
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          padding: '3px 9px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                          background: !v.converted
                            ? 'rgba(255,255,255,0.05)'
                            : v.isRepeatVisitor
                              ? 'rgba(245,158,11,0.12)'
                              : 'rgba(34,197,94,0.12)',
                          color: !v.converted
                            ? 'var(--color-text-3)'
                            : v.isRepeatVisitor
                              ? '#f59e0b'
                              : 'var(--color-success)',
                        }}>
                          <span style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: !v.converted
                              ? 'rgba(255,255,255,0.2)'
                              : v.isRepeatVisitor
                                ? '#f59e0b'
                                : 'var(--color-success)',
                            flexShrink: 0,
                          }} />
                          {!v.converted ? 'Not Converted' : v.isRepeatVisitor ? 'Old Customer' : 'Converted'}
                        </span>
                      </td>
                      {isOwnerOrAbove && (
                        <td>
                          <span style={{
                            display: 'inline-flex', padding: '2px 8px', borderRadius: 99,
                            fontSize: 11, fontWeight: 600,
                            background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-2)',
                          }}>
                            {v.outlet?.code ?? '—'}
                          </span>
                        </td>
                      )}
                      <td>
                        <span style={{
                          display: 'inline-flex', padding: '2px 8px', borderRadius: 99,
                          fontSize: 11, fontWeight: 600,
                          background: v.visitType === 'qr_scan'
                            ? 'rgba(59,130,246,0.12)' : 'rgba(34,197,94,0.12)',
                          color: v.visitType === 'qr_scan'
                            ? 'var(--color-info)' : 'var(--color-success)',
                        }}>
                          {v.visitType === 'qr_scan' ? 'QR Scan' : 'Payment'}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--color-text-2)' }}>
                        {format(new Date(v.visitedAt), 'dd MMM yy, HH:mm')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
              <span style={{ fontSize: 13, color: 'var(--color-text-3)' }}>
                {total.toLocaleString()} visits · Page {page + 1} of {totalPages || 1}
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
