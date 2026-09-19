import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types';
import { resolveIcon } from '@/lib/icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function ServiceCard({ service }: { service: Service }) {
  const Icon = resolveIcon(service.icon);
  return (
    <Card to={`/services/${service.slug}`} className="flex gap-4 p-5">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-brand-900">{service.name}</h3>
          {service.is24x7 && <Badge tone="emergency">24/7</Badge>}
        </div>
        <p className="mt-1 text-sm text-muted">{service.summary}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-700 transition-all group-hover:gap-2">
          Learn more <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </Card>
  );
}
