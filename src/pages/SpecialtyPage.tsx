import { useParams, Link } from 'react-router-dom';
import { CalendarPlus, Stethoscope, ClipboardList, Activity, ArrowRight } from 'lucide-react';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { specialties } from '@/data/specialties';
import { doctors } from '@/data/doctors';
import { facilities } from '@/data/facilities';
import { articles } from '@/data/articles';
import { resolveIcon } from '@/lib/icons';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { VerificationNote } from '@/components/ui/VerificationNote';
import NotFoundPage from './NotFoundPage';

/**
 * ONE reusable template for every specialty (data-driven) — no duplicated
 * CardiologyPage/NeurologyPage files. Structure: overview → conditions →
 * treatments → doctors → facilities → FAQs → related articles → CTA.
 */
export default function SpecialtyPage() {
  const { slug } = useParams();
  const specialty = specialties.find((s) => s.slug === slug);
  if (!specialty) return <NotFoundPage />;

  const Icon = resolveIcon(specialty.icon);
  const path = `/specialties/${specialty.slug}`;
  const specialtyDoctors = doctors.filter((d) => d.specialtySlugs.includes(specialty.slug));
  const specialtyFacilities = facilities.filter((f) => specialty.facilitySlugs?.includes(f.slug));
  const related = articles.filter((a) => a.kind === 'article' && a.category?.toLowerCase().includes(specialty.name.split(' ')[0].toLowerCase()));

  return (
    <>
      <Seo
        title={specialty.name}
        description={specialty.description}
        path={path}
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Specialties', path: '/specialties' }, { name: specialty.name, path }])}
      />
      <PageHeader
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Specialties', path: '/specialties' }, { name: specialty.name, path }]}
        title={specialty.name}
        intro={specialty.description}
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/patients/appointment"><CalendarPlus className="h-4 w-4" aria-hidden /> Book Appointment</Button>
          <Button href="#doctors" variant="outline"><Stethoscope className="h-4 w-4" aria-hidden /> See doctors</Button>
        </div>
      </PageHeader>

      <Container className="py-10">
        <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <Icon className="h-7 w-7" aria-hidden />
        </span>

        {/* Conditions & treatments */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="mb-3 flex items-center gap-2 text-brand-700"><Activity className="h-5 w-5" aria-hidden /><h2 className="text-h4 text-brand-900">Conditions we treat</h2></div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {specialty.conditions.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-ink/90"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden />{c}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <div className="mb-3 flex items-center gap-2 text-brand-700"><ClipboardList className="h-5 w-5" aria-hidden /><h2 className="text-h4 text-brand-900">Treatments &amp; procedures</h2></div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {specialty.treatments.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-ink/90"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />{t}</li>
              ))}
            </ul>
          </Card>
        </div>
        <VerificationNote>Condition/treatment lists are general standard-of-care items — have a clinician confirm the hospital-specific scope.</VerificationNote>
      </Container>

      {/* Doctors */}
      <Section id="doctors" className="bg-brand-50/60" ariaLabel="Doctors in this specialty">
        <SectionHeading eyebrow="Our team" title={`${specialty.name} specialists`} />
        {specialtyDoctors.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {specialtyDoctors.map((d) => <DoctorCard key={d.slug} doctor={d} />)}
          </div>
        ) : (
          <p className="mt-6 text-muted">Doctor listings for this specialty will be added soon. <Link to="/doctors" className="font-medium text-brand-700 hover:underline">View all doctors</Link>.</p>
        )}
      </Section>

      <Container className="py-10">
        {/* Facilities */}
        {specialtyFacilities.length > 0 && (
          <section aria-labelledby="fac-heading" className="mb-12">
            <h2 id="fac-heading" className="text-h3 text-brand-900">Supporting facilities</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {specialtyFacilities.map((f) => {
                const FIcon = resolveIcon(f.icon);
                return (
                  <div key={f.slug} className="rounded-2xl border border-line bg-surface p-4 shadow-card">
                    <FIcon className="mb-2 h-5 w-5 text-brand-600" aria-hidden />
                    <p className="text-sm font-semibold text-brand-900">{f.name}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQs */}
        {specialty.faqs && specialty.faqs.length > 0 && (
          <section aria-labelledby="faq-heading" className="mb-12">
            <h2 id="faq-heading" className="mb-4 text-h3 text-brand-900">Frequently asked questions</h2>
            <Accordion items={specialty.faqs} />
          </section>
        )}

        {/* Related articles */}
        {related.length > 0 && (
          <section aria-labelledby="rel-heading" className="mb-12">
            <h2 id="rel-heading" className="mb-4 text-h3 text-brand-900">Related reading</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <Card key={a.slug} to={`/articles/${a.slug}`} className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">{a.category}</span>
                  <h3 className="mt-1 font-semibold text-brand-900">{a.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-brand-700">Read <ArrowRight className="h-4 w-4" aria-hidden /></span>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="rounded-3xl bg-brand-800 px-6 py-10 text-center text-white">
          <h2 className="text-h2 text-white">Need care for {specialty.category === 'general' ? 'a health concern' : specialty.name.toLowerCase()}?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">Book an appointment with a specialist, or contact us to learn more.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button to="/patients/appointment" variant="secondary">Book an Appointment</Button>
            <Button to="/contact" variant="outline" className="border-white/30 text-white hover:bg-white/10">Contact us</Button>
          </div>
        </div>
      </Container>
    </>
  );
}
