import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { useProgress } from '../lib/progress'
import { getLevel, lessonIndex } from '../content/refdata'
import { JoinerySpine } from '../components/JoinerySpine'
import { FirstRunGuide } from '../components/FirstRunGuide'
import { Icon, type IconName } from '../components/ui/Icon'

const JUMP: { seg: string; icon: IconName; key: string }[] = [
  { seg: 'tools', icon: 'tools', key: 'nav.tools' },
  { seg: 'build', icon: 'build', key: 'nav.build' },
  { seg: 'fix', icon: 'fix', key: 'nav.fix' },
]

// Home (docs/WIREFRAMES.md): continue-where-you-left-off first, then streak (neutral),
// then the Joinery Spine. Chrome is localised via the UI dictionary; the prerendered
// HTML shows the "Start here" default and hydration swaps in a resume card.
export default function Home({ lang }: { lang: Locale }) {
  const { data, hydrated } = useProgress()
  const cont = data.lastLesson
  const l0 = getLevel('l00')
  const l0Title = l0 ? `L0 · ${(l0.i18n[lang] ?? l0.i18n.en).title}` : 'L0'

  const totalLessons = lessonIndex.length
  const doneCount = data.completedLessons.length
  const pct = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0

  return (
    <section className="page home" lang={lang}>
      <FirstRunGuide lang={lang} />
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

      {hydrated && doneCount > 0 && (
        <div className="home-progress">
          <div className="home-progress__row">
            <span>{t('home.overall', lang)}</span>
            <span className="home-progress__pct">
              {doneCount}/{totalLessons} {t('home.lessonsDone', lang)}
            </span>
          </div>
          <div className="progress__track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <i style={{ width: `${pct}%` }} />
          </div>
        </div>
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
        {JUMP.map((j) => (
          <Link key={j.seg} className="jump-card" to={`/${lang}/${j.seg}`}>
            <span className="jump-card__icon">
              <Icon name={j.icon} />
            </span>
            <span>{t(j.key, lang)}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
