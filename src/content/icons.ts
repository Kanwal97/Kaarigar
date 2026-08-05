// Content → icon mapping. Replaces src/content/emoji.ts (redesign Phase 3).
//
// Why the change: emoji couldn't be recoloured (so they ignored the palette and the
// ≥3:1 non-text-contrast rule), rendered differently on every Android build, and were
// ambiguous — 🔧 stood for a hand plane, a sharpening stone, a screwdriver and the
// fallback all at once. The drawn set in components/ui/Icon.tsx costs about the same
// (nothing over the network) and says what it means.
//
// The old file's real constraint still holds and is respected: nothing here downloads.

import type { IconName } from '../components/ui/Icon'

const TOOL_BY_ID: Record<string, IconName> = {
  'safety-glasses': 'goggles',
  'dust-mask': 'mask',
  'ear-protection': 'ear',
  'first-aid-kit': 'firstaid',
  'push-stick': 'clamp',
  'measuring-tape': 'tape',
  gunia: 'square',
  'marking-gauge': 'gauge',
  'carpenter-pencil': 'pencil',
  handsaw: 'saw',
  'tenon-saw': 'saw',
  'circular-saw': 'circular-saw',
  'table-saw': 'circular-saw',
  jigsaw: 'circular-saw',
  'hand-plane': 'plane',
  mallet: 'mallet',
  'chisel-firmer': 'chisel',
  'sharpening-stone': 'stone',
  'file-rasp': 'rasp',
  sandpaper: 'finish',
  screwdriver: 'screwdriver',
  'power-drill': 'drill',
  router: 'machine',
}

const TOOL_BY_CATEGORY: Record<string, IconName> = {
  safety: 'mask',
  'measuring-marking': 'square',
  cutting: 'saw',
  planing: 'plane',
  striking: 'mallet',
  chisel: 'chisel',
  boring: 'drill',
  holding: 'clamp',
  fastening: 'fastener',
  power: 'drill',
  finishing: 'finish',
  machine: 'machine',
}

export function toolIcon(id: string, category?: string): IconName {
  return TOOL_BY_ID[id] ?? (category ? TOOL_BY_CATEGORY[category] : undefined) ?? 'tools'
}

const WOOD_BY_KIND: Record<string, IconName> = {
  'solid-timber': 'timber',
  'sheet-good': 'board',
  surfacing: 'surfacing',
}

export function woodIcon(kind: string): IconName {
  return WOOD_BY_KIND[kind] ?? 'timber'
}

const PROJECT_BY_ID: Record<string, IconName> = {
  'patra-stool': 'stool',
  chowki: 'stool',
  palang: 'bed',
  almirah: 'wardrobe',
  'modular-kitchen': 'kitchen',
}

export function projectIcon(id: string): IconName {
  return PROJECT_BY_ID[id] ?? 'build'
}

const FIX_BY_CATEGORY: Record<string, IconName> = {
  cutting: 'saw',
  joinery: 'joint',
  finishing: 'finish',
  boards: 'board',
}

export function fixIcon(category?: string): IconName {
  return (category ? FIX_BY_CATEGORY[category] : undefined) ?? 'fix'
}

const GLOSSARY_BY_CATEGORY: Record<string, IconName> = {
  tool: 'tools',
  wood: 'timber',
  material: 'board',
  joint: 'joint',
  technique: 'chisel',
  finishing: 'finish',
  hardware: 'fastener',
  business: 'book',
  safety: 'warning',
}

// The Glossary previously rendered the first LETTER of the term as its avatar, which
// told the reader nothing. Category is a real signal and it is already in the data.
export function glossaryIcon(category?: string): IconName {
  return (category ? GLOSSARY_BY_CATEGORY[category] : undefined) ?? 'book'
}
