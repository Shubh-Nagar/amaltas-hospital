import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Empty / no-results / loading fallback surface — never a blank screen. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface/60 px-6 py-14 text-center', className)}>
      {icon && <div className="mb-3 text-brand-400">{icon}</div>}
      <h3 className="text-h4 text-brand-900">{title}</h3>
      {description && <p className="mt-1.5 max-w-md text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
