import type { ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarPlus, Languages, Clock, Award, ArrowLeft } from 'lucide-react';
import { Seo, physicianJsonLd, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { doctors } from '@/data/doctors';
import { specialties } from '@/data/specialties';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Placeholder } from '@/components/ui/Placeholder';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { VerificationNote } from '@/components/ui/VerificationNote';
import NotFoundPage from './NotFoundPage';

export default function DoctorProfilePage() {
  const { slug } = useParams();
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) return <NotFoundPage />;

  const docSpecialties = specialties.filter((s) => doctor.specialtySlugs.includes(s.slug));
  const path = `/doctors/${doctor.slug}`;

  return (
    <>
      <Seo
        title={`${doctor.name} — ${doctor.role ?? docSpecialties[0]?.name ?? 'Specialist'}`}
        description={`${doctor.name}, ${doctor.qualifications}${doctor.role ? `, ${doctor.role}` : ''} at Amaltas Super Speciality Hospital, Dewas.`}
        path={path}
        type="profile"
        jsonLd={[
          physicianJsonLd(doctor.name, doctor.qualifications, path),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Doctors', path: '/doctors' }, { name: doctor.name, path }]),
        ]}
      />
      <PageHeader
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Doctors', path: '/doctors' }, { name: doctor.name, path }]}
        title={doctor.name}
        intro={doctor.role}
      />

      <Container className="py-10">
        {!doctor.verified && <VerificationNote>This doctor record is unverified. Confirm details before publishing.</VerificationNote>}
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Card className="overflow-hidden">
              <Placeholder asset={doctor.photo} aspect="aspect-[4/5]" rounded="rounded-none" label={doctor.name} />
              <div className="p-5">
                <p className="text-sm text-muted">{doctor.qualifications}</p>
                <div className="mt-4 grid gap-2">
                  <Button to="/patients/appointment"><CalendarPlus className="h-4 w-4" aria-hidden /> Book Appointment</Button>
                </div>
              </div>
            </Card>
          </aside>

          <div>
            <section aria-labelledby="specialties-heading">
              <h2 id="specialties-heading" className="text-h3 text-brand-900">Specialties</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {docSpecialties.length > 0 ? docSpecialties.map((s) => (
                  <Link key={s.slug} to={`/specialties/${s.slug}`} className="rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-100">
                    {s.name}
                  </Link>
                )) : <p className="text-muted">To be updated.</p>}
              </div>
            </section>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <InfoTile icon={<Award className="h-5 w-5" />} label="Experience" value={doctor.experienceYears ? `${doctor.experienceYears}+ years` : 'To be updated'} />
              <InfoTile icon={<Languages className="h-5 w-5" />} label="Languages" value={doctor.languages?.join(', ') ?? 'To be updated'} />
              <InfoTile icon={<Clock className="h-5 w-5" />} label="Consultation" value={doctor.consultation ?? 'By appointment'} />
            </div>

            {doctor.expertise && doctor.expertise.length > 0 && (
              <section className="mt-8" aria-labelledby="expertise-heading">
                <h2 id="expertise-heading" className="text-h3 text-brand-900">Areas of expertise</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {doctor.expertise.map((e) => (
                    <li key={e} className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm">{e}</li>
                  ))}
                </ul>
              </section>
            )}

            <p className="mt-8 text-sm text-muted">
              Detailed profile information (experience, areas of expertise, consultation timings) will be added from verified hospital records.
            </p>

            <Link to="/doctors" className="mt-8 inline-flex items-center gap-1 font-medium text-brand-700 hover:gap-2 transition-all">
              <ArrowLeft className="h-4 w-4" aria-hidden /> Back to all doctors
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}

function InfoTile({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2 text-brand-600">{icon}<span className="text-xs font-semibold uppercase tracking-wider">{label}</span></div>
      <p className="mt-1.5 text-sm text-ink">{value}</p>
    </div>
  );
}
