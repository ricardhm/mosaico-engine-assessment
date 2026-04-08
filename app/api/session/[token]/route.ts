import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const supabase = createServerClient()

  const { data: session, error } = await supabase
    .from('sessions')
    .select('id, token, status, company_name, completed_at')
    .eq('token', token)
    .single()

  if (error || !session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  // If in progress, check which engines have been answered so client can resume
  let completedEngines: number[] = []
  if (session.status !== 'pending') {
    const { data: responses } = await supabase
      .from('responses')
      .select('question_id')
      .eq('session_id', session.id)

    const answered = new Set((responses ?? []).map((r: { question_id: string }) => r.question_id))
    // Engine 1 = g_*, Engine 2 = e_*, Engine 3 = a_*
    const prefixes = ['g', 'e', 'a']
    completedEngines = prefixes
      .map((prefix, i) => {
        // Each engine has 20 questions (5 pillars × 4)
        const engineAnswers = [...answered].filter((id) => id.startsWith(prefix + '_'))
        return engineAnswers.length === 20 ? i + 1 : 0
      })
      .filter(Boolean)
  }

  return NextResponse.json({ session, completedEngines })
}
