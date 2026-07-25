# DESIGN — "Kaarigar"

**Phase 2 deliverable.** The token system, palette, type, and signature element — decided *before* any CSS. Companion to [PLAN.md](PLAN.md). Grounded in RESEARCH §1.5 (sun/dust contrast, low-literacy UI) and the four-script requirement.

---

## Design principles (for this audience, not a generic SaaS)

1. **Legible in a dusty workshop and in outdoor sun.** High contrast (aim ~7:1 body), large non-thin type, solid fills over hairlines.
2. **Text is support, not the load-bearing wall.** Icon + short label + tap-to-hear audio. One primary action per screen.
3. **The four scripts are first-class.** Every type and spacing decision is tested against Devanagari and Gurmukhi, which are *taller* than Latin — never clip, always give line-height headroom.
4. **The subject is joinery; the interface should feel built, not decorated.** Warm timber tones, brass accents, honest structure. Restraint over animation.

---

## Palette

**A motivational scheme, grounded in the workshop's own world.** For a *learning* product the colour has a job: make people want to act, and make progress feel rewarding. Each hue is drawn from the subject (so it's never a generic SaaS palette) and mapped to a motivational role. **Explicitly NOT** the banned defaults — no cream `#F4F1EA` + terracotta `#D97757`, no near-black + acid-green, no broadsheet hairline-rule look.

### Named source colours → motivational role

| Token name | Hex | From | Motivational job |
|---|---|---|---|
| `--wood-sheesham` | `#7E4632` | Sheesham heartwood (lightened) | **Grounding brand / structure** — craft identity, headers. Not the dominant field. |
| `--cable-orange` | `#F2621C` | Workshop extension-cable orange | **Energy to ACT** — Start, Play, Continue. The single high-emphasis action. |
| `--green-wood` | `#3F7D4E` | Fresh-sawn "green" (unseasoned) wood | **Growth & momentum** — completion, streaks, progress rings. "You're advancing." |
| `--brass` | `#CE9427` | Brass hardware | **Achievement & reward** — milestones, active tab, highlights. Optimism. |
| `--blueprint` | `#1F5C8A` | Blueprint blue | **Focus** — links, reading, information. Calm concentration. |
| `--pine` / `--sawdust` | `#F3EAD6` / `#DDCBA4` | Planed pine / sawdust | Warm bright surfaces & lines — an uplifting, not-heavy background. |

Why this motivates: **orange** drives action, **green** rewards progress, **brass-gold** signals accomplishment, **blue** supports focused reading — the classic energy/growth/reward/focus quartet, but every hue is a real workshop material. These are the *source* hues; semantic tokens below map roles to contrast-tuned values. Dark text sits on orange and brass (energetic **and** accessible); white sits on green.

### Semantic tokens — Light

| Token | Hex | Role | Contrast note |
|---|---|---|---|
| `--bg` | `#FCF8EF` | Page background (warm, bright, uplifting — *not* the banned cream) | — |
| `--surface` | `#FFFFFF` | Cards, sheets | — |
| `--surface-sunk` | `#F3EAD6` | Inset areas, code/step blocks | — |
| `--ink` | `#241A14` | Primary text on `--bg` | **~13:1** (exceeds 7:1) |
| `--ink-soft` | `#5A4A3C` | Secondary text | **~7:1** |
| `--line` | `#DDCBA4` | Borders/dividers (sawdust) | ≥3:1 vs surface |
| `--primary` | `#7E4632` | Grounding brand (sheesham, lightened); headers, structure | white text on it **7.48:1 (AAA)** |
| `--primary-ink` | `#FFFFFF` | Text on `--primary` | — |
| `--cta` | `#F2621C` | **Act** — orange, the ONE high-energy action (Start/Play/Continue) | `--cta-ink` (dark) text on it **~6:1**; white only on large/bold |
| `--cta-ink` | `#241A14` | Text on `--cta` | — |
| `--success` | `#3F7D4E` | **Progress** — green wood; completion, streaks, progress rings | white text on it **~4.7:1** |
| `--accent` | `#CE9427` | **Reward** — brass-gold; achievement, active tab, highlights | `--accent-ink` (dark) on it **~5:1** |
| `--accent-ink` | `#241A14` | Text on `--accent` | — |
| `--info` | `#1F5C8A` | **Focus** — blueprint blue; info/links | white on it **~6.5:1** |
| `--danger` | `#A62A1E` | Safety hazard / destructive | white on it **~6:1** |

