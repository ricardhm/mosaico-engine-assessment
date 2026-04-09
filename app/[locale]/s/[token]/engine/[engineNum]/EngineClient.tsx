'use client'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useSession } from '@/components/assessment/SessionContext'
import { AssessmentHeader } from '@/components/assessment/AssessmentHeader'
import { ProgressBar } from '@/components/assessment/ProgressBar'
import { LikertScale } from '@/components/assessment/LikertScale'
import { Button } from '@/components/ui/Button'
import type { Question, Engine, PillarId } from '@/lib/questions/types'

interface EngineClientProps {
  locale: string
  token: string
  engineNum: number
  engineKey: Engine
  pillars: PillarId[]
  questions: Question[]
}

export function EngineClient({ locale, token, engineNum, engineKey, pillars, questions }: EngineClientProps) {
  const t = useTranslations('assessment')
  const tEngines = useTranslations('engines')
  const tPillars = useTranslations('pillars')
  const session = useSession()
  const router = useRouter()

  const engineIndex = engineNum - 1
  const isLastEngine = engineNum === 3

  const [pillarIndex, setPillarIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // If this engine was already completed (resume), skip forward
  useEffect(() => {
    if (session.completedEngines.includes(engineNum)) {
      const nextEngine = engineNum + 1
      if (nextEngine <= 3) {
        router.replace(`/${locale}/s/${token}/engine/${nextEngine}`)
      } else {
        router.replace(`/${locale}/s/${token}/complete`)
      }
    }
  }, [session.completedEngines, engineNum, router, locale, token])

  const currentPillarId = pillars[pillarIndex]
  const currentQuestions = questions.filter((q) => q.pillarId === currentPillarId)
  const isLastPillar = pillarIndex === pillars.length - 1

  function setAnswer(questionId: string, score: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: score }))
  }

  function allCurrentAnswered() {
    return currentQuestions.every((q) => answers[q.id] != null)
  }

  function handlePrevPillar() {
    if (pillarIndex > 0) setPillarIndex((p) => p - 1)
  }

  async function handleNext() {
    if (!allCurrentAnswered()) return

    if (!isLastPillar) {
      setPillarIndex((p) => p + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Last pillar of this engine — save and advance
    setSaving(true)
    setError('')

    const res = await fetch(`/api/session/${token}/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        responses: Object.entries(answers).map(([question_id, score]) => ({ question_id, score })),
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Error saving responses')
      setSaving(false)
      return
    }

    setSaving(false)

    if (!isLastEngine) {
      router.push(`/${locale}/s/${token}/engine/${engineNum + 1}`)
    } else {
      await fetch(`/api/session/${token}/complete`, { method: 'POST' })
      router.push(`/${locale}/s/${token}/complete`)
    }
  }

  const unansweredCount = currentQuestions.filter((q) => answers[q.id] == null).length

  return (
    <div className="min-h-screen bg-slate-50">
      <AssessmentHeader
        companyName={session.company_name}
        progress={{
          current: engineNum,
          total: 3,
          label: t('progress.engine', { current: engineNum, total: 3 }),
        }}
      />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <ProgressBar
            engineIndex={engineIndex}
            pillarIndex={pillarIndex}
            totalEngines={3}
            totalPillars={5}
          />
        </div>

        <div className="mb-6">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-1">
            {tEngines(`${engineKey}.name`)}
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {tPillars(currentPillarId)}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {t('progress.pillar', { current: pillarIndex + 1, total: pillars.length })}
          </p>
        </div>

        <div className="flex flex-col gap-8 mb-10">
          {currentQuestions.map((q, i) => (
            <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-5">
              <LikertScale
                questionId={q.id}
                questionText={q.text}
                questionNumber={pillarIndex * 4 + i + 1}
                value={answers[q.id] ?? null}
                onChange={(score) => setAnswer(q.id, score)}
              />
            </div>
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>
        )}

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handlePrevPillar}
            disabled={pillarIndex === 0}
          >
            ← {t('navigation.prevPillar')}
          </Button>

          <div className="flex items-center gap-3">
            {unansweredCount > 0 && (
              <span className="text-xs text-slate-400">
                {unansweredCount} {locale === 'es' ? 'sin responder' : 'unanswered'}
              </span>
            )}
            <Button
              onClick={handleNext}
              loading={saving}
              disabled={!allCurrentAnswered()}
            >
              {isLastPillar
                ? isLastEngine
                  ? t('navigation.submit')
                  : t('navigation.finishEngine')
                : t('navigation.nextPillar')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
