# Needs sourcing

Open items that must be filled by a human before the affected content can ship. **Never invent a YouTube ID, view count, or safety claim to close one of these.**

## 1. Videos

**Status (2026-07-25):** **25 of 27 lessons now carry oEmbed-verified, embeddable videos** (L0–L9; only the two L10 business lessons are text-only by design). 39 video IDs total, each verified twice (sourcing agent + independent re-check) and re-checked every build by `verify:videos`. **Most L1/L2/L6/L7/L8/L9 primaries are Hindi/Indian creators; L3–L5 joinery + a few others fall back to English (Paul Sellers, Matt Estlea, RobCosman, SIKANA) — language labelled honestly.** STILL OPEN: a human must **watch each video** to confirm teaching quality before `reviewStatus` → `expert-reviewed`; Hindi alternates still wanted for the English-primary lessons. (Original L0 notes below.)

**Original L0 note:** L0 primary videos:

- **(a) Human content review** — a person must watch each assigned video and confirm it teaches the lesson correctly and safely before `reviewStatus` moves to `expert-reviewed`.
- **(b) Hindi-language video** — no Hindi *carpentry-specific* safety video was found for PPE/dust or machine safety. When one is found, add it as `role: "alternate-language"` (lang `hi`) and, if better than the English one, promote it to `primary`. Re-run the oEmbed check on any new ID.

Currently assigned (all oEmbed-verified `embeddable: true`):

| Lesson | Primary | Other |
|---|---|---|
| `l00-workshop-setup` | `X-H3Urf6SrM` — **SIKANA Hindi (Hindi, woodworking safety)** | `tKWs5tcvlII` — Steve Ramsey (English deep-dive) |
| `l00-ppe-and-dust` | `NKKr7He6bFo` — Mick's Woodwork Wonders (English) | `TWNyk0ZeeVA` — Mike Peace Woodturning (English deep-dive) |
| `l00-machine-safety` | `Q343AGb8v0E` — The Honest Carpenter (English) | `uU-4p-X8AOg` — WoodWorkWeb (English deep-dive) |

**Rejected on human review:** `wCbrDTd6mNM` (NIMI Punjabi "Safety Precautions While Handling the Tools") — oEmbed-verified but **not a woodworking video** on watching; removed. Lesson: oEmbed proves a video exists/embeds, never that it's on-topic — a human must watch before assigning.

**Indian/Hindi status:** workshop-setup has a **Hindi** primary. Still wanted: a **Punjabi** woodworking-safety video, and Hindi videos for **PPE/dust** and **machine-safety** (no suitable Indian *safety* video found yet — the Hindi results were build/how-to demos). All non-workshop primaries honestly stay English for now.

**Best lead for Hindi PPE + machine-safety:** the **NIMI Digital Hindi** ("NIMIDIGITALHINDI") Carpenter / Wood Work Technician playlist — NIMI publishes these in Hindi (its Punjabi + English siblings are already verified: `wCbrDTd6mNM`, `q3D-Ey7nB7s`, `uEjWIzMvn90`). Browse that channel to pull the Hindi PPE/machine-safety IDs, oEmbed-verify, then add as `role: "alternate-language"` (or promote to primary). CI re-checks every ID on each build.

## 1a. Content coverage (levels authored)

- **Authored (en + hi):** L0 Safety (3 lessons), **L1 Wood & sheet goods (2 lessons)**, **L2 Measuring & marking (2 lessons)**.
- **Not yet authored:** L3–L10 (Hand tools, Sawing/planing/chiselling, Joinery, Fasteners & hardware, Power tools, Sanding & finishing, Real projects, The trade). They show as "coming" on the spine until authored.
- **Videos for L1/L2 lessons:** not yet sourced — these lessons ship with no video (no broken `TODO`), text-first. Source Hindi videos on: timber identification, choosing plywood grades (MR/BWR/BWP), measuring & marking, using a try-square/gunia. Verify via oEmbed, then add.

## 2. Translations — Punjabi (`pa`) & Haryanvi (`bgc`)

Default is **no machine translation** shipped as authored (a hard rule — Haryanvi has no standard orthography and auto-translation reads as broken Hindi). Until a human fills them, the UI shows an honest fallback badge ("Punjabi coming — showing Hindi").

**Opt-in machine-draft (badged):** `l00-workshop-setup` now carries a **machine-draft** `pa` (Gurmukhi) + `bgc` (Haryanvi) as a demonstration — these render in-language **with a visible "machine draft — may have mistakes" badge**, never as authored. A human translator should correct them and switch `translationStatus` to `authored` (or `draft-needs-review` while checking). This is the pattern to extend to other lessons on request.

| Content | pa | bgc |
|---|---|---|
| `l00-workshop-setup` | needs human translation | needs human (Haryanvi) narrator/translator |
| `l00-ppe-and-dust` | needs human translation | needs human (Haryanvi) |
| `l00-machine-safety` | needs human translation | needs human (Haryanvi) |
| L0 hazards, tools, glossary | pa/bgc names & text | pa/bgc names & text |

Set `translationStatus.<lang>` to `authored` only when a human has written it. `machine-draft` is allowed **only** if explicitly badged as such in the UI.

## 3. Expert review (safety)

Every L0 lesson and every hazard is `reviewStatus: "needs-expert-review"`. A qualified trade-safety reviewer (ITI Carpenter instructor / NSDC FFSC assessor / OSH professional) must sign off; then set `reviewStatus: "expert-reviewed"` and `reviewedBy`.

## 4. Audio narration

`audio` slots are empty. Record short Hindi narration per lesson first (highest-leverage for low-literacy users), then Punjabi/Haryanvi. File path convention: `audio/{lang}/{lessonId}.mp3`.

## 5. Local tool/wood terms

`tools.json` / `woods.json` / `glossary.json` have empty `pa`/`bgc` name fields and some `verified: false` rows (e.g. `table-saw` → "patti aari"). A local tradesperson/translator should confirm the Punjabi & Haryanvi workshop terms before they are presented as fact.
