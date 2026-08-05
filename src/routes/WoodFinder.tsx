import { useState } from 'react'
import type { Locale } from '../i18n/locales'
import { woods, pick } from '../content/refdata'
import { woodIcon } from '../content/icons'
import { Icon } from '../components/ui/Icon'
import { keywords, matchesQuery } from '../lib/search'
import { t } from '../i18n/ui'
import { SearchBox } from '../components/SearchBox'
import { DiscoveryNav } from '../components/DiscoveryNav'
import { RefDraftNotice } from '../components/RefDraftNotice'

const WATER_LABEL: Record<string, string> = {
  none: 'water.none',
  'moisture-resistant': 'water.moisture-resistant',
  'boiling-water-resistant': 'water.boiling-water-resistant',
  waterproof: 'water.waterproof',
  na: '',
}

export default function WoodFinder({ lang }: { lang: Locale }) {
  const [q, setQ] = useState('')
  const list = woods.filter((w) =>
    matchesQuery(keywords(w.names, w.botanical, w.workability, w.typicalUses, w.grade), q),
  )

  return (
    <section className="page discovery" lang={lang}>
      <h1>{t('disc.woodsTitle', lang)}</h1>
      <DiscoveryNav lang={lang} />
      <RefDraftNotice locale={lang} />
      <SearchBox value={q} onChange={setQ} placeholder={t('search.wood', lang)} />

      <ul className="entity-grid">
        {list.map((w) => (
          <li key={w.id} className="entity">
            <span className="icon-tile icon-tile--success">
              <Icon name={woodIcon(w.kind)} size={26} />
            </span>
            <div className="entity__body">
              <p className="entity__title">{pick(w.names, lang)}</p>
              <p className="entity__tags">
                <span className="tag-mini">{t(`woodkind.${w.kind}`, lang)}</span>
                {w.priceTier && <span className="tag-mini">{t(`price.${w.priceTier}`, lang)}</span>}
                {w.isStandard && <span className="tag-mini">{w.isStandard}</span>}
                {w.waterResistance && WATER_LABEL[w.waterResistance] && (
                  <span className="tag-mini">{t(WATER_LABEL[w.waterResistance]!, lang)}</span>
                )}
              </p>
              {w.typicalUses && <p className="entity__sub">{pick(w.typicalUses, lang)}</p>}
              {w.botanical && <p className="entity__botanical">{w.botanical}</p>}
              {w.verified === false && (
                <span className="entity__flag">
                  <Icon name="flag" size={14} /> {t('flag.checkFigures', lang)}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {list.length === 0 && <p className="muted">{t('disc.noMatch', lang)} — “{q}”</p>}
    </section>
  )
}
