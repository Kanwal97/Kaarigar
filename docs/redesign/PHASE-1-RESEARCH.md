# Phase 1 — Research & User Empathy

**Redesign of a shipped product, not a greenfield brief.** Kaarigar already has 27 authored lessons across L0–L10 in four languages, a working PWA, and a contrast-verified palette. So Phase 1 is not "who might use this" — it is **evidence gathering against a real build**: what the code actually does, where it diverges from its own stated intent, and which of those divergences hurt a carpenter holding a phone with sawdust on it.

Carried-forward evidence lives in [RESEARCH.md](../RESEARCH.md) (audience, literacy, ITI/FFSC syllabus, font/network measurements, contrast science). This document does **not** re-litigate it. It adds the layer that only exists now that there is a product: **an audit of the artefact itself.**

---

## 1.1 How AI was used here, and where it was not

| Task | Who did it | Why |
|---|---|---|
| Sweep 6,379 lines of source for divergence between `docs/DESIGN.md` and shipped CSS/TSX | AI | Mechanical, exhaustive, and error-prone by hand |
| Find undefined CSS custom properties, dead selectors, hard-coded English | AI | A grep-shaped problem |
| Decide **which** divergences matter | Human | Requires knowing that a Hindi-first product shipping English status labels is worse than 400 lines of dead CSS |
| Safety framing, hazard presentation, "never colour alone" | Human | Consequences are physical; no model output ships here unreviewed |
| Cultural read on colour, iconography, tone | Human | Saffron/gold being auspicious in North India is not something to infer from a training set on demand |
| Emotional resonance — does progress *feel* like building something | Human | The whole reason the Joinery Spine exists |

**Rule applied throughout the redesign:** AI proposes and enumerates; a human decides what is true, what is safe, and what is kind.

---

## 1.2 Who this is for (unchanged, restated so Phase 2 can be argued against)

Three people, drawn from [RESEARCH §1.1](../RESEARCH.md):

**Ramesh — the *shagird* (apprentice), 19, Yamunanagar.**
Learning under an *ustad*. Reads Hindi comfortably, English haltingly. ₹200/month prepaid data, ~40% of it on video. Phone: 3-year-old Android, cracked screen, 3 GB RAM. Learns by watching then doing, in a noisy shop, standing.
*Wants:* "show me the next thing to learn, and don't make me read a lot."

**Sukhwinder — the working *mistri*, 41, Ludhiana.**
Twenty years on the tools. Reads Punjabi and Hindi. Will **never** start at Lesson 1 — he's here because a client asked for a mortise-and-tenon bed frame, or a polish bubbled and he wants to know why. Dusty hands, often works outdoors in sun.
*Wants:* "answer my one question in under thirty seconds."

**Anjali — the hobbyist, 33, Gurugram.**
Reads English and Hindi. Weekend woodworker with a small balcony workshop. Comfortable with apps, impatient with bad ones. Desktop at work, phone in the workshop.
*Wants:* "let me plan a project properly, then take the steps to the bench."

### Contexts of use that constrain every decision

- **Sunlight and dust collapse effective contrast** — the reason body text targets AAA, not AA.
- **Hands are dirty, gloved, or holding a tool.** One-handed, thumb-zone, ≥48px targets, primary 56–64px.
- **Noise.** Audio is a supplement, never a dependency; captions/text always carry the meaning.
- **Data is metered and precious.** Video never auto-loads; the size warning is a feature, not a nag.
- **The phone is sometimes shared.** No accounts is a feature; so is export/import.
- **Devanagari and Gurmukhi are taller than Latin.** Every vertical rhythm decision is tested against matras and laga-matra, not against "The quick brown fox."

---

## 1.3 What the audit found — evidence, not opinion

Ten findings, ranked by how much they cost a real user. Each is a file and a line, not a vibe.

### A. The signature element was specified and never built — **high**

[`docs/DESIGN.md` §Signature element](../DESIGN.md) commits to progress rendered as an assembling joint: *"as you complete a level, its joint locks into place in the spine."* [`src/content/spine.ts`](../../src/content/spine.ts) faithfully carries a `joint` name for all eleven levels — `anchor`, `marking`, `sawn-edge`, `mortise-tenon`, `butt`, `dado`, `carcass`, `finished-piece`.

**No code reads that field.** [`JoinerySpine.tsx`](../../src/components/JoinerySpine.tsx) renders a 22 px rounded square that changes colour. The one idea that made this product *about joinery* rather than *a course app with a wood palette* exists only as a data field and a paragraph of prose.

Why it matters for Ramesh: an apprentice's motivation is seeing the thing he is building take shape. A checklist is a chore. A joint that seats is a craft object accumulating on his screen.

### B. Desktop is a phone in a 240 px frame — **high**

