import type { Testimonial } from '@/types';

/**
 * Patient stories are intentionally EMPTY.
 * Per the zero-fabrication policy, real testimonials must never be invented.
 * Populate this array only with genuine, consented patient stories
 * (consentOnFile:true, verified:true). Until then the UI shows a respectful
 * "stories coming soon" state instead of fake quotes.
 */
export const testimonials: Testimonial[] = [];
