import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const supabase = createServerClient()

  const [sessionRes, responsesRes, scoresRes, notesRes] = await Promise.all([
    supabase.from('sessions').select('*').eq('id', id).single(),
    supabase.from('responses').select('question_id, score').eq('session_id', id),
    supabase.from('scores').select('*').eq('session_id', id).maybeSingle(),
    supabase.from('notes').select('*').eq('session_id', id),
  ])

  if (sessionRes.error) return NextResponse.json({ error: 'Session not found' }, { status: 404 })

  return NextResponse.json({
    session: sessionRes.data,
    responses: responsesRes.data ?? [],
    scores: scoresRes.data ?? null,
    notes: notesRes.data ?? [],
  })
}
