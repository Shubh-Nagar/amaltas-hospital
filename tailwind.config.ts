import type { Config } from 'tailwindcss'

/**
 * Design tokens live here (single source of truth). Do not scatter arbitrary
 * values across components — extend this file instead. Colors are exposed as
 * CSS variables (see src/index.css) so themes can be swapped globally.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1360px' },
    },
    extend: {
      colors: {
        // Sophisticated healthcare palette: deep teal-green + warm neutral.
        brand: {
          50: 'rgb(var(--brand-50) / <alpha-value>)',
          100: 'rgb(var(--brand-100) / <alpha-value>)',
          200: 'rgb(var(--brand-200) / <alpha-value>)',
          300: 'rgb(var(--brand-300) / <alpha-value>)',
          400: 'rgb(var(--brand-400) / <alpha-value>)',
          500: 'rgb(var(--brand-500) / <alpha-value>)',
          600: 'rgb(var(--brand-600) / <alpha-value>)',
          700: 'rgb(var(--brand-700) / <alpha-value>)',
          800: 'rgb(var(--brand-800) / <alpha-value>)',
          900: 'rgb(var(--brand-900) / <alpha-value>)',
          950: 'rgb(var(--brand-950) / <alpha-value>)',
        },
        accent: {
          50: 'rgb(var(--accent-50) / <alpha-value>)',
          100: 'rgb(var(--accent-100) / <alpha-value>)',
          400: 'rgb(var(--accent-400) / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
          700: 'rgb(var(--accent-700) / <alpha-value>)',
        },
        surface: 'rgb(var(--surface) / <alpha-value>)',
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        emergency: {
          DEFAULT: 'rgb(var(--emergency) / <alpha-value>)',
          dark: 'rgb(var(--emergency-dark) / <alpha-value>)',
        },
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      fontSize: {
        // Fluid typography scale (clamp) — see docs/design/design-system.md
        'display': ['clamp(2.5rem, 1.6rem + 4.2vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'h1': ['clamp(2rem, 1.4rem + 2.8vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.018em' }],
        'h2': ['clamp(1.6rem, 1.2rem + 1.8vw, 2.4rem)', { lineHeight: '1.14', letterSpacing: '-0.012em' }],
        'h3': ['clamp(1.3rem, 1.1rem + 0.9vw, 1.75rem)', { lineHeight: '1.2' }],
        'h4': ['clamp(1.125rem, 1rem + 0.5vw, 1.35rem)', { lineHeight: '1.3' }],
        'lead': ['clamp(1.05rem, 1rem + 0.4vw, 1.3rem)', { lineHeight: '1.6' }],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0 1px 2px rgb(16 40 34 / 0.04), 0 8px 24px -12px rgb(16 40 34 / 0.12)',
        'card-hover': '0 2px 4px rgb(16 40 34 / 0.06), 0 20px 40px -16px rgb(16 40 34 / 0.22)',
        header: '0 1px 0 rgb(16 40 34 / 0.06), 0 8px 24px -18px rgb(16 40 34 / 0.28)',
      },
      maxWidth: { prose: '68ch' },
      transitionTimingFunction: { soft: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: { 'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both' },
    },
  },
  plugins: [],
}

export default config
