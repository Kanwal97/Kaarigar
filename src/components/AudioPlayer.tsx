import { useEffect, useRef, useState } from 'react'
import type { Lesson, LessonText } from '../content/types'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { href } from '../lib/href'

// Per-lesson audio narration — the highest-leverage feature for low-literacy users.
// Priority: a real human recording if one has been added (lesson.audio[lang]); otherwise
// a device text-to-speech "read aloud" — which works TODAY, on every lesson, at zero data
// cost and offline, using the phone's own voice. If no suitable voice exists (e.g. Punjabi
// on a device without a Gurmukhi voice) we fall back to an honest "coming" note.
//
// Voice map: Haryanvi (bgc) has no TTS voice, so the Hindi voice reads its Devanagari text
// (near-identical phonetics). Punjabi needs a real pa/Gurmukhi voice or we don't offer it.
const VOICE_PREFIX: Record<Locale, string[]> = { hi: ['hi'], en: ['en'], bgc: ['hi'], pa: ['pa'] }
const UTTER_LANG: Record<Locale, string> = { hi: 'hi-IN', en: 'en-IN', bgc: 'hi-IN', pa: 'pa-IN' }

export function AudioPlayer({ lesson, lang, text }: { lesson: Lesson; lang: Locale; text: LessonText }) {
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
  return <ReadAloud lang={lang} text={text} />
}

function ReadAloud({ lang, text }: { lang: Locale; text: LessonText }) {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [state, setState] = useState<'idle' | 'speaking' | 'paused'>('idle')
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const synth = window.speechSynthesis
    const pick = () => {
      const want = VOICE_PREFIX[lang]
      const v = synth.getVoices().find((vo) => want.some((w) => vo.lang.toLowerCase().startsWith(w)))
      setVoice(v ?? null)
    }
    pick()
    synth.addEventListener('voiceschanged', pick)
    return () => {
      synth.removeEventListener('voiceschanged', pick)
      synth.cancel() // stop talking when leaving the lesson
    }
  }, [lang])

  // No TTS / no matching voice → honest "coming" note (a human recording is still welcome).
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !voice) {
    return (
      <p className="audio audio--pending" role="note">
        <span aria-hidden="true">🔊</span> {t('audio.coming', lang)}
      </p>
    )
  }

  const narration = [text.title, text.summary, ...text.objectives, ...text.steps, text.practice, text.safetyNote]
    .filter(Boolean)
    .join('। ') // Devanagari danda reads as a clean sentence break for hi/bgc; harmless elsewhere

  const play = () => {
    const synth = window.speechSynthesis
    synth.cancel()
    const u = new SpeechSynthesisUtterance(narration)
    u.lang = UTTER_LANG[lang]
    u.voice = voice
    u.rate = 0.92 // a touch slower — clearer for the workshop / low-literacy listeners
    u.onend = () => setState('idle')
    u.onerror = () => setState('idle')
    uttRef.current = u // hold a ref so the utterance isn't GC'd mid-speech (Chrome quirk)
    synth.speak(u)
    setState('speaking')
  }
  const pause = () => {
    window.speechSynthesis.pause()
    setState('paused')
  }
  const resume = () => {
    window.speechSynthesis.resume()
    setState('speaking')
  }
  const stop = () => {
    window.speechSynthesis.cancel()
    setState('idle')
  }

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
      </div>
    </div>
  )
}
