// Safe localStorage wrapper. Every access is guarded because private/incognito modes
// can throw on access or wipe data at session end (docs/RESEARCH.md §1.4). Progress and
// preferences are small JSON blobs, so localStorage is the right store (docs/PLAN.md §2.4).

const NS = 'kaarigar:'

export function readString(key: string): string | null {
  try {
    return localStorage.getItem(NS + key)
  } catch {
    return null
  }
}

export function writeString(key: string, value: string): void {
  try {
    localStorage.setItem(NS + key, value)
  } catch {
    /* private mode or quota exceeded — preferences simply won't persist this session */
  }
}

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(NS + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}
