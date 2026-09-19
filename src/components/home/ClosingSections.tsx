import { Link } from 'react-router-dom';
import { Quote, ArrowRight, Phone, Mail, MapPin, Navigation } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { articles } from '@/data/articles';
import { accreditations, site } from '@/data/site';
import { formatDate } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EmptyState } from '@/components/ui/EmptyState';
import { Card } from '@/components/ui/Card';
import { Placeholder } from '@/components/ui/Placeholder';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

/** Patient stories — real, consented only. Empty state until stories exist. */
export function PatientStories() {
  const stories = testimonials.filter((t) => t.verified && t.consentOnFile);
  if (stories.length === 0) {
    return (
      <Section className="bg-brand-50/60" ariaLabel="Patient stories">
        <SectionHeading align="center" eyebrow="Patient stories" title="Real journeys, real people" />
        <div className="mx-auto mt-8 max-w-2xl">
          <EmptyState
            icon={<Quote className="h-8 w-8" />}
            title="Stories coming soon"
            description="We share patient experiences only with consent. Verified stories will appear here."
          />
        </div>
      </Section>
    );
  }
  return (
    <Section className="bg-brand-50/60" ariaLabel="Patient stories">
      <SectionHeading eyebrow="Patient stories" title="Real journeys, real people" />
      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {stories.slice(0, 3).map((t) => (
          <Card key={t.slug} className="p-6">
            <Quote className="h-7 w-7 text-accent-500" aria-hidden />
            <p className="mt-3 text-ink/90">“{t.quote}”</p>
            <p className="mt-4 text-sm font-semibold text-brand-900">{t.patientName}</p>
            {t.treatment && <p className="text-xs text-muted">{t.treatment}</p>}
          </Card>
        ))}
      </div>
    </Section>
  );
}

/** Health insights — clean editorial layout for the latest articles. */
export function HealthInsights() {
  const latest = articles.filter((a) => a.kind === 'article').slice(0, 3);
  return (
    <Section ariaLabel="Health insights">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Health insights" title="Guidance from our health desk" description="Practical, general health information to help you stay informed." />
        <Button to="/articles" variant="outline" className="hidden sm:inline-flex">
          All articles <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {latest.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.05}>
            <Card to={`/articles/${a.slug}`} className="flex h-full flex-col overflow-hidden">
              <Placeholder asset={a.cover} aspect="aspect-[16/9]" rounded="rounded-none" label={a.category ?? 'Article'} />
              <div className="flex flex-1 flex-col p-5">
                {a.category && <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">{a.category}</span>}
                <h3 className="mt-1 text-h4 text-brand-900">{a.title}</h3>
                <p className="mt-2 text-sm text-muted">{a.excerpt}</p>
                <span className="mt-auto pt-4 text-xs text-muted">{formatDate(a.publishedAt)}</span>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** Accreditations strip — only verified badges. */
export function AccreditationsStrip() {
  const verified = accreditations.filter((a) => a.verified);
  if (verified.length === 0) return null;
  return (
    <Section as="div" className="!py-10" ariaLabel="Accreditations">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted">Accredited &amp; recognised</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {verified.map((a) => (
            <span key={a.name} className="rounded-xl border border-line bg-surface px-5 py-3 font-display text-lg font-semibold text-brand-800 shadow-card" title={a.fullName}>
              {a.name}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** Location + contact. */
export function LocationSection() {
  const mapQuery = encodeURIComponent(`${site.name} ${site.address.line1} ${site.address.city}`);
  return (
    <Section id="directions" ariaLabel="Location and directions">
      <div className="grid gap-8 overflow-hidden rounded-3xl border border-line bg-surface shadow-card lg:grid-cols-2">
        <div className="p-8 sm:p-12">
          <SectionHeading eyebrow="Visit us" title="Find your way to Amaltas" />
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
              <span>{site.address.line1}<br />{site.address.city}, {site.address.state} {site.address.postalCode}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-brand-600" aria-hidden />
              <a href={`tel:${site.phone.tollFree.replace(/[^+\d]/g, '')}`} className="hover:text-brand-700">Toll Free {site.phone.tollFree}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-brand-600" aria-hidden />
              <a href={`mailto:${site.email.general}`} className="hover:text-brand-700">{site.email.general}</a>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}>
              <Navigation className="h-4 w-4" aria-hidden /> Get directions
            </Button>
            <Button to="/contact" variant="outline">Contact us</Button>
          </div>
        </div>
        <div className="min-h-[18rem] bg-brand-100">
          <iframe
            title="Map to Amaltas Super Speciality Hospital"
            src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-full min-h-[18rem] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Section>
  );
}

/** Final CTA. */
export function FinalCta() {
  return (
    <Section ariaLabel="Book an appointment">
      <div className="relative overflow-hidden rounded-3xl bg-brand-800 px-6 py-14 text-center text-white sm:px-12">
        <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-h1 text-white">Your health deserves the right care.</h2>
          <p className="mt-4 text-lead text-white/80">Book an appointment with the right specialist, or reach us any time for emergencies.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/patients/appointment" size="lg" variant="secondary">Book an Appointment</Button>
            <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 font-medium text-white hover:bg-white/10">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
