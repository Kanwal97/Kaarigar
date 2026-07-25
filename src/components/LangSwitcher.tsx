import { Link, useLocation } from 'react-router-dom'
import { LOCALES, LOCALE_LABEL, localeFromPath, switchLocalePath } from '../i18n/locales'

// Compact language menu. Uses <details> so it works without JS and is keyboard/
// screen-reader friendly. Each option navigates to the SAME page in that language
// (a real prerendered sibling URL), so position is preserved.
export function LangSwitcher() {
  const { pathname } = useLocation()
  const current = localeFromPath(pathname)
  if (!current) return null
  return (
    <details className="langsw">
      <summary className="ctl">
        <span aria-hidden="true" className="ctl__icon">🌐</span>
        <span lang={current}>{LOCALE_LABEL[current]}</span>
      </summary>
      <ul className="langsw__menu">
        {LOCALES.map((l) => (
          <li key={l}>
            <Link
              to={switchLocalePath(pathname, l)}
              lang={l}
              aria-current={l === current ? 'true' : undefined}
            >
              {LOCALE_LABEL[l]}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}
