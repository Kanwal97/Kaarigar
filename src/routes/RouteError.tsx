import { useRouteError } from 'react-router-dom'

// Friendly fallback for any uncaught route error, replacing React Router's raw
// "Unexpected Application Error!". The common case — a stale-deploy chunk failure — is
// already auto-reloaded by the vite:preloadError handler in main.tsx; this covers the rest.
// Bilingual (Hindi + English) static text: the error boundary sits above locale context.
export default function RouteError() {
  const error = useRouteError()
  return (
    <section className="page" style={{ textAlign: 'center', paddingTop: '10vh' }}>
      <h1>कुछ रुक गया · Something went wrong</h1>
      <p className="muted">कृपया पेज दोबारा खोलें। · Please reload the page.</p>
      <p>
        <button type="button" className="btn btn--cta" onClick={() => window.location.reload()}>
          दोबारा खोलें · Reload
        </button>
      </p>
      {import.meta.env.DEV && (
        <pre style={{ textAlign: 'left', overflowX: 'auto', color: 'var(--danger)' }}>
          {error instanceof Error ? error.stack : String(error)}
        </pre>
      )}
    </section>
  )
}
