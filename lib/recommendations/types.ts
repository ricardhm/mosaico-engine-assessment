import type { PillarId } from '../questions/types'
import type { MaturityTier } from '../supabase/types'

export interface PillarRecommendation {
  pillarId: PillarId
  Foundational: string
  Developing: string
  Scaling: string
  Leading: string
}

export type RecommendationMap = Record<PillarId, PillarRecommendation>

export interface Recommendation {
  pillarId: PillarId
  pillarScore: number
  tier: MaturityTier
  priority: 'critical' | 'opportunity' | 'strength'
  text: string
}
