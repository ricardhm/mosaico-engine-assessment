import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { computeAllScores } from '@/lib/scoring'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const supabase = createServerClient()

  // Resolve session
  const { data: session, error: fetchError } = await supabase
    .from('sessions')
    .select('id, status')
    .eq('token', token)
    .single()

  if (fetchError || !session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  if (session.status === 'completed') {
    return NextResponse.json({ status: 'already_completed' })
  }

  // Load all responses
  const { data: responseRows, error: respError } = await supabase
    .from('responses')
    .select('question_id, score')
    .eq('session_id', session.id)

  if (respError) return NextResponse.json({ error: respError.message }, { status: 500 })

  // Build flat map and compute scores
  const responsesMap: Record<string, number> = {}
  for (const r of (responseRows ?? [])) {
    responsesMap[r.question_id] = r.score
  }

  const scorePayload = computeAllScores(responsesMap)

  // Write scores and mark completed (in parallel)
  const [scoresResult, sessionResult] = await Promise.all([
    supabase.from('scores').upsert(
      {
        session_id: session.id,
        pillar_scores: scorePayload.pillarScores,
        engine_scores: scorePayload.engineScores,
        overall_score: scorePayload.overallScore,
        tiers: scorePayload.tiers,
        computed_at: new Date().toISOString(),
      },
      { onConflict: 'session_id' }
    ),
    supabase
      .from('sessions')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', session.id),
  ])

  if (scoresResult.error) return NextResponse.json({ error: scoresResult.error.message }, { status: 500 })
  if (sessionResult.error) return NextResponse.json({ error: sessionResult.error.message }, { status: 500 })

  return NextResponse.json({ status: 'completed', scores: scorePayload })
}
