import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { readString, writeString } from './storage'

// User preferences applied as data-* attributes on <html>. The visual state is set
// pre-paint by an inline script in index.html (no flash / no hydration mismatch);
// this context makes React the source of truth once mounted.

export type ThemePref = 'system' | 'light' | 'dark'
export type TextSize = 'normal' | 'large' | 'xlarge'
export type DataSaverPref = 'auto' | 'on' | 'off'

const THEME_KEY = 'theme'
const TEXT_KEY = 'text-size'
const DATASAVER_KEY = 'data-saver'

function applyTheme(t: ThemePref): void {
  const root = document.documentElement
  if (t === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', t)
}

function applyTextSize(s: TextSize): void {
  const root = document.documentElement
  if (s === 'normal') root.removeAttribute('data-text-size')
  else root.setAttribute('data-text-size', s)
}

interface PreferencesValue {
  theme: ThemePref
  setTheme: (t: ThemePref) => void
  textSize: TextSize
  setTextSize: (s: TextSize) => void
  dataSaver: DataSaverPref
  setDataSaver: (d: DataSaverPref) => void
}

const PreferencesContext = createContext<PreferencesValue | null>(null)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  // Initialize to defaults so the first client render matches the prerendered HTML.
  // Saved values are read AFTER mount (below) to avoid a hydration mismatch.
  const [theme, setThemeState] = useState<ThemePref>('system')
  const [textSize, setTextSizeState] = useState<TextSize>('normal')
  const [dataSaver, setDataSaverState] = useState<DataSaverPref>('auto')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const t = readString(THEME_KEY)
    const s = readString(TEXT_KEY)
    const d = readString(DATASAVER_KEY)
    if (t === 'light' || t === 'dark' || t === 'system') setThemeState(t)
    if (s === 'large' || s === 'xlarge' || s === 'normal') setTextSizeState(s)
    if (d === 'auto' || d === 'on' || d === 'off') setDataSaverState(d)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) applyTheme(theme)
  }, [theme, hydrated])

  useEffect(() => {
    if (hydrated) applyTextSize(textSize)
  }, [textSize, hydrated])

  const setTheme = (t: ThemePref) => {
    setThemeState(t)
    writeString(THEME_KEY, t)
  }
  const setTextSize = (s: TextSize) => {
    setTextSizeState(s)
    writeString(TEXT_KEY, s)
  }
  const setDataSaver = (d: DataSaverPref) => {
    setDataSaverState(d)
    writeString(DATASAVER_KEY, d)
  }

  return (
    <PreferencesContext.Provider
      value={{ theme, setTheme, textSize, setTextSize, dataSaver, setDataSaver }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences(): PreferencesValue {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider')
  return ctx
}
