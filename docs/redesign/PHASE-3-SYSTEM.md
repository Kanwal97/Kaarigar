# Phase 3 — Visual Design & Component System

What was built, and the rules that govern it. This is the spec **and** the record — every
statement here is checkable against the code it describes.

Input: [Phase 2 — Ideation & Wireframing](PHASE-2-IDEATION.md).
Output: the implementation verified in [Phase 4 — Handoff](PHASE-4-HANDOFF.md).

---

## 3.1 The stylesheet architecture (the structural change)

**Before:** `tokens → base → components (1,244 lines) → enhance (1,020 lines)`, where
`enhance.css` re-styled components `components.css` had already styled, and won by load
order. No component had a single home.

**After:** four layers with a strict rule — *a selector appears in exactly one file.*

| File | Owns | Never contains |
|---|---|---|
| [`tokens.css`](../../src/styles/tokens.css) | Custom properties only: palette, type, space, shape, motion, layout, focus | Selectors other than `:root` |
| [`base.css`](../../src/styles/base.css) | Reset, element defaults, focus ring, reduced-motion, shared utilities (`.muted`, `.measure`, `.sr-only`, `.linkish`, `.eyebrow`) | Anything component-specific |
| [`layout.css`](../../src/styles/layout.css) | The shell: skip link, route progress, top bar, primary nav, content grid, context rail, offline badge | Component interiors |
| [`components.css`](../../src/styles/components.css) | Every component, once | Layout of the shell |

`enhance.css` is deleted. Verified mechanically — no selector is defined in more than one
stylesheet (the check is in [Phase 4 §4.2](PHASE-4-HANDOFF.md)).

### Tokens added

Nothing in the palette moved. What was added is structure the old system was missing:

```css
--measure: 66ch      /* PROSE only — this was the page cap, which is Finding B */
--rail-nav: 240px    --rail-ctx: 300px    --page-max: 1440px    --gutter
--dur-2: 200ms       /* the joint-seat travel; the motion ceiling */
--tap-icon: 44px     --focus-w: 3px       --focus-color
--tracking-eyebrow   /* Latin only — see §3.4 */
```

**Removed from use:** `--fs-md`, `--muted`, `--ok`. These were *referenced* but never
*defined* (Phase 1, Finding D). They are not "added" — the four call sites were corrected
to the tokens that already existed (`--fs-base`, `--fs-sm`, `--ink-soft`, `--accent`).
Inventing a token to satisfy a typo would have widened the scale for no design reason.

---

## 3.2 Layout — three tiers

```
< 900px    single column, bottom tab bar
900–1199   nav rail (240) + content
≥ 1200     nav rail (240) + content + context rail (300)
```

Routes with reference material render three children and let CSS place them:

```jsx
<section className="page page--rail">
  <div className="page__head"> … </div>   {/* col 1, row 1 */}
  <aside className="rail">   … </aside>   {/* col 2, rows 1–2, sticky */}
  <div className="page__body"> … </div>   {/* col 1, row 2 */}
</section>
```

On a phone this is plain block flow, so the rail lands **exactly where it is most useful**
— progress above the path on Home, tools right after the video on a Lesson — instead of
being exiled to the bottom of the page. One DOM, no duplication, no `order` gymnastics.

The prose measure now lives on prose (`.page p`, `.page li`, `.lesson__steps ol`,
`.lesson__summary`, …), not on `.shell__main`.

---

## 3.3 The Joinery Spine

[`JointMark.tsx`](../../src/components/ui/JointMark.tsx) draws eight joints, each as a
**socket** (fixed) and a **pin** (travels). `spine.joint` — a field that had existed since
M1 with no consumer — now drives it.

| Joint | Levels | Reads as |
|---|---|---|
| `anchor` | L0 | a block bedded on the ground — safety is what everything rests on |
| `marking` | L1, L2 | scribe lines coming down onto a board |
| `sawn-edge` | L3, L4 | a board and the cut edge that meets it |
| `mortise-tenon` | L5 | the joint the curriculum builds toward |
| `butt` | L6 | two faces meeting, held by fasteners |
| `dado` | L7 | a housing cut in an upright, a shelf sliding home |
| `carcass` | L9 | panels assembled into a box |
| `finished-piece` | L8, L10 | a polished face |

**Mechanics.** The pin carries an inline `--seat-x`/`--seat-y` offset. `.spine__node--completed`
resets the transform to `0,0` and raises `fill-opacity` to `.18` — the pin travels home
over 200 ms and the joint reads solid. `base.css` zeroes the duration under
`prefers-reduced-motion`, so those users see the joint already seated. **The diagram is
the signature; the motion is garnish.**

