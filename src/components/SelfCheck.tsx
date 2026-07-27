import { useState } from 'react'
import type { SelfCheckItem } from '../content/types'
import { pick } from '../content/refdata'
import type { Locale } from '../i18n/locales'

// Minimal self-check: pick an option, see if it's right, read the explanation.
// Scoring toward progress is added with the progress store in M4.
export function SelfCheck({ items, lang }: { items: SelfCheckItem[]; lang: Locale }) {
  return (
    <div className="selfcheck">
      {items.map((item, i) => (
        <SelfCheckQuestion key={i} item={item} lang={lang} n={i + 1} />
      ))}
    </div>
  )
}

function SelfCheckQuestion({ item, lang, n }: { item: SelfCheckItem; lang: Locale; n: number }) {
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null
  return (
    <div className="selfcheck__q">
      <p className="selfcheck__prompt">
        <span className="selfcheck__n">{n}</span> {pick(item.q, lang)}
      </p>
      <ul className="selfcheck__options">
        {item.options.map((opt, i) => {
          const isCorrect = i === item.answerIndex
          const state = !answered ? '' : isCorrect ? 'is-correct' : picked === i ? 'is-wrong' : ''
          const letter = String.fromCharCode(65 + i) // A, B, C…
          const mark = answered ? (isCorrect ? '✓' : picked === i ? '✗' : letter) : letter
          return (
            <li key={i}>
              <button
                type="button"
                className={`selfcheck__opt ${state}`.trim()}
                aria-pressed={picked === i}
                onClick={() => setPicked(i)}
              >
                <span aria-hidden="true" className="selfcheck__mark">
                  {mark}
                </span>
                {pick(opt, lang)}
              </button>
            </li>
          )
        })}
      </ul>
      {answered && item.explain && <p className="selfcheck__explain">{pick(item.explain, lang)}</p>}
    </div>
  )
}
