# Contributing to Kaarigar

You do **not** need to be a programmer to help. The two most valuable things you can do — **add a lesson** and **translate a language** — are done by editing simple text files on github.com. This guide shows you how.

Everything you edit lives in the `content/` folder. When you save a change, an automatic check makes sure the file is still valid before it goes live.

---

## The three rules (please never break these)

1. **Never invent a YouTube video.** If you don't have a real, checked video, leave `"videoId": "TODO"` (or no video at all) and add a note in `content/_needs-sourcing.md`. A fake video is a broken lesson for a real learner.
2. **Never write safety advice from memory.** Every hazard must link to a real source (OSHA, HSE, ILO, a manufacturer manual, or the ITI/NSDC syllabus). Safety pages stay marked `"reviewStatus": "needs-expert-review"` until a qualified person signs off.
3. **Never machine-translate Punjabi or Haryanvi.** Auto-translation reads as broken language and destroys trust. Leave those blank — the app honestly shows "Punjabi coming — showing Hindi" until a human writes it.

---

## Add a lesson (no coding)

1. Go to the `content/lessons/` folder on github.com and open an existing lesson (e.g. `l01-identify-timbers.json`) to copy its shape.
2. Click **Add file → Create new file**. Name it like `l03-sharpen-a-chisel.json` (level number, then a short name).
3. Paste the structure below and fill it in. Keep the quotes and commas exactly.

```jsonc
{
  "id": "l03-sharpen-a-chisel",      // must match the file name (without .json)
  "level": 3,                         // which level (0–10)
  "order": 1,                         // position within the level
  "difficulty": "beginner",           // beginner | intermediate | advanced
  "estMinutes": 12,
  "tools": ["chisel-firmer", "mallet"],   // ids that exist in content/tools/tools.json
  "materials": [],                         // ids from content/woods/woods.json
  "hazards": ["chisel-cut"],               // ids from content/hazards/hazards.json
  "reviewStatus": "needs-expert-review",
  "translationStatus": { "en": "authored", "hi": "authored", "pa": "missing", "bgc": "missing" },
  "i18n": {
    "en": {
      "title": "Sharpen a chisel",
      "objectives": ["What the learner can do after this lesson"],
      "summary": "One or two lines of why this matters.",
      "steps": ["Step 1 …", "Step 2 …"],
      "practice": "A hands-on task to try."
    },
    "hi": {
      "title": "छेनी को धार दें",
      "objectives": ["…"],
      "summary": "…",
      "steps": ["…"],
      "practice": "…"
    }
  },
  "selfCheck": [
    {
      "q": { "en": "A question?", "hi": "एक सवाल?" },
      "options": [
        { "en": "Wrong", "hi": "गलत" },
        { "en": "Right", "hi": "सही" }
      ],
      "answerIndex": 1,
      "explain": { "en": "Why.", "hi": "क्यों।" }
    }
  ]
}
```

4. Open `content/levels/l03.json` and add your lesson's `id` to its `"lessons"` list (in the order it should appear). If the level file doesn't exist yet, copy `content/levels/l01.json` and change the details.
5. Click **Commit changes** → **Propose changes** → **Create pull request**. The automatic check runs. If it's red, click "Details" — the message tells you which field is wrong.

**Tips**
- `tools`, `materials`, `hazards` must use **ids that already exist** in those files. To add a new tool/wood/hazard, add it to `content/tools/tools.json` / `woods/woods.json` / `hazards/hazards.json` first.
- You can leave out `videos` entirely — the lesson just shows the written steps until a video is sourced.

## Translate a language

1. Open the lesson (or `tools.json` / `woods.json` / `glossary.json`) you want to translate.
2. Fill in the missing language block — for Punjabi use `"pa"`, for Haryanvi use `"bgc"`. Match the English/Hindi structure exactly.
3. In the lesson's `translationStatus`, change that language from `"missing"` to `"authored"`. **Only do this once a human has really written it.** (`"machine-draft"` is allowed only if the app will clearly badge it as a draft.)
4. Commit → open a pull request.

Until a language is `"authored"`, the app automatically shows the Hindi (or English) version with an honest badge — so a half-finished translation never gets mislabelled.

## Add or replace a video (with a real check)

1. Find the video on YouTube. Copy the 11-character id from the URL (`watch?v=XXXXXXXXXXX`).
2. **Check it's embeddable:** open `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=XXXXXXXXXXX&format=json`. A page of JSON = good. An error = don't use it.
3. **Watch it.** oEmbed only proves the video exists — it does not prove it's on-topic or correct. (We once verified a "safety" video that turned out to be unrelated.)
4. Add it to the lesson's `videos` list with the real `credit` (channel name) and set `"lang"` to the spoken language. Commit → PR. The build re-checks every id.

---

## Safety content needs an expert

If you add or edit a hazard or a safety lesson, it stays `"needs-expert-review"`. A qualified reviewer (an ITI Carpenter instructor, an NSDC/FFSC assessor, or an occupational-safety professional) must confirm it before we change it to `"expert-reviewed"` and add their name in `reviewedBy`.

## For developers

`npm install`, then: `npm run dev` (local server), `npm run validate:content` (schema + reference check), `npm run verify:videos` (oEmbed check), `npm run typecheck`, `npm run build`. See [README.md](README.md) for architecture and the deploy flow. Content schemas live in [`content/schema/`](content/schema/); the roadmap and design decisions are in [`docs/`](docs/).
