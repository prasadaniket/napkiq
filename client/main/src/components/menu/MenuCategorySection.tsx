import type { MenuItem, MenuCategory } from '@/types/menu'
import MenuItemCard from './MenuItemCard'

interface MenuCategorySectionProps {
  category: MenuCategory
  items: MenuItem[]
  cart: Record<string, { item: MenuItem; quantity: number }>
  onUpdateQuantity: (item: MenuItem, change: number) => void
}

export default function MenuCategorySection({ category, items, cart, onUpdateQuantity }: MenuCategorySectionProps) {
  if (items.length === 0) return null

  return (
    <div className="mb-6">
      <div className="accent-tint-primary px-4 py-2 rounded-lg mb-2">
        <h3 className="font-bold text-gradient-primary text-base">{category.name}</h3>
        <p className="text-xs text-secondary-light">{items.length} items</p>
      </div>
      <div className="bg-white rounded-xl px-4 shadow-sm">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            quantity={cart[item.id]?.quantity || 0}
            onUpdateQuantity={(change) => onUpdateQuantity(item, change)}
          />
        ))}
      </div>
    </div>
  )
}
