import { useLocation } from 'react-router-dom'
import { usePreferences, type TextSize } from '../../lib/preferences'
import { localeFromPath, DEFAULT_LOCALE } from '../../i18n/locales'
import { t } from '../../i18n/ui'

const STEPS: { value: TextSize; key: string; scale: number }[] = [
  { value: 'normal', key: 'ctl.textNormal', scale: 0.9 },
  { value: 'large', key: 'ctl.textLarge', scale: 1.15 },
  { value: 'xlarge', key: 'ctl.textXlarge', scale: 1.45 },
]

// 3-step control. Each "A" is rendered at its own size so the choice is self-evident
// (helpful for low-literacy users). Resizes actual content via the root font-size.
export function TextSizeControl() {
  const { textSize, setTextSize } = usePreferences()
  const lang = localeFromPath(useLocation().pathname) ?? DEFAULT_LOCALE
  return (
    <div className="segmented" role="group" aria-label={t('me.textSize', lang)}>
      {STEPS.map((s) => (
        <button
          key={s.value}
          type="button"
          className="segmented__btn"
          aria-pressed={textSize === s.value}
          title={t(s.key, lang)}
          onClick={() => setTextSize(s.value)}
        >
          <span aria-hidden="true" style={{ fontSize: `${s.scale}em` }}>A</span>
        </button>
      ))}
    </div>
  )
}
