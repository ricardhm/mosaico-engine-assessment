import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

interface ResponsePayload {
  question_id: string
  score: number
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const supabase = createServerClient()

  // Resolve session by token
  const { data: session, error: fetchError } = await supabase
    .from('sessions')
    .select('id, status')
    .eq('token', token)
    .single()

  if (fetchError || !session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  if (session.status === 'completed') {
    return NextResponse.json({ error: 'Session already completed' }, { status: 409 })
  }

  const body = await request.json()
  const responses: ResponsePayload[] = body.responses

  if (!Array.isArray(responses) || responses.length === 0) {
    return NextResponse.json({ error: 'responses array is required' }, { status: 400 })
  }

  // Validate all scores are 1–5
  for (const r of responses) {
    if (!r.question_id || typeof r.score !== 'number' || r.score < 1 || r.score > 5) {
      return NextResponse.json({ error: `Invalid response: ${JSON.stringify(r)}` }, { status: 400 })
    }
  }

  // Upsert — idempotent if client retries
  const { error } = await supabase
    .from('responses')
    .upsert(
      responses.map((r) => ({
        session_id: session.id,
        question_id: r.question_id,
        score: r.score,
      })),
      { onConflict: 'session_id,question_id' }
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ saved: responses.length })
}
