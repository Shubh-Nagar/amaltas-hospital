import { Link } from 'react-router-dom';
import { CalendarPlus, Stethoscope, HeartPulse, Ambulance, FlaskConical, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const actions = [
  { label: 'Book Appointment', to: '/patients/appointment', icon: CalendarPlus },
  { label: 'Find a Doctor', to: '/doctors', icon: Stethoscope },
  { label: 'Specialties', to: '/specialties', icon: HeartPulse },
  { label: 'Emergency', to: '/patients/emergency', icon: Ambulance, emphasis: true },
  { label: 'Diagnostics', to: '/services/diagnostics-pathology', icon: FlaskConical },
  { label: 'Directions', to: '/contact#directions', icon: MapPin },
];

/** Immediate care actions — designed to work exceptionally well on mobile. */
export function QuickActions() {
  return (
    <div className="relative z-10 -mt-8">
      <Container>
        <div className="grid grid-cols-3 gap-2.5 rounded-2xl border border-line bg-surface p-3 shadow-card sm:gap-3 md:grid-cols-6">
          {actions.map(({ label, to, icon: Icon, emphasis }) => (
            <Link
              key={label}
              to={to}
              className={`flex flex-col items-center gap-2 rounded-xl px-2 py-4 text-center transition-colors ${
                emphasis ? 'bg-emergency/10 text-emergency hover:bg-emergency/15' : 'text-brand-800 hover:bg-brand-50'
              }`}
            >
              <Icon className="h-6 w-6" aria-hidden />
              <span className="text-xs font-semibold leading-tight sm:text-sm">{label}</span>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
