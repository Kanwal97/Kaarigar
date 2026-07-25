// Generate a lightweight lesson metadata index so lists (Level view, spine, routes,
// Home) need no lesson bodies — the bodies are lazy-loaded per lesson. Run as a
// prebuild step. See docs/CONTENT-LAZY-LOADING.md.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = 'content/lessons'
const LOCALES = ['en', 'hi', 'pa', 'bgc']

const index = []
for (const f of readdirSync(DIR).filter((f) => f.endsWith('.json'))) {
  const l = JSON.parse(readFileSync(join(DIR, f), 'utf8'))
  const titles = {}
  for (const loc of LOCALES) if (l.i18n?.[loc]?.title) titles[loc] = l.i18n[loc].title
  index.push({
    id: l.id,
    level: l.level,
    order: l.order,
    difficulty: l.difficulty,
    estMinutes: l.estMinutes,
    tags: l.tags ?? [],
    titles,
  })
}
index.sort((a, b) => a.level - b.level || a.order - b.order)

writeFileSync('content/_lessons-index.generated.json', JSON.stringify(index, null, 2) + '\n')
console.log(`✓ wrote content/_lessons-index.generated.json (${index.length} lessons)`)
