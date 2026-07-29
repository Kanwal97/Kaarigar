// Emoji "icons" for the discovery cards. Chosen over images on purpose: instantly
// recognisable (helpful for low-literacy users), crisp at any size, and ZERO data cost —
// they render from the phone's built-in emoji font, so nothing is downloaded. Where a tool
// has no faithful emoji we fall back to its category, then a generic wrench.

const TOOL_BY_ID: Record<string, string> = {
  'safety-glasses': '🥽',
  'dust-mask': '😷',
  'ear-protection': '🎧',
  'first-aid-kit': '🩹',
  'push-stick': '🧰',
  'measuring-tape': '📏',
  gunia: '📐',
  'marking-gauge': '✒️',
  'carpenter-pencil': '✏️',
  handsaw: '🪚',
  'tenon-saw': '🪚',
  'circular-saw': '🪚',
  'table-saw': '🪚',
  jigsaw: '🧩',
  'hand-plane': '🪵',
  mallet: '🔨',
  'chisel-firmer': '⚒️',
  'sharpening-stone': '🪨',
  'file-rasp': '🔧',
  sandpaper: '🧽',
  screwdriver: '🪛',
  'power-drill': '🛠️',
  router: '⚙️',
}

const TOOL_BY_CATEGORY: Record<string, string> = {
  safety: '🦺',
  'measuring-marking': '📐',
  cutting: '🪚',
  planing: '🪵',
  striking: '🔨',
  chisel: '⚒️',
  fastening: '🪛',
  power: '⚡',
  finishing: '🧽',
  machine: '⚙️',
}

export function toolEmoji(id: string, category?: string): string {
  return TOOL_BY_ID[id] ?? (category ? TOOL_BY_CATEGORY[category] : undefined) ?? '🔧'
}

const PROJECT_BY_ID: Record<string, string> = {
  'patra-stool': '🪑',
  chowki: '🪑',
  palang: '🛏️',
  almirah: '🗄️',
  'modular-kitchen': '🍽️',
}

export function projectEmoji(id: string): string {
  return PROJECT_BY_ID[id] ?? '🪚'
}

const FIX_BY_CATEGORY: Record<string, string> = {
  cutting: '🪚',
  joinery: '🔗',
  finishing: '🧽',
  boards: '🪵',
}

export function fixEmoji(category?: string): string {
  return (category ? FIX_BY_CATEGORY[category] : undefined) ?? '🔧'
}
