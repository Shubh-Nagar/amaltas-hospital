/**
 * Riya's conversation engine. Rule-based and fully client-side: it detects the
 * user's intent and the entities they mention (doctor, department, service,
 * facility), resolves follow-ups from conversation context, and answers ONLY
 * from the website knowledge base. Anything the site doesn't say gets a polite
 * "not on our website" plus the right contact route — never a guess.
 */
import { buildSearchIndex, searchIndex } from '@/hooks/useSearchIndex';
import type { Doctor, Facility, Service, Specialty } from '@/types';
import { copy, facilityHi, serviceHi, specialtyHi, type Copy } from './copy';
import {
  articleListItems,
  clean,
  cityOfficeAddress,
  doctorBySlug,
  doctors,
  doctorsForRole,
  doctorsIn,
  facilities,
  facilityBySlug,
  findDoctors,
  findFacility,
  findRoleTopic,
  findService,
  findSpecialty,
  guideArticle,
  hospitalAddress,
  latestUpdates,
  mapsHref,
  pageFacts,
  serviceBySlug,
  services,
  shortName,
  site,
  specialties,
  specialtyBySlug,
  telHref,
} from './knowledge';
import { compile, detectLanguage, detectLanguageRequest, normalize, scoreKeywords, wordCount } from './text';
import type { BotReply, ChatContext, ChatLink, Lang, LangMode, ReplyBlock } from './types';

/* ------------------------------------------------------------------ */
/* Intents                                                             */
/* ------------------------------------------------------------------ */

type Intent =
  | 'emergency' | 'advice' | 'appointment' | 'hours' | 'insurance' | 'cost' | 'packages' | 'contact'
  | 'guide' | 'accreditation' | 'academics' | 'news' | 'doctors' | 'specialties' | 'services'
  | 'facilities' | 'more' | 'about' | 'whoami' | 'thanks' | 'bye' | 'ack' | 'greeting';

