import { FALLBACK_LOCALE, type Locale } from '../i18n/locales'
import type { Level, Tool, Wood, Hazard, GlossaryTerm, Project, FixItItem, LocalizedText } from './types'

// EAGER reference data — small and bounded, safe to ship in the initial bundle:
// levels, tools, woods, glossary, hazards, and a lightweight LESSON METADATA index
// (titles + difficulty + minutes, NOT the bodies). Lesson bodies are lazy-loaded per
// lesson from ./loaders.ts. This keeps the home/initial route free of lesson content.
// See docs/CONTENT-LAZY-LOADING.md.

import hazardsJson from '../../content/hazards/hazards.json'
import toolsJson from '../../content/tools/tools.json'
import woodsJson from '../../content/woods/woods.json'
import glossaryJson from '../../content/glossary/glossary.json'
import projectsJson from '../../content/projects/projects.json'
import fixitJson from '../../content/fixit/fixit.json'
import lessonIndexJson from '../../content/_lessons-index.generated.json'

export interface LessonMeta {
  id: string
  level: number
  order: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estMinutes: number
  tags: string[]
  titles: Partial<Record<Locale, string>>
  /** id references only — enough for the Level "at a glance" panel, no bodies loaded */
  tools: string[]
  materials: string[]
  hazards: string[]
}

export const hazards = hazardsJson as unknown as Hazard[]
export const tools = toolsJson as unknown as Tool[]
export const woods = woodsJson as unknown as Wood[]
export const glossary = glossaryJson as unknown as GlossaryTerm[]
export const projects = projectsJson as unknown as Project[]
export const fixit = fixitJson as unknown as FixItItem[]
export const lessonIndex = lessonIndexJson as unknown as LessonMeta[]

const levelModules = import.meta.glob('../../content/levels/*.json', { eager: true })
function collect<T>(modules: Record<string, unknown>): T[] {
  return Object.values(modules).map((m) => (m as { default: T }).default)
}
export const levels = collect<Level>(levelModules)

const toolMap = new Map(tools.map((t) => [t.id, t]))
const hazardMap = new Map(hazards.map((h) => [h.id, h]))
const woodMap = new Map(woods.map((w) => [w.id, w]))
const levelMap = new Map(levels.map((l) => [l.id, l]))
const lessonMetaMap = new Map(lessonIndex.map((l) => [l.id, l]))

export const getTool = (id: string): Tool | undefined => toolMap.get(id)
export const getHazard = (id: string): Hazard | undefined => hazardMap.get(id)
export const getWood = (id: string): Wood | undefined => woodMap.get(id)
export const getLevel = (id: string): Level | undefined => levelMap.get(id)
export const getLessonMeta = (id: string): LessonMeta | undefined => lessonMetaMap.get(id)

const projectMap = new Map(projects.map((p) => [p.id, p]))
export const getProject = (id: string): Project | undefined => projectMap.get(id)

export function levelLessonMeta(levelId: string): LessonMeta[] {
  const level = getLevel(levelId)
  if (!level) return []
  return level.lessons
    .map((id) => getLessonMeta(id))
    .filter((l): l is LessonMeta => Boolean(l))
    .sort((a, b) => a.order - b.order)
}

// Pick a localized string with an honest fallback (requested → hi → en).
export function pick(map: LocalizedText | Partial<Record<Locale, string>> | undefined, locale: Locale): string {
  if (!map) return ''
  return map[locale] ?? map[FALLBACK_LOCALE] ?? map.en ?? ''
}

export function lessonTitle(meta: LessonMeta, locale: Locale): string {
  return meta.titles[locale] ?? meta.titles[FALLBACK_LOCALE] ?? meta.titles.en ?? meta.id
}
