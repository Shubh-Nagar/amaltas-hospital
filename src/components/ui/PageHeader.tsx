import type { ReactNode } from 'react';
import { Container } from './Container';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';

/**
 * Internal-page header band.
 *
 * Pass `image` to render it as a photographic banner under the brand green
 * wash — same visual language as the homepage hero. Without `image` it falls
 * back to the original light band, so pages opt in one at a time.
 */
export function PageHeader({
  crumbs,
  title,
  intro,
  image,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  intro?: ReactNode;
  image?: { src: string; alt?: string };
  children?: ReactNode;
}) {
  if (!image) {
    return (
      <div className="border-b border-line bg-brand-50/60">
        <Container className="py-8 sm:py-12">
          <Breadcrumbs items={crumbs} />
          <h1 className="text-h1 text-brand-900">{title}</h1>
          {intro && <p className="mt-3 max-w-3xl text-lead text-muted">{intro}</p>}
          {children && <div className="mt-6">{children}</div>}
        </Container>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-brand-950 text-white">
      <img
        src={image.src}
        alt={image.alt ?? ''}
        aria-hidden={image.alt ? undefined : true}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Left-dark ramp: the copy sits on near-solid green, the photograph
          opens up on the right where there is nothing to read. */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/75 to-brand-950/35 lg:from-brand-950/90 lg:via-brand-950/55 lg:to-brand-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-brand-950/40" />

      <Container className="relative py-12 sm:py-16">
        <Breadcrumbs items={crumbs} tone="light" />
        <h1 className="text-h1 text-white [text-shadow:0_2px_20px_rgb(11_44_24_/_0.8)]">{title}</h1>
        {intro && (
          <p className="mt-3 max-w-3xl text-lead text-white/85 [text-shadow:0_1px_14px_rgb(11_44_24_/_0.7)]">{intro}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </div>
  );
}
