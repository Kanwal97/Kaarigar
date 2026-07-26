import { useState } from 'react'
import type { Locale } from '../i18n/locales'
import { glossary, pick } from '../content/refdata'
import { keywords, matchesQuery } from '../lib/search'
import { t } from '../i18n/ui'
import { SearchBox } from '../components/SearchBox'
import { DiscoveryNav } from '../components/DiscoveryNav'
import { RefDraftNotice } from '../components/RefDraftNotice'

const CATS = ['tool', 'wood', 'material', 'joint', 'technique', 'finishing', 'hardware', 'business', 'safety']

export default function Glossary({ lang }: { lang: Locale }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<string | null>(null)

  const list = glossary.filter(
    (g) => (!cat || g.category === cat) && matchesQuery(keywords(g.term, g.roman, g.definition), q),
  )
  const present = CATS.filter((c) => glossary.some((g) => g.category === c))

  return (
    <section className="page discovery" lang={lang}>
      <h1>{t('disc.glossary', lang)}</h1>
      <DiscoveryNav lang={lang} />
      <RefDraftNotice locale={lang} />
      <SearchBox value={q} onChange={setQ} placeholder={t('search.glossary', lang)} />

      <div className="chip-filters" role="group" aria-label="Category">
        <button type="button" className={`filter ${!cat ? 'is-on' : ''}`.trim()} onClick={() => setCat(null)}>
          {t('filter.all', lang)}
        </button>
        {present.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter ${cat === c ? 'is-on' : ''}`.trim()}
            aria-pressed={cat === c}
            onClick={() => setCat(cat === c ? null : c)}
          >
            {t(`gcat.${c}`, lang)}
          </button>
        ))}
      </div>

      <ul className="entity-grid">
        {list.map((g) => (
          <li key={g.id} className="entity">
            <span className="entity__icon" aria-hidden="true">
              {pick(g.term, lang).charAt(0).toUpperCase()}
            </span>
            <div className="entity__body">
              <p className="entity__title">
                {pick(g.term, lang)}
                {g.roman ? ` · ${g.roman}` : ''}
              </p>
              {g.definition && <p className="entity__sub">{pick(g.definition, lang)}</p>}
              {g.category && <span className="tag-mini">{t(`gcat.${g.category}`, lang)}</span>}
            </div>
          </li>
        ))}
      </ul>

      {list.length === 0 && <p className="muted">{t('disc.noMatch', lang)} — “{q}”</p>}
    </section>
  )
}
