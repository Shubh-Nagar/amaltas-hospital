import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'emergency';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800 focus-visible:ring-brand-500 shadow-sm',
  secondary: 'bg-accent-500 text-brand-950 hover:bg-accent-600 focus-visible:ring-accent-500 shadow-sm',
  outline: 'border border-brand-700/25 text-brand-800 hover:bg-brand-50 focus-visible:ring-brand-500',
  ghost: 'text-brand-800 hover:bg-brand-50 focus-visible:ring-brand-500',
  emergency: 'bg-emergency text-white hover:bg-emergency-dark focus-visible:ring-emergency shadow-sm',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-[0.95rem] px-5 py-2.5',
  lg: 'text-base px-7 py-3.5',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { to?: undefined; href?: undefined };
type ButtonAsLink = CommonProps & { to: string; href?: undefined; ariaLabel?: string };
type ButtonAsAnchor = CommonProps & { href: string; to?: undefined; ariaLabel?: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes} aria-label={props.ariaLabel}>
        {children}
      </Link>
    );
  }
  if ('href' in props && props.href) {
    const external = props.href.startsWith('http');
    return (
      <a
        href={props.href}
        className={classes}
        aria-label={props.ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  return (
    <button ref={ref} className={classes} {...rest}>
      {children}
    </button>
  );
});
