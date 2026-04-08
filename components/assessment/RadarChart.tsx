'use client'
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { useTranslations } from 'next-intl'

interface RadarChartProps {
  pillarScores: Record<string, number>
  locale: string
}

const PILLAR_IDS = ['g1', 'g2', 'g3', 'g4', 'g5', 'e1', 'e2', 'e3', 'e4', 'e5', 'a1', 'a2', 'a3', 'a4', 'a5']

// Short labels for the radar axes (full pillar names are too long)
const SHORT_LABELS: Record<string, Record<string, string>> = {
  es: {
    g1: 'Datos', g2: 'Segmentación', g3: 'Retención', g4: 'Canales', g5: 'Analítica',
    e1: 'Inventario', e2: 'Proveedores', e3: 'Fulfillment', e4: 'Márgenes', e5: 'Visibilidad',
    a1: 'Tecnología', a2: 'Procesos', a3: 'Decisiones', a4: 'Datos / Cultura', a5: 'Cambio',
  },
  en: {
    g1: 'Data', g2: 'Segmentation', g3: 'Retention', g4: 'Channels', g5: 'Analytics',
    e1: 'Inventory', e2: 'Suppliers', e3: 'Fulfillment', e4: 'Margins', e5: 'Visibility',
    a1: 'Technology', a2: 'Processes', a3: 'Decisions', a4: 'Data Culture', a5: 'Change',
  },
}

export function RadarChart({ pillarScores, locale }: RadarChartProps) {
  const tPillars = useTranslations('pillars')
  const labels = SHORT_LABELS[locale] ?? SHORT_LABELS.es

  const data = PILLAR_IDS.map((id) => ({
    pillar: labels[id] ?? id,
    score: pillarScores[id] ?? 0,
    fullMark: 5,
  }))

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-700 mb-4 text-center">
        {locale === 'es' ? 'Perfil de madurez por pilar' : 'Maturity profile by pillar'}
      </h3>
      <ResponsiveContainer width="100%" height={340}>
        <RechartsRadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="pillar"
            tick={{ fontSize: 10, fill: '#64748b' }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#6269f2"
            fill="#6269f2"
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Tooltip
            formatter={(value: number) => [value.toFixed(1), locale === 'es' ? 'Puntuación' : 'Score']}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  )
}
