import { useEffect } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import type { Lesson as LessonData } from '../content/types'
import { resolveLessonText, selectVideos } from '../content/loaders'
import { getLevel, getHazard, getTool, getWood, getLessonMeta, levelLessonMeta, lessonTitle, pick } from '../content/refdata'
import { useProgress } from '../lib/progress'
import { useReadAloud } from '../lib/useReadAloud'
import { FallbackBadge } from '../components/FallbackBadge'
import { MachineDraftBadge } from '../components/MachineDraftBadge'
import { SelfCheck } from '../components/SelfCheck'
import { VideoFacade } from '../components/VideoFacade'
import { AudioPlayer } from '../components/AudioPlayer'
import { Button } from '../components/ui/Button'

// Data-driven lesson view (docs/WIREFRAMES.md). M3 renders the full authored content
// with the honest translation badge, hazard citations, and review status. The video
// FACADE + data-saver arrive in M5 (videoIds are still TODO here); progress-marking
// and self-check scoring arrive in M4.
export default function Lesson({ lang, lessonId }: { lang: Locale; lessonId: string }) {
  // Body comes from the route loader (lazy per-lesson chunk), not the initial bundle.
  const lesson = useLoaderData() as LessonData
  const { isComplete, markComplete, recordVisit } = useProgress()

  const { text, usedLocale, isFallback, isDraft } = resolveLessonText(lesson, lang)
  const done = isComplete(lessonId)
  const { primary: primaryVideo, extras: extraVideos } = selectVideos(lesson, lang)

  // Read-aloud narration segments in DISPLAY order (title → objectives → summary → safety →
  // steps → practice); each rendered element is tagged with its index so the spoken line can
  // be highlighted. `put` appends a segment and returns its index (-1 for absent optionals).
  const seg: string[] = []
  const put = (s?: string): number => {
    if (!s) return -1
    seg.push(s)
    return seg.length - 1
  }
  const NARR = {
    title: put(text.title),
    obj: text.objectives.map((o) => put(o)),
    summary: put(text.summary),
    safety: put(text.safetyNote),
    step: text.steps.map((s) => put(s)),
    practice: put(text.practice),
  }
  const read = useReadAloud(seg, usedLocale)
  const reading = (idx: number) => (idx >= 0 && read.active === idx ? 'is-reading' : undefined)

  // Remember this as "continue where you left off" (client-only), with its title.
  useEffect(() => {
    recordVisit(lessonId, lang, text.title)
  }, [lessonId, lang, text.title, recordVisit])

  // Keep the line being read in view (gentle; respects reduced-motion).
  useEffect(() => {
    if (read.active < 0 || typeof document === 'undefined') return
    const el = document.querySelector(`[data-narr="${read.active}"]`)
    if (el) {
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' })
    }
  }, [read.active])
  const level = getLevel(`l${String(lesson.level).padStart(2, '0')}`)
  const levelTitle = level ? (level.i18n[lang] ?? level.i18n.en).title : ''

  // Position within the level + previous/next, from lightweight metadata.
  const siblings = level ? levelLessonMeta(level.id) : []
  const idx = siblings.findIndex((s) => s.id === lessonId)
  const prev = idx > 0 ? siblings[idx - 1] : undefined
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined

  // Advisory prerequisites (never a hard gate) that actually resolve to lessons.
  const prereqs = (lesson.prerequisites ?? [])
    .map((id) => getLessonMeta(id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))

  return (
    <article className="page lesson" lang={usedLocale}>
      <p className="crumbs">
        {level && <Link to={`/${lang}/level/${level.id}`}>← {levelTitle}</Link>}
      </p>

      <h1 data-narr={NARR.title} className={reading(NARR.title)}>
        {text.title}
      </h1>
      <div className="lesson__meta">
        <span className="lmeta lmeta--diff" data-diff={lesson.difficulty}>
          {lesson.difficulty}
        </span>
        <span className="lmeta">{lesson.estMinutes} min</span>
        {idx >= 0 && siblings.length > 1 && (
          <span className="lmeta">
            {t('lesson.word', lang)} {idx + 1}/{siblings.length}
          </span>
        )}
      </div>

      {prereqs.length > 0 && (
        <p className="prereqs" role="note">
          {t('lesson.recommendedFirst', lang)}{' '}
          {prereqs.map((m, i) => (
            <span key={m.id}>
              {i > 0 && ', '}
              <Link to={`/${lang}/lesson/${m.id}`}>{lessonTitle(m, lang)}</Link>
            </span>
          ))}
        </p>
      )}

      <AudioPlayer lesson={lesson} lang={usedLocale} read={read} />

      {isFallback && <FallbackBadge requested={lang} shown={usedLocale} />}
      {isDraft && <MachineDraftBadge locale={usedLocale} />}

      {lesson.reviewStatus === 'needs-expert-review' && (
        <p className="review-note" role="note">
          {t('lesson.reviewNote', lang)}
        </p>
      )}

      {/* Objectives first — "what you'll be able to do", not theory (docs/PLAN.md §2.5) */}
      <section className="lesson__objectives">
        <h2>{t('lesson.objectives', lang)}</h2>
        <ul>
          {text.objectives.map((o, i) => (
            <li key={i} data-narr={NARR.obj[i]} className={reading(NARR.obj[i]!)}>
              {o}
            </li>
          ))}
        </ul>
      </section>

      {/* Facade video (youtube-nocookie, click-to-load, data-saver, 101/150 fallback). */}
      {primaryVideo ? (
        <div className="lesson__videos">
          <VideoFacade video={primaryVideo} title={text.title} lang={lang} />
          {extraVideos.map((v) => (
            <div key={v.videoId} className="lesson__video-extra">
              <p className="lesson__video-label">{t('video.deepDive', lang)}</p>
              <VideoFacade video={v} title={text.title} lang={lang} />
            </div>
          ))}
        </div>
      ) : (
        <div className="video-placeholder" aria-label="Video coming">
          {t('video.sourcing', lang)}
        </div>
      )}

      <p className={`lesson__summary ${reading(NARR.summary) ?? ''}`.trim()} data-narr={NARR.summary}>
        {text.summary}
      </p>

      {(lesson.tools?.length || lesson.materials?.length) && (
        <div className="chips-block">
          {lesson.tools?.map((id) => {
            const tool = getTool(id)
            return (
              <span className="chip" key={id}>
                {tool ? pick(tool.names, lang) : id}
              </span>
            )
          })}
          {lesson.materials?.map((id) => {
            const wood = getWood(id)
            return (
              <span className="chip chip--material" key={id}>
                {wood ? pick(wood.names, lang) : id}
              </span>
            )
          })}
        </div>
      )}

      {lesson.hazards && lesson.hazards.length > 0 && (
        <section className="hazards" aria-label="Safety">
          <h2>! {t('lesson.safety', lang)}</h2>
          {lesson.hazards.map((id) => {
            const hazard = getHazard(id)
            if (!hazard) return null
            const ht = hazard.i18n[lang] ?? hazard.i18n.en
            return (
              <div className="hazard-card" key={id}>
                <p className="hazard-card__label">{ht.label}</p>
                <p className="hazard-card__control">{ht.control}</p>
                <p className="hazard-card__src">
                  {t('lesson.source', lang)}{' '}
                  {hazard.source.map((s, i) => (
                    <span key={i}>
                      {i > 0 && ', '}
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.org}
                      </a>
                    </span>
                  ))}
                  {hazard.reviewStatus === 'needs-expert-review' && ` · ${t('lesson.needsReview', lang)}`}
                </p>
              </div>
            )
          })}
        </section>
      )}

      {/* Authored per-lesson safety reminder — previously present in content but never shown. */}
      {text.safetyNote && (
        <aside className="safety-note" role="note">
          <p className="safety-note__label">
            <span aria-hidden="true">⚠️</span> {t('lesson.safety', lang)}
          </p>
          <p className={reading(NARR.safety)} data-narr={NARR.safety}>
            {text.safetyNote}
          </p>
        </aside>
      )}

      <section className="lesson__steps">
        <h2>{t('lesson.steps', lang)}</h2>
        <ol>
          {text.steps.map((s, i) => (
            <li key={i} data-narr={NARR.step[i]} className={reading(NARR.step[i]!)}>
              {s}
            </li>
          ))}
        </ol>
      </section>

      {text.practice && (
        <section className="lesson__practice">
          <h2>{t('lesson.practice', lang)}</h2>
          <p data-narr={NARR.practice} className={reading(NARR.practice)}>
            {text.practice}
          </p>
        </section>
      )}

      {lesson.selfCheck && lesson.selfCheck.length > 0 && (
        <section className="lesson__selfcheck">
          <h2>{t('lesson.selfCheck', lang)}</h2>
          <SelfCheck items={lesson.selfCheck} lang={lang} alreadyDone={done} />
        </section>
      )}

      <div className="lesson__complete">
        {done ? (
          <p className="done-note" role="status">
            {t('lesson.marked', lang)}
          </p>
        ) : (
          <Button variant="cta" onClick={() => markComplete(lessonId, lang, text.title)}>
            {t('lesson.markComplete', lang)}
          </Button>
        )}
      </div>

      {(prev || next) && (
        <nav className="lesson-nav" aria-label="Lesson navigation">
          {prev ? (
            <Link className="lesson-nav__link lesson-nav__link--prev" to={`/${lang}/lesson/${prev.id}`}>
              <span className="lesson-nav__dir">{t('lesson.prev', lang)}</span>
              <span className="lesson-nav__title">{lessonTitle(prev, lang)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="lesson-nav__link lesson-nav__link--next" to={`/${lang}/lesson/${next.id}`}>
              <span className="lesson-nav__dir">{t('lesson.next', lang)}</span>
              <span className="lesson-nav__title">{lessonTitle(next, lang)}</span>
            </Link>
          ) : (
            level && (
              <Link className="lesson-nav__link lesson-nav__link--next" to={`/${lang}/level/${level.id}`}>
                <span className="lesson-nav__dir">{t('lesson.done', lang)}</span>
                <span className="lesson-nav__title">{t('lesson.backTo', lang)} {levelTitle}</span>
              </Link>
            )
          )}
        </nav>
      )}
    </article>
  )
}
