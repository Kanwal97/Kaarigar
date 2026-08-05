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

// Home (docs/WIREFRAMES.md · docs/redesign/PHASE-2-IDEATION.md).
// Continue-where-you-left-off first, then the Joinery Spine. Progress and streak sit in
// the context rail — beside the path on a desktop, above it on a phone.
//
// HYDRATION: every block renders at its final height in the prerendered HTML, with
// resting values, and hydration fills the numbers in. Previously the resume card and
// the whole progress block only appeared after hydration, so a returning learner
// watched the page rewrite itself (Phase 1, Finding H).
export default function Home({ lang }: { lang: Locale }) {
  const { data, hydrated } = useProgress()
  const cont = data.lastLesson
  const l0 = getLevel('l00')
  const l0Title = l0 ? `L0 · ${(l0.i18n[lang] ?? l0.i18n.en).title}` : 'L0'

  const totalLessons = lessonIndex.length
  const doneCount = data.completedLessons.length
  const pct = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0
  const resuming = hydrated && cont

  return (
    <section className="page home page--rail" lang={lang}>
      <FirstRunGuide lang={lang} />

      <div className="page__head">
        {resuming ? (
          <Link className="continue" to={`/${cont.lang}/lesson/${cont.lessonId}`}>
            <span className="continue__k eyebrow">{t('home.continue', lang)}</span>
            <span className="continue__t">{cont.title ?? ''}</span>
            <span className="continue__go">{t('home.resume', lang)}</span>
          </Link>
        ) : (
          <Link className="continue continue--start" to={`/${lang}/level/l00`}>
            <span className="continue__k eyebrow">{t('home.startHereK', lang)}</span>
            <span className="continue__t">{l0Title}</span>
            <span className="continue__go">{t('home.start', lang)}</span>
          </Link>
        )}
      </div>

      <aside className="rail" aria-label={t('home.overall', lang)}>
        <div className="rail__group">
          <div className="progress">
            <p className="progress__row">
              <span>{t('home.overall', lang)}</span>
              <span className="progress__pct">
                {hydrated ? `${doneCount}/${totalLessons}` : `—/${totalLessons}`} {t('home.lessonsDone', lang)}
              </span>
            </p>
            <div
              className="progress__track"
              role="progressbar"
              aria-valuenow={hydrated ? pct : 0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={t('home.overall', lang)}
            >
              <i className="progress__fill" style={{ width: `${hydrated ? pct : 0}%` }} />
            </div>
          </div>
          <p className="streak">
            <span aria-hidden="true">🔥</span>{' '}
            {hydrated && data.streak.count > 0
              ? `${data.streak.count} ${t('home.dayStreak', lang)}`
              : t('home.streakStart', lang)}
          </p>
        </div>
      </aside>

      <div className="page__body">
        <h1 className="home__h1">{t('home.path', lang)}</h1>
        <JoinerySpine lang={lang} />

        <h2 className="home__jump">{t('home.jumpIn', lang)}</h2>
        <div className="home__entries">
          {JUMP.map((j) => (
            <Link key={j.seg} className="jump-card" to={`/${lang}/${j.seg}`}>
              <span className="icon-tile">
                <Icon name={j.icon} size={26} />
              </span>
              <span>{t(j.key, lang)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