/** Declaration order doubles as tie-break priority. */
const INTENT_KEYWORDS: [Intent, string[]][] = [
  ['emergency', ['emergency', 'emergancy', 'urgent', 'accident', 'ambulance', 'trauma', 'chest pain', 'heart attack', 'unconscious', 'bleeding', 'cant breathe', 'cannot breathe', 'can not breathe', 'breathless', 'behosh', 'seene me dard', 'seene mein dard', 'saans nahi', 'durghatna', 'aapatkal', 'इमरजेंसी', 'आपातकाल*', 'आपात', 'दुर्घटना', 'एक्सीडेंट', 'एम्बुलेंस', 'एंबुलेंस', 'बेहोश', 'सीने में दर्द', 'खून बह*', 'सांस नहीं']],
  ['advice', ['which medicine', 'what medicine', 'which tablet', 'should i take', 'can i take', 'dose', 'dosage', 'prescribe', 'prescription for', 'is it serious', 'what should i do', 'diagnose', 'diagnosis', 'cure for', 'home remedy', 'kaunsi dawa', 'kaun si dawa', 'konsi dawa', 'kaunsi dawai', 'kaun si dawai', 'konsi dawai', 'kya dawa', 'kya dawai', 'dawai batao', 'dawa batao', 'dawai bataiye', 'kya karu', 'kya karun', 'kya khaun', 'कौन सी दवा', 'कौनसी दवा', 'कौन सी दवाई', 'दवा बताओ', 'दवा बताइए', 'दवाई बताइए', 'क्या करूं', 'क्या खाऊं', 'खुराक']],
  ['hours', ['visiting hours', 'visiting time', 'visit time', 'visiting', 'visitor*', 'timing*', 'time', 'hours', 'open', 'opening', 'closing', 'khulta', 'khulti', 'samay', 'milne ka samay', 'मिलने का समय', 'समय', 'टाइम*', 'खुल*', 'विजिट*', 'घंटे']],
  ['appointment', ['appointment*', 'appoint*', 'book', 'booking', 'schedule', 'consult', 'consultation', 'opd', 'milna hai', 'dikhana', 'dikhane', 'अपॉइंटमेंट', 'अपोइंटमेंट', 'अपाइंटमेंट', 'बुक*', 'परामर्श', 'दिखाना', 'दिखाने', 'मिलना है']],
  ['insurance', ['insurance', 'insured', 'cashless', 'tpa', 'mediclaim', 'ayushman', 'pmjay', 'pm jay', 'scheme', 'schemes', 'billing', 'bill', 'bima', 'बीमा', 'इंश्योरेंस', 'कैशलेस', 'आयुष्मान', 'बिल', 'बिलिंग', 'योजना']],
  ['cost', ['cost', 'costs', 'charge', 'charges', 'fee', 'fees', 'price', 'prices', 'pricing', 'kharcha', 'kharch', 'paisa', 'paise', 'kitna lagega', 'payment', 'खर्च*', 'फीस', 'शुल्क', 'कीमत', 'पैसे', 'भुगतान', 'चार्ज']],
  ['packages', ['health package*', 'health check*', 'checkup', 'check up', 'full body', 'package', 'packages', 'हेल्थ पैकेज', 'पैकेज', 'चेकअप']],
  ['contact', ['contact', 'phone', 'number', 'call', 'mobile', 'helpline', 'toll free', 'tollfree', 'email', 'mail', 'whatsapp', 'sampark', 'where', 'location', 'located', 'address', 'direction*', 'map', 'maps', 'route', 'reach', 'how to get', 'kahan', 'kaha', 'kidhar', 'pata', 'raasta', 'rasta', 'फोन', 'नंबर', 'संपर्क', 'कॉल', 'ईमेल', 'हेल्पलाइन', 'पता', 'कहां', 'लोकेशन', 'रास्ता', 'मैप', 'पहुंच*']],
  ['guide', ['what to bring', 'bring', 'documents', 'prepare', 'preparation', 'first visit', 'first consultation', 'kya lana', 'kya laana', 'saath laana', 'saath lana', 'ले जाना', 'लाना', 'लाएं', 'तैयारी', 'दस्तावेज']],
  ['accreditation', ['nabh', 'nabl', 'accredit*', 'certified', 'certification', 'मान्यता', 'प्रमाणित']],
  ['academics', ['academic*', 'mbbs', 'college', 'course', 'courses', 'admission*', 'student*', 'aims', 'education', 'padhai', 'कॉलेज', 'एडमिशन', 'पढ़ाई', 'पढाई']],
  ['news', ['news', 'event', 'events', 'latest', 'update', 'updates', 'khabar', 'samachar', 'समाचार', 'खबर*', 'कार्यक्रम', 'इवेंट']],
  ['doctors', ['doctor*', 'dr', 'specialist*', 'surgeon*', 'physician*', 'consultant*', 'daktar', 'cardiologist', 'neurologist', 'oncologist', 'nephrologist', 'urologist', 'gastroenterologist', 'gynaecologist', 'gynecologist', 'paediatrician', 'pediatrician', 'ophthalmologist', 'डॉक्टर', 'डाक्टर', 'चिकित्सक', 'विशेषज्ञ', 'सर्जन']],
  ['specialties', ['specialt*', 'speciality', 'specialities', 'department*', 'centre*', 'center*', 'vibhag', 'विभाग*', 'स्पेशलिटी']],
  ['services', ['service*', 'sewa', 'सेवा*']],
  ['facilities', ['facilit*', 'infrastructure', 'suvidha*', 'सुविधा*']],
  ['more', ['more', 'details', 'detail', 'elaborate', 'aur batao', 'aur bataiye', 'aur btao', 'vistar', 'और बताओ', 'और बताइए', 'और बताएं', 'विस्तार', 'ज्यादा']],
  ['about', ['about amaltas', 'about the hospital', 'about hospital', 'about you', 'amaltas', 'history', 'campus', 'hospital ke baare', 'hospital ke bare', 'अस्पताल के बारे', 'हॉस्पिटल के बारे', 'अमलतास']],
  ['whoami', ['who are you', 'your name', 'kaun ho', 'aap kaun', 'tum kaun', 'आप कौन', 'तुम कौन', 'riya', 'रिया']],
  ['thanks', ['thanks', 'thank you', 'thank', 'thx', 'ty', 'shukriya', 'dhanyavad', 'dhanyawad', 'धन्यवाद', 'शुक्रिया']],
  ['bye', ['bye', 'goodbye', 'see you', 'alvida', 'अलविदा']],
  ['ack', ['ok', 'okay', 'fine', 'got it', 'theek', 'thik', 'accha', 'achha', 'acha', 'cool', 'great', 'ठीक', 'अच्छा']],
  ['greeting', ['hi', 'hii', 'hello', 'hey', 'namaste', 'namaskar', 'good morning', 'good afternoon', 'good evening', 'नमस्ते', 'नमस्कार', 'हेलो', 'हाय']],
];

const COMPILED = INTENT_KEYWORDS.map(([intent, kws]) => [intent, compile(kws)] as const);

