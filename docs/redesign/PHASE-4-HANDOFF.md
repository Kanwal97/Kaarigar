# Phase 4 — Prototyping, Testing & Handoff

The prototype **is** the product: this is a static site with no runtime styling layer, so
there was never a reason to build a throwaway mock. Everything specified in Phases 2–3 is
in the repo, prerendered, and served.

This document reports what was tested, what passed, **what was not tested**, and what the
next person should pick up.

---

## 4.1 Live verification

Built and served for real (`npm run build && npm run preview`):

| Route | Result |
|---|---|
| `/` (language splash) | 200 |
| `/hi` (Home) | 200 |
| `/hi/level/l05` | 200 |
| `/hi/lesson/l05-mortise-tenon` | 200 |
| `/pa/search` | 200 |
| `/styleguide` | 200 |

Structural checks against the **served** HTML:

- Lesson renders all three regions — `page__head`, `rail`, `page__body`
- Rail contains 6 tool/material chips, a 4-dot position stepper, and a Hindi label (`क्या चाहिए`)
- Two hazard cards, each with a warning icon; `<h2>! Safety</h2>` is gone
- Home renders 11 joint marks with per-joint seat offsets (`--seat-x:-7px`, `4px`, …)
- Spine statuses are localised (`शुरू करो →`, not `start →`)
- Level page renders `level__mark` and `chip--hazard`
- Top bar renders the search affordance on every locale

---

## 4.2 Success criteria from Phase 1 §1.5

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | Spine renders the joint each level teaches; completion seats it | **PASS** | `spine.joint` consumed by `JointMark`; 11 marks in prerendered HTML; `.spine__node--completed` resets the pin transform |
| 2 | Desktop uses its width; prose still capped at 66 ch | **PASS** | Three tiers in `layout.css`; `--measure` moved off `.shell__main` onto prose |
| 3 | Every component defined in exactly one place | **PASS** | Script check: *no selector is defined in more than one stylesheet* |
| 4 | No undefined custom property referenced | **PASS** | 58 defined, 58 used, 0 missing |
| 5 | One drawn icon set; no emoji as iconography | **PASS** | `emoji.ts` deleted; 43 icons in `Icon.tsx`; two decorative, labelled emoji remain by decision (§3.5) |
| 6 | Search reachable in ≤1 tap from any screen | **PASS** | Permanent top-bar affordance |
| 7 | No hard-coded English in user-visible or assistive text | **PASS** | Zero `aria-label="…"` literals remain; 20 keys added to `ui.ts` in all four locales. The one literal left is the `/` splash, which is bilingual **by design** — there is no locale yet |
| 8 | No layout shift between prerendered and hydrated Home | **PASS (by construction)** | Continue/start render the same box; progress + streak always render, filling values on hydration. *Not measured with CLS instrumentation — see §4.4* |
| 9 | Contrast contract intact | **PASS** | Zero colour values changed (`git diff` on `tokens.css` shows no hex changes) |
| 10 | Budgets intact | **PASS** | typecheck clean · 23/23 tests · content valid (27 lessons, 11 levels, 23 tools, 15 woods, 8 hazards, 8 glossary) · build OK · **initial JS 123.6 KB gzip ≤ 150 KB** · CSS 8.5 KB gzip |

### The checks, as commands

```bash
npm run typecheck          # clean
npm test                   # 23 passed
npm run validate:content    # ✓ content valid
npm run build              # prerenders every route, regenerates the service worker
npm run check:budget       # ✓ 123.6 KB gzip ≤ 150 KB
```

Plus two checks written for this redesign, worth keeping in CI:

```bash
# 1. no undefined custom properties  →  the exact class of bug that shipped as Finding D
# 2. no selector defined in two stylesheets  →  the structure that caused it
```

Both are a few lines of Node against `src/styles/*.css`; adding them to
[`ci.yml`](../../.github/workflows/ci.yml) is the single highest-value follow-up.

---

## 4.3 What changed, by file

**New**
`src/styles/layout.css` · `src/components/ui/JointMark.tsx` · `src/content/icons.ts` ·
`docs/redesign/PHASE-1…4`

