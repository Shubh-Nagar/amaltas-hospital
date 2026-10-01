import {
  Activity, Ambulance, Baby, BedDouble, Bone, BookOpen, Brain, Building2, Droplet, Droplets, Ear, Eye,
  FlaskConical, GraduationCap, HeartHandshake, HeartPulse, Hospital, Landmark, Leaf, Pill, Plane, Radiation, Ribbon, ScanLine,
  School, Scissors, Stethoscope,
  type LucideIcon,
} from 'lucide-react';

/**
 * Central icon registry — data references icons by string name; UI resolves
 * them here. Keeps the icon system consistent (no emoji, no random SVGs).
 */
const registry: Record<string, LucideIcon> = {
  Activity, Ambulance, Baby, BedDouble, Bone, BookOpen, Brain, Building2, Droplet, Droplets, Ear, Eye,
  FlaskConical, GraduationCap, HeartHandshake, HeartPulse, Hospital, Landmark, Leaf, Pill, Plane, Radiation, Ribbon, ScanLine,
  School, Scissors, Stethoscope,
};

export function resolveIcon(name?: string): LucideIcon {
  return (name && registry[name]) || Stethoscope;
}