const CONTENT_INTENTS: Intent[] = [
  'hours', 'appointment', 'insurance', 'cost', 'packages', 'contact', 'guide', 'accreditation',
  'academics', 'news', 'doctors', 'specialties', 'services', 'facilities', 'more', 'about', 'whoami',
];
const SMALL_TALK: Intent[] = ['thanks', 'bye', 'ack', 'greeting'];

/** Words showing a message refers back to what was just discussed. */
const REFERENTIAL = compile(['there', 'them', 'that', 'this', 'it', 'his', 'her', 'him', 'their', 'wahan', 'waha', 'uske', 'iske', 'unke', 'unka', 'uska', 'inka', 'iska', 'वहां', 'उस', 'इस', 'उनके', 'उनका', 'इसके', 'उसके']);

/** Words suggesting the user is describing a symptom, not naming a department. */
const SYMPTOM = compile(['pain', 'ache', 'problem', 'issue', 'suffering', 'i have', 'dard', 'takleef', 'taklif', 'pareshani', 'samasya', 'दर्द', 'तकलीफ', 'समस्या', 'परेशानी']);

const ORDINALS = [
  compile(['1', 'first', 'pehla', 'pehle', 'pahla', 'पहला', 'पहले']),
  compile(['2', 'second', 'dusra', 'doosra', 'दूसरा', 'दूसरे']),
  compile(['3', 'third', 'teesra', 'tisra', 'तीसरा']),
];

function scoreIntents(norm: string): Map<Intent, number> {
  const scores = new Map<Intent, number>();
  for (const [intent, kws] of COMPILED) scores.set(intent, scoreKeywords(norm, kws));
  return scores;
}

function topIntent(scores: Map<Intent, number>, among: Intent[]): Intent | null {
  let best: Intent | null = null;
  let bestScore = 0;
  for (const [intent] of COMPILED) {
    if (!among.includes(intent)) continue;
    const s = scores.get(intent) ?? 0;
    if (s > bestScore) {
      best = intent;
      bestScore = s;
    }
  }
  return best;
}

/* ------------------------------------------------------------------ */
/* Localised names                                                     */
/* ------------------------------------------------------------------ */

const spName = (s: Specialty, lang: Lang) => (lang === 'hi' ? specialtyHi[s.slug]?.name ?? s.name : s.name);
const spDesc = (s: Specialty, lang: Lang) => (lang === 'hi' ? specialtyHi[s.slug]?.description ?? s.description : s.description);
const svName = (s: Service, lang: Lang) => (lang === 'hi' ? serviceHi[s.slug]?.name ?? s.name : s.name);
const fcName = (f: Facility, lang: Lang) => (lang === 'hi' ? facilityHi[f.slug]?.name ?? f.name : f.name);

function doctorLine(d: Doctor): string {
  const role = d.role ?? '';
  const q = d.qualifications;
  const detail = role && q && !role.includes(q) && !q.includes(role) ? `${role} · ${q}` : role || q;
  return `**${d.name}** — ${detail}`;
}

/* ------------------------------------------------------------------ */
/* Reply builders                                                      */
/* ------------------------------------------------------------------ */

const text = (t: string): ReplyBlock => ({ kind: 'text', text: t });
const list = (items: string[]): ReplyBlock => ({ kind: 'list', items });

const callLink = (c: Copy): ChatLink => ({ label: c.link.call(site.phone.tollFree), href: telHref(site.phone.tollFree) });
const bookLink = (c: Copy): ChatLink => ({ label: c.link.book, href: pageFacts.appointmentPath });

export function greetingReply(lang: Lang): BotReply {
  const c = copy[lang];
  return { blocks: c.greeting.map(text), suggestions: c.defaultSuggestions };
}

function emergencyReply(c: Copy): BotReply {
  return {
    tone: 'emergency',
    blocks: [text(c.emergency.head(site.phone.tollFree)), text(c.emergency.body), text(c.emergency.ambulance), text(c.emergency.where(hospitalAddress))],
    links: [callLink(c), { label: c.link.directions, href: mapsHref }, { label: c.link.emergency, href: pageFacts.emergencyPath }],
    suggestions: [c.suggest.contact, c.suggest.book],
  };
}

