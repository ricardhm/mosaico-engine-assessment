import { LocaleSwitcher } from '@/components/LocaleSwitcher'

interface AssessmentHeaderProps {
  companyName?: string
  progress?: { current: number; total: number; label: string }
}

export function AssessmentHeader({ companyName, progress }: AssessmentHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-brand-700 tracking-tight">Mosaico</span>
          {companyName && (
            <>
              <span className="text-slate-300">·</span>
              <span className="text-sm text-slate-500 truncate max-w-40">{companyName}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          {progress && (
            <span className="text-xs text-slate-400 hidden sm:block">
              {progress.label}
            </span>
          )}
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  )
}
