# PLAN — "Kaarigar" Multilingual Woodworking Training Platform

**Phase 2 deliverable.** Prepared 2026-07-24. Builds on [RESEARCH.md](RESEARCH.md) and your Phase-1 answers (repo `Kaarigar`, no custom domain; React; best-for-Pages routing; author all languages as far as legitimately possible; Haryanvi in; audio if possible). Companion docs: [DESIGN.md](DESIGN.md), [WIREFRAMES.md](WIREFRAMES.md), and JSON Schemas in [`content/schema/`](../content/schema/).

**This is a plan, not code.** No application code is written until you approve Phase 2.

---

## 2.1 Stack decision

**Chosen stack: Vite + React 18 + TypeScript (strict) + `vite-react-ssg` static prerendering.** Styling is plain CSS with design tokens (custom properties); no CSS-in-JS runtime, no component library.

### Why this stack (justified against the constraints)

| Constraint | How the stack satisfies it |
|---|---|
| Fully static, GitHub Pages, no backend | `vite-react-ssg` prerenders **every route to a real `.html` file** at build time. The output is flat files served from a CDN. No server, no runtime secrets. |
| React (your ask) | React 18 + hydration. `vite-react-ssg` is React-native SSG (react-router based). |
| Content readable as prerendered HTML (constraint 2.1) | Each lesson/level/glossary page is prerendered — the text is in the HTML **before** JS runs. JS only hydrates interactive bits (video facade, self-check, language switch, progress). |
| Initial JS ≤ 150 KB gzip / ≤ 300 KB transfer | React+ReactDOM ≈ 45 KB gzip; react-router ≈ 10 KB; our code + tiny i18n runtime target < 40 KB. Route-level code splitting; content JSON lazy-loaded per module. **Budget escape hatch:** if we breach 150 KB, alias `react`/`react-dom` → `preact/compat` (drops ~35 KB gzip) — kept as a documented fallback, not the default. |
| Mobile-first, low-end Android | Small bundle, prerendered HTML paints without JS, facade video, lazy everything. |
| Deep-links / refresh / back-button all work | Because each route is a real file, `/(base)/hi/level/l05/` is a genuine `index.html` — GitHub Pages serves it directly. **No hash routing, no redirect trick needed** for prerendered routes. |

### GitHub Pages deep-linking & base path — the concrete solution

- **Prerendered routes are real files.** `vite-react-ssg` writes `dist/hi/level/l05/index.html` etc. GitHub Pages serves these on hard load/refresh with zero server rewrites. This is *why* SSG beats a plain SPA here — we sidestep the SPA 404 problem for every known route.
- **`404.html` safety net.** For any path not prerendered (typo, future dynamic id), ship a `404.html` that hydrates the React app and client-routes to the right view or a proper "not found" page. So even unknown deep-links degrade gracefully instead of showing GitHub's 404.
- **Base path.** Repo is `Kaarigar`, so the site is `https://<user>.github.io/Kaarigar/`. Set Vite `base: '/Kaarigar/'`, React Router `basename={import.meta.env.BASE_URL}`, and use `<base href>`/relative asset URLs. All internal links go through a `href()` helper that prefixes `BASE_URL` so nothing hardcodes `/Kaarigar/`.
- **`.nojekyll`** at the publish root (belt-and-suspenders; our bundler may emit `_`-prefixed assets).
- No custom domain → no `CNAME` file. HTTPS is enforced via GitHub Pages default `github.io`.

### Rendering model

- **Content pages (level, lesson, glossary, tool/wood detail): prerendered per locale.** Readable with JS disabled.
- **Interactive islands hydrate on load:** language switcher, video facade (click-to-load), self-check quiz, progress ring, data-saver toggle, text-size/theme controls, search.
- **Progress & preferences:** client-only (`localStorage`), read after hydration; never blocks first paint.

---

## 2.2 Information architecture

### Learning path spine (refined from RESEARCH §1.3 critique)

