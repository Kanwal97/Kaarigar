import type { Lesson } from '../content/types'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { href } from '../lib/href'

// Per-lesson audio narration — the highest-leverage feature for low-literacy users
// (docs/PLAN.md §2.4). The player exists now; recordings are a sourcing task, so when
// a lesson has no audio file we show an honest "coming" affordance instead of hiding it.
export function AudioPlayer({ lesson, lang }: { lesson: Lesson; lang: Locale }) {
  const src = lesson.audio?.[lang]
  if (!src) {
    return (
      <p className="audio audio--pending" role="note">
        <span aria-hidden="true">🔊</span> {t('audio.coming', lang)}
      </p>
    )
  }
  return (
    <div className="audio">
      <span className="audio__label">
        <span aria-hidden="true">🔊</span> {t('audio.listen', lang)}
      </span>
      {/* preload none — never costs data until the user plays */}
      <audio controls preload="none" src={href(src)} />
    </div>
  )
}
