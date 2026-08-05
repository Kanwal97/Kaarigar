import { useLocation } from 'react-router-dom'
import { usePreferences, type ThemePref } from '../../lib/preferences'
import { localeFromPath, DEFAULT_LOCALE } from '../../i18n/locales'
import { t } from '../../i18n/ui'

const ORDER: ThemePref[] = ['system', 'light', 'dark']
const ICON: Record<ThemePref, string> = { system: '◐', light: '☀', dark: '☾' }
const LABEL_KEY: Record<ThemePref, string> = { system: 'ctl.auto', light: 'ctl.light', dark: 'ctl.dark' }

// Cycles system → light → dark. Label is localised + spoken for screen readers; icon decorative.
export function ThemeToggle() {
  const { theme, setTheme } = usePreferences()
  const lang = localeFromPath(useLocation().pathname) ?? DEFAULT_LOCALE
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]!
  const label = (th: ThemePref) => t(LABEL_KEY[th], lang)
  return (
    <button
      type="button"
      className="ctl themetoggle"
      onClick={() => setTheme(next)}
      aria-label={`${t('me.theme', lang)}: ${label(theme)} → ${label(next)}`}
    >
      <span aria-hidden="true" className="ctl__icon">{ICON[theme]}</span>
      <span className="ctl__txt">{label(theme)}</span>
    </button>
  )
}
