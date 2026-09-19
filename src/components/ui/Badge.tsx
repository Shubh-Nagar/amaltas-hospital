import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Badge({
  children,
  tone = 'brand',
  className,
}: {
  children: ReactNode;
  tone?: 'brand' | 'accent' | 'muted' | 'emergency';
  className?: string;
}) {
  const tones = {
    brand: 'bg-brand-50 text-brand-700',
    accent: 'bg-accent-50 text-accent-700',
    muted: 'bg-black/5 text-muted',
    emergency: 'bg-emergency/10 text-emergency',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold', tones[tone], className)}>
      {children}
    </span>
  );
}