### Semantic tokens — Dark

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#1A130E` | Warm near-black brown (not pure black; not acid-green territory) |
| `--surface` | `#251B14` | Cards |
| `--surface-sunk` | `#2F231A` | Inset |
| `--ink` | `#F3E9D8` | Primary text — **~14:1** on `--bg` |
| `--ink-soft` | `#C6B292` | Secondary — **~8:1** |
| `--line` | `#4A3A2A` | Borders |
| `--primary` | `#D29A79` | Sheesham lightened for dark surfaces |
| `--cta` | `#F5772F` | Orange (Act), brightened; `--cta-ink` dark text |
| `--success` | `#5FA46C` | Green (Progress) — soft forest, deliberately **not** neon/acid |
| `--accent` | `#E0B24E` | Brass-gold (Reward), brightened; dark text |
| `--info` | `#7FB2E0` | Blueprint blue (Focus), lightened |
| `--danger` | `#E4776B` | Hazard, lightened |

**Rules:** never convey meaning by colour alone (icon/label always accompany); hazard/danger always pairs the colour with a warning glyph + word; `--cta` orange is reserved for the single most important action on a screen (Play video, Start lesson) and never used decoratively.

### Colour & contrast — evidence basis and verified ratios

Researched (Research → Plan → Implement, 2026-07-24). Two honest conclusions shaped this palette:

