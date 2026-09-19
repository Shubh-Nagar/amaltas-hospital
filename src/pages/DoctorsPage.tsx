import { useMemo, useState } from 'react';
import { Search, UserX } from 'lucide-react';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { doctors } from '@/data/doctors';
import { specialties } from '@/data/specialties';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function DoctorsPage() {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return doctors.filter((d) => {
      const matchesSpecialty = specialty === 'all' || d.specialtySlugs.includes(specialty);
      const matchesQuery = !q || `${d.name} ${d.role ?? ''} ${d.qualifications}`.toLowerCase().includes(q);
      return matchesSpecialty && matchesQuery;
    });
  }, [query, specialty]);

  const clear = () => { setQuery(''); setSpecialty('all'); };

  return (
    <>
      <Seo
        title="Find a Doctor"
        description="Search and filter doctors at Amaltas Super Speciality Hospital by name or specialty."
        path="/doctors"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Doctors', path: '/doctors' }])}
      />
      <PageHeader
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Doctors', path: '/doctors' }]}
        title="Find a Doctor"
        intro="Search our specialists by name or filter by specialty."
        image={pageImages.doctors}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search doctors</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or role…"
              className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </label>
          <label className="sm:w-64">
            <span className="sr-only">Filter by specialty</span>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full rounded-full border border-line bg-surface px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <option value="all">All specialties</option>
              {specialties.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </label>
        </div>
      </PageHeader>

      <Container className="py-10">
        <p className={cn('mb-5 text-sm text-muted')} aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'doctor' : 'doctors'} found
        </p>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<UserX className="h-8 w-8" />}
            title="No doctors match these filters"
            description="Try a different specialty or clear your search."
            action={<Button onClick={clear} variant="outline">Clear filters</Button>}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((d) => <DoctorCard key={d.slug} doctor={d} />)}
          </div>
        )}
      </Container>
    </>
  );
}
