import { describe, it, expect } from 'vitest'
import { href } from './href'

// Base-agnostic: assert href composes BASE_URL + a single leading slash + path,
// whatever the configured base is.
const base = import.meta.env.BASE_URL.replace(/\/$/, '')

describe('href', () => {
  it('prefixes the base path', () => {
    expect(href('/lesson/x')).toBe(`${base}/lesson/x`)
  })
  it('adds exactly one leading slash when missing', () => {
    expect(href('audio/hi/l00.mp3')).toBe(`${base}/audio/hi/l00.mp3`)
  })
})