function appointmentReply(c: Copy, lang: Lang, opts: { doctor?: Doctor; specialty?: Specialty }): BotReply {
  const blocks: ReplyBlock[] = [];
  const { doctor, specialty } = opts;
  if (doctor) {
    const sp = doctor.specialtySlugs.map(specialtyBySlug).find(Boolean);
    if (!sp) {
      return { blocks: [text(c.appointment.doctorByPhone(doctor.name))], links: [callLink(c), { label: c.link.profile(doctor.name), href: `/doctors/${doctor.slug}` }], suggestions: [c.suggest.hours, c.suggest.contact] };
    }
    blocks.push(text(c.appointment.forDoctor(doctor.name, spName(sp, lang))));
  } else if (specialty) {
    blocks.push(text(c.appointment.forSpecialty(spName(specialty, lang))));
  }
  blocks.push(text(c.appointment.intro), list(c.appointment.steps), text(c.appointment.note(site.phone.tollFree)));
  return { blocks, links: [bookLink(c), callLink(c)], suggestions: [c.suggest.guide, c.suggest.hours, c.suggest.contact] };
}

function hoursReply(c: Copy, doctor?: Doctor): BotReply {
  const blocks: ReplyBlock[] = [text(c.hours.emergency)];
  if (doctor) blocks.push(text(doctor.consultation ? c.hours.doctorListed(doctor.name, doctor.consultation) : c.hours.doctor(doctor.name)));
  blocks.push(text(c.hours.notPublished(site.phone.tollFree, site.phone.primary)));
  return { blocks, links: [callLink(c), { label: c.link.contact, href: '/contact' }], suggestions: [c.suggest.book, c.suggest.contact, c.suggest.emergency] };
}

function contactReply(c: Copy, doctor?: Doctor): BotReply {
  const blocks: ReplyBlock[] = [];
  if (doctor) blocks.push(text(c.contact.doctorNote(doctor.name)));
  blocks.push(
    text(c.contact.intro),
    list([
      `${c.contact.tollFree}: **${site.phone.tollFree}**`,
      `${c.contact.phone}: ${site.phone.primary}`,
      `${c.contact.landline}: ${site.phone.landline}`,
      `${c.contact.email}: ${site.email.general}`,
      `${c.contact.hospital}: ${hospitalAddress}`,
      `${c.contact.office}: ${cityOfficeAddress}`,
    ]),
  );
  return {
    blocks,
    links: [callLink(c), { label: c.link.directions, href: mapsHref }, { label: c.link.contact, href: '/contact' }],
    suggestions: [c.suggest.hours, c.suggest.book, c.suggest.doctors],
  };
}

function doctorsOverview(c: Copy, lang: Lang): BotReply {
  const rows = specialties
    .map((s) => ({ s, n: doctorsIn(s.slug).length }))
    .filter((r) => r.n > 0)
    .map((r) => `${spName(r.s, lang)} — ${r.n}`);
  const others = doctors.filter((d) => d.specialtySlugs.length === 0).length;
  if (others) rows.push(`${c.doctors.otherRoles} — ${others}`);
  const featured = specialties.filter((s) => s.featured && doctorsIn(s.slug).length > 0).slice(0, 3);
  return {
    blocks: [text(c.doctors.overview(doctors.length)), list(rows), text(c.doctors.askMore)],
    links: [{ label: c.link.doctors, href: '/doctors' }],
    suggestions: featured.map((s) => c.suggest.doctorsOf(shortName(s))),
  };
}

const MAX_LISTED = 8;

function doctorList(c: Copy, heading: string, list_: Doctor[], extraLinks: ChatLink[] = []): BotReply {
  const shown = list_.slice(0, MAX_LISTED);
  const blocks: ReplyBlock[] = [text(heading), list(shown.map(doctorLine))];
  if (list_.length > shown.length) blocks.push(text(c.doctors.andMore(list_.length - shown.length)));
  return {
    blocks,
    links: [...extraLinks, { label: c.link.doctors, href: '/doctors' }, bookLink(c)],
    suggestions: shown.slice(0, 3).map((d) => d.name),
  };
}

function specialtyDoctors(c: Copy, lang: Lang, s: Specialty): BotReply {
  const docs = doctorsIn(s.slug);
  const page = { label: c.link.page(shortName(s)), href: `/specialties/${s.slug}` };
  if (docs.length === 0) {
    return { blocks: [text(c.doctors.noneInSpecialty(spName(s, lang)))], links: [bookLink(c), page, callLink(c)], suggestions: [c.suggest.about(shortName(s)), c.suggest.book] };
  }
  return doctorList(c, c.doctors.inSpecialty(spName(s, lang)), docs, [page]);
}

