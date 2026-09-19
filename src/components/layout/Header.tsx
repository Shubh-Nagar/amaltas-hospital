import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, CalendarPlus } from 'lucide-react';
import { site } from '@/data/site';
import { MegaMenu } from '@/components/navigation/MegaMenu';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { SearchDialog } from '@/components/search/SearchDialog';
import { EmergencyButton } from '@/components/emergency/EmergencyButton';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

function Logo() {
  return (
    <Link to="/" className="flex items-center" aria-label={`${site.name} — home`}>
      <img
        src="/images/brand/logo.png"
        alt={site.name}
        width={417}
        height={106}
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-brand-800 text-white/90 md:block">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-1.5 text-xs lg:px-8">
          <p>{site.academicName} · Dewas, Madhya Pradesh</p>
          <div className="flex items-center gap-4">
            <a href={`tel:${site.phone.tollFree.replace(/[^+\d]/g, '')}`} className="hover:text-white">Toll Free: {site.phone.tollFree}</a>
            <span aria-hidden className="text-white/30">|</span>
            <Link to="/academics" className="hover:text-white">Academics (AIMS)</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>

      <header className={cn('sticky top-0 z-50 border-b transition-shadow', scrolled ? 'border-line bg-surface/95 shadow-header backdrop-blur' : 'border-transparent bg-surface')}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Logo />

          <MegaMenu />

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-800 hover:bg-brand-50"
              aria-label="Search"
            >
              <Search className="h-5 w-5" aria-hidden />
            </button>

            <div className="hidden md:block">
              <EmergencyButton />
            </div>

            <div className="hidden sm:block">
              <Button to="/patients/appointment" size="sm">
                <CalendarPlus className="h-4 w-4" aria-hidden />
                Book Appointment
              </Button>
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-800 hover:bg-brand-50 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
