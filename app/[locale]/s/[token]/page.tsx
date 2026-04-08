'use client'
import { useTranslations } from 'next-intl'
import { useRouter, useParams } from 'next/navigation'
import { useState } from 'react'
import { useSession } from '@/components/assessment/SessionContext'
import { AssessmentHeader } from '@/components/assessment/AssessmentHeader'
import { Button } from '@/components/ui/Button'

export default function WelcomePage() {
  const t = useTranslations('assessment.welcome')
  const tEngines = useTranslations('engines')
  const session = useSession()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const token = params.token as string
  const [loading, setLoading] = useState(false)

  async function handleStart() {
    setLoading(true)

    // If already in progress, resume from the next incomplete engine
    if (session.status !== 'pending') {
      const nextEngine = [1, 2, 3].find((e) => !session.completedEngines.includes(e)) ?? 1
      router.push(`/${locale}/s/${token}/engine/${nextEngine}`)
      return
    }

    await fetch(`/api/session/${token}/start`, { method: 'POST' })
    router.push(`/${locale}/s/${token}/engine/1`)
  }

  const engines = [
    { key: 'growth', num: 1 },
    { key: 'efficiency', num: 2 },
    { key: 'adaptability', num: 3 },
  ]

  const isResume = session.status === 'in_progress'

  return (
    <div className="min-h-screen bg-slate-50">
      <AssessmentHeader companyName={session.company_name} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Company badge */}
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-3 py-1 mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-500" />
          <span className="text-xs font-medium text-brand-700">{session.company_name}</span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3">{t('title')}</h1>
        <p className="text-slate-600 mb-2">{t('subtitle')}</p>
        <p className="text-sm text-slate-400 mb-10">{t('duration')}</p>

        {/* Engine cards */}
        <div className="grid grid-cols-1 gap-3 mb-10">
          {engines.map(({ key, num }) => (
            <div
              key={key}
              className={`flex items-center gap-4 bg-white rounded-xl border px-4 py-3 ${
                session.completedEngines.includes(num)
                  ? 'border-green-200 bg-green-50'
                  : 'border-slate-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                session.completedEngines.includes(num)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-brand-100 text-brand-700'
              }`}>
                {session.completedEngines.includes(num) ? '✓' : num}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800">
                  {tEngines(`${key}.name`)}
                </div>
                <div className="text-xs text-slate-500">{tEngines(`${key}.tagline`)}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-500 mb-6">{t('instructions')}</p>

        <Button size="lg" loading={loading} onClick={handleStart}>
          {isResume
            ? (locale === 'es' ? 'Continuar evaluación' : 'Resume assessment')
            : t('startButton')}
        </Button>
      </main>
    </div>
  )
}
