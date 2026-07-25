import { describe, it, expect } from 'vitest'
import { normalize, matchesQuery, keywords } from './search'

describe('search', () => {
  it('normalizes case and diacritics', () => {
    expect(normalize('Rándá')).toBe('randa')
  })

  it('matches all query tokens, order-independent', () => {
    expect(matchesQuery('Hello World', 'world hello')).toBe(true)
    expect(matchesQuery('Hello World', 'world xyz')).toBe(false)
  })

  it('matches Devanagari and Gurmukhi substrings', () => {
    expect(matchesQuery('रंदा · randa · plane', 'रंदा')).toBe(true)
    expect(matchesQuery('ਰੰਦਾ', 'ਰੰਦਾ')).toBe(true)
    expect(matchesQuery('रंदा', 'randa')).toBe(false)
  })

  it('empty query matches everything', () => {
    expect(matchesQuery('anything', '')).toBe(true)
  })

  it('keywords joins localized values and extra strings', () => {
    const hay = keywords({ en: 'saw', hi: 'आरी' }, 'aari')
    expect(hay).toContain('आरी')
    expect(hay).toContain('aari')
  })
})
