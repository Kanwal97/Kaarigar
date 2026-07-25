# Deferred task — lazy-load lesson content (before authoring L3–L10)

**Why:** content is currently eager-imported into the JS bundle (`import.meta.glob(..., { eager: true })` in `src/content/loaders.ts`). Each lesson's bilingual body ships in the initial chunk. With L0–L2 authored, JS is ~106 KB gzip — under the 150 KB budget, but authoring L3–L10 (dozens of lessons) **will breach it**. Do this refactor **before** adding those levels. The CI `check:budget` gate will fail the day it breaches, which is the backstop.

**Why it's deferred:** it touches ~8 files and its hydration + client-navigation behaviour genuinely needs a browser to verify. It was not done blind against a working build.

## Target architecture

Split the content layer so the **home/initial route ships no lesson bodies**:

1. **Generated metadata index** — `scripts/build-content-index.mjs` (run as a `prebuild` step) reads `content/lessons/*.json` and writes `content/_lessons-index.generated.json`: `[{ id, level, order, difficulty, estMinutes, tags, titles: {en,hi,pa,bgc} }]`. Small and bounded.
2. **`src/content/refdata.ts`** (eager, small): imports the metadata index + `levels`, `tools`, `woods`, `glossary`, `hazards`. Exports `getLevel`, `levelLessonMeta(levelId)`, `getLessonMeta`, `getTool/Hazard/Wood`, `pick`. Imported by `routes.tsx`, `Home`, `JoinerySpine`, `Level`, and the discovery routes — **none of which then pull lesson bodies**.
3. **`src/content/loaders.ts`** (lazy bodies): `import.meta.glob('../../content/lessons/*.json')` **without** `eager`; export `loadLessonBody(id): Promise<Lesson>` plus the pure helpers `selectVideos` / `resolveLessonText`. Imported only by the `Lesson` route's loader.
4. **Lesson route uses a React Router `loader`** — `vite-react-ssg` already prerenders loader data (see the `static-loader-data/*.json` files it emits) into the HTML **and** a per-route JSON, so the body stays out of the main chunk while remaining readable in prerendered HTML:
   ```ts
   { path: `${lang}/lesson/${id}`, element: <Lesson lang={lang} lessonId={id} />, loader: () => loadLessonBody(id) }
   ```
   `Lesson.tsx` reads the body via `useLoaderData()` (keeps `lang` as a prop). The dynamic import becomes a per-lesson chunk, fetched only when that lesson is opened.
5. **Store the continue-title in progress** — add `title` to `lastLesson` (set in `recordVisit`/`markComplete`) so `Home` shows "continue where you left off" without importing any lesson body.

## Verify

- `npm run build` succeeds; `dist/**/lesson/*.html` still contains the lesson body text (grep a Hindi title/step — prerender intact).
- `npm run check:budget` passes and the **home** entry chunk no longer grows when lessons are added (measure `dist/assets/*.js`; lesson bodies should be in separate chunks).
- Manually: open a lesson, refresh (SSR body present), navigate client-side to another lesson (its chunk loads), go offline (precached bodies still render).
