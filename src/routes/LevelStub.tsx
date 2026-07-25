import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'

// A NESTED deep route (/<lang>/level/l00). Its existence as a prerendered file
// (dist/<lang>/level/l00/index.html) is the proof that deep-linking + refresh work
// two levels deep on GitHub Pages. Real Level view is built in M4.
export default function LevelStub({ lang }: { lang: Locale }) {
  return (
    <section className="level-stub" lang={lang} data-locale={lang}>
      <p className="crumbs">
        <Link to={`/${lang}`}>← Home</Link> · <Link to="/">Languages</Link>
      </p>
      <h1>L0 · Safety &amp; workshop setup</h1>
      <p>
        Deep-route skeleton at <code>/{lang}/level/l00</code>. Refresh this page — it loads
        directly from its own HTML file. Press back — it returns to the {lang} home.
      </p>
      <p className="level-stub__todo">
        Real lessons, videos, safety citations, and self-checks arrive in M3–M5.
      </p>
    </section>
  )
}
