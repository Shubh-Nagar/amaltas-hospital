import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { RouteProgress } from './RouteProgress';
import { MobileActionBar } from '@/components/emergency/MobileActionBar';
import { PageLoader } from '@/components/ui/PageLoader';

/** App shell shared by every route. */
export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="skip-link">Skip to main content</a>
      <RouteProgress />
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
