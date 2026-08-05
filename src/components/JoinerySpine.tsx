import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { SPINE } from '../content/spine'
import { getLevel, levelLessonMeta } from '../content/refdata'
import { useProgress } from '../lib/progress'
import { JointMark } from './ui/JointMark'

type Status = 'completed' | 'in-progress' | 'available' | 'coming'

// The signature element (docs/DESIGN.md · docs/redesign/PHASE-2-IDEATION.md §2.1).
//
// Each level is drawn as the JOINT it actually teaches — `spine.joint` finally has a
// consumer — and completing a level seats that joint. Status is carried three ways at
// once (the seated/unseated drawing, the colour, and a localised word), because state
// is never signalled by colour alone.
//
// Every node renders at its final height before hydration, so a returning user's
// progress fills the path in rather than reflowing it (Phase 1, Finding H).
function statusText(status: Status, count: number, total: number, lang: Locale): string {
  if (status === 'completed') return `✓ ${t('spine.done', lang)}`
  if (status === 'in-progress') return `${count}/${total}`
  if (status === 'available') return `${t('spine.start', lang)} →`
  return t('spine.coming', lang)
}

export function JoinerySpine({ lang }: { lang: Locale }) {
  const { data, hydrated } = useProgress()

  return (
    <ol className="spine" aria-label={t('a11y.path', lang)}>
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
        const state = status === 'coming' ? t('spine.coming', lang) : statusText(status, count, total, lang)
        const label = `${t('level.word', lang)} ${lv.n}, ${title} — ${state}`

        const inner = (
          <>
            <span className="spine__mark">
              <JointMark joint={lv.joint} />
            </span>
            <span className="spine__body">
              <span className="spine__title">
                L{lv.n} · {title}
              </span>
              <span className="spine__status">{state}</span>
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
              <div className="spine__link spine__link--coming" aria-label={label} role="note">
                {inner}
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
