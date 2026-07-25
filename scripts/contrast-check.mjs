// WCAG 2.x contrast-ratio checker for the design tokens.
// Usage: node scripts/contrast-check.mjs
// Verifies every foreground/background pairing the palette relies on, and prints
// the ratio + which WCAG thresholds it clears (AA 4.5 / AA-large 3.0 / UI 3.0 / AAA 7.0).
// Reused by the design system (docs/DESIGN.md) and, later, the M9 accessibility audit.

function srgbToLinear(c) {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

function relLuminance(hex) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b)
}

export function contrast(fg, bg) {
  const l1 = relLuminance(fg)
  const l2 = relLuminance(bg)
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}

function grade(ratio, { large = false, ui = false } = {}) {
  const badges = []
  if (ratio >= 7) badges.push('AAA')
  if (ratio >= 4.5) badges.push('AA')
  if ((large || ui) && ratio >= 3) badges.push(large ? 'AA-large' : 'AA-ui')
  return badges.length ? badges.join(' ') : 'FAIL'
}

// pairs: [foreground, background, label, opts]
const pairs = process.env.PAIRS
  ? JSON.parse(process.env.PAIRS)
  : [
      // filled in during the "implement" step with the chosen tokens
    ]

let anyFail = false
for (const [fg, bg, label, opts = {}] of pairs) {
  const r = contrast(fg, bg)
  const g = grade(r, opts)
  if (g === 'FAIL') anyFail = true
  console.log(`${r.toFixed(2).padStart(6)}:1  ${g.padEnd(16)}  ${label}  (${fg} on ${bg})`)
}
if (pairs.length) process.exit(anyFail ? 1 : 0)
