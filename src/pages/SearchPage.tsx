import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, SearchX } from 'lucide-react';
import { Seo } from '@/lib/seo/Seo';
import { useSearchIndex, searchIndex } from '@/hooks/useSearchIndex';
import { PageHeader } from '@/components/ui/PageHeader';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';

/** Full-page search results (complements the header search dialog). */
export default function SearchPage() {
  const index = useSearchIndex();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const results = useMemo(() => searchIndex(index, query), [index, query]);

  return (
    <>
      <Seo title="Search" path="/search" noIndex />
      <PageHeader crumbs={[{ name: 'Home', path: '/' }, { name: 'Search', path: '/search' }]} title="Search" intro="Find doctors, specialties, services, facilities and articles.">
        <label className="relative block max-w-xl">
          <span className="sr-only">Search</span>
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
          <input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setParams(e.target.value ? { q: e.target.value } : {}); }}
            placeholder="Search…" autoFocus
            className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 outline-none focus-visible:ring-2 focus-visible:ring-brand-500" />
        </label>
      </PageHeader>

      <Container className="py-10">
        {query && results.length === 0 && (
          <EmptyState icon={<SearchX className="h-8 w-8" />} title={`No results for “${query}”`} description="Try a doctor's name, a specialty like “cardiology”, or a service." />
        )}
        {results.length > 0 && (
          <>
            <p className="mb-4 text-sm text-muted" aria-live="polite">{results.length} result{results.length === 1 ? '' : 's'}</p>
            <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
              {results.map((r) => (
                <li key={r.href}>
                  <Link to={r.href} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-brand-50/60">
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-brand-900">{r.title}</span>
                      {r.subtitle && <span className="block truncate text-sm text-muted">{r.subtitle}</span>}
                    </span>
                    <span className="shrink-0 text-xs uppercase tracking-wide text-muted/70">{r.type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </>
  );
}
