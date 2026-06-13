'use client'

import { useState } from 'react'
import { boisarMenuData, type BoisarMenuItem } from './boisarmenu'

function getVariants(type: string): string[] {
  return type.split('/')
}

function formatPrice(prices: number[], type: string): string {
  const variants = getVariants(type)
  const labelMap: Record<string, string> = { veg: 'V', nonVeg: 'NV', seafood: 'SF' }

  if (prices.length === 1) return `₹${prices[0]}`
  if (variants.length === prices.length && variants.length > 1) {
    return variants.map((v, i) => `${labelMap[v] ?? v}: ₹${prices[i]}`).join(' | ')
  }
  return prices.map((p) => `₹${p}`).join(' / ')
}

export default function BoisarMenuPage() {
  const [vegOnly, setVegOnly] = useState(false)
  const [search, setSearch] = useState('')

  const filteredData = boisarMenuData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item: BoisarMenuItem) => {
        const matchesVeg = !vegOnly || getVariants(item.type).includes('veg')
        const matchesSearch =
          !search || item.name.toLowerCase().includes(search.toLowerCase())
        return matchesVeg && matchesSearch
      }),
    }))
    .filter((cat) => cat.items.length > 0)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-secondary mb-1">Napkiq Boisar</h1>
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

      {filteredData.map(({ category, items }) => (
        <div key={category} className="mb-6">
          <div className="accent-tint-primary px-4 py-2 rounded-lg mb-2">
            <h3 className="font-bold text-gradient-primary text-base">{category}</h3>
            <p className="text-xs text-secondary-light">{items.length} items</p>
          </div>
          <div className="bg-white rounded-xl px-4 shadow-sm">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-start justify-between py-3 ${
                  idx < items.length - 1 ? 'border-b border-neutral-light' : ''
                }`}
              >
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <span className="text-base mt-0.5">
                    {getVariants(item.type).includes('veg') ? '🟢' : '🔴'}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-secondary text-sm">{item.name}</p>
                    {item.options && (
                      <p className="text-xs text-secondary-light mt-0.5">
                        {item.options.join(' · ')}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm font-bold text-gradient-primary ml-4 shrink-0 text-right">
                  {formatPrice(item.prices, item.type)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
