import { useOnline } from '../lib/useOnline'
import { t } from '../i18n/ui'
import type { Locale } from '../i18n/locales'

// Honest offline indicator: says exactly what works offline and that video doesn't
// (docs/PLAN.md §2.5). Only shown when actually offline.
export function OfflineBadge({ locale }: { locale: Locale }) {
  const online = useOnline()
  if (online) return null
  return (
    <div className="offline-badge" role="status">
      <span aria-hidden="true">⚡</span> {t('offline.badge', locale)}
    </div>
  )
}
