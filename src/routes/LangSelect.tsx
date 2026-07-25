import { Link } from 'react-router-dom'
import { LOCALES, LOCALE_LABEL } from '../i18n/locales'

// The '/' splash. A real prerendered page (not a redirect hack) that lets the user
// pick a language and routes to that locale's home. This is also a genuine UX win:
// the first choice a low-literacy user makes is their own language, shown in its own script.
export default function LangSelect() {
  return (
    <section className="lang-select">
      <h1 className="lang-select__title">Kaarigar</h1>
      <p className="lang-select__tagline">
        Woodworking training · लकड़ी का काम सीखो · ਲੱਕੜ ਦਾ ਕੰਮ ਸਿੱਖੋ
      </p>
      <p className="lang-select__prompt">Choose your language · अपनी भाषा चुनो</p>
      <ul className="lang-select__list">
        {LOCALES.map((lang) => (
          <li key={lang}>
            <Link className="lang-select__btn" to={`/${lang}`}>
              {LOCALE_LABEL[lang]}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