function doctorProfile(c: Copy, lang: Lang, d: Doctor): BotReply {
  const specs = d.specialtySlugs.map(specialtyBySlug).filter((s): s is Specialty => Boolean(s));
  const rows: string[] = [];
  if (d.role) rows.push(`**${c.profile.role}:** ${d.role}`);
  if (d.qualifications && d.qualifications !== d.role) rows.push(`**${c.profile.qualifications}:** ${d.qualifications}`);
  if (specs.length) rows.push(`**${c.profile.department}:** ${specs.map((s) => spName(s, lang)).join(', ')}`);
  if (d.experienceYears) rows.push(c.profile.experience(d.experienceYears));
  if (d.expertise?.length) rows.push(`**${c.profile.expertise}:** ${d.expertise.join(', ')}`);
  if (d.languages?.length) rows.push(`**${c.profile.languages}:** ${d.languages.join(', ')}`);
  const blocks: ReplyBlock[] = [text(`**${d.name}**`), list(rows)];
  blocks.push(text(d.consultation ? c.hours.doctorListed(d.name, d.consultation) : c.profile.timings));
  return {
    blocks,
    links: [{ label: c.link.profile(d.name), href: `/doctors/${d.slug}` }, bookLink(c), callLink(c)],
    suggestions: [c.suggest.bookWith(d.name), ...specs.slice(0, 1).map((s) => c.suggest.doctorsOf(shortName(s))), c.suggest.contact],
  };
}

function specialtyReply(c: Copy, lang: Lang, s: Specialty, opts: { symptom?: boolean; expanded?: boolean } = {}): BotReply {
  const n = doctorsIn(s.slug).length;
  const blocks: ReplyBlock[] = [];
  if (opts.symptom) blocks.push(text(c.specialty.symptom(spName(s, lang))));
  blocks.push(text(lang === 'hi' ? `**${spName(s, lang)}**` : `**${s.name}** — ${s.tagline}`), text(spDesc(s, lang)));
  blocks.push(text(`**${c.specialty.conditions}:** ${s.conditions.join(', ')}`));
  blocks.push(text(`**${c.specialty.treatments}:** ${s.treatments.map(clean).join(', ')}`));
  if (opts.expanded) {
    const fac = (s.facilitySlugs ?? []).map(facilityBySlug).filter((f): f is Facility => Boolean(f));
    if (fac.length) blocks.push(text(`**${c.specialty.facilities}:** ${fac.map((f) => fcName(f, lang)).join(', ')}`));
    if (s.faqs?.length && lang !== 'hi') {
      blocks.push(text(`**${c.specialty.faqs}**`));
      blocks.push(list(s.faqs.map((f) => `**${f.question}** ${f.answer}`)));
    }
  }
  if (n > 0) blocks.push(text(c.specialty.doctorCount(n)));
  const suggestions = [
    ...(n > 0 ? [c.suggest.doctorsOf(shortName(s))] : []),
    ...(opts.expanded ? [] : [c.suggest.about(shortName(s))]),
    c.suggest.book,
  ];
  return { blocks, links: [{ label: c.link.page(shortName(s)), href: `/specialties/${s.slug}` }, bookLink(c)], suggestions };
}

function serviceReply(c: Copy, lang: Lang, s: Service): BotReply {
  const hi = lang === 'hi' ? serviceHi[s.slug] : undefined;
  const blocks: ReplyBlock[] = [text(`**${svName(s, lang)}**${s.is24x7 ? ` · ${c.lists.open247}` : ''}`), text(hi ? hi.summary : clean(s.description))];
  const expect = hi ? hi.expect : s.whatToExpect;
  if (expect?.length) blocks.push(list(expect));
  if (s.slug === 'radiology-imaging') blocks.push(text(c.caveat.radiology));
  if (!s.verified) blocks.push(text(c.caveat.unverified));
  const related = (s.relatedSpecialtySlugs ?? []).map(specialtyBySlug).filter((x): x is Specialty => Boolean(x));
  return {
    blocks,
    links: [{ label: c.link.page(s.name), href: `/services/${s.slug}` }, ...related.slice(0, 1).map((r) => ({ label: c.link.page(shortName(r)), href: `/specialties/${r.slug}` })), callLink(c)],
    suggestions: [...related.slice(0, 1).map((r) => c.suggest.about(shortName(r))), c.suggest.services, c.suggest.contact],
  };
}

