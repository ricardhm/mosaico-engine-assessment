export type Engine = 'growth' | 'efficiency' | 'adaptability'
export type PillarId =
  | 'g1' | 'g2' | 'g3' | 'g4' | 'g5'
  | 'e1' | 'e2' | 'e3' | 'e4' | 'e5'
  | 'a1' | 'a2' | 'a3' | 'a4' | 'a5'

export interface Question {
  id: string        // e.g. "g_1_1"
  pillarId: PillarId
  engine: Engine
  pillarIndex: number   // 1–5 within engine
  questionIndex: number // 1–4 within pillar
  text: string
}

export const ENGINES: Engine[] = ['growth', 'efficiency', 'adaptability']

export const ENGINE_PILLARS: Record<Engine, PillarId[]> = {
  growth:       ['g1', 'g2', 'g3', 'g4', 'g5'],
  efficiency:   ['e1', 'e2', 'e3', 'e4', 'e5'],
  adaptability: ['a1', 'a2', 'a3', 'a4', 'a5'],
}
