import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Microscope, Users, ArrowRight } from 'lucide-react';
import { stats } from '@/data/site';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
  { icon: Microscope, title: 'Integrated diagnostics', body: 'Pathology, imaging and specialist teams coordinated under one roof.' },
  { icon: HeartHandshake, title: 'Human-centred', body: 'Care designed around patients and families, not just departments.' },
  { icon: Users, title: 'Regional reach', body: 'Serving Dewas and surrounding districts of Central India.' },
];

/** Why Amaltas — editorial pillars, not a flat icon grid. */
export function WhyAmaltas() {
  return (
    <Section className="bg-brand-50/60" ariaLabel="Why Amaltas">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Why Amaltas"
          title="A hospital built around trust and outcomes"
          description="From accredited processes to integrated specialities, every part of Amaltas is designed to help patients get the right care at the right time."
        >
          <Link to="/about" className="mt-4 inline-flex items-center gap-1 font-medium text-brand-700 hover:gap-2 transition-all">
            More about Amaltas <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-line bg-surface p-5 shadow-card">
                <p.icon className="mb-3 h-7 w-7 text-brand-600" aria-hidden />
                <h3 className="text-base font-semibold text-brand-900">{p.title}</h3>
                <p className="mt-1 text-sm text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
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
            src="/images/gallery/endoscopic-procedure.jpg"
            alt="Clinical team using imaging equipment during a minimally invasive procedure at Amaltas Hospital"
            width={1600}
            height={898}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
