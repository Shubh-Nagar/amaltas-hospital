import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Crumb {
  name: string;
  path: string;
}

/** `tone="light"` inverts the colours for use over a photographic header. */
export function Breadcrumbs({ items, tone = 'dark' }: { items: Crumb[]; tone?: 'dark' | 'light' }) {
  const light = tone === 'light';
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-sm', light ? 'text-white/70' : 'text-muted')}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={item.path}>
              <li>
                {last ? (
                  <span aria-current="page" className={cn('font-medium', light ? 'text-white' : 'text-brand-800')}>
                    {item.name}
                  </span>
                ) : (
                  <Link to={item.path} className={cn('hover:underline', light ? 'hover:text-white' : 'hover:text-brand-700')}>
                    {item.name}
                  </Link>
                )}
              </li>
              {!last && (
                <ChevronRight className={cn('h-3.5 w-3.5 shrink-0', light ? 'text-white/50' : 'text-muted/60')} aria-hidden />
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
