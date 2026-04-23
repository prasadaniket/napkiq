'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'
import type { Customer, PageResponse } from '@/types/api'

// --- Debounce hook ---
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

export default function CustomersPage() {
  const { isOwnerOrAbove } = useAuth()
  const searchParams = useSearchParams()
  
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filters & Pagination
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [inactive, setInactive] = useState(false)
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc')
  
  // Pre-populate outletId from URL if coming from Outlets deep link
  const [outletId] = useState<string>(() => searchParams.get('outletId') ?? '')
  
  const debouncedSearch = useDebounce(search, 500)

  const fetchCustomers = useCallback(async () => {
    setLoading(true)
    try {
      const q = new URLSearchParams({
        page: page.toString(),
        size: '20',
        sortBy,
        sortDir,
      })
      if (debouncedSearch) q.append('search', debouncedSearch)
      if (inactive) q.append('inactive', 'true')
      if (outletId) q.append('outletId', outletId)
      
      const res = await api.get<PageResponse<Customer>>(`/cms/customers?${q.toString()}`)
      setCustomers(res.data.content)
      setTotal(res.data.totalElements)
    } catch (err) {
      console.error(err)
      setCustomers([])
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, inactive, sortBy, sortDir, outletId])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  // Reset page to 0 when filters change
  useEffect(() => {
    setPage(0)
  }, [debouncedSearch, inactive, sortBy, sortDir])

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="page-title">Customers</h1>
            <p className="page-subtitle">Manage and search your customer base</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <input 
                className="input"
                placeholder="Search name, phone, email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: 240, paddingLeft: 36 }}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-3)" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            {isOwnerOrAbove && (
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/cms/export/customers`}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button className="btn-ghost">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Export CSV
                </button>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="page-content">
        
        {/* Filters Bar */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-text-2)', cursor: 'pointer' }}>
            <input type="checkbox" checked={inactive} onChange={e => setInactive(e.target.checked)} />
            Inactive only (30d+)
          </label>
          <select 
            className="input" 
            style={{ width: 'auto', padding: '6px 12px', fontSize: 13, height: 'auto' }}
            value={`${sortBy}-${sortDir}`}
            onChange={e => {
              const [s, d] = e.target.value.split('-')
              setSortBy(s)
              setSortDir(d as 'asc' | 'desc')
            }}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="lastVisitDate-desc">Recent Visit</option>
            <option value="totalVisits-desc">Most Visits</option>
          </select>
        </div>

        {loading && <div style={{ padding: 48, textAlign: 'center', color: 'var(--color-text-3)' }}>Loading customers...</div>}
        
        {!loading && customers.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-title">No customers found</div>
            <div className="empty-state-desc">Try adjusting your search or filters.</div>
          </div>
        )}

        {!loading && customers.length > 0 && (
          <>
            <div style={{ marginBottom: 12, fontSize: 13, color: 'var(--color-text-3)' }}>
              {total.toLocaleString()} customers found
            </div>
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    {isOwnerOrAbove && <th>First Outlet</th>}
                    <th>Visits</th>
                    <th>Last Visit</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <Link href={`/customers/${c.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                          <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{c.fullName}</div>
                          <div style={{ fontSize: 12, color: 'var(--color-text-3)' }}>
                            {c.gender} · {c.maritalStatus}
                          </div>
                        </Link>
                      </td>
                      <td>
                        <div style={{ color: 'var(--color-text-1)' }}>{c.phone}</div>
                        {c.email && <div style={{ fontSize: 12, color: 'var(--color-text-3)' }}>{c.email}</div>}
                      </td>
                      {isOwnerOrAbove && (
                        <td>
                          <span style={{
                            display: 'inline-flex', padding: '2px 8px', borderRadius: 99,
                            fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-2)'
                          }}>
                            {c.firstVisitOutlet?.code}
                          </span>
                        </td>
                      )}
                      <td>
                        <span style={{
                          display: 'inline-flex', padding: '2px 8px', borderRadius: 99,
                          fontSize: 11, fontWeight: 600, background: 'var(--color-primary-dim)', color: 'var(--color-primary)'
                        }}>
                          {c.totalVisits}
                        </span>
                      </td>
                      <td style={{ fontSize: 13 }}>
                        {c.lastVisitDate ? format(new Date(c.lastVisitDate), 'dd MMM yy') : '—'}
                      </td>
                      <td style={{ fontSize: 13 }}>
                        {format(new Date(c.createdAt), 'dd MMM yy')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, justifyContent: 'flex-end' }}>
              <button className="btn-ghost" disabled={page === 0} onClick={() => setPage(p => p - 1)}>← Prev</button>
              <span style={{ fontSize: 13, color: 'var(--color-text-3)' }}>Page {page + 1}</span>
              <button className="btn-ghost" disabled={(page + 1) * 20 >= total} onClick={() => setPage(p => p + 1)}>Next →</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
