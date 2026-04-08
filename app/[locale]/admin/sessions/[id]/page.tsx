'use client'
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/components/admin/AuthProvider'
import { AdminShell } from '@/components/admin/AdminShell'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getRecommendations } from '@/lib/recommendations'
import { getQuestions } from '@/lib/questions'
import { getCrossEngineFlags } from '@/lib/scoring'
import type { Session, Scores, Note } from '@/lib/supabase/types'
import type { Engine } from '@/lib/questions/types'
import Link from 'next/link'

interface SessionData {
  session: Session
  responses: { question_id: string; score: number }[]
  scores: Scores | null
  notes: Note[]
}

const ENGINES: Engine[] = ['growth', 'efficiency', 'adaptability']
const ENGINE_NOTE_KEYS = ['growth', 'efficiency', 'adaptability', 'overall'] as const

export default function SessionDetailPage() {
  const t = useTranslations('admin')
  const tResults = useTranslations('results')
  const tEngines = useTranslations('engines')
  const tPillars = useTranslations('pillars')
  const { session: authSession } = useAuth()
  const params = useParams()
  const locale = params.locale as string
  const sessionId = params.id as string

  const [data, setData] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [noteValues, setNoteValues] = useState<Record<string, string>>({})
  const [savingNote, setSavingNote] = useState<string | null>(null)
  const [savedNote, setSavedNote] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!authSession) return
    const res = await fetch(`/api/admin/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${authSession.access_token}` },
    })
    if (res.ok) {
      const d = await res.json()
      setData(d)
      // Initialise note textarea values from existing notes
      const initial: Record<string, string> = {}
      for (const note of (d.notes as Note[])) {
        initial[note.engine] = note.body
      }
      setNoteValues(initial)
    }
    setLoading(false)
  }, [authSession, sessionId])

  useEffect(() => { fetchData() }, [fetchData])

  async function saveNote(engine: string) {
    if (!authSession) return
    setSavingNote(engine)
    await fetch(`/api/admin/sessions/${sessionId}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authSession.access_token}`,
      },
      body: JSON.stringify({ engine, body: noteValues[engine] ?? '' }),
    })
    setSavingNote(null)
    setSavedNote(engine)
    setTimeout(() => setSavedNote(null), 2000)
  }

  if (loading || !data) {
    return (
      <AdminShell>
        <div className="text-sm text-slate-400 py-12 text-center">Cargando...</div>
      </AdminShell>
    )
  }

  const { session, responses, scores, notes: _ } = data
  const responsesMap = Object.fromEntries(responses.map((r) => [r.question_id, r.score]))
  const questions = getQuestions(locale)
  const recommendations = scores
    ? getRecommendations(locale, scores.pillar_scores, scores.tiers)
    : []
  const flags = scores ? getCrossEngineFlags(scores.engine_scores) : []

  const assessmentUrl = `${window.location.origin}/${locale}/s/${session.token}`

  return (
    <AdminShell>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <Link href={`/${locale}/admin`} className="text-sm text-slate-500 hover:text-slate-700">
              ← {t('sessionDetail.backToList')}
            </Link>
            <h1 className="text-xl font-semibold text-slate-900 mt-2">{session.company_name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant={session.status as 'pending' | 'in_progress' | 'completed'}>
                {t(`sessions.status.${session.status}`)}
              </Badge>
              {session.contact_name && (
                <span className="text-sm text-slate-500">{session.contact_name}</span>
              )}
              {session.contact_email && (
                <span className="text-sm text-slate-400">{session.contact_email}</span>
              )}
            </div>
          </div>

          {/* Assessment link */}
          <div className="flex items-center gap-2">
            <code className="text-xs text-slate-500 bg-slate-100 rounded px-2 py-1 hidden sm:block max-w-xs truncate">
              {assessmentUrl}
            </code>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigator.clipboard.writeText(assessmentUrl)}
            >
              {t('newSession.copyLink')}
            </Button>
          </div>
        </div>

        {/* If not completed yet */}
        {!scores && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 mb-6">
            {locale === 'es'
              ? 'Esta sesión aún no ha sido completada. Los resultados aparecerán aquí una vez que el cliente finalice la evaluación.'
              : 'This session has not been completed yet. Results will appear here once the client finishes the assessment.'}
          </div>
        )}

        {scores && (
          <>
            {/* Engine scores overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {ENGINES.map((engine) => {
                const score = scores.engine_scores[engine]
                const tier = scores.tiers[engine]
                return (
                  <div key={engine} className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      {tEngines(`${engine}.short`)}
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">
                      {score.toFixed(1)}
                      <span className="text-base font-normal text-slate-400">/5</span>
                    </div>
                    <Badge variant="tier">{tier}</Badge>
                  </div>
                )
              })}
            </div>

            {/* Cross-engine flags */}
            {flags.length > 0 && (
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 mb-6 flex flex-col gap-2">
                {flags.map((flag) => (
                  <p key={flag} className="text-sm text-brand-800">
                    ⚑ {tResults(`flags.${flag}`)}
                  </p>
                ))}
              </div>
            )}

            {/* Recommendations */}
            <div className="mb-8">
              <h2 className="text-base font-semibold text-slate-800 mb-3">
                {tResults('recommendations')}
              </h2>
              <div className="flex flex-col gap-3">
                {recommendations.map((rec) => (
                  <div key={rec.pillarId} className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={rec.priority}>{tResults(rec.priority)}</Badge>
                      <span className="text-sm font-medium text-slate-700">
                        {tPillars(rec.pillarId)}
                      </span>
                      <span className="text-xs text-slate-400 ml-auto">
                        {rec.pillarScore.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{rec.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Raw question scores */}
            <div className="mb-8">
              <h2 className="text-base font-semibold text-slate-800 mb-3">
                {t('sessionDetail.rawScores')}
              </h2>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {ENGINES.map((engine) => (
                  <div key={engine} className="border-b border-slate-100 last:border-0">
                    <div className="px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {tEngines(`${engine}.name`)}
                    </div>
                    {questions
                      .filter((q) => q.engine === engine)
                      .map((q) => (
                        <div key={q.id} className="flex items-start gap-3 px-4 py-2.5 border-t border-slate-50">
                          <span className="text-xs text-slate-400 font-mono mt-0.5 w-14 shrink-0">{q.id}</span>
                          <span className="text-xs text-slate-600 flex-1">{q.text}</span>
                          <span className={`text-sm font-bold shrink-0 ${scoreColor(responsesMap[q.id])}`}>
                            {responsesMap[q.id] ?? '—'}
                          </span>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Internal notes */}
        <div>
          <h2 className="text-base font-semibold text-slate-800 mb-3">
            {t('sessionDetail.notes')}
          </h2>
          <div className="flex flex-col gap-4">
            {ENGINE_NOTE_KEYS.map((engine) => (
              <div key={engine} className="bg-white rounded-xl border border-slate-200 p-4">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  {t(`sessionDetail.engineNotes.${engine}`)}
                </label>
                <textarea
                  className="w-full text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 min-h-24 resize-y focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder={t('sessionDetail.notesPlaceholder')}
                  value={noteValues[engine] ?? ''}
                  onChange={(e) => setNoteValues((prev) => ({ ...prev, [engine]: e.target.value }))}
                />
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    loading={savingNote === engine}
                    onClick={() => saveNote(engine)}
                  >
                    {t('sessionDetail.saveNotes')}
                  </Button>
                  {savedNote === engine && (
                    <span className="text-xs text-green-600">{t('sessionDetail.notesSaved')}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}

function scoreColor(score: number | undefined): string {
  if (!score) return 'text-slate-300'
  if (score <= 2) return 'text-red-500'
  if (score <= 3) return 'text-amber-500'
  return 'text-green-600'
}
