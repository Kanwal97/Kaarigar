import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { projects } from '../content/refdata'

// Project Library — "I want to build X" (docs/PLAN.md §2.2). The Build tab.
export default function Projects({ lang }: { lang: Locale }) {
  return (
    <section className="page" lang={lang}>
      <h1>{t('nav.build', lang)}</h1>
      <p className="muted">{t('projects.intro', lang)}</p>
      <ul className="entity-grid">
        {projects.map((p) => {
          const pt = p.i18n[lang] ?? p.i18n.en
          return (
            <li key={p.id} className="entity">
              <span className="entity__icon" aria-hidden="true">{pt.title.charAt(0)}</span>
              <div className="entity__body">
                <Link className="project-link" to={`/${lang}/project/${p.id}`}>
                  {pt.title}
                </Link>
                <p className="entity__sub">{pt.summary}</p>
                <p className="entity__tags">
                  <span className="tag-mini">{t(`diff.${p.difficulty}`, lang)}</span>
                  {p.estHours ? <span className="tag-mini">~{p.estHours} hrs</span> : null}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
