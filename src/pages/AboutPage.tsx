import { Seo, medicalOrgJsonLd, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { site, accreditations, stats } from '@/data/site';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Placeholder } from '@/components/ui/Placeholder';

export default function AboutPage() {
  const verifiedStats = stats.filter((s) => s.verified);
  return (
    <>
      <Seo title="About Amaltas" description={`About ${site.name} (${site.academicName}), a NABH-accredited multi-superspeciality hospital in Dewas.`} path="/about"
        jsonLd={[medicalOrgJsonLd(), breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])]} />
      <PageHeader crumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} title="About Amaltas" intro={site.descriptionShort} image={pageImages.about} />

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="prose-editorial">
            <p>{site.academicName} is a multi-superspeciality hospital serving Dewas and the surrounding districts of Central India, with a focus on evidence-based, patient-centred care.</p>
            <p>The institution combines clinical care with medical education across a {site.campusAcres}-acre campus, bringing together specialists, diagnostics and critical-care infrastructure.</p>
            <p className="text-sm text-muted"><em>[PROPOSED COPY] — brand narrative to be reviewed and approved by Amaltas before launch.</em></p>
          </div>
          <Placeholder
            asset={{ src: '/images/hero/about-us.jpg', alt: 'Amaltas Super Speciality Hospital building', width: 433, height: 385 }}
            aspect="aspect-[4/3]"
          />
        </div>
      </Container>

      <Section className="bg-brand-50/60" ariaLabel="By the numbers">
        <SectionHeading eyebrow="At a glance" title="Amaltas by the numbers" description="Only verified figures are shown. Additional metrics will be added once confirmed." />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {verifiedStats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-surface p-6 text-center shadow-card">
              <p className="font-display text-4xl font-semibold text-brand-700">{s.value}</p>
              <p className="mt-1 text-sm uppercase tracking-wider text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="accreditations" ariaLabel="Accreditations">
        <SectionHeading eyebrow="Accreditations" title="Recognised for quality &amp; safety" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {accreditations.map((a) => (
            <div key={a.name} className={`rounded-2xl border p-6 ${a.verified ? 'border-line bg-surface' : 'border-dashed border-warning/40 bg-warning/5'}`}>
              <p className="font-display text-2xl font-semibold text-brand-800">{a.name}</p>
              <p className="mt-1 text-sm font-medium text-ink">{a.fullName}</p>
              {a.note && <p className="mt-2 text-xs text-muted">{a.note}</p>}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
