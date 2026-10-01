import { Link } from 'react-router-dom';
import { ArrowUpRight, Quote } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { leaders } from '@/data/leadership';

/** Our Leadership — messages from the chairman and hospital administration. */
export function Leadership() {
  return (
    <Section ariaLabel="Our leadership">
      <SectionHeading
        eyebrow="Our leadership"
        title="Messages from our leadership"
        description="The people guiding Amaltas Hospital's commitment to ethical, accessible, world-class care."
      />
      <div className="mt-9 grid gap-6 md:grid-cols-3">
        {leaders.map((l, i) => (
          <Reveal key={l.name} delay={i * 0.06}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-shadow duration-300 hover:shadow-card-hover">
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-brand-50 to-brand-100">
                <img
                  src={l.photo.src}
                  alt={`${l.name}, ${l.title}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-950/90 via-brand-950/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-lg font-semibold text-white">{l.name}</h3>
                  <p className="text-sm text-accent-400">{l.title}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Quote className="h-6 w-6 text-accent-500" aria-hidden />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink/80">{l.excerpt}</blockquote>
                <Link
                  to={l.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900"
                >
                  Read full message <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
