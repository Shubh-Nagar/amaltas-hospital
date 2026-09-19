import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { primaryNav } from '@/data/navigation';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

const tel = `tel:${site.phone.tollFree.replace(/[^+\d]/g, '')}`;

/** Full-screen mobile navigation drawer with accordion sub-sections. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button className="absolute inset-0 bg-brand-950/40 backdrop-blur-sm" onClick={onClose} aria-label="Close menu" />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute right-0 top-0 flex h-full w-[min(22rem,90vw)] flex-col bg-surface shadow-card-hover"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="font-display text-lg font-semibold text-brand-800">Menu</span>
              <button onClick={onClose} className="rounded-full p-2 text-muted hover:bg-black/5" aria-label="Close menu">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <ul className="flex flex-col gap-0.5">
                {primaryNav.map((item) => {
                  const hasChildren = !!item.columns?.length;
                  const isOpen = expanded === item.label;
                  return (
                    <li key={item.label}>
                      <div className="flex items-center">
                        <Link to={item.href} onClick={onClose} className="flex-1 rounded-lg px-3 py-3 font-medium text-brand-900 hover:bg-brand-50">
                          {item.label}
                        </Link>
                        {hasChildren && (
                          <button
                            onClick={() => setExpanded(isOpen ? null : item.label)}
                            aria-expanded={isOpen}
                            aria-label={`Toggle ${item.label} submenu`}
                            className="rounded-lg p-3 text-brand-500 hover:bg-brand-50"
                          >
                            <ChevronDown className={cn('h-5 w-5 transition-transform', isOpen && 'rotate-180')} aria-hidden />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {hasChildren && isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="ml-3 border-l border-line pl-3">
                              {item.columns!.map((col) => (
                                <div key={col.heading} className="py-1">
                                  <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-brand-500">{col.heading}</p>
                                  {col.links.map((link) => (
                                    <Link key={link.href} to={link.href} onClick={onClose} className="block rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-brand-50">
                                      {link.label}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-2 border-t border-line p-4">
              <Link
                to="/patients/appointment"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-700 px-5 py-2.5 font-medium text-white hover:bg-brand-800"
              >
                Book an Appointment
              </Link>
              <a href={tel} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emergency px-5 py-2.5 font-semibold text-white">
                <Phone className="h-4 w-4" aria-hidden /> Emergency · {site.phone.tollFree}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
