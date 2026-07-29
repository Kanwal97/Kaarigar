import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { tools, getLessonMeta, pick } from '../content/refdata'
import { toolEmoji } from '../content/emoji'
import { keywords, matchesQuery } from '../lib/search'
import { t } from '../i18n/ui'
import { SearchBox } from '../components/SearchBox'
import { DiscoveryNav } from '../components/DiscoveryNav'
import { RefDraftNotice } from '../components/RefDraftNotice'

export default function ToolFinder({ lang }: { lang: Locale }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<string | null>(null)

  const cats = Array.from(new Set(tools.map((t) => t.category).filter(Boolean))) as string[]
  const list = tools.filter(
    (t) => (!cat || t.category === cat) && matchesQuery(keywords(t.names, t.roman, t.use), q),
  )

  return (
    <section className="page discovery" lang={lang}>
      <h1>{t('nav.tools', lang)}</h1>
      <DiscoveryNav lang={lang} />
      <RefDraftNotice locale={lang} />
      <SearchBox value={q} onChange={setQ} placeholder={t('search.tool', lang)} />

      <div className="chip-filters" role="group" aria-label="Category">
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
        {list.map((t) => (
          <li key={t.id} className="entity">
            <span className="entity__icon entity__icon--emoji" aria-hidden="true">
              {toolEmoji(t.id, t.category)}
            </span>
            <div className="entity__body">
              <p className="entity__title">
                {pick(t.names, lang)}
                {t.roman ? ` · ${t.roman}` : ''}
              </p>
              {t.use && <p className="entity__sub">{pick(t.use, lang)}</p>}
              {!t.verified && <span className="entity__flag">unverified term</span>}
              {t.usedInLessons && t.usedInLessons.length > 0 && (
                <p className="entity__links">
                  {t.usedInLessons.map((id) =>
                    getLessonMeta(id) ? (
                      <Link key={id} to={`/${lang}/lesson/${id}`}>
                        Used in a lesson →
                      </Link>
                    ) : null,
                  )}
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
