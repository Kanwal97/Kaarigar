#!/usr/bin/env python3
"""Subset the Indic (Devanagari + Gurmukhi) webfonts to the glyphs the app actually uses.

WHY: on every Hindi/Haryanvi page the two Devanagari faces (~161 KB) load; on Punjabi
pages the two Gurmukhi faces (~34 KB) load. These users are on low-end phones paying for
data, so byte weight is mission-relevant. The full fontsource files carry every Devanagari/
Gurmukhi conjunct glyph; the app only ever renders a bounded corpus.

SAFE BY CONSTRUCTION: we pass the ENTIRE app text corpus (every hi/bgc/pa string in
content/**.json + the UI dictionary) as the retained text, so pyftsubset guarantees every
glyph any app content needs is kept — content can never render as tofu. We additionally pin
ZWNJ/ZWJ (U+200C/D, conjunct control), the rupee sign, and the dotted circle. Only conjunct
glyphs that appear NOWHERE in the app are dropped; an out-of-corpus word (e.g. a rare search
term) then falls back to the explicit-halant form (readable), never tofu.

This is a MANUAL/local tool (needs `pip install fonttools brotli`), not a build step — the
subsetted .woff2 files are committed artifacts. Re-run after adding a new script/language to
the content so the corpus stays complete:  python scripts/subset-fonts.py

The Latin faces are left FULL (English body text + search accept any Latin input).
"""
import json
import re
import sys
from pathlib import Path
from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
FONTS = ROOT / "src" / "assets" / "fonts"
I18N = ROOT / "src" / "i18n"

# Unicode blocks
DEVA = lambda c: 0x0900 <= ord(c) <= 0x097F or 0x1CD0 <= ord(c) <= 0x1CF9 or 0xA8E0 <= ord(c) <= 0xA8FF
GURM = lambda c: 0x0A00 <= ord(c) <= 0x0A7F
# Always-keep control/symbol codepoints for each Indic face (join controls + rupee + dotted circle)
PIN = "‌‍₹◌।॥"


def collect_corpus() -> str:
    chunks = []

    def walk(v):
        if isinstance(v, str):
            chunks.append(v)
        elif isinstance(v, list):
            for x in v:
                walk(x)
        elif isinstance(v, dict):
            for x in v.values():
                walk(x)

    for p in CONTENT.rglob("*.json"):
        try:
            walk(json.loads(p.read_text(encoding="utf-8")))
        except Exception as e:
            print(f"  skip {p.name}: {e}", file=sys.stderr)
    # UI dictionary + locale labels live in .ts source — take their raw text (string literals
    # contain the pa/bgc/hi translations); non-Indic chars are filtered out per-face anyway.
    for name in ("ui.ts", "locales.ts"):
        f = I18N / name
        if f.exists():
            chunks.append(f.read_text(encoding="utf-8"))
    return "".join(chunks)


def face_text(corpus: str, keep) -> str:
    return PIN + "".join(sorted({c for c in corpus if keep(c)}))


def do_subset(infile: Path, text: str, unicodes: str):
    before = infile.stat().st_size
    args = [
        str(infile),
        f"--text={text}",
        f"--unicodes={unicodes}",
        "--layout-features=*",
        "--flavor=woff2",
        "--output-file=" + str(infile),  # overwrite in place
        "--drop-tables+=DSIG",
        "--no-hinting",
    ]
    subset.main(args)
    after = infile.stat().st_size
    print(f"  {infile.name}: {before:,} -> {after:,} B  ({100*(before-after)//before}% smaller)")


def main():
    corpus = collect_corpus()
    deva = face_text(corpus, DEVA)
    gurm = face_text(corpus, GURM)
    print(f"corpus: {len(corpus):,} chars | distinct Devanagari: {len(set(c for c in corpus if DEVA(c)))} | Gurmukhi: {len(set(c for c in corpus if GURM(c)))}")

    # Pin the whole base blocks too (via --unicodes) so any single letter a user might TYPE
    # into search still renders; only unused *conjunct* glyphs get dropped.
    deva_uni = "U+0900-097F,U+1CD0-1CF9,U+200C-200D,U+20A8,U+20B9,U+20F0,U+25CC,U+A830-A839,U+A8E0-A8FF,U+11B00-11B09"
    gurm_uni = "U+0951-0952,U+0964-0965,U+0A01-0A76,U+200C-200D,U+20B9,U+25CC,U+262C,U+A830-A839"

    print("Devanagari faces:")
    for fn in ("mukta-devanagari-400-normal.woff2", "baloo-2-devanagari-600-normal.woff2"):
        do_subset(FONTS / fn, deva, deva_uni)
    print("Gurmukhi faces:")
    for fn in ("mukta-mahee-gurmukhi-400-normal.woff2", "baloo-paaji-2-gurmukhi-600-normal.woff2"):
        do_subset(FONTS / fn, gurm, gurm_uni)


if __name__ == "__main__":
    main()
