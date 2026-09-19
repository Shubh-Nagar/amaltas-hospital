import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  question: string;
  answer: string;
}

/** Accessible FAQ accordion (button-controlled, aria-expanded / region). */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-brand-900 hover:bg-brand-50/50"
              >
                <span>{item.question}</span>
                <ChevronDown className={cn('h-5 w-5 shrink-0 text-brand-500 transition-transform', isOpen && 'rotate-180')} aria-hidden />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="px-5 pb-5 text-muted">
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
