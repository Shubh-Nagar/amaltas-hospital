import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

/** Surface card. Pass `to` to make the whole card a link (with hover lift). */
export function Card({
  children,
  className,
  to,
  interactive,
}: {
  children: ReactNode;
  className?: string;
  to?: string;
  interactive?: boolean;
}) {
  const classes = cn(
    'group relative rounded-2xl border border-line bg-surface shadow-card',
    (interactive || to) && 'transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-card-hover',
    to && 'block focus-visible:ring-2 focus-visible:ring-brand-500',
    className,
  );
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}
