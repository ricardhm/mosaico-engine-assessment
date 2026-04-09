import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { SessionProvider } from '@/components/assessment/SessionContext'

async function getSession(token: string) {
  const supabase = createServerClient()

  const { data: session, error } = await supabase
    .from('sessions')
    .select('id, token, status, company_name, completed_at')
    .eq('token', token)
    .single()

  if (error || !session) return null

  // Determine which engines are fully completed so the client can resume
  let completedEngines: number[] = []
  if (session.status !== 'pending') {
    const { data: responses } = await supabase
      .from('responses')
      .select('question_id')
      .eq('session_id', session.id)

    const answered = new Set((responses ?? []).map((r: { question_id: string }) => r.question_id))
    const prefixes = ['g', 'e', 'a']
    completedEngines = prefixes
      .map((prefix, i) => {
        const engineAnswers = [...answered].filter((id) => id.startsWith(prefix + '_'))
        return engineAnswers.length === 20 ? i + 1 : 0
      })
      .filter(Boolean)
  }

  return { session, completedEngines }
}

export default async function SessionLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ token: string; locale: string }>
}) {
  const { token } = await params
  const data = await getSession(token)

  if (!data) notFound()

  return (
    <SessionProvider session={{ ...data.session, completedEngines: data.completedEngines }}>
      {children}
    </SessionProvider>
  )
}
