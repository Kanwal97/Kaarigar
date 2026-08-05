import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'

// Stale-deploy recovery. When a lazily-imported chunk (e.g. a lesson body) fails to load,
// it's almost always because a new version shipped and the old hashed chunk no longer
// exists — the request then falls back to index.html, and trying to run/parse that HTML is
// what produced "Unexpected token '<' … is not valid JSON" on link clicks. Vite fires
// `vite:preloadError` in exactly this case; we reload ONCE (loop-guarded) to pull the fresh
// build. Offline is unaffected: every chunk is precached, so imports succeed from the SW.
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', () => {
    const KEY = 'kaarigar:chunkReloadAt'
    const last = Number(sessionStorage.getItem(KEY) || '0')
    if (Date.now() - last > 10_000) {
      sessionStorage.setItem(KEY, String(Date.now()))
      window.location.reload()
    }
  })
}

// vite-react-ssg prerenders every static route in `routes` to a real HTML file
// at build time, then hydrates in the browser. basename = Vite base ('/Kaarigar/')
// so React Router matches paths correctly under the GitHub Pages project subpath.
export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
})
