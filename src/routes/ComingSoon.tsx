import type { Locale } from '../i18n/locales'

// Placeholder for tab destinations not yet built. Written as an instruction, not an
// apology (docs/PLAN.md §2.5). Real screens land in M6/M8.
export default function ComingSoon({
  lang,
  title,
  note,
}: {
  lang: Locale
  title: string
  note: string
}) {
  return (
    <section className="page" lang={lang}>
      <h1>{title}</h1>
      <p className="muted">{note}</p>
    </section>
  )
}
