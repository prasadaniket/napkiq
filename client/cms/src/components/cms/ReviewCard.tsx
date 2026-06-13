import type { Review } from '@/types/api'
import { format } from 'date-fns'

interface ReviewCardProps {
  review: Review
}

type SentimentLabel = 'positive' | 'negative' | 'neutral' | 'mixed'

function starBadgeStyle(stars: number) {
  if (stars >= 4) return { bg: 'rgba(34,197,94,0.12)',  color: '#22c55e' }
  if (stars === 3) return { bg: 'rgba(234,179,8,0.12)', color: '#ca8a04' }
  return               { bg: 'rgba(239,68,68,0.12)',  color: '#ef4444' }
}

function sentimentStyle(label: SentimentLabel) {
  const map: Record<SentimentLabel, { bg: string; color: string; emoji: string }> = {
    positive: { bg: 'rgba(34,197,94,0.10)',   color: '#16a34a', emoji: '😊' },
    negative: { bg: 'rgba(239,68,68,0.10)',   color: '#dc2626', emoji: '😞' },
    neutral:  { bg: 'rgba(100,116,139,0.10)', color: '#64748b', emoji: '😐' },
    mixed:    { bg: 'rgba(234,88,12,0.10)',   color: '#ea580c', emoji: '🤔' },
  }
  return map[label] ?? map.neutral
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.stars)
  const badge = starBadgeStyle(review.stars)
  const sentiment = review.sentimentLabel
    ? sentimentStyle(review.sentimentLabel as SentimentLabel)
    : null

  return (
    <div className="card" style={{ padding: '16px 20px' }}>
      {/* Header: customer name + star badge + sentiment + date */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--color-text-1)' }}>
            {review.customer?.fullName ?? 'Anonymous'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-text-3)' }}>
            {review.outlet?.name ?? 'Unknown Outlet'}
          </div>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
          {/* Colour-coded star badge */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '3px 9px', borderRadius: 99, fontSize: 12, fontWeight: 700,
            background: badge.bg, color: badge.color,
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill={badge.color} stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {review.stars}★
          </span>
          <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>
            {format(new Date(review.createdAt), 'dd MMM yyyy')}
          </div>
        </div>
      </div>

      {/* Review text */}
      {review.reviewText && (
        <p style={{ fontSize: 13.5, color: 'var(--color-text-2)', lineHeight: 1.6, margin: '0 0 12px 0' }}>
          "{review.reviewText}"
        </p>
      )}

      {/* Sentiment keywords */}
      {review.sentimentKeywords && review.sentimentKeywords.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
          {review.sentimentKeywords.map((kw, i) => (
            <span key={i} style={{
              fontSize: 10, padding: '1px 7px', borderRadius: 99,
              background: 'rgba(0, 2, 29, 0.04)', color: 'var(--color-text-3)',
            }}>
              {kw}
            </span>
          ))}
        </div>
      )}

      {/* Badges row */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <span style={{
          display: 'inline-flex', padding: '2px 8px', borderRadius: 99,
          fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em',
          background: 'rgba(0, 2, 29, 0.04)', color: 'var(--color-text-3)',
        }}>
          {review.reviewType === 'first_visit' ? 'First Visit' : 'Repeat Visit'}
        </span>

        {/* Sentiment badge */}
        {sentiment && review.sentimentLabel && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '2px 8px', borderRadius: 99,
            fontSize: 10, fontWeight: 600,
            background: sentiment.bg, color: sentiment.color,
          }}>
            {sentiment.emoji} {review.sentimentLabel}
          </span>
        )}
      </div>
    </div>
  )
}
