/**
 * Accreditation marks shown in the hero.
 *
 * These are in-house emblem marks, not the issuing bodies' official logos — drop
 * the official artwork into `public/images/accreditations/` and give an entry a
 * `logo` path to swap it in (the emblem is then used only as the fallback).
 *
 * VERIFICATION: only NABH is confirmed in `site.ts`. NABL and the nursing award
 * still need sign-off — see docs/qa/content-verification.md.
 */

type Mark = {
  /** Short name shown in bold. */
  name: string;
  /** One-line qualifier under the name. */
  caption: string;
  /** Full name, surfaced as a tooltip. */
  fullName: string;
  /** Optional path to official artwork in /public. */
  logo?: string;
  emblem: JSX.Element;
};

/** Shared seal ring so the three marks read as one set. */
function Seal({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden focusable="false">
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeOpacity="0.9" strokeWidth="1.5" />
      {children}
    </svg>
  );
}

const marks: Mark[] = [
  {
    name: 'NABH',
    caption: 'Accredited hospital',
    fullName: 'National Accreditation Board for Hospitals & Healthcare Providers',
    logo: '/images/accreditations/nabh.png',
    emblem: (
      <Seal>
        {/* Shield + cross */}
        <path d="M24 12l9 3.4v7.2c0 5.6-3.6 10.4-9 12.4-5.4-2-9-6.8-9-12.4v-7.2z" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.4" />
        <path d="M22.4 18.4h3.2v3.4H29v3.2h-3.4v3.4h-3.2v-3.4H19v-3.2h3.4z" fill="currentColor" />
      </Seal>
    ),
  },
  {
    name: 'NABL',
    caption: 'Accredited laboratory',
    fullName: 'National Accreditation Board for Testing and Calibration Laboratories',
    logo: '/images/accreditations/nabl.png',
    emblem: (
      <Seal>
        {/* Flask */}
        <path d="M21 13v7.2l-5.2 9.6a3 3 0 002.6 4.4h11.2a3 3 0 002.6-4.4L27 20.2V13z" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M19.4 12.6h9.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M18.6 27.4h10.8l1.6 3a1.6 1.6 0 01-1.4 2.4H18.4a1.6 1.6 0 01-1.4-2.4z" fill="currentColor" />
      </Seal>
    ),
  },
  {
    name: 'Nursing Excellence',
    caption: 'Recognised care team',
    fullName: 'Recognition for excellence in nursing care',
    emblem: (
      <Seal>
        {/* Award star inside laurel */}
        <path
          d="M24 15l2.53 6.52 6.98.39-5.42 4.42 1.79 6.76L24 29.3l-5.88 3.79 1.79-6.76-5.42-4.42 6.98-.39z"
          fill="currentColor"
        />
        <path d="M13.5 30c-2.5-4-2-10 1.5-13M34.5 30c2.5-4 2-10-1.5-13" fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" />
      </Seal>
    ),
  },
];

/** Row of accreditation marks for the dark hero panel. */
export function HeroAccreditations() {
  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {marks.map((mark) => (
        <li
          key={mark.name}
          title={mark.fullName}
          className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2 backdrop-blur-sm"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 text-brand-700">
            {mark.logo ? (
              <img src={mark.logo} alt="" width={48} height={48} loading="lazy" decoding="async" className="h-full w-full object-contain" />
            ) : (
              mark.emblem
            )}
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-white">{mark.name}</span>
            <span className="block text-xs text-white/65">{mark.caption}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
