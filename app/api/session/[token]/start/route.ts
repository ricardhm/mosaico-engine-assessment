import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const supabase = createServerClient()

  const { data: session, error: fetchError } = await supabase
    .from('sessions')
    .select('id, status')
    .eq('token', token)
    .single()

  if (fetchError || !session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  if (session.status === 'completed') {
    return NextResponse.json({ status: 'completed' })
  }

  let respondent_seniority: string | null = null
  try {
    const body = await request.json()
    respondent_seniority = body.respondent_seniority ?? null
  } catch {
    // body is optional — ignore parse errors
  }

  await supabase
    .from('sessions')
    .update({ status: 'in_progress', ...(respondent_seniority && { respondent_seniority }) })
    .eq('id', session.id)

  return NextResponse.json({ status: 'in_progress' })
}
