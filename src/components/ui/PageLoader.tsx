import { Loader2 } from 'lucide-react';

/** Route-level loading state for lazy pages — never a blank screen. */
export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <Loader2 className="h-8 w-8 animate-spin text-brand-500" aria-hidden />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