**State is carried three ways** — the seated/unseated drawing, the colour, and a
**localised word** (`spine.done` / `spine.start` / `spine.coming` / `count/total`). The
status text used to be hard-coded English on the Home screen of every locale.

---

## 3.4 Type

Scale, families and per-locale loading are unchanged — they were right.

One rule added: **`letter-spacing` is Latin-only.** Tracked uppercase labels break
conjunct formation and matra attachment in Devanagari and Gurmukhi, so `.eyebrow` drops
both `letter-spacing` and `text-transform` under `:lang(hi)`, `:lang(pa)` and `:lang(bgc)`.
The old `text-transform: uppercase` on `.continue__k` and `.lesson__video-label` applied to
Indic text, where it does nothing useful and the tracking actively harms rendering.

---

## 3.5 Iconography

[`Icon.tsx`](../../src/components/ui/Icon.tsx) — 43 icons, one `<path>` each,
`currentColor`, `aria-hidden`, sizes 18/22/26/36. [`icons.ts`](../../src/content/icons.ts)
maps content IDs and categories onto them. [`emoji.ts`](../../src/content/emoji.ts) is
deleted.

Containers: `.icon-tile` (44 px, brand-tinted) with `--success` / `--info` / `--danger`
variants so a wood card, a glossary card and a Fix It card are distinguishable at a glance
without relying on the glyph alone.

**Cost:** the whole CSS bundle is 44.2 KB raw / **8.5 KB gzipped**, and initial JS is
**123.6 KB gzipped against a 150 KB budget** — the icons replaced 2.1 KB of emoji lookup
tables and cost roughly the same. The original file's real constraint (nothing downloads,
works on a cheap old Android) is preserved; its failure mode (🔧 meaning four different
tools, unrecolourable, device-dependent) is not.

Two decorative emoji remain on purpose: 🔥 on the streak pill and the media symbols
(▶ ⏸ ⏹ 🐢 🐇) on the read-aloud controls. All are `aria-hidden` beside a real text label
and none carries meaning alone.

---

## 3.6 Component inventory

| Component | Change |
|---|---|
| **Top bar** | Wordmark · **search** · language · text size · (theme ≥900px). Search was previously unreachable except from the discovery sub-nav |
| **Tab bar / rail** | Active state now marker-bar **+** colour **+** weight, not colour alone |
| **Continue card** | Same box, same height in both the "start" and "resume" states — hydration swaps text, not layout |
| **Progress** | Bordered track (visible against `--surface-sunk` in sun), gradient fill, tabular numerals, `aria-label` |
| **Joinery Spine** | Rebuilt — §3.3 |
| **Level page** | Level joint mark + "at a glance" rail: tools, woods, hazard count, aggregated from the lesson **metadata index** so no lesson body loads |
| **Lesson page** | Three regions; rail carries position-in-level stepper + what-you-need chips; `<h2>! Safety</h2>` replaced by an icon + word |
| **Self-check** | `aria-pressed` removed (answers aren't toggles); result announced in words via `.sr-only` |
| **Entity cards** | Drawn icon tiles; glossary shows its **category** instead of the first letter of the term; tool cards name the lesson they link to |
| **Search results** | Per-group hit counts; lessons show level + minutes |
| **Filter chips** | Selected state adds a ✓ — not colour alone |
| **Language menu** | Current language marked with ✓ — not weight/colour alone |

---

## 3.7 Content pipeline change

[`scripts/build-content-index.mjs`](../../scripts/build-content-index.mjs) now emits
`tools`, `materials` and `hazards` **as ID references** per lesson. This is what lets the
Level page show what a level covers without loading 27 lesson chunks — the entities
themselves are already eager reference data. The lazy-loading contract in
[CONTENT-LAZY-LOADING.md](../CONTENT-LAZY-LOADING.md) is unchanged: bodies still load per
lesson, on demand.

---

## 3.8 Rules for anyone extending this

1. **One selector, one file.** If you're about to override a component from another
   stylesheet, edit the component instead.
2. **Never reference a token that isn't in `tokens.css`.** The check in Phase 4 §4.2 runs
   in seconds; run it.
3. **State is never colour alone.** Colour + shape/icon + a localised word. Every time.
4. **No user-visible string in JSX.** It goes in [`ui.ts`](../../src/i18n/ui.ts) with all
   four locales — including `aria-label`s.
5. **The measure caps prose, not pages.**
6. **Motion ≤200 ms, and the interface must be complete without it.**
7. **Dark ink on orange and brass.** White text on those fills is banned and measured.
8. **New icon → `Icon.tsx` + the Styleguide gallery.** No emoji, no second icon source.

---

*Phase 3 output is verified in [Phase 4 — Prototyping, Testing & Handoff](PHASE-4-HANDOFF.md).*
