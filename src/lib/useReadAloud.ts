import { useEffect, useMemo, useRef, useState } from 'react'
import type { Locale } from '../i18n/locales'

// Device text-to-speech engine for the lesson "read aloud", with sentence/segment tracking
// so the UI can highlight the line currently being spoken. Segments are the ordered pieces
// of the lesson (title, summary, each objective, each step, practice); as the utterance
// crosses each piece's character range (via onboundary), `active` updates to that index.
//
// Voice map: Haryanvi (bgc) has no TTS voice → the Hindi voice reads its Devanagari text;
// Punjabi needs a real Gurmukhi voice or we report unsupported.
const VOICE_PREFIX: Record<Locale, string[]> = { hi: ['hi'], en: ['en'], bgc: ['hi'], pa: ['pa'] }
const UTTER_LANG: Record<Locale, string> = { hi: 'hi-IN', en: 'en-IN', bgc: 'hi-IN', pa: 'pa-IN' }
const SEP = '। ' // danda — a clean sentence break for hi/bgc, harmless elsewhere

export type ReadState = 'idle' | 'speaking' | 'paused'
export type Speed = 'slow' | 'normal' | 'fast'
const RATES: Record<Speed, number> = { slow: 0.72, normal: 0.92, fast: 1.2 }

export interface ReadAloud {
  supported: boolean
  state: ReadState
  active: number // index of the segment being spoken, or -1
  speed: Speed
  setSpeed: (s: Speed) => void
  play: () => void
  pause: () => void
  resume: () => void
  stop: () => void
}

export function useReadAloud(segments: string[], lang: Locale): ReadAloud {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [state, setState] = useState<ReadState>('idle')
  const [active, setActive] = useState(-1)
  const [speed, setSpeedState] = useState<Speed>('normal')
  const rateRef = useRef(RATES.normal)
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const synth = window.speechSynthesis
    const pick = () => {
      const want = VOICE_PREFIX[lang]
      setVoice(synth.getVoices().find((v) => want.some((w) => v.lang.toLowerCase().startsWith(w))) ?? null)
    }
    pick()
    synth.addEventListener('voiceschanged', pick)
    return () => {
      synth.removeEventListener('voiceschanged', pick)
      synth.cancel()
    }
  }, [lang])

  // Character offset where each segment begins in the joined utterance text.
  const { fullText, offsets } = useMemo(() => {
    const offs: number[] = []
    let acc = 0
    for (const s of segments) {
      offs.push(acc)
      acc += s.length + SEP.length
    }
    return { fullText: segments.join(SEP), offsets: offs }
  }, [segments])

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && !!voice

  function play() {
    const synth = window.speechSynthesis
    synth.cancel()
    const u = new SpeechSynthesisUtterance(fullText)
    u.lang = UTTER_LANG[lang]
    if (voice) u.voice = voice
    u.rate = rateRef.current
    u.onboundary = (e) => {
      const ci = e.charIndex
      let idx = 0
      for (let i = 0; i < offsets.length; i++) {
        if (offsets[i]! <= ci) idx = i
        else break
      }
      setActive(idx)
    }
    u.onend = () => {
      setState('idle')
      setActive(-1)
    }
    u.onerror = () => {
      setState('idle')
      setActive(-1)
    }
    uttRef.current = u // hold a ref so the utterance isn't GC'd mid-speech (Chrome quirk)
    setActive(0)
    synth.speak(u)
    setState('speaking')
  }
  function pause() {
    window.speechSynthesis.pause()
    setState('paused')
  }
  function resume() {
    window.speechSynthesis.resume()
    setState('speaking')
  }
  function stop() {
    window.speechSynthesis.cancel()
    setState('idle')
    setActive(-1)
  }
  // Change reading speed. If currently speaking, restart at the new rate (Web Speech can't
  // re-rate a live utterance) — acceptable for short lessons and gives instant feedback.
  function setSpeed(s: Speed) {
    rateRef.current = RATES[s]
    setSpeedState(s)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
      play()
    }
  }

  return { supported, state, active, speed, setSpeed, play, pause, resume, stop }
}
