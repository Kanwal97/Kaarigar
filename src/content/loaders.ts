import { FALLBACK_LOCALE, type Locale } from '../i18n/locales'
import type { Lesson, LessonText, LessonVideo } from './types'

// LAZY lesson bodies. The glob is NOT eager, so each lesson JSON is its own chunk,
// fetched only when that lesson is opened (via the route loader in routes.tsx) — the
// bodies never enter the initial bundle. Reference data + lesson metadata live in
// ./refdata.ts. See docs/CONTENT-LAZY-LOADING.md.
const lessonBodyModules = import.meta.glob('../../content/lessons/*.json')

export function loadLessonBody(id: string): Promise<Lesson> {
  const key = Object.keys(lessonBodyModules).find((k) => k.endsWith(`/${id}.json`))
  if (!key) return Promise.reject(new Response(`Lesson "${id}" not found`, { status: 404 }))
  return lessonBodyModules[key]!().then((m) => (m as { default: Lesson }).default)
}

// Pick the best video for the display language: a primary in that language, else any
// video in that language, else the primary, else the first real (non-TODO) video.
export function selectVideos(
  lesson: Lesson,
  locale: Locale,
): { primary?: LessonVideo; extras: LessonVideo[] } {
  const real = (lesson.videos ?? []).filter((v) => v.videoId !== 'TODO')
  const primary =
    real.find((v) => v.role === 'primary' && v.lang === locale) ??
    real.find((v) => v.lang === locale) ??
    real.find((v) => v.role === 'primary') ??
    real[0]
  const extras = real.filter((v) => v !== primary)
  return { primary, extras }
}

// Resolve a lesson's body text with an honest fallback.
// - 'authored'          → renders in-language, no badge.
// - 'machine-draft' /
//   'draft-needs-review'→ renders in-language BUT flagged (caller shows a "draft" badge)
//                          so it's never passed off as finished, human-checked text.
// - 'missing'           → falls back to hi/en (caller shows a "coming — showing Hindi" badge).
// Never a silent English string mislabelled as Punjabi.
export function resolveLessonText(
  lesson: Lesson,
  locale: Locale,
): { text: LessonText; usedLocale: Locale; isFallback: boolean; isDraft: boolean } {
  const status = lesson.translationStatus[locale]
  if ((status === 'authored' || status === 'machine-draft' || status === 'draft-needs-review') && lesson.i18n[locale]) {
    return { text: lesson.i18n[locale]!, usedLocale: locale, isFallback: false, isDraft: status !== 'authored' }
  }
  const fb: Locale = lesson.i18n[FALLBACK_LOCALE] ? FALLBACK_LOCALE : 'en'
  return { text: lesson.i18n[fb]!, usedLocale: fb, isFallback: locale !== fb, isDraft: false }
}
