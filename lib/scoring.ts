import type { Engine } from './questions/types'
import { ENGINE_PILLARS, ENGINES } from './questions/types'
import type { MaturityTier } from './supabase/types'

export type { MaturityTier }
export type { Engine }

export interface ScorePayload {
  pillarScores: Record<string, number>
  engineScores: Record<Engine, number>
  overallScore: number
  tiers: Record<string, MaturityTier>
}

/**
 * Maps a numeric score (1.0–5.0) to a maturity tier label.
 */
export function getTier(score: number): MaturityTier {
  if (score < 2.5)  return 'Foundational'
  if (score < 3.3)  return 'Developing'
  if (score <= 4.0) return 'Scaling'
  return 'Leading'
}

/**
 * Rounds to 2 decimal places.
 */
function round2(n: number): number {
  return Math.round(n * 100) / 100
}

/**
 * Average of 4 question scores for one pillar.
 * Returns 0 if no responses found for the pillar.
 */
export function pillarScore(
  responses: Record<string, number>,
  pillarId: string
): number {
  const prefix = pillarId.replace(/(\D)(\d)/, '$1_$2') // e.g. "g1" → "g_1"
  const scores = Object.entries(responses)
    .filter(([id]) => id.startsWith(prefix + '_'))
    .map(([, score]) => score)

  if (scores.length === 0) return 0
  return round2(scores.reduce((a, b) => a + b, 0) / scores.length)
}

/**
 * Average of all pillar scores for one engine.
 */
export function engineScore(
  pillarScores: Record<string, number>,
  engine: Engine
): number {
  const pillars = ENGINE_PILLARS[engine]
  const scores = pillars.map((p) => pillarScores[p] ?? 0)
  return round2(scores.reduce((a, b) => a + b, 0) / scores.length)
}

/**
 * Average of the three engine scores.
 */
export function overallScore(engineScores: Record<Engine, number>): number {
  const scores = ENGINES.map((e) => engineScores[e] ?? 0)
  return round2(scores.reduce((a, b) => a + b, 0) / scores.length)
}

/**
 * Computes all scores from a flat responses map (questionId → score).
 * This is the main entry point called after assessment completion.
 */
export function computeAllScores(
  responses: Record<string, number>
): ScorePayload {
  // Pillar scores
  const allPillarIds = ENGINES.flatMap((e) => ENGINE_PILLARS[e])
  const pillarScores: Record<string, number> = {}
  for (const pillarId of allPillarIds) {
    pillarScores[pillarId] = pillarScore(responses, pillarId)
  }

  // Engine scores
  const engineScores = {} as Record<Engine, number>
  for (const engine of ENGINES) {
    engineScores[engine] = engineScore(pillarScores, engine)
  }

  // Overall score
  const overall = overallScore(engineScores)

  // Tiers — one per pillar + one per engine + overall
  const tiers: Record<string, MaturityTier> = {}
  for (const pillarId of allPillarIds) {
    tiers[pillarId] = getTier(pillarScores[pillarId])
  }
  for (const engine of ENGINES) {
    tiers[engine] = getTier(engineScores[engine])
  }
  tiers['overall'] = getTier(overall)

  return {
    pillarScores,
    engineScores,
    overallScore: overall,
    tiers,
  }
}

/**
 * Cross-engine flags surface high-level strategic insights.
 * Returns a list of flag keys; the UI looks up translated strings by key.
 */
export function getCrossEngineFlags(
  engineScores: Record<Engine, number>
): string[] {
  const flags: string[] = []
  const { growth, efficiency, adaptability } = engineScores

  if (adaptability < 2.5) {
    flags.push('adaptabilityFirst')
  }
  if (growth > efficiency + 0.5) {
    flags.push('growthOverEfficiency')
  }
  if (efficiency > growth + 0.5) {
    flags.push('efficiencyOverGrowth')
  }

  return flags
}
