import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { SPINE } from '../content/spine'
import { getLevel, levelLessonMeta } from '../content/refdata'
import { useProgress } from '../lib/progress'

type Status = 'completed' | 'in-progress' | 'available' | 'coming'

// Signature element (docs/DESIGN.md): the learning path as an assembling joint. Each
// level is a node on a vertical spine; completed levels seat solid, the current one is
// outlined, upcoming ones are ghosted. The diagram is the signature; the seat animation
// is CSS-only and disabled under prefers-reduced-motion.
function statusText(status: Status, count: number, total: number): string {
  if (status === 'completed') return '✓ done'
  if (status === 'in-progress') return `${count}/${total}`
  if (status === 'available') return 'start →'
  return 'coming'
}

export function JoinerySpine({ lang }: { lang: Locale }) {
  const { data, hydrated } = useProgress()

  return (
    <ol className="spine" aria-label="Learning path">
      {SPINE.map((lv) => {
        let status: Status = 'coming'
        let count = 0
        let total = 0
        if (lv.hasContent) {
          const ls = levelLessonMeta(lv.id)
          total = ls.length
          count = hydrated ? ls.filter((l) => data.completedLessons.includes(l.id)).length : 0
          status = total > 0 && count === total ? 'completed' : count > 0 ? 'in-progress' : 'available'
        }
        const level = getLevel(lv.id)
        const title = level ? (level.i18n[lang] ?? level.i18n.en).title : lv.title
        const label = `Level ${lv.n}, ${title} — ${status === 'coming' ? 'coming soon' : status}`

        const inner = (
          <>
            <span className="spine__joint" aria-hidden="true" />
            <span className="spine__body">
              <span className="spine__title">
                L{lv.n} · {title}
              </span>
              <span className="spine__status">{statusText(status, count, total)}</span>
            </span>
          </>
        )

        return (
          <li key={lv.id} className={`spine__node spine__node--${status}`}>
            {lv.hasContent ? (
              <Link className="spine__link" to={`/${lang}/level/${lv.id}`} aria-label={label}>
                {inner}
              </Link>
            ) : (
              <div className="spine__link spine__link--coming" aria-label={label}>
                {inner}
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
