# Phase 2 — Ideation & Wireframing

Input: [Phase 1 — Research & Empathy](PHASE-1-RESEARCH.md), findings A–J.
Output: the decisions Phase 3 implements, and wireframes to build against.

Method: for each significant problem, **diverge widely** (AI is good at enumerating options fast and without ego), then **converge by human judgment** against the Phase 1 constraints. Options rejected are recorded with the reason — a rejected option with a stated reason is a decision; an unrecorded one is a gap someone will re-propose in six months.

---

## 2.1 The Joinery Spine — the one that matters

**Problem (Finding A):** the signature element is a coloured dot. `spine.joint` names a real joint per level and nothing reads it.

### Options considered

| # | Idea | Verdict |
|---|---|---|
| 1 | Keep dots, add a joint *photo* per level | ✗ Photos cost bytes, need sourcing/licensing, look wrong at 24 px, and can't be recoloured for dark mode or state |
| 2 | One big animated SVG spine, joints sliding together on completion | ✗ Ambitious and pretty; a single SVG is hard to make into 11 separate ≥48 px tap targets with individual labels and focus rings. Accessibility loses |
| 3 | **Per-level inline SVG joint mark, drawn in two parts (pin + socket), that seat together on completion** | ✓ **Chosen** |
| 4 | Isometric 3D joints | ✗ Beautiful at 200 px, illegible at 40 px, and the whole path must fit one mobile screen |
| 5 | Progress ring per level | ✗ Generic. This is the exact "course app with a wood palette" outcome the spine exists to avoid |

### Chosen design

Each level gets a **44 × 44 px mark** drawn as two pieces — a **pin** (the projecting part) and a **socket** (the receiving part) — in the geometry of the joint that level actually teaches:

```
anchor (L0)      marking (L1,L2)   sawn-edge (L3,L4)  butt (L6)
┌────────┐       ┌ ─ ─ ─ ─┐        ┌────────┐         ┌───┬────┐
│▓▓▓▓▓▓▓▓│       │  │  │  │        │╱╲╱╲╱╲╱ │         │▓▓▓│    │
│▓▓▓▓▓▓▓▓│       │  │  │  │        │        │         │▓▓▓│    │
└────────┘       └ ─ ─ ─ ─┘        └────────┘         └───┴────┘
a solid block    scribed lines     a cut edge         two faces meeting

dado (L7)        mortise-tenon(L5) carcass (L9)       finished (L8,L10)
┌──┬──┬──┐       ┌────┐┌───┐       ┌────┬───┐         ┌────────┐
│  │▓▓│  │       │  ▓▓├┤▓▓ │       │    │   │         │▒▒▒▒▒▒▒▒│
│  │▓▓│  │       │  ▓▓├┤▓▓ │       ├────┼───┤         │▒▒▒▒▒▒▒▒│
└──┴──┴──┘       └────┘└───┘       └────┴───┘         └────────┘
housing + shelf  tenon into mortise a box assembled   a polished face
```

**States** — three, and each is carried by **shape + colour + label**, never colour alone:

| State | Mark | Colour | Label |
|---|---|---|---|
| completed | pin **seated** into socket, filled | `--success` | localised "done" + ✓ |
| in progress | pin **offset** from socket, outlined, `--cta` marker | `--cta` | localised "3/4" |
| available | both parts outlined, apart | `--border-strong` | localised "start" |
| coming | ghosted, dashed | `--line` | localised "coming" |

**Motion:** on completion the pin translates ~6 px into the socket over 200 ms. Under `prefers-reduced-motion` it is simply drawn seated. **The diagram is the signature; the motion is garnish** — this was already the stated policy and it holds.

**Why this survives scrutiny:** it is the subject rendering itself. Progress in a joinery curriculum *is* assembly. It costs ~150 bytes of path data per joint, recolours by `currentColor`, scales from 24 px to 64 px, and every mark remains a labelled, focusable, ≥48 px link.

---

## 2.2 Desktop — stop treating 1440 px like 360 px

**Problem (Finding B):** `--measure` (66 ch) caps the *page*, not the *prose*.

**Decision:** three layout tiers, and the measure applies only to running text.

```
< 900px    single column, bottom tab bar        (unchanged — it works)
900–1199   nav rail 240px + content, measure-capped prose, wider cards
≥ 1200     nav rail 240px + content + context rail 300px
```

The **context rail** is what desktop earns. It is never navigation-critical (mobile has no rail, so anything essential must live in the main column) — it is *reference you want while reading*:

- **Lesson:** tools, materials, hazards, "you are here" position in the level, mark-complete.
- **Level:** at-a-glance — tools used, woods used, hazards covered, prerequisite lessons.
- **Home:** progress summary + streak, so the main column is purely the path.

### HOME — desktop ≥1200

