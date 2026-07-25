import type { Locale } from '../i18n/locales'

// Types mirror content/schema/*.json. No `any` anywhere in content handling.
export type LocalizedText = Partial<Record<Locale, string>> & { en: string }
export type TranslationStatus = 'authored' | 'draft-needs-review' | 'machine-draft' | 'missing'

export interface LessonText {
  title: string
  objectives: string[]
  summary: string
  steps: string[]
  practice?: string
  safetyNote?: string
}

export interface LessonVideo {
  videoId: string
  lang: Locale
  startSec?: number
  endSec?: number | null
  role: 'primary' | 'alternate-language' | 'deep-dive'
  credit?: string
  verifiedAt?: string | null
  embeddable?: boolean | null
}

export interface SelfCheckItem {
  q: LocalizedText
  options: LocalizedText[]
  answerIndex: number
  explain?: LocalizedText
}

export interface Lesson {
  id: string
  level: number
  order: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estMinutes: number
  tags?: string[]
  prerequisites?: string[]
  tools?: string[]
  materials?: string[]
  hazards?: string[]
  reviewStatus: 'needs-expert-review' | 'expert-reviewed'
  reviewedBy?: string
  audio?: Partial<Record<Locale, string>>
  videos?: LessonVideo[]
  i18n: Partial<Record<Locale, LessonText>> & { en: LessonText }
  translationStatus: Record<Locale, TranslationStatus>
  selfCheck?: SelfCheckItem[]
}

export interface LevelText {
  title: string
  outcome: string
}

export interface Level {
  id: string
  number: number
  joint: string
  icon?: string
  i18n: Partial<Record<Locale, LevelText>> & { en: LevelText }
  lessons: string[]
}

export interface Tool {
  id: string
  names: LocalizedText
  roman?: string
  category?: string
  image?: string
  audio?: Partial<Record<Locale, string>>
  use?: LocalizedText
  usedInLessons?: string[]
  verified: boolean
  source?: string
}

export interface Wood {
  id: string
  kind: 'solid-timber' | 'sheet-good' | 'surfacing'
  names: LocalizedText
  botanical?: string
  isStandard?: string
  grade?: string
  priceTier?: string
  waterResistance?: string
  workability?: LocalizedText
  typicalUses?: LocalizedText
  image?: string
  verified?: boolean
  source?: string
}

export interface HazardText {
  label: string
  risk?: string
  control: string
}

export interface HazardSource {
  org: string
  url: string
  ref?: string
}

export interface Hazard {
  id: string
  severity?: 'low' | 'medium' | 'high' | 'critical'
  i18n: Partial<Record<Locale, HazardText>> & { en: HazardText }
  source: HazardSource[]
  reviewStatus: 'needs-expert-review' | 'expert-reviewed'
  reviewedBy?: string
}

export interface ProjectText {
  title: string
  summary: string
  outcome?: string
}

export interface Project {
  id: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estHours?: number
  image?: string
  skillsNeeded?: string[]
  tools?: string[]
  materials?: string[]
  estimateHint?: LocalizedText
  i18n: Partial<Record<Locale, ProjectText>> & { en: ProjectText }
  translationStatus?: Partial<Record<Locale, TranslationStatus>>
}

export interface FixText {
  title: string
  problem: string
  cause?: string
  fix: string
}

export interface FixItItem {
  id: string
  category?: string
  relatedLessons?: string[]
  i18n: Partial<Record<Locale, FixText>> & { en: FixText }
}

export interface GlossaryTerm {
  id: string
  term: LocalizedText
  roman?: string
  definition?: LocalizedText
  category?: string
  image?: string
  audio?: Partial<Record<Locale, string>>
  relatedIds?: string[]
  verified?: boolean
  source?: string
}
