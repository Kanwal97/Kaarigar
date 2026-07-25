import { LOCALE_LABEL, type Locale } from '../i18n/locales'
import { t } from '../i18n/ui'

// Honest translation-fallback badge, written in the requested language. Shown when a
// lesson isn't authored in that language, so the user sees the truth ("Punjabi coming —
// showing Hindi") instead of an English string silently mislabelled. A hard rule.
export function FallbackBadge({ requested, shown }: { requested: Locale; shown: Locale }) {
  return (
    <p className="fallback-badge" role="status">
      <span aria-hidden="true" className="fallback-badge__dot">↺</span>
      <span>
        <span lang={requested}>{LOCALE_LABEL[requested]}</span> {t('badge.coming', requested)}{' '}
        <span lang={shown}>{LOCALE_LABEL[shown]}</span>.
      </span>
    </p>
  )
}
