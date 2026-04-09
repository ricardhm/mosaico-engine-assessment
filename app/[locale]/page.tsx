import { redirect } from 'next/navigation'
import { routing } from '@/i18n/routing'

type Locale = (typeof routing.locales)[number]

// Redirect /es or /en to the admin dashboard
export default function LocaleRootPage({ params }: { params: { locale: Locale } }) {
  redirect(`/${params.locale}/admin`)
}
