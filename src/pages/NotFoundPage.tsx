import { Home, Search, Stethoscope } from 'lucide-react';
import { Seo } from '@/lib/seo/Seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" path="/404" noIndex />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-7xl font-semibold text-brand-200">404</p>
        <h1 className="mt-2 text-h2 text-brand-900">We couldn’t find that page</h1>
        <p className="mt-3 max-w-md text-muted">
          The page may have moved. Try searching, or head back to explore doctors and specialties.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button to="/"><Home className="h-4 w-4" aria-hidden /> Home</Button>
          <Button to="/doctors" variant="outline"><Stethoscope className="h-4 w-4" aria-hidden /> Find a Doctor</Button>
          <Button to="/specialties" variant="ghost"><Search className="h-4 w-4" aria-hidden /> Specialties</Button>
        </div>
      </Container>
    </>
  );
}
