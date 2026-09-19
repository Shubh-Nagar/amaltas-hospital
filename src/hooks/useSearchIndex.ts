import { useMemo } from 'react';
import type { SearchResult } from '@/types';
import { doctors } from '@/data/doctors';
import { specialties } from '@/data/specialties';
import { services } from '@/data/services';
import { facilities } from '@/data/facilities';
import { articles } from '@/data/articles';

/**
 * Builds a lightweight in-memory search index across doctors, specialties,
 * services, facilities and articles. This is information DISCOVERY, not medical
 * diagnosis. For a large content set, swap this for a prebuilt index / API.
 */
export function useSearchIndex(): SearchResult[] {
  return useMemo(() => {
    const results: SearchResult[] = [];

    for (const d of doctors) {
      results.push({
        type: 'doctor',
        title: d.name,
        subtitle: [d.role, d.qualifications].filter(Boolean).join(' · '),
        href: `/doctors/${d.slug}`,
        keywords: `${d.name} ${d.role ?? ''} ${d.qualifications} ${d.specialtySlugs.join(' ')}`,
      });
    }
    for (const s of specialties) {
      results.push({
        type: 'specialty',
        title: s.name,
        subtitle: s.tagline,
        href: `/specialties/${s.slug}`,
        keywords: `${s.name} ${s.tagline} ${s.conditions.join(' ')} ${s.treatments.join(' ')} ${s.category}`,
      });
    }
    for (const s of services) {
      results.push({ type: 'service', title: s.name, subtitle: s.summary, href: `/services/${s.slug}`, keywords: `${s.name} ${s.summary}` });
    }
    for (const f of facilities) {
      results.push({ type: 'facility', title: f.name, subtitle: f.summary, href: `/facilities/${f.slug}`, keywords: `${f.name} ${f.summary}` });
    }
    for (const a of articles) {
      results.push({ type: 'article', title: a.title, subtitle: a.excerpt, href: `/${a.kind === 'article' ? 'articles' : a.kind === 'news' ? 'news' : 'events'}/${a.slug}`, keywords: `${a.title} ${a.excerpt} ${a.category ?? ''}` });
    }
    return results;
  }, []);
}

export function searchIndex(index: SearchResult[], query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return index
    .map((item) => {
      const hay = `${item.title} ${item.subtitle ?? ''} ${item.keywords ?? ''}`.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (item.title.toLowerCase().includes(t)) score += 3;
        else if (hay.includes(t)) score += 1;
      }
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((r) => r.item);
}
