'use client'

import { useOutlet } from '@/hooks/useOutlet'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SocialLink {
  id: string
  outlet: string
  platform: 'instagram' | 'facebook' | 'google_map'
  url: string
  label: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const platformIcons: Record<SocialLink['platform'], string> = {
  instagram: '📸',
  facebook: '👥',
  google_map: '📍',
}

const OUTLET_SLUGS = ['boisar', 'palghar', 'virar', 'vasai'] as const

// ─── Single outlet card (fetches its own data) ────────────────────────────────

function OutletSocialCard({ slug }: { slug: string }) {
  const { outlet, loading, error } = useOutlet(slug)

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
        <div className="h-4 bg-neutral-100 rounded w-40 mb-3" />
        <div className="flex gap-3">
          <div className="h-9 bg-neutral-100 rounded-lg w-28" />
          <div className="h-9 bg-neutral-100 rounded-lg w-28" />
          <div className="h-9 bg-neutral-100 rounded-lg w-28" />
        </div>
      </div>
    )
  }

  if (error || !outlet) return null

  const links: SocialLink[] = [
    outlet.instagramUrl && {
      id: `${slug}-instagram`,
      outlet: outlet.name,
      platform: 'instagram' as const,
      url: outlet.instagramUrl,
      label: 'Instagram',
    },
    outlet.facebookUrl && {
      id: `${slug}-facebook`,
      outlet: outlet.name,
      platform: 'facebook' as const,
      url: outlet.facebookUrl,
      label: 'Facebook',
    },
    outlet.googleMapsUrl && {
      id: `${slug}-map`,
      outlet: outlet.name,
      platform: 'google_map' as const,
      url: outlet.googleMapsUrl,
      label: 'Google Map',
    },
  ].filter(Boolean) as SocialLink[]

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h2 className="font-bold text-secondary mb-3">{outlet.name}</h2>
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-neutral-light rounded-lg text-sm font-medium text-secondary hover:text-[#E88C3A] hover:border-[#E88C3A] transition-colors"
          >
            <span>{platformIcons[link.platform]}</span>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SocialPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-secondary mb-1">Find Us Online</h1>
      <p className="text-sm text-secondary-light mb-6">
        Follow Napkiq on social media
      </p>

      <div className="space-y-6">
        {OUTLET_SLUGS.map((slug) => (
          <OutletSocialCard key={slug} slug={slug} />
        ))}
      </div>
    </div>
  )
}
