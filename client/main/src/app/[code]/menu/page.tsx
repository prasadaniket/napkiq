'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { api } from '@/lib/api'
import { outletConfig } from '@/lib/outletConfig'
import type { MenuItem, MenuCategory } from '@/types/menu'
import MenuSearch from '@/components/menu/MenuSearch'
import MenuCategorySection from '@/components/menu/MenuCategorySection'
import Loader from '@/components/ui/Loader'
import toast from 'react-hot-toast'

interface MenuGroup {
  category: MenuCategory
  items: MenuItem[]
}

const lightThemeStyle = { background: '#faf9f6' }

function MenuComingSoon({ outletName, onBack }: { outletName: string; onBack: () => void }) {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={lightThemeStyle}
    >
      <motion.div
        className="absolute top-[10%] left-1/2 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ x: '-50%', background: 'radial-gradient(circle, rgba(214,66,56,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.06, 1], x: ['-50%', '-48%', '-52%', '-50%'], y: [0, 10, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm flex flex-col items-center text-center p-8 bg-white border border-neutral-100 rounded-3xl shadow-sm"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-rose-50 border border-rose-100 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D64238" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
            <line x1="6" y1="1" x2="6" y2="4"/>
            <line x1="10" y1="1" x2="10" y2="4"/>
            <line x1="14" y1="1" x2="14" y2="4"/>
          </svg>
        </motion.div>

        <motion.h2 className="font-serif font-extrabold text-xl text-[#1c1917] mb-2 tracking-tight">
          Menu Coming Soon
        </motion.h2>

        <motion.p className="text-neutral-500 text-xs leading-relaxed mb-1">
          We're preparing something delicious for
        </motion.p>
        <motion.p className="text-[#D64238] text-sm font-bold mb-8">
          {outletName}. Stay tuned!
        </motion.p>

        <motion.button
          whileHover={{ y: -1, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 bg-[#00021D] text-white hover:bg-[#0a0f3d] shadow-sm hover:shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Outlet
        </motion.button>
      </motion.div>
    </div>
  )
}

export default function MenuPage() {
  const params = useParams()
  const router = useRouter()
  const code = params.code as string
  const config = outletConfig[code]

  const [menuGroups, setMenuGroups] = useState<MenuGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [vegOnly, setVegOnly] = useState(false)

  // Interactive Swiggy/Zomato Cart State
  const [cart, setCart] = useState<Record<string, { item: MenuItem; quantity: number }>>({})
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Dining Concept States (McDonald's Board & Table vs Self Service)
  const [serviceType, setServiceType] = useState<'table' | 'self'>('table')
  const [boardNumber, setBoardNumber] = useState('')

  useEffect(() => {
    if (config) {
      document.title = `Menu — ${config.name} | Napkiq`
    }
    if (!config?.hasMenu) {
      setLoading(false)
      return
    }
    api.get<MenuCategory[]>(`/menu/outlet/${code}`)
      .then((res) => {
        const groups: MenuGroup[] = res.data.map(cat => ({
          category: cat,
          items: cat.items || []
        }))
        setMenuGroups(groups)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [code, config?.hasMenu])

  const getItemPrice = (item: MenuItem): number => {
    if (item.priceVariants) {
      const prices = Object.values(item.priceVariants)
      return Math.min(...prices)
    }
    return item.price ? parseFloat(String(item.price)) : 0
  }

  const updateQuantity = (item: MenuItem, change: number) => {
    setCart(prev => {
      const current = prev[item.id]
      const nextQty = (current?.quantity || 0) + change
      if (nextQty <= 0) {
        const { [item.id]: removed, ...rest } = prev
        return rest
      }
      return {
        ...prev,
        [item.id]: { item, quantity: nextQty }
      }
    })
  }

  const clearCart = () => {
    setCart({})
    setIsCartOpen(false)
    toast.success('Cart cleared')
  }

  const handleCheckoutClick = () => {
    if (serviceType === 'table' && !boardNumber.trim()) {
      toast.error('🔢 Please enter your Board Number first!', {
        duration: 3500,
        style: {
          background: '#dc2626',
          color: '#ffffff',
          borderRadius: '16px',
          fontSize: '13px',
          fontWeight: '600',
        }
      })
      return
    }

    const message = serviceType === 'table'
      ? `🛎️ Table Service requested! Waiter will bring plates to Board #${boardNumber}.`
      : '🥡 Self Service selected! Collect plate from the counter.'

    toast.success(`🛒 Order Placed! ${message} (Soon in next update)`, {
      icon: '✨',
      duration: 5000,
      style: {
        background: '#00021D',
        color: '#ffffff',
        borderRadius: '16px',
        fontSize: '13px',
        fontWeight: '600',
        border: '1px solid rgba(255,255,255,0.1)',
      }
    })
    setIsCartOpen(false)
  }

  // Derived Cart stats
  const totalCartItems = Object.values(cart).reduce((sum, entry) => sum + entry.quantity, 0)
  const totalCartPrice = Object.values(cart).reduce((sum, entry) => sum + (entry.quantity * getItemPrice(entry.item)), 0)

  if (!config?.hasMenu) {
    return (
      <MenuComingSoon
        outletName={config?.name ?? 'this outlet'}
        onBack={() => router.back()}
      />
    )
  }

  const filteredGroups = menuGroups.map((g) => ({
    ...g,
    items: g.items.filter((item) => {
      const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase())
      const matchesVeg = !vegOnly || item.isVeg
      return matchesSearch && matchesVeg
    }),
  }))

  return (
    <div
      id="menu-page"
      className="relative min-h-screen flex flex-col items-center pt-8 px-4 overflow-x-hidden pb-24"
      style={lightThemeStyle}
    >
      {/* Decorative floating blur orb (Top Right) */}
      <motion.div
        className="fixed top-[-5%] right-[-10%] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(214,66,56,0.04) 0%, transparent 75%)', filter: 'blur(50px)' }}
        animate={{ scale: [1, 1.05, 1], x: [0, 15, -15, 0], y: [0, 10, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Decorative floating blur orb (Bottom Left) */}
      <motion.div
        className="fixed bottom-[-10%] left-[-15%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,147,0,0.03) 0%, transparent 75%)', filter: 'blur(50px)' }}
        animate={{ scale: [1, 1.08, 1], x: [0, -10, 10, 0], y: [0, -15, 15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: -5 }}
      />

      <main id="menu-main" className="relative z-10 flex-1 w-full max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col">

        {/* Brand Header */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center pt-2 mb-8"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.04 }}
            className="rounded-full mb-3 relative group cursor-pointer"
            style={{ boxShadow: '0 8px 30px rgba(28,25,23,0.06), 0 0 0 4px rgba(255,255,255,0.8)' }}
          >
            <Avatar className="w-20 h-20 border-2 border-white" style={{ background: 'white' }}>
              <AvatarImage src="/images/logo/logo-circle.png" alt="Napkiq Restaurant" className="object-cover" />
              <AvatarFallback className="text-secondary text-xl font-bold bg-white text-[#D64238]">NQ</AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-500 text-[12.5px] text-center font-medium"
          >
            Authentic flavours, crafted with love
          </motion.p>
        </motion.div>

        {/* Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-4"
        >
          <Link href={`/${code}`} id="menu-back-btn" aria-label="Go back to outlet page">
            <motion.div
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-neutral-600 hover:text-[#D64238] transition-colors p-2 -ml-2 rounded-full cursor-pointer flex items-center justify-center bg-white border border-neutral-100/80 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </motion.div>
          </Link>
          <h2 className="text-xl font-serif font-extrabold text-[#1c1917] tracking-tight">
            Our Menu
          </h2>
        </motion.div>

        {/* Premium search bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 bg-white border border-neutral-100 rounded-2xl shadow-sm"
        >
          <MenuSearch value={search} onChange={setSearch} vegOnly={vegOnly} onVegToggle={() => setVegOnly(!vegOnly)} />
        </motion.div>

        {/* Sticky Horizontal Scrollbar */}
        {!loading && filteredGroups.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="sticky top-3 z-30 w-full overflow-x-auto scrollbar-none py-2 mb-6 flex gap-2 px-1 bg-[#faf9f6]/95 backdrop-blur-md border-b border-neutral-200/50"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {filteredGroups.map((g) => {
              if (g.items.length === 0) return null
              return (
                <button
                  key={g.category.id}
                  onClick={() => {
                    document.getElementById(`category-${g.category.id}`)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  type="button"
                  className="px-4 py-1.5 rounded-full text-[11px] font-bold bg-white text-neutral-600 border border-neutral-200/60 shadow-sm hover:border-[#D64238] hover:text-[#D64238] hover:shadow-md transition-all duration-300 whitespace-nowrap uppercase tracking-wider cursor-pointer"
                >
                  {g.category.name}
                </button>
              )
            })}
          </motion.div>
        )}

        {/* Menu items block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex-1"
        >
          {loading ? (
            <div className="flex justify-center py-12 w-full">
              <Loader />
            </div>
          ) : (
            <div className="space-y-8 pb-16">
              {filteredGroups.map((g) => {
                if (g.items.length === 0) return null
                return (
                  <div
                    key={g.category.id}
                    id={`category-${g.category.id}`}
                    className="scroll-mt-24 rounded-3xl p-6 bg-white border border-neutral-100 shadow-sm"
                  >
                    <MenuCategorySection
                      category={g.category}
                      items={g.items}
                      cart={cart}
                      onUpdateQuantity={updateQuantity}
                    />
                  </div>
                )
              })}
              
              {filteredGroups.every(g => g.items.length === 0) && (
                <div className="text-center py-16 text-neutral-400 text-[13.5px] font-medium bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm">
                  No items found matching your filters.
                </div>
              )}
            </div>
          )}
        </motion.div>
      </main>

      {/* ─── STICKY BOTTOM CART BAR (Zomato/Swiggy Style) ─── */}
      <AnimatePresence>
        {totalCartItems > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed bottom-6 left-4 right-4 z-40 max-w-sm md:max-w-md mx-auto rounded-2xl bg-[#00021D] border border-white/10 shadow-2xl p-4 flex items-center justify-between gap-4 text-white"
          >
            {/* Left Details */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-extrabold text-white/50 uppercase tracking-widest">
                Your Order
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold">
                  {totalCartItems} Item{totalCartItems !== 1 ? 's' : ''}
                </span>
                <span className="text-white/30 text-xs">|</span>
                <span className="text-sm font-extrabold text-emerald-400">
                  ₹{totalCartPrice}
                </span>
              </div>
            </div>

            {/* Right Action */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsCartOpen(true)}
              className="bg-emerald-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all duration-300 shadow-md shadow-emerald-500/10 cursor-pointer uppercase tracking-wider"
            >
              View Cart 🛒
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── INTERACTIVE CART DRAWER (Bottom Sheet) ─── */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-[#00021d]/30 backdrop-blur-md"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto bg-white rounded-t-[32px] shadow-2xl border-t border-neutral-100 p-6 flex flex-col gap-6 overflow-y-auto max-h-[90vh]"
            >
              {/* Drawer Handle */}
              <div className="w-12 h-1 bg-neutral-200 rounded-full mx-auto -mt-2 cursor-pointer" onClick={() => setIsCartOpen(false)} />

              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-extrabold text-lg text-[#1c1917] tracking-tight">Your Cart</h3>
                  <p className="text-xs text-neutral-400 font-medium">Napkiq Order Summary</p>
                </div>
                <button
                  onClick={clearCart}
                  type="button"
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Items List */}
              <div className="overflow-y-auto max-h-[150px] divide-y divide-neutral-100 pr-1">
                {Object.values(cart).map(({ item, quantity }) => (
                  <div key={item.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-sm text-[#1c1917]">{item.name}</span>
                      <span className="text-[11px] font-bold text-[#D64238]">₹{getItemPrice(item)}</span>
                    </div>

                    {/* Quantity selectors inside drawer */}
                    <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl flex items-center justify-between h-[30px] w-[80px] text-emerald-600 font-extrabold text-[11px]">
                      <button
                        onClick={() => updateQuantity(item, -1)}
                        className="w-7 h-full flex items-center justify-center hover:bg-neutral-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center text-[#1c1917] font-extrabold">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item, 1)}
                        className="w-7 h-full flex items-center justify-center hover:bg-neutral-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* McDonald's Number Board & Service Selection System */}
              <div className="border-t border-neutral-100 pt-4 flex flex-col gap-3">
                <label className="text-[11px] font-extrabold text-[#1c1917] uppercase tracking-wider">
                  Dining Option
                </label>

                {/* Segmented Pill Selector */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setServiceType('table')}
                    className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 text-center transition-all duration-300 cursor-pointer ${
                      serviceType === 'table'
                        ? 'border-[#D64238] bg-rose-50/20 text-[#D64238]'
                        : 'border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-base">🛎️</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-extrabold uppercase tracking-wider">Table Service</span>
                      <span className="text-[9px] text-neutral-400 font-medium mt-0.5">We bring food to you</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('self')}
                    className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 text-center transition-all duration-300 cursor-pointer ${
                      serviceType === 'self'
                        ? 'border-[#D64238] bg-rose-50/20 text-[#D64238]'
                        : 'border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-base">🥡</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-extrabold uppercase tracking-wider">Self Service</span>
                      <span className="text-[9px] text-neutral-400 font-medium mt-0.5">Collect at counter</span>
                    </div>
                  </button>
                </div>

                {/* Conditional Board Input Box (Smooth Slide Down) */}
                <AnimatePresence initial={false}>
                  {serviceType === 'table' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 4 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden flex flex-col gap-2"
                    >
                      <div className="bg-amber-50/40 border border-amber-200/80 rounded-2xl p-4 flex flex-col gap-3">
                        <div className="flex items-start gap-2.5">
                          <span className="text-base mt-0.5">🔢</span>
                          <div className="flex-1">
                            <h4 className="text-[12px] font-extrabold text-amber-800 uppercase tracking-wider">Table Board System</h4>
                            <p className="text-[10px] text-amber-700/80 leading-normal mt-0.5 font-medium">
                              Grab a physical number board from the counter and input its number below. Our waiters will locate you directly.
                            </p>
                          </div>
                        </div>
                        <input
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          placeholder="Enter Board Number (e.g. 15)"
                          value={boardNumber}
                          onChange={e => setBoardNumber(e.target.value)}
                          className="w-full h-11 px-4 bg-white border border-amber-200 rounded-xl text-[14px] text-[#1c1917] outline-none font-bold placeholder:text-neutral-400 placeholder:font-normal focus:border-amber-500 focus:shadow-sm"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Teaser Coupon Banner */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3.5 flex items-start gap-3">
                <span className="text-lg">🎁</span>
                <div>
                  <h4 className="text-[12px] font-extrabold text-emerald-800">Table Order Integrated!</h4>
                  <p className="text-[10px] text-emerald-600/80 leading-normal mt-0.5 font-medium">You will be able to order directly from your table and checkout on your phone in the next update.</p>
                </div>
              </div>

              {/* Summary Totals */}
              <div className="flex justify-between items-center border-t border-neutral-100 pt-4">
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400 font-medium">Grand Total</span>
                  <span className="font-extrabold text-xl text-[#D64238]">₹{totalCartPrice}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckoutClick}
                  className="bg-[#00021D] hover:bg-[#0a0f3d] text-white font-extrabold text-xs uppercase tracking-wider px-6 h-12 rounded-xl shadow-lg transition-all duration-300 cursor-pointer"
                >
                  Pay & Order (Soon)
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 w-full text-center pb-8 pt-4 text-neutral-300 text-[10px] tracking-widest font-bold uppercase"
      >
        © 2026 UniCord · Powered by Napkiq
      </motion.div>
    </div>
  )
}
