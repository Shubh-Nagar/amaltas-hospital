import { GraduationCap, BookOpen, Users, Building2 } from 'lucide-react';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { site } from '@/data/site';
import { PageHeader } from '@/components/ui/PageHeader';
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

export default function AcademicsPage() {
  return (
    <>
      <Seo title="Academics — Amaltas Institute of Medical Sciences" description={`Medical education at ${site.academicName}, Dewas.`} path="/academics"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Academics', path: '/academics' }])} />
      <PageHeader crumbs={[{ name: 'Home', path: '/' }, { name: 'Academics', path: '/academics' }]} title="Academics"
        intro={`${site.academicName} — training the next generation of doctors alongside patient care.`} />

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
          <Placeholder aspect="aspect-[4/3]" label="AIMS academic campus" />
        </div>
      </Container>

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
