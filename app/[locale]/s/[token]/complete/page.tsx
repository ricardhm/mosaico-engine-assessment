'use client'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useSession } from '@/components/assessment/SessionContext'
import { AssessmentHeader } from '@/components/assessment/AssessmentHeader'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function CompletePage() {
  const t = useTranslations('assessment.complete')
  const session = useSession()
  const params = useParams()
  const locale = params.locale as string
  const token = params.token as string

  return (
    <div className="min-h-screen bg-slate-50">
      <AssessmentHeader companyName={session.company_name} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-3">{t('title')}</h1>
        <p className="text-slate-600 max-w-sm mx-auto mb-8">{t('message')}</p>

        <Link href={`/${locale}/s/${token}/results`}>
          <Button size="lg">{t('viewResults')}</Button>
        </Link>
      </main>
    </div>
  )
}
