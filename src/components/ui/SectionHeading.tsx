import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
          <span className="h-px w-6 bg-accent-500" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="text-h2">{title}</h2>
      {description && (
        <p className={cn('text-lead text-muted', align === 'center' ? 'max-w-2xl' : 'max-w-3xl')}>{description}</p>
      )}
      {children}
    </div>
  );
}
