import { Phone } from 'lucide-react';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

const telHref = `tel:${site.phone.emergency.replace(/[^+\d]/g, '')}`;

/** Persistent emergency call action. Always high-contrast, always one tap. */
export function EmergencyButton({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <a
      href={telHref}
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-emergency font-semibold text-white shadow-sm transition-colors hover:bg-emergency-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emergency focus-visible:ring-offset-2',
        compact ? 'px-3 py-2 text-sm' : 'px-4 py-2.5 text-sm',
        className,
      )}
      aria-label={`Emergency — call ${site.phone.emergency}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      <Phone className="h-4 w-4" aria-hidden />
      <span>{compact ? 'Emergency' : 'Emergency 24/7'}</span>
    </a>
  );
}
