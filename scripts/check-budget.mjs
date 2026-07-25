// Deterministic initial-JS budget gate (no browser needed). Measures the JS actually
// loaded on the HOME route — the entry script + its modulepreloaded chunks referenced
// in index.html — NOT the lazy per-lesson chunks (which load only when a lesson opens).
// This is the "Initial JS ≤ 150 KB gzip on the home route" acceptance criterion.
import { readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { join } from 'node:path'

const LIMIT = 150 * 1024
const html = readFileSync('dist/index.html', 'utf8')

const refs = new Set()
for (const m of html.matchAll(/(?:src|href)="[^"]*\/assets\/([^"]+\.js)"/g)) refs.add(m[1])

let total = 0
for (const f of refs) total += gzipSync(readFileSync(join('dist/assets', f))).length

const kb = (total / 1024).toFixed(1)
if (total > LIMIT) {
  console.error(`✗ initial JS ${kb} KB gzip on home route > 150 KB (${refs.size} chunks).`)
  process.exit(1)
}
console.log(`✓ initial JS ${kb} KB gzip on home route (≤ 150 KB); ${refs.size} chunks. Lazy lesson chunks excluded.`)
