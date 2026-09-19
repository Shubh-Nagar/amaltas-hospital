import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { primaryNav } from '@/data/navigation';
import { cn } from '@/lib/utils';

/**
 * Desktop primary navigation with mega-menu panels. Opens on hover AND on
 * keyboard focus (focus-within), closes on Escape/blur. Panels are grouped
 * columns rather than a wall of links.
 */
export function MegaMenu({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { pathname } = useLocation();
  /* `light` is for the transparent header over the homepage hero. */
  const light = tone === 'light';

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {primaryNav.map((item, i) => {
          const hasPanel = !!item.columns?.length;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => hasPanel && setOpenIdx(i)}
              onMouseLeave={() => hasPanel && setOpenIdx(null)}
              onFocus={() => hasPanel && setOpenIdx(i)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenIdx(null); }}
              onKeyDown={(e) => { if (e.key === 'Escape') setOpenIdx(null); }}
            >
              <Link
                to={item.href}
                aria-haspopup={hasPanel || undefined}
                aria-expanded={hasPanel ? openIdx === i : undefined}
                className={cn(
                  'inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors',
                  light
                    ? isActive
                      ? 'text-white'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                    : isActive
                      ? 'text-brand-800'
                      : 'text-ink/80 hover:text-brand-800 hover:bg-brand-50',
                )}
              >
                {item.label}
                {hasPanel && <ChevronDown className={cn('h-4 w-4 transition-transform', openIdx === i && 'rotate-180')} aria-hidden />}
              </Link>

              <AnimatePresence>
                {hasPanel && openIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as const }}
                    className="absolute left-0 top-full z-50 pt-3"
                  >
                    <div className="w-[min(38rem,90vw)] rounded-2xl border border-line bg-surface p-5 shadow-card-hover">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                        {item.columns!.map((col) => (
                          <div key={col.heading}>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-500">{col.heading}</p>
                            <ul className="mb-2">
                              {col.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    to={link.href}
                                    className="block rounded-lg px-3 py-2 hover:bg-brand-50"
                                  >
                                    <span className="block text-sm font-medium text-brand-900">{link.label}</span>
                                    {link.description && <span className="block text-xs text-muted">{link.description}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
