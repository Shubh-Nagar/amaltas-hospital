import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, CalendarPlus, Stethoscope, FlaskConical, Phone, MapPin, HeartPulse } from 'lucide-react';
import { site } from '@/data/site';
import { MegaMenu } from '@/components/navigation/MegaMenu';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { SearchDialog } from '@/components/search/SearchDialog';
import { cn } from '@/lib/utils';

const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, '')}`;

/** Patient tasks get buttons of their own, separate from the menu of information. */
const quickActions = [
  { label: 'Find a Doctor', to: '/doctors', icon: Stethoscope },
  { label: 'Diagnostics & Lab', to: '/services/diagnostics-pathology', icon: FlaskConical },
  { label: 'Health Packages', to: '/health-packages', icon: HeartPulse },
];

function Logo({ light }: { light: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center" aria-label={`${site.name} — home`}>
      <img
        src="/images/brand/logo.png"
        alt={site.name}
        width={417}
        height={106}
        className={cn('h-10 w-auto transition-[filter] duration-300 sm:h-12', light && 'brightness-0 invert')}
      />
    </Link>
  );
}

/** Thin strip above the header: urgent numbers on the left, secondary links on the right. */
function UtilityBar() {
  return (
    <div className="hidden bg-brand-900 text-white/85 md:block">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-1.5 text-xs lg:px-8">
        <div className="flex items-center gap-5">
          <a
            href={tel(site.phone.emergency)}
            className="inline-flex items-center gap-2 rounded-full bg-emergency px-3 py-1 font-semibold text-white transition-colors hover:bg-emergency-dark"
            aria-label={`24x7 Emergency — call ${site.phone.emergency}`}
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            24×7 Emergency: {site.phone.emergency}
          </a>
          <a href={tel(site.phone.primary)} className="inline-flex items-center gap-1.5 hover:text-white">
            <Phone className="h-3.5 w-3.5" aria-hidden /> {site.phone.primary}
          </a>
          <Link to="/contact#directions" className="hidden items-center gap-1.5 hover:text-white lg:inline-flex">
            <MapPin className="h-3.5 w-3.5" aria-hidden /> Dewas–Ujjain Highway, Dewas
          </Link>
        </div>
        <nav aria-label="Utility" className="flex items-center gap-4">
          <Link to="/patients" className="hover:text-white">Patient Guide</Link>
          <Link to="/academics" className="hover:text-white">Academics (AIMS)</Link>
          <Link to="/contact" className="hover:text-white">Contact Us</Link>
        </nav>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(0);

  /* The homepage hero runs under the header, so the bar can start transparent
     and settle into the solid treatment once the user scrolls past the top. */
  const overlay = pathname === '/';
  const transparent = overlay && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Measured rather than hard-coded: the bar's height changes with breakpoint
     and the negative margin that pulls the hero underneath must match it. */
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const measure = () => setHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const iconBtn = cn(
    'inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors',
    transparent ? 'text-white hover:bg-white/10' : 'text-brand-800 hover:bg-brand-50',
  );

  return (
    <>
      <UtilityBar />

      <header
        ref={headerRef}
        style={overlay && height ? { marginBottom: -height } : undefined}
        className={cn(
          'sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300',
          transparent
            ? 'border-transparent bg-transparent'
            : scrolled
              ? 'border-line bg-surface/95 shadow-header backdrop-blur'
              : 'border-line bg-surface',
        )}
      >
        {/* Tier 1 — logo and patient actions */}
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Logo light={transparent} />

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              {quickActions.map(({ label, to, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                    transparent
                      ? 'border-white/40 text-white hover:bg-white/10'
                      : 'border-brand-700/20 text-brand-800 hover:border-brand-700/40 hover:bg-brand-50',
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                </Link>
              ))}
            </div>

            <Link
              to="/patients/appointment"
              className={cn(
                'hidden items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-colors sm:inline-flex',
                transparent ? 'bg-accent-500 text-brand-950 hover:bg-accent-400' : 'bg-brand-700 text-white hover:bg-brand-800',
              )}
            >
              <CalendarPlus className="h-4 w-4" aria-hidden />
              Book Appointment
            </Link>

            <button onClick={() => setSearchOpen(true)} className={iconBtn} aria-label="Search">
              <Search className="h-5 w-5" aria-hidden />
            </button>

            <button onClick={() => setMenuOpen(true)} className={cn(iconBtn, 'lg:hidden')} aria-label="Open menu">
              <Menu className="h-6 w-6" aria-hidden />
            </button>
          </div>
        </div>

        {/* Tier 2 — information menu (desktop) */}
        <div
          className={cn(
            'hidden border-t transition-colors duration-300 lg:block',
            transparent ? 'border-white/15' : 'border-line',
          )}
        >
          <div className="mx-auto flex max-w-[1600px] justify-center px-6 py-1 lg:px-8">
            <MegaMenu tone={transparent ? 'light' : 'dark'} />
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
