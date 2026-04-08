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
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('session_id', id)
    .order('engine')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ notes: data })
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { engine, body } = await request.json()

  if (!['growth', 'efficiency', 'adaptability', 'overall'].includes(engine)) {
    return NextResponse.json({ error: 'Invalid engine' }, { status: 400 })
  }

  const supabase = createServerClient()

  // Upsert: one note per engine per session
  const { data, error } = await supabase
    .from('notes')
    .upsert(
      { session_id: id, engine, body: body ?? '', author_id: user.id },
      { onConflict: 'session_id,engine' }
    )
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ note: data })
}
