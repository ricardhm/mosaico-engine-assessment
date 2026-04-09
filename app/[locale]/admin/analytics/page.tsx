'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/admin/AuthProvider'
import { AdminShell } from '@/components/admin/AdminShell'
import type { AnalyticsPayload, PillarStat } from '@/app/api/admin/analytics/route'
import type { Engine, MaturityTier } from '@/lib/scoring'

// ── Pillar name maps ───────────────────────────────────────────────────────────
const PILLAR_NAMES_EN: Record<string, string> = {
  g1: 'Customer Data Infrastructure',
  g2: 'Segmentation & Personalization',
  g3: 'Lifecycle & Retention Marketing',
  g4: 'Paid & Owned Channel Optimization',
  g5: 'Revenue Analytics & Forecasting',
  e1: 'Data Governance & Single Source of Truth',
  e2: 'Data Trust & Quality',
  e3: 'AI & Automation Readiness',
  e4: 'Process Efficiency & Profitability',
  e5: 'Operational Scalability',
  a1: 'Technology Stack & Integration',
  a2: 'Process Documentation & Standardization',
  a3: 'Organizational Alignment & Decision Velocity',
  a4: 'Data Literacy & Tooling Adoption',
  a5: 'Change Management & Continuous Improvement',
}

const ENGINE_LABELS: Record<Engine, { label: string; color: string; bg: string; bar: string; badge: string }> = {
  growth:       { label: 'Growth',       color: 'text-emerald-700', bg: 'bg-emerald-50',  bar: 'bg-emerald-500',  badge: 'bg-emerald-100 text-emerald-700' },
  efficiency:   { label: 'Efficiency',   color: 'text-blue-700',    bg: 'bg-blue-50',     bar: 'bg-blue-500',     badge: 'bg-blue-100 text-blue-700' },
  adaptability: { label: 'Adaptability', color: 'text-amber-700',   bg: 'bg-amber-50',    bar: 'bg-amber-500',    badge: 'bg-amber-100 text-amber-700' },
}

const TIER_COLORS: Record<MaturityTier, string> = {
  Foundational: 'bg-red-100 text-red-700',
  Developing:   'bg-orange-100 text-orange-700',
  Scaling:      'bg-blue-100 text-blue-700',
  Leading:      'bg-emerald-100 text-emerald-700',
}

const FLAG_META: Record<string, { label: string; description: string; color: string }> = {
  adaptabilityFirst:    { label: 'Adaptability First',     description: 'Infrastructure must be fixed before growth investments will compound', color: 'bg-red-50 border-red-200 text-red-800' },
  growthOverEfficiency: { label: 'Growth Over Efficiency', description: 'Growing faster than the operation can reliably support',               color: 'bg-orange-50 border-orange-200 text-orange-800' },
  efficiencyOverGrowth: { label: 'Efficiency Over Growth', description: 'Running lean but not yet investing in revenue acceleration',            color: 'bg-blue-50 border-blue-200 text-blue-800' },
}

const ENGINES: Engine[] = ['growth', 'efficiency', 'adaptability']
const TIERS: MaturityTier[] = ['Foundational', 'Developing', 'Scaling', 'Leading']

// ── Helpers ────────────────────────────────────────────────────────────────────
function scoreColor(avg: number) {
  if (avg === 0)   return 'text-slate-300'
  if (avg < 2.5)   return 'text-red-600'
  if (avg < 3.3)   return 'text-orange-500'
  if (avg <= 4.0)  return 'text-blue-600'
  return 'text-emerald-600'
}

function scoreBg(avg: number) {
  if (avg === 0)   return 'bg-slate-100'
  if (avg < 2.5)   return 'bg-red-500'
  if (avg < 3.3)   return 'bg-orange-400'
  if (avg <= 4.0)  return 'bg-blue-500'
  return 'bg-emerald-500'
}

function tierLabel(avg: number): MaturityTier {
  if (avg < 2.5)  return 'Foundational'
  if (avg < 3.3)  return 'Developing'
  if (avg <= 4.0) return 'Scaling'
  return 'Leading'
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 px-6 py-5">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  )
}

