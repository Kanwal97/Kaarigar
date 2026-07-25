import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { readJSON, writeJSON } from './storage'
import { isLocale, type Locale } from '../i18n/locales'

// On-device progress (no accounts). A small JSON blob in localStorage, with a version
// field + validation so it can be exported and re-imported on another device
// (docs/PLAN.md §2.4). Dates are only touched in client handlers/effects — never during
// render — so there's no SSR/hydration issue.

const KEY = 'progress'
const VERSION = 1

export interface LastLesson {
  lessonId: string
  lang: Locale
  title?: string
}

export interface ProgressData {
  version: number
  completedLessons: string[]
  lastLesson: LastLesson | null
  streak: { count: number; lastActiveDate: string }
  updatedAt: string
}

function empty(): ProgressData {
  return {
    version: VERSION,
    completedLessons: [],
    lastLesson: null,
    streak: { count: 0, lastActiveDate: '' },
    updatedAt: '',
  }
}

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function daysBetween(a: string, b: string): number {
  const da = new Date(`${a}T00:00:00`)
  const db = new Date(`${b}T00:00:00`)
  return Math.round((db.getTime() - da.getTime()) / 86_400_000)
}

// Validate arbitrary (loaded or imported) data into a safe ProgressData — no `any`.
function sanitize(raw: unknown): ProgressData {
  const base = empty()
  if (!raw || typeof raw !== 'object') return base
  const r = raw as Record<string, unknown>

  const completed = Array.isArray(r.completedLessons)
    ? r.completedLessons.filter((x): x is string => typeof x === 'string')
    : []

  let last: LastLesson | null = null
  if (r.lastLesson && typeof r.lastLesson === 'object') {
    const l = r.lastLesson as Record<string, unknown>
    if (typeof l.lessonId === 'string' && typeof l.lang === 'string' && isLocale(l.lang)) {
      last = { lessonId: l.lessonId, lang: l.lang, title: typeof l.title === 'string' ? l.title : undefined }
    }
  }

  const s = (r.streak && typeof r.streak === 'object' ? r.streak : {}) as Record<string, unknown>
  return {
    version: VERSION,
    completedLessons: completed,
    lastLesson: last,
    streak: {
      count: typeof s.count === 'number' ? s.count : 0,
      lastActiveDate: typeof s.lastActiveDate === 'string' ? s.lastActiveDate : '',
    },
    updatedAt: typeof r.updatedAt === 'string' ? r.updatedAt : '',
  }
}

interface ProgressValue {
  data: ProgressData
  hydrated: boolean
  isComplete: (lessonId: string) => boolean
  markComplete: (lessonId: string, lang: Locale, title: string) => void
  recordVisit: (lessonId: string, lang: Locale, title: string) => void
  reset: () => void
  exportData: () => string
  importData: (json: string) => { ok: boolean; error?: string }
}

const ProgressContext = createContext<ProgressValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ProgressData>(empty)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setData(sanitize(readJSON<unknown>(KEY, null)))
    setHydrated(true)
  }, [])

  const persist = useCallback((next: ProgressData) => {
    next.updatedAt = new Date().toISOString()
    setData(next)
    writeJSON(KEY, next)
  }, [])

  const bumpStreak = (streak: ProgressData['streak']): ProgressData['streak'] => {
    const t = todayStr()
    if (streak.lastActiveDate === t) return streak
    if (streak.lastActiveDate && daysBetween(streak.lastActiveDate, t) === 1) {
      return { count: streak.count + 1, lastActiveDate: t }
    }
    return { count: 1, lastActiveDate: t }
  }

  const isComplete = useCallback((id: string) => data.completedLessons.includes(id), [data])

  const markComplete = useCallback(
    (lessonId: string, lang: Locale, title: string) => {
      setData((prev) => {
        const completedLessons = prev.completedLessons.includes(lessonId)
          ? prev.completedLessons
          : [...prev.completedLessons, lessonId]
        const next: ProgressData = {
          ...prev,
          completedLessons,
          lastLesson: { lessonId, lang, title },
          streak: bumpStreak(prev.streak),
          updatedAt: new Date().toISOString(),
        }
        writeJSON(KEY, next)
        return next
      })
    },
    [],
  )

  const recordVisit = useCallback((lessonId: string, lang: Locale, title: string) => {
    setData((prev) => {
      if (prev.lastLesson?.lessonId === lessonId && prev.lastLesson.lang === lang) return prev
      const next = { ...prev, lastLesson: { lessonId, lang, title } }
      writeJSON(KEY, next)
      return next
    })
  }, [])

  const reset = useCallback(() => persist(empty()), [persist])

  const exportData = useCallback(() => JSON.stringify(data, null, 2), [data])

  const importData = useCallback(
    (json: string): { ok: boolean; error?: string } => {
      let parsed: unknown
      try {
        parsed = JSON.parse(json)
      } catch {
        return { ok: false, error: 'That file isn’t valid JSON.' }
      }
      if (!parsed || typeof parsed !== 'object' || !Array.isArray((parsed as Record<string, unknown>).completedLessons)) {
        return { ok: false, error: 'That doesn’t look like a Kaarigar progress file.' }
      }
      persist(sanitize(parsed))
      return { ok: true }
    },
    [persist],
  )

  return (
    <ProgressContext.Provider
      value={{ data, hydrated, isComplete, markComplete, recordVisit, reset, exportData, importData }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress(): ProgressValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
