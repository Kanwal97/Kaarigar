import { useLocation } from 'react-router-dom'
import { usePreferences, type DataSaverPref } from '../../lib/preferences'
import { localeFromPath, DEFAULT_LOCALE } from '../../i18n/locales'
import { t } from '../../i18n/ui'

const STEPS: { value: DataSaverPref; key: string }[] = [
  { value: 'auto', key: 'ctl.auto' },
  { value: 'on', key: 'ctl.on' },
  { value: 'off', key: 'ctl.off' },
]

// Auto = follow the connection (on for slow/metered). On = always save data. Off = never.
export function DataSaverControl() {
  const { dataSaver, setDataSaver } = usePreferences()
  const lang = localeFromPath(useLocation().pathname) ?? DEFAULT_LOCALE
  return (
    <div className="segmented" role="group" aria-label={t('me.dataSaver', lang)}>
      {STEPS.map((s) => (
        <button
          key={s.value}
          type="button"
          className="segmented__btn segmented__btn--wide"
          aria-pressed={dataSaver === s.value}
          onClick={() => setDataSaver(s.value)}
        >
          {t(s.key, lang)}
        </button>
      ))}
    </div>
  )
}
