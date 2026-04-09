import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth'
import { getTier, getCrossEngineFlags } from '@/lib/scoring'
import type { Engine, MaturityTier } from '@/lib/scoring'

export interface PillarStat {
  pillarId: string
  engine: Engine
  avg: number
  tier: MaturityTier
}

export interface AnalyticsPayload {
  summary: {
    total: number
    completed: number
    in_progress: number
    pending: number
    avg_overall: number
    completed_this_month: number
  }
  engine_averages: Record<Engine, number>
  engine_tier_distribution: Record<Engine, Record<MaturityTier, number>>
  pillar_averages: PillarStat[]
  flag_frequency: Record<string, number>
  weakest_pillars: PillarStat[]
}

const PILLAR_ENGINE_MAP: Record<string, Engine> = {
  g1: 'growth', g2: 'growth', g3: 'growth', g4: 'growth', g5: 'growth',
  e1: 'efficiency', e2: 'efficiency', e3: 'efficiency', e4: 'efficiency', e5: 'efficiency',
  a1: 'adaptability', a2: 'adaptability', a3: 'adaptability', a4: 'adaptability', a5: 'adaptability',
}

const ALL_PILLARS = ['g1','g2','g3','g4','g5','e1','e2','e3','e4','e5','a1','a2','a3','a4','a5'] as const
const ENGINES: Engine[] = ['growth', 'efficiency', 'adaptability']
const TIERS: MaturityTier[] = ['Foundational', 'Developing', 'Scaling', 'Leading']
const FLAGS = ['adaptabilityFirst', 'growthOverEfficiency', 'efficiencyOverGrowth']

export async function GET(request: Request) {
  const user = await getAuthenticatedUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClient()

  // Fetch all sessions (for counts + month filter)
  const { data: sessions, error: sessionsError } = await supabase
    .from('sessions')
    .select('id, status, created_at, completed_at')

  if (sessionsError) return NextResponse.json({ error: sessionsError.message }, { status: 500 })

  // Fetch all scores for completed sessions
  const { data: allScores, error: scoresError } = await supabase
    .from('scores')
    .select('session_id, pillar_scores, engine_scores, overall_score, tiers')

  if (scoresError) return NextResponse.json({ error: scoresError.message }, { status: 500 })

  // ── Summary counts ─────────────────────────────────────────────────────────
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const total = sessions?.length ?? 0
  const completed = sessions?.filter(s => s.status === 'completed').length ?? 0
  const in_progress = sessions?.filter(s => s.status === 'in_progress').length ?? 0
  const pending = sessions?.filter(s => s.status === 'pending').length ?? 0
  const completed_this_month = sessions?.filter(
    s => s.status === 'completed' && s.completed_at && s.completed_at >= startOfMonth
  ).length ?? 0

  // ── Score aggregation (only completed sessions with score records) ──────────
  const n = allScores?.length ?? 0

  let avg_overall = 0
  const engineSums: Record<Engine, number> = { growth: 0, efficiency: 0, adaptability: 0 }
  const pillarSums: Record<string, number> = {}
  const pillarCounts: Record<string, number> = {}
  const engineTierCounts: Record<Engine, Record<MaturityTier, number>> = {
    growth:       { Foundational: 0, Developing: 0, Scaling: 0, Leading: 0 },
    efficiency:   { Foundational: 0, Developing: 0, Scaling: 0, Leading: 0 },
    adaptability: { Foundational: 0, Developing: 0, Scaling: 0, Leading: 0 },
  }
  const flagCounts: Record<string, number> = { adaptabilityFirst: 0, growthOverEfficiency: 0, efficiencyOverGrowth: 0 }

  for (const pillarId of ALL_PILLARS) {
    pillarSums[pillarId] = 0
    pillarCounts[pillarId] = 0
  }

  if (n > 0 && allScores) {
    for (const row of allScores) {
      avg_overall += row.overall_score

      // Engine sums + tier distribution
      for (const engine of ENGINES) {
        const score = (row.engine_scores as Record<Engine, number>)[engine] ?? 0
        engineSums[engine] += score
        const tier = getTier(score)
        engineTierCounts[engine][tier]++
      }

      // Pillar sums
      const ps = row.pillar_scores as Record<string, number>
      for (const pillarId of ALL_PILLARS) {
        if (pillarId in ps) {
          pillarSums[pillarId] += ps[pillarId]
          pillarCounts[pillarId]++
        }
      }

      // Cross-engine flags
      const flags = getCrossEngineFlags(row.engine_scores as Record<Engine, number>)
      for (const flag of flags) {
        if (flag in flagCounts) flagCounts[flag]++
      }
    }

    avg_overall = Math.round((avg_overall / n) * 100) / 100
    for (const engine of ENGINES) {
      engineSums[engine] = Math.round((engineSums[engine] / n) * 100) / 100
    }
  }

  // ── Build pillar averages ──────────────────────────────────────────────────
  const pillar_averages: PillarStat[] = ALL_PILLARS.map(pillarId => {
    const count = pillarCounts[pillarId] ?? 0
    const avg = count > 0 ? Math.round((pillarSums[pillarId] / count) * 100) / 100 : 0
    return {
      pillarId,
      engine: PILLAR_ENGINE_MAP[pillarId],
      avg,
      tier: getTier(avg),
    }
  })

  // Sort ascending by avg (weakest first)
  const weakest_pillars = [...pillar_averages].sort((a, b) => a.avg - b.avg)

  const payload: AnalyticsPayload = {
    summary: { total, completed, in_progress, pending, avg_overall, completed_this_month },
    engine_averages: engineSums as Record<Engine, number>,
    engine_tier_distribution: engineTierCounts,
    pillar_averages,
    flag_frequency: flagCounts,
    weakest_pillars,
  }

  return NextResponse.json(payload)
}
