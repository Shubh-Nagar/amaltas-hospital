import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

/**
 * Bento-style photo wall from the hospital's own photography. The lead image
 * spans a 2×2 cell on large screens; the rest fill in around it.
 */
const shots = [
  { src: '/images/gallery/surgery-in-theatre.webp', alt: 'Surgical team operating in a theatre at Amaltas Hospital', caption: 'In theatre', lead: true },
  { src: '/images/gallery/echocardiography.webp', alt: 'Cardiologist performing an echocardiogram at Amaltas Hospital', caption: 'Cardiac imaging' },
  { src: '/images/gallery/nursing-station.webp', alt: 'Nursing station on a ward at Amaltas Hospital', caption: 'Nursing station' },
  { src: '/images/gallery/outpatient-consultation.webp', alt: 'Helpline team taking patient calls at Amaltas Hospital', caption: 'Patient helpline' },
  { src: '/images/gallery/reception-desk.webp', alt: 'Patients at the OPD reception desk at Amaltas Hospital', caption: 'OPD reception' },
];

export function PhotoMosaic() {
  return (
    <Section className="bg-brand-50/60" ariaLabel="Inside Amaltas">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Inside Amaltas"
          title="A look around the hospital"
          description="Our theatres, wards and diagnostic suites — photographed on campus."
        />
        <Button to="/gallery" variant="outline" className="hidden sm:inline-flex">
          View full gallery <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>

      <div className="mt-9 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] lg:grid-cols-4">
        {shots.map((shot, i) => (
          <Reveal
            key={shot.src}
            delay={i * 0.05}
            className={shot.lead ? 'col-span-2 row-span-2' : undefined}
          >
            <Link
              to="/gallery"
              className="group relative block h-full overflow-hidden rounded-2xl border border-line shadow-card focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <img
                src={shot.src}
                alt={shot.alt}
                width={1536}
                height={862}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-white">{shot.caption}</span>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 sm:hidden">
        <Button to="/gallery" variant="outline" className="w-full">View full gallery</Button>
      </div>
    </Section>
  );
}
