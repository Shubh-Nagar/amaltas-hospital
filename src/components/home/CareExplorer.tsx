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

/** "What brings you here?" — patient-intent entry points in plain language. */
export function WhatBringsYou() {
  return (
    <Section className="bg-brand-50/60" ariaLabel="What brings you here">
      <SectionHeading
        eyebrow="Start here"
        title="What brings you here today?"
        description="Explore care the way you think about it — by concern, not clinical terms."
      />
      <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {conditionCategories.map((cat, i) => {
          const Icon = resolveIcon(cat.icon);
          return (
            <Reveal key={cat.slug} delay={i * 0.03}>
              <Link
                to={`/specialties/${cat.specialtySlug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-semibold text-brand-900">{cat.label}</span>
                <span className="mt-1 text-xs text-muted">{cat.blurb}</span>
                <ArrowRight className="mt-3 h-4 w-4 text-brand-400 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
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
