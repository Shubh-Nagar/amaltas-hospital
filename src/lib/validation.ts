/**
 * Field validators for patient-facing forms. Each returns an error message,
 * or undefined when the value is acceptable.
 */

/** Letters in any script (so Hindi names work), spaces, and . ' - between words. */
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u;

export function validateName(value: string): string | undefined {
  const v = value.trim().replace(/\s+/g, ' ');
  if (!v) return 'Please enter your name.';
  if (v.length < 2) return 'Name must be at least 2 characters.';
  if (v.length > 60) return 'Name must be 60 characters or fewer.';
  if (!NAME_RE.test(v)) return 'Name can only contain letters, spaces, and . \' -';
  return undefined;
}

/**
 * Reduces an Indian mobile number to its 10 digits, accepting an optional
 * +91 / 91 / 0 prefix and spaces or dashes. Returns null if it isn't one.
 */
export function normaliseIndianMobile(value: string): string | null {
  const v = value.trim();
  if (!/^\+?[\d\s-]+$/.test(v)) return null;
  const digits = v.replace(/\D/g, '');
  const ten =
    digits.length === 10 ? digits
    : digits.length === 11 && digits.startsWith('0') ? digits.slice(1)
    : digits.length === 12 && digits.startsWith('91') ? digits.slice(2)
    : null;
  return ten && /^[6-9]\d{9}$/.test(ten) ? ten : null;
}

export function validateIndianMobile(value: string): string | undefined {
  if (!value.trim()) return 'Please enter your mobile number.';
  if (!normaliseIndianMobile(value)) return 'Please enter a valid 10-digit Indian mobile number.';
  return undefined;
}

const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

/** Email is optional unless `required`; when given it must be well-formed. */
export function validateEmail(value: string, required = false): string | undefined {
  const v = value.trim();
  if (!v) return required ? 'Please enter your email address.' : undefined;
  if (v.length > 254 || !EMAIL_RE.test(v)) return 'Please enter a valid email address.';
  return undefined;
}

/** Today's date as YYYY-MM-DD in the visitor's local time zone (not UTC). */
export function localISODate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Required date between today and `maxDaysAhead` days from now (inclusive). */
export function validateFutureDate(value: string, maxDaysAhead: number): string | undefined {
  if (!value) return 'Please choose a preferred date.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) return 'Please enter a valid date.';
  if (value < localISODate()) return 'Please choose today or a later date.';
  if (value > localISODate(maxDaysAhead)) return `Please choose a date within the next ${maxDaysAhead} days.`;
  return undefined;
}
