import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { networkIntro, networkUnits, type NetworkUnit } from '@/data/network';
import { resolveIcon } from '@/lib/icons';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useStepCarousel, CarouselArrows, carouselTrackClass } from '@/components/ui/StepCarousel';

function UnitCard({ unit }: { unit: NetworkUnit }) {
  const Icon = resolveIcon(unit.icon);
  const body = (
    <>
      <div className="relative aspect-[5/4] overflow-hidden bg-brand-100">
        <img src={unit.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-700 ease-soft group-hover:scale-105" />
        {unit.altImage && (
          <img src={unit.altImage} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-[transform,opacity] duration-700 ease-soft group-hover:scale-105 group-hover:opacity-100" />
        )}
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/10 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-brand-700 shadow-sm backdrop-blur transition-colors duration-300 group-hover:bg-accent-400 group-hover:text-brand-950">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-400">{unit.type}</span>
          <h3 className="mt-1 flex items-start justify-between gap-3 font-display text-xl font-semibold leading-snug">
            {unit.name}
            {unit.href && (
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            )}
          </h3>
        </div>
      </div>
    </>
  );
  const cls = 'group block overflow-hidden rounded-2xl shadow-card transition-[transform,box-shadow] duration-300 ease-soft';
  if (!unit.href) return <div className={cls}>{body}</div>;
  if (unit.href.startsWith('http')) {
    return <a href={unit.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:-translate-y-1 hover:shadow-card-hover`}>{body}</a>;
  }
  return <Link to={unit.href} className={`${cls} hover:-translate-y-1 hover:shadow-card-hover`}>{body}</Link>;
}

/** Our Hospital Network — the five Amaltas centres shown on the amaltashospital.in homepage. */
export function HospitalNetwork() {
  const { trackProps, prev, next } = useStepCarousel<HTMLUListElement>();

  return (
    <Section className="bg-brand-50/60" ariaLabel="Our hospital network">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Our hospitals" title="Our Hospital Network" description={networkIntro} />
        <CarouselArrows onPrev={prev} onNext={next} />
      </div>

      <ul {...trackProps} className={`mt-9 ${carouselTrackClass}`}>
        {networkUnits.map((u) => (
          <li key={u.name} className="w-[82%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)]">
            <UnitCard unit={u} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
