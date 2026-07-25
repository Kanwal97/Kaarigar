import { Link } from 'react-router-dom'

// Rendered for any path not prerendered. On GitHub Pages this is reached via the
// 404.html fallback (a copy of index.html made in scripts/postbuild.mjs), which boots
// the app so React Router can show this instead of GitHub's raw 404.
// Empty/error states are written as instructions, not apologies (docs/PLAN.md §2.5).
export default function NotFound() {
  return (
    <section className="notfound">
      <h1>Page not found</h1>
      <p>That page doesn’t exist yet. Pick your language to start:</p>
      <p>
        <Link className="notfound__btn" to="/">
          Choose language →
        </Link>
      </p>
    </section>
  )
}
