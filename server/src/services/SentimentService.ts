import Sentiment from 'sentiment'

export type SentimentLabel = 'positive' | 'negative' | 'neutral' | 'mixed'

export interface SentimentResult {
  label: SentimentLabel
  score: number       // 0.0–1.0 (higher = more positive)
  keywords: string[]  // positive + negative keywords combined
}

/**
 * SentimentService — Analyzes review text using keyword-based sentiment scoring.
 * OOP Concepts: Encapsulation (private methods), Abstraction (caller just calls analyze())
 *
 * Uses `sentiment` npm package (free, no API key needed) with Indian restaurant
 * custom word list. Score blends text analysis (60%) + star rating (40%).
 * Upgrade path: swap analyze() internals to OpenAI gpt-4o-mini when budget allows.
 */
class SentimentService {
  private readonly analyzer = new Sentiment()

  // Indian restaurant-specific words boost accuracy for this domain
  private readonly customWords: Record<string, number> = {
    tasty: 3, yummy: 3, delicious: 3, amazing: 3, superb: 3,
    fresh: 2, quick: 2, clean: 2, friendly: 2, nice: 1,
    cold: -2, stale: -3, rude: -3, dirty: -3,
    slow: -2, overpriced: -2, undercooked: -3,
    tasteless: -3, disappointing: -2, awful: -3, terrible: -3,
  }

  analyze(text: string | null | undefined, stars: number): SentimentResult {
    if (!text || text.trim().length < 3) {
      return this.defaultResult(stars)
    }

    const result = this.analyzer.analyze(text, { extras: this.customWords })
    const textScore = this.normalize(result.score)
    const starScore = (stars - 1) / 4
    const combined = parseFloat((textScore * 0.6 + starScore * 0.4).toFixed(3))

    return {
      label: this.getLabel(combined, result.score),
      score: combined,
      keywords: [...(result.positive ?? []), ...(result.negative ?? [])],
    }
  }

  private defaultResult(stars: number): SentimentResult {
    const score = parseFloat(((stars - 1) / 4).toFixed(3))
    const label: SentimentLabel =
      stars >= 4 ? 'positive' : stars <= 2 ? 'negative' : 'neutral'
    return { label, score, keywords: [] }
  }

  private normalize(raw: number): number {
    return Math.max(0, Math.min(1, (raw + 10) / 20))
  }

  private getLabel(score: number, rawScore: number): SentimentLabel {
    if (score >= 0.65) return 'positive'
    if (score <= 0.35) return 'negative'
    if (rawScore !== 0 && Math.abs(rawScore) < 3) return 'mixed'
    return 'neutral'
  }
}

export const sentimentService = new SentimentService()
