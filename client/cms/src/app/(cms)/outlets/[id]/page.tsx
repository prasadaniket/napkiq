'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'
import ReviewCard from '@/components/cms/ReviewCard'
import type { OutletDetail } from '@/types/api'
import { 
  Users, 
  Star, 
  CalendarDays, 
  AlertTriangle, 
  ArrowLeft, 
  MapPin, 
  Cake, 
  Heart, 
  ChevronRight,
  TrendingUp,
  Sparkles,
  Clock,
  ExternalLink,
  MessageSquare
} from 'lucide-react'

// ─── Star Distribution Component ────────────────────────────────────────────────
function StarDistribution({ distribution, total }: { distribution: { stars: number; count: number }[]; total: number }) {
  const byStars = Object.fromEntries(distribution.map(d => [d.stars, d.count]))
  return (
    <div className="space-y-3.5 select-none">
      {[5, 4, 3, 2, 1].map(s => {
        const count = byStars[s] ?? 0
        const pct = total > 0 ? (count / total) * 100 : 0
        return (
          <div key={s} className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 w-3.5 text-right">{s}</span>
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500" 
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-400 w-6 text-right">{count}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── KPI Card Component ──────────────────────────────────────────────────────────
function KpiTile({ 
  label, 
  value, 
  sub, 
  accent, 
  icon 
}: { 
  label: string
  value: string | number | null
  sub?: string
  accent?: 'violet' | 'amber' | 'emerald' | 'rose' | 'default'
  icon: React.ReactNode 
}) {
  const accentClasses = {
    violet: 'border-violet-100 hover:border-violet-200/80 bg-white text-violet-600',
    amber: 'border-amber-100 hover:border-amber-200/80 bg-white text-amber-500',
    emerald: 'border-emerald-100 hover:border-emerald-200/80 bg-white text-emerald-600',
    rose: 'border-rose-100 hover:border-rose-200/80 bg-white text-rose-500',
    default: 'border-slate-100 hover:border-slate-200 bg-white text-slate-500'
  }

  const iconBgClasses = {
    violet: 'bg-violet-50 text-violet-600',
    amber: 'bg-amber-50 text-amber-500',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-[#D64238]',
    default: 'bg-slate-50 text-slate-500'
  }

  return (
    <div className={`group relative overflow-hidden rounded-2xl border p-4 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${accentClasses[accent ?? 'default']}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
        <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${iconBgClasses[accent ?? 'default']}`}>
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-xl font-black text-slate-800 leading-tight">
          {value ?? '—'}
        </span>
      </div>
      {sub && (
        <span className="block text-[10px] font-bold text-slate-400 mt-1">
          {sub}
        </span>
      )}
    </div>
  )
}

// ─── Main Page Component ─────────────────────────────────────────────────────────
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
    <div className="page-content flex flex-col items-center justify-center py-32 space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D64238]" />
      <span className="text-sm font-semibold text-slate-400">Loading branch dashboard...</span>
    </div>
  )

  if (error || !data) return (
    <div className="page-content py-16 px-4">
      <div className="max-w-md mx-auto text-center rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-[#D64238] mx-auto mb-4">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Branch not found</h3>
        <p className="mt-1.5 text-sm text-slate-500 font-medium">
          The branch details or operational analytics could not be retrieved.
        </p>
        <Link href="/outlets" className="inline-block mt-6 no-underline">
          <button className="h-10 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all border-none cursor-pointer">
            ← Back to Outlets
          </button>
        </Link>
      </div>
    </div>
  )

  const { outlet, stats, recentCustomers, recentReviews, recentVisits } = data

  return (
    <div className="page-content" style={{ padding: '24px 28px 32px' }}>
      <div className="space-y-6">
        
        {/* ── Beautiful Welcoming Hero Header ── */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-r from-slate-50 via-white to-orange-50/20 p-6 md:p-8">
          <div className="absolute right-10 top-0 -z-10 h-32 w-32 rounded-full bg-orange-100/30 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 -z-10 h-24 w-24 rounded-full bg-red-100/10 blur-2xl" />

          {/* Sleek back navigation */}
          <Link href="/outlets" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#D64238] transition-colors mb-4 no-underline group select-none">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>All Outlets</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span className="text-[10px] font-extrabold uppercase bg-red-50 text-[#D64238] px-1.5 py-0.5 rounded-md border border-red-100/30">
                  {outlet.code}
                </span>
                <span>Branch Dashboard</span>
              </div>
              <h1 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                {outlet.name}
              </h1>
              
              {outlet.address && (
                <div className="flex items-center gap-1.5 mt-2 text-sm font-semibold text-slate-400">
                  <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <span>{outlet.address}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {outlet.googleMapsUrl && (
                <a 
                  href={outlet.googleMapsUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 h-10 px-4 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-slate-100 select-none no-underline cursor-pointer"
                >
                  <MapPin className="h-4 w-4 text-[#D64238]" />
                  <span>Google Maps</span>
                </a>
              )}

              <Link href={`/customers?outletId=${outlet.id}`} className="no-underline">
                <button className="h-10 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-[0_2px_4px_rgba(0,0,0,0.02)] border-none select-none cursor-pointer">
                  All Customers
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Primary KPI Summary Cards Row ── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8 select-none">
          
          <KpiTile 
            label="Total Customers" 
            value={stats.totalCustomers} 
            sub={`+${stats.newCustomersThisMonth} this month`} 
            accent="violet"
            icon={<Users className="h-4 w-4" />}
          />

          <KpiTile 
            label="Avg Rating" 
            value={stats.averageRating ? `${stats.averageRating.toFixed(1)} ★` : '—'} 
            sub={`${stats.totalReviews} reviews`} 
            accent="amber"
            icon={<Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
          />

          <KpiTile 
            label="Visits This Month" 
            value={stats.visitsThisMonth} 
            sub={`${stats.totalVisits} total visits`} 
            accent="emerald"
            icon={<CalendarDays className="h-4 w-4" />}
          />

          <KpiTile 
            label="At Risk (30d+)" 
            value={stats.inactiveCustomers} 
            sub="no recent visit" 
            accent={stats.inactiveCustomers > 10 ? 'rose' : 'default'}
            icon={<AlertTriangle className="h-4 w-4" />}
          />

          <KpiTile 
            label="New This Week" 
            value={stats.newCustomersThisWeek} 
            sub="new customers" 
            accent="default"
            icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
          />

          <KpiTile 
            label="Reviews This Week" 
            value={stats.reviewsThisWeek} 
            sub="new feedback"
            accent="default"
            icon={<MessageSquare className="h-4 w-4" />}
          />

          {/* Clickable Celebration Badges */}
          <Link href={`/birthdays?outletId=${outlet.id}`} className="no-underline">
            <KpiTile 
              label="Birthdays" 
              value={stats.birthdaysThisMonth} 
              sub="this month" 
              accent="amber"
              icon={<Cake className="h-4 w-4" />}
            />
          </Link>

          <Link href={`/anniversaries?outletId=${outlet.id}`} className="no-underline">
            <KpiTile 
              label="Anniversaries" 
              value={stats.anniversariesThisMonth} 
              sub="this month" 
              accent="violet"
              icon={<Heart className="h-4 w-4 fill-indigo-100" />}
            />
          </Link>

        </div>

        {/* ── Two Column Dashboard Feed Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Column A (Left Column - 1 part): Rating Distribution */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.03)] space-y-5">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Rating Distribution</h3>
              <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Summary of user experience feedback metrics</p>
            </div>

            {stats.totalReviews > 0 ? (
              <div className="space-y-5">
                <div className="flex items-baseline gap-1.5 mb-2 select-none">
                  <span className="text-4.5xl font-black text-slate-800 leading-none">
                    {stats.averageRating?.toFixed(1) ?? '—'}
                  </span>
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400 self-center mb-1" />
                  <span className="text-xs font-bold text-slate-400">/ 5.0 rating</span>
                </div>
                <StarDistribution distribution={stats.starDistribution} total={stats.totalReviews} />
              </div>
            ) : (
              <div className="text-center py-8 text-xs font-semibold text-slate-400">
                No customer reviews yet.
              </div>
            )}
          </div>

          {/* Column B (Right Column - 2 parts): Recent Visits Feed */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[290px]">
            <div>
              <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-4 select-none">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Recent Visits</h3>
                  <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Real-time arrival feed of active customers</p>
                </div>
                <Link href={`/visits?outletId=${outlet.id}`} className="inline-flex items-center gap-0.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors no-underline">
                  <span>View all</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {recentVisits.length === 0 ? (
                <div className="text-center py-12 text-xs font-semibold text-slate-400">
                  No visits recorded yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentVisits.map(v => (
                    <div 
                      key={v.id} 
                      className="group flex items-center justify-between border border-slate-50 bg-slate-50/20 hover:bg-slate-50/60 p-3 rounded-2xl transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center justify-center text-[9px] font-extrabold px-2 py-0.75 rounded-lg select-none ${
                          v.visitType === 'qr_scan' 
                            ? 'bg-blue-50 text-blue-600 border border-blue-100/50' 
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-100/50'
                        }`}>
                          {v.visitType === 'qr_scan' ? 'QR' : 'PAY'}
                        </span>
                        <div className="min-w-0">
                          <span className="text-[12.5px] font-extrabold text-slate-800 block truncate leading-tight">
                            {v.customer?.fullName ?? 'Unknown'}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 mt-0.5 block">
                            {v.customer?.phone}
                          </span>
                        </div>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 select-none">
                        <Clock className="h-3 w-3 text-slate-300" />
                        <span>{format(new Date(v.visitedAt), 'dd MMM, HH:mm')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ── Recent Customers Table Section ── */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between pb-4 mb-2 select-none">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Recent Customers</h3>
              <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Direct overview of customer directory metrics</p>
            </div>
            <Link href={`/customers?outletId=${outlet.id}`} className="inline-flex items-center gap-0.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors no-underline">
              <span>View all</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {recentCustomers.length === 0 ? (
            <div className="text-center py-12 text-xs font-semibold text-slate-400">
              No customers listed yet.
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-100/60 rounded-2xl">
              <table className="min-w-full divide-y divide-slate-100 text-left">
                <thead className="bg-slate-50/70 select-none">
                  <tr>
                    <th className="px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Name</th>
                    <th className="px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Phone</th>
                    <th className="px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Visits</th>
                    <th className="px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Last Visit</th>
                    <th className="px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {recentCustomers.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-5 py-3.5">
                        <Link href={`/customers/${c.id}`} className="text-xs font-extrabold text-[#D64238] hover:text-[#B82E25] no-underline">
                          {c.fullName}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-semibold text-slate-600">{c.phone}</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-[#D64238] border border-red-100/35 select-none">
                          {c.totalVisits}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-semibold text-slate-400">
                        {c.lastVisitDate ? format(new Date(c.lastVisitDate), 'dd MMM yy') : '—'}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-semibold text-slate-400">
                        {format(new Date(c.createdAt), 'dd MMM yy')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Recent Reviews Section ── */}
        {recentReviews.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between select-none">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Recent Reviews</h3>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Customer feedback and star ratings feed</p>
              </div>
              <Link href={`/reviews?outletId=${outlet.id}`} className="inline-flex items-center gap-0.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors no-underline">
                <span>View all</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentReviews.map(r => (
                <div key={r.id} className="transition-all duration-300 hover:-translate-y-0.5">
                  <ReviewCard review={r} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