**Deleted**
`src/styles/enhance.css` (merged) · `src/content/emoji.ts` (replaced) ·
`src/routes/LevelStub.tsx`, `src/routes/ComingSoon.tsx` (M1 scaffolding, unreferenced by
`routes.tsx` since M4)

**Rewritten**
`components.css`, `base.css`, `Home.tsx`, `Level.tsx`, `Lesson.tsx`, `Search.tsx`,
`Layout.tsx`, `JoinerySpine.tsx`, `Icon.tsx`

**Touched**
`tokens.css`, `ui.ts` (+20 keys × 4 locales), `refdata.ts`, `build-content-index.mjs`,
`ToolFinder`, `WoodFinder`, `Glossary`, `Projects`, `ProjectDetail`, `FixIt`, `SelfCheck`,
`SearchBox`, `AudioPlayer`, `OfflineBadge`, `FirstRunGuide`, `BottomTabBar`,
`DiscoveryNav`, `ThemeToggle`, `NotFound`, `Styleguide`

---

## 4.4 What was NOT tested — read this before shipping

Stated plainly, because a redesign that claims more verification than it did is worse than
one that admits the gap.

1. **No visual verification.** No browser driver is installed in this environment and
   adding one meant a ~300 MB unrequested dependency. Every check above is structural —
   served HTML, computed sizes, token references. **Nobody has looked at a rendered
   pixel.** The joint marks in particular are hand-authored path data: they are
   geometrically sound and will render, but whether a *dado* reads as a dado at 52 px is a
   judgment only an eye can make. **Open `/styleguide` first** — it now has a gallery of
   all 43 icons and all 8 joints in both unseated and seated states, built for exactly
   this review.
2. **No real-device testing.** The target is a cheap, three-year-old Android in sunlight.
   Untested there.
3. **No screen-reader pass.** The a11y defects fixed here (`aria-pressed`, landmark
   names, spoken quiz results) were found by reading code. TalkBack in Hindi is the test
   that matters and it has not been run.
4. **CLS not instrumented.** Criterion 8 passes by construction, not by measurement. Run
   Lighthouse against `/hi` with a populated `localStorage` to confirm.
5. **No user testing.** Phase 1 §1.6 lists three open questions — whether the joints read
   without labels, whether the streak motivates, whether the display controls belong in
   the bar. All still open. All are cheap to answer with five carpenters and a phone.
6. **`scripts/contrast-check.mjs` produced no output** when run directly on Windows
   (exit 0, silent — likely a `import.meta.url` main-module guard that doesn't match the
   Windows path form). The contrast contract is nevertheless intact because **no colour
   value changed** — verified by `git diff`. The script itself is worth fixing.

---

## 4.5 Recommended next steps, in order

1. **Look at `/styleguide`.** Judge the 8 joint marks and 43 icons. Any that don't read,
   redraw — each is one `d` string in one file.
2. **Add the two CSS checks to CI** (§4.2). They prevent the exact regressions this
   redesign existed to fix.
3. **Fix `contrast-check.mjs`** so it prints on Windows and wire it into CI.
4. **Real-device + TalkBack pass** on a low-end Android, in daylight.
5. **Five-user test** against the three open questions in Phase 1 §1.6.
6. **Update the README.** It still says "L0, L1, L2 authored" — the repo has 27 lessons
   across all eleven levels in four languages. The project undersells itself in its own
   first paragraph.
7. **Real PNG app icons (192/512)** and font metric-override tuning — both were already on
   the pre-existing roadmap and neither was touched here.

---

## 4.6 Handoff summary

The redesign kept every contract that was working — the verified palette, honest
translation badges, cited safety, the video facade, read-aloud, static prerendering,
per-locale fonts — and fixed the ten findings in [Phase 1 §1.3](PHASE-1-RESEARCH.md).

The single most important change is not the desktop layout or the icon set. It is that
**the Joinery Spine now exists.** For a year it was a paragraph in a design document and
an unused field in a data file. A learner opening Home today sees the joints they are
going to learn, and watches them close as they do.

---

*Phase 1 → [Research & Empathy](PHASE-1-RESEARCH.md) · Phase 2 → [Ideation & Wireframing](PHASE-2-IDEATION.md) · Phase 3 → [Visual Design & Component System](PHASE-3-SYSTEM.md)*
