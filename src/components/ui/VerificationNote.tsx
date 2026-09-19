import { AlertTriangle } from 'lucide-react';

/**
 * Dev-only banner surfacing unverified content in-page so the content team can
 * catch it. Rendered only in dev (import.meta.env.DEV) — never shown to
 * patients in production.
 */
export function VerificationNote({ children }: { children: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="my-4 flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </div>
  );
}
