import { NavLink } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'

const TABS = [
  { seg: 'search', key: 'nav.search' },
  { seg: 'tools', key: 'disc.tools' },
  { seg: 'woods', key: 'disc.woods' },
  { seg: 'glossary', key: 'disc.glossary' },
]

// Sub-navigation shared by the three discovery screens (docs/PLAN.md §2.2).
export function DiscoveryNav({ lang }: { lang: Locale }) {
  return (
    <nav className="discnav" aria-label={t('a11y.find', lang)}>
      {TABS.map((tab) => (
        <NavLink
          key={tab.seg}
          to={`/${lang}/${tab.seg}`}
          className={({ isActive }) => `discnav__tab ${isActive ? 'is-active' : ''}`.trim()}
        >
          {t(tab.key, lang)}
        </NavLink>
      ))}
    </nav>
  )
}
