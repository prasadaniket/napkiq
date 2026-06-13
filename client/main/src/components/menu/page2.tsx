'use client'

import { useState } from 'react'
import { vasaiMenu, type MenuEntry } from './vasaimenu'

function groupByCategory(items: MenuEntry[]): Record<string, MenuEntry[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, MenuEntry[]>)
}

function formatPrice(item: MenuEntry): string {
  if (item.price !== null) return `₹${item.price}`
  if (item.priceVariants) {
    return Object.entries(item.priceVariants)
      .map(([k, v]) => `${k}: ₹${v}`)
      .join(' | ')
  }
  return ''
}

export default function VasaiMenuPage() {
  const [vegOnly, setVegOnly] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = vasaiMenu.filter((item) => {
    const matchesVeg = !vegOnly || item.isVeg
    const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase())
    return matchesVeg && matchesSearch
  })

  const grouped = groupByCategory(filtered)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-secondary mb-1">Napkiq Vasai</h1>
        <p className="text-sm text-secondary-light">Menu</p>
      </div>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search menu..."
          className="flex-1 px-4 py-2 border border-neutral-light rounded-lg text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-[#E88C3A]"
        />
        <button
          onClick={() => setVegOnly(!vegOnly)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            vegOnly
              ? 'bg-success text-white border-success'
              : 'bg-white text-secondary border-neutral-light'
          }`}
        >
          🟢 Veg
        </button>
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-6">
          <div className="accent-tint-primary px-4 py-2 rounded-lg mb-2">
            <h3 className="font-bold text-gradient-primary text-base">{category}</h3>
            <p className="text-xs text-secondary-light">{items.length} items</p>
          </div>
          <div className="bg-white rounded-xl px-4 shadow-sm">
            {items.map((item, idx) => (
              <div key={item.id} className={`flex items-start justify-between py-3 ${idx < items.length - 1 ? 'border-b border-neutral-light' : ''}`}>
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <span className="text-base mt-0.5">{item.isVeg ? '🟢' : '🔴'}</span>
                  <p className="font-medium text-secondary text-sm">{item.name}</p>
                </div>
                <p className="text-sm font-bold text-gradient-primary ml-4 shrink-0">{formatPrice(item)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
