# WIREFRAMES — "Kaarigar"

**Phase 2 deliverable.** ASCII wireframes for **Home, Level, Lesson, Glossary, Tool Finder**, mobile (320–414 px) and desktop. Companion to [PLAN.md](PLAN.md) (IA §2.2) and [DESIGN.md](DESIGN.md). Layout, not pixels. Every screen: bottom tab bar on mobile, left sidebar on desktop; language + text-size reachable; primary action in the thumb zone.

Legend: `[ ]` button/target (≥48px, primary 56–64px) · `▶` play · `♪` tap-to-hear audio · `◐` progress · `⚿` joinery-spine joint · `!` safety.

---

## HOME — mobile

```
┌─────────────────────────────┐
│ Kaarigar        [हिं ▾] [Aa] │  ← header: language switcher, text-size
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ CONTINUE                │ │  ← FIRST thing (continue-where-you-left-off)
│ │ L4 · Planing            │ │
│ │ "Randa tuning" ◐ 40%    │ │
│ │            [ ▶ Resume ] │ │  ← primary, thumb zone
│ └─────────────────────────┘ │
│                             │
│  🔥 3-day streak · L0–L3 ✓  │  ← neutral, no shame
│                             │
│  THE PATH                   │
│  ⚿ L0 Safety          ✓     │  ← Joinery Spine: seated joints = done
│  ⚿ L1 Wood & boards   ✓     │
│  ⚿ L2 Measure & mark  ✓     │
│  ⚿ L3 Hand tools      ✓     │
│  ⚿ L4 Saw·plane·chisel ◐    │  ← current (orange marker)
│  ⚙ L4.5 Sheet goods   ·     │
│  ⚙ L5 Joinery         ·     │
│  ⚙ …  L6 … L10        ·     │
│                             │
│  Jump in ▸                  │
│  [Tools] [Build] [Fix It]   │  ← non-linear entry shortcuts
├─────────────────────────────┤
│ [Learn][Tools][Build][Fix][Me]│ ← bottom tab bar (5, thumb-reachable)
└─────────────────────────────┘
```

## HOME — desktop

```
┌───────────┬────────────────────────────────────────────────┐
│ Kaarigar  │  [ search…                 ]      [हिंदी ▾] [Aa] │
│           ├────────────────────────────────────────────────┤
│ ● Learn   │  ┌────────────────────┐  ┌───────────────────┐  │
│ ○ Tools   │  │ CONTINUE           │  │  🔥 3-day streak   │  │
│ ○ Build   │  │ L4 · Randa tuning  │  │  Levels done 4/11 │  │
│ ○ Fix It  │  │ ◐ 40%  [ ▶ Resume ]│  │  ◐ ring           │  │
│ ○ Me      │  └────────────────────┘  └───────────────────┘  │
│           │                                                  │
│ JOINERY   │  THE PATH                                        │
│  SPINE    │  ┌──────┐┌──────┐┌──────┐┌──────┐┌──────┐        │
│  ⚿ done   │  │L0 ✓  ││L1 ✓  ││L2 ✓  ││L3 ✓  ││L4 ◐  │  …     │
│  ⚿ done   │  └──────┘└──────┘└──────┘└──────┘└──────┘        │
│  ⚿ ◐ now  │  (left rail spine mirrors level cards)           │
│  ⚙ …      │                                                  │
└───────────┴────────────────────────────────────────────────┘
```

---

## LEVEL — mobile

```
┌─────────────────────────────┐
│ ‹ Path        [हिं ▾] [Aa]   │
├─────────────────────────────┤
│ ⚿  L5 · JOINERY             │  ← joint motif for this level
│ After this: cut a butt, lap,│  ← "what you can do after" (outcome)
│ dado & mortise-tenon joint. │
│ ◐ 0 / 6 lessons             │
├─────────────────────────────┤
│ ⓘ Prereqs recommended:      │
│   L4 Chiselling (advisory)  │  ← advisory, NOT a hard lock
├─────────────────────────────┤
│ 1 [ Butt joint        20m ] │  ← each ≥48px, difficulty dot
│ 2 [ Lap joint         25m ] │
│ 3 [ Dado / housing    25m ] │
│ 4 [ Mortise & tenon   35m ] │
│ 5 [ Dowel & minifix   20m ] │  ← what shops actually use
│ 6 [ Dovetail  ✦heritage ]   │  ← flagged premium, not gating
├─────────────────────────────┤
│ [Learn][Tools][Build][Fix][Me]│
└─────────────────────────────┘
```

## LEVEL — desktop

