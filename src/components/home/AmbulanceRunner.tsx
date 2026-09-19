import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Graphic width in px at each breakpoint — must match the classes on the moving wrapper. */
const GRAPHIC_WIDTH = { base: 420, sm: 480 };

/**
 * Travel endpoints in pixels, measured from the viewport. Pixels (rather than
 * `%`/`vw` keyframes) because a browser will not interpolate mixed CSS units —
 * it snaps, which leaves the ambulance parked off-screen.
 */
function useDriveRange() {
  const [range, setRange] = useState({ from: -560, to: 1600 });

  useEffect(() => {
    const measure = () => {
      const width = window.innerWidth >= 640 ? GRAPHIC_WIDTH.sm : GRAPHIC_WIDTH.base;
      setRange({ from: -(width + 80), to: window.innerWidth + 80 });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return range;
}

/**
 * Decorative 3D-styled ambulance that drives across the bottom of the hero,
 * towing a waving banner that reads "24/7 Emergency Contact".
 * Purely ornamental — hidden from assistive tech, frozen for reduced motion.
 */
export function AmbulanceRunner() {
  const reduce = useReducedMotion();
  const drive = useDriveRange();

  /* Banner wave keyframes (cloth) + matching text baselines. */
  const cloth = [
    'M262,10 C210,0 130,22 30,10 L30,52 C130,62 210,40 262,44 Z',
    'M262,10 C210,20 130,0 30,16 L30,58 C130,40 210,58 262,44 Z',
  ];
  const baseline = ['M34,33 C132,44 212,24 258,29', 'M34,39 C132,22 212,42 258,29'];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[38px] z-20 h-[150px] overflow-hidden">
      {/* Black-and-white road the ambulance drives on; fades out at both ends */}
      <div
        className="absolute inset-x-0 bottom-0 h-11"
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
        }}
      >
        {/* Asphalt */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #3d3d3d 0%, #232323 45%, #0b0b0b 100%)' }}
        />
        {/* Fine grain so the surface does not read as flat black */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            background:
              'repeating-linear-gradient(112deg, #ffffff 0 1px, transparent 1px 6px), repeating-linear-gradient(74deg, #ffffff 0 1px, transparent 1px 11px)',
          }}
        />
        {/* Kerb highlight along the far edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/45" />
        {/* Dashed lane marking */}
        <div
          className="absolute inset-x-0 bottom-[11px] h-[3px] opacity-90"
          style={{ background: 'repeating-linear-gradient(90deg, #f2f2f2 0 34px, transparent 34px 74px)' }}
        />
        {/* Solid near-edge line */}
        <div className="absolute inset-x-0 bottom-[3px] h-px bg-white/40" />
      </div>

      {/* Travels from fully off-screen left to fully off-screen right at any viewport width */}
      <motion.div
        key={`${drive.from}-${drive.to}`}
        className="absolute bottom-2 left-0 w-[420px] sm:w-[480px]"
        initial={{ x: reduce ? '25vw' : drive.from }}
        animate={reduce ? undefined : { x: [drive.from, drive.to] }}
        transition={reduce ? undefined : { duration: 16, ease: 'linear', repeat: Infinity }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -2, 0, -1.5, 0] }}
          transition={reduce ? undefined : { duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 470 132" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Body panels — lit from above for the 3D read */}
              <linearGradient id="amb-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#eef3f2" />
                <stop offset="100%" stopColor="#bcc9c6" />
              </linearGradient>
              <linearGradient id="amb-roof" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#dfe8e6" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
              <linearGradient id="amb-skirt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8fa29e" />
                <stop offset="100%" stopColor="#5d6d6a" />
              </linearGradient>
              <linearGradient id="amb-glass" x1="0" y1="0" x2="0.6" y2="1">
                <stop offset="0%" stopColor="#9fd8e6" />
                <stop offset="55%" stopColor="#3f7f8f" />
                <stop offset="100%" stopColor="#1d4c57" />
              </linearGradient>
              <linearGradient id="amb-stripe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e05252" />
                <stop offset="100%" stopColor="#9e1e1e" />
              </linearGradient>
              <linearGradient id="amb-banner" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c82d2d" />
                <stop offset="55%" stopColor="#9e1e1e" />
                <stop offset="100%" stopColor="#c82d2d" />
              </linearGradient>
              <radialGradient id="amb-tyre" cx="0.38" cy="0.32" r="0.8">
                <stop offset="0%" stopColor="#4a4f4e" />
                <stop offset="70%" stopColor="#1b1f1e" />
                <stop offset="100%" stopColor="#0c0f0e" />
              </radialGradient>
              <radialGradient id="amb-hub" cx="0.4" cy="0.35" r="0.7">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#9aa8a5" />
              </radialGradient>
              <radialGradient id="amb-shadow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="amb-beam" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" />
              </radialGradient>

              <path id="amb-banner-baseline" d={baseline[0]}>
                {!reduce && (
                  <animate
                    attributeName="d"
                    dur="2.4s"
                    repeatCount="indefinite"
                    values={`${baseline[0]};${baseline[1]};${baseline[0]}`}
                  />
                )}
              </path>
            </defs>

            {/* ---- Flying banner, towed from the rear mast ---- */}
            <g>
              <rect x="259" y="8" width="4" height="52" rx="2" fill="#7b8b88" />
              <path d={cloth[0]} fill="url(#amb-banner)" stroke="#7a1616" strokeWidth="1">
                {!reduce && (
                  <animate
                    attributeName="d"
                    dur="2.4s"
                    repeatCount="indefinite"
                    values={`${cloth[0]};${cloth[1]};${cloth[0]}`}
                  />
                )}
              </path>
              <text fontSize="12.5" fontWeight="700" letterSpacing="0.4" fill="#ffffff">
                <textPath href="#amb-banner-baseline" startOffset="50%" textAnchor="middle">
                  24/7 EMERGENCY CONTACT
                </textPath>
              </text>
            </g>

            {/* ---- Ground shadow ---- */}
            <ellipse cx="368" cy="116" rx="102" ry="9" fill="url(#amb-shadow)" />

            {/* ---- Ambulance ---- */}
            <g>
              {/* Box body */}
              <path
                d="M276,40 h120 v64 h-120 a6,6 0 0 1 -6,-6 v-52 a6,6 0 0 1 6,-6 z"
                fill="url(#amb-body)"
                stroke="#93a4a1"
                strokeWidth="1"
              />
              {/* Roof top-face for perspective */}
              <path d="M276,40 l10,-7 h114 l-4,7 z" fill="url(#amb-roof)" stroke="#a9b8b5" strokeWidth="0.8" />
              {/* Cab */}
              <path
                d="M396,54 h34 l24,22 h8 a6,6 0 0 1 6,6 v22 h-72 z"
                fill="url(#amb-body)"
                stroke="#93a4a1"
                strokeWidth="1"
              />
              <path d="M396,54 l8,-6 h30 l-4,6 z" fill="url(#amb-roof)" stroke="#a9b8b5" strokeWidth="0.8" />
              {/* Windscreen + side glass */}
              <path d="M402,58 h26 l20,18 h-46 z" fill="url(#amb-glass)" />
              <rect x="284" y="48" width="44" height="26" rx="4" fill="url(#amb-glass)" opacity="0.85" />
              {/* Lower skirt */}
              <path d="M270,96 h194 v10 a4,4 0 0 1 -4,4 h-186 a4,4 0 0 1 -4,-4 z" fill="url(#amb-skirt)" />
              {/* Red emergency stripe + chevrons */}
              <rect x="272" y="80" width="192" height="10" fill="url(#amb-stripe)" />
              <path d="M280,80 l10,10 h12 l-10,-10 z" fill="#ffffff" opacity="0.65" />
              <path d="M300,80 l10,10 h12 l-10,-10 z" fill="#ffffff" opacity="0.65" />
              {/* Red cross badge */}
              <g transform="translate(340,56)">
                <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#ffffff" stroke="#cdd8d6" />
                <path d="M-3,-10 h6 v7 h7 v6 h-7 v7 h-6 v-7 h-7 v-6 h7 z" fill="#c82d2d" />
              </g>
              {/* Light bar */}
              <rect x="300" y="27" width="56" height="8" rx="3" fill="#6f7f7c" />
              <rect x="304" y="28" width="22" height="6" rx="2" fill="#e24b4b">
                {!reduce && <animate attributeName="opacity" values="1;0.25;1" dur="0.7s" repeatCount="indefinite" />}
              </rect>
              <rect x="330" y="28" width="22" height="6" rx="2" fill="#4b9de2">
                {!reduce && <animate attributeName="opacity" values="0.25;1;0.25" dur="0.7s" repeatCount="indefinite" />}
              </rect>
              {/* Headlamp + beam */}
              <rect x="458" y="86" width="8" height="8" rx="2" fill="#ffe9a8" />
              <ellipse cx="470" cy="90" rx="26" ry="14" fill="url(#amb-beam)" />

              {/* Wheels */}
              {[308, 442].map((cx) => (
                <g key={cx}>
                  <circle cx={cx} cy="106" r="16" fill="url(#amb-tyre)" />
                  <circle cx={cx} cy="106" r="8" fill="url(#amb-hub)" />
                  <g>
                    <path
                      d={`M${cx - 7},106 h14 M${cx},99 v14 M${cx - 5},101 l10,10 M${cx + 5},101 l-10,10`}
                      stroke="#6d7b78"
                      strokeWidth="1.5"
                    />
                    {!reduce && (
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${cx} 106`}
                        to={`360 ${cx} 106`}
                        dur="0.6s"
                        repeatCount="indefinite"
                      />
                    )}
                  </g>
                </g>
              ))}
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
