import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/projects/district-co/',
  build: {
    outDir: '../district-co',
    emptyOutDir: true,
  },
  server: {
    port: 5176,
    open: '/projects/district-co/',
  },
})