```
┌───────────┬────────────────────────────────────────────────┐
│ sidebar   │ ‹ Path                              [हिंदी ▾][Aa]│
│ ● Learn   ├────────────────────────────────────────────────┤
│  L0..L4 ✓ │  ⚿ L5 · JOINERY          After this: cut butt,  │
│  L5 ◐ ◂   │                          lap, dado & M&T joints.│
│  L6..L10  │  ◐ 0 / 6                                         │
│           ├───────────────────────────┬────────────────────┤
│ ○ Tools   │ 1 [ Butt joint      20m ] │  LEVEL AT A GLANCE  │
│ ○ Build   │ 2 [ Lap joint       25m ] │  Tools: saw, chisel,│
│ ○ Fix It  │ 3 [ Dado / housing  25m ] │   mallet, gauge     │
│ ○ Me      │ 4 [ Mortise & tenon 35m ] │  Woods: sheesham    │
│           │ 5 [ Dowel & minifix 20m ] │  ! Hazards: chisel  │
│           │ 6 [ Dovetail ✦heritage ]  │   cut, workpiece slip│
└───────────┴───────────────────────────┴────────────────────┘
```

---

## LESSON — mobile (the core teaching unit)

```
┌─────────────────────────────┐
│ ‹ L5 Joinery   [हिं ▾] [Aa]  │
├─────────────────────────────┤
│ Mortise & tenon             │
│ ● intermediate · 35 min     │
│ [ ♪ Sunno (audio) ]         │  ← audio-first affordance (thumb reach top)
├─────────────────────────────┤
│ ⚠ "Punjabi coming — showing │  ← honest fallback badge (only if pa/bgc missing)
│    Hindi"        (dismiss ×) │
├─────────────────────────────┤
│ YOU'LL BE ABLE TO:          │  ← objectives FIRST, not theory
│ • lay out a tenon           │
│ • chop a clean mortise      │
│ • fit a tight joint         │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │  🖼 video thumbnail       │ │  ← FACADE (no iframe yet)
│ │  [ ▶ Video chalao       │ │
│ │      ~18 MB · Hindi ]   │ │  ← explicit size warning (data-saver)
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ TOOLS   randa? no → chisel, │  ← tool/material chips → Glossary/Finder
│  tenon saw, mallet, gauge   │
│ WOOD    sheesham 50×50      │
│ ! SAFETY  chisel-cut →      │  ← safety callout, cited hazard
│   clamp work, hand behind   │
├─────────────────────────────┤
│ STEPS                       │
│ 1. Mark tenon shoulders …   │
│ 2. Saw cheeks to the line … │
│ 3. Chop mortise in halves … │
│  … (numbered, short)        │
├─────────────────────────────┤
│ PRACTICE                    │
│ Make one M&T in scrap …     │
├─────────────────────────────┤
│ SELF-CHECK  (2 Qs)          │
│ Q1 Which is the cheek? ○ ○  │
├─────────────────────────────┤
│      [ ✓ Mark complete ]    │  ← primary, thumb zone
├─────────────────────────────┤
│ [Learn][Tools][Build][Fix][Me]│
└─────────────────────────────┘
```

## LESSON — desktop (two-column: content + sticky rail)

```
┌───────────┬─────────────────────────────────┬──────────────┐
│ sidebar   │ Mortise & tenon                 │ (sticky rail)│
│           │ ● intermediate · 35m [♪ audio]  │ TOOLS        │
│ L5 ◂      │                                 │  chisel      │
│ 1 Butt    │ YOU'LL BE ABLE TO: • … • … • …  │  tenon saw   │
│ 2 Lap     │ ┌─────────────────────────────┐ │  mallet      │
│ 3 Dado    │ │  facade ▶ Video (~18MB, Hi) │ │  gauge       │
│ 4 M&T ◂   │ └─────────────────────────────┘ │ WOOD         │
│ 5 Dowel   │ STEPS                           │  sheesham    │
│ 6 Dovetail│  1. …  2. …  3. …               │ ! SAFETY     │
│           │ PRACTICE …                      │  chisel-cut  │
│           │ SELF-CHECK  Q1 ○ ○  Q2 ○ ○      │  (cited)     │
│           │        [ ✓ Mark complete ]      │  reviewStatus│
│           │                                 │  needs-expert│
└───────────┴─────────────────────────────────┴──────────────┘
```

---

## GLOSSARY — mobile (image-led, searchable, multilingual)

```
┌─────────────────────────────┐
│ Glossary       [हिं ▾] [Aa]  │
├─────────────────────────────┤
│ [ 🔍 randa / रंदा / plane…  ] │  ← searches roman + all scripts
├─────────────────────────────┤
│ Filter: [All][Tool][Wood]   │
│         [Joint][Finish][…]  │
├─────────────────────────────┤
│ ┌────────┐ रंदा  (randa)  ♪ │  ← image + term + audio
│ │  🖼 img │ Hand plane / EN  │
│ └────────┘ Flatten & smooth │
│ ─────────────────────────── │
│ ┌────────┐ आरी  (aari)   ♪  │
│ │  🖼 img │ Handsaw          │
│ └────────┘ Cut stock        │
│ ─────────────────────────── │
│ ┌────────┐ रूखनी (rukhani)♪ │
│ │  🖼 img │ Chisel (firmer)  │
│ └────────┘ Pare & mortise   │
│ ─────────────────────────── │
│ ⓘ pa/bgc terms shown when    │  ← honest: missing translations flagged
│   a translator adds them     │
├─────────────────────────────┤
│ [Learn][Tools][Build][Fix][Me]│
└─────────────────────────────┘
```

