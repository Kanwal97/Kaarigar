// Tiny client-side search — no library, no prebuilt index file (the content set is small).
// Works for Latin (case/diacritic-insensitive) AND Devanagari/Gurmukhi (raw substring),
// so a carpenter can search "randa", "रंदा", or "ਰੰਦਾ".

export function normalize(s: string): string {
  return s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').trim()
}

// Join any localized map's values + extra strings into one searchable haystack.
export function keywords(...parts: Array<string | Record<string, string | undefined> | undefined>): string {
  const out: string[] = []
  for (const p of parts) {
    if (!p) continue
    if (typeof p === 'string') out.push(p)
    else out.push(...Object.values(p).filter((v): v is string => typeof v === 'string'))
  }
  return out.join(' ')
}

// Every whitespace-separated token in the query must appear in the haystack.
export function matchesQuery(haystack: string, query: string): boolean {
  const q = normalize(query)
  if (!q) return true
  const h = normalize(haystack)
  return q.split(/\s+/).every((token) => h.includes(token))
}
