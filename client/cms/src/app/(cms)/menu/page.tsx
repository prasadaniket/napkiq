'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { api } from '@/lib/api'
import type { MenuCategory, MenuItem, Outlet } from '@/types/api'
import toast from 'react-hot-toast'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function priceDisplay(item: MenuItem): string {
  if (item.priceVariants) {
    return Object.entries(item.priceVariants)
      .map(([k, v]) => `${k}: ₹${v}`)
      .join(' | ')
  }
  return item.price ? `₹${parseFloat(item.price).toFixed(0)}` : '—'
}

// ─── Inline Text Edit ───

function InlineEdit({ value, placeholder = '', onSave, style }: {
  value: string
  placeholder?: string
  onSave: (v: string) => void
  style?: React.CSSProperties
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => { if (editing) ref.current?.select() }, [editing])

  const commit = () => {
    const trimmed = draft.trim()
    if (trimmed !== value) onSave(trimmed)
    setEditing(false)
  }

  if (!editing) {
    const display = value || placeholder
    return (
      <span
        onClick={() => { setDraft(value); setEditing(true) }}
        title="Click to edit"
        style={{
          cursor: 'text',
          borderBottom: '1px dashed rgba(28,25,23,0.15)',
          paddingBottom: 1,
          transition: 'color 0.2s',
          ...style
        }}
        className="inline-edit-trigger"
      >
        {display}
      </span>
    )
  }

  return (
    <input
      ref={ref}
      value={draft}
      onChange={e => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(value); setEditing(false) } }}
      className="input"
      style={{ padding: '2px 8px', fontSize: 'inherit', width: '100%', ...style }}
    />
  )
}

// ─── Price Edit Modal ───

