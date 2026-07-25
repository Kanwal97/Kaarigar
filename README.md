# Kaarigar — कारीगर · ਕਾਰੀਗਰ

A **free, static, mobile-first, multilingual woodworking training platform** for carpenters and hobbyists in North India — **Hindi, English, Punjabi, and Haryanvi**. Hosted on GitHub Pages. No backend, no accounts, no ads, no tracking.

> **Built so far (Phase 3, through Milestone 8):** deploy skeleton, design system with four-script typography, content engine, learning-path UI with progress, video layer, discovery (glossary/tool/wood finders), PWA + offline, and the first authored content (L0 Safety, L1 Wood & sheet goods, L2 Measuring & marking). See [the roadmap](#roadmap) for what remains.

Planning docs: [RESEARCH](docs/RESEARCH.md) · [PLAN](docs/PLAN.md) · [DESIGN](docs/DESIGN.md) · [WIREFRAMES](docs/WIREFRAMES.md). **Non-developers:** see [CONTRIBUTING.md](CONTRIBUTING.md) to add a lesson or translate.

---

## What it does

- **Sequenced curriculum** (Joinery-Spine home) that a beginner can follow, with non-linear entry points (Tool Finder, Wood Finder, Glossary) for working carpenters who won't start at lesson 1.
- **Four languages, first-class.** Hindi leads (the audience mostly reads Hindi). Untranslated Punjabi/Haryanvi fall back to Hindi with an honest badge — never silently mislabelled.
- **Every lesson**: what you'll be able to do → a click-to-load video → tools/materials → cited safety callouts → numbered steps → practice → self-check.
- **Progress on-device** (no account): streak, completion, "continue where you left off", and **export/import** to move phones.
- **Works offline** — lessons, glossary, and tools are cached; YouTube video is honestly online-only.
- **Data-saver** mode: video never loads until you tap, with a size warning; thumbnails skipped on slow connections.

## Tech & architecture

- **Vite + React 18 + TypeScript (strict)**, prerendered to static HTML with **`vite-react-ssg`** — every route is its own real HTML file, so deep-links/refresh/back all work on GitHub Pages with **no hash routing and no server**, and content is readable before JS runs. Unknown paths fall back to `404.html`.
- **Base path `/Kaarigar/`** (the repo name), because the site is served from `https://<user>.github.io/Kaarigar/`.
- **i18n**: per-locale URL prefixes `/hi/ /en/ /pa/ /bgc/`, all prerendered.
- **Fonts** (self-hosted, no CDN): Baloo 2 / Baloo Paaji 2 (display) + Mukta / Mukta Mahee (body), routed by `unicode-range` so Gurmukhi loads only for `pa`, Devanagari only for `hi`/`bgc`.
- **Content** is flat JSON in [`content/`](content/), validated in CI against [`content/schema/`](content/schema/). Progress lives in `localStorage`.
- **PWA**: Workbox service worker precaches the shell + content + fonts; YouTube is excluded.
- **Design tokens** and the motivational, contrast-verified palette are in [docs/DESIGN.md](docs/DESIGN.md).

## Local development

```bash
npm install
npm run dev              # dev server (http://localhost:5173/Kaarigar/)
npm run build            # prerender to dist/ (+ 404.html, service worker)
npm run preview          # serve the built dist/
npm run typecheck        # TypeScript strict
npm run validate:content # JSON schema + referential integrity
npm run verify:videos    # oEmbed check every published video
```

## Go live on GitHub Pages (one-time)

The repo **must be named `Kaarigar`** (the base path depends on it; change `base` in [vite.config.ts](vite.config.ts) if you rename it).

1. Create a public repo named **`Kaarigar`**.
2. Push, then **Settings → Pages → Source = GitHub Actions**.
3. The [deploy workflow](.github/workflows/deploy.yml) validates content, verifies videos, builds, and publishes on every push to `main`.
4. Live at `https://<you>.github.io/Kaarigar/`.

## CI

- [`ci.yml`](.github/workflows/ci.yml) — content validation, typecheck, build, and an isolated **video-verification** job (oEmbed), plus **Lighthouse CI** with budgets.
- [`deploy.yml`](.github/workflows/deploy.yml) — validate → verify videos → build → deploy.

## Budgets & accessibility

- Initial JS target **≤ 150 KB gzip**; Lighthouse mobile budgets (Perf ≥ 90, A11y ≥ 95, BP ≥ 95) enforced in CI ([lighthouserc.json](lighthouserc.json)).
- WCAG 2.2 AA (aiming AAA on body contrast for sun/dust): 48 px+ tap targets, visible focus, `prefers-reduced-motion` respected, state never shown by colour alone, honest empty/error states.

## Non-goals

No accounts, backend, comments, certificates, payments, AI chat, video hosting, CMS, native app, individual-tracking analytics, or ads. Video is embedded from YouTube (never hosted or downloaded), via privacy-enhanced `youtube-nocookie.com`.

## Roadmap

Done: M1 deploy skeleton · M2 design system · M3 content engine · M4 learning-path UI + progress · M5 video layer · M6 discovery · M7 PWA/offline · M8 content scale-out (L0–L2 authored).

Remaining before launch:
- **Lazy-load lesson content** (route loaders + a generated metadata index) so the initial bundle stays under budget as levels L3–L10 are authored — see [docs/PLAN.md](docs/PLAN.md) §2.1. **Do this before adding more levels.**
- Author **L3–L10** (each needs video sourcing, expert safety review, and human `pa`/`bgc` translation — tracked in [`content/_needs-sourcing.md`](content/_needs-sourcing.md)).
- Real **PNG app icons** (192/512) and font **metric-override** tuning for zero CLS.
- **Real low-end Android** testing and a full accessibility (TalkBack) pass.