```
┌──────────┬──────────────────────────────────────────┬──────────────────┐
│ Kaarigar │ [ 🔍 Search lessons, tools, wood…      ]  │        [अ] [☾]   │
│          ├──────────────────────────────────────────┴──────────────────┤
│ ▣ Learn  │  ┌────────────────────────────────────┐  │ YOUR PROGRESS    │
│ ▤ Tools  │  │ CONTINUE                           │  │  ◐ 12 / 27       │
│ ▥ Build  │  │ Mortise & tenon                    │  │  ████████░░ 44%  │
│ ▧ Fix It │  │ L5 · Joinery      [ ▶ Resume ]     │  │                  │
│ ▨ Me     │  └────────────────────────────────────┘  │  🔥 3-day streak │
│          │                                          │                  │
│  ⚿ L0 ✓  │  THE PATH                                │ JUMP IN          │
│  ⚿ L1 ✓  │  ⚿  L0 · Safety & setup           done   │  [ Tools    ]    │
│  ⚿ L2 ◐  │  ⚿  L1 · Wood & sheet goods       done   │  [ Build    ]    │
│  ⚿ L3    │  ⚿  L2 · Measuring & marking      2/2    │  [ Fix It   ]    │
│  …       │  ⚿  L3 · Hand tools               start  │                  │
└──────────┴──────────────────────────────────────────┴──────────────────┘
```

### LESSON — desktop ≥1200 (the two-column the wireframes always promised)

```
┌──────────┬─────────────────────────────────┬──────────────────────┐
│ sidebar  │ ‹ L5 Joinery                    │ (sticky)             │
│          │                                 │ LESSON 4 OF 6        │
│ L5 ◂     │ Mortise & tenon                 │ ●───●───●───◐───○───○│
│ 1 Butt ✓ │ [intermediate] [35 min] [4/6]   │                      │
│ 2 Lap  ✓ │                                 │ TOOLS                │
│ 3 Dado ✓ │ [ 🔊 Read aloud  🐢 1× 🐇 ]      │  ▤ chisel            │
│ 4 M&T ◂  │                                 │  ▤ tenon saw         │
│ 5 Dowel  │ YOU'LL BE ABLE TO               │  ▤ mallet            │
│ 6 Dovet. │  ✓ lay out a tenon              │ WOOD                 │
│          │  ✓ chop a clean mortise         │  ▥ sheesham          │
│          │ ┌─────────────────────────────┐ │ ! SAFETY             │
│          │ │   ▶  facade · 18MB · HI     │ │  chisel cut → clamp  │
│          │ └─────────────────────────────┘ │  (DGT, cited)        │
│          │ STEPS  1 … 2 … 3 …              │                      │
│          │ PRACTICE …   SELF-CHECK …       │ [ ✓ Mark complete ]  │
└──────────┴─────────────────────────────────┴──────────────────────┘
```

Prose in the middle column stays ≤66 ch. The rail is reference, duplicated (not moved) from the main column so mobile loses nothing.

---

## 2.3 Search — one tap, from anywhere

**Problem (Finding F):** good search, hidden behind a sub-nav on three pages.

| Option | Verdict |
|---|---|
| Sixth tab | ✗ 320 px ÷ 6 = 53 px per tab. Labels in Devanagari won't fit; targets crowd |
| Replace "Fix It" tab with Search | ✗ Fix It is a distinct *intent* (something went wrong), not a search result type |
| **Persistent search affordance in the header** | ✓ **Chosen** — icon button on mobile, real input on desktop |
| Floating action button | ✗ Covers content, conflicts with the thumb-zone primary action |

