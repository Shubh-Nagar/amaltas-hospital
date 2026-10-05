import { GraduationCap, BookOpen, Users, Building2, Stethoscope, Leaf, Droplets, HeartPulse, Pill, Activity, ExternalLink, type LucideIcon } from 'lucide-react';
import { institutions, universityInstitutionsUrl, type InstitutionIcon } from '@/data/institutions';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { site } from '@/data/site';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Placeholder } from '@/components/ui/Placeholder';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const areas = [
  { icon: BookOpen, title: 'Courses', body: 'Medical education programmes at AIMS. [Details to be verified].' },
  { icon: Users, title: 'Faculty', body: 'Experienced faculty across disciplines. [Details to be verified].' },
  { icon: Building2, title: 'Campus & Student Life', body: `A ${site.campusAcres}-acre campus supporting learning and living.` },
];

const institutionIcons: Record<InstitutionIcon, LucideIcon> = {
  medicine: Stethoscope,
  ayurveda: Leaf,
  homoeopathy: Droplets,
  nursing: HeartPulse,
  pharmacy: Pill,
  paramedical: Activity,
};

export default function AcademicsPage() {
  return (
    <>
      <Seo title="Academics — Amaltas Institute of Medical Sciences" description={`Medical education at ${site.academicName}, Dewas.`} path="/academics"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Academics', path: '/academics' }])} />
      <PageHeader crumbs={[{ name: 'Home', path: '/' }, { name: 'Academics', path: '/academics' }]} title="Academics"
        intro={`${site.academicName} — training the next generation of doctors alongside patient care.`} image={pageImages.academics}
                                                                                                         />

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700"><GraduationCap className="h-7 w-7" aria-hidden /></span>
            <div className="prose-editorial">
              <p>The academic ecosystem at Amaltas is intentionally distinct from patient-care services, so prospective students and patients each find a clear journey.</p>
              <p className="text-sm text-muted"><em>[CONTENT REQUIRES VERIFICATION] — course lists, intake, fees, faculty and admissions details must be confirmed against official AIMS sources.</em></p>
            </div>
            <div className="mt-6"><Button href={`mailto:${site.email.academic}`}>Contact admissions</Button></div>
          </div>
          <Placeholder asset={institutions[0].image} aspect="aspect-[4/3]" label="AIMS academic campus" />
        </div>
      </Container>

      <Section ariaLabel="Our institutions">
        <SectionHeading
          eyebrow="Amaltas University"
          title="Our institutions"
          description="From modern medicine to classical Ayurveda, nursing to rehabilitation — every Amaltas institution is built around a single working hospital."
        />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {institutions.map((inst) => {
            const Icon = institutionIcons[inst.icon];
            return (
              <li key={inst.name}>
                <Card className="flex h-full flex-col overflow-hidden">
                  <img
                    src={inst.image.src}
                    alt={inst.image.alt}
                    width={inst.image.width}
                    height={inst.image.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">{inst.level}</span>
                      <h3 className="mt-0.5 text-h4 text-brand-900">{inst.name}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted">{inst.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Programmes at ${inst.name}`}>
                    {inst.programmes.map((p) => (
                      <li key={p} className="rounded-full border border-line bg-brand-50/60 px-2.5 py-1 text-xs font-medium text-brand-800">{p}</li>
                    ))}
                  </ul>
                  <a
                    href={inst.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-700 hover:text-brand-900"
                  >
                    Visit website <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex justify-center">
          <Button href={universityInstitutionsUrl} variant="outline">
            Explore all programmes at Amaltas University <ExternalLink className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Section>

      <Section className="bg-brand-50/60" ariaLabel="Academic areas">
        <SectionHeading eyebrow="Explore" title="Learning at Amaltas" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {areas.map((a) => (
            <Card key={a.title} className="p-6">
              <a.icon className="mb-3 h-7 w-7 text-brand-600" aria-hidden />
              <h2 className="text-h4 text-brand-900">{a.title}</h2>
              <p className="mt-1.5 text-sm text-muted">{a.body}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