function PriceEditModal({ item, onClose, onSave }: {
  item: MenuItem
  onClose: () => void
  onSave: (price: number | null, variants: Record<string, number> | null) => void
}) {
  const hasVariants = !!item.priceVariants
  const [mode, setMode] = useState<'single' | 'variants'>(hasVariants ? 'variants' : 'single')
  const [single, setSingle] = useState(item.price ? parseFloat(item.price).toFixed(0) : '')
  const [variants, setVariants] = useState<{ key: string; val: string }[]>(
    hasVariants
      ? Object.entries(item.priceVariants!).map(([k, v]) => ({ key: k, val: String(v) }))
      : [{ key: 'veg', val: '' }, { key: 'nonVeg', val: '' }]
  )

  const handleSave = () => {
    if (mode === 'single') {
      const p = parseFloat(single)
      if (isNaN(p) || p <= 0) {
        toast.error('Please enter a valid price')
        return
      }
      onSave(p, null)
    } else {
      const obj: Record<string, number> = {}
      for (const { key, val } of variants) {
        const n = parseFloat(val)
        if (!key.trim() || isNaN(n)) {
          toast.error('Please check your variants and prices')
          return
        }
        obj[key.trim()] = n
      }
      onSave(null, obj)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card animate-appear" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Edit Price — {item.name}</h3>
          <p className="modal-subtitle">Adjust item pricing models</p>
        </div>

        <div className="tab-group">
          {(['single', 'variants'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`tab-btn ${mode === m ? 'tab-btn-active' : ''}`}
            >
              {m === 'single' ? 'Single Price' : 'Multiple Variants'}
            </button>
          ))}
        </div>

        {mode === 'single' ? (
          <div className="form-group">
            <label className="form-label">Price (₹)</label>
            <div className="input-wrap">
              <input
                className="input"
                type="number"
                min="1"
                value={single}
                onChange={e => setSingle(e.target.value)}
                placeholder="e.g. 249"
                autoFocus
              />
            </div>
          </div>
        ) : (
          <div className="variants-list">
            <label className="form-label">Price Variants</label>
            {variants.map((v, i) => (
              <div key={i} className="variant-row">
                <input
                  className="input"
                  value={v.key}
                  onChange={e => setVariants(vs => vs.map((x, j) => j === i ? { ...x, key: e.target.value } : x))}
                  style={{ width: 120, fontSize: 13 }}
                  placeholder="e.g. Regular / Large"
                />
                <input
                  className="input"
                  type="number"
                  min="1"
                  value={v.val}
                  onChange={e => setVariants(vs => vs.map((x, j) => j === i ? { ...x, val: e.target.value } : x))}
                  style={{ flex: 1, fontSize: 13 }}
                  placeholder="₹ Price"
                />
                <button
                  type="button"
                  onClick={() => setVariants(vs => vs.filter((_, j) => j !== i))}
                  className="variant-remove-btn"
                  title="Remove variant"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setVariants(vs => [...vs, { key: '', val: '' }])}
              className="btn-ghost"
              style={{ fontSize: 12, padding: '6px 12px', alignSelf: 'flex-start', borderStyle: 'dashed' }}
            >
              + Add Variant
            </button>
          </div>
        )}

        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

// ─── Add Item Form ───

function AddItemForm({ categoryId, onAdded, onCancel }: {
  categoryId: string
  onAdded: (item: MenuItem) => void
  onCancel: () => void
}) {
  const [name, setName]     = useState('')
  const [price, setPrice]   = useState('')
  const [isVeg, setIsVeg]   = useState(true)
  const [saving, setSaving] = useState(false)

  const submit = async () => {
    if (!name.trim() || !price.trim()) return
    setSaving(true)
    try {
      const res = await api.post<MenuItem>('/cms/menu/items', {
        categoryId, name: name.trim(),
        price: parseFloat(price), isVeg,
      })
      onAdded(res.data)
      toast.success(`Added "${res.data.name}" successfully!`)
    } catch {
      toast.error('Failed to add item')
    } finally { setSaving(false) }
  }

  return (
    <div className="add-item-drawer">
      <div className="add-item-grid">
        <div style={{ flex: 1, minWidth: 180 }}>
          <label className="form-label" style={{ fontSize: 11, marginBottom: 4 }}>Item Name</label>
          <input
            className="input"
            placeholder="e.g. Butter Garlic Naan"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ fontSize: 13, height: 38 }}
            autoFocus
          />
        </div>
        <div style={{ width: 110 }}>
          <label className="form-label" style={{ fontSize: 11, marginBottom: 4 }}>Price (₹)</label>
          <input
            className="input"
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            style={{ fontSize: 13, height: 38 }}
          />
        </div>
        <div style={{ width: 110 }}>
          <label className="form-label" style={{ fontSize: 11, marginBottom: 4 }}>Diet Type</label>
          <select
            className="input"
            value={isVeg ? 'veg' : 'nonveg'}
            onChange={e => setIsVeg(e.target.value === 'veg')}
            style={{ fontSize: 13, height: 38, padding: '0 8px' }}
          >
            <option value="veg">🟢 Veg</option>
            <option value="nonveg">🔴 Non-Veg</option>
          </select>
        </div>
      </div>
      <div className="add-item-actions">
        <button className="btn-ghost" onClick={onCancel} style={{ fontSize: 13 }}>Cancel</button>
        <button
          className="btn-primary"
          onClick={submit}
          disabled={saving || !name.trim() || !price.trim()}
          style={{ fontSize: 13 }}
        >
          {saving ? 'Adding…' : 'Create Item'}
        </button>
      </div>
    </div>
  )
}

// ─── Category Card Accordion ───

function CategoryCard({ cat, onUpdate, onDelete }: {
  cat: MenuCategory
  onUpdate: (updated: MenuCategory) => void
  onDelete: (id: string) => void
}) {
  const [collapsed, setCollapsed]   = useState(false)
  const [addingItem, setAddingItem] = useState(false)
  const [priceItem, setPriceItem]   = useState<MenuItem | null>(null)
  const [deleting, setDeleting]     = useState(false)
  const [uploadingItemIds, setUploadingItemIds] = useState<Record<string, boolean>>({})

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const triggerFileInput = (itemId: string) => {
    fileInputRefs.current[itemId]?.click()
  }

  const handleImageUpload = async (item: MenuItem, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit')
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    setUploadingItemIds(prev => ({ ...prev, [item.id]: true }))
    try {
      const res = await api.post<{ imageUrl: string }>(`/cms/menu/items/${item.id}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      onUpdate({
        ...cat,
        items: cat.items.map(i => i.id === item.id ? { ...i, imageUrl: res.data.imageUrl } : i)
      })
      toast.success(`Uploaded image for ${item.name}!`)
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to upload image')
    } finally {
      setUploadingItemIds(prev => ({ ...prev, [item.id]: false }))
    }
  }

  const handleImageRemove = async (item: MenuItem) => {
    if (!confirm(`Remove image for "${item.name}"?`)) return

    setUploadingItemIds(prev => ({ ...prev, [item.id]: true }))
    try {
      await api.delete(`/cms/menu/items/${item.id}/image`)
      onUpdate({
        ...cat,
        items: cat.items.map(i => i.id === item.id ? { ...i, imageUrl: null } : i)
      })
      toast.success(`Removed image for ${item.name}`)
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to remove image')
    } finally {
      setUploadingItemIds(prev => ({ ...prev, [item.id]: false }))
    }
  }

  const updateItemName = async (item: MenuItem, name: string) => {
    try {
      const res = await api.put<MenuItem>(`/cms/menu/items/${item.id}`, { name })
      onUpdate({ ...cat, items: cat.items.map(i => i.id === item.id ? res.data : i) })
      toast.success('Updated item name')
    } catch {
      toast.error('Failed to update item name')
    }
  }

  const updateItemDescription = async (item: MenuItem, description: string) => {
    try {
      const res = await api.put<MenuItem>(`/cms/menu/items/${item.id}`, { description: description.trim() || null })
      onUpdate({ ...cat, items: cat.items.map(i => i.id === item.id ? res.data : i) })
      toast.success('Updated description')
    } catch {
      toast.error('Failed to update description')
    }
  }

  const updateItemPrice = async (item: MenuItem, price: number | null, variants: Record<string, number> | null) => {
    try {
      const res = await api.put<MenuItem>(`/cms/menu/items/${item.id}`, { price, priceVariants: variants })
      onUpdate({ ...cat, items: cat.items.map(i => i.id === item.id ? res.data : i) })
      setPriceItem(null)
      toast.success('Price updated successfully!')
    } catch {
      toast.error('Failed to update price')
    }
  }

  const toggleAvailable = async (item: MenuItem) => {
    try {
      const res = await api.put<MenuItem>(`/cms/menu/items/${item.id}`, { isAvailable: !item.isAvailable })
      onUpdate({ ...cat, items: cat.items.map(i => i.id === item.id ? res.data : i) })
      toast.success(res.data.isAvailable ? `${item.name} is now Available` : `${item.name} is now Hidden`)
    } catch {
      toast.error('Failed to toggle availability')
    }
  }

  const deleteItem = async (item: MenuItem) => {
    try {
      await api.delete(`/cms/menu/items/${item.id}`)
      onUpdate({ ...cat, items: cat.items.filter(i => i.id !== item.id) })
      toast.success(`Deleted "${item.name}"`)
    } catch {
      toast.error('Failed to delete item')
    }
  }

  const updateCatName = async (name: string) => {
    try {
      const res = await api.put<MenuCategory>(`/cms/menu/categories/${cat.id}`, { name })
      onUpdate({ ...cat, name: res.data.name })
      toast.success('Updated category name')
    } catch {
      toast.error('Failed to update category')
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Delete category "${cat.name}" and all its items?`)) return
    setDeleting(true)
    try {
      await Promise.all(cat.items.map(i => api.delete(`/cms/menu/items/${i.id}`)))
      await api.delete(`/cms/menu/categories/${cat.id}`)
      onDelete(cat.id)
      toast.success(`Deleted category "${cat.name}"`)
    } catch {
      toast.error('Failed to delete category')
    } finally { setDeleting(false) }
  }

  return (
    <div className="category-accordion">
      {/* Category Header */}
      <div className="category-header">
        <button
          onClick={() => setCollapsed(c => !c)}
          className={`collapse-toggle-btn ${collapsed ? 'toggle-collapsed' : ''}`}
          title={collapsed ? 'Expand Category' : 'Collapse Category'}
        >
          ▼
        </button>

        <div className="category-title-wrap">
          <InlineEdit
            value={cat.name}
            onSave={updateCatName}
            style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-text-1)' }}
          />
          <span className="category-count">
            {cat.items.length} item{cat.items.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="category-header-actions">
          <button
            onClick={() => setAddingItem(a => !a)}
            className="btn-ghost"
            style={{ fontSize: 12, padding: '4px 10px', height: 30 }}
          >
            + Item
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="btn-ghost btn-ghost-danger"
            style={{ fontSize: 12, padding: '4px 10px', height: 30 }}
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>

      {/* Items Section */}
      {!collapsed && (
        <div className="category-content">
          {cat.items.length === 0 && !addingItem && (
            <div className="empty-category-items">
              <span className="empty-category-icon">🍽️</span>
              <p className="empty-category-text">No items matching filters in this category</p>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setAddingItem(true)}
                style={{ fontSize: 12, marginTop: 8 }}
              >
                + Add First Item
              </button>
            </div>
          )}

          {cat.items.length > 0 && (
            <div className="menu-items-grid">
              {cat.items.map(item => (
                <div
                  key={item.id}
                  className={`menu-item-card ${item.isAvailable ? '' : 'menu-item-card-disabled'}`}
                >
                  <div className="menu-item-card-header">
                    {/* Diet badge (Veg/Nonveg cleanly rendered using item.isVeg) */}
                    <span className={`veg-badge ${item.isVeg ? 'veg-badge-green' : 'veg-badge-red'}`}>
                      <span className="veg-badge-dot" />
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>

                    {/* Actions */}
                    <div className="menu-item-actions">
                      {/* Availability Toggle Switch */}
                      <label className="toggle-switch" title={item.isAvailable ? 'Hide Item' : 'Show Item'}>
                        <input
                          type="checkbox"
                          checked={item.isAvailable}
                          onChange={() => toggleAvailable(item)}
                        />
                        <span className="toggle-slider" />
                      </label>

                      {/* Delete Button */}
                      <button
                        onClick={() => { if (confirm(`Delete "${item.name}"?`)) deleteItem(item) }}
                        className="menu-item-delete-btn"
                        title="Delete Item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <div className="menu-item-card-body">
                    {/* Premium Image Box */}
                    <div className="menu-item-image-wrapper">
                      {uploadingItemIds[item.id] ? (
                        <div className="menu-item-image-loader">
                          <span className="login-spinner" />
                        </div>
                      ) : item.imageUrl ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="menu-item-image"
                          />
                          <div className="menu-item-image-overlay">
                            <button
                              type="button"
                              className="image-overlay-btn"
                              title="Replace Image"
                              onClick={() => triggerFileInput(item.id)}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="image-overlay-btn image-overlay-btn-danger"
                              title="Remove Image"
                              onClick={() => handleImageRemove(item)}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>
                              </svg>
                            </button>
                          </div>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="menu-item-image-placeholder"
                          title="Upload Dish Photo"
                          onClick={() => triggerFileInput(item.id)}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 4 }}>
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                            <circle cx="12" cy="13" r="4"/>
                          </svg>
                          <span>Add Photo</span>
                        </button>
                      )}
                      <input
                        ref={el => { fileInputRefs.current[item.id] = el }}
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) handleImageUpload(item, file)
                        }}
                        style={{ display: 'none' }}
                      />
                    </div>

                    {/* Details */}
                    <div className="menu-item-details">
                      <InlineEdit
                        value={item.name}
                        onSave={name => updateItemName(item, name)}
                        style={{ fontSize: '13.5px', color: 'var(--color-text-1)', fontWeight: 700, display: 'block' }}
                      />

                      <InlineEdit
                        value={item.description || ''}
                        placeholder="+ Add Description"
                        onSave={desc => updateItemDescription(item, desc)}
                        style={{
                          fontSize: '11px',
                          color: item.description ? 'var(--color-text-3)' : 'rgba(28,25,23,0.3)',
                          marginTop: 5,
                          display: 'block',
                          fontStyle: item.description ? 'normal' : 'italic'
                        }}
                      />
                    </div>
                  </div>

                  {/* Clean Prices Footer Row */}
                  <div className="menu-item-prices-row">
                    <div className="menu-item-prices">
                      {item.priceVariants ? (
                        Object.entries(item.priceVariants).map(([variant, price]) => (
                          <span
                            key={variant}
                            className="variant-price-tag"
                            onClick={() => setPriceItem(item)}
                            title="Click to edit variant price"
                          >
                            <span className="variant-name">{variant}:</span>
                            <span className="variant-val">₹{price}</span>
                          </span>
                        ))
                      ) : (
                        <span
                          className="single-price-tag"
                          onClick={() => setPriceItem(item)}
                          title="Click to edit single price"
                        >
                          ₹{parseFloat(item.price || '0').toFixed(0)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {addingItem && (
            <AddItemForm
              categoryId={cat.id}
              onAdded={item => { onUpdate({ ...cat, items: [...cat.items, item] }); setAddingItem(false) }}
              onCancel={() => setAddingItem(false)}
            />
          )}
        </div>
      )}

      {/* Price Edit Modal */}
      {priceItem && (
        <PriceEditModal
          item={priceItem}
          onClose={() => setPriceItem(null)}
          onSave={(price, variants) => updateItemPrice(priceItem, price, variants)}
        />
      )}
    </div>
  )
}

// ─── Add Category Modal ───

function AddCategoryModal({ outletId, onAdded, onClose }: {
  outletId: string
  onAdded: (cat: MenuCategory) => void
  onClose: () => void
}) {
  const [name, setName]     = useState('')
  const [saving, setSaving] = useState(false)

  const submit = async () => {
    if (!name.trim()) return
    setSaving(true)
    try {
      const res = await api.post<MenuCategory>('/cms/menu/categories', { name: name.trim(), outletId })
      onAdded({ ...res.data, items: [] })
      onClose()
      toast.success(`Created category "${res.data.name}"!`)
    } catch {
      toast.error('Failed to create category')
    } finally { setSaving(false) }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card animate-appear" style={{ width: 360 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">New Category</h3>
          <p className="modal-subtitle">Add a new category section to your menu</p>
        </div>
        <div className="form-group">
          <label className="form-label">Category Name</label>
          <input
            className="input"
            placeholder="e.g. Starters / Main Course"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            onKeyDown={e => e.key === 'Enter' && submit()}
          />
        </div>
        <div className="modal-actions" style={{ marginTop: 24 }}>
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={submit} disabled={saving || !name.trim()}>
            {saving ? 'Creating…' : 'Create Category'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Menu Page Redesign ───

export default function MenuPage() {
  const [outlets, setOutlets]       = useState<Outlet[]>([])
  const [outletId, setOutletId]     = useState('')
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [loading, setLoading]       = useState(false)
  const [showAdd, setShowAdd]       = useState(false)

  // Segment Filter State (All, Veg, Non-Veg)
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all')

  useEffect(() => {
    api.get<Outlet[]>('/cms/outlets').then(r => {
      setOutlets(r.data)
      if (r.data.length > 0) setOutletId(r.data[0].id)
    }).catch(() => {})
  }, [])

  const fetchMenu = useCallback(async () => {
    if (!outletId) return
    setLoading(true)
    try {
      const res = await api.get<MenuCategory[]>(`/cms/menu?outletId=${outletId}`)
      setCategories(res.data)
    } catch {
      toast.error('Failed to retrieve menu data')
    } finally { setLoading(false) }
  }, [outletId])

  useEffect(() => { fetchMenu() }, [fetchMenu])

  const selectedOutlet = outlets.find(o => o.id === outletId)

  // Dynamic Filtration matching Option 2 choices
  const filteredCategories = categories.map(cat => {
    const items = cat.items.filter(item => {
      if (dietFilter === 'veg') return item.isVeg
      if (dietFilter === 'nonveg') return !item.isVeg
      return true
    })
    return { ...cat, items }
  }).filter(cat => cat.items.length > 0 || dietFilter === 'all')

  const totalFilteredItems = filteredCategories.reduce((n, c) => n + c.items.length, 0)

  return (
    <div className="menu-page-container">
      {/* Decorative Background Orbs */}
      <div className="bg-blobs">
        <div className="bg-blob bg-blob-1"></div>
        <div className="bg-blob bg-blob-2"></div>
      </div>

      <div className="page-header" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="page-title">Menu Builder</h1>
            <p className="page-subtitle">
              {selectedOutlet
                ? `${filteredCategories.length} categories · ${totalFilteredItems} dishes ${dietFilter !== 'all' ? '(filtered)' : ''} · ${selectedOutlet.name}`
                : 'Select an outlet to manage its menu'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Segmented Filter Control */}
            <div className="segment-control">
              {(['all', 'veg', 'nonveg'] as const).map(f => (
                <button
                  key={f}
                  type="button"
                  className={`segment-btn ${dietFilter === f ? 'segment-btn-active' : ''}`}
                  onClick={() => setDietFilter(f)}
                >
                  {f === 'all' ? 'All' : f === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                </button>
              ))}
            </div>

            {/* Outlet Selector */}
            <div className="custom-select-wrapper">
              <select className="input" value={outletId} onChange={e => setOutletId(e.target.value)}
                style={{ width: 'auto', padding: '6px 36px 6px 12px', fontSize: 13, height: 38, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}>
                {outlets.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
              <span className="select-arrow">▼</span>
            </div>

            {outletId && (
              <button className="btn-primary" onClick={() => setShowAdd(true)} style={{ height: 38, padding: '0 16px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 4 }}>
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Category
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="page-content" style={{ position: 'relative', zIndex: 10 }}>
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="category-skeleton animate-pulse" />
            ))}
          </div>
        )}

        {!loading && filteredCategories.length === 0 && outletId && (
          <div className="empty-state">
            <div className="empty-state-icon">🍽️</div>
            <div className="empty-state-title">No menu items found</div>
            <div className="empty-state-desc">
              {dietFilter !== 'all'
                ? 'No items match the selected diet filter. Try switching back to "All".'
                : 'Create your first category and start adding delicious items to your menu!'}
            </div>
            {dietFilter !== 'all' ? (
              <button className="btn-ghost" style={{ marginTop: 20 }} onClick={() => setDietFilter('all')}>
                Show All Items
              </button>
            ) : (
              <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => setShowAdd(true)}>
                + Add First Category
              </button>
            )}
          </div>
        )}

        {!loading && filteredCategories.map(cat => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            onUpdate={updated => setCategories(cs => cs.map(c => c.id === updated.id ? updated : c))}
            onDelete={id => setCategories(cs => cs.filter(c => c.id !== id))}
          />
        ))}
      </div>

      {showAdd && outletId && (
        <AddCategoryModal
          outletId={outletId}
          onAdded={cat => setCategories(cs => [...cs, cat])}
          onClose={() => setShowAdd(false)}
        />
      )}

      {/* Redesigned Menu Stylesheet */}
      <style>{`
        .menu-page-container {
          position: relative;
          min-height: 100vh;
        }

        /* ─── Background Orbs ─── */
        .bg-blobs {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.4;
          mix-blend-mode: multiply;
        }
        .bg-blob-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(214,66,56,0.06) 0%, rgba(214,66,56,0) 75%);
          top: -10%;
          right: 5%;
        }
        .bg-blob-2 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(245,147,0,0.04) 0%, rgba(245,147,0,0) 75%);
          bottom: 10%;
          left: 5%;
        }

        /* ─── Premium Segment Filter ─── */
        .segment-control {
          display: flex;
          background: rgba(28, 25, 23, 0.04);
          padding: 3px;
          border-radius: 10px;
          border: 1px solid rgba(28, 25, 23, 0.04);
          height: 38px;
          align-items: center;
        }
        .segment-btn {
          background: none;
          border: none;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-2);
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          font-family: inherit;
          display: flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          white-space: nowrap;
        }
        .segment-btn-active {
          background: #ffffff;
          color: var(--color-text-1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        /* ─── Custom Select ─── */
        .custom-select-wrapper {
          position: relative;
          display: inline-block;
        }
        .select-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 8px;
          color: var(--color-text-3);
          pointer-events: none;
        }

        /* ─── Category Accordion Card ─── */
        .category-accordion {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          margin-bottom: 24px;
          overflow: hidden;
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.005),
            0 10px 30px -8px rgba(28, 25, 23, 0.02);
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .category-accordion:hover {
          border-color: var(--color-border-strong);
          box-shadow: 
            0 8px 12px -3px rgba(0, 0, 0, 0.01),
            0 16px 40px -12px rgba(28, 25, 23, 0.04);
        }
        .category-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: rgba(28, 25, 23, 0.01);
          border-bottom: 1px solid var(--color-border);
          user-select: none;
        }
        .collapse-toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-3);
          font-size: 10px;
          width: 22px;
          height: 22px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: transform 0.25s, background 0.2s;
        }
        .collapse-toggle-btn:hover {
          background: rgba(28, 25, 23, 0.04);
          color: var(--color-text-1);
        }
        .toggle-collapsed {
          transform: rotate(-90deg);
        }
        .category-title-wrap {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }
        .category-count {
          font-size: 11.5px;
          font-weight: 500;
          color: var(--color-text-3);
        }
        .category-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .btn-ghost-danger {
          color: var(--color-danger) !important;
        }
        .btn-ghost-danger:hover {
          background: rgba(220, 38, 38, 0.06) !important;
          border-color: rgba(220, 38, 38, 0.15) !important;
        }

        /* ─── Grid & Food Cards (Massively Redesigned for Premium Layout) ─── */
        .menu-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 20px;
          padding: 24px;
        }
        .menu-item-card {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 4px 12px rgba(28, 25, 23, 0.01);
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
          position: relative;
        }
        .menu-item-card:hover {
          transform: translateY(-2px);
          border-color: rgba(28, 25, 23, 0.15);
          box-shadow: 0 12px 28px rgba(28, 25, 23, 0.04);
        }
        .menu-item-card-disabled {
          background: rgba(28, 25, 23, 0.01);
          border-color: rgba(28, 25, 23, 0.04);
        }
        
        .menu-item-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px dashed rgba(28, 25, 23, 0.05);
          padding-bottom: 8px;
        }
        .menu-item-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .menu-item-card-body {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        
        .menu-item-prices-row {
          border-top: 1px solid rgba(28, 25, 23, 0.04);
          padding-top: 8px;
          margin-top: auto;
        }
        .menu-item-prices {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          align-items: center;
        }
        
        /* Clean Pricing Display Pills */
        .single-price-tag {
          font-size: 15px;
          font-weight: 750;
          color: var(--color-primary);
          cursor: pointer;
          transition: transform 0.15s;
          display: inline-block;
        }
        .single-price-tag:hover {
          transform: scale(1.04);
        }
        .variant-price-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(28, 25, 23, 0.03);
          border: 1px solid rgba(28, 25, 23, 0.05);
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 11.5px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .variant-price-tag:hover {
          background: rgba(214, 66, 56, 0.05);
          border-color: rgba(214, 66, 56, 0.15);
          transform: translateY(-0.5px);
        }
        .variant-name {
          font-size: 9px;
          font-weight: 600;
          color: rgba(28, 25, 23, 0.45);
          text-transform: uppercase;
        }
        .variant-val {
          font-weight: 700;
          color: var(--color-text-1);
        }

        /* ─── Premium Image Box ─── */
        .menu-item-image-wrapper {
          position: relative;
          width: 76px;
          height: 76px;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(28, 25, 23, 0.02);
          border: 1px solid rgba(28, 25, 23, 0.06);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s;
        }
        .menu-item-card:hover .menu-item-image-wrapper {
          border-color: rgba(28, 25, 23, 0.12);
        }
        .menu-item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .menu-item-card:hover .menu-item-image {
          transform: scale(1.04);
        }
        .menu-item-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: opacity 0.2s;
        }
        .menu-item-image-wrapper:hover .menu-item-image-overlay {
          opacity: 1;
        }
        .image-overlay-btn {
          width: 24px;
          height: 24px;
          background: #ffffff;
          border: none;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-text-1);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          padding: 0;
          transition: transform 0.15s, background 0.15s, color 0.15s;
        }
        .image-overlay-btn:hover {
          transform: scale(1.08);
          background: #fcfbfa;
        }
        .image-overlay-btn-danger {
          color: var(--color-danger);
        }
        .image-overlay-btn-danger:hover {
          background: rgba(220, 38, 38, 0.1);
          color: #ffffff;
          background: var(--color-danger);
        }
        
        /* Dashed Placeholder Photo */
        .menu-item-image-placeholder {
          width: 100%;
          height: 100%;
          border: 1px dashed rgba(28, 25, 23, 0.15);
          border-radius: 12px;
          background: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--color-text-3);
          font-family: inherit;
          padding: 4px;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .menu-item-image-placeholder:hover {
          background: rgba(214, 66, 56, 0.03);
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .menu-item-image-placeholder span {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .menu-item-image-loader {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.7);
        }

        /* ─── Details ─── */
        .menu-item-details {
          flex: 1;
          min-width: 0;
        }
        .inline-edit-trigger:hover {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary) !important;
        }
        
        /* Veg / Nonveg Badges */
        .veg-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 2px 7px;
          border-radius: 6px;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .veg-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }
        .veg-badge-green {
          background: rgba(22, 163, 74, 0.08);
          color: #16a34a;
        }
        .veg-badge-green .veg-badge-dot {
          background: #16a34a;
        }
        .veg-badge-red {
          background: rgba(220, 38, 38, 0.06);
          color: #dc2626;
        }
        .veg-badge-red .veg-badge-dot {
          background: #dc2626;
        }

        /* ─── Tactile iOS Switch ─── */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 36px;
          height: 20px;
          cursor: pointer;
        }
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: rgba(28, 25, 23, 0.12);
          border-radius: 99px;
          transition: background-color 0.2s;
        }
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .toggle-switch input:checked + .toggle-slider {
          background-color: #16a34a;
        }
        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(16px);
        }
        
        .menu-item-delete-btn {
          width: 24px;
          height: 24px;
          background: none;
          border: 1px solid rgba(28, 25, 23, 0.08);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-text-3);
          transition: color 0.15s, background 0.15s, border-color 0.15s;
          padding: 0;
        }
        .menu-item-delete-btn:hover {
          color: var(--color-danger);
          background: rgba(220, 38, 38, 0.05);
          border-color: rgba(220, 38, 38, 0.15);
        }

        /* ─── Empty/Loading States ─── */
        .empty-category-items {
          text-align: center;
          padding: 30px 16px;
          color: var(--color-text-3);
        }
        .empty-category-icon {
          font-size: 24px;
          display: block;
          margin-bottom: 8px;
          opacity: 0.5;
        }
        .empty-category-text {
          font-size: 12.5px;
          margin: 0;
        }
        .category-skeleton {
          height: 68px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        /* ─── Add Item Drawer ─── */
        .add-item-drawer {
          background: rgba(28, 25, 23, 0.01);
          border-top: 1px solid var(--color-border);
          padding: 16px 20px;
        }
        .add-item-grid {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .add-item-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        /* ─── Modern Premium Modals ─── */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 2, 29, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(28, 25, 23, 0.05);
          border-radius: 24px;
          padding: 28px;
          width: 400px;
          max-width: 90vw;
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.005),
            0 24px 50px -8px rgba(28, 25, 23, 0.06);
          box-sizing: border-box;
        }
        .animate-appear {
          animation: modal-appear 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes modal-appear {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-header {
          margin-bottom: 20px;
        }
        .modal-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--color-text-1);
          margin: 0;
        }
        .modal-subtitle {
          font-size: 11.5px;
          color: var(--color-text-3);
          margin: 4px 0 0;
        }

        /* Tabs inside modals */
        .tab-group {
          display: flex;
          gap: 6px;
          background: rgba(28, 25, 23, 0.03);
          padding: 3px;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        .tab-btn {
          flex: 1;
          background: none;
          border: none;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-3);
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
          font-family: inherit;
        }
        .tab-btn-active {
          background: #ffffff;
          color: var(--color-text-1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--color-text-2);
        }
        .variants-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .variant-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .variant-remove-btn {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: none;
          border: 1px solid rgba(28,25,23,0.08);
          color: var(--color-danger);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          font-size: 11px;
          transition: background 0.2s, border-color 0.2s;
        }
        .variant-remove-btn:hover {
          background: rgba(220, 38, 38, 0.05);
          border-color: rgba(220, 38, 38, 0.15);
        }
        .modal-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 24px;
        }
      `}</style>
    </div>
  )
}
