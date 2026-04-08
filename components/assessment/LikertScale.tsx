'use client'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface LikertScaleProps {
  questionId: string
  questionText: string
  questionNumber: number
  value: number | null
  onChange: (value: number) => void
}

export function LikertScale({ questionId, questionText, questionNumber, value, onChange }: LikertScaleProps) {
  const t = useTranslations('likert')

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-slate-800 leading-relaxed">
        <span className="text-slate-400 mr-2">{questionNumber}.</span>
        {questionText}
      </p>

      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={cn(
              'flex flex-col items-center gap-1.5 rounded-xl border-2 px-1 py-3 transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
              value === score
                ? 'border-brand-500 bg-brand-50 shadow-sm'
                : 'border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/50'
            )}
          >
            <span className={cn(
              'text-lg font-bold',
              value === score ? 'text-brand-600' : 'text-slate-400'
            )}>
              {score}
            </span>
            <span className={cn(
              'text-center leading-tight',
              'text-[10px]',
              value === score ? 'text-brand-600' : 'text-slate-400'
            )}>
              {t(String(score) as '1' | '2' | '3' | '4' | '5')}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
