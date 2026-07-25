import type { ReactNode } from 'react'

type Tone = 'reward' | 'progress' | 'neutral' | 'danger'

// Colour is never the ONLY signal (WCAG 1.4.1) — callers pass an icon/label too.
export function Pill({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`pill pill--${tone}`}>{children}</span>
}
