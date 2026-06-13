'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

// ─── Nav item type ─────────────────────────────────────────────────────────────

interface NavItem {
  href:  string
  label: string
  icon:  React.ReactNode
}

// ─── Icons ─────────────────────────────────────────────────────────────────────

const Icon = {
  Dashboard: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  Customers: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Reviews: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Outlets: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Visits: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Automation: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  Menu: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M3 12h18M3 18h18"/>
    </svg>
  ),
  Birthday: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/>
      <path d="M2 21h20"/>
      <path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/>
    </svg>
  ),
  Anniversary: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Logout: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
}

// ─── Nav config per role ───────────────────────────────────────────────────────

const adminNav: NavItem[] = [
  { href: '/dashboard',    label: 'Dashboard',    icon: <Icon.Dashboard /> },
  { href: '/outlets',      label: 'Outlets',      icon: <Icon.Outlets /> },
  { href: '/customers',    label: 'Customers',    icon: <Icon.Customers /> },
  { href: '/reviews',      label: 'Reviews',      icon: <Icon.Reviews /> },
  { href: '/visits',       label: 'Visits',       icon: <Icon.Visits /> },
  { href: '/birthdays',    label: 'Birthdays',    icon: <Icon.Birthday /> },
  { href: '/anniversaries',label: 'Anniversaries',icon: <Icon.Anniversary /> },
  { href: '/menu',         label: 'Menu',         icon: <Icon.Menu /> },
  { href: '/automation',   label: 'Automation',   icon: <Icon.Automation /> },
]

const ownerNav: NavItem[] = [
  { href: '/dashboard',    label: 'Dashboard',    icon: <Icon.Dashboard /> },
  { href: '/outlets',      label: 'Outlets',      icon: <Icon.Outlets /> },
  { href: '/customers',    label: 'Customers',    icon: <Icon.Customers /> },
  { href: '/reviews',      label: 'Reviews',      icon: <Icon.Reviews /> },
  { href: '/visits',       label: 'Visits',       icon: <Icon.Visits /> },
  { href: '/birthdays',    label: 'Birthdays',    icon: <Icon.Birthday /> },
  { href: '/anniversaries',label: 'Anniversaries',icon: <Icon.Anniversary /> },
]

const franchiseNav: NavItem[] = [
  { href: '/dashboard',    label: 'Dashboard',    icon: <Icon.Dashboard /> },
  { href: '/customers',    label: 'Customers',    icon: <Icon.Customers /> },
  { href: '/reviews',      label: 'Reviews',      icon: <Icon.Reviews /> },
  { href: '/visits',       label: 'Visits',       icon: <Icon.Visits /> },
  { href: '/birthdays',    label: 'Birthdays',    icon: <Icon.Birthday /> },
  { href: '/anniversaries',label: 'Anniversaries',icon: <Icon.Anniversary /> },
]

// ─── Role label ────────────────────────────────────────────────────────────────

function roleLabel(role: string | undefined) {
  if (role === 'admin')           return 'Admin · UniCord'
  if (role === 'owner')           return 'Owner'
  if (role === 'franchise_owner') return 'Franchise Owner'
  return role ?? ''
}

function roleBadgeClass(role: string | undefined) {
  if (role === 'admin')           return 'role-badge role-badge-admin'
  if (role === 'owner')           return 'role-badge role-badge-owner'
  return 'role-badge role-badge-franchise'
}

// ─── Sidebar component ─────────────────────────────────────────────────────────

export default function CMSSidebar() {
  const pathname = usePathname()
  const { user, logout, isAdmin, isOwner } = useAuth()

  const navItems = isAdmin ? adminNav : isOwner ? ownerNav : franchiseNav
  const outletName = user?.assignedOutletName

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────────────── */}
      <aside className="cms-sidebar">

        {/* Logo */}
        <div className="sidebar-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/logo-circle.png"
            alt="Napkiq"
            style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: '50%' }}
          />
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {/* Outlet badge for franchise owners */}
          {outletName && (
            <div style={{
              background: 'rgba(0,2,29,0.03)',
              border: '1px solid rgba(0,2,29,0.06)',
              borderRadius: '8px',
              padding: '8px 10px',
              marginBottom: '8px',
              fontSize: '11.5px',
              color: 'rgba(0,2,29,0.6)',
            }}>
              <span style={{ color: 'rgba(0,2,29,0.3)', marginRight: '5px' }}>📍</span>
              {outletName}
            </div>
          )}

          <div className="sidebar-section-label">Navigation</div>

          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {item.label}
                {(item.label === 'Automation' || item.label === 'Menu') && (
                  <span style={{
                    marginLeft: 'auto',
                    background: 'rgba(214,66,56,0.15)',
                    color: '#D64238',
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '1px 5px',
                    borderRadius: '99px',
                    letterSpacing: '0.04em',
                  }}>ADMIN</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="sidebar-user">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{
              width: 30, height: 30,
              background: 'rgba(214,66,56,0.1)',
              border: '1px solid rgba(214,66,56,0.2)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 700, color: '#D64238',
              flexShrink: 0,
            }}>
              {user?.fullName?.charAt(0) ?? '?'}
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="sidebar-user-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.fullName ?? '—'}
              </div>
              <div className="sidebar-user-role">
                {user?.username && <span style={{ color: 'rgba(0,2,29,0.3)', marginRight: '4px' }}>@{user.username}</span>}
              </div>
            </div>
          </div>

          <span className={roleBadgeClass(user?.role)}>
            {roleLabel(user?.role)}
          </span>

          <button className="sidebar-logout" onClick={logout}>
            <Icon.Logout />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Mobile Bottom Nav ────────────────────────────────────── */}
      <nav className="bottom-nav">
        {navItems.slice(0, 4).map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
        <button className="bottom-nav-item" onClick={logout}>
          <Icon.Logout />
          Out
        </button>
      </nav>
    </>
  )
}
