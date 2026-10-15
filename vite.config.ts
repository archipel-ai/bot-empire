import { defineConfig } from 'vite'

export default defineConfig({
  base: './',  // chemins relatifs : GitHub Pages (/bot-empire/) et itch.io (iframe)
  build: {
    outDir: 'dist',
    target: 'es2022',
  },
})
