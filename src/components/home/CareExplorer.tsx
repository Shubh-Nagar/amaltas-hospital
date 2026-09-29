import type { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { conditionCategories } from '@/data/conditionCategories';
import { specialties } from '@/data/specialties';
import { resolveIcon } from '@/lib/icons';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpecialtyCard } from '@/components/specialties/SpecialtyCard';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { ConditionCategory } from '@/types';

/**
 * Bento layout for the 10 categories (desktop = 4×4 grid, mobile = 2 columns).
 * `grid-flow-dense` packs the tiles in data order with no gaps.
 */
const tileLayout: Record<string, string> = {
  heart: 'col-span-2 lg:row-span-2',
  'bones-joints': 'lg:row-span-2',
  'womens-health': 'col-span-2',
  'child-health': 'lg:row-span-2',
};

/** Card titles on the large feature tile get a bigger type size. */
const featureTile = 'heart';

/** "What brings you here?" — patient-intent entry points in plain language. */
export function WhatBringsYou() {
  return (
    <Section className="bg-brand-50/60" ariaLabel="What brings you here">
      <SectionHeading
        eyebrow="Start here"
        title="What brings you here today?"
        description="Explore care the way you think about it — by concern, not clinical terms."
      />
      <ul className="mt-9 grid grid-flow-dense auto-rows-[11.5rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:auto-rows-[14.5rem] lg:grid-cols-4">
        {conditionCategories.map((cat, i) => (
          <li key={cat.slug} className={cn('min-h-0', tileLayout[cat.slug])}>
            <Reveal delay={i * 0.04} className="h-full">
              <CareTile category={cat} feature={cat.slug === featureTile} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function CareTile({ category: cat, feature }: { category: ConditionCategory; feature: boolean }) {
  const Icon = resolveIcon(cat.icon);

  // Soft spotlight that follows the pointer across the card.
  function trackPointer(e: PointerEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  }

  return (
    <Link
      to={`/specialties/${cat.specialtySlug}`}
      onPointerMove={trackPointer}
      className="group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-brand-900 p-4 text-white shadow-card ring-1 ring-black/5 transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1.5 hover:shadow-card-hover focus-visible:-translate-y-1.5 focus-visible:ring-4 focus-visible:ring-accent-400 focus-visible:ring-offset-0 sm:p-5"
    >
      {/* Photo — slow zoom and lift on hover */}
      {cat.image && (
        <img
          src={cat.image.src}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ objectPosition: cat.focus ?? 'center' }}
          className="absolute inset-0 -z-20 h-full w-full scale-[1.03] object-cover saturate-[0.9] transition-[transform,filter] duration-[900ms] ease-soft group-hover:scale-110 group-hover:saturate-100 group-focus-visible:scale-110"
        />
      )}

      {/* Legibility gradient; deepens into brand green on hover */}
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/95 via-brand-950/45 to-brand-950/5 transition-opacity duration-500" />
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-tr from-brand-800/80 via-brand-700/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />

      {/* Pointer spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(255 255 255 / 0.16), transparent 45%)' }}
      />

      {/* Diagonal shine sweep */}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-[transform,opacity] duration-[1100ms] ease-soft group-hover:translate-x-[320%] group-hover:opacity-100" />

      {/* Glass icon chip */}
      <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-white backdrop-blur-md transition-all duration-500 ease-soft group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:border-accent-400 group-hover:bg-accent-400 group-hover:text-brand-950 sm:left-5 sm:top-5">
        <Icon className="h-5 w-5" aria-hidden />
      </span>

      {/* Arrow button */}
      <span aria-hidden className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-all duration-500 ease-soft group-hover:-rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-brand-900 sm:right-5 sm:top-5">
        <ArrowRight className="h-4 w-4" />
      </span>

      {/* Copy */}
      <span className="relative transition-transform duration-500 ease-soft group-hover:-translate-y-1">
        <span className={cn('block font-display font-semibold leading-tight text-white', feature ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-base sm:text-lg')}>
          {cat.label}
        </span>
        <span className={cn('mt-1 block text-white/80', feature ? 'text-sm sm:text-base' : 'text-xs sm:text-[0.8125rem]')}>{cat.blurb}</span>
        <span className="mt-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent-400 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:transition-all sm:duration-500 sm:ease-soft sm:group-hover:mt-3 sm:group-hover:max-h-6 sm:group-hover:opacity-100 sm:group-focus-visible:max-h-6 sm:group-focus-visible:opacity-100">
          Explore care <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
        </span>
        {/* Accent underline grows on hover */}
        <span aria-hidden className="mt-3 block h-0.5 w-8 rounded-full bg-accent-400 transition-all duration-500 ease-soft group-hover:w-16" />
      </span>
    </Link>
  );
}

/** Centres of Excellence — larger editorial cards for featured specialties. */
export function CentresOfExcellence() {
  const featured = specialties.filter((s) => s.featured);
  return (
    <Section ariaLabel="Centres of Excellence">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Centres of Excellence"
          title="Multi-superspeciality care under one roof"
          description="Integrated teams, diagnostics and critical care working together across our core specialities."
        />
        <Button to="/specialties" variant="outline" className="hidden sm:inline-flex">
          All specialties <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.04}>
            <SpecialtyCard specialty={s} featured />
          </Reveal>
        ))}
      </div>
      <div className="mt-6 sm:hidden">
        <Button to="/specialties" variant="outline" className="w-full">All specialties</Button>
      </div>
    </Section>
  );
}
