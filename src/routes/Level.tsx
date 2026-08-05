import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { getLevel, levelLessonMeta, lessonTitle, getTool, getWood, pick } from '../content/refdata'
import { SPINE } from '../content/spine'
import { toolIcon, woodIcon } from '../content/icons'
import { useProgress } from '../lib/progress'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Icon } from '../components/ui/Icon'
import { JointMark } from '../components/ui/JointMark'
import NotFound from './NotFound'

// Level view (docs/redesign/PHASE-2-IDEATION.md §2.5).
//
// The page now carries the level's own JOINT MARK and an "at a glance" panel — the
// tools, woods and safety topics this level covers, aggregated from the lesson metadata
// index. That data always existed in the content; it was simply never surfaced, so the
// page was a title, a sentence and a list.
//
// The aggregation reads ID REFERENCES from the lightweight index (see
// scripts/build-content-index.mjs), so no lesson bodies are loaded to render it.
export default function Level({ lang, levelId }: { lang: Locale; levelId: string }) {
  const level = getLevel(levelId)
  const { isComplete, hydrated } = useProgress()
  if (!level) return <NotFound />
  const lt = level.i18n[lang] ?? level.i18n.en
  const lessons = levelLessonMeta(levelId)
  const doneCount = hydrated ? lessons.filter((l) => isComplete(l.id)).length : 0
  const joint = SPINE.find((s) => s.id === levelId)?.joint ?? 'anchor'

  const uniq = (xs: string[]) => Array.from(new Set(xs))
  const toolIds = uniq(lessons.flatMap((l) => l.tools)).map(getTool).filter(Boolean)
  const woodIds = uniq(lessons.flatMap((l) => l.materials)).map(getWood).filter(Boolean)
  const hazardCount = uniq(lessons.flatMap((l) => l.hazards)).length

  return (
    <section className="page level page--rail" lang={lang}>
      <div className="page__head">
        <p className="crumbs">
          <Link to={`/${lang}`}>{t('crumb.home', lang)}</Link>
        </p>
        <div className="level__head">
          <span className="level__mark">
            <JointMark joint={joint} size={48} />
          </span>
          <h1>
            L{level.number} · {lt.title}
          </h1>
        </div>
        <p className="level__outcome">{lt.outcome}</p>
        {lessons.length > 0 && (
          <ProgressBar
            value={(doneCount / lessons.length) * 100}
            label={`${doneCount} / ${lessons.length} ${t('level.lessons', lang)}`}
          />
        )}
      </div>

      {(toolIds.length > 0 || woodIds.length > 0 || hazardCount > 0) && (
        <aside className="rail" aria-label={t('level.atAGlance', lang)}>
          <p className="rail__title eyebrow">{t('level.atAGlance', lang)}</p>
          {toolIds.length > 0 && (
            <div className="rail__group">
              <p className="eyebrow">{t('nav.tools', lang)}</p>
              <div className="chips-block">
                {toolIds.map((tool) => (
                  <span className="chip" key={tool!.id}>
                    <Icon name={toolIcon(tool!.id, tool!.category)} size={18} />
                    {pick(tool!.names, lang)}
                  </span>
                ))}
              </div>
            </div>
          )}
          {woodIds.length > 0 && (
            <div className="rail__group">
              <p className="eyebrow">{t('lesson.materials', lang)}</p>
              <div className="chips-block">
                {woodIds.map((wood) => (
                  <span className="chip chip--material" key={wood!.id}>
                    <Icon name={woodIcon(wood!.kind)} size={18} />
                    {pick(wood!.names, lang)}
                  </span>
                ))}
              </div>
            </div>
          )}
          {hazardCount > 0 && (
            <div className="rail__group">
              <p className="chip chip--hazard">
                <Icon name="warning" size={18} />
                {hazardCount} {t('level.safetyTopics', lang)}
              </p>
            </div>
          )}
        </aside>
      )}

      <div className="page__body">
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
                  <span className="lesson-list__go">
                    <Icon name="arrow-right" size={22} />
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