Mobile header becomes: **wordmark · search · display-settings menu**. Three targets, one row, fits 320 px. Language + theme move into the settings menu (they're set-once); **text size stays one tap deep** because glare and tired eyes are situational, mid-lesson problems.

```
mobile ≤560                          desktop ≥900
┌─────────────────────────────┐      ┌──────────────────────────────────┐
│ ◆ Kaarigar      [🔍]  [अ ▾] │      │ [ 🔍 Search everything… ] [अ ▾]  │
└─────────────────────────────┘      └──────────────────────────────────┘
        wordmark  search  display            inline search field
```

Home also gets a search entry above the fold, because Sukhwinder's session starts and ends there.

---

## 2.4 Iconography — one drawn set

**Problem (Finding E):** emoji as UI iconography; 🔧 means four different tools.

**Decision:** a single inline-SVG set, `currentColor`, 24 px glyph in a ≥44 px tile, always with a text label. Drawn from the objects themselves, not from generic app-icon vocabulary:

```
randa (plane)  aari (saw)   rukhani (chisel)  gunia (square)  hathoda (mallet)
   ▁▁▁▁▁        ╱╲╱╲╱╲         ▁▁▁▁▔▔▏          ┌───            ▔▔▔▏
  ▕█████▏       ────────       ▕████████▏        │              ████▏
   ▔▔╲▔▔         ▏     ▏        ▔▔▔▔▔▔           │  ╲            ▔▔▔▏

timber        sheet good     finish/polish    measuring tape   drill
  ╭───╮        ▔▔▔▔▔▔▔         ╭─╮              ╭──────╮         ▕▔▔▏
  │ ◎ │        ▔▔▔▔▔▔▔         │▓│ ~~~          │ ▁▁▁▁ │         ████▏
  ╰───╯        ▔▔▔▔▔▔▔         ╰─╯              ╰──────╯         ▕▁▁▏
```

Sizes: 20 (inline), 24 (default), 32 (entity tile), 44 (jump card).
Rule kept from `DESIGN.md`: **never an icon alone.** Label always present; `aria-hidden` on the glyph.

Cost check: ~28 icons × ~120 bytes of path ≈ 3.4 KB uncompressed in the JS bundle, ~1.2 KB gzipped — against `emoji.ts`'s 2.1 KB of lookup tables that it replaces. Effectively free, and it renders the same on every device.

---

## 2.5 Level page — earn its place

Today the Level page is a title, an outcome sentence, a progress bar, and a list. The wireframes promised prerequisites and "at a glance". Both content sources already exist (`lesson.prerequisites`, `lesson.tools`, `lesson.materials`, `lesson.hazards`) and are simply not aggregated.

```
┌─────────────────────────────┐
│ ‹ Home                      │
│ ⚿  L5 · JOINERY             │  ← the level's own joint mark, large
│ After this you can cut a    │
│ butt, lap, dado and M&T.    │
│ ████░░░░░░  1 / 3 lessons   │
├─────────────────────────────┤
│ IN THIS LEVEL               │  ← aggregated from the level's lessons
│ ▤ chisel  ▤ tenon saw  …    │
│ ▥ sheesham  ▥ ply           │
│ ! 2 safety topics           │
├─────────────────────────────┤
│ ① Butt & lap joints    20m ✓│
│ ② Mortise & tenon      35m  │
│ ③ Dovetail             45m  │
└─────────────────────────────┘
```

---

## 2.6 Hydration — a skeleton, not a swap

**Problem (Finding H):** prerendered HTML says "Start here"; hydration rewrites it to "Continue".

**Decision:** the prerendered state renders the **same shape** as the hydrated state — same card height, same spine rows, same progress bar — with values in a neutral resting state. Hydration fills numbers in; nothing reflows.

```
prerendered (no JS yet)         hydrated (returning user)
┌───────────────────────┐       ┌───────────────────────┐
│ START HERE            │  →    │ CONTINUE              │
│ L0 · Safety & setup   │       │ Mortise & tenon       │
│         [ ▶ Start ]   │       │        [ ▶ Resume ]   │
└───────────────────────┘       └───────────────────────┘
   identical box, identical height — text swaps, layout does not
```

Same for the spine: every row renders at its final height with its label; only status pills and joint seating change on hydration.

---

## 2.7 Decisions log

| Decision | Rationale | Reversible? |
|---|---|---|
| Joint marks as two-part SVG per level | Signature element made real; accessible per-node | Yes — swap `JointMark` |
| Three layout tiers; measure applies to prose only | Desktop earns its width without hurting reading | Yes — CSS only |
| Search in the header, not a sixth tab | Thumb crowding at 320 px is real; search is cross-cutting | Yes |
| Language + theme into a display menu; text size stays direct | Set-once vs situational | Yes |
| One drawn icon set; retire `emoji.ts` | Design rule already said so; emoji can't be recoloured or disambiguated | Yes |
| CSS merged into single-source-per-component layers | Two files defining one component is how D, I and J happened | No — structural |
| Palette, type, and contrast contract unchanged | Verified, and the audience constraint (sun/dust) has not changed | — |
| Streak kept neutral; no loss state | No evidence it motivates; strong reason to think shame demotivates | Yes |

---

## 2.8 Explicitly not doing

- **Not** re-deriving the palette. It is contrast-verified and culturally argued. Changing it would cost the AAA body contrast and buy nothing a user can feel.
- **Not** changing the five-tab IA. Learn / Tools / Build / Fix It / Me maps to real, distinct intents.
- **Not** adding accounts, sync, comments, or gamified points. Non-goals in the README, and rightly so.
- **Not** touching the video facade. It is the best-designed thing in the codebase.
- **Not** adding a build-time dependency. Zero runtime styling library, zero icon package — inline SVG and plain CSS, as before.

---

*Phase 2 output feeds [Phase 3 — Visual Design & Component System](PHASE-3-SYSTEM.md).*
