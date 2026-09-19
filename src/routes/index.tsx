import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';

/**
 * Route-level code splitting: every page is lazy-loaded so the initial bundle
 * stays lean. Clean, meaningful URLs — no unnecessary nesting.
 */
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const DoctorsPage = lazy(() => import('@/pages/DoctorsPage'));
const DoctorProfilePage = lazy(() => import('@/pages/DoctorProfilePage'));
const SpecialtiesPage = lazy(() => import('@/pages/SpecialtiesPage'));
const SpecialtyPage = lazy(() => import('@/pages/SpecialtyPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ServicePage = lazy(() => import('@/pages/ServicePage'));
const FacilitiesPage = lazy(() => import('@/pages/FacilitiesPage'));
const FacilityPage = lazy(() => import('@/pages/FacilityPage'));
const PatientsPage = lazy(() => import('@/pages/PatientsPage'));
const AppointmentPage = lazy(() => import('@/pages/AppointmentPage'));
const EmergencyPage = lazy(() => import('@/pages/EmergencyPage'));
const ArticlesPage = lazy(() => import('@/pages/ArticlesPage'));
const NewsPage = lazy(() => import('@/pages/NewsPage'));
const EventsPage = lazy(() => import('@/pages/EventsPage'));
const ArticlePage = lazy(() => import('@/pages/ArticlePage'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const AcademicsPage = lazy(() => import('@/pages/AcademicsPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },

      { path: 'doctors', element: <DoctorsPage /> },
      { path: 'doctors/:slug', element: <DoctorProfilePage /> },

      { path: 'specialties', element: <SpecialtiesPage /> },
      { path: 'specialties/:slug', element: <SpecialtyPage /> },

      { path: 'services', element: <ServicesPage /> },
      { path: 'services/:slug', element: <ServicePage /> },

      { path: 'facilities', element: <FacilitiesPage /> },
      { path: 'facilities/:slug', element: <FacilityPage /> },

      { path: 'patients', element: <PatientsPage /> },
      { path: 'patients/appointment', element: <AppointmentPage /> },
      { path: 'patients/emergency', element: <EmergencyPage /> },

      { path: 'articles', element: <ArticlesPage /> },
      { path: 'articles/:slug', element: <ArticlePage kind="article" /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:slug', element: <ArticlePage kind="news" /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'events/:slug', element: <ArticlePage kind="event" /> },

      { path: 'gallery', element: <GalleryPage /> },
      { path: 'academics', element: <AcademicsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'search', element: <SearchPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
