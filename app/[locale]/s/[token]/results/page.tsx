import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { createServerClient } from '@/lib/supabase/server'
import { getRecommendations } from '@/lib/recommendations'
import { getCrossEngineFlags } from '@/lib/scoring'
import { AssessmentHeader } from '@/components/assessment/AssessmentHeader'
import { RadarChart } from '@/components/assessment/RadarChart'
import { Badge } from '@/components/ui/Badge'
import type { Scores } from '@/lib/supabase/types'
import type { Engine } from '@/lib/questions/types'

const ENGINES: Engine[] = ['growth', 'efficiency', 'adaptability']

async function getResults(token: string) {
  const supabase = createServerClient()

  const { data: session } = await supabase
    .from('sessions')
    .select('id, company_name, status')
    .eq('token', token)
    .single()

  if (!session || session.status !== 'completed') return null

  const { data: scores } = await supabase
    .from('scores')
    .select('*')
    .eq('session_id', session.id)
    .single()

  return { session, scores: scores as Scores | null }
}

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ token: string; locale: string }>
}) {
  const { token, locale } = await params
  const data = await getResults(token)

  if (!data || !data.scores) {
    notFound()
  }

  const { session, scores } = data
  const t = await getTranslations({ locale, namespace: 'results' })
  const tEngines = await getTranslations({ locale, namespace: 'engines' })
  const tPillars = await getTranslations({ locale, namespace: 'pillars' })
  const tTiers = await getTranslations({ locale, namespace: 'tiers' })

  const recommendations = getRecommendations(locale, scores.pillar_scores, scores.tiers)
  const flags = getCrossEngineFlags(scores.engine_scores)

  // Only show critical gaps and development opportunities to client (not strengths)
  const clientRecs = recommendations.filter((r) => r.priority !== 'strength').slice(0, 8)

  return (
    <div className="min-h-screen bg-slate-50">
      <AssessmentHeader companyName={session.company_name} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">{t('title')}</h1>
        <p className="text-sm text-slate-500 mb-8">{session.company_name}</p>

        {/* Overall score */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 flex items-center gap-6">
          <div className="text-center shrink-0">
            <div className="text-5xl font-black text-brand-700">
              {scores.overall_score.toFixed(1)}
            </div>
            <div className="text-xs text-slate-400 mt-1">/ 5.0</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              {t('overallScore')}
            </div>
            <Badge variant="tier" className="text-sm px-3 py-1">
              {tTiers(`${scores.tiers['overall']}.label`)}
            </Badge>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {tTiers(`${scores.tiers['overall']}.description`)}
            </p>
          </div>
        </div>

        {/* Radar chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <RadarChart pillarScores={scores.pillar_scores} locale={locale} />
        </div>

        {/* Engine scores */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {ENGINES.map((engine) => {
            const score = scores.engine_scores[engine]
            const tier = scores.tiers[engine]
            return (
              <div key={engine} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <div className="text-xs font-medium text-slate-500 mb-1">
                  {tEngines(`${engine}.short`)}
                </div>
                <div className="text-2xl font-bold text-slate-900">{score.toFixed(1)}</div>
                <div className="mt-1.5">
                  <Badge variant="tier">{tTiers(`${tier}.label`)}</Badge>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cross-engine flags */}
        {flags.length > 0 && (
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 mb-6 flex flex-col gap-2">
            {flags.map((flag) => (
              <p key={flag} className="text-sm text-brand-800">
                ⚑ {t(`flags.${flag}` as Parameters<typeof t>[0])}
              </p>
            ))}
          </div>
        )}

        {/* Recommendations */}
        <h2 className="text-base font-semibold text-slate-800 mb-3">{t('recommendations')}</h2>
        <div className="flex flex-col gap-3">
          {clientRecs.map((rec) => (
            <div key={rec.pillarId} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={rec.priority}>
                  {t(rec.priority as Parameters<typeof t>[0])}
                </Badge>
                <span className="text-sm font-medium text-slate-700">
                  {tPillars(rec.pillarId as Parameters<typeof tPillars>[0])}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{rec.text}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 text-center mt-10">
          Mosaico · {new Date().getFullYear()}
        </p>
      </main>
    </div>
  )
}
