import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={item.path}>
              <li>
                {last ? (
                  <span aria-current="page" className="font-medium text-brand-800">
                    {item.name}
                  </span>
                ) : (
                  <Link to={item.path} className="hover:text-brand-700 hover:underline">
                    {item.name}
                  </Link>
                )}
              </li>
              {!last && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted/60" aria-hidden />}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
