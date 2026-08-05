import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { tools, getLessonMeta, lessonTitle, pick } from '../content/refdata'
import { toolIcon } from '../content/icons'
import { keywords, matchesQuery } from '../lib/search'
import { t } from '../i18n/ui'
import { SearchBox } from '../components/SearchBox'
import { DiscoveryNav } from '../components/DiscoveryNav'
import { RefDraftNotice } from '../components/RefDraftNotice'
import { Icon } from '../components/ui/Icon'

export default function ToolFinder({ lang }: { lang: Locale }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<string | null>(null)

  const cats = Array.from(new Set(tools.map((x) => x.category).filter(Boolean))) as string[]
  const list = tools.filter(
    (x) => (!cat || x.category === cat) && matchesQuery(keywords(x.names, x.roman, x.use), q),
  )

  return (
    <section className="page discovery" lang={lang}>
      <h1>{t('nav.tools', lang)}</h1>
      <DiscoveryNav lang={lang} />
      <RefDraftNotice locale={lang} />
      <SearchBox value={q} onChange={setQ} placeholder={t('search.tool', lang)} />

      <div className="chip-filters" role="group" aria-label={t('a11y.category', lang)}>
        <button type="button" className={`filter ${!cat ? 'is-on' : ''}`.trim()} onClick={() => setCat(null)}>
          {t('filter.all', lang)}
        </button>
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter ${cat === c ? 'is-on' : ''}`.trim()}
            aria-pressed={cat === c}
            onClick={() => setCat(cat === c ? null : c)}
          >
            {t(`cat.${c}`, lang)}
          </button>
        ))}
      </div>

      <ul className="entity-grid">
        {list.map((tool) => (
          <li key={tool.id} className="entity">
            <span className="icon-tile">
              <Icon name={toolIcon(tool.id, tool.category)} size={26} />
            </span>
            <div className="entity__body">
              <p className="entity__title">
                {pick(tool.names, lang)}
                {tool.roman ? ` · ${tool.roman}` : ''}
              </p>
              {tool.use && <p className="entity__sub">{pick(tool.use, lang)}</p>}
              {!tool.verified && (
                <span className="entity__flag">
                  <Icon name="flag" size={14} /> {t('flag.unverifiedTerm', lang)}
                </span>
              )}
              {/* Was "Used in a lesson →" — hard-coded English, repeated once per lesson
                  without ever saying WHICH lesson. Now it names the lesson, localised. */}
              {tool.usedInLessons && tool.usedInLessons.length > 0 && (
                <p className="entity__links">
                  {tool.usedInLessons.map((id) => {
                    const meta = getLessonMeta(id)
                    return meta ? (
                      <Link key={id} to={`/${lang}/lesson/${id}`}>
                        {lessonTitle(meta, lang)}
                      </Link>
                    ) : null
                  })}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {list.length === 0 && (
        <p className="muted">{t('disc.noMatch', lang)} — “{q}”</p>
      )}
    </section>
  )
}
