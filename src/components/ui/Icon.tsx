// Small, consistent stroke icons (currentColor) for the tab bar and UI. Concrete,
// simple shapes — always paired with a text label (docs/DESIGN.md §Iconography).
export type IconName = 'learn' | 'tools' | 'build' | 'fix' | 'me'

const PATHS: Record<IconName, string> = {
  // path/spine
  learn: 'M4 5h10a4 4 0 0 1 4 4v10M4 5v10a4 4 0 0 0 4 4h10M4 5l4 4M18 19l-4-4',
  // plane (hand tool) — a simple body + blade
  tools: 'M3 14h18l-2 4H5l-2-4Zm2 0 2-5h10l2 5M9 9V6',
  // stacked boards / project
  build: 'M3 8l9-4 9 4-9 4-9-4Zm0 5l9 4 9-4M3 13v3l9 4 9-4v-3',
  // bandage / fix
  fix: 'M8 8l8 8M6.5 6.5a3.5 3.5 0 0 1 5 0l6 6a3.5 3.5 0 0 1-5 5l-6-6a3.5 3.5 0 0 1 0-5Z',
  // gear / me
  me: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-3-1.6.6.6 1.6-1.4 1.4-1.6-.6-.6 1.6h-2l-.6-1.6-1.6.6-1.4-1.4.6-1.6L4 12l1.6-.6-.6-1.6L6.4 8.4 8 9l.6-1.6h2L11.2 9l1.6-.6 1.4 1.4-.6 1.6L19 12Z',
}

export function Icon({ name, size = 26 }: { name: IconName; size?: number }) {
  return (
    <svg
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
