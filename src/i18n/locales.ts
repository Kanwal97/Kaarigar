// The four first-class languages. `bgc` = Haryanvi (Devanagari script, ISO 639-3).
// Hindi is listed FIRST because the audience is mostly Indian and reads Hindi — it is
// the default/most-prominent language on the splash and switcher (English stays the
// authoring source pair). See docs/RESEARCH.md §1.1.
export const LOCALES = ['hi', 'en', 'pa', 'bgc'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'hi'

// Fallback chain when a locale's content is missing (translationStatus !== 'authored').
// Hindi is the pragmatic fallback (Devanagari default for Haryana/NCR; most Punjab
// readers also read Devanagari). See docs/RESEARCH.md §1.1 and docs/PLAN.md A2.
export const FALLBACK_LOCALE: Locale = 'hi'

// Each language's name written in its own script (endonym).
export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  hi: 'हिंदी',
  pa: 'ਪੰਜਾਬੀ',
  bgc: 'हरियाणवी',
}

// Script per locale — drives which font subset to load (Gurmukhi only for `pa`).
export const LOCALE_SCRIPT: Record<Locale, 'latin' | 'devanagari' | 'gurmukhi'> = {
  en: 'latin',
  hi: 'devanagari',
  pa: 'gurmukhi',
  bgc: 'devanagari',
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

// react-router pathnames arrive WITHOUT the router basename (already stripped),
// e.g. "/hi/level/l00". The first segment is the locale (or none, on the "/" splash).
export function localeFromPath(pathname: string): Locale | null {
  const seg = pathname.replace(/^\/+/, '').split('/')[0] ?? ''
  return isLocale(seg) ? seg : null
}

// Swap the locale segment while keeping the rest of the path (so the language
// switcher lands on the SAME page in the chosen language).
export function switchLocalePath(pathname: string, next: Locale): string {
  const parts = pathname.replace(/^\/+/, '').split('/')
  if (parts.length && isLocale(parts[0])) {
    parts[0] = next
    return '/' + parts.join('/')
  }
  return `/${next}`
}
