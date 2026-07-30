// Emoji "icons" for the discovery cards. Chosen over images on purpose: instantly
// recognisable (helpful for low-literacy users), crisp at any size, and ZERO data cost —
// they render from the phone's built-in emoji font, so nothing is downloaded.
//
// IMPORTANT: only Emoji 1.0 (2015) glyphs are used. Dedicated tool emoji like 🪚 (saw),
// 🪛 (screwdriver) or 🪵 (wood) are Emoji 12–13 (2019–2020) and show as an empty box on the
// old, cheap Android phones this app targets — so we use widely-recognisable Emoji-1.0
// stand-ins (🔪 for cutting, ⚒️ for chisel, 🔨 for a mallet, 🌳 for timber, …). Verify any
// new addition renders on an old device before using it.

const TOOL_BY_ID: Record<string, string> = {
  'safety-glasses': '👓',
  'dust-mask': '😷',
  'ear-protection': '🎧',
  'first-aid-kit': '🚑',
  'push-stick': '✋',
  'measuring-tape': '📏',
  gunia: '📐',
  'marking-gauge': '✏️',
  'carpenter-pencil': '✏️',
  handsaw: '🔪',
  'tenon-saw': '🔪',
  'circular-saw': '🔪',
  'table-saw': '🔪',
  jigsaw: '🔪',
  'hand-plane': '🔧',
  mallet: '🔨',
  'chisel-firmer': '⚒️',
  'sharpening-stone': '🔧',
  'file-rasp': '🔧',
  sandpaper: '✨',
  screwdriver: '🔧',
  'power-drill': '🔌',
  router: '⚙️',
}

const TOOL_BY_CATEGORY: Record<string, string> = {
  safety: '😷',
  'measuring-marking': '📐',
  cutting: '🔪',
  planing: '🔧',
  striking: '🔨',
  chisel: '⚒️',
  fastening: '🔩',
  power: '🔌',
  finishing: '✨',
  machine: '⚙️',
}

export function toolEmoji(id: string, category?: string): string {
  return TOOL_BY_ID[id] ?? (category ? TOOL_BY_CATEGORY[category] : undefined) ?? '🔧'
}

const PROJECT_BY_ID: Record<string, string> = {
  'patra-stool': '💺',
  chowki: '💺',
  palang: '🛏️',
  almirah: '🗄️',
  'modular-kitchen': '🍽️',
}

export function projectEmoji(id: string): string {
  return PROJECT_BY_ID[id] ?? '🔨'
}

const WOOD_BY_KIND: Record<string, string> = {
  'solid-timber': '🌳',
  'sheet-good': '📋',
  surfacing: '🎨',
}

export function woodEmoji(kind: string): string {
  return WOOD_BY_KIND[kind] ?? '🌳'
}

const FIX_BY_CATEGORY: Record<string, string> = {
  cutting: '🔪',
  joinery: '🔗',
  finishing: '✨',
  boards: '📋',
}

export function fixEmoji(category?: string): string {
  return (category ? FIX_BY_CATEGORY[category] : undefined) ?? '🔧'
}
