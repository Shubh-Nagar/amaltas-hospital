/**
 * Text helpers shared by the chat engine: normalisation, keyword matching and
 * language detection for English, Hindi (Devanagari) and Hinglish (romanised
 * Hindi mixed with English).
 */
import type { Lang } from './types';

/**
 * Lower-cases, unifies Devanagari variants (nukta, chandrabindu) and collapses
 * punctuation to single spaces. The result is padded with spaces so phrases
 * can be matched on word boundaries with a plain `includes`.
 */
export function normalize(input: string): string {
  const s = input
    .normalize('NFC')
    .toLowerCase()
    .replace(/़/g, '') // nukta: ज़ → ज
    .replace(/ँ/g, 'ं') // chandrabindu → anusvara: ँ → ं
    .replace(/[’'`]/g, '')
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, ' ')
    .trim();
  return ` ${s} `;
}

/**
 * Keywords are written in natural form and normalised the same way as input.
 * A trailing `*` means "word starting with".
 */
export function compile(keywords: string[]): string[] {
  return keywords.map((k) => {
    const star = k.endsWith('*');
    const n = normalize(star ? k.slice(0, -1) : k);
    return star ? n.trimEnd() : n;
  });
}

/** Matches one compiled keyword. Prefix keywords have no trailing space. */
export function hasKeyword(norm: string, kw: string): boolean {
  return norm.includes(kw);
}

/** Score = number of matched keywords; multi-word phrases count double. */
export function scoreKeywords(norm: string, compiled: string[]): number {
  let score = 0;
  for (const kw of compiled) {
    if (hasKeyword(norm, kw)) score += kw.trim().includes(' ') ? 2 : 1;
  }
  return score;
}

/** Length of the longest matched keyword — used to rank competing entities. */
export function bestMatchLength(norm: string, compiled: string[]): number {
  let best = 0;
  for (const kw of compiled) {
    if (hasKeyword(norm, kw)) best = Math.max(best, kw.trim().length);
  }
  return best;
}

export function wordCount(norm: string): number {
  const t = norm.trim();
  return t ? t.split(' ').length : 0;
}

/* ------------------------------------------------------------------ */
/* Language detection                                                  */
/* ------------------------------------------------------------------ */

const DEVANAGARI = /[ऀ-ॿ]/;

/** Romanised Hindi words that are very unlikely in English text. */
const HINGLISH_STRONG = new Set(
  (
    'kya kyaa hai hain hoon hu kaise kaisa kaisi kab kahan kaha kidhar kitna kitne kitni kaun kon konsa kaunsa ' +
    'mujhe muje mujhko mera meri mere hamara hamare aap aapka aapki apka apki aapko tum tumhara ' +
    'chahiye chaiye chahie batao bataiye bataye btao bataen batayein karna karni karo karein kariye kijiye ' +
    'milna milega milegi milenge milte hoga hogi honge nahi nahin nhi haan ji bhai bhaiya didi kripya ' +
    'wala wale wali liye lie samay raat dawai dard bukhar accha achha acha theek thik shukriya dhanyavad ' +
    'dhanyawad namaste namaskar yaha yahan wahan waha unka uska inka iska unke uske sakta sakte sakti ' +
    'raha rahi rahe tha thi kuch koi abhi jaldi dijiye bolo agar lekin matlab zaroor jarur bilkul ' +
    'mein hindi baat aur hota hoti karta karti jana jaana lagega lagegi dikhana dikhane'
  ).split(' '),
);

/** Short Hindi function words that also occur in English — weak evidence only. */
const HINGLISH_WEAK = new Set('me se ka ki ke ko ho do de par bhi to na ya'.split(' '));

const ENGLISH_MARKERS = new Set(
  'the is are what how where when who which can could would you your please i my do does have has an of for with there this that'.split(' '),
);

/**
 * Detects the language of one message. Returns `null` when the text carries no
 * language signal (e.g. just "cardiology" or a doctor's name) so the caller can
 * keep the conversation's current language.
 */
export function detectLanguage(input: string): Lang | null {
  if (DEVANAGARI.test(input)) return 'hi';
  const words = normalize(input).trim().split(' ').filter(Boolean);
  let strong = 0;
  let weak = 0;
  let english = 0;
  for (const w of words) {
    if (HINGLISH_STRONG.has(w)) strong++;
    else if (HINGLISH_WEAK.has(w)) weak++;
    if (ENGLISH_MARKERS.has(w)) english++;
  }
  if (strong >= 1 && strong * 2 + weak >= english) return 'hinglish';
  if (weak >= 3 && english === 0) return 'hinglish';
  if (english >= 1) return 'en';
  return null;
}

/**
 * Recognises an explicit request to change language, e.g. "reply in Hindi",
 * "hindi mein baat karo", "अंग्रेज़ी में", or just "English".
 */
export function detectLanguageRequest(input: string): Lang | null {
  const n = normalize(input);
  const words = wordCount(n);
  if (words > 7) return null;
  const wantsHinglish = /\s(hinglish|हिंग्लिश)\s/.test(n);
  const wantsHindi = /\s(hindi|हिंदी|हिन्दी)\s/.test(n);
  const wantsEnglish = /\s(english|angrezi|angreji|अंग्रेजी|इंग्लिश)\s/.test(n);
  const asks =
    words <= 2 ||
    /\s(speak|reply|talk|answer|switch|respond|chat|write|use|in|mein|me|karo|kariye|kijiye|baat|bolo|please|में|बात|करें|करो|बोलो|कीजिए)\s/.test(n);
  if (!asks) return null;
  if (wantsHinglish) return 'hinglish';
  if (wantsHindi) return 'hi';
  if (wantsEnglish) return 'en';
  return null;
}
