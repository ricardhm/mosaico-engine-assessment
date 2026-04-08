import { notFound } from 'next/navigation'
import { SessionProvider } from '@/components/assessment/SessionContext'

async function getSession(token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/session/${token}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
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
