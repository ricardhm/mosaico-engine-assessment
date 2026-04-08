import { cn } from '@/lib/utils'

type BadgeVariant = 'pending' | 'in_progress' | 'completed' | 'critical' | 'opportunity' | 'strength' | 'tier'

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  pending:     'bg-slate-100 text-slate-600',
  in_progress: 'bg-amber-100 text-amber-700',
  completed:   'bg-green-100 text-green-700',
  critical:    'bg-red-100 text-red-700',
  opportunity: 'bg-amber-100 text-amber-700',
  strength:    'bg-green-100 text-green-700',
  tier:        'bg-brand-100 text-brand-700',
}

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      variantStyles[variant],
      className
    )}>
      {children}
    </span>
  )
}
