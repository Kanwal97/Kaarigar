// ONE drawn icon set — the design rule in docs/DESIGN.md §Iconography, finally kept.
//
// Replaces src/content/emoji.ts. Emoji were chosen originally for zero data cost, which
// was right, but they can't be recoloured, render differently on every device, and
// collapsed distinct objects onto one glyph (🔧 stood for a hand plane, a sharpening
// stone, a screwdriver AND the fallback). Inline SVG is also effectively zero network
// cost (~1.2 KB gzipped for the whole set), takes `currentColor`, and can actually
// depict a randa instead of a wrench.
//
// Rules: concrete objects, 24px glyph inside a ≥44px target, ≥3:1 non-text contrast,
// and NEVER shown without a text label — every icon here is aria-hidden.

export type IconName =
  // primary navigation
  | 'learn' | 'tools' | 'build' | 'fix' | 'me' | 'search'
  // hand tools
  | 'plane' | 'saw' | 'chisel' | 'mallet' | 'square' | 'tape' | 'pencil' | 'gauge'
  | 'stone' | 'rasp' | 'screwdriver' | 'clamp' | 'fastener'
  // power tools & machines
  | 'drill' | 'circular-saw' | 'machine'
  // safety
  | 'goggles' | 'mask' | 'ear' | 'firstaid' | 'warning'
  // materials
  | 'timber' | 'board' | 'surfacing' | 'joint' | 'finish'
  // projects
  | 'stool' | 'bed' | 'wardrobe' | 'kitchen'
  // ui
  | 'book' | 'clock' | 'speaker' | 'play' | 'arrow-right' | 'check' | 'flag'

