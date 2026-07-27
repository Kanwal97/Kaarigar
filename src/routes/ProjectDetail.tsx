import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { getProject, getLessonMeta, getTool, getWood, pick, lessonTitle } from '../content/refdata'
import NotFound from './NotFound'

export default function ProjectDetail({ lang, projectId }: { lang: Locale; projectId: string }) {
  const p = getProject(projectId)
  if (!p) return <NotFound />
  const pt = p.i18n[lang] ?? p.i18n.en
  const skills = (p.skillsNeeded ?? []).map((id) => getLessonMeta(id)).filter(Boolean)

  return (
    <article className="page lesson" lang={lang}>
      <p className="crumbs">
        <Link to={`/${lang}/build`}>← {t('nav.build', lang)}</Link>
      </p>
      <h1>{pt.title}</h1>
      <div className="lesson__meta">
        <span className="lmeta lmeta--diff" data-diff={p.difficulty}>
          {t(`diff.${p.difficulty}`, lang)}
        </span>
        {p.estHours ? <span className="lmeta">~{p.estHours} hrs</span> : null}
      </div>

      {pt.outcome && (
        <section className="lesson__objectives">
          <h2>{t('lesson.objectives', lang)}</h2>
          <p>{pt.outcome}</p>
        </section>
      )}

      <p className="lesson__summary">{pt.summary}</p>

      {p.estimateHint && (
        <div className="callout">
          <strong>{t('projects.estimating', lang)}</strong> {pick(p.estimateHint, lang)}
        </div>
      )}

      {skills.length > 0 && (
        <section>
          <h2>{t('projects.skills', lang)}</h2>
          <ol className="lesson-list">
            {(p.skillsNeeded ?? []).map((id) => {
              const m = getLessonMeta(id)
              return m ? (
                <li key={id}>
                  <Link className="lesson-list__item" to={`/${lang}/lesson/${id}`}>
                    <span className="lesson-list__body">
                      <span className="lesson-list__title">{lessonTitle(m, lang)}</span>
                    </span>
                    <span className="lesson-list__go" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ) : null
            })}
          </ol>
        </section>
      )}

      {(p.tools?.length || p.materials?.length) && (
        <div className="chips-block">
          {p.tools?.map((id) => {
            const tool = getTool(id)
            return (
              <span className="chip" key={id}>
                {tool ? pick(tool.names, lang) : id}
              </span>
            )
          })}
          {p.materials?.map((id) => {
            const w = getWood(id)
            return (
              <span className="chip chip--material" key={id}>
                {w ? pick(w.names, lang) : id}
              </span>
            )
          })}
        </div>
      )}
    </article>
  )
}
