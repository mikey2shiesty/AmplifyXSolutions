import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// React source lives in `projects/prestige-harbour-src/`.
// `npm run build` emits the production bundle into `projects/prestige-harbour/`
// (sibling folder) so live-server at the repo root can serve it at
// /projects/prestige-harbour/ — which is also the real production URL.
export default defineConfig({
  plugins: [react()],
  base: '/projects/prestige-harbour/',
  build: {
    outDir: '../prestige-harbour',
    emptyOutDir: true,
  },
  server: {
    port: 5175,
    open: '/projects/prestige-harbour/',
  },
})
