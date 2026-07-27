import { useEffect } from 'react'
import { Outlet, useLocation, useNavigation, Link } from 'react-router-dom'
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
  // React Router sets this to 'loading' while a route's lazy loader runs (e.g. a lesson
  // body chunk) — we surface it as a top progress bar so a tap on a slow connection has
  // immediate feedback instead of a frozen-looking page.
  const navigation = useNavigation()
  const busy = navigation.state !== 'idle'

  // Keep <html lang> in sync with the active locale for screen readers (the static
  // prerendered pages default to en; this corrects it on the client after hydration).
  useEffect(() => {
    document.documentElement.lang = locale ?? 'en'
  }, [locale])

  // Reset scroll to the top on every navigation — otherwise "Next lesson" (a link at the
  // bottom of a long page) drops you at the bottom of the next one. Guarded for SSR.
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }, [pathname])

  return (
    <PreferencesProvider>
      <ProgressProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="route-progress" data-busy={busy} aria-hidden="true">
        <i />
      </div>
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
        <main id="main" className="shell__main" tabIndex={-1} aria-busy={busy || undefined}>
          <Outlet />
        </main>
        {locale && <BottomTabBar locale={locale} />}
      </div>
      </ProgressProvider>
    </PreferencesProvider>
  )
}