## GLOSSARY — desktop (grid)

```
┌───────────┬────────────────────────────────────────────────┐
│ sidebar   │ [ 🔍 search randa/रंदा/plane… ]      [हिं ▾][Aa]│
│ ○ Learn   │ [All][Tool][Wood][Joint][Finish][Hardware][Biz]│
│ ● Tools ◂ ├────────────────────────────────────────────────┤
│  Glossary │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐│
│  Tool Fdr │ │🖼 रंदा ♪ │ │🖼 आरी ♪ │ │🖼रूखनी♪ │ │🖼 गुनिया♪││
│  Wood Fdr │ │ plane   │ │ handsaw │ │ chisel  │ │ try-sq. ││
│ ○ Build   │ └─────────┘ └─────────┘ └─────────┘ └─────────┘│
│ ○ Fix It  │ ┌─────────┐ ┌─────────┐ …                       │
│ ○ Me      │ │🖼 हथौड़ा♪│ │🖼 रेती ♪ │  (click → detail +      │
│           │ └─────────┘ └─────────┘   lessons that use it)   │
└───────────┴────────────────────────────────────────────────┘
```

---

## TOOL FINDER — mobile

```
┌─────────────────────────────┐
│ Tool Finder    [हिं ▾] [Aa]  │
├─────────────────────────────┤
│ [ 🔍 name it: randa / रंदा  ]│
├─────────────────────────────┤
│ By category                 │
│ [Measure][Cut][Plane]       │
│ [Chisel][Strike][Bore]      │
│ [Hold][Fasten][Power][Mach] │  ← big icon tiles ≥48px
├─────────────────────────────┤
│ Popular in your work        │
│ ┌────────┐┌────────┐        │
│ │🖼 randa ││🖼 aari  │        │
│ │  ♪ रंदा ││  ♪ आरी  │        │
│ └────────┘└────────┘        │
│ ┌────────┐┌────────┐        │
│ │🖼rukhani││🖼 gunia │        │
│ └────────┘└────────┘        │
├─────────────────────────────┤
│ Tap a tool →                │
│  • what it does (♪)         │
│  • lessons that use it      │
│  • buy-order rank (L10)     │
├─────────────────────────────┤
│ [Learn][Tools][Build][Fix][Me]│
└─────────────────────────────┘
```

## TOOL FINDER — desktop (filter rail + grid + detail)

```
┌───────────┬───────────────────────────────┬────────────────┐
│ sidebar   │ [ 🔍 randa / रंदा / plane…   ] │ DETAIL         │
│ ● Tools ◂ ├───────────────────────────────┤ 🖼 रंदा (randa) │
│  Glossary │ CATEGORY                       │ Hand plane   ♪ │
│  Tool Fdr◂│ [✓Plane][Cut][Chisel][Bore]…  │ Flatten,       │
│  Wood Fdr │ ┌──────┐┌──────┐┌──────┐       │  smooth,       │
│           │ │🖼randa││🖼 jack││🖼block│      │  thickness.    │
│           │ │  ♪   ││  ♪   ││  ♪   │       │ Used in:       │
│           │ └──────┘└──────┘└──────┘       │  L3 tune,      │
│           │ ┌──────┐┌──────┐ …             │  L4 planing    │
│           │ │🖼aari ││🖼gunia│              │ Buy-order: #2  │
│           │ └──────┘└──────┘               │ [ Open lesson ]│
└───────────┴───────────────────────────────┴────────────────┘
```

---

## Cross-cutting states (apply to every screen)

- **Offline badge** (persistent, honest): `⛅ Offline — text, glossary & audio ready · video needs internet`.
- **Data-saver on**: all video is facade + size warning; images low-res; a small `data-saver ✓` chip in header.
- **Empty state (Home, no progress)**: `No saved lessons yet. [ Start L0 Safety ]` — an instruction, not an apology.
- **Video error (101/150 / offline)**: `This video can't play here. [ Watch on YouTube ↗ ]  — or read the steps below.`
- **Text-size [Aa]**: 3 steps (1.0 / 1.15 / 1.3); everything reflows, nothing clips (tested against longest Punjabi/Haryanvi strings).
- **Focus**: visible focus ring (`--accent`, ≥2px) on every interactive element; full keyboard order; `prefers-reduced-motion` seats spine joints instantly.

---

*Wireframes are for Phase 2 review. No UI code is written until Phase 2 is approved.*
