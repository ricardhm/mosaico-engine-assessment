'use client'
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/components/admin/AuthProvider'
import { AdminShell } from '@/components/admin/AdminShell'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'
import type { Session } from '@/lib/supabase/types'

type SessionStatus = 'pending' | 'in_progress' | 'completed'

export default function AdminPage() {
  const t = useTranslations('admin')
  const tCommon = useTranslations('common')
  const { session: authSession } = useAuth()
  const params = useParams()
  const locale = params.locale as string
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSessions = useCallback(async () => {
    if (!authSession) return
    const res = await fetch('/api/admin/sessions', {
      headers: { Authorization: `Bearer ${authSession.access_token}` },
    })
    if (res.ok) {
      const data = await res.json()
      setSessions(data.sessions)
    }
    setLoading(false)
  }, [authSession])

  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-slate-900">{t('sessions.title')}</h1>
        <Link href={`/${locale}/admin/sessions/new`}>
          <Button size="sm">{t('sessions.new')}</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-sm text-slate-400 py-12 text-center">
          {tCommon('loading')}
        </div>
      ) : sessions.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
          <p className="text-sm text-slate-500 mb-4">{t('sessions.empty')}</p>
          <Link href={`/${locale}/admin/sessions/new`}>
            <Button variant="secondary" size="sm">{t('sessions.new')}</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                  {t('sessions.columns.company')}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide hidden sm:table-cell">
                  {t('sessions.columns.contact')}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                  {t('sessions.columns.status')}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide hidden md:table-cell">
                  {t('sessions.columns.created')}
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sessions.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">{s.company_name}</td>
                  <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">
                    {s.contact_name || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={s.status as SessionStatus} t={t} />
                  </td>
                  <td className="px-4 py-3 text-slate-400 hidden md:table-cell">
                    {formatDate(s.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/${locale}/admin/sessions/${s.id}`}>
                      <Button variant="ghost" size="sm">
                        {locale === 'es' ? 'Ver' : 'View'}
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  )
}

function StatusBadge({ status, t }: { status: SessionStatus; t: ReturnType<typeof useTranslations> }) {
  const label = t(`sessions.status.${status}`)
  return <Badge variant={status}>{label}</Badge>
}
