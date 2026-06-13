'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import type { OutletStats } from '@/types/api'
import toast from 'react-hot-toast'
import { 
  Building2, 
  Users, 
  CalendarDays, 
  Star, 
  AlertTriangle, 
  MapPin, 
  Cake, 
  Heart, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  Trash2,
  Plus,
  X,
  Lock,
  Globe,
  Instagram,
  Facebook
} from 'lucide-react'

// ─── Premium Star Progress Bar ──────────────────────────────────────────────────
function StarProgress({ rating }: { rating: number | null }) {
  const pct = rating ? Math.min(100, Math.max(0, (rating / 5) * 100)) : 0
  return (
    <div className="space-y-1.5 select-none">
      <div className="flex justify-between items-center text-[10px] font-bold tracking-wider uppercase text-slate-400">
        <span>Rating progress</span>
        <span>{rating ? `${rating.toFixed(1)} / 5.0` : 'No rating'}</span>
      </div>
      <div className="relative h-2 w-full rounded-full bg-slate-100/80 overflow-hidden">
        <div 
          className="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function OutletsPage() {
  const { user, isAdmin, isOwner } = useAuth()
  const isOwnerOrAbove = isOwner || isAdmin
  const router = useRouter()
  
  const [stats, setStats] = useState<OutletStats[]>([])
  const [uniqueCustomers, setUniqueCustomers] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  
  // Add Outlet Modal State
  const [showAddModal, setShowAddModal] = useState(false)
  const [savingOutlet, setSavingOutlet] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    slug: '',
    location: '',
    address: '',
    googlePlaceId: '',
    googleMapsUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerUsername: '',
    ownerPassword: '',
  })

  const fetchStats = () => {
    setLoading(true)
    Promise.all([
      api.get<OutletStats[]>('/cms/outlets/stats'),
      api.get<{ totalCustomers: number }>('/cms/dashboard/stats'),
    ])
      .then(([outletRes, dashRes]) => {
        setStats(outletRes.data)
        setUniqueCustomers(dashRes.data.totalCustomers)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!isOwnerOrAbove) {
      router.replace('/dashboard')
      return
    }
    fetchStats()
  }, [isOwnerOrAbove, router])

  if (!isOwnerOrAbove) return null

  // Summed stats across all branches
  const totals = stats.reduce((acc, o) => ({
    customers: uniqueCustomers,
    visits:    acc.visits   + o.visitsThisMonth,
    reviews:   acc.reviews  + o.totalReviews,
    inactive:  acc.inactive + o.inactiveCustomers,
  }), { customers: uniqueCustomers, visits: 0, reviews: 0, inactive: 0 })

  // Remove Outlet Handler
  const handleRemoveOutlet = async (outletId: string, outletName: string) => {
    const confirmRemove = window.confirm(`⚠️ Do you really want to remove the outlet "${outletName}"? This action will set it to inactive and reflect in the main portal.\n\nType OK to confirm.`);
    if (!confirmRemove) return

    try {
      await api.delete(`/cms/outlets/${outletId}`)
      toast.success(`Outlet "${outletName}" removed successfully!`)
      // Refresh local state list
      setStats(prev => prev.filter(o => o.outletId !== outletId))
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to remove outlet')
    }
  }

  // Handle Add Outlet Form Submission
  const handleAddOutlet = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.code || !formData.slug || !formData.googlePlaceId) {
      toast.error('Please fill in all required outlet details!')
      return
    }

    setSavingOutlet(true)
    try {
      const res = await api.post('/cms/outlets', formData)
      toast.success(`Successfully created outlet "${formData.name}"!`)
      if (res.data.warning) {
        toast.error(res.data.warning, { duration: 6000 })
      }
      
      // Reset form and modal
      setShowAddModal(false)
      setFormData({
        name: '',
        code: '',
        slug: '',
        location: '',
        address: '',
        googlePlaceId: '',
        googleMapsUrl: '',
        instagramUrl: '',
        facebookUrl: '',
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        ownerUsername: '',
        ownerPassword: '',
      })

      // Fetch stats again to populate dashboard
      fetchStats()
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to create new outlet')
    } finally {
      setSavingOutlet(false)
    }
  }

  return (
    <div className="page-content" style={{ padding: '24px 28px 32px' }}>
      <div className="space-y-6">
        
        {/* ── Beautiful Welcoming Hero Header ── */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-r from-slate-50 via-white to-orange-50/20 p-6 md:p-8">
          <div className="absolute right-10 top-0 -z-10 h-32 w-32 rounded-full bg-orange-100/30 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 -z-10 h-24 w-24 rounded-full bg-red-100/10 blur-2xl" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Building2 className="h-4 w-4 text-[#D64238]" />
                <span>Multi-branch management</span>
              </div>
              <h1 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                Outlet Performance
              </h1>
              <p className="mt-1.5 text-sm font-medium text-slate-500">
                Real-time operational statistics across all <span className="text-slate-800 font-semibold">{stats.length} branches</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {isAdmin && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-1.5 h-10 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow select-none border-none"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Outlet</span>
                </button>
              )}

              <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/60 px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span>Active Channels</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Skeleton Loading State ── */}
        {loading && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse h-28 bg-slate-50 border border-slate-100 rounded-2xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse h-[340px] bg-slate-50 border border-slate-100 rounded-3xl" />
              ))}
            </div>
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && stats.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white py-16 px-4 text-center shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 mb-4 text-2xl">
              🏪
            </div>
            <h3 className="text-lg font-bold text-slate-900">No active branches found</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm font-medium">
              We couldn't retrieve branch statistics from our database services right now.
            </p>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => window.location.reload()} 
                className="rounded-xl bg-slate-100 px-5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-200 border-none"
              >
                Refresh Portal
              </button>
              {isAdmin && (
                <button 
                  onClick={() => setShowAddModal(true)} 
                  className="rounded-xl bg-[#D64238] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:shadow transition-all hover:bg-[#B82E25] border-none"
                >
                  Create First Outlet
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Live Performance UI Content ── */}
        {!loading && stats.length > 0 && (
          <div className="space-y-6">
            
            {/* 1. Summed KPI Cards Row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              
              {/* Total Customers */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Customers</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-transform group-hover:scale-105">
                    <Users className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{totals.customers}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" />
                    <span>Unique</span>
                  </span>
                </div>
              </div>

              {/* Visits This Month */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Visits This Month</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-105">
                    <CalendarDays className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{totals.visits}</span>
                  <span className="text-[10px] font-bold text-emerald-600">active now</span>
                </div>
              </div>

              {/* Total Reviews */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Reviews</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-500 transition-transform group-hover:scale-105">
                    <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{totals.reviews}</span>
                  <span className="text-[10px] font-bold text-amber-600">customer stories</span>
                </div>
              </div>

              {/* Inactive Customers */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">At-Risk (30d+)</span>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                    totals.inactive > 15 ? 'bg-rose-50 text-[#D64238]' : 'bg-slate-50 text-slate-500'
                  }`}>
                    <AlertTriangle className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{totals.inactive}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    totals.inactive > 15 ? 'bg-rose-50 text-[#D64238]' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {totals.inactive > 15 ? 'Needs Action' : 'Perfect'}
                  </span>
                </div>
              </div>

            </div>

            {/* 2. Outlet Performance Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map(os => {
                const isRatingHigh = (os.averageRating ?? 0) >= 4.0
                const isRiskHigh = os.inactiveCustomers > 10

                return (
                  <div 
                    key={os.outletId} 
                    className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-200/80 flex flex-col justify-between"
                  >
                    {/* Glowing effect inside card for premium look */}
                    <div className="absolute right-0 top-0 -z-10 h-28 w-28 rounded-full bg-slate-50 group-hover:bg-red-50/10 blur-2xl transition-colors duration-300" />

                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between border-b border-slate-50 pb-4 mb-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-[#D64238] transition-transform group-hover:scale-105">
                            <Building2 className="h-5 w-5" />
                          </div>
                          <div>
                            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                              {os.outletName}
                            </h2>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] font-extrabold uppercase bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded-md border border-slate-100/50">
                                {os.outletCode}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400">• Active</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {os.googleMapsUrl && (
                            <a 
                              href={os.googleMapsUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="inline-flex items-center justify-center h-8 w-8 text-slate-400 hover:text-[#D64238] bg-slate-50/60 hover:bg-red-50/50 rounded-xl border border-slate-100/50 transition-all select-none no-underline"
                              title="Google Maps"
                            >
                              <MapPin className="h-4 w-4" />
                            </a>
                          )}
                          
                          {/* Remove button visible only to admins */}
                          {isAdmin && (
                            <button
                              onClick={() => handleRemoveOutlet(os.outletId, os.outletName)}
                              className="inline-flex items-center justify-center h-8 w-8 text-slate-400 hover:text-rose-600 bg-slate-50/60 hover:bg-rose-50/50 rounded-xl border border-slate-100/50 transition-all select-none border-none"
                              title="Delete Outlet"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Card Metrics Grid */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-5 mb-5 select-none">
                        
                        {/* Customers */}
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Customers</span>
                          <span className="text-xl font-extrabold text-slate-800 block leading-tight">{os.totalCustomers}</span>
                          <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50/55 px-1.5 py-0.25 rounded-md mt-1 border border-emerald-100/30">
                            +{os.newCustomersThisMonth} this month
                          </span>
                        </div>

                        {/* Avg Rating */}
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Avg Rating</span>
                          <span className="text-xl font-extrabold block leading-tight text-amber-500 flex items-center gap-1">
                            {os.averageRating?.toFixed(1) ?? '—'}
                            <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400 mb-0.5" />
                          </span>
                          <span className="inline-block text-[10px] font-bold text-slate-400 mt-1">
                            {os.totalReviews} total reviews
                          </span>
                        </div>

                        {/* Visits */}
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Visits / Month</span>
                          <span className="text-xl font-extrabold text-slate-800 block leading-tight">{os.visitsThisMonth}</span>
                          <span className="inline-block text-[10px] font-bold text-slate-400 mt-1">
                            {os.totalVisits} lifetime visits
                          </span>
                        </div>

                        {/* At Risk */}
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">At Risk (30d+)</span>
                          <span className={`text-xl font-extrabold block leading-tight ${isRiskHigh ? 'text-[#D64238]' : 'text-slate-800'}`}>
                            {os.inactiveCustomers}
                          </span>
                          <span className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.25 rounded-md mt-1 border ${
                            isRiskHigh 
                              ? 'bg-rose-50/60 text-[#D64238] border-rose-100/40' 
                              : 'bg-slate-50 text-slate-400 border-slate-100/40'
                          }`}>
                            {isRiskHigh ? 'Needs Retention' : 'Perfect Health'}
                          </span>
                        </div>

                      </div>

                      {/* Rating Progress Bar component */}
                      <div className="mb-5 bg-slate-50/40 border border-slate-100/50 p-3 rounded-2xl">
                        <StarProgress rating={os.averageRating} />
                      </div>

                      {/* Upcoming Celebrations section */}
                      {(os.birthdaysThisMonth > 0 || os.anniversariesThisMonth > 0) && (
                        <div className="flex flex-wrap gap-2.5 mb-5 select-none">
                          {os.birthdaysThisMonth > 0 && (
                            <div className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-orange-700 bg-orange-50 border border-orange-100/50 px-2.5 py-1.5 rounded-xl">
                              <Cake className="h-3.5 w-3.5" />
                              <span>{os.birthdaysThisMonth} Birthday{os.birthdaysThisMonth > 1 ? 's' : ''}</span>
                            </div>
                          )}
                          {os.anniversariesThisMonth > 0 && (
                            <div className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-blue-700 bg-blue-50 border border-blue-100/50 px-2.5 py-1.5 rounded-xl">
                              <Heart className="h-3.5 w-3.5 fill-blue-700/10" />
                              <span>{os.anniversariesThisMonth} Anniversary{os.anniversariesThisMonth > 1 ? 's' : ''}</span>
                            </div>
                          )}
                        </div>
                      )}

                    </div>

                    {/* Bottom Actions Row */}
                    <div className="mt-4 pt-4 border-t border-slate-100/60 flex items-center justify-between gap-3">
                      <Link href={`/outlets/${os.outletId}`} className="flex-1 no-underline">
                        <button className="w-full h-9 flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow border-none cursor-pointer">
                          <span>Full Dashboard</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </Link>

                      <div className="flex gap-2">
                        <Link href={`/customers?outletId=${os.outletId}`} className="no-underline">
                          <button className="h-9 px-3.5 bg-slate-50 border border-slate-100/70 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all cursor-pointer">
                            Customers
                          </button>
                        </Link>
                        <Link href={`/reviews?outletId=${os.outletId}`} className="no-underline">
                          <button className="h-9 px-3.5 bg-slate-50 border border-slate-100/70 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all cursor-pointer">
                            Reviews
                          </button>
                        </Link>
                      </div>
                    </div>

                  </div>
                )
              })}

              {/* 3. Dotted Add New Outlet Card (Admin only) */}
              {isAdmin && (
                <div 
                  onClick={() => setShowAddModal(true)}
                  className="group relative overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 hover:border-[#D64238] bg-slate-50/20 hover:bg-red-50/5 p-6 flex flex-col items-center justify-center min-h-[340px] cursor-pointer transition-all duration-300 select-none shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-md"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white group-hover:bg-[#D64238] group-hover:text-white text-slate-400 border border-slate-100 transition-all duration-300 mb-4 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)]">
                    <Plus className="h-6 w-6 transition-transform group-hover:rotate-90 duration-300" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-[#D64238] transition-colors">
                    Add New Outlet
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-400 text-center max-w-[200px] mt-1">
                    Expand brand footprint and establish a new franchise branch
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* ── Add Outlet Dialog Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="bg-white border border-slate-100 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#D64238]">
                  <Building2 className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">New Franchise Outlet</h3>
                  <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Establish database configurations, menus and auth logins</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors border-none"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleAddOutlet} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Row 1: Split into Branch Info (Left) and Owner Auth (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* Column A: Outlet Settings */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D64238] flex items-center gap-1.5 mb-1">
                    <Globe className="h-3.5 w-3.5" />
                    <span>Branch Details</span>
                  </h4>

                  {/* Outlet Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Outlet Name *</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="Enter new outlet name" 
                      required
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  {/* Code & Slug row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Unique Code *</label>
                      <input 
                        type="text" 
                        className="input" 
                        placeholder="e.g. VSI" 
                        required
                        maxLength={10}
                        value={formData.code}
                        onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">URL Slug *</label>
                      <input 
                        type="text" 
                        className="input" 
                        placeholder="e.g. vasai" 
                        required
                        value={formData.slug}
                        onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Location & Address */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Location Header *</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="e.g. Vasai West, Palghar" 
                      required
                      value={formData.location}
                      onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Physical Address</label>
                    <textarea 
                      className="input" 
                      style={{ minHeight: 60, resize: 'none' }}
                      placeholder="e.g. Shop 3, Riddhi Plaza, Vasai West 401202"
                      value={formData.address}
                      onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Column B: Franchise Owner Auth */}
                <div className="space-y-4 bg-slate-50/50 border border-slate-100 p-4 rounded-2xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 mb-1">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Franchise Owner Account</span>
                  </h4>

                  {/* Owner Full Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Owner Full Name</label>
                    <input 
                      type="text" 
                      className="input bg-white" 
                      placeholder="Enter owner full name" 
                      value={formData.ownerName}
                      onChange={e => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Login Email</label>
                    <input 
                      type="email" 
                      className="input bg-white" 
                      placeholder="e.g. vasai@napkiq.com" 
                      value={formData.ownerEmail}
                      onChange={e => setFormData(prev => ({ ...prev, ownerEmail: e.target.value }))}
                    />
                  </div>

                  {/* Username & Password */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Username</label>
                      <input 
                        type="text" 
                        className="input bg-white" 
                        placeholder="e.g. vsiowner" 
                        value={formData.ownerUsername}
                        onChange={e => setFormData(prev => ({ ...prev, ownerUsername: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Password</label>
                      <input 
                        type="password" 
                        className="input bg-white" 
                        placeholder="••••••••" 
                        value={formData.ownerPassword}
                        onChange={e => setFormData(prev => ({ ...prev, ownerPassword: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Phone Number</label>
                    <input 
                      type="text" 
                      className="input bg-white" 
                      placeholder="e.g. +919876543210" 
                      value={formData.ownerPhone}
                      onChange={e => setFormData(prev => ({ ...prev, ownerPhone: e.target.value }))}
                    />
                  </div>
                </div>

              </div>

              <div className="border-t border-slate-100/80 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Google Place ID & Social integrations</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Google Place ID *</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="e.g. vasai_place_id" 
                      required
                      value={formData.googlePlaceId}
                      onChange={e => setFormData(prev => ({ ...prev, googlePlaceId: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Google Maps Link</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="e.g. https://maps.app.goo.gl/..." 
                      value={formData.googleMapsUrl}
                      onChange={e => setFormData(prev => ({ ...prev, googleMapsUrl: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Instagram Url</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="https://instagram.com/..." 
                      value={formData.instagramUrl}
                      onChange={e => setFormData(prev => ({ ...prev, instagramUrl: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Facebook Url</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="https://facebook.com/..." 
                      value={formData.facebookUrl}
                      onChange={e => setFormData(prev => ({ ...prev, facebookUrl: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Convenience seed note */}
              <div className="rounded-2xl bg-amber-50/50 border border-amber-100/40 p-4 flex gap-3 text-xs text-amber-800">
                <Sparkles className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <div>
                  <span className="font-bold">Convenience Seed Feature:</span> When you create this outlet, the system will **automatically clone** the entire Boisar menu structure (all categories, items, variant models, diets and descriptions) into this branch as a startup catalog!
                </div>
              </div>

              {/* Modal Actions */}
              <div className="border-t border-slate-100 pt-5 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="h-10 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={savingOutlet}
                  className="h-10 px-6 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition-all shadow-md border-none cursor-pointer"
                >
                  {savingOutlet ? 'Creating Outlet...' : 'Establish Outlet'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}
