// Stylesheet guardrails for the redesign's two structural rules
// (docs/redesign/PHASE-3-SYSTEM.md §3.8). Usage: node scripts/check-styles.mjs
//
// 1. NO UNDEFINED CUSTOM PROPERTY. `--fs-md`, `--muted` and `--ok` were referenced in
//    production CSS and never defined anywhere — the self-check score and the search
//    group headings silently lost their size and colour. Nothing caught it.
//
// 2. NO SELECTOR DEFINED IN TWO STYLESHEETS. components.css and enhance.css both styled
//    .discnav, .lesson-list__item, .continue and .selfcheck__mark, with the later file
//    reversing the earlier one. That split is *why* rule 1 was violated unnoticed: no
//    component had a single place to look.

import { readFileSync } from 'node:fs'

const FILES = ['tokens', 'base', 'layout', 'components', 'fonts'].map((f) => `src/styles/${f}.css`)
// Custom properties set inline from TSX (the joint-seat offsets) are legitimate definitions.
const INLINE_DEFINED = ['--seat-x', '--seat-y']

const sources = FILES.map((f) => [f, readFileSync(f, 'utf8')])
const all = sources.map(([, css]) => css).join('\n')
const problems = []

// ---- 1. custom properties -------------------------------------------------
const defined = new Set([...all.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gm)].map((m) => m[1]))
for (const p of INLINE_DEFINED) defined.add(p)
const used = new Set([...all.matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1]))
const missing = [...used].filter((u) => !defined.has(u))
if (missing.length) problems.push(`undefined custom properties: ${missing.join(', ')}`)

// ---- 2. one selector, one file --------------------------------------------
const owners = new Map()
for (const [file, css] of sources) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '')
  for (const m of stripped.matchAll(/(^|\})([^{}@]+)\{/g)) {
    for (let sel of m[2].split(',')) {
      sel = sel.trim().replace(/\s+/g, ' ')
      if (!sel || sel.startsWith('@') || sel === 'from' || sel === 'to' || /^\d/.test(sel)) continue
      if (!owners.has(sel)) owners.set(sel, new Set())
      owners.get(sel).add(file)
    }
  }
}
const shared = [...owners].filter(([, files]) => files.size > 1)
if (shared.length) {
  problems.push(
    `selectors defined in more than one stylesheet:\n` +
      shared.map(([sel, files]) => `    ${sel}  →  ${[...files].join(', ')}`).join('\n'),
  )
}

// ---- report ----------------------------------------------------------------
if (problems.length) {
  console.error('✗ style checks failed:\n  - ' + problems.join('\n  - '))
  process.exit(1)
}
console.log(
  `✓ styles ok  [custom properties: ${defined.size} defined / ${used.size} used, 0 undefined; ` +
    `selectors: ${owners.size} unique, none duplicated across files]`,
)
