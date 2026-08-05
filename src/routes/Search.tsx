import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { lessonIndex, tools, woods, glossary, fixit, lessonTitle, pick } from '../content/refdata'
import { toolIcon, woodIcon, fixIcon, glossaryIcon } from '../content/icons'
import { keywords, matchesQuery } from '../lib/search'
import { SearchBox } from '../components/SearchBox'
import { DiscoveryNav } from '../components/DiscoveryNav'
import { Icon } from '../components/ui/Icon'

// Unified search — one box across lessons, tools, woods, glossary and Fix It, grouped by
// type. Lets a user who doesn't know which tab holds a thing find it in one place.
//
// Redesign Phase 3: this route was only reachable from the discovery sub-nav, which is
// precisely the user who can't guess a category. It now has a permanent home in the top
// bar (see components/Layout.tsx), and each group states how many hits it has so the
// answer is findable without scrolling the whole page.
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
  const count = (n: number) => (
    <span className="search-count">
      {' '}
      · {n} {t('search.results', lang)}
    </span>
  )

  return (
    <section className="page discovery" lang={lang}>
      <h1>{t('nav.search', lang)}</h1>
      <DiscoveryNav lang={lang} />
      <SearchBox value={q} onChange={setQ} placeholder={t('search.everything', lang)} />

      {!has && <p className="muted">{t('search.prompt', lang)}</p>}
      {has && total === 0 && <p className="muted">{t('disc.noMatch', lang)} — “{q}”</p>}

      {lessons.length > 0 && (
        <section className="search-group">
          <h2>
            {t('search.lessons', lang)}
            {count(lessons.length)}
          </h2>
          <ul className="entity-grid">
            {lessons.map((m) => (
              <li key={m.id} className="entity">
                <span className="icon-tile icon-tile--info">
                  <Icon name="book" size={26} />
                </span>
                <div className="entity__body">
                  <p className="entity__title">
                    <Link to={`/${lang}/lesson/${m.id}`}>{lessonTitle(m, lang)}</Link>
                  </p>
                  <p className="entity__sub">
                    {t('level.word', lang)} {m.level} · {m.estMinutes} min
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
            {count(toolHits.length)}
          </h2>
          <ul className="entity-grid">
            {toolHits.map((x) => (
              <li key={x.id} className="entity">
                <span className="icon-tile">
                  <Icon name={toolIcon(x.id, x.category)} size={26} />
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
            {count(woodHits.length)}
          </h2>
          <ul className="entity-grid">
            {woodHits.map((x) => (
              <li key={x.id} className="entity">
                <span className="icon-tile icon-tile--success">
                  <Icon name={woodIcon(x.kind)} size={26} />
                </span>
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
            {count(glossHits.length)}
          </h2>
          <ul className="entity-grid">
            {glossHits.map((x) => (
              <li key={x.id} className="entity">
                <span className="icon-tile icon-tile--info">
                  <Icon name={glossaryIcon(x.category)} size={26} />
                </span>
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
            {count(fixHits.length)}
          </h2>
          <ul className="entity-grid">
            {fixHits.map((f) => {
              const ft = f.i18n[lang] ?? f.i18n.en
              return (
                <li key={f.id} className="entity">
                  <span className="icon-tile icon-tile--danger">
                    <Icon name={fixIcon(f.category)} size={26} />
                  </span>
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
