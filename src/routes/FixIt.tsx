import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { fixit, getLessonMeta, lessonTitle } from '../content/refdata'
import { fixEmoji } from '../content/emoji'
import { keywords, matchesQuery } from '../lib/search'
import { SearchBox } from '../components/SearchBox'

// Fix It — common mistakes and how to recover (docs/PLAN.md §2.2). Problem-solving
// intent, distinct from Learn.
export default function FixIt({ lang }: { lang: Locale }) {
  const [q, setQ] = useState('')
  const list = fixit.filter((f) => {
    const ft = f.i18n[lang] ?? f.i18n.en
    return matchesQuery(keywords(ft.title, ft.problem, ft.cause, ft.fix, f.category), q)
  })

  return (
    <section className="page" lang={lang}>
      <h1>{t('nav.fix', lang)}</h1>
      <p className="muted">{t('fixit.intro', lang)}</p>
      <SearchBox value={q} onChange={setQ} placeholder={t('search.fixit', lang)} />

      <div className="fixit-list">
        {list.map((f) => {
          const ft = f.i18n[lang] ?? f.i18n.en
          return (
            <details className="fixit" key={f.id}>
              <summary className="fixit__summary">
                <span className="fixit__icon" aria-hidden="true">{fixEmoji(f.category)}</span>
                <span className="fixit__title">{ft.title}</span>
                {f.category && <span className="tag-mini">{f.category}</span>}
              </summary>
              <div className="fixit__body">
                <p>
                  <strong>{t('fixit.problem', lang)}</strong> {ft.problem}
                </p>
                {ft.cause && (
                  <p>
                    <strong>{t('fixit.why', lang)}</strong> {ft.cause}
                  </p>
                )}
                <p className="fixit__fix">
                  <strong>{t('fixit.fix', lang)}</strong> {ft.fix}
                </p>
                {f.relatedLessons?.map((id) => {
                  const m = getLessonMeta(id)
                  return m ? (
                    <p key={id} className="fixit__link">
                      <Link to={`/${lang}/lesson/${id}`}>{lessonTitle(m, lang)} →</Link>
                    </p>
                  ) : null
                })}
              </div>
            </details>
          )
        })}
      </div>

      {list.length === 0 && <p className="muted">{t('disc.noMatch', lang)} — “{q}”</p>}
    </section>
  )
}