1. **Colour does not reliably "boost learning."** The classic "red impairs achievement" effect fails replication (meta-analysis effect ≈ 0 after publication-bias correction); "warm = energizing" is convention, not proven. So the palette motivates through **clarity, visible reward-signalling, and cultural positivity** — not a mood effect we can't back up. ([red-effect meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC7704521/), [Elliot 2015 review](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2015.00368/full))
2. **The contrast science is solid and drives every choice.** WCAG 2.2 floors (4.5:1 text, 3:1 large/UI); we target **AAA 7:1 for reading content** because sunlight, dust, and aging vision collapse effective contrast. Prefer **dark-on-light**; saturated warm fills (orange/gold) **fail with white text** so they carry **dark ink**. ([WCAG contrast](https://webaim.org/articles/contrast/), [1.4.11 non-text](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html), [1.4.1 use of colour](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html), [sunlight/aging vision](https://pmc.ncbi.nlm.nih.gov/articles/PMC10075203/))
3. **India-positive framing:** saffron-orange (Act) and gold (Reward) are *auspicious/positive* here; **red is auspicious too**, so danger must **always** be reinforced with an icon + word, never red-alone. ([India colour meaning](https://www.color-meanings.com/color-meanings-indian-culture/))

**Verified ratios** (computed via `scripts/contrast-check.mjs`; light / dark):

| Pairing | Ratio | Grade |
|---|---|---|
| body text `--ink` on `--bg` | 16.1 / 15.3 | AAA |
| secondary `--ink-soft` on `--bg` | 8.0 / 8.9 | AAA |
| dark ink on `--cta` (orange) — **label rule** | 5.30 / 6.61 | AA · white-on-orange **3.21 FAIL → banned** |
| white on `--primary` (sheesham, lightened) | 7.48 | AAA |
| dark ink on `--accent` (brass) | 6.40 / 9.31 | AA / AAA |
| `--success` fill vs track (progress bar) | 4.12 / 5.10 | 3:1 UI ✓ |
| `--info` link text on surface | 7.10 / 7.50 | AAA |
| `--danger` fill/text | 7.07 | AAA (always + icon/word) |
| `--border-strong` vs surface (control outlines) | 4.19 / 4.18 | 3:1 UI ✓ |

**Non-negotiable colour rules (WCAG 1.4.1 + the research):**
- **Never colour alone.** Every state = colour **+** icon/shape **+** short label. Essential for colour-blind (~1 in 12 men) and doubly for low-literacy users who lean on icons. Progress shows a ✓ and the % in `--ink` (not green text); brass reward badges carry an icon + dark text; danger carries a `!` glyph + the word.
- **Dark ink on orange and brass**, always. White text is only permitted on the *darker* danger/primary/info fills where it's verified ≥4.5:1.
- **`--line` is decorative only** (dividers). Interactive control edges (self-check options, inputs) use **`--border-strong`** (≥3:1).
- **Saturated hues on large elements** (button fills, bars, headers); small text uses `--ink` or a verified pair.

---

## Type

**The constraint is the design problem:** a display face with character that *also* renders Devanagari and Gurmukhi. We solve it by choosing superfamilies that genuinely span the scripts, loaded per-locale.

| Role | Family | Script coverage | Why |
|---|---|---|---|
| **Display / headings** | **Baloo 2** (Devanagari+Latin) · **Baloo Paaji 2** (Gurmukhi+Latin) | Devanagari (hi, bgc), Gurmukhi (pa), Latin (en) | Warm, chunky, rounded — real character, friendly and legible for low-literacy readers; an Ek Type superfamily with *authentic* Indic design, not a Latin face bodged into Devanagari. |
| **Body / UI** | **Mukta** (Devanagari+Latin) · **Mukta Mahee** (Gurmukhi+Latin) | Same split | Designed for on-screen legibility at small sizes across these scripts; even colour, open counters. |
| **Fallback (metrics)** | system-ui / local Noto, with `size-adjust` overrides | all | Reduce CLS on swap (RESEARCH §1.4 — perfect elimination not guaranteed for Indic; we reserve space + test). |

- **Per-locale loading:** `en`→Baloo 2 + Mukta (Latin subset); `hi`/`bgc`→Baloo 2 + Mukta (Devanagari subset); `pa`→Baloo Paaji 2 + Mukta Mahee (Gurmukhi subset). **Gurmukhi files load only on `pa`.** All self-hosted WOFF2, script-block-subset (keep OpenType tables for conjuncts), `font-display: swap`.
- **Line-height:** **1.6** for Indic body, 1.5 min anywhere; headings 1.25 but with vertical padding so matras/laga-matra never clip. No fixed-height text containers.

### Type scale (rem, base 16px → scales with the 3-step text-size control)

| Step | rem | px @ base | Use |
|---|---|---|---|
| `--fs-xs` | 0.875 | 14 | captions, credits (never body) |
| `--fs-sm` | 1.0 | 16 | secondary text, labels |
| `--fs-base` | 1.125 | 18 | **body / lesson steps** (large default — workshop legibility) |
| `--fs-lg` | 1.375 | 22 | lead paragraph, card titles |
| `--fs-xl` | 1.75 | 28 | section headings |
| `--fs-2xl` | 2.25 | 36 | level titles |
| `--fs-3xl` | 2.875 | 46 | Home hero (desktop) |

**Text-size control** multiplies the root by `1.0 / 1.15 / 1.3`; everything is rem-based so content genuinely resizes (RESEARCH §1.5). Line-length capped ~66ch for readability.

---

## Spacing, radius, elevation, targets

- **Spacing scale** (`--sp-*`): 4, 8, 12, 16, 24, 32, 48, 64.
- **Touch targets:** min 48px; **primary actions 56–64px**; ≥8px gaps; primary actions live in the bottom third (mobile).
- **Radius:** `--r-sm 8px`, `--r-md 14px`, `--r-lg 22px` — rounded, echoing Baloo's soft character and the "sanded edge" feel.
- **Elevation:** soft warm shadows (`0 2px 8px rgba(36,26,20,.12)`), not hard drop shadows; one elevation level for cards, one for sheets/modals. No hairline-rule broadsheet look.

---

## Signature element — the Joinery Spine

**Kept and refined** (the brief invited us to beat it; it's genuinely on-theme, so we keep and sharpen it rather than replace it with something arbitrary).

> **Progress is rendered as an assembling joint.** The learning path is a vertical **spine** down Home. Each level is a **joint** that the curriculum actually teaches, drawn as a small SVG: `L0 anchor block → L1/L2 marking lines → L4 sawn edge → L5 butt → lap → dado → mortise & tenon → dovetail (heritage) → L9 assembled carcass → L10 finished piece`. As you complete a level, its joint **locks into place** in the spine — the pieces slide together and seat. Because the subject *is* joinery, **progress literally is assembly.**

- **States:** locked-in (completed, solid `--primary`/`--accent`), in-progress (outlined, `--cta` marker at your current lesson), not-started (faint `--line` ghost).
- **Reduced motion:** with `prefers-reduced-motion: reduce`, joints appear seated instantly with no slide animation — the *diagram* is the signature, the motion is optional garnish.
- **320 px:** the spine is a single vertical column; joints are ≥44px tall tap targets linking to the level. On desktop it can sit in a left rail beside the level list.
- **Accessible:** each joint has a text label + `aria-label` ("Level 5, Joinery — completed" / "in progress" / "not started"); it is not the *only* way to navigate (the level list is always present).

**Motion policy overall:** restrained. Transitions ≤200ms, ease-out; no decorative/auto-playing animation on content pages; `prefers-reduced-motion` fully respected everywhere (RESEARCH §1.5).

---

## Iconography

- Concrete, locally-recognisable objects (a *randa*, an *aari*, a plywood sheet), **always paired with a label + tap-to-hear audio** (RESEARCH §1.5). Simple filled line-icons at ≥24px glyph inside a ≥48px target; ≥3:1 non-text contrast.
- Tool/wood icons double as Glossary/Finder imagery — one icon set, reused, keeps bundle small and meaning consistent.

---

## Token delivery

All tokens ship as CSS custom properties in `src/styles/tokens.css` (`:root` light, `:root[data-theme="dark"]` + `@media (prefers-color-scheme: dark)` dark), consumed by plain CSS modules. No runtime styling library (keeps JS budget). Text-size and theme are `data-*` attributes on `:root`, toggled by the **Me** controls and persisted in `localStorage`.

---

*Design decisions are final for Phase 2 review. No CSS is written until Phase 2 is approved.*
