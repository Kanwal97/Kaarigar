import { usePreferences, type ThemePref } from '../../lib/preferences'

const ORDER: ThemePref[] = ['system', 'light', 'dark']
const ICON: Record<ThemePref, string> = { system: '◐', light: '☀', dark: '☾' }
const LABEL: Record<ThemePref, string> = { system: 'Auto', light: 'Light', dark: 'Dark' }

// Cycles system → light → dark. Label is spoken for screen readers; the icon is decorative.
export function ThemeToggle() {
  const { theme, setTheme } = usePreferences()
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]!
  return (
    <button
      type="button"
      className="ctl"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${LABEL[theme]}. Switch to ${LABEL[next]}.`}
    >
      <span aria-hidden="true" className="ctl__icon">{ICON[theme]}</span>
      <span className="ctl__txt">{LABEL[theme]}</span>
    </button>
  )
}
