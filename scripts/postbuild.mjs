// Post-build step: create dist/404.html as a copy of the prerendered index.html.
// GitHub Pages serves 404.html for any path it can't find as a file. Since our known
// routes ARE real prerendered files, 404.html only ever handles truly-unknown paths —
// it boots the SPA shell so React Router can render the NotFound view (or client-route
// to the right place) instead of GitHub's raw 404. See docs/PLAN.md §2.1.
import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const index = join(dist, 'index.html')
const notFound = join(dist, '404.html')

if (!existsSync(index)) {
  console.error(`postbuild: ${index} not found — did the build/prerender run?`)
  process.exit(1)
}

copyFileSync(index, notFound)
console.log('postbuild: wrote dist/404.html (SPA fallback) from index.html')
