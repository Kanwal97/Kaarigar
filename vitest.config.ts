import { defineConfig } from 'vitest/config'

// Separate from vite.config.ts so the PWA plugin doesn't load during tests.
// base mirrors the app so import.meta.env.BASE_URL === '/Kaarigar/' in tests.
// 'node' environment + a localStorage polyfill keeps startup fast; a single fork
// avoids worker-spawn timeouts in constrained sandboxes.
export default defineConfig({
  base: '/Kaarigar/',
  test: {
    environment: 'node',
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.test.ts'],
    pool: 'forks',
    poolOptions: { forks: { singleFork: true } },
  },
})
