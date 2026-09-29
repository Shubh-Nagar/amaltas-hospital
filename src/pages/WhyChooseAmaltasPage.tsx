import { Ambulance, HeartHandshake, Microscope, ShieldCheck, Stethoscope, type LucideIcon } from 'lucide-react';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Placeholder } from '@/components/ui/Placeholder';

/** Content as published on amaltashospital.in/why-choose-amaltas-hospital. */
const strengths: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Stethoscope,
    title: 'Highly Qualified Doctors & Medical Specialists',
    body: 'A team of experienced physicians, surgeons, and healthcare professionals dedicated to excellence in patient care.',
  },
  {
    icon: Ambulance,
    title: '24/7 Emergency & Critical Care Services',
    body: 'Round-the-clock emergency response, supported by advanced life-saving equipment and trained emergency medical teams.',
  },
  {
    icon: Microscope,
    title: 'Modern Equipment & Advanced Technology',
    body: 'State-of-the-art ICUs, NICUs, modular operating theaters, diagnostic labs, and imaging systems for accurate and effective treatment.',
  },
  {
    icon: ShieldCheck,
    title: 'Clean, Safe & Patient-Friendly Environment',
    body: 'A hygienic, comfortable, and safe setting that ensures a peaceful and supportive atmosphere for patients and families.',
  },
  {
    icon: HeartHandshake,
    title: 'Caring Nursing & Support Staff',
    body: 'A compassionate and well-trained team providing attentive care and emotional support throughout your stay.',
  },
];

export default function WhyChooseAmaltasPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Why Choose Amaltas', path: '/about/why-choose-amaltas' },
  ];
  return (
    <>
      <Seo title="Why Choose Amaltas Hospital" description="Why patients trust Amaltas Hospital, Dewas — expert specialists, 24/7 emergency care, modern technology and compassionate nursing." path="/about/why-choose-amaltas"
        jsonLd={[breadcrumbJsonLd(crumbs)]} />
      <PageHeader crumbs={crumbs} title="Why Choose Amaltas Hospital" intro="A trusted center for advanced and compassionate healthcare in Dewas." image={pageImages.whyChoose} />

      <Container className="py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="prose-editorial">
            <h2 className="!mt-0">Why Amaltas?</h2>
            <p>Amaltas Hospital, Dewas, is a trusted center for advanced and compassionate healthcare. Our commitment is to deliver high-quality medical services powered by modern technology, expert professionals, and a patient-first approach. We focus on providing not only effective treatment but also genuine care, comfort, and confidence throughout your healthcare journey.</p>
            <p>We believe that every individual deserves timely, safe, and ethical medical care. With world-class facilities, experienced specialists, and a warm healing environment, Amaltas Hospital is dedicated to supporting healthier lives and stronger communities.</p>
          </div>
          <Placeholder
            asset={{ src: '/images/gallery/doctor-ward-round.webp', alt: 'Amaltas doctors on a ward round' }}
            aspect="aspect-[4/3]"
          />
        </div>
      </Container>

      <Section className="bg-brand-50/60" ariaLabel="Our key strengths">
        <SectionHeading eyebrow="What sets us apart" title="Our Key Strengths" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-brand-800">{title}</h3>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
