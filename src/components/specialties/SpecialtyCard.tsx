import { ArrowRight } from 'lucide-react';
import type { Specialty } from '@/types';
import { resolveIcon } from '@/lib/icons';
import { Card } from '@/components/ui/Card';

/** Editorial-style specialty card (icon + name + treatments preview). */
export function SpecialtyCard({ specialty, featured = false }: { specialty: Specialty; featured?: boolean }) {
  const Icon = resolveIcon(specialty.icon);
  return (
    <Card to={`/specialties/${specialty.slug}`} className={featured ? 'p-6 sm:p-7' : 'p-5'}>
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <h3 className="text-h4 text-brand-900">{specialty.name}</h3>
      <p className="mt-1.5 text-sm text-muted">{specialty.description}</p>
      {featured && specialty.treatments.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {specialty.treatments.slice(0, 3).map((t) => (
            <li key={t} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">{t}</li>
          ))}
        </ul>
      )}
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-700 transition-all group-hover:gap-2">
        Explore specialty <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </Card>
  );
}
