import { useState } from 'react'
import type { SelfCheckItem } from '../content/types'
import { pick } from '../content/refdata'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'

// Self-check: pick an option, see if it's right, read the explanation. The parent tracks
// each question's correctness to show a running score and, when every answer is right,
// celebrate + nudge the learner toward marking the lesson complete (ties the quiz to the
// progress action without persisting quiz state).
export function SelfCheck({ items, lang, alreadyDone }: { items: SelfCheckItem[]; lang: Locale; alreadyDone?: boolean }) {
  const [results, setResults] = useState<(boolean | null)[]>(() => items.map(() => null))
  const answered = results.filter((r) => r !== null).length
  const correct = results.filter((r) => r === true).length
  const allAnswered = answered === items.length
  const allCorrect = allAnswered && correct === items.length

  return (
    <div className="selfcheck">
      {items.map((item, i) => (
        <SelfCheckQuestion
          key={i}
          item={item}
          lang={lang}
          n={i + 1}
          onAnswer={(isCorrect) =>
            setResults((r) => {
              const next = [...r]
              next[i] = isCorrect
              return next
            })
          }
        />
      ))}
      {allAnswered && (
        <p className={`selfcheck__score ${allCorrect ? 'is-aced' : ''}`.trim()} role="status">
          {correct}/{items.length} {t('selfcheck.correctWord', lang)}
          {allCorrect && ` · ${t('selfcheck.aced', lang)}`}
        </p>
      )}
      {allCorrect && !alreadyDone && <p className="selfcheck__nudge">{t('selfcheck.nudge', lang)}</p>}
    </div>
  )
}

function SelfCheckQuestion({
  item,
  lang,
  n,
  onAnswer,
}: {
  item: SelfCheckItem
  lang: Locale
  n: number
  onAnswer: (isCorrect: boolean) => void
}) {
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
                onClick={() => {
                  setPicked(i)
                  onAnswer(i === item.answerIndex)
                }}
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
