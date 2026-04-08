'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/components/admin/AuthProvider'
import { AdminShell } from '@/components/admin/AdminShell'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import Link from 'next/link'

export default function NewSessionPage() {
  const t = useTranslations('admin.newSession')
  const tDetail = useTranslations('admin.sessionDetail')
  const tCommon = useTranslations('common')
  const { session: authSession } = useAuth()
  const params = useParams()
  const locale = params.locale as string
  const router = useRouter()

  const [form, setForm] = useState({
    company_name: '',
    company_size: '',
    industry_vertical: '',
    annual_revenue_band: '',
    primary_channel: '',
    contact_name: '',
    contact_email: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [createdToken, setCreatedToken] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!authSession) return
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authSession.access_token}`,
      },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Error creating session')
      setLoading(false)
      return
    }

    setCreatedToken(data.session.token)
    setLoading(false)
  }

  function getAssessmentUrl(token: string) {
    return `${window.location.origin}/${locale}/s/${token}`
  }

  async function copyLink(token: string) {
    await navigator.clipboard.writeText(getAssessmentUrl(token))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const companySizeOptions = Object.entries({
    '1-10': t('companySizes.1-10'),
    '11-50': t('companySizes.11-50'),
    '51-200': t('companySizes.51-200'),
    '201-500': t('companySizes.201-500'),
    '500+': t('companySizes.500+'),
  }).map(([value, label]) => ({ value, label }))

  const industryOptions = Object.entries({
    fashion: t('industries.fashion'),
    food: t('industries.food'),
    home: t('industries.home'),
    beauty: t('industries.beauty'),
    sports: t('industries.sports'),
    electronics: t('industries.electronics'),
    health: t('industries.health'),
    other: t('industries.other'),
  }).map(([value, label]) => ({ value, label }))

  const revenueOptions = Object.entries({
    '<1M': t('revenueBands.<1M'),
    '1M-10M': t('revenueBands.1M-10M'),
    '10M-50M': t('revenueBands.10M-50M'),
    '50M-200M': t('revenueBands.50M-200M'),
    '200M+': t('revenueBands.200M+'),
  }).map(([value, label]) => ({ value, label }))

  const channelOptions = Object.entries({
    dtc: t('channels.dtc'),
    marketplace: t('channels.marketplace'),
    omnichannel: t('channels.omnichannel'),
    wholesale: t('channels.wholesale'),
    other: t('channels.other'),
  }).map(([value, label]) => ({ value, label }))

  return (
    <AdminShell>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href={`/${locale}/admin`} className="text-sm text-slate-500 hover:text-slate-700">
            ← {tDetail('backToList')}
          </Link>
        </div>

        <h1 className="text-xl font-semibold text-slate-900 mb-6">{t('title')}</h1>

        {createdToken ? (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium text-slate-900">{form.company_name}</span>
            </div>

            <p className="text-sm text-slate-600 mb-4">{t('shareLink')}</p>

            <div className="flex items-center gap-2 bg-slate-50 rounded-lg border border-slate-200 px-3 py-2 mb-4">
              <code className="text-sm text-slate-700 flex-1 truncate">
                {getAssessmentUrl(createdToken)}
              </code>
              <Button variant="secondary" size="sm" onClick={() => copyLink(createdToken)}>
                {copied ? t('linkCopied') : t('copyLink')}
              </Button>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => router.push(`/${locale}/admin/sessions/${createdToken}`)}>
                {locale === 'es' ? 'Ver sesión' : 'View session'}
              </Button>
              <Button onClick={() => { setCreatedToken(null); setForm({ company_name: '', company_size: '', industry_vertical: '', annual_revenue_band: '', primary_channel: '', contact_name: '', contact_email: '' }) }}>
                {locale === 'es' ? 'Crear otra' : 'Create another'}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-5">
            <Input
              id="company_name"
              label={t('companyName')}
              value={form.company_name}
              onChange={(e) => set('company_name', e.target.value)}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                id="company_size"
                label={t('companySize')}
                value={form.company_size}
                onChange={(e) => set('company_size', e.target.value)}
                options={companySizeOptions}
                placeholder="—"
              />
              <Select
                id="industry_vertical"
                label={t('industryVertical')}
                value={form.industry_vertical}
                onChange={(e) => set('industry_vertical', e.target.value)}
                options={industryOptions}
                placeholder="—"
              />
              <Select
                id="annual_revenue_band"
                label={t('revenueBand')}
                value={form.annual_revenue_band}
                onChange={(e) => set('annual_revenue_band', e.target.value)}
                options={revenueOptions}
                placeholder="—"
              />
              <Select
                id="primary_channel"
                label={t('primaryChannel')}
                value={form.primary_channel}
                onChange={(e) => set('primary_channel', e.target.value)}
                options={channelOptions}
                placeholder="—"
              />
            </div>

            <div className="border-t border-slate-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="contact_name"
                label={t('contactName')}
                value={form.contact_name}
                onChange={(e) => set('contact_name', e.target.value)}
              />
              <Input
                id="contact_email"
                type="email"
                label={t('contactEmail')}
                value={form.contact_email}
                onChange={(e) => set('contact_email', e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <div className="flex gap-3 pt-1">
              <Button type="submit" loading={loading}>{t('createButton')}</Button>
              <Link href={`/${locale}/admin`}>
                <Button type="button" variant="secondary">
                  {tCommon('cancel')}
                </Button>
              </Link>
            </div>
          </form>
        )}
      </div>
    </AdminShell>
  )
}
