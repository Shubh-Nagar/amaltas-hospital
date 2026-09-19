import { ArrowRight, GraduationCap } from 'lucide-react';
import { doctors } from '@/data/doctors';
import { facilities } from '@/data/facilities';
import { site } from '@/data/site';
import { resolveIcon } from '@/lib/icons';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

/** Meet our specialists — verified featured doctors. */
export function FeaturedDoctors() {
  const featured = doctors.filter((d) => d.featured).slice(0, 4);
  return (
    <Section className="bg-brand-50/60" ariaLabel="Our specialists">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Our specialists" title="Meet our doctors" description="Experienced clinicians across our core specialities." />
        <Button to="/doctors" variant="outline" className="hidden sm:inline-flex">
          View all doctors <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
      <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {featured.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.05}><DoctorCard doctor={d} /></Reveal>
        ))}
      </div>
      <div className="mt-6 sm:hidden">
        <Button to="/doctors" variant="outline" className="w-full">View all doctors</Button>
      </div>
    </Section>
  );
}

/** Facilities — factual content preserved, presentation restructured. */
export function FacilitiesShowcase() {
  return (
    <Section ariaLabel="Facilities">
      <SectionHeading eyebrow="Facilities" title="Everything patients need, on one campus" description="From emergency and intensive care to diagnostics and pharmacy." />
      <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {facilities.map((f, i) => {
          const Icon = resolveIcon(f.icon);
          return (
            <Reveal key={f.slug} delay={i * 0.03}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-card">
                <Icon className="mb-3 h-6 w-6 text-brand-600" aria-hidden />
                <h3 className="text-sm font-semibold text-brand-900">{f.name}</h3>
                <p className="mt-1 text-xs text-muted">{f.summary}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/** Campus — separates academic/medical-education ecosystem from patient care. */
export function CampusShowcase() {
  return (
    <Section ariaLabel="Amaltas campus">
      <div className="grid gap-8 overflow-hidden rounded-3xl border border-line bg-surface shadow-card lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            <GraduationCap className="h-4 w-4" aria-hidden /> Academics
          </span>
          <h2 className="mt-3 text-h2 text-brand-900">Explore the Amaltas campus</h2>
          <p className="mt-4 max-w-lg text-muted">
            Beyond patient care, {site.academicName} is home to a {site.campusAcres}-acre medical-education campus training the next generation of doctors.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/academics">Discover academics</Button>
            <Button to="/gallery" variant="outline">View gallery</Button>
          </div>
        </div>
        <div className="min-h-[16rem]">
          <img
            src="/images/hero/hospital-exterior.jpg"
            alt="Amaltas Institute of Medical Sciences campus"
            width={750}
            height={600}
            loading="lazy"
            decoding="async"
            className="h-full min-h-[16rem] w-full object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
