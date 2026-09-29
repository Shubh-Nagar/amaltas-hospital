import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, MessageCircle, Minus, SendHorizontal, X } from 'lucide-react';
import { copy } from '@/lib/chat/copy';
import { greetingReply, respond, resolveLanguage } from '@/lib/chat/engine';
import { site } from '@/lib/chat/knowledge';
import type { BotReply, ChatContext, ChatMessage, Lang, LangMode } from '@/lib/chat/types';
import { cn } from '@/lib/utils';
import { BotBubble, RiyaAvatar, TypingIndicator } from './ChatMessage';

const LANG_OPTIONS: { value: LangMode; label: string }[] = [
  { value: 'auto', label: 'Auto' },
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'hinglish', label: 'Hinglish' },
];

/** Natural-feeling "thinking" time, scaled to reply length. */
function replyDelay(reply: BotReply, reduced: boolean): number {
  if (reduced) return 250;
  const chars = reply.blocks.reduce((n, b) => n + (b.kind === 'text' ? b.text.length : b.items.join('').length), 0);
  return Math.min(1400, 450 + chars * 2.5);
}

let nextId = 0;
// Timestamp prefix keeps ids unique even if the module re-runs (HMR).
const idPrefix = Date.now().toString(36);
const newId = () => `${idPrefix}-${++nextId}`;
const greeting = (lang: Lang): ChatMessage => ({ id: newId(), role: 'bot', reply: greetingReply(lang), lang });

