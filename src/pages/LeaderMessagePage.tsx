import { Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { Placeholder } from '@/components/ui/Placeholder';
import { getLeader, leaders } from '@/data/leadership';

/** Full message page for a member of the hospital administration. */
export default function LeaderMessagePage({ slug }: { slug: string }) {
  const leader = getLeader(slug)!;
  const pageTitle = `${leader.title} Message`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: pageTitle, path: leader.href },
  ];
  const others = leaders.filter((l) => l.slug !== slug);

  return (
    <>
      <Seo
        title={`${leader.name}, ${leader.title}`}
        description={`A message from ${leader.name}, ${leader.title} of Amaltas Hospital, Dewas. ${leader.intro}`}
        path={leader.href}
        jsonLd={[breadcrumbJsonLd(crumbs)]}
      />
      <PageHeader crumbs={crumbs} title={pageTitle} intro={leader.intro} image={pageImages.administration} />

      <Container className="py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:items-start">
          <figure className="lg:sticky lg:top-28">
            <Placeholder
              asset={{ ...leader.photo, alt: `${leader.name}, ${leader.title}` }}
              aspect="aspect-[4/5]"
              className="object-top shadow-card"
            />
            <figcaption className="mt-4">
              <p className="font-display text-xl font-semibold text-brand-800">{leader.name}</p>
              <p className="text-sm text-muted">{leader.title}</p>
              {leader.credentials && <p className="mt-1 text-xs text-muted">{leader.credentials}</p>}
            </figcaption>
          </figure>

          <article className="prose-editorial">
            <Quote className="h-10 w-10 text-brand-300" aria-hidden />
            {leader.message.map((block, i) =>
              Array.isArray(block) ? (
                <ul key={i}>
                  {block.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : (
                <p key={i}>{block}</p>
              ),
            )}
            <p className="font-display text-lg font-semibold text-brand-800">— {leader.name}</p>
          </article>
        </div>

        <nav aria-label="More from our leadership" className="mt-14 border-t border-line pt-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-500">More from our leadership</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((l) => (
              <Link
                key={l.slug}
                to={l.href}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <img src={l.photo.src} alt="" className="h-16 w-16 rounded-full bg-brand-50 object-cover object-top" loading="lazy" />
                <span>
                  <span className="block font-semibold text-brand-900">{l.name}</span>
                  <span className="block text-sm text-muted">{l.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </Container>
    </>
  );
}
