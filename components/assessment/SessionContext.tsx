'use client'
import { createContext, useContext } from 'react'

export interface SessionInfo {
  id: string
  token: string
  status: string
  company_name: string
  completedEngines: number[]
}

const SessionContext = createContext<SessionInfo | null>(null)

export function SessionProvider({
  session,
  children,
}: {
  session: SessionInfo
  children: React.ReactNode
}) {
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used inside SessionProvider')
  return ctx
}
