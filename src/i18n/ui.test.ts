import { describe, it, expect } from 'vitest'
import { t } from './ui'

describe('ui t()', () => {
  it('returns the string for the requested locale', () => {
    expect(t('nav.build', 'hi')).toBe('बनाओ')
    expect(t('nav.build', 'pa')).toBe('ਬਣਾਓ')
    expect(t('nav.build', 'en')).toBe('Build')
  })

  it('falls back to hi when a locale entry is absent', () => {
    // (all current keys have all locales; this guards the fallback path)
    expect(t('lesson.steps', 'bgc')).toBe('चरण')
  })

  it('returns the key itself for an unknown entry', () => {
    expect(t('does.not.exist', 'en')).toBe('does.not.exist')
  })
})
