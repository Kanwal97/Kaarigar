// Validate all content JSON against the JSON Schemas, plus referential integrity
// (every tool/material/hazard/prerequisite/lesson id actually resolves).
// Run locally with `npm run validate:content`; enforced in CI (see .github/workflows).
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = 'content'
const SCHEMA_DIR = join(ROOT, 'schema')

const ajv = new Ajv2020({ allErrors: true, strict: false })
addFormats(ajv)

function readJSON(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function compile(schemaFile) {
  return ajv.compile(readJSON(join(SCHEMA_DIR, schemaFile)))
}

const errors = []
function fail(where, detail) {
  errors.push(`${where}: ${detail}`)
}

function validateFile(path, validate) {
  const data = readJSON(path)
  if (!validate(data)) {
    for (const e of validate.errors ?? []) {
      fail(path, `${e.instancePath || '/'} ${e.message}`)
    }
  }
  return data
}

function listJSON(dir) {
  const d = join(ROOT, dir)
  return existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.json')).map((f) => join(d, f)) : []
}

// ---- validate against schemas ----
const lessonValidate = compile('lesson.schema.json')
const levelValidate = compile('level.schema.json')

const lessons = []
for (const p of listJSON('lessons')) lessons.push(validateFile(p, lessonValidate))

const levels = []
for (const p of listJSON('levels')) levels.push(validateFile(p, levelValidate))

function validateSingle(rel, schemaFile) {
  const p = join(ROOT, rel)
  if (!existsSync(p)) return []
  return validateFile(p, compile(schemaFile))
}

const tools = validateSingle('tools/tools.json', 'tools.schema.json')
const woods = validateSingle('woods/woods.json', 'woods.schema.json')
const glossary = validateSingle('glossary/glossary.json', 'glossary.schema.json')
validateSingle('projects/projects.json', 'projects.schema.json')
validateSingle('fixit/fixit.json', 'fixit.schema.json')
const hazards = validateSingle('hazards/hazards.json', 'hazards.schema.json')

// ---- referential integrity ----
const toolIds = new Set(tools.map((t) => t.id))
const woodIds = new Set(woods.map((w) => w.id))
const hazardIds = new Set(hazards.map((h) => h.id))
const glossaryIds = new Set(glossary.map((g) => g.id))
const lessonIds = new Set(lessons.map((l) => l.id))

void glossaryIds // reserved for future cross-refs

for (const l of lessons) {
  for (const t of l.tools ?? []) if (!toolIds.has(t)) fail(l.id, `unknown tool id "${t}"`)
  for (const m of l.materials ?? []) if (!woodIds.has(m)) fail(l.id, `unknown material id "${m}"`)
  for (const h of l.hazards ?? []) if (!hazardIds.has(h)) fail(l.id, `unknown hazard id "${h}"`)
  for (const p of l.prerequisites ?? []) if (!lessonIds.has(p)) fail(l.id, `unknown prerequisite lesson "${p}"`)
}

for (const lv of levels) {
  for (const lid of lv.lessons ?? []) if (!lessonIds.has(lid)) fail(lv.id, `level references missing lesson "${lid}"`)
}

// ---- report ----
const counts = `lessons:${lessons.length} levels:${levels.length} tools:${tools.length} woods:${woods.length} hazards:${hazards.length} glossary:${glossary.length}`
if (errors.length) {
  console.error(`✗ content validation FAILED (${errors.length})  [${counts}]`)
  for (const e of errors) console.error('  - ' + e)
  process.exit(1)
}
console.log(`✓ content valid  [${counts}]`)
