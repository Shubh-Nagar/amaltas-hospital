import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Stethoscope, HeartPulse, Wrench, Building2, Newspaper } from 'lucide-react';
import { useSearchIndex, searchIndex } from '@/hooks/useSearchIndex';
import type { SearchResult } from '@/types';
import { cn } from '@/lib/utils';

const typeIcon: Record<SearchResult['type'], typeof Search> = {
  doctor: Stethoscope,
  specialty: HeartPulse,
  service: Wrench,
  facility: Building2,
  article: Newspaper,
  page: Search,
};

/**
 * Global search across doctors, specialties, services, facilities, articles.
 * Information discovery — explicitly NOT medical diagnosis. Fully keyboard
 * accessible (arrow keys + enter, Esc to close, focus trap on the input).
 */
export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const index = useSearchIndex();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => searchIndex(index, query), [index, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      if (e.key === 'Enter' && results[active]) { navigate(results[active].href); onClose(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, results, active, navigate, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[10vh]" role="dialog" aria-modal="true" aria-label="Search the site">
      <button className="absolute inset-0 bg-brand-950/40 backdrop-blur-sm" aria-label="Close search" onClick={onClose} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-card-hover">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-5 w-5 text-muted" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            placeholder="Search doctors, specialties, services…"
            className="w-full bg-transparent py-4 text-base outline-none placeholder:text-muted"
            aria-label="Search query"
            aria-controls="search-results"
          />
          <button onClick={onClose} className="rounded-full p-1.5 text-muted hover:bg-black/5" aria-label="Close">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div id="search-results" className="max-h-[50vh] overflow-y-auto p-2">
          {query && results.length === 0 && (
            <p className="px-3 py-8 text-center text-muted">No results for “{query}”. Try a doctor, specialty or service.</p>
          )}
          {!query && (
            <p className="px-3 py-8 text-center text-sm text-muted">
              Try “cardiology”, “kidney”, “emergency” or a doctor’s name.
            </p>
          )}
          <ul>
            {results.map((r, i) => {
              const Icon = typeIcon[r.type];
              return (
                <li key={r.href}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => { navigate(r.href); onClose(); }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left',
                      i === active ? 'bg-brand-50' : 'hover:bg-brand-50/60',
                    )}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-brand-900">{r.title}</span>
                      {r.subtitle && <span className="block truncate text-sm text-muted">{r.subtitle}</span>}
                    </span>
                    <span className="ml-auto text-xs uppercase tracking-wide text-muted/70">{r.type}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
