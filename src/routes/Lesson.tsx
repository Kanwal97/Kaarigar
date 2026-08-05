import { useEffect } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import type { Lesson as LessonData } from '../content/types'
import { resolveLessonText, selectVideos } from '../content/loaders'
import { getLevel, getHazard, getTool, getWood, getLessonMeta, levelLessonMeta, lessonTitle, pick } from '../content/refdata'
import { toolIcon, woodIcon } from '../content/icons'
import { useProgress } from '../lib/progress'
import { useReadAloud } from '../lib/useReadAloud'
import { FallbackBadge } from '../components/FallbackBadge'
import { MachineDraftBadge } from '../components/MachineDraftBadge'
import { SelfCheck } from '../components/SelfCheck'
import { VideoFacade } from '../components/VideoFacade'
import { AudioPlayer } from '../components/AudioPlayer'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'

// The core teaching unit (docs/WIREFRAMES.md · docs/redesign/PHASE-2-IDEATION.md §2.2).
//
// Three regions: the head (what this is, hear it, see it), a context rail (where you
// are in the level, what you need), and the body (do it). On a phone that is plain
// top-to-bottom order — tools land right after the video, which is when you need to
// know what to pick up. From 1200px the rail becomes the sticky right column the
// wireframes always specified and the layout never delivered.
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

  const tools = (lesson.tools ?? []).map((id) => ({ id, tool: getTool(id) }))
  const materials = (lesson.materials ?? []).map((id) => ({ id, wood: getWood(id) }))
  const hasNeeds = tools.length > 0 || materials.length > 0

  return (
    <article className="page lesson page--rail" lang={usedLocale}>
      <div className="page__head">
        <p className="crumbs">
          {level && (
            <Link to={`/${lang}/level/${level.id}`}>
              <Icon name="arrow-right" size={18} className="icon--back" /> {levelTitle}
            </Link>
          )}
        </p>

        <h1 data-narr={NARR.title} className={reading(NARR.title)}>
          {text.title}
        </h1>
        <div className="lesson__meta">
          <span className="lmeta lmeta--diff" data-diff={lesson.difficulty}>
            {t(`diff.${lesson.difficulty}`, lang)}
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
          <div className="video-placeholder" role="note">
            {t('video.sourcing', lang)}
          </div>
        )}
      </div>

      <aside className="rail" aria-label={t('lesson.whatYouNeed', lang)}>
        {idx >= 0 && siblings.length > 1 && (
          <div className="rail__group">
            <p className="eyebrow">{t('lesson.yourPlace', lang)}</p>
            <p className="stepper" aria-hidden="true">
              {siblings.map((s, i) => (
                <span
                  key={s.id}
                  className={`stepper__dot ${
                    i === idx ? 'stepper__dot--here' : isComplete(s.id) ? 'stepper__dot--done' : ''
                  }`.trim()}
                />
              ))}
            </p>
            <p className="muted">
              {t('lesson.word', lang)} {idx + 1} / {siblings.length} · {levelTitle}
            </p>
          </div>
        )}

        {hasNeeds && (
          <div className="rail__group">
            <p className="eyebrow">{t('lesson.whatYouNeed', lang)}</p>
            <div className="chips-block">
              {tools.map(({ id, tool }) => (
                <span className="chip" key={id}>
                  <Icon name={toolIcon(id, tool?.category)} size={18} />
                  {tool ? pick(tool.names, lang) : id}
                </span>
              ))}
              {materials.map(({ id, wood }) => (
                <span className="chip chip--material" key={id}>
                  <Icon name={woodIcon(wood?.kind ?? '')} size={18} />
                  {wood ? pick(wood.names, lang) : id}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      <div className="page__body">
        <p className={`lesson__summary ${reading(NARR.summary) ?? ''}`.trim()} data-narr={NARR.summary}>
          {text.summary}
        </p>

        {lesson.hazards && lesson.hazards.length > 0 && (
          <section className="hazards" aria-label={t('lesson.safety', lang)}>
            <h2>
              <Icon name="warning" size={22} /> {t('lesson.safety', lang)}
            </h2>
            {lesson.hazards.map((id) => {
              const hazard = getHazard(id)
              if (!hazard) return null
              const ht = hazard.i18n[lang] ?? hazard.i18n.en
              return (
                <div className="hazard-card" key={id}>
                  <p className="hazard-card__label">
                    <Icon name="warning" size={20} />
                    {ht.label}
                  </p>
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

        {/* Authored per-lesson safety reminder. */}
        {text.safetyNote && (
          <aside className="safety-note" role="note">
            <p className="safety-note__label">
              <Icon name="warning" size={20} /> {t('lesson.safety', lang)}
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
          <nav className="lesson-nav" aria-label={t('a11y.lessonNav', lang)}>
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
                  <span className="lesson-nav__title">
                    {t('lesson.backTo', lang)} {levelTitle}
                  </span>
                </Link>
              )
            )}
          </nav>
        )}
      </div>
    </article>
  )
}
