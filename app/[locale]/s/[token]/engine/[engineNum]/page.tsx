import { getQuestionsByEngine, getPillarsForEngine } from '@/lib/questions'
import type { Engine } from '@/lib/questions/types'
import { EngineClient } from './EngineClient'

const ENGINE_KEYS: Engine[] = ['growth', 'efficiency', 'adaptability']

export default async function EnginePage({
  params,
}: {
  params: Promise<{ locale: string; token: string; engineNum: string }>
}) {
  const { locale, token, engineNum: engineNumStr } = await params
  const engineNum = Number(engineNumStr)
  const engineKey = ENGINE_KEYS[engineNum - 1]

  // Resolve questions on the server — keeps both locale datasets out of the client bundle
  const questions = getQuestionsByEngine(locale, engineKey)
  const pillars = getPillarsForEngine(engineKey)

  return (
    <EngineClient
      locale={locale}
      token={token}
      engineNum={engineNum}
      engineKey={engineKey}
      pillars={pillars}
      questions={questions}
    />
  )
}
