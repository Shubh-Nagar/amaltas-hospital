import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Mail, Phone } from 'lucide-react';
import type { BotReply, ChatLink } from '@/lib/chat/types';
import { cn } from '@/lib/utils';

/** Renders `**bold**` spans safely — replies are never injected as HTML. */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-brand-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

/** Riya's profile photo. Swap this file for a real photograph when available. */
export const RIYA_PHOTO = '/images/riya/riya-avatar.svg';

/** Decorative — Riya's name is always given in text alongside it. */
export function RiyaAvatar({ className }: { className?: string }) {
  return (
    <img
      src={RIYA_PHOTO}
      alt=""
      aria-hidden
      draggable={false}
      className={cn('shrink-0 rounded-full bg-brand-100 object-cover ring-2 ring-accent-400/70', className)}
    />
  );
}

export function BotBubble({ reply, onNavigate }: { reply: BotReply; onNavigate: () => void }) {
  const emergency = reply.tone === 'emergency';
  return (
    <div className="min-w-0 max-w-[88%]">
      <div
        className={cn(
          'space-y-2 rounded-2xl rounded-tl-md border px-4 py-3 text-[0.9375rem] leading-relaxed text-ink shadow-sm',
          emergency ? 'border-emergency/30 bg-emergency/5' : 'border-line bg-surface',
        )}
      >
        {reply.blocks.map((b, i) =>
          b.kind === 'text' ? (
            <p key={i}>{inline(b.text)}</p>
          ) : (
            <ul key={i} className="space-y-1.5 pl-1">
              {b.items.map((item, j) => (
                <li key={j} className="flex gap-2">
                  <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span className="min-w-0 break-words">{inline(item)}</span>
                </li>
              ))}
            </ul>
          ),
        )}
      </div>
      {reply.links && reply.links.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {reply.links.map((l) => (
            <ReplyLink key={l.href + l.label} link={l} emergency={emergency} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

function ReplyLink({ link, emergency, onNavigate }: { link: ChatLink; emergency: boolean; onNavigate: () => void }) {
  const isTel = link.href.startsWith('tel:');
  const cls = cn(
    'inline-flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1.5 text-left text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1',
    isTel && emergency
      ? 'border-emergency bg-emergency text-white hover:bg-emergency-dark'
      : 'border-brand-200 bg-surface text-brand-800 hover:border-brand-400 hover:bg-brand-50',
  );
  const icon = isTel ? Phone : link.href.startsWith('mailto:') ? Mail : link.href.startsWith('http') ? ExternalLink : ArrowRight;
  const Icon = icon;
  const body = (
    <>
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span className="truncate">{link.label}</span>
    </>
  );

  if (link.href.startsWith('/')) {
    return (
      <Link to={link.href} onClick={onNavigate} className={cls}>
        {body}
      </Link>
    );
  }
  const external = link.href.startsWith('http');
  return (
    <a href={link.href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {body}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

export function TypingIndicator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-line bg-surface px-4 py-3.5 shadow-sm">
      <span className="sr-only">{label}</span>
      {[0, 1, 2].map((i) => (
        <span key={i} aria-hidden className="h-2 w-2 animate-typing rounded-full bg-brand-500" style={{ animationDelay: `${i * 0.16}s` }} />
      ))}
    </div>
  );
}
