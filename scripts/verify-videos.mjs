// Verify every published lesson video via YouTube oEmbed (keyless, no API key).
// Fails the build if a lesson has a `TODO` videoId, or an id that is dead / not
// embeddable (oEmbed returns non-200). Runs in CI where the network is available.
// This is the automated version of the manual checks done in M4/M5.
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DIR = 'content/lessons'
const files = readdirSync(DIR).filter((f) => f.endsWith('.json'))

const todos = []
const checks = []
for (const f of files) {
  const lesson = JSON.parse(readFileSync(join(DIR, f), 'utf8'))
  for (const v of lesson.videos ?? []) {
    if (v.videoId === 'TODO') todos.push(`${lesson.id} still has a TODO video (lang ${v.lang})`)
    else checks.push({ lessonId: lesson.id, videoId: v.videoId })
  }
}

const failures = []
for (const { lessonId, videoId } of checks) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
  try {
    const res = await fetch(url)
    if (res.status !== 200) {
      failures.push(`${lessonId}: ${videoId} → oEmbed HTTP ${res.status} (dead or embedding disabled)`)
    }
  } catch (err) {
    failures.push(`${lessonId}: ${videoId} → fetch error: ${err.message}`)
  }
}

const problems = [...todos, ...failures]
if (problems.length) {
  console.error(`✗ video verification FAILED (${problems.length})`)
  for (const p of problems) console.error('  - ' + p)
  process.exit(1)
}
console.log(`✓ ${checks.length} videos verified embeddable; 0 TODO in published lessons`)
