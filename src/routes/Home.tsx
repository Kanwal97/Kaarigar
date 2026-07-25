import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { useProgress } from '../lib/progress'
import { getLevel } from '../content/refdata'
import { JoinerySpine } from '../components/JoinerySpine'

// Home (docs/WIREFRAMES.md): continue-where-you-left-off first, then streak (neutral),
// then the Joinery Spine. Chrome is localised via the UI dictionary; the prerendered
// HTML shows the "Start here" default and hydration swaps in a resume card.
export default function Home({ lang }: { lang: Locale }) {
  const { data, hydrated } = useProgress()
  const cont = data.lastLesson
  const l0 = getLevel('l00')
  const l0Title = l0 ? `L0 · ${(l0.i18n[lang] ?? l0.i18n.en).title}` : 'L0'

  return (
    <section className="page home" lang={lang}>
      {hydrated && cont ? (
        <Link className="continue" to={`/${cont.lang}/lesson/${cont.lessonId}`}>
          <span className="continue__k">{t('home.continue', lang)}</span>
          <span className="continue__t">{cont.title ?? ''}</span>
          <span className="continue__go">{t('home.resume', lang)}</span>
        </Link>
      ) : (
        <Link className="continue continue--start" to={`/${lang}/level/l00`}>
          <span className="continue__k">{t('home.startHereK', lang)}</span>
          <span className="continue__t">{l0Title}</span>
          <span className="continue__go">{t('home.start', lang)}</span>
        </Link>
      )}

      {hydrated && data.streak.count > 0 && (
        <p className="streak">
          🔥 {data.streak.count} {t('home.dayStreak', lang)}
        </p>
      )}

      <h1 className="home__h1">{t('home.path', lang)}</h1>
      <JoinerySpine lang={lang} />

      <h2 className="home__jump">{t('home.jumpIn', lang)}</h2>
      <div className="home__entries">
        <Link className="entry" to={`/${lang}/tools`}>
          {t('nav.tools', lang)}
        </Link>
        <Link className="entry" to={`/${lang}/build`}>
          {t('nav.build', lang)}
        </Link>
        <Link className="entry" to={`/${lang}/fix`}>
          {t('nav.fix', lang)}
        </Link>
      </div>
    </section>
  )
}
