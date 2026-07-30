import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { lessonIndex, tools, woods, glossary, fixit, lessonTitle, pick } from '../content/refdata'
import { toolEmoji, woodEmoji, fixEmoji } from '../content/emoji'
import { keywords, matchesQuery } from '../lib/search'
import { SearchBox } from '../components/SearchBox'
import { DiscoveryNav } from '../components/DiscoveryNav'

// Unified search — one box across lessons, tools, woods, glossary and Fix It, grouped by
// type. Lets a user who doesn't know which tab holds a thing find it in one place. Results
// are shown inline (the answer is right there); lessons + fixes also link out.
export default function Search({ lang }: { lang: Locale }) {
  const [q, setQ] = useState('')
  const has = q.trim().length > 0

  const lessons = has ? lessonIndex.filter((m) => matchesQuery(keywords(m.titles), q)) : []
  const toolHits = has ? tools.filter((x) => matchesQuery(keywords(x.names, x.roman, x.use), q)) : []
  const woodHits = has
    ? woods.filter((x) => matchesQuery(keywords(x.names, x.botanical, x.typicalUses, x.workability, x.grade), q))
    : []
  const glossHits = has ? glossary.filter((x) => matchesQuery(keywords(x.term, x.roman, x.definition), q)) : []
  const fixHits = has
    ? fixit.filter((f) => {
        const ft = f.i18n[lang] ?? f.i18n.en
        return matchesQuery(keywords(ft.title, ft.problem, ft.cause, ft.fix, f.category), q)
      })
    : []

  const total = lessons.length + toolHits.length + woodHits.length + glossHits.length + fixHits.length

  return (
    <section className="page discovery" lang={lang}>
      <h1>{t('nav.search', lang)}</h1>
      <DiscoveryNav lang={lang} />
      <SearchBox value={q} onChange={setQ} placeholder={t('search.everything', lang)} />

      {!has && <p className="muted">{t('search.prompt', lang)}</p>}
      {has && total === 0 && <p className="muted">{t('disc.noMatch', lang)} — “{q}”</p>}

      {lessons.length > 0 && (
        <section className="search-group">
          <h2>{t('search.lessons', lang)}</h2>
          <ul className="entity-grid">
            {lessons.map((m) => (
              <li key={m.id} className="entity">
                <span className="entity__icon entity__icon--emoji" aria-hidden="true">📖</span>
                <div className="entity__body">
                  <p className="entity__title">
                    <Link to={`/${lang}/lesson/${m.id}`}>{lessonTitle(m, lang)}</Link>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {toolHits.length > 0 && (
        <section className="search-group">
          <h2>
            <Link to={`/${lang}/tools`}>{t('nav.tools', lang)}</Link>
          </h2>
          <ul className="entity-grid">
            {toolHits.map((x) => (
              <li key={x.id} className="entity">
                <span className="entity__icon entity__icon--emoji" aria-hidden="true">
                  {toolEmoji(x.id, x.category)}
                </span>
                <div className="entity__body">
                  <p className="entity__title">{pick(x.names, lang)}</p>
                  {x.use && <p className="entity__sub">{pick(x.use, lang)}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {woodHits.length > 0 && (
        <section className="search-group">
          <h2>
            <Link to={`/${lang}/woods`}>{t('disc.woods', lang)}</Link>
          </h2>
          <ul className="entity-grid">
            {woodHits.map((x) => (
              <li key={x.id} className="entity">
                <span className="entity__icon entity__icon--emoji" aria-hidden="true">{woodEmoji(x.kind)}</span>
                <div className="entity__body">
                  <p className="entity__title">{pick(x.names, lang)}</p>
                  {x.typicalUses && <p className="entity__sub">{pick(x.typicalUses, lang)}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {glossHits.length > 0 && (
        <section className="search-group">
          <h2>
            <Link to={`/${lang}/glossary`}>{t('disc.glossary', lang)}</Link>
          </h2>
          <ul className="entity-grid">
            {glossHits.map((x) => (
              <li key={x.id} className="entity">
                <span className="entity__icon entity__icon--emoji" aria-hidden="true">📖</span>
                <div className="entity__body">
                  <p className="entity__title">{pick(x.term, lang)}</p>
                  {x.definition && <p className="entity__sub">{pick(x.definition, lang)}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {fixHits.length > 0 && (
        <section className="search-group">
          <h2>
            <Link to={`/${lang}/fix`}>{t('nav.fix', lang)}</Link>
          </h2>
          <ul className="entity-grid">
            {fixHits.map((f) => {
              const ft = f.i18n[lang] ?? f.i18n.en
              return (
                <li key={f.id} className="entity">
                  <span className="entity__icon entity__icon--emoji" aria-hidden="true">{fixEmoji(f.category)}</span>
                  <div className="entity__body">
                    <p className="entity__title">
                      <Link to={`/${lang}/fix`}>{ft.title}</Link>
                    </p>
                    {ft.fix && <p className="entity__sub">{ft.fix}</p>}
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </section>
  )
}
