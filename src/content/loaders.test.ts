import { describe, it, expect } from 'vitest'
import { selectVideos, resolveLessonText } from './loaders'
import type { Lesson } from './types'

function mkLesson(partial: Partial<Lesson>): Lesson {
  return {
    id: 'x',
    level: 0,
    order: 1,
    difficulty: 'beginner',
    estMinutes: 10,
    reviewStatus: 'needs-expert-review',
    translationStatus: { en: 'authored', hi: 'missing', pa: 'missing', bgc: 'missing' },
    i18n: { en: { title: 'EN', objectives: ['o'], summary: 's', steps: ['a'] } },
    ...partial,
  } as Lesson
}

describe('selectVideos', () => {
  it('prefers a video in the requested language', () => {
    const lesson = mkLesson({
      videos: [
        { videoId: 'HI', lang: 'hi', role: 'primary' },
        { videoId: 'EN', lang: 'en', role: 'deep-dive' },
      ],
    })
    expect(selectVideos(lesson, 'en').primary?.videoId).toBe('EN')
    expect(selectVideos(lesson, 'hi').primary?.videoId).toBe('HI')
  })

  it('never selects a TODO id', () => {
    const lesson = mkLesson({ videos: [{ videoId: 'TODO', lang: 'hi', role: 'primary' }] })
    expect(selectVideos(lesson, 'hi').primary).toBeUndefined()
  })
})

describe('resolveLessonText', () => {
  const bilingual = mkLesson({
    translationStatus: { en: 'authored', hi: 'authored', pa: 'missing', bgc: 'missing' },
    i18n: {
      en: { title: 'EN', objectives: ['o'], summary: 's', steps: ['a'] },
      hi: { title: 'HI', objectives: ['o'], summary: 's', steps: ['a'] },
    },
  })

  it('returns authored text with no fallback', () => {
    const r = resolveLessonText(bilingual, 'hi')
    expect(r.isFallback).toBe(false)
    expect(r.usedLocale).toBe('hi')
    expect(r.text.title).toBe('HI')
  })

  it('falls back to hi when the requested language is missing', () => {
    const r = resolveLessonText(bilingual, 'pa')
    expect(r.isFallback).toBe(true)
    expect(r.usedLocale).toBe('hi')
  })

  it('falls back to en when hi is absent', () => {
    const r = resolveLessonText(mkLesson({}), 'pa')
    expect(r.isFallback).toBe(true)
    expect(r.usedLocale).toBe('en')
  })

  it('renders a machine-draft in-language but flags it', () => {
    const lesson = mkLesson({
      translationStatus: { en: 'authored', hi: 'authored', pa: 'machine-draft', bgc: 'missing' },
      i18n: {
        en: { title: 'EN', objectives: ['o'], summary: 's', steps: ['a'] },
        hi: { title: 'HI', objectives: ['o'], summary: 's', steps: ['a'] },
        pa: { title: 'PA', objectives: ['o'], summary: 's', steps: ['a'] },
      },
    })
    const r = resolveLessonText(lesson, 'pa')
    expect(r.isFallback).toBe(false)
    expect(r.isDraft).toBe(true)
    expect(r.usedLocale).toBe('pa')
    expect(r.text.title).toBe('PA')
  })
})