function facilityReply(c: Copy, lang: Lang, f: Facility): BotReply {
  const summary = lang === 'hi' ? facilityHi[f.slug]?.summary ?? f.summary : clean(f.summary);
  const blocks: ReplyBlock[] = [text(`**${fcName(f, lang)}**`), text(summary)];
  if (f.slug === 'wards-rooms') blocks.push(text(c.caveat.wards));
  else if (!f.verified) blocks.push(text(c.caveat.unverified));
  return {
    blocks,
    links: [{ label: c.link.page(f.name), href: `/facilities/${f.slug}` }, { label: c.link.facilities, href: '/facilities' }, callLink(c)],
    suggestions: [c.suggest.services, c.suggest.insurance, c.suggest.contact],
  };
}

function fallbackReply(c: Copy, raw: string): BotReply {
  const blocks: ReplyBlock[] = [text(c.notFound)];
  const terms = normalize(raw).trim().split(' ').filter((t) => t.length >= 3 && !STOPWORDS.has(t));
  const hits = terms.length ? searchIndex(buildSearchIndex(), terms.join(' ')).slice(0, 3) : [];
  if (hits.length) blocks.push(text(c.mightHelp));
  blocks.push(text(c.fallbackContact(site.phone.tollFree)));
  return {
    blocks,
    links: [...hits.map((h) => ({ label: h.title, href: h.href })), callLink(c), { label: c.link.contact, href: '/contact' }],
    suggestions: c.defaultSuggestions,
  };
}

const STOPWORDS = new Set(
  'the and for are you your can how what where when who which with this that there have has does from about please tell want need give show find get any some more into our all not but was were will would could should hospital amaltas'.split(' '),
);

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export interface LanguageResolution {
  lang: Lang;
  /** Set when the user explicitly asked to change language. */
  requested: Lang | null;
}

export function resolveLanguage(input: string, mode: LangMode, current: Lang): LanguageResolution {
  const requested = detectLanguageRequest(input);
  if (requested) return { lang: requested, requested };
  if (mode !== 'auto') return { lang: mode, requested: null };
  return { lang: detectLanguage(input) ?? current, requested: null };
}

export interface EngineResult {
  reply: BotReply;
  context: ChatContext;
}

