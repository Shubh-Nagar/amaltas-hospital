/** Shared types for the Riya chat assistant. */

export type Lang = 'en' | 'hi' | 'hinglish';

/** `auto` follows the language of each message; a Lang pins replies to it. */
export type LangMode = 'auto' | Lang;

export interface ChatLink {
  label: string;
  /** Internal route (starts with "/") or tel:/mailto:/https: URL. */
  href: string;
}

export type ReplyBlock =
  | { kind: 'text'; text: string }
  | { kind: 'list'; items: string[] };

export interface BotReply {
  blocks: ReplyBlock[];
  links?: ChatLink[];
  /** Quick-reply chips; tapping one sends its text as the user's message. */
  suggestions?: string[];
  tone?: 'default' | 'emergency';
}

export type ChatMessage =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'bot'; reply: BotReply; lang: Lang };

/** What the conversation is currently "about", so follow-ups resolve. */
export interface ChatContext {
  specialty?: string;
  doctor?: string;
  service?: string;
  facility?: string;
  /** Brochure programme slug (src/data/brochure.ts). */
  programme?: string;
  /** Last topic Riya answered — lets "his number?" follow a doctor profile. */
  topic?: string;
  /** Doctor slugs offered when a name was ambiguous. */
  pendingDoctors?: string[];
}
