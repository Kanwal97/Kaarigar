import { useEffect, useRef, useState } from 'react'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { Icon, type IconName } from './ui/Icon'

// A one-time, 3-step welcome shown to a first-time visitor on Home. Kept deliberately
// simple for a low-literacy audience: one idea per step, one large picture, a dot
// indicator, Skip + Next. Persisted so it never nags again; clearing the key (Me → "Show
// the intro again") re-enables it. Renders client-only (after the localStorage check) so
// it never appears in the prerendered HTML and causes no hydration mismatch.
export const GUIDE_KEY = 'kaarigar:guideSeen'

const STEPS: { icon: IconName; title: string; body: string }[] = [
  { icon: 'learn', title: 'guide.s1Title', body: 'guide.s1Body' },
  { icon: 'play', title: 'guide.s2Title', body: 'guide.s2Body' },
  { icon: 'book', title: 'guide.s3Title', body: 'guide.s3Body' },
]

export function FirstRunGuide({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const primaryRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    try {
      if (!localStorage.getItem(GUIDE_KEY)) setOpen(true)
    } catch {
      /* localStorage blocked — just don't show */
    }
  }, [])

  useEffect(() => {
    if (open) primaryRef.current?.focus()
  }, [open, step])

  if (!open) return null

  function dismiss() {
    try {
      localStorage.setItem(GUIDE_KEY, '1')
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  const last = step === STEPS.length - 1
  const s = STEPS[step]!

  return (
    <div
      className="guide-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
      onKeyDown={(e) => {
        if (e.key === 'Escape') dismiss()
      }}
    >
      <div className="guide">
        <p className="guide__eyebrow">{t('guide.title', lang)}</p>
        <div className="guide__icon">
          <Icon name={s.icon} size={36} />
        </div>
        <h2 id="guide-title" className="guide__title">
          {t(s.title, lang)}
        </h2>
        <p className="guide__body">{t(s.body, lang)}</p>
        <div className="guide__dots" aria-hidden="true">
          {STEPS.map((_, i) => (
            <span key={i} className={`guide__dot ${i === step ? 'is-on' : ''}`.trim()} />
          ))}
        </div>
        <div className="guide__actions">
          <button type="button" className="linkish" onClick={dismiss}>
            {t('guide.skip', lang)}
          </button>
          <button
            ref={primaryRef}
            type="button"
            className="btn btn--cta"
            onClick={() => (last ? dismiss() : setStep(step + 1))}
          >
            {last ? t('guide.start', lang) : t('guide.next', lang)}
          </button>
        </div>
      </div>
    </div>
  )
}