export function respond(input: string, ctx: ChatContext, lang: Lang, languageRequested = false): EngineResult {
  const c = copy[lang];
  const norm = normalize(input);
  const scores = scoreIntents(norm);
  const has = (i: Intent) => (scores.get(i) ?? 0) > 0;
  const base: ChatContext = { specialty: ctx.specialty, doctor: ctx.doctor, service: ctx.service, facility: ctx.facility };
  const done = (reply: BotReply, topic: string, patch: ChatContext = {}): EngineResult => ({ reply, context: { ...base, ...patch, topic } });

  if (has('emergency')) return done(emergencyReply(c), 'emergency');

  /* ---- Entities ---- */
  let doctorHits: Doctor[] = [];
  if (ctx.pendingDoctors?.length) {
    const idx = ORDINALS.findIndex((kws) => scoreKeywords(norm, kws) > 0 && wordCount(norm) <= 3);
    const picked = idx >= 0 ? doctorBySlug(ctx.pendingDoctors[idx] ?? '') : undefined;
    doctorHits = picked ? [picked] : findDoctors(norm, ctx.pendingDoctors);
  }
  if (doctorHits.length === 0) doctorHits = findDoctors(norm);

  const spHit = findSpecialty(norm);
  const svHit = findService(norm);
  const fcHit = findFacility(norm);
  const role = findRoleTopic(norm);

  // The longest keyword wins between a department, a service and a facility.
  const ranked = [
    spHit && { kind: 'specialty' as const, item: spHit.item, score: spHit.score },
    svHit && { kind: 'service' as const, item: svHit.item, score: svHit.score + 0.5 },
    fcHit && { kind: 'facility' as const, item: fcHit.item, score: fcHit.score + 0.5 },
  ]
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .sort((a, b) => b.score - a.score);
  const entity = ranked[0];

  if (has('advice')) {
    const blocks: ReplyBlock[] = [text(c.advice.decline)];
    if (spHit) blocks.push(text(c.advice.department(spName(spHit.item, lang))));
    blocks.push(text(c.advice.urgent(site.phone.tollFree)));
    return done(
      {
        blocks,
        links: [...(spHit ? [{ label: c.link.page(shortName(spHit.item)), href: `/specialties/${spHit.item.slug}` }] : []), bookLink(c), callLink(c)],
        suggestions: [...(spHit ? [c.suggest.doctorsOf(shortName(spHit.item))] : []), c.suggest.book],
      },
      'advice',
      spHit ? { specialty: spHit.item.slug } : {},
    );
  }

  if (doctorHits.length > 1) {
    return done(
      { blocks: [text(c.doctors.ambiguous), list(doctorHits.map(doctorLine))], suggestions: doctorHits.slice(0, 4).map((d) => d.name) },
      'doctor-choice',
      { pendingDoctors: doctorHits.map((d) => d.slug) },
    );
  }

  const intent = topIntent(scores, CONTENT_INTENTS);
  const doctor = doctorHits[0];
  const noEntity = !doctor && !entity && !role;
  const referential = scoreKeywords(norm, REFERENTIAL) > 0 || wordCount(norm) <= 5;
  // Follow-up targets carried over from the previous turn.
  // Doctor-focused topics are prefixed "doctor" (doctor, doctor-hours, …).
  const doctorFocus = ctx.topic?.startsWith('doctor') && ctx.topic !== 'doctor-choice';
  const ctxDoctor = noEntity && doctorFocus && ctx.doctor ? doctorBySlug(ctx.doctor) : undefined;
  const ctxSpecialty = noEntity && ctx.specialty ? specialtyBySlug(ctx.specialty) : undefined;

  /* ---- A named doctor ---- */
  if (doctor) {
    const patch = { doctor: doctor.slug, specialty: doctor.specialtySlugs[0] ?? ctx.specialty };
    if (intent === 'appointment') return done(appointmentReply(c, lang, { doctor }), 'doctor-appointment', patch);
    if (intent === 'hours') return done(hoursReply(c, doctor), 'doctor-hours', patch);
    if (intent === 'contact') return done(contactReply(c, doctor), 'doctor-contact', patch);
    return done(doctorProfile(c, lang, doctor), 'doctor', patch);
  }

  /* ---- Intent-led answers ---- */
  switch (intent) {
    case 'appointment': {
      const specialty = entity?.kind === 'specialty' ? entity.item : ctxSpecialty;
      if (ctxDoctor) return done(appointmentReply(c, lang, { doctor: ctxDoctor }), 'doctor-appointment');
      return done(appointmentReply(c, lang, { specialty }), 'appointment', specialty ? { specialty: specialty.slug } : {});
    }
    case 'hours':
      if (entity && entity.kind !== 'specialty') break; // "is the pharmacy open?" → service reply
      return done(hoursReply(c, ctxDoctor), ctxDoctor ? 'doctor-hours' : 'hours');
    case 'insurance':
      return done({ blocks: c.insurance(site.phone.tollFree).map(text), links: [callLink(c), { label: c.link.patients, href: pageFacts.patientsPath }], suggestions: [c.suggest.contact, c.suggest.book] }, 'insurance');
    case 'cost':
      return done({ blocks: [text(c.cost(site.phone.tollFree))], links: [callLink(c), { label: c.link.contact, href: '/contact' }], suggestions: [c.suggest.insurance, c.suggest.book] }, 'cost');
    case 'packages':
      return done({ blocks: [text(c.packages(site.phone.tollFree))], links: [callLink(c), { label: c.link.patients, href: pageFacts.patientsPath }], suggestions: [c.suggest.book, c.suggest.contact] }, 'packages');
    case 'contact':
      if (!entity && !role) return done(contactReply(c, ctxDoctor), ctxDoctor ? 'doctor-contact' : 'contact');
      break;
    case 'guide':
      if (guideArticle) {
        return done(
          { blocks: [text(c.guide.intro), list(articleListItems(guideArticle.body)), text(c.guide.outro)], links: [{ label: c.link.guide, href: `/articles/${guideArticle.slug}` }, bookLink(c)], suggestions: [c.suggest.book, c.suggest.hours] },
          'guide',
        );
      }
      break;
    case 'accreditation':
      return done({ blocks: [text(c.accreditation.nabh), text(c.accreditation.pending)], links: [{ label: c.link.about, href: '/about#accreditations' }], suggestions: [c.suggest.departments, c.suggest.services] }, 'accreditation');
    case 'academics':
      return done(
        { blocks: c.academics(site.academicName, site.email.academic).map(text), links: [{ label: c.link.academics, href: pageFacts.academicsPath }, { label: c.link.email, href: `mailto:${site.email.academic}` }], suggestions: [c.suggest.contact] },
        'academics',
      );
    case 'news': {
      const updates = latestUpdates(3);
      return done({ blocks: [text(c.news), list(updates.map((u) => u.title))], links: updates.map((u) => ({ label: u.title, href: u.href })), suggestions: [c.suggest.departments, c.suggest.doctors] }, 'news');
    }
    case 'doctors':
      if (role) break;
      if (entity?.kind === 'specialty') return done(specialtyDoctors(c, lang, entity.item), 'specialty-doctors', { specialty: entity.item.slug });
      if (noEntity && ctxSpecialty && referential) return done(specialtyDoctors(c, lang, ctxSpecialty), 'specialty-doctors');
      if (noEntity) return done(doctorsOverview(c, lang), 'doctors');
      break;
    case 'specialties':
      if (noEntity) {
        return done(
          { blocks: [text(c.lists.specialties), list(specialties.map((s) => spName(s, lang)))], links: [{ label: c.link.specialties, href: '/specialties' }], suggestions: specialties.filter((s) => s.featured).slice(0, 4).map((s) => c.suggest.about(shortName(s))) },
          'specialties',
        );
      }
      break;
    case 'services':
      if (noEntity) {
        return done(
          { blocks: [text(c.lists.services), list(services.map((s) => `${svName(s, lang)}${s.is24x7 ? ` — ${c.lists.open247}` : ''}`))], links: [{ label: c.link.services, href: '/services' }], suggestions: [c.suggest.departments, c.suggest.emergency, c.suggest.insurance] },
          'services',
        );
      }
      break;
    case 'facilities':
      if (noEntity) {
        return done(
          { blocks: [text(c.lists.facilities), list(facilities.map((f) => fcName(f, lang)))], links: [{ label: c.link.facilities, href: '/facilities' }], suggestions: [c.suggest.services, c.suggest.departments] },
          'facilities',
        );
      }
      break;
    case 'more': {
      if (entity) break; // "more about cardiology" → expanded entity reply below
      if (ctxDoctor) {
        return done(doctorProfile(c, lang, ctxDoctor), 'doctor');
      }
      if (ctx.service) {
        const s = serviceBySlug(ctx.service);
        if (s && ctx.topic === 'service') return done(serviceReply(c, lang, s), 'service');
      }
      if (ctx.facility && ctx.topic === 'facility') {
        const f = facilityBySlug(ctx.facility);
        if (f) return done(facilityReply(c, lang, f), 'facility');
      }
      if (ctxSpecialty) return done(specialtyReply(c, lang, ctxSpecialty, { expanded: true }), 'specialty');
      return done({ blocks: [text(c.moreWhat)], suggestions: c.defaultSuggestions }, 'more');
    }
    case 'about':
      if (noEntity) {
        return done(
          { blocks: c.about(site.name, site.academicName, String(Math.round(site.campusAcres * 10) / 10)).map(text), links: [{ label: c.link.about, href: '/about' }, { label: c.link.specialties, href: '/specialties' }], suggestions: [c.suggest.departments, c.suggest.doctors, c.suggest.contact] },
          'about',
        );
      }
      break;
    case 'whoami':
      if (noEntity) return done({ blocks: c.whoami.map(text), suggestions: c.defaultSuggestions }, 'whoami');
      break;
  }

  /* ---- Entity-led answers ---- */
  if (role) {
    const docs = doctorsForRole(role.match);
    if (docs.length) return done(doctorList(c, c.doctors.role(c.doctors.roleLabels[role.id]), docs), 'role-doctors');
  }
  if (entity?.kind === 'service') return done(serviceReply(c, lang, entity.item), 'service', { service: entity.item.slug });
  if (entity?.kind === 'facility') return done(facilityReply(c, lang, entity.item), 'facility', { facility: entity.item.slug });
  if (entity?.kind === 'specialty') {
    const symptom = scoreKeywords(norm, SYMPTOM) > 0;
    return done(specialtyReply(c, lang, entity.item, { symptom, expanded: intent === 'more' }), 'specialty', { specialty: entity.item.slug });
  }

  /* ---- Small talk ---- */
  if (languageRequested) return done({ blocks: [text(c.langSwitched)], suggestions: c.defaultSuggestions }, 'language');
  const talk = wordCount(norm) <= 6 ? topIntent(scores, SMALL_TALK) : null;
  if (talk === 'thanks') return done({ blocks: [text(c.thanks)], suggestions: c.defaultSuggestions.slice(0, 4) }, 'thanks');
  if (talk === 'bye') return done({ blocks: [text(c.bye)] }, 'bye');
  if (talk === 'ack') return done({ blocks: [text(c.ack)], suggestions: c.defaultSuggestions.slice(0, 4) }, 'ack');
  if (talk === 'greeting') return done(greetingReply(lang), 'greeting');

  return done(fallbackReply(c, input), 'fallback');
}