/**
 * Riya — floating hospital assistant shown on every page (mounted once in
 * RootLayout). Opens by itself when the site is loaded on the homepage. While
 * open it is modal: the page behind is blurred and clicking it minimises the
 * chat. Conversation state lives in memory only and survives route changes;
 * nothing is persisted, since users may type health details.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<LangMode>('auto');
  const [lang, setLang] = useState<Lang>('en');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [greeting('en')]);
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(false);
  const [draft, setDraft] = useState('');
  const [hint, setHint] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [everOpened, setEverOpened] = useState(false);

  const ctx = useRef<ChatContext>({});
  const session = useRef(0); // bumped on close so late replies are dropped
  const timer = useRef<number>();
  const openRef = useRef(open);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  const reduced = useReducedMotion() ?? false;
  const titleId = useId();
  const panelId = useId();
  const c = copy[lang];

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // One gentle, dismissible nudge on desktop for first-time visitors.
  useEffect(() => {
    if (everOpened) return;
    const show = window.setTimeout(() => setHint(true), 4000);
    const hide = window.setTimeout(() => setHint(false), 14000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [everOpened]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Keep the newest message in view.
  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'end' });
  }, [messages, typing, open, reduced]);

  // Modal while open: freeze the page behind the blurred backdrop without the
  // layout jumping when the scrollbar disappears.
  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
    };
  }, [open]);

  /** `auto` = opened by the page itself, so focus the dialog, not the input
   *  (avoids popping the on-screen keyboard on phones). */
  const openChat = useCallback((auto = false) => {
    setOpen(true);
    setUnread(false);
    setHint(false);
    setHovered(false);
    setEverOpened(true);
    window.setTimeout(() => (auto ? panelRef.current : inputRef.current)?.focus(), 60);
  }, []);

  // Greet visitors automatically whenever they arrive on the homepage — first
  // load, refresh, or navigating back to it from another page.
  useEffect(() => {
    if (pathname !== '/') return;
    const t = window.setTimeout(() => openChat(true), 800);
    return () => window.clearTimeout(t);
  }, [pathname, openChat]);

  const minimise = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }, []);

  const closeAndReset = useCallback(() => {
    session.current++;
    window.clearTimeout(timer.current);
    setTyping(false);
    setOpen(false);
    setUnread(false);
    setDraft('');
    ctx.current = {};
    setMessages([greeting(lang)]);
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }, [lang]);

  const deliver = useCallback(
    (reply: BotReply, replyLang: Lang) => {
      const token = session.current;
      setTyping(true);
      timer.current = window.setTimeout(() => {
        if (token !== session.current) return;
        setTyping(false);
        setMessages((m) => [...m, { id: newId(), role: 'bot', reply, lang: replyLang }]);
        if (!openRef.current) setUnread(true);
      }, replyDelay(reply, reduced));
    },
    [reduced],
  );

  const send = useCallback(
    (raw: string) => {
      const input = raw.trim();
      if (!input || typing) return;
      const { lang: nextLang, requested } = resolveLanguage(input, mode, lang);
      if (requested) setMode(requested);
      setLang(nextLang);
      setDraft('');
      setMessages((m) => [...m, { id: newId(), role: 'user', text: input }]);
      const { reply, context } = respond(input, ctx.current, nextLang, Boolean(requested));
      ctx.current = context;
      deliver(reply, nextLang);
    },
    [typing, mode, lang, deliver],
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(draft);
  }

  function changeMode(next: LangMode) {
    setMode(next);
    if (next === 'auto') return;
    setLang(next);
    const onlyGreeting = messages.length === 1 && messages[0].role === 'bot';
    if (onlyGreeting) setMessages([greeting(next)]);
    else if (!typing) deliver({ blocks: [{ kind: 'text', text: copy[next].langSwitched }], suggestions: copy[next].defaultSuggestions }, next);
  }

  function onPanelKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      minimise();
      return;
    }
    // Modal dialog: keep Tab focus inside it.
    if (e.key !== 'Tab' || !panelRef.current) return;
    const nodes = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select');
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // Links in replies open pages behind the modal — step aside so they're visible.
  const onNavigate = minimise;

  const lastBot = [...messages].reverse().find((m) => m.role === 'bot');
  const suggestions = !typing && lastBot?.role === 'bot' ? lastBot.reply.suggestions ?? [] : [];

  const panelMotion = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 24, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.97 },
      };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            aria-hidden
            onClick={minimise}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-brand-950/25 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onKeyDown={onPanelKeyDown}
            {...panelMotion}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-canvas outline-none md:inset-auto md:bottom-24 md:right-6 md:h-[min(640px,calc(100dvh-8rem))] md:w-[400px] md:rounded-3xl md:border md:border-line md:shadow-card-hover"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-br from-brand-800 to-brand-700 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white">
              <span className="relative">
                <RiyaAvatar className="h-11 w-11" />
                <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-brand-800 bg-brand-300" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="font-display text-lg font-semibold leading-tight text-white">
                  {c.ui.title}
                </h2>
                <p className="truncate text-xs text-white/75">{c.ui.subtitle}</p>
              </div>
              <label className="sr-only" htmlFor={`${panelId}-lang`}>
                {c.ui.language}
              </label>
              <div className="relative">
                <select
                  id={`${panelId}-lang`}
                  value={mode}
                  onChange={(e) => changeMode(e.target.value as LangMode)}
                  className="h-8 cursor-pointer appearance-none rounded-full border border-white/25 bg-white/10 pl-3 pr-7 text-xs font-medium text-white outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-accent-400"
                >
                  {LANG_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} className="text-ink">
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/80" />
              </div>
              <button type="button" onClick={minimise} aria-label={c.ui.minimise} title={c.ui.minimise} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-accent-400">
                <Minus className="h-5 w-5" aria-hidden />
              </button>
              <button type="button" onClick={closeAndReset} aria-label={c.ui.close} title={c.ui.close} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-accent-400">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            {/* Conversation */}
            <div className="flex-1 overflow-y-auto overscroll-contain bg-brand-50/40 px-4 py-5">
              <ol role="log" aria-live="polite" aria-relevant="additions" aria-label={c.ui.title} className="space-y-4">
                {messages.map((m) => (
                  <motion.li
                    key={m.id}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={cn('flex gap-2', m.role === 'user' ? 'justify-end' : 'items-start')}
                  >
                    {m.role === 'bot' ? (
                      <>
                        <RiyaAvatar className="mt-1 h-8 w-8" />
                        <BotBubble reply={m.reply} onNavigate={onNavigate} />
                      </>
                    ) : (
                      <p className="max-w-[80%] whitespace-pre-wrap break-words rounded-2xl rounded-tr-md bg-brand-700 px-4 py-2.5 text-[0.9375rem] leading-relaxed text-white shadow-sm">
                        {m.text}
                      </p>
                    )}
                  </motion.li>
                ))}
              </ol>

              {typing && (
                <div className="mt-4 flex items-end gap-2" role="status">
                  <RiyaAvatar className="h-8 w-8" />
                  <TypingIndicator label={c.ui.typing} />
                </div>
              )}

              {suggestions.length > 0 && (
                <div role="group" aria-label="Suggested questions" className="mt-4 flex flex-wrap gap-2 pl-10">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-brand-300 bg-surface px-3 py-1.5 text-left text-xs font-medium text-brand-800 transition-colors hover:border-brand-500 hover:bg-brand-50 focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Composer */}
            <form onSubmit={onSubmit} className="border-t border-line bg-surface px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
              <div className="flex items-center gap-2">
                <label htmlFor={`${panelId}-input`} className="sr-only">
                  {c.ui.input}
                </label>
                <input
                  ref={inputRef}
                  id={`${panelId}-input`}
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={c.ui.placeholder}
                  autoComplete="off"
                  maxLength={500}
                  className="h-11 min-w-0 flex-1 rounded-full border border-line bg-canvas px-4 text-[0.9375rem] text-ink outline-none placeholder:text-muted focus-visible:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-500/40"
                />
                <button
                  type="submit"
                  disabled={!draft.trim() || typing}
                  aria-label={c.ui.send}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white transition-colors hover:bg-brand-800 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-brand-300"
                >
                  <SendHorizontal className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <p className="mt-2 px-2 text-center text-[11px] leading-snug text-muted">{c.ui.disclaimer(site.phone.tollFree)}</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting bubble: on hovering/focusing Riya's photo, plus a one-time
          first-visit nudge. Decorative — the launcher's label says the same. */}
      <AnimatePresence>
        {(hovered || hint) && !open && (
          <motion.div
            key={hovered ? 'hover' : 'hint'}
            aria-hidden
            onClick={() => openChat()}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: 6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed bottom-[5.25rem] right-[4.75rem] z-50 max-w-[15rem] cursor-pointer rounded-2xl rounded-br-md border border-line bg-surface px-4 py-2.5 shadow-card-hover md:bottom-8 md:right-[5.75rem]"
          >
            {hovered ? (
              <>
                <p className="text-sm font-semibold text-brand-900">{c.ui.hoverGreeting[0]}</p>
                <p className="mt-0.5 text-sm text-muted">{c.ui.hoverGreeting[1]}</p>
              </>
            ) : (
              <p className="text-sm font-medium text-brand-800">
                {c.ui.launcherHint} <span>👋</span>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher — hidden behind the full-screen sheet on mobile */}
      <button
        ref={launcherRef}
        type="button"
        onClick={open ? minimise : () => openChat()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={(e) => setHovered(e.currentTarget.matches(':focus-visible'))}
        onBlur={() => setHovered(false)}
        aria-label={unread ? `${c.ui.launcher} — ${c.ui.newMessage}` : open ? c.ui.minimise : c.ui.launcher}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className={cn(
          'fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-card-hover ring-4 ring-surface transition-transform duration-200 ease-soft hover:scale-105 focus-visible:ring-brand-500 focus-visible:ring-offset-2 md:bottom-6 md:right-6 md:h-16 md:w-16',
          open && 'max-md:hidden',
        )}
      >
        {!open && (
          <>
            <RiyaAvatar className="absolute inset-0 h-full w-full ring-0" />
            <span aria-hidden className="absolute -bottom-0.5 -left-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-surface bg-brand-700 text-white">
              <MessageCircle className="h-3.5 w-3.5" />
            </span>
          </>
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={reduced ? false : { rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={reduced ? undefined : { rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex"
          >
            {open && <ChevronDown className="h-7 w-7" aria-hidden />}
          </motion.span>
        </AnimatePresence>
        {unread && (
          <span aria-hidden className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-surface bg-accent-500" />
          </span>
        )}
      </button>
    </>
  );
}
