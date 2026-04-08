'use client'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function LocaleSwitcher() {
  const locale = useLocale()
  const t = useTranslations('locale')
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale() {
    const next = locale === 'es' ? 'en' : 'es'
    // Replace the leading locale segment in the path
    const newPath = pathname.replace(/^\/(es|en)/, `/${next}`)
    // Set cookie so middleware remembers the preference
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000`
    router.push(newPath)
  }

  return (
    <button
      onClick={switchLocale}
      className={cn(
        'text-xs font-medium px-2.5 py-1 rounded-md border transition-colors',
        'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
      )}
      title={t('switch')}
    >
      {locale === 'es' ? 'ES · EN' : 'EN · ES'}
    </button>
  )
}