```
L0  Safety & workshop setup            (incl. Indian machine-safety: guardless belt machines, patti saws, spray fumes)
L1  Wood & sheet goods                 (+ blockboard; + seasoning / moisture / termite-borer treatment)
L2  Measuring & marking                (+ face-vs-developed-area estimating literacy — the #1 dispute)
L3  Hand tools — sharpen, tune, use
L4  Sawing, planing, chiselling
L4.5 Sheet-goods work                  ★ NEW: board cutting, edge-banding, laminate pasting (pulled EARLY — core paid work)
L5  Joinery — butt → lap → dado → M&T  (dovetail present but flagged "heritage/premium", NOT a progress gate)
                                        (+ minifix/cam-lock, dowel, biscuit — what shops actually use)
L6  Adhesives, fasteners & HARDWARE    ★ STRENGTHENED: hinges, channels, locks, minifix; Hettich/Ebco/Godrej SKUs
L7  Power tools & machines
L8  Sanding & finishing                (French polish vs melamine vs PU vs Duco; spray-safety sub-unit)
L9  Real projects                      stool → chowki → cot/palang → wardrobe → laminated ply wall-unit → modular kitchen
L10 The trade                          estimating, quoting (face vs developed), clients, GST/UPI, mandi sourcing, tool investment order
```

**Progress is NOT strictly linear-gated.** Prerequisites are *advisory* (shown as "recommended before this"), never hard locks — a working *mistri* must be able to jump straight to L6 Hardware. Completion is tracked per lesson; the joinery-diagram progress visual (DESIGN §Signature) fills in as levels complete, but nothing is forbidden.

### Non-linear entry points (because a working carpenter won't start at L0)

- **Tool Finder** — image-led, searchable by workshop name (*randa*, *aari*…), maps local ↔ hi ↔ pa ↔ bgc ↔ en, links to lessons that use each tool.
- **Wood Finder** — "which wood/board for this job?" browse by use, price tier, water-resistance; sheesham/teak/mango/ply/MDF/HDHMR/WPC.
- **Glossary** — multilingual, searchable, image-led; the shared backbone Tool/Wood Finders read from.
- **Project Library** — browse by "I want to build X" (stool, wardrobe, kitchen); each project links the lessons/skills it needs.
- **Fix It** — common mistakes and how to recover (tear-out, blown-out mortise, laminate bubble, out-of-square carcass on a crooked wall).

### Navigation

**Mobile — bottom tab bar, 5 tabs max, thumb-reachable (each tab justified):**

| Tab | Icon+label | Why it earns a slot |
|---|---|---|
| **Learn** (home) | path/spine | The core: continue-where-you-left-off + the level spine. Default landing. |
| **Tools** | plane | Highest-frequency non-linear entry for working carpenters; Tool Finder + Glossary live here. |
| **Build** | project | Project Library — "I want to build X" is how tradespeople actually think. |
| **Fix It** | bandage | Distinct intent from Learn (problem-solving now, not study). Cheap to include, high value. |
| **Me** | gear/ring | Progress, language, text-size, theme, data-saver, export/import, offline status. |

