// In-memory localStorage polyfill so storage tests run under the fast 'node'
// environment (jsdom is too slow to start in this sandbox).
class MemStorage {
  private m = new Map<string, string>()
  getItem(k: string): string | null {
    return this.m.has(k) ? this.m.get(k)! : null
  }
  setItem(k: string, v: string): void {
    this.m.set(k, String(v))
  }
  removeItem(k: string): void {
    this.m.delete(k)
  }
  clear(): void {
    this.m.clear()
  }
  key(i: number): string | null {
    return [...this.m.keys()][i] ?? null
  }
  get length(): number {
    return this.m.size
  }
}

globalThis.localStorage = new MemStorage() as unknown as Storage
