import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { articles } from '@/data/articles';
import { formatDate } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useStepCarousel, CarouselArrows, carouselTrackClass } from '@/components/ui/StepCarousel';

/** Blogs — health articles written by Amaltas doctors, advancing one card at a time. */
export function Blogs() {
  const { trackProps, prev, next } = useStepCarousel<HTMLUListElement>({ interval: 4000 });
  const latest = articles
    .filter((a) => a.kind === 'article')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <Section ariaLabel="Blogs">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Blogs" title="Health advice from our doctors" description="Practical guidance written by Amaltas specialists." />
        <div className="flex items-center gap-3">
          <Button to="/articles" variant="outline" className="hidden sm:inline-flex">
            View all <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <CarouselArrows onPrev={prev} onNext={next} />
        </div>
      </div>

      <ul {...trackProps} className={`mt-9 ${carouselTrackClass}`}>
        {latest.map((a) => (
          <li key={a.slug} className="w-[82%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)] xl:w-[calc((100%-60px)/4)]">
            <Link
              to={`/articles/${a.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-soft hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-50">
                {a.cover && (
                  <img src={a.cover.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105" />
                )}
                {a.category && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-800 backdrop-blur">{a.category}</span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden /> {formatDate(a.publishedAt)}
                </span>
                <h3 className="mt-2 line-clamp-2 font-semibold leading-snug text-brand-900 group-hover:text-brand-700">{a.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{a.excerpt}</p>
                {a.author && <p className="mt-auto truncate pt-4 text-xs font-medium text-brand-700">{a.author.split(',')[0]}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-4 sm:hidden">
        <Button to="/articles" variant="outline" className="w-full">View all blogs</Button>
      </div>
    </Section>
  );
}
