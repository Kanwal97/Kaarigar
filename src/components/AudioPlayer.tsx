import type { Lesson } from '../content/types'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { href } from '../lib/href'
import type { ReadAloud } from '../lib/useReadAloud'

// Per-lesson narration. Priority: a real human recording if one is ever added
// (lesson.audio[lang]); otherwise device text-to-speech "read aloud" driven by the
// useReadAloud hook (owned by Lesson so it can highlight the spoken line). No voice on the
// device → honest "coming" note. This component is purely presentational.
export function AudioPlayer({ lesson, lang, read }: { lesson: Lesson; lang: Locale; read: ReadAloud }) {
  const recorded = lesson.audio?.[lang]
  if (recorded) {
    return (
      <div className="audio">
        <span className="audio__label">
          <span aria-hidden="true">🔊</span> {t('audio.listen', lang)}
        </span>
        {/* preload none — never costs data until the user plays */}
        <audio controls preload="none" src={href(recorded)} />
      </div>
    )
  }

  if (!read.supported) {
    return (
      <p className="audio audio--pending" role="note">
        <span aria-hidden="true">🔊</span> {t('audio.coming', lang)}
      </p>
    )
  }

  const { state, speed, setSpeed, play, pause, resume, stop } = read
  const SPEEDS: { key: 'slow' | 'normal' | 'fast'; label: string }[] = [
    { key: 'slow', label: '🐢' },
    { key: 'normal', label: '1×' },
    { key: 'fast', label: '🐇' },
  ]
  return (
    <div className="audio">
      <span className="audio__label">
        <span aria-hidden="true">🔊</span> {t('audio.readAloud', lang)}
      </span>
      <div className="audio__controls">
        {state === 'idle' && (
          <button type="button" className="btn btn--ghost audio__btn" onClick={play}>
            ▶ {t('audio.listen', lang)}
          </button>
        )}
        {state === 'speaking' && (
          <button type="button" className="btn btn--ghost audio__btn" onClick={pause}>
            ⏸ {t('audio.pause', lang)}
          </button>
        )}
        {state === 'paused' && (
          <button type="button" className="btn btn--ghost audio__btn" onClick={resume}>
            ▶ {t('audio.resume', lang)}
          </button>
        )}
        {state !== 'idle' && (
          <button type="button" className="btn btn--ghost audio__btn" onClick={stop}>
            ⏹ {t('audio.stop', lang)}
          </button>
        )}
        <div className="audio__speed segmented" role="group" aria-label={t('audio.speed', lang)}>
          {SPEEDS.map((s) => (
            <button
              key={s.key}
              type="button"
              className="segmented__btn segmented__btn--wide"
              aria-pressed={speed === s.key}
              onClick={() => setSpeed(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
