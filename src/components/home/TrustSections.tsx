import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Microscope, Users, ArrowRight } from 'lucide-react';
import { stats } from '@/data/site';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/** Trust band — only VERIFIED metrics are shown (see data/site.ts). */
export function TrustStats() {
  const verified = stats.filter((s) => s.verified);
  return (
    <Section as="div" className="!py-12" bleed>
      <Container>
        <div className="grid grid-cols-1 gap-6 rounded-3xl bg-brand-800 px-6 py-10 text-white sm:grid-cols-3 sm:px-10">
          {verified.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="font-display text-4xl font-semibold text-accent-400">{s.value}</p>
              <p className="mt-1 text-sm uppercase tracking-wider text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const pillars = [
  { icon: ShieldCheck, title: 'Accredited care', body: 'NABH-accredited processes focused on patient safety and quality.' },
  { icon: Microscope, title: 'Integrated diagnostics', body: 'Pathology, imaging and 25+ specialist teams coordinated under one roof.' },
  { icon: HeartHandshake, title: 'Human-centred', body: 'Care designed around patients and families, not just departments.' },
  { icon: Users, title: 'Regional reach', body: 'Serving Dewas and surrounding districts of Central India.' },
];

/** Why Amaltas — editorial pillars over a looping drone shot of the campus. */
export function WhyAmaltas() {
  const reduce = useReducedMotion();
  return (
    <section aria-label="Why Amaltas" className="relative isolate overflow-hidden py-14 sm:py-20">
      {/* Background video: decorative, muted, and held on its poster frame for reduced motion */}
      <video
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src="/videos/campus-drone-compressed.mp4"
        poster="/videos/campus-drone-poster.jpg"
        autoPlay={!reduce}
        muted
        loop
        playsInline
        preload={reduce ? 'none' : 'auto'}
      />
      {/* Brand-tinted scrim keeps the heading legible over the moving footage */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900/65 via-brand-900/30 to-transparent" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="flex flex-col items-start gap-3 [text-shadow:0_1px_12px_rgb(0_0_0/0.45)]">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-400">
              <span className="h-px w-6 bg-accent-500" aria-hidden />
              Why Amaltas
            </span>
            <h2 className="text-h2 text-white">A hospital built around trust and outcomes</h2>
            <p className="max-w-3xl text-lead text-white/80">
              From accredited processes to integrated specialities, every part of Amaltas is designed to help patients get the right care at the right time.
            </p>
            <Link to="/about" className="mt-4 inline-flex items-center gap-1 font-medium text-accent-400 hover:gap-2 transition-all">
              More about Amaltas <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/40 bg-surface/85 p-5 shadow-card backdrop-blur-md">
                  <p.icon className="mb-3 h-7 w-7 text-brand-600" aria-hidden />
                  <h3 className="text-base font-semibold text-brand-900">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Advanced technology — verified capability, presented as visual storytelling. */
export function AdvancedTech() {
  return (
    <Section ariaLabel="Advanced technology">
      <div className="grid gap-8 rounded-3xl border border-line bg-gradient-to-br from-brand-900 to-brand-800 p-8 text-white sm:p-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-accent-400">Advanced technology</span>
          <h2 className="mt-3 text-h2 text-white">Modern infrastructure for complex care</h2>
          <p className="mt-4 max-w-lg text-white/80">
            Comprehensive cancer care brings together medical, surgical and radiation oncology alongside diagnostic imaging — supporting accurate diagnosis and treatment planning.
          </p>
          <p className="mt-3 text-sm text-white/50">
            [CONTENT REQUIRES VERIFICATION] Confirm current advanced-imaging and radiotherapy equipment before publishing specific capabilities.
          </p>
          <Link to="/services/radiation-oncology" className="mt-6 inline-flex items-center gap-1 font-medium text-accent-400 hover:gap-2 transition-all">
            Explore cancer care <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="aspect-video overflow-hidden rounded-2xl border border-white/10">
          <img
            src="/images/gallery/ct-scanner.webp"
            alt="CT scanner in the imaging department at Amaltas Hospital"
            width={1536}
            height={862}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
