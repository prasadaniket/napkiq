'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'

interface AnniversaryCustomer {
  id: string
  fullName: string
  phone: string
  email: string | null
  anniversaryDate: string
  firstVisitOutlet: { name: string; code: string } | null
  message5DaysStatus: 'send' | 'pending'
  message1DayStatus: 'send' | 'pending'
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

function StatusBadge({ status }: { status: 'send' | 'pending' }) {
  const isSend = status === 'send'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 9px', borderRadius: 99, fontSize: 11, fontWeight: 600,
      background: isSend ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)',
      color: isSend ? 'var(--color-success)' : '#f59e0b',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: isSend ? 'var(--color-success)' : '#f59e0b',
        flexShrink: 0,
      }} />
      {isSend ? 'Send' : 'Pending'}
    </span>
  )
}

export default function AnniversariesPage() {
  const { user, isOwnerOrAbove } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [customers, setCustomers] = useState<AnniversaryCustomer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const outletId = searchParams.get('outletId') ?? ''

  const fetchAnniversaries = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(false)
    try {
      const q = new URLSearchParams()
      if (outletId) q.append('outletId', outletId)
      const res = await api.get<AnniversaryCustomer[]>(`/cms/customers/anniversaries?${q.toString()}`)
      setCustomers(res.data)
    } catch {
      setError(true)
      setCustomers([])
    } finally {
      setLoading(false)
    }
  }, [user, outletId])

  useEffect(() => {
    fetchAnniversaries()
  }, [fetchAnniversaries])

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <button
              onClick={() => router.back()}
              style={{
                background: 'none', border: 'none', padding: 0,
                color: 'var(--color-text-3)', fontSize: 13, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 12
              }}
            >
              ← Go Back
            </button>
            <h1 className="page-title">Anniversaries This Month</h1>
            <p className="page-subtitle">
              {outletId ? 'Filtered by outlet — ' : ''}
              {!loading ? `${customers.length} customer${customers.length !== 1 ? 's' : ''}` : 'Loading anniversaries…'}
            </p>
          </div>
        </div>
      </div>

      <div className="page-content">
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ height: 52, background: 'var(--color-surface)', borderRadius: 8, opacity: 0.5, animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
            <style>{`@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}}`}</style>
          </div>
        )}

        {error && (
          <div className="empty-state">
            <div className="empty-state-icon">⚠️</div>
            <div className="empty-state-title">Failed to load anniversaries</div>
            <div className="empty-state-desc">Please try refreshing the page.</div>
          </div>
        )}

        {!loading && !error && customers.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">❤️</div>
            <div className="empty-state-title">No anniversaries this month</div>
            <div className="empty-state-desc">
              There are no customers celebrating their anniversaries in the current calendar month.
            </div>
          </div>
        )}

        {!loading && !error && customers.length > 0 && (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Anniversary Date</th>
                  <th>5 Days Ago Msg</th>
                  <th>1 Day Ago Msg</th>
                  {isOwnerOrAbove && <th>First Visit Outlet</th>}
                </tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.id}>
                    <td>
                      <Link href={`/customers/${c.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Initials name={c.fullName} />
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: 13 }}>
                            {c.fullName}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td>
                      <div style={{ fontSize: 13, color: 'var(--color-text-1)' }}>{c.phone}</div>
                      {c.email && <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{c.email}</div>}
                    </td>
                    <td style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-2)' }}>
                      {format(new Date(c.anniversaryDate), 'dd MMMM')}
                    </td>
                    <td>
                      <StatusBadge status={c.message5DaysStatus} />
                    </td>
                    <td>
                      <StatusBadge status={c.message1DayStatus} />
                    </td>
                    {isOwnerOrAbove && (
                      <td>
                        <span style={{
                          display: 'inline-flex', padding: '2px 8px', borderRadius: 99,
                          fontSize: 11, fontWeight: 600,
                          background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-2)',
                        }}>
                          {c.firstVisitOutlet?.name ?? '—'}
                        </span>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
