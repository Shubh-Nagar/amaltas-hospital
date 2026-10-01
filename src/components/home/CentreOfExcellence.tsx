import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { specialties } from '@/data/specialties';
import { conditionCategories } from '@/data/conditionCategories';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Marquee } from '@/components/ui/Marquee';

interface Tile {
  name: string;
  href: string;
  image: string;
  focus?: string;
}

/** The eight "Super Specialities" from the amaltashospital.in homepage, with that section's images. */
const superSpecialities: Tile[] = [
  { name: 'Oncology', href: '/specialties/oncology', image: '/images/specialities/oncology.jpeg' },
  { name: 'Cardiology', href: '/specialties/cardiology', image: '/images/specialities/cardiology.jpeg' },
  { name: 'Nephrology', href: '/specialties/nephrology', image: '/images/specialities/nephrology.jpg' },
  { name: 'Urology', href: '/specialties/urology', image: '/images/specialities/urology.jpg' },
  { name: 'Neurology', href: '/specialties/neurosciences', image: '/images/specialities/neurology.jpg' },
  { name: 'Gastroenterology', href: '/specialties/gastroenterology', image: '/images/specialities/gastroenterology.jpg' },
  { name: 'Plastic Surgery', href: '/specialties', image: '/images/specialities/plastic-surgery.jpg' },
  { name: 'Kidney Transplant', href: '/specialties/nephrology', image: '/images/specialities/kidney-transplant.jpg' },
];

/** Our remaining specialties, using their care-topic photos. */
const covered = new Set(['oncology', 'cardiology', 'nephrology', 'urology', 'neurosciences', 'gastroenterology']);
const moreSpecialities: Tile[] = specialties
  .filter((s) => !covered.has(s.slug))
  .map((s) => {
    const cat = conditionCategories.find((c) => c.specialtySlug === s.slug);
    return {
      name: s.name,
      href: `/specialties/${s.slug}`,
      image: cat?.image?.src ?? '/images/gallery/doctor-ward-round.webp',
      focus: cat?.focus,
    };
  });

function TileCard({ tile, copy }: { tile: Tile; copy: boolean }) {
  return (
    <Link
      to={tile.href}
      tabIndex={copy ? -1 : undefined}
      className="group block w-56 overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-soft hover:-translate-y-1.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:w-64"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
        <img
          src={tile.image}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ objectPosition: tile.focus ?? 'center' }}
          className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-110"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute bottom-3 left-3 inline-flex translate-y-2 items-center gap-1 rounded-full bg-accent-400 px-3 py-1 text-xs font-semibold text-brand-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Explore <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
      <div className="relative px-4 py-3.5">
        <h3 className="truncate text-[0.95rem] font-semibold text-brand-900">{tile.name}</h3>
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-600 transition-transform duration-300 group-hover:scale-x-100" />
      </div>
    </Link>
  );
}

/**
 * Centre of Excellence — specialty tiles on two endlessly scrolling rows that
 * run in opposite directions and pause on hover (after Metro Hospital's
 * Centre of Excellence grid, animated).
 */
export function CentreOfExcellence() {
  return (
    <Section className="overflow-hidden bg-brand-50/60" bleed ariaLabel="Centre of Excellence">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Centre of Excellence"
          title="Super Specialities"
          description="35+ specialities under one roof — integrated teams, diagnostics and critical care."
        />
      </Container>

      <div className="mt-10 grid gap-3">
        <Marquee items={superSpecialities} getKey={(t) => t.name} duration={45} render={(t, copy) => <TileCard tile={t} copy={copy} />} />
        <Marquee items={moreSpecialities} getKey={(t) => t.name} duration={40} reverse render={(t, copy) => <TileCard tile={t} copy={copy} />} />
      </div>

      <div className="mt-8 flex justify-center px-4">
        <Button to="/specialties" variant="outline">
          View all specialities <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </Section>
  );
}
