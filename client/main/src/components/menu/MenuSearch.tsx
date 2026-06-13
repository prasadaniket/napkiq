'use client'

import { motion } from 'framer-motion'

interface MenuSearchProps {
  value: string
  onChange: (v: string) => void
  vegOnly: boolean
  onVegToggle: () => void
}

export default function MenuSearch({ value, onChange, vegOnly, onVegToggle }: MenuSearchProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full p-2">
      {/* Premium rounded input bar with search magnifying glass */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search for delicious dishes, soups, momos..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 pl-11 pr-4 bg-neutral-50/80 border border-neutral-200/80 rounded-xl text-[14px] text-[#1c1917] outline-none transition-all duration-300 placeholder:text-neutral-400 focus:border-[#D64238]/60 focus:bg-white focus:shadow-sm"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
      </div>

      {/* Tactile Veg Toggle (Swiggy/Zomato style) */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onVegToggle}
        type="button"
        className={`flex items-center justify-center gap-2 h-11 px-4 rounded-xl border font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
          vegOnly
            ? 'border-emerald-600/20 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-600/5'
            : 'border-neutral-200 bg-white text-neutral-500 hover:border-emerald-500/40 hover:text-emerald-600'
        }`}
      >
        <span className={`inline-flex items-center justify-center w-[12px] h-[12px] border-2 rounded-sm p-[1.5px] bg-white transition-all duration-300 ${
          vegOnly ? 'border-emerald-600' : 'border-neutral-300'
        }`}>
          <span className={`w-[5px] h-[5px] rounded-full transition-transform duration-300 ${
            vegOnly ? 'bg-emerald-600 scale-100' : 'bg-transparent scale-0'
          }`} />
        </span>
        Veg Only
      </motion.button>
    </div>
  )
}
