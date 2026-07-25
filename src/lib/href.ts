// Prefix a path with the Vite base ('/Kaarigar/') so nothing hardcodes the repo name.
// Use this for raw <a href>, asset URLs, and meta/canonical links.
// NOTE: React Router <Link to="..."> already applies the router basename, so do NOT
// wrap Link targets with href() — that would double the prefix.
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return base + (path.startsWith('/') ? path : `/${path}`)
}
