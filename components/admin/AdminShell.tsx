'use client'
import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAuth } from './AuthProvider'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('admin')

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/${locale}/admin/login`)
    }
  }, [user, loading, router, locale])

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-sm text-slate-400">Cargando...</div>
      </div>
    )
  }

  async function handleSignOut() {
    await signOut()
    router.push(`/${locale}/admin/login`)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top nav */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href={`/${locale}/admin`} className="text-lg font-bold text-brand-700 tracking-tight">
            Mosaico
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:block">{user.email}</span>
            <LocaleSwitcher />
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              {locale === 'es' ? 'Salir' : 'Sign out'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
