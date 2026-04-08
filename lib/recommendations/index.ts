import type { PillarId } from '../questions/types'
import { ENGINE_PILLARS, ENGINES } from '../questions/types'
import type { MaturityTier } from '../supabase/types'
import type { Recommendation, RecommendationMap } from './types'
import enRecs from './en'
import esRecs from './es'

export type { Recommendation, RecommendationMap }

const recsByLocale: Record<string, RecommendationMap> = {
  en: enRecs,
  es: esRecs,
}

/**
 * Returns a prioritized list of recommendations for all 15 pillars,
 * sorted by pillar score ascending (lowest = highest priority).
 */
export function getRecommendations(
  locale: string,
  pillarScores: Record<string, number>,
  tiers: Record<string, MaturityTier>
): Recommendation[] {
  const map = recsByLocale[locale] ?? esRecs
  const allPillarIds = ENGINES.flatMap((e) => ENGINE_PILLARS[e]) as PillarId[]

  const recommendations: Recommendation[] = allPillarIds.map((pillarId) => {
    const score = pillarScores[pillarId] ?? 0
    const tier = tiers[pillarId] ?? 'Foundational'
    const rec = map[pillarId]

    return {
      pillarId,
      pillarScore: score,
      tier,
      priority: tierToPriority(tier),
      text: rec[tier],
    }
  })

  // Sort: critical first, then opportunity, then strength; within each group, lowest score first
  const priorityOrder: Record<string, number> = {
    critical: 0,
    opportunity: 1,
    strength: 2,
  }

  return recommendations.sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
    if (priorityDiff !== 0) return priorityDiff
    return a.pillarScore - b.pillarScore
  })
}

function tierToPriority(tier: MaturityTier): 'critical' | 'opportunity' | 'strength' {
  if (tier === 'Foundational') return 'critical'
  if (tier === 'Developing') return 'opportunity'
  return 'strength'
}
