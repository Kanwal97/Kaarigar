import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { getLevel, levelLessonMeta, lessonTitle } from '../content/refdata'
import { useProgress } from '../lib/progress'
import { ProgressBar } from '../components/ui/ProgressBar'
import NotFound from './NotFound'

// Data-driven level view: reads the level + its lessons from content (docs/PLAN.md §2.2).
export default function Level({ lang, levelId }: { lang: Locale; levelId: string }) {
  const level = getLevel(levelId)
  const { isComplete, hydrated } = useProgress()
  if (!level) return <NotFound />
  const lt = level.i18n[lang] ?? level.i18n.en
  const lessons = levelLessonMeta(levelId)
  const doneCount = hydrated ? lessons.filter((l) => isComplete(l.id)).length : 0

  return (
    <section className="page level" lang={lang}>
      <p className="crumbs">
        <Link to={`/${lang}`}>{t('crumb.home', lang)}</Link>
      </p>
      <h1>
        L{level.number} · {lt.title}
      </h1>
      <p className="level__outcome">{lt.outcome}</p>

      {lessons.length > 0 && (
        <ProgressBar value={(doneCount / lessons.length) * 100} label={`${doneCount} / ${lessons.length} ${t('level.lessons', lang)}`} />
      )}

      <ol className="lesson-list">
        {lessons.map((lesson, i) => {
          const title = lessonTitle(lesson, lang)
          const complete = hydrated && isComplete(lesson.id)
          return (
            <li key={lesson.id}>
              <Link
                className={`lesson-list__item ${complete ? 'is-complete' : ''}`.trim()}
                to={`/${lang}/lesson/${lesson.id}`}
              >
                <span className="lesson-list__num" aria-hidden="true">
                  {complete ? '✓' : i + 1}
                </span>
                <span className="lesson-list__body">
                  <span className="lesson-list__title">{title}</span>
                  <span className="lesson-list__meta">
                    <span className="lmeta lmeta--diff" data-diff={lesson.difficulty}>
                      {t(`diff.${lesson.difficulty}`, lang)}
                    </span>
                    <span className="lmeta">{lesson.estMinutes} min</span>
                  </span>
                </span>
                <span className="lesson-list__go" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