*Wood Finder is reached from Tools and from Wood references in lessons (it doesn't need its own tab — folding it under Tools keeps us at 5).* 

**Desktop/tablet — left sidebar** with the same five sections expanded, plus a persistent search box and the language switcher in the header. Not a stretched phone layout: two-column lesson view (content + sticky tool/material/safety rail), wider project cards, keyboard shortcuts.

---

## 2.3 Content model

Content is **flat JSON files in the repo**, editable by a non-developer via github.com. Machine-readable **JSON Schemas** live in [`content/schema/`](../content/schema/) and are validated in CI (see §2.7). Files:

```
content/
  lessons/     l00-*.json … l10-*.json     (one file per lesson)
  levels/      l00.json … l10.json          (level metadata + ordered lesson ids)
  tools/       tools.json                    (array of tool entries)
  woods/       woods.json                    (solid timbers + sheet goods)
  glossary/    glossary.json                 (terms → multilingual + image + audio)
  projects/    projects.json                 (project library entries)
  hazards/     hazards.json                   (hazard id → description + source citation)
  i18n/        {en,hi,pa,bgc}/ui.json         (UI chrome strings, per locale)
  _needs-sourcing.md                          (every TODO video / untranslated / uncited item)
  schema/      *.schema.json                  (JSON Schema, draft 2020-12)
```

**Schemas provided** (full files in `content/schema/`): `lesson.schema.json`, `level.schema.json`, `tools.schema.json`, `woods.schema.json`, `glossary.schema.json`, `projects.schema.json`, `hazards.schema.json`. Improvements over the brief's starter shape:

- **`translationStatus`** per lesson per language: `authored | draft-needs-review | machine-draft | missing`. Drives the honest in-UI fallback badge. Enforces the "no silent English-as-Punjabi" rule.
- **`i18n` is keyed by locale** with a shared `steps[]`/`selfCheck[]` shape; missing locales fall back visibly (badge), never silently.
- **`videos[]`** carries `videoId` (`"TODO"` until CI-verified), `lang`, `role`, `credit`, `startSec`/`endSec`, `verifiedAt`, and CI-written `embeddable`.
- **`audio`** slot per locale: `{ "hi": "audio/hi/l05.mp3", ... }` — lazy, optional; player exists even when empty.
- **`reviewStatus`**: `needs-expert-review | expert-reviewed` — safety-bearing lessons stay `needs-expert-review` until a human signs off; every `hazards` entry requires a `source` citation.
- **`hazards`, `tools`, `materials`** are id references validated against the respective files in CI (referential integrity).

---

## 2.4 Language plan

- **Approach: per-locale static builds** with URL prefixes `/en/ /hi/ /pa/ /bgc/` (RESEARCH §1.4). Translations authored as per-locale JSON, compiled into each prerendered build. Every page carries self-referencing `hreflang` + siblings + `x-default`. `bgc` uses the `/bgc/` prefix; because Google's support for the ISO-639-3 `hreflang="bgc"` is uncertain, we set `x-default` to the Hindi (or English) version and monitor Search Console.
- **Runtime switch stays instant:** the language switcher navigates to the sibling locale URL of the current page (prerendered), preserving position; choice persists in `localStorage` and is reflected in the URL (the URL is the source of truth, storage is the "return here" hint).
- **Translation quality process (enforces the hard rule):**
  - **English + Hindi = source pair** — authored by us for real.
  - **Punjabi (`pa`) + Haryanvi (`bgc`) are NOT machine-translated and shipped.** They carry `translationStatus`; until a human fills them, the UI shows the honest badge **"ਪੰਜਾਬੀ ਜਲਦੀ ਆ ਰਹੀ ਹੈ — ਹਿੰਦੀ ਦਿਖਾ ਰਹੇ ਹਾਂ" / "Punjabi coming — showing Hindi."** Haryanvi has no standardised orthography and near-zero corpus, so it is treated as **content to be produced with a human**, not curated or auto-translated.
  - Optional, opt-in: I can generate **`machine-draft`**-flagged pa/bgc for a human to correct — visibly badged as machine draft, never as authored. Off by default; your call.
- **Audio-first affordance:** per-lesson `audio/{lang}/{lessonId}.mp3`, small, lazy-loaded, with a player in the lesson header ("Sunno / ਸੁਣੋ / Listen"). Ships wired with a placeholder in v1; real narration is a sourcing task (highest-leverage feature for low-literacy users — RESEARCH §1.1/§1.5).
- **Fonts:** subset Noto/Baloo/Mukta per DESIGN §Type; `font-display: swap`; **load Gurmukhi only when `pa` is active**, Devanagari for `hi`/`bgc`, Latin for `en`. `line-height: 1.6` for Indic (DESIGN).
- **Layout survives taller scripts:** no fixed-height buttons/cards, min-heights + padding, generous line-height, and we test the **longest string in every language** for each component (a Haryanvi/Punjabi label can be markedly longer/taller than English).

---

## 2.5 UX decisions for this audience (concrete)

- **Touch targets ≥ 48 px; primary "play / next / listen" controls 56–64 px** in the bottom third / thumb zone; ≥ 8 px spacing (RESEARCH §1.5).
- **Data-saver mode**, auto-on when `navigator.connection.saveData` is true or effective type ≤ 3G: video shows a **facade with an explicit size warning** ("Video chalao · ~18 MB" — size estimated, shown before any byte loads), images served at low resolution, no autoplay. User can override per-video and globally in **Me**.
- **Text-size control (3 steps)** that resizes actual content (rem-based), plus **dark mode** (toggle + `prefers-color-scheme`).
- **Progress:** "Continue where you left off" is the **first thing on Home**. Streak + level-completion ring. **No dark patterns** — no fake urgency, no shame mechanics; a broken streak is stated neutrally, never guilt-tripped.
- **Offline badge tells the truth:** a persistent indicator that lesson text/glossary/checklists/(self-hosted audio) are available offline and **YouTube video is not** ("Video ke liye internet chahiye").
- **Every lesson opens with "what you'll be able to do at the end"** (`objectives`), not theory.
- **Empty/error states are instructions, not apologies** ("No saved lessons yet — tap Learn to start L0 Safety." / "Video needs internet — here are the written steps.").

---

## 2.6 Design direction

Full token system, palette, type, and the signature element are specified in **[DESIGN.md](DESIGN.md)**. Summary: a palette derived from the workshop's own materials (sheesham, planed pine, brass, sawdust, blueprint indigo, extension-cable orange) — explicitly *not* the banned cream+terracotta / near-black+acid-green / broadsheet defaults; a display/body type pairing (**Baloo 2 / Baloo Paaji 2** for display, **Mukta / Mukta Mahee** for body) chosen specifically because they carry **real Devanagari and Gurmukhi coverage** alongside Latin; and a signature **joinery-progression** visual where completed levels lock joints into an assembling spine.

---

## 2.7 Engineering plan

### Repo layout

```
Kaarigar/
  .github/workflows/       ci.yml, deploy.yml
  content/                 (see §2.3)
  public/                  .nojekyll, 404.html template, icons, fonts (subset woff2), og image
  scripts/                 verify-videos.mjs, i18n-report.mjs, validate-content.mjs, subset-fonts.mjs
  src/
    routes/                Home, Level, Lesson, Glossary, ToolFinder, WoodFinder, Projects, FixIt, Me, NotFound
    components/            VideoFacade, SelfCheck, ProgressRing, JoinerySpine, LangSwitcher, AudioPlayer, DataSaverToggle, TextSizeControl…
    content/               loaders (typed), schema TS types (generated from JSON Schema)
    i18n/                  runtime helper, locale route utils, hreflang
    lib/                   storage (localStorage + export/import), href(), connection, a11y helpers
    styles/                tokens.css, base.css, per-component css modules
  docs/                    RESEARCH.md, PLAN.md, DESIGN.md, WIREFRAMES.md
  README.md  CONTRIBUTING.md
```

**Conventions:** TypeScript strict, **no `any` in content-handling code**; ESLint + Prettier; content JSON validated by AJV against the schemas; commit hooks run lint + schema validation.

### CI (GitHub Actions)

| Job | What it does | Fails build when |
|---|---|---|
| **build-deploy** | Vite build → `vite-react-ssg` prerender → `actions/upload-pages-artifact` → `actions/deploy-pages` | build/prerender error |
| **verify-videos** | For every `videoId ≠ "TODO"`, hit the keyless **oEmbed** endpoint; write `embeddable`+`verifiedAt` back; open/refresh a tracking **issue** listing dead/non-embeddable IDs | any published lesson has a dead, non-embeddable, or still-`TODO` video |
| **i18n-report** | Per-language coverage %: authored vs draft vs missing per lesson; posts a summary | (report only; optional threshold gate later) |
| **schema-validate** | AJV validate all `content/**` against `content/schema/**`; check referential integrity (tool/material/hazard/prereq ids resolve) | any invalid JSON / broken reference |
| **lighthouse-ci** | Lighthouse CI, mobile preset, throttled 4G, budgets enforced (Perf ≥ 90, A11y ≥ 95, BP ≥ 95; JS ≤ 150 KB gzip) | any budget breached |
| **link-check** | Internal links + external citation URLs reachable | broken internal link |

Video verification uses **oEmbed only** by default (no key, no secret). The YouTube Data API path is documented but optional (repo secret, build-time only) if we later need authoritative `status.embeddable`.

### Testing plan

- **Unit-tested:** content loaders & schema types, `storage` export/import round-trip + versioning, `href()`/base-path, locale/hreflang utils, data-saver connection logic, self-check scoring.
- **Component-tested:** VideoFacade (click-to-load, size warning, error 101/150 fallback), LangSwitcher (sibling-URL + fallback badge), Progress/JoinerySpine.
- **Manually tested on a real low-end Android** (≤ ₹10k-class, Chrome, throttled): one-handed reach, 320 px layout, Indic rendering at all 3 text sizes, offline behaviour, sunlight contrast sanity.
- **Accessibility:** axe in CI + manual TalkBack pass on L0.

### Milestones (with acceptance criteria)

| # | Milestone | Done when… |
|---|---|---|
| **M1** | **Skeleton + deploy** | Repo + CI live; blank app deployed to `…/Kaarigar/`; a deep link + refresh + back-button all work; `404.html` fallback works; base path correct. |
| **M2** | **Design system** | Tokens, both type families rendering **all four scripts** correctly (conjuncts, matras, no clipping) at 3 text sizes; dark mode; core components at 320 px; no CLS on font load. |
| **M3** | **Content engine** | Schema validation green in CI; typed loaders; **L0 Safety fully authored in en+hi** (pa/bgc slots + honest fallback badge); every L0 hazard cites a source; `reviewStatus: needs-expert-review`. |
| **M4** | **Learning path UI** | Home (continue + spine), Level, Lesson views; progress persists across refresh; **export/import** round-trips to another device. |
| **M5** | **Video layer** | Facade embeds + data-saver + size warning; per-lesson language-appropriate video selection; error 101/150 → graceful fallback; **verify-videos CI job green, zero `TODO` in published lessons**. |
| **M6** | **Discovery** | Glossary, Tool Finder, Wood Finder, client-side search (small prebuilt index); all image+label+audio. |
| **M7** | **PWA + offline** | Service worker precaches shell + per-locale content + fonts + self-hosted audio; install prompt; **honest offline states** (video = online-only). |
| **M8** | **Content scale-out** | Remaining levels authored (en+hi); `_needs-sourcing.md` worked down; pa/bgc filled as human translations arrive (badged until then). |
| **M9** | **Polish** | Accessibility audit passed; Lighthouse budgets green on throttled 4G; real-device test signed off; **README + CONTRIBUTING** let a non-dev add a lesson and translate a language. |

Each milestone ends with a report: what's done, what's stubbed, what needs your input.

---

## Assumptions stated

- **A1** Video is **online-only**; offline covers text/glossary/checklists/images/self-hosted audio. (RESEARCH §1.4 — not negotiable technically or per YouTube ToS.)
- **A2** **Hindi is the pragmatic fallback language** behind the others (Devanagari default for Haryana/NCR; most Punjab readers also read Devanagari). `x-default` → hi.
- **A3** `pa`/`bgc` authentic content depends on a **human translator/narrator** we don't yet have; the platform ships fully functional with honest fallbacks and treats their content as a sourcing workstream.
- **A4** No user-identifying analytics, no ads, no accounts, no backend — ever (brief non-goals).
- **A5** All YouTube `videoId`s begin as `"TODO"`; none ship until oEmbed-verified in CI.

## Open questions for you (before Phase 3)

1. **Machine-draft pa/bgc?** Do you want me to generate clearly-badged `machine-draft` Punjabi/Haryanvi as scaffolding for a future human review, or keep those slots empty with the fallback badge until a human authors them? (Default: empty + badge.)
2. **Preact fallback** — OK to alias to `preact/compat` **if and only if** the 150 KB JS budget is breached? (Default: yes, as a last resort; React otherwise.)
3. **L0 first content** — confirm L0 **Safety & workshop setup** is the right reference level to author end-to-end in M3 (the brief suggests it; it's also the one most needing expert review). 
4. **Video sourcing** — for L0, do you want me to add precise search queries to `_needs-sourcing.md` for *you* to run and paste back verified IDs, or attempt oEmbed-checked candidate IDs myself for your approval? (Default: I add search queries; you supply IDs — safest against fabrication.)

---

*Deliverables for Phase 2: this file, [DESIGN.md](DESIGN.md), [WIREFRAMES.md](WIREFRAMES.md), and [`content/schema/*.json`](../content/schema/). Per protocol I **stop here and await your approval** before writing any application code (Phase 3 / M1).*
