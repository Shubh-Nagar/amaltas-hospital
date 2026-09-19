import type { ReactNode } from 'react';
import { Container } from './Container';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';

/** Consistent internal-page header band with breadcrumb, title and intro. */
export function PageHeader({
  crumbs,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
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
