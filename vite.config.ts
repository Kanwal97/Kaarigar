import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Base path = repo name, because the site is served from
// https://<user>.github.io/Kaarigar/ (project site, not a user site).
// Every asset/route resolves under this prefix; nothing hardcodes it (see src/lib/href.ts).
export default defineConfig({
  base: '/Kaarigar/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Kaarigar — Woodworking training',
        short_name: 'Kaarigar',
        description:
          'Free woodworking training for carpenters. Hindi, English, Punjabi, Haryanvi.',
        lang: 'hi',
        theme_color: '#7E4632',
        background_color: '#FCF8EF',
        display: 'standalone',
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the app shell, ALL bundled JS (content JSON is bundled in), CSS and
        // fonts — so lessons/glossary/tools work offline. HTML pages are prerendered
        // AFTER this hook, so we serve the SPA shell via navigateFallback and let the
        // cached JS client-render any route offline. YouTube video is NOT cached
        // (cross-origin + ToS) and is honestly online-only.
        globPatterns: ['**/*.{js,css,woff2,svg,html}'],
        navigateFallback: 'index.html',
        // The SPA-shell fallback is for NAVIGATIONS only — never for hashed asset requests
        // (any URL whose last path segment has a file extension). Without this, a missing
        // chunk after a redeploy could be answered with index.html (HTML), which the module
        // loader then chokes on ("Unexpected token '<'"). Let such requests 404 cleanly so
        // Vite's preloadError handler (src/main.tsx) can reload to the fresh build instead.
        navigateFallbackDenylist: [/\/[^/?]+\.[^/?]+$/],
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 3_000_000,
      },
    }),
  ],
  build: {
    target: 'es2020',
  },
})
