import { ArrowRight } from 'lucide-react';
import type { Doctor } from '@/types';
import { specialties } from '@/data/specialties';
import { Card } from '@/components/ui/Card';
import { Placeholder } from '@/components/ui/Placeholder';

function specialtyNames(slugs: string[]): string {
  return slugs
    .map((s) => specialties.find((sp) => sp.slug === s)?.name)
    .filter(Boolean)
    .join(', ');
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card to={`/doctors/${doctor.slug}`} className="flex flex-col overflow-hidden">
      <Placeholder asset={doctor.photo} aspect="aspect-[4/5]" rounded="rounded-none" label={doctor.name} />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-brand-900">{doctor.name}</h3>
        <p className="mt-0.5 text-sm text-brand-600">{doctor.role ?? specialtyNames(doctor.specialtySlugs)}</p>
        <p className="mt-1 text-xs text-muted">{doctor.qualifications}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700 group-hover:gap-2 transition-all">
          View profile <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </Card>
  );
}

export { specialtyNames };
