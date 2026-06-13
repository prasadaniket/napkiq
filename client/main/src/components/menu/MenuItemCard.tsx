'use client'

import { motion } from 'framer-motion'
import type { MenuItem } from '@/types/menu'

interface MenuItemCardProps {
  item: MenuItem
  quantity: number
  onUpdateQuantity: (change: number) => void
}

// Iconic FSSAI Indian diet indicator badges (Swiggy / Zomato style)
const VegIcon = () => (
  <span className="inline-flex items-center justify-center w-[14px] h-[14px] border-2 border-emerald-600 p-[2px] rounded-sm flex-shrink-0 bg-white" title="Vegetarian">
    <span className="w-[6px] h-[6px] rounded-full bg-emerald-600" />
  </span>
)

const NonVegIcon = () => (
  <span className="inline-flex items-center justify-center w-[14px] h-[14px] border-2 border-rose-600 p-[2px] rounded-sm flex-shrink-0 bg-white" title="Non-Vegetarian">
    <span className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-rose-600" />
  </span>
)

export default function MenuItemCard({ item, quantity, onUpdateQuantity }: MenuItemCardProps) {
  // Get base/lowest price or display range
  const getBasePrice = () => {
    if (item.priceVariants) {
      const prices = Object.values(item.priceVariants)
      const min = Math.min(...prices)
      return { price: `₹${min}`, isRange: true }
    }
    if (item.price === null || item.price === undefined) {
      return { price: '—', isRange: false }
    }
    const numPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price
    return { price: !isNaN(numPrice) ? `₹${numPrice.toFixed(0)}` : '—', isRange: false }
  }

  const { price: basePrice, isRange } = getBasePrice()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
      className="flex items-stretch justify-between py-6 border-b border-neutral-100 last:border-0 hover:bg-neutral-50/30 px-2 rounded-xl transition-all duration-300 gap-4"
    >
      {/* Left Details block */}
      <div className="flex-1 flex flex-col justify-between min-w-0 pr-2">
        <div className="flex flex-col gap-1.5">
          {/* FSSAI Diet Icon */}
          <div className="flex items-center gap-2">
            {item.isVeg ? <VegIcon /> : <NonVegIcon />}
            {item.isVeg ? (
              <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">Veg</span>
            ) : (
              <span className="text-[10px] font-bold text-rose-700 tracking-wider uppercase">Non-Veg</span>
            )}
          </div>

          {/* Dish Name */}
          <h4 className="font-extrabold text-[#1c1917] text-[15px] md:text-base leading-snug tracking-tight">
            {item.name}
          </h4>

          {/* Clean Price display */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[15px] font-extrabold text-[#D64238]">
              {basePrice}
            </span>
            {isRange && (
              <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                Onwards
              </span>
            )}
          </div>

          {/* Dish Description */}
          {item.description && (
            <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed line-clamp-2 md:line-clamp-3">
              {item.description}
            </p>
          )}
        </div>

        {/* Pricing variants tags if present */}
        {item.priceVariants && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {Object.entries(item.priceVariants).map(([vName, vPrice]) => (
              <span 
                key={vName}
                className="text-[9.5px] font-bold text-neutral-600 bg-neutral-100/70 border border-neutral-200/50 px-2 py-0.5 rounded-full capitalize"
              >
                {vName}: ₹{vPrice}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right Image / Add Button container */}
      <div className="flex-shrink-0 flex items-center justify-center relative w-[100px] h-[100px] md:w-[115px] md:h-[115px] ml-2">
        {item.imageUrl ? (
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm border border-neutral-200/60 relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Soft inner shadow for photos */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="w-full h-full rounded-2xl bg-neutral-50 border border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-300 gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span className="text-[8px] font-bold uppercase tracking-wider text-neutral-400">Napkiq</span>
          </div>
        )}

        {/* Floating Add / Quantity Selector Button Overlay (Centered perfectly via flex wrapper to avoid Framer translate bug) */}
        {quantity > 0 ? (
          <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center pointer-events-none">
            <div className="pointer-events-auto bg-white border border-neutral-200/80 shadow-md rounded-xl flex items-center justify-between overflow-hidden h-[34px] w-[88px] text-emerald-600 font-extrabold text-[12px]">
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => onUpdateQuantity(-1)}
                type="button"
                className="w-8 h-full flex items-center justify-center hover:bg-neutral-50 active:bg-neutral-100 transition-colors cursor-pointer"
              >
                -
              </motion.button>
              <span className="flex-1 text-center select-none text-[#1c1917] font-extrabold text-[12.5px]">
                {quantity}
              </span>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => onUpdateQuantity(1)}
                type="button"
                className="w-8 h-full flex items-center justify-center hover:bg-neutral-50 active:bg-neutral-100 transition-colors cursor-pointer"
              >
                +
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.04, y: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onUpdateQuantity(1)}
              type="button"
              className="pointer-events-auto bg-white text-emerald-600 font-extrabold text-[11px] px-6 py-2 rounded-xl border border-neutral-200/80 shadow-md hover:shadow-lg flex items-center gap-1 transition-all duration-300 tracking-wide uppercase cursor-pointer"
            >
              Add
              <span className="text-emerald-500 text-[10px] font-bold">+</span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
