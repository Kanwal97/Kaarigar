import { useEffect } from 'react'
import { Outlet, useLocation, useNavigation, Link } from 'react-router-dom'
import { PreferencesProvider } from '../lib/preferences'
import { ProgressProvider } from '../lib/progress'
import { localeFromPath } from '../i18n/locales'
import { t } from '../i18n/ui'
import { LangSwitcher } from './LangSwitcher'
import { ThemeToggle } from './controls/ThemeToggle'
import { TextSizeControl } from './controls/TextSizeControl'
import { BottomTabBar } from './nav/BottomTabBar'
import { OfflineBadge } from './OfflineBadge'
import { Icon } from './ui/Icon'

// App shell. Full chrome (top bar + tab bar) shows only when a locale is active;
// the "/" language-select splash renders bare. Everything sits inside
// PreferencesProvider so theme/text-size controls work anywhere.
//
// Redesign Phase 3 (docs/redesign/PHASE-2-IDEATION.md §2.3): the bar now carries a
// permanent search affordance — the unified search route existed but was reachable
// only from the discovery sub-nav, which is exactly the user who can't guess a
// category. Theme moves to ≥900px only (it is a set-once preference and always lives
// in Me); text size stays direct on every screen, because glare and tired eyes are
// mid-lesson problems.
export default function Layout() {
  const { pathname } = useLocation()
  const locale = localeFromPath(pathname)
  const lang = locale ?? 'en'
  // React Router sets this to 'loading' while a route's lazy loader runs (e.g. a lesson
  // body chunk) — we surface it as a top progress bar so a tap on a slow connection has
  // immediate feedback instead of a frozen-looking page.
  const navigation = useNavigation()
  const busy = navigation.state !== 'idle'

  // Keep <html lang> in sync with the active locale for screen readers (the static
  // prerendered pages default to en; this corrects it on the client after hydration).
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // Reset scroll to the top on every navigation — otherwise "Next lesson" (a link at the
  // bottom of a long page) drops you at the bottom of the next one. Guarded for SSR.
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }, [pathname])

  return (
    <PreferencesProvider>
      <ProgressProvider>
        <a href="#main" className="skip-link">
          {t('a11y.skip', lang)}
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
              <Link to={`/${locale}/search`} className="topsearch" aria-label={t('nav.search', locale)}>
                <Icon name="search" size={22} />
                <span className="topsearch__label" aria-hidden="true">
                  {t('search.everything', locale)}
                </span>
              </Link>
              <div className="topbar__controls">
                <LangSwitcher />
                <TextSizeControl />
                <ThemeToggle />
              </div>
            </header>
          )}
          <main id="main" className="shell__main" tabIndex={-1} aria-busy={busy || undefined}>
            <OfflineBadge locale={lang} />
            <Outlet />
          </main>
          {locale && <BottomTabBar locale={locale} />}
        </div>
      </ProgressProvider>
    </PreferencesProvider>
  )
}
