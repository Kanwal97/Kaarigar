import { useEffect } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { PreferencesProvider } from '../lib/preferences'
import { ProgressProvider } from '../lib/progress'
import { localeFromPath } from '../i18n/locales'
import { LangSwitcher } from './LangSwitcher'
import { ThemeToggle } from './controls/ThemeToggle'
import { TextSizeControl } from './controls/TextSizeControl'
import { BottomTabBar } from './nav/BottomTabBar'
import { OfflineBadge } from './OfflineBadge'

// App shell. Full chrome (top bar + tab bar) shows only when a locale is active;
// the "/" language-select splash renders bare. Everything sits inside
// PreferencesProvider so theme/text-size controls work anywhere.
export default function Layout() {
  const { pathname } = useLocation()
  const locale = localeFromPath(pathname)

  // Keep <html lang> in sync with the active locale for screen readers (the static
  // prerendered pages default to en; this corrects it on the client after hydration).
  useEffect(() => {
    document.documentElement.lang = locale ?? 'en'
  }, [locale])

  return (
    <PreferencesProvider>
      <ProgressProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className={`shell ${locale ? 'shell--app' : 'shell--bare'}`.trim()}>
        {locale && (
          <header className="topbar">
            <Link to={`/${locale}`} className="topbar__brand">
              Kaarigar
            </Link>
            <div className="topbar__controls">
              <LangSwitcher />
              <TextSizeControl />
              <ThemeToggle />
            </div>
          </header>
        )}
        <OfflineBadge locale={locale ?? 'en'} />
        <main id="main" className="shell__main" tabIndex={-1}>
          <Outlet />
        </main>
        {locale && <BottomTabBar locale={locale} />}
      </div>
      </ProgressProvider>
    </PreferencesProvider>
  )
}
