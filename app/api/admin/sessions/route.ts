import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth'
import { customAlphabet } from 'nanoid'

// URL-safe alphabet for tokens
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 12)

export async function GET(request: Request) {
  const user = await getAuthenticatedUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('sessions')
    .select('id, token, status, company_name, contact_name, contact_email, created_at, completed_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ sessions: data })
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { company_name, company_size, industry_vertical, annual_revenue_band, primary_channel, contact_name, contact_email } = body

  if (!company_name?.trim()) {
    return NextResponse.json({ error: 'company_name is required' }, { status: 400 })
  }

  const token = nanoid()
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('sessions')
    .insert({
      token,
      company_name: company_name.trim(),
      company_size: company_size || null,
      industry_vertical: industry_vertical || null,
      annual_revenue_band: annual_revenue_band || null,
      primary_channel: primary_channel || null,
      contact_name: contact_name?.trim() || null,
      contact_email: contact_email?.trim() || null,
      consultant_id: user.id,
      status: 'pending',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ session: data }, { status: 201 })
}
