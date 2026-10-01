import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarPlus, Check, ChevronDown, Clock, Droplets, Expand, Home, Phone, Sparkles } from 'lucide-react';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Lightbox } from '@/components/ui/Lightbox';
import { Reveal } from '@/components/ui/Reveal';
import { pageImages } from '@/data/pageImages';
import { site } from '@/data/site';
import {
  audienceLabels,
  dialysisOffer,
  discountPercent,
  healthPackages,
  type HealthPackage,
  type PackageAudience,
} from '@/data/healthPackages';
import { cn } from '@/lib/utils';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, '')}`;
const VISIBLE_TESTS = 6;

const posters = [...healthPackages.map((p) => ({ src: p.poster, alt: `${p.name} package poster` })), { src: dialysisOffer.poster, alt: 'Dialysis offer poster' }].map(
  (p) => ({ ...p, width: 1080, height: 1080 }),
);

function PackageCard({ pkg, onPoster }: { pkg: HealthPackage; onPoster: () => void }) {
  const [open, setOpen] = useState(false);
  const off = discountPercent(pkg);
  const shown = open ? pkg.tests : pkg.tests.slice(0, VISIBLE_TESTS);
  const hidden = pkg.tests.length - VISIBLE_TESTS;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-soft hover:-translate-y-1 hover:shadow-card-hover',
        pkg.featured ? 'border-brand-300' : 'border-line',
      )}
    >
      {/* Poster thumbnail */}
      <button type="button" onClick={onPoster} className="relative block aspect-[16/10] overflow-hidden bg-brand-50 text-left" aria-label={`View the ${pkg.name} poster`}>
        <img src={pkg.poster} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-700 ease-soft group-hover:scale-105" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
        {off > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-emergency px-3 py-1 text-xs font-bold text-white shadow">{off}% OFF</span>
        )}
        {pkg.featured && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent-400 px-3 py-1 text-xs font-bold text-brand-950 shadow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Popular
          </span>
        )}
        <span className="absolute bottom-3 right-4 inline-flex items-center gap-1 text-xs font-semibold text-white/90 opacity-0 transition-opacity group-hover:opacity-100">
          <Expand className="h-3.5 w-3.5" aria-hidden /> View poster
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">{audienceLabels[pkg.audience]}</span>
        <h2 className="mt-1 text-h4 text-brand-900">{pkg.name}</h2>
        <p className="mt-1 text-sm text-muted">{pkg.tagline}</p>

        <div className="mt-4 flex items-end gap-3">
          <span className="font-display text-4xl font-semibold text-brand-800">{inr(pkg.price)}</span>
          {pkg.originalPrice && <span className="pb-1 text-sm text-muted line-through">{inr(pkg.originalPrice)}</span>}
          <span className="ml-auto pb-1 text-xs font-semibold text-brand-600">{pkg.testCountLabel ?? `${pkg.tests.length} inclusions`}</span>
        </div>

        {pkg.highlights && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {pkg.highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-1 text-xs font-medium text-brand-800">
                <Home className="h-3.5 w-3.5 text-accent-700" aria-hidden /> {h}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 grid gap-2 border-t border-line pt-5 text-sm text-ink/85">
          {shown.map((t) => (
            <li key={t} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden /> {t}
            </li>
          ))}
        </ul>
        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-3 inline-flex items-center gap-1 self-start text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            {open ? 'Show fewer' : `+ ${hidden} more`}
            <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden />
          </button>
        )}

        <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
          <Button to="/patients/appointment" size="sm" className="w-full">
            <CalendarPlus className="h-4 w-4" aria-hidden /> Book Now
          </Button>
          <Button href={tel(site.phone.primary)} size="sm" variant="outline" className="w-full">
            <Phone className="h-4 w-4" aria-hidden /> Call
          </Button>
        </div>
      </div>
    </article>
  );
}

/** Health Packages — preventive check-up packages from amaltashospital.in/health-packages. */
export default function HealthPackagesPage() {
  const [filter, setFilter] = useState<PackageAudience | 'all'>('all');
  const [poster, setPoster] = useState<number | null>(null);

  const audiences = useMemo(
    () => (Object.keys(audienceLabels) as PackageAudience[]).filter((a) => healthPackages.some((p) => p.audience === a)),
    [],
  );
  const list = filter === 'all' ? healthPackages : healthPackages.filter((p) => p.audience === filter);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Health Packages', path: '/health-packages' },
  ];

  return (
    <>
      <Seo
        title="Health Packages"
        description="Affordable preventive health check-up packages at Amaltas Hospital, Dewas — for adults, women, children, senior citizens and families."
        path="/health-packages"
        jsonLd={[breadcrumbJsonLd(crumbs)]}
      />
      <PageHeader
        crumbs={crumbs}
        title="Health Packages"
        intro="Preventive check-ups at affordable prices — for every age and every member of the family."
        image={pageImages.healthPackages}
      />

      <Container className="py-10 lg:py-14">
        {/* Filters */}
        <div role="tablist" aria-label="Filter packages" className="flex flex-wrap gap-2">
          {(['all', ...audiences] as const).map((a) => (
            <button
              key={a}
              type="button"
              role="tab"
              aria-selected={filter === a}
              onClick={() => setFilter(a)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                filter === a ? 'border-brand-700 bg-brand-700 text-white' : 'border-line bg-surface text-brand-800 hover:border-brand-300 hover:bg-brand-50',
              )}
            >
              {a === 'all' ? 'All packages' : audienceLabels[a]}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.05}>
              <PackageCard pkg={p} onPoster={() => setPoster(healthPackages.indexOf(p))} />
            </Reveal>
          ))}
        </div>

        {/* Dialysis offer */}
        <Reveal>
          <section aria-label="Dialysis" className="mt-14 grid overflow-hidden rounded-3xl bg-brand-900 text-white shadow-card md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <button type="button" onClick={() => setPoster(healthPackages.length)} className="relative aspect-square md:aspect-auto" aria-label="View the dialysis poster">
              <img src={dialysisOffer.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </button>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-400">
                <Droplets className="h-4 w-4" aria-hidden /> Dialysis
              </span>
              <h2 className="mt-3 text-h2 text-white">{dialysisOffer.title}</h2>
              <p className="mt-4 flex items-end gap-3">
                <span className="font-display text-5xl font-semibold text-accent-400">{inr(dialysisOffer.price)}</span>
                <span className="pb-2 text-white/80">{dialysisOffer.note}</span>
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-white/85">
                <Clock className="h-4 w-4 text-accent-400" aria-hidden /> {dialysisOffer.highlights[0]}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button to="/services/dialysis" variant="secondary">Learn about dialysis</Button>
                <Button href={tel(site.phone.primary)} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Phone className="h-4 w-4" aria-hidden /> {site.phone.primary}
                </Button>
              </div>
            </div>
          </section>
        </Reveal>

        {/* How to book */}
        <div className="mt-14 grid gap-4 rounded-3xl border border-line bg-brand-50/60 p-8 sm:grid-cols-3">
          {[
            ['Choose a package', 'Pick the check-up that suits your age and needs.'],
            ['Book or call', `Request a slot online or call ${site.phone.primary}.`],
            ['Visit the hospital', 'Come in for your tests; our team guides you through each step.'],
          ].map(([t, d], i) => (
            <div key={t} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 font-semibold text-white">{i + 1}</span>
              <div>
                <h3 className="font-semibold text-brand-900">{t}</h3>
                <p className="mt-1 text-sm text-muted">{d}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted">
          Prices are as published by Amaltas Hospital and may change — please confirm at the time of booking. Some tests apply only to
          specific patients (e.g. women, men or diabetic patients) as noted. Have questions? <Link to="/contact" className="font-semibold text-brand-700 hover:underline">Contact us</Link>.
        </p>
      </Container>

      <Lightbox photos={posters} index={poster} onClose={() => setPoster(null)} onChange={setPoster} />
    </>
  );
}
