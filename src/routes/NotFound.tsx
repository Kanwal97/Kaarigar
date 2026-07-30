import { Link, useLocation } from 'react-router-dom'
import { localeFromPath, DEFAULT_LOCALE } from '../i18n/locales'
import { t } from '../i18n/ui'

// Rendered for any path not prerendered. On GitHub Pages this is reached via the
// 404.html fallback (a copy of index.html made in scripts/postbuild.mjs), which boots
// the app so React Router can show this instead of GitHub's raw 404. Localised from the
// URL's locale when present (e.g. /pa/bad-path shows Punjabi), else the default.
// Empty/error states are written as instructions, not apologies (docs/PLAN.md §2.5).
export default function NotFound() {
  const lang = localeFromPath(useLocation().pathname) ?? DEFAULT_LOCALE
  return (
    <section className="notfound" lang={lang}>
      <h1>{t('notfound.title', lang)}</h1>
      <p>{t('notfound.body', lang)}</p>
      <p>
        <Link className="notfound__btn" to="/">
          {t('notfound.cta', lang)} →
        </Link>
      </p>
    </section>
  )
}
