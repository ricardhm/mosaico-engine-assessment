'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { createBrowserClient } from '@/lib/supabase/browser'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'

export default function AdminLoginPage() {
  const t = useTranslations('admin.login')
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createBrowserClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(t('error'))
      setLoading(false)
      return
    }

    router.push(`/${locale}/admin`)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-2xl font-bold text-brand-700 tracking-tight">Mosaico</div>
            <div className="text-sm text-slate-500 mt-0.5">{t('title')}</div>
          </div>
          <LocaleSwitcher />
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
          <Input
            id="email"
            type="email"
            label={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <Input
            id="password"
            type="password"
            label={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}
          <Button type="submit" loading={loading} size="lg" className="w-full mt-1">
            {t('loginButton')}
          </Button>
        </form>
      </div>
    </div>
  )
}
