import { cn } from '@/lib/utils'

interface ProgressBarProps {
  engineIndex: number   // 0-based
  pillarIndex: number   // 0-based within engine
  totalEngines: number
  totalPillars: number
}

export function ProgressBar({ engineIndex, pillarIndex, totalEngines, totalPillars }: ProgressBarProps) {
  // Overall progress: each engine = 1/3, each pillar = 1/15
  const completedPillars = engineIndex * totalPillars + pillarIndex
  const totalSteps = totalEngines * totalPillars
  const pct = Math.round((completedPillars / totalSteps) * 100)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          {Array.from({ length: totalEngines }).map((_, i) => (
            <div key={i} className="flex gap-0.5">
              {Array.from({ length: totalPillars }).map((_, j) => {
                const stepIndex = i * totalPillars + j
                const done = stepIndex < completedPillars
                const current = stepIndex === completedPillars
                return (
                  <div
                    key={j}
                    className={cn(
                      'h-1.5 w-4 rounded-full transition-colors',
                      done ? 'bg-brand-500' : current ? 'bg-brand-300' : 'bg-slate-200'
                    )}
                  />
                )
              })}
            </div>
          ))}
        </div>
        <span className="text-xs text-slate-400">{pct}%</span>
      </div>
    </div>
  )
}
