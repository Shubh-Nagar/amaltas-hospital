import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Youtube, Instagram } from 'lucide-react';
import { site, accreditations } from '@/data/site';
import { footerNav } from '@/data/navigation';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 bg-brand-900 pb-24 pt-16 text-white/80 md:pb-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand + contact */}
          <div>
            <div className="mb-4 inline-flex items-center rounded-xl bg-white px-3 py-2">
              <img src="/images/brand/logo.png" alt={site.name} width={417} height={106} className="h-9 w-auto" />
            </div>
            <p className="mb-5 max-w-xs text-sm text-white/70">{site.descriptionShort}</p>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                <span>{site.address.line1}, {site.address.city}, {site.address.state} {site.address.postalCode}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                <a href={`tel:${site.phone.tollFree.replace(/[^+\d]/g, '')}`} className="hover:text-white">Toll Free {site.phone.tollFree}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                <a href={`mailto:${site.email.general}`} className="hover:text-white">{site.email.general}</a>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><Facebook className="h-4 w-4" aria-hidden /></a>
              <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><Youtube className="h-4 w-4" aria-hidden /></a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><Instagram className="h-4 w-4" aria-hidden /></a>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.heading}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">{col.heading}</h2>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-white/70 hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
          <span className="text-xs uppercase tracking-wider text-white/50">Accredited &amp; recognised:</span>
          {accreditations.filter((a) => a.verified).map((a) => (
            <span key={a.name} className="rounded-md border border-white/15 px-2.5 py-1 text-xs font-semibold text-white/90" title={a.fullName}>
              {a.name}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="max-w-xl">
            Information on this site is for general awareness and is not a substitute for professional medical advice. In an emergency, call {site.phone.tollFree}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
