import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

/** Vertical rhythm wrapper. `bleed` disables the inner Container. */
export function Section({
  children,
  className,
  as: Tag = 'section',
  bleed = false,
  id,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  bleed?: boolean;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <Tag id={id} aria-label={ariaLabel} className={cn('py-14 sm:py-20', className)}>
      {bleed ? children : <Container>{children}</Container>}
    </Tag>
  );
}
