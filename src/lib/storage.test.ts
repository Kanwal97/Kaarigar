import { describe, it, expect, beforeEach } from 'vitest'
import { readJSON, writeJSON, readString, writeString } from './storage'

describe('storage (safe localStorage wrapper)', () => {
  beforeEach(() => localStorage.clear())

  it('round-trips a JSON value', () => {
    writeJSON('progress', { completedLessons: ['l00-workshop-setup'] })
    expect(readJSON('progress', null)).toEqual({ completedLessons: ['l00-workshop-setup'] })
  })

  it('returns the fallback for a missing key', () => {
    expect(readJSON('nope', 'fallback')).toBe('fallback')
  })

  it('round-trips a string', () => {
    writeString('theme', 'dark')
    expect(readString('theme')).toBe('dark')
  })

  it('returns null for a missing string key', () => {
    expect(readString('nope')).toBeNull()
  })
})
