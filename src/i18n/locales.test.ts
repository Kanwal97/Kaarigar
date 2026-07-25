import { describe, it, expect } from 'vitest'
import { isLocale, localeFromPath, switchLocalePath } from './locales'

describe('locale utils', () => {
  it('detects valid locales', () => {
    expect(isLocale('hi')).toBe(true)
    expect(isLocale('bgc')).toBe(true)
    expect(isLocale('xx')).toBe(false)
  })

  it('reads the locale from a path', () => {
    expect(localeFromPath('/hi/level/l00')).toBe('hi')
    expect(localeFromPath('/en')).toBe('en')
    expect(localeFromPath('/')).toBeNull()
    expect(localeFromPath('/styleguide')).toBeNull()
  })

  it('switches the locale segment, keeping the rest of the page', () => {
    expect(switchLocalePath('/hi/lesson/l05-mortise-tenon', 'pa')).toBe('/pa/lesson/l05-mortise-tenon')
    expect(switchLocalePath('/en', 'bgc')).toBe('/bgc')
    expect(switchLocalePath('/', 'en')).toBe('/en')
  })
})
