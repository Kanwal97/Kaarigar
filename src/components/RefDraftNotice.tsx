import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'

// Page-level "machine draft" notice for the reference finders (tools / woods / glossary).
// Reference entries render through pick() with no per-item badge, so this page-level notice
// is how the "never present machine translation as authored" rule is kept for reference data:
// when the page is viewed in a language whose reference names/descriptions are machine drafts
// (pa, bgc), the reader is told up front. Only mount this on a finder once that finder's
// content actually carries pa/bgc drafts — otherwise it would wrongly claim a draft where the
// page is really an honest Hindi fallback.
const REF_DRAFT_LOCALES: readonly Locale[] = ['pa', 'bgc']

export function RefDraftNotice({ locale }: { locale: Locale }) {
  if (!REF_DRAFT_LOCALES.includes(locale)) return null
  return (
    <p className="draft-badge" role="status">
      <span aria-hidden="true" className="draft-badge__dot">✎</span>
      <span>{t('refdata.draftNotice', locale)}</span>
    </p>
  )
}