function EngineScoreCard({
  engine,
  avg,
  tierDist,
  n,
}: {
  engine: Engine
  avg: number
  tierDist: Record<MaturityTier, number>
  n: number
}) {
  const meta = ENGINE_LABELS[engine]
  const pct = n > 0 ? Math.round((avg / 5) * 100) : 0
  const tier = tierLabel(avg)

  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-5`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-sm font-semibold ${meta.color}`}>{meta.label} Engine</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TIER_COLORS[tier]}`}>{tier}</span>
      </div>

      {/* Score + bar */}
      <div className="flex items-end gap-2 mb-3">
        <span className={`text-4xl font-bold ${scoreColor(avg)}`}>
          {n > 0 ? avg.toFixed(1) : '—'}
        </span>
        <span className="text-slate-400 text-sm mb-1">/ 5.0</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full mb-4">
        <div
          className={`h-2 rounded-full transition-all ${meta.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Tier distribution */}
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2">Tier Distribution</p>
      <div className="space-y-1">
        {TIERS.map(t => (
          <div key={t} className="flex items-center gap-2 text-xs">
            <span className="w-24 text-slate-500 truncate">{t}</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
              <div
                className={`h-1.5 rounded-full ${scoreBg(t === 'Foundational' ? 1.5 : t === 'Developing' ? 2.8 : t === 'Scaling' ? 3.6 : 4.5)}`}
                style={{ width: n > 0 ? `${Math.round(((tierDist[t] ?? 0) / n) * 100)}%` : '0%' }}
              />
            </div>
            <span className="w-4 text-right text-slate-500">{tierDist[t] ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PillarRow({ stat, rank, total }: { stat: PillarStat; rank: number; total: number }) {
  const engineMeta = ENGINE_LABELS[stat.engine]
  const tier = tierLabel(stat.avg)
  const pct = total > 0 ? Math.round((stat.avg / 5) * 100) : 0
  const isCritical = rank <= 5

  return (
    <div className={`flex items-center gap-3 py-3 px-4 ${isCritical ? 'bg-red-50/40' : ''} border-b border-slate-100 last:border-0`}>
      <span className={`w-6 text-center text-xs font-bold ${isCritical ? 'text-red-500' : 'text-slate-300'}`}>
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-slate-800 truncate">
            {PILLAR_NAMES_EN[stat.pillarId]}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${engineMeta.badge}`}>
            {engineMeta.label}
          </span>
          {isCritical && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-medium flex-shrink-0">
              Priority
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
            <div
              className={`h-1.5 rounded-full ${scoreBg(stat.avg)}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className={`text-xs font-semibold w-8 text-right ${scoreColor(stat.avg)}`}>
            {stat.avg > 0 ? stat.avg.toFixed(1) : '—'}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${TIER_COLORS[tier]} flex-shrink-0`}>
            {tier}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const { session: authSession } = useAuth()
  const [data, setData] = useState<AnalyticsPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authSession) return
    fetch('/api/admin/analytics', {
      headers: { Authorization: `Bearer ${authSession.access_token}` },
    })
      .then(r => r.ok ? r.json() : Promise.reject('Failed to load analytics'))
      .then(setData)
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false))
  }, [authSession])

  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Portfolio Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Aggregate insights across all completed assessments</p>
      </div>

      {loading && (
        <div className="text-sm text-slate-400 py-16 text-center">Loading analytics…</div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {!loading && !error && data && (
        <div className="space-y-8">

          {/* ── Section 1: Portfolio KPIs ──────────────────────────────── */}
          <section>
            <SectionLabel>Portfolio KPIs</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <KpiCard
                label="Completed Sessions"
                value={data.summary.completed}
                sub={`${data.summary.total} total (all statuses)`}
              />
              <KpiCard
                label="Avg Overall Score"
                value={data.summary.completed > 0 ? `${data.summary.avg_overall.toFixed(1)} / 5` : '—'}
                sub={data.summary.completed > 0 ? tierLabel(data.summary.avg_overall) : 'No data yet'}
              />
              <KpiCard
                label="In Progress"
                value={data.summary.in_progress}
                sub={`${data.summary.pending} pending`}
              />
              <KpiCard
                label="Completed This Month"
                value={data.summary.completed_this_month}
                sub="Current calendar month"
              />
            </div>
          </section>

          {/* ── Section 2: Engine Scores ───────────────────────────────── */}
          <section>
            <SectionLabel>Engine Scores</SectionLabel>
            {data.summary.completed === 0 ? (
              <EmptyState message="No completed sessions yet — engine scores will appear here once clients finish their assessments." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {ENGINES.map(engine => (
                  <EngineScoreCard
                    key={engine}
                    engine={engine}
                    avg={data.engine_averages[engine]}
                    tierDist={data.engine_tier_distribution[engine]}
                    n={data.summary.completed}
                  />
                ))}
              </div>
            )}
          </section>

          {/* ── Section 3: Weakest Pillars ─────────────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <SectionLabel noPad>Pillar Ranking</SectionLabel>
              <span className="text-xs text-slate-400">Sorted by avg score · lowest first · top 5 = priority</span>
            </div>
            {data.summary.completed === 0 ? (
              <EmptyState message="Pillar rankings will appear once assessments are completed." />
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {data.weakest_pillars.map((stat, i) => (
                  <PillarRow key={stat.pillarId} stat={stat} rank={i + 1} total={5} />
                ))}
              </div>
            )}
          </section>

          {/* ── Section 4: Cross-Engine Flags ──────────────────────────── */}
          <section>
            <SectionLabel>Cross-Engine Flags</SectionLabel>
            {data.summary.completed === 0 ? (
              <EmptyState message="Strategic flags will appear once assessments are completed." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(FLAG_META).map(([key, meta]) => {
                  const count = data.flag_frequency[key] ?? 0
                  const pct = data.summary.completed > 0 ? Math.round((count / data.summary.completed) * 100) : 0
                  return (
                    <div key={key} className={`rounded-xl border p-5 ${meta.color}`}>
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-semibold text-sm">{meta.label}</span>
                        <span className="text-2xl font-bold">{count}</span>
                      </div>
                      <p className="text-xs opacity-75 mb-3">{meta.description}</p>
                      <div className="h-1.5 bg-black/10 rounded-full">
                        <div className="h-1.5 bg-current rounded-full opacity-40" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-xs mt-1 opacity-60">{pct}% of completed sessions</p>
                    </div>
                  )
                })}
              </div>
            )}
          </section>

        </div>
      )}
    </AdminShell>
  )
}

// ── Tiny layout helpers ────────────────────────────────────────────────────────
function SectionLabel({ children, noPad }: { children: React.ReactNode; noPad?: boolean }) {
  return (
    <h2 className={`text-xs font-semibold text-slate-400 uppercase tracking-widest ${noPad ? '' : 'mb-3'}`}>
      {children}
    </h2>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 py-10 text-center">
      <p className="text-sm text-slate-400 max-w-sm mx-auto">{message}</p>
    </div>
  )
}
