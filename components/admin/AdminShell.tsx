'use client'
import { useEffect } from 'react'
import { useRouter, useParams, usePathname } from 'next/navigation'
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

  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top nav */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/admin`} className="text-lg font-bold text-brand-700 tracking-tight flex items-center gap-2">
              Mosaico
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-brand-100 text-brand-600 tracking-wide">beta</span>
            </Link>
            <nav className="flex items-center gap-1">
              <NavLink href={`/${locale}/admin`} label={locale === 'es' ? 'Sesiones' : 'Sessions'} active={!pathname.includes('/analytics')} />
              <NavLink href={`/${locale}/admin/analytics`} label={locale === 'es' ? 'Analítica' : 'Analytics'} active={pathname.includes('/analytics')} />
            </nav>
          </div>
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

function NavLink({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        active
          ? 'bg-slate-100 text-slate-900'
          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
      }`}
    >
      {label}
    </Link>
  )
}
