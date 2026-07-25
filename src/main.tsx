import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'

// vite-react-ssg prerenders every static route in `routes` to a real HTML file
// at build time, then hydrates in the browser. basename = Vite base ('/Kaarigar/')
// so React Router matches paths correctly under the GitHub Pages project subpath.
export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
})
