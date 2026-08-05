import { NavLink } from 'react-router-dom'
import type { Locale } from '../../i18n/locales'
import { t } from '../../i18n/ui'
import { Icon, type IconName } from '../ui/Icon'

// 5 thumb-reachable tabs (docs/PLAN.md §2.2). Bottom bar on mobile; becomes a left
// rail on desktop (see components.css). Labels are localised via the UI dictionary.
const TABS: { seg: string; icon: IconName; key: string; end?: boolean }[] = [
  { seg: '', icon: 'learn', key: 'nav.learn', end: true },
  { seg: 'tools', icon: 'tools', key: 'nav.tools' },
  { seg: 'build', icon: 'build', key: 'nav.build' },
  { seg: 'fix', icon: 'fix', key: 'nav.fix' },
  { seg: 'me', icon: 'me', key: 'nav.me' },
]

export function BottomTabBar({ locale }: { locale: Locale }) {
  return (
    <nav className="tabbar" aria-label={t('a11y.mainNav', locale)}>
      {TABS.map((tab) => (
        <NavLink
          key={tab.seg || 'home'}
          to={`/${locale}${tab.seg ? `/${tab.seg}` : ''}`}
          end={tab.end}
          className={({ isActive }) => `tab ${isActive ? 'tab--active' : ''}`.trim()}
        >
          <Icon name={tab.icon} />
          <span className="tab__label">{t(tab.key, locale)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
