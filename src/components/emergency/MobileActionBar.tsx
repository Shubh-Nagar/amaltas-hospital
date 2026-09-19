import { Phone, CalendarPlus, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '@/data/site';

const tel = `tel:${site.phone.tollFree.replace(/[^+\d]/g, '')}`;

/**
 * Sticky bottom action bar on mobile only. Prioritises the actions patients
 * need most: Emergency call, Appointment, Directions. Hidden on md+.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-surface/95 backdrop-blur md:hidden">
      <a href={tel} className="flex flex-col items-center gap-0.5 py-2.5 text-emergency" aria-label="Call emergency">
        <Phone className="h-5 w-5" aria-hidden />
        <span className="text-[11px] font-semibold">Emergency</span>
      </a>
      <Link to="/patients/appointment" className="flex flex-col items-center gap-0.5 border-x border-line py-2.5 text-brand-700" aria-label="Book appointment">
        <CalendarPlus className="h-5 w-5" aria-hidden />
        <span className="text-[11px] font-semibold">Appointment</span>
      </Link>
      <Link to="/contact#directions" className="flex flex-col items-center gap-0.5 py-2.5 text-brand-700" aria-label="Get directions">
        <MapPin className="h-5 w-5" aria-hidden />
        <span className="text-[11px] font-semibold">Directions</span>
      </Link>
    </div>
  );
}