const PATHS: Record<IconName, string> = {
  // ---- navigation ----------------------------------------------------------
  learn: 'M4 5h10a4 4 0 0 1 4 4v10M4 5v10a4 4 0 0 0 4 4h10M4 5l4 4M18 19l-4-4',
  tools: 'M3 15h18v3H3zM5 15l2-5h10l2 5M10 10V7h4v3',
  build: 'M3 8l9-4 9 4-9 4-9-4Zm0 5l9 4 9-4M3 13v3l9 4 9-4v-3',
  fix: 'M8 8l8 8M6.5 6.5a3.5 3.5 0 0 1 5 0l6 6a3.5 3.5 0 0 1-5 5l-6-6a3.5 3.5 0 0 1 0-5Z',
  me: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-3-1.6.6.6 1.6-1.4 1.4-1.6-.6-.6 1.6h-2l-.6-1.6-1.6.6-1.4-1.4.6-1.6L4 12l1.6-.6-.6-1.6L6.4 8.4 8 9l.6-1.6h2L11.2 9l1.6-.6 1.4 1.4-.6 1.6L19 12Z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM16.5 16.5 21 21',

  // ---- hand tools ----------------------------------------------------------
  // randa — plane body, sole and knob
  plane: 'M3 15h18v3H3zM5 15l2-5h10l2 5M10 10V7h4v3',
  // aari — toothed blade + handle
  saw: 'M3 7h12v5H3zM3 12l1.6 2.4L6.2 12l1.6 2.4L9.4 12l1.6 2.4L12.6 12l1.6 2.4L15 12M15 8h3a2.5 2.5 0 0 1 0 5h-3',
  // rukhani — chisel blade and handle
  chisel: 'M4 20l3.5-3.5M7.5 16.5l-2.8.7.7-2.8L14 5.6l2.1 2.1zM14.6 5l2.5-2.5L20.5 6 18 8.5',
  mallet: 'M3 21l7.5-7.5M9 12l3.5-3.5 2.5 2.5L11.5 14.5zM13 8l3.5-3.5 5 5L18 13z',
  square: 'M4 4h4.5v11.5H20V20H4z',
  tape: 'M2 9h20v6H2zM6 9v3.5M10 9v4.5M14 9v3.5M18 9v4.5',
  pencil: 'M3 21l1-4.2L15.8 5l3.2 3.2L7.2 20zM13.8 7l3.2 3.2',
  gauge: 'M3 8h13v8H3zM8.5 8v8M16 12h5M19 10v4',
  stone: 'M3 10h18v5H3zM3 12.5h18',
  rasp: 'M4 18l9.5-9.5M13.5 4.5 19.5 10.5 16.5 13.5 10.5 7.5zM4 18l-1 3 3-1M8 11l1 1M10 9l1 1M12 7l1 1',
  screwdriver: 'M13.5 4 20 10.5l-2 2-6.5-6.5zM11.5 8 4 15.5V20h4.5L16 12.5',
  clamp: 'M4 4h4v16H4zM8 8h9a2.5 2.5 0 0 1 0 5H8M17.5 13v5M14.5 18h6',
  fastener: 'M12 2.5v13M12 15.5l-3 3 3 3 3-3zM9 5.5h6M9 8.5h6M9 11.5h6',

  // ---- power tools & machines ---------------------------------------------
  drill: 'M3 7h9v6H3zM12 9h4v2h-4M16 10h5M6 13v4h3.5v-4M3 7V5.5h4V7',
  'circular-saw': 'M10 17a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM10 6v11M4.5 11.5h11M15.5 8h5v8h-6',
  machine: 'M4 6h16v10H4zM8 16v3h8v-3M9 10.5h6M4 9h16',

  // ---- safety --------------------------------------------------------------
  goggles: 'M2.5 9.5h19V14a2.5 2.5 0 0 1-2.5 2.5h-4L12 13.5l-3 3H5A2.5 2.5 0 0 1 2.5 14zM2.5 9.5 5 6h14l2.5 3.5',
  mask: 'M3 9c0-2 3.5-3.5 9-3.5S21 7 21 9v2.5c0 3.5-4 6.5-9 6.5s-9-3-9-6.5zM3 11h18M8 21h8',
  ear: 'M6 9a6 6 0 0 1 12 0v2.5M4 11.5h4V20H6a2 2 0 0 1-2-2zM16 11.5h4V18a2 2 0 0 1-2 2h-2z',
  firstaid: 'M3 6.5h18v13H3zM12 10v6M9 13h6M8 6.5V4h8v2.5',
  warning: 'M12 3.5 21.5 20h-19zM12 10v4.5M12 17.2h.01',

  // ---- materials -----------------------------------------------------------
  timber: 'M8 6h12v12H8zM8 6a3.2 6 0 0 0 0 12 3.2 6 0 0 0 0-12M8 9.5a1.6 2.5 0 0 0 0 5',
  board: 'M3 5.5h18v3.5H3zM3 10.5h18V14H3zM3 15.5h18V19H3z',
  surfacing: 'M3 8.5 12 4l9 4.5-9 4.5zM3 14l9 4.5 9-4.5',
  joint: 'M3 8h8v8H3zM11 10.5h4v3h-4M15 5.5h6v13h-6',
  finish: 'M9.5 3h5v6h-5zM7.5 9h9v4h-9zM10 13v8h4v-8M18 6c1.5 1 1.5 2.5 0 3.5',

  // ---- projects ------------------------------------------------------------
  stool: 'M4 9.5h16M6.5 9.5 8 20M17.5 9.5 16 20M7.5 15h9M7 4.5h10v5H7z',
  bed: 'M3 8v12M3 12.5h18V20M21 20v-8a3 3 0 0 0-3-3h-5.5v3.5M7 8.5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4',
  wardrobe: 'M4 3h16v18H4zM12 3v18M10 11.5h.01M14 11.5h.01M6.5 21v1.5M17.5 21v1.5',
  kitchen: 'M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01M12 10v4',

  // ---- ui ------------------------------------------------------------------
  book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21zM20 18.5V21H6.5',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 7.5V12l3 2',
  speaker: 'M4 9.5h4L13 5v14L8 14.5H4zM16.5 9.5a3.6 3.6 0 0 1 0 5M19 7a7 7 0 0 1 0 10',
  play: 'M7 4.5 19 12 7 19.5z',
  'arrow-right': 'M4 12h15M13 6l6 6-6 6',
  check: 'M4 12.5 9.5 18 20 6.5',
  flag: 'M5 21V3.5h13l-3 4 3 4H5',
}

export function Icon({
  name,
  size = 24,
  className,
}: {
  name: IconName
  size?: number
  className?: string
}) {
  return (
    <svg
      className={className ? `icon ${className}` : 'icon'}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
