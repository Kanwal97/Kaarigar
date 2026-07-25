import { LOCALE_LABEL, type Locale } from '../i18n/locales'
import { t } from '../i18n/ui'

// Honest "machine draft" badge, written in the drafted language. Shown when a lesson is
// displayed in a language whose translation is a machine draft (or an un-reviewed human
// draft) — so the reader knows it may contain mistakes. Never present a draft as authored.
export function MachineDraftBadge({ locale }: { locale: Locale }) {
  return (
    <p className="draft-badge" role="status">
      <span aria-hidden="true" className="draft-badge__dot">✎</span>
      <span>
        <span lang={locale}>{LOCALE_LABEL[locale]}</span> {t('badge.draft', locale)}
      </span>
    </p>
  )
}