[`components.css:28`](../../src/styles/components.css#L28) caps `.shell__main` at `--measure` (66 ch) **at every viewport width**. On a 1440 px screen the result is a 240 px nav rail, a ~700 px column, and ~500 px of nothing.

Every desktop wireframe in [`WIREFRAMES.md`](../WIREFRAMES.md) is unbuilt: the lesson's sticky tools/wood/safety rail, "Level at a glance", the Home dashboard, the Tool Finder detail pane. For Anjali planning a wardrobe at her desk, the app is a phone screenshot.

66 ch is the right measure **for a line of prose**. It was mistakenly applied to the *page*.

### C. Two stylesheets define the same components — **high (to maintenance, which becomes user-facing)**

[`components.css`](../../src/styles/components.css) (1,244 lines) and [`enhance.css`](../../src/styles/enhance.css) (1,020 lines) both style `.discnav`, `.lesson-list__item`, `.home__entries`, `.continue`, `.selfcheck__mark`, `.audio`. `enhance.css` wins by load order and frequently reverses its predecessor — `.discnav` goes from `border-bottom` underline to a pill group; `.lesson-list__item` flips `flex-direction` column→row; `.home__entries` flips flex→grid.

No component has one place where it is defined. Every future change is a two-file archaeology exercise, which is exactly how the next three findings happened.

### D. Undefined custom properties ship in production CSS — **medium, and provably broken**

`--fs-md` and `--muted` are used in [`enhance.css`](../../src/styles/enhance.css) at lines 786, 798, 808, 809 and **do not exist** in [`tokens.css`](../../src/styles/tokens.css). `var(--ok, var(--accent))` at 792–793 relies on a fallback for a token that was never defined.

Consequences today: the self-check score line and the unified-search group headings silently drop to inherited font-size and `color: inherit`. The "uppercase, muted, small" treatment those headings were designed to have never renders.

### E. Iconography contradicts its own design rule — **medium**

[`DESIGN.md` §Iconography](../DESIGN.md) specifies *one* icon set of concrete, locally-recognisable objects, at ≥3:1 non-text contrast, always paired with a label.

Shipped: five stroke icons for the tab bar ([`Icon.tsx`](../../src/components/ui/Icon.tsx)), and **emoji everywhere else** ([`emoji.ts`](../../src/content/emoji.ts)) — 🔪 for every saw, 🔧 for a hand plane *and* a sharpening stone *and* a screwdriver *and* the default, 📋 for plywood. The Glossary doesn't even do that: [`Glossary.tsx:49`](../../src/routes/Glossary.tsx#L49) renders **the first letter of the term** as the icon.

`emoji.ts` has a genuinely good rationale in its header comment — zero bytes, Emoji-1.0 only so old Androids don't show tofu. That rationale is respected in Phase 3 by replacing it with **inlined SVG**, which is also effectively zero network cost, but additionally: takes `currentColor`, renders identically on every device, and can actually depict a *randa* instead of a wrench.

### F. Search exists and is hidden — **medium**

[`Search.tsx`](../../src/routes/Search.tsx) is a solid unified search across lessons, tools, woods, glossary and fixes. It is reachable **only** from [`DiscoveryNav`](../../src/components/DiscoveryNav.tsx), which appears only on Tools, Woods, Glossary and Search itself.

It is not in the tab bar, not on Home, not in the header. Sukhwinder — who arrives with exactly one question — has no way to ask it without first guessing which category his question belongs to. That is the precise failure mode search exists to prevent.

### G. English leaks through a Hindi-first product — **medium**

- [`JoinerySpine.tsx:13-18`](../../src/components/JoinerySpine.tsx#L13) — `'✓ done'`, `'start →'`, `'coming'` are hard-coded English, rendered on the Home screen of every locale.
- [`ToolFinder.tsx:57,63`](../../src/routes/ToolFinder.tsx#L57) — `"unverified term"`, `"Used in a lesson →"`.
- [`WoodFinder.tsx:50`](../../src/routes/WoodFinder.tsx#L50) — `"figures need local check"`.
- [`Layout.tsx:40`](../../src/components/Layout.tsx#L40) — `"Skip to content"`.
- Every `aria-label` in the app: `"Learning path"`, `"Main"`, `"Safety"`, `"Find"`, `"Category"`, `"Lesson navigation"`. A TalkBack user in Hindi hears English landmarks.

The dictionary in [`ui.ts`](../../src/i18n/ui.ts) is well-built and 200 keys deep. These strings just never got added to it.

### H. Returning users watch the page rewrite itself — **medium**

Progress is client-only by design (correct). But [`Home.tsx:32`](../../src/routes/Home.tsx#L32) renders the "Start here" card in prerendered HTML and swaps to "Continue" after hydration; the spine renders every level as `available` until `hydrated` flips. So Ramesh, on his 27th visit, sees "Start here — L0 Safety" and an empty path for a beat, then it jumps.

The fix isn't to render progress on the server (impossible, and correctly so) — it's to make the pre-hydration state a **stable skeleton of the same shape**, so hydration fills it rather than replacing it.

### I. Small accessibility defects — **low individually, corrosive together**

- `aria-pressed` on self-check answer buttons ([`SelfCheck.tsx:74`](../../src/components/SelfCheck.tsx#L74)) — they're answers, not toggles. Screen readers announce "pressed".
- `<h2>! {Safety}</h2>` ([`Lesson.tsx:178`](../../src/routes/Lesson.tsx#L178)) puts a literal "!" into the accessible name.
- Three preference controls (language, text size, theme) live in the top bar on **every** screen; under 560 px they wrap to a second full-width row ([`enhance.css:673`](../../src/styles/enhance.css#L673)), pushing content down on the smallest phones — for settings that are set once and already live in **Me**.

### J. Dead code — **low**

`.app-shell`, `.app-header`, `.app-main`, `.app-footer`, `.brand`, `.brand-sub`, `.home__levels`, `.home__level-link`, `.entry`, `.video-link`, `.lesson-list__check` — all styled, none referenced by any component. Roughly 120 lines of CSS shipped to every user for nothing.

Also: [`README.md`](../../README.md) claims "L0, L1, L2 authored." The repo contains **27 lessons across all eleven levels, complete in all four languages.** The project undersells itself in the first paragraph a contributor reads.

---

## 1.4 What is working, and is therefore protected

A redesign that breaks these has failed regardless of how it looks:

1. **The contrast contract.** Verified ratios in [`DESIGN.md` §Colour](../DESIGN.md), enforced by [`scripts/contrast-check.mjs`](../../scripts/contrast-check.mjs). Dark ink on orange and brass. Never colour alone.
2. **Honest translation badges.** Fallback and machine-draft states are labelled, never silently mislabelled. This is an ethical position, not a feature.
3. **Cited safety.** Hazards carry organisation + URL + review status. Nothing about a spinning blade is asserted without a source.
4. **The video facade.** Nothing loads until tapped; data-saver warns with a size; offline says so plainly; 101/150 embed failures fall back to a real link. This is best-in-class and stays exactly as it is.
5. **Read-aloud.** Device TTS, three speeds, the spoken line highlighted and scrolled into view. For a low-literacy user this is the single most valuable feature in the app.
6. **Static prerendering.** Every route is a real HTML file. Deep links, refresh, and back work with no server. Content is readable before JS runs.
7. **Per-locale font subsetting.** Gurmukhi bytes never reach a Hindi reader.

---

## 1.5 Success criteria for the redesign

Measurable, so Phase 4 can say pass or fail:

| # | Criterion | Test |
|---|---|---|
| 1 | The Joinery Spine renders the actual joint each level teaches, and completion visibly seats it | Visual + `spine.joint` consumed in code |
| 2 | Desktop ≥1024 px uses its width for content, not padding; prose still capped at 66 ch | Layout inspection at 1440 px |
| 3 | Every component is defined in exactly one place | No selector defined in two stylesheets |
| 4 | No undefined custom property is referenced | Grep `var(--x)` against `tokens.css` |
| 5 | One drawn icon set; no emoji as UI iconography | `emoji.ts` retired |
| 6 | Search reachable in ≤1 tap from any screen | Navigation audit |
| 7 | Zero hard-coded English in user-visible or assistive-tech text | Grep for string literals in JSX/aria |
| 8 | No layout shift between prerendered HTML and hydrated state on Home | Before/after comparison |
| 9 | Contrast contract intact | `npm run typecheck`, `node scripts/contrast-check.mjs` |
| 10 | Budgets intact | `npm run build`, `npm run check:budget`, `npm test` |

---

## 1.6 Open questions (carried to Phase 2, answered by judgment where no data exists)

1. **Should the tab bar become six items to fit Search?** No — five is already at the thumb-crowding limit on a 320 px screen. Resolved in Phase 2 by putting search in the header, where it is one tap from every screen without stealing a tab.
2. **Do users understand the joint diagrams without labels?** Unverified — no user testing has been run. Mitigated, not solved: every joint carries a text label, a localised status, and an `aria-label`; the diagram is never the only channel. Flagged for real testing in Phase 4.
3. **Is the streak motivating or shaming?** Unverified. Kept as-is (neutral framing, no loss state, no "you broke your streak") pending real data.
4. **Do the three preference controls belong in the header at all?** Judgment call: text size is genuinely situational (sun glare, tired eyes mid-lesson) and stays reachable; theme and language are set-once and collapse into a single menu. Reversible if testing disagrees.

---

*Phase 1 output feeds [Phase 2 — Ideation & Wireframing](PHASE-2-IDEATION.md).*
