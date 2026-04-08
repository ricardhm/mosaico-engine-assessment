import type { Question, Engine, PillarId } from './types'
import { ENGINE_PILLARS } from './types'
import enQuestions from './en'
import esQuestions from './es'

export type { Question, Engine, PillarId }
export { ENGINE_PILLARS, ENGINES } from './types'

const questionsByLocale: Record<string, Question[]> = {
  en: enQuestions,
  es: esQuestions,
}

export function getQuestions(locale: string): Question[] {
  return questionsByLocale[locale] ?? esQuestions
}

export function getQuestionsByEngine(locale: string, engine: Engine): Question[] {
  return getQuestions(locale).filter((q) => q.engine === engine)
}

export function getQuestionsByPillar(locale: string, pillarId: PillarId): Question[] {
  return getQuestions(locale).filter((q) => q.pillarId === pillarId)
}

export function getPillarsForEngine(engine: Engine): PillarId[] {
  return ENGINE_PILLARS[engine]
}
