import { defineConfig } from 'vite'

export default defineConfig({
  base: '/bot-empire/',
  build: {
    outDir: 'dist',
    target: 'es2022',
  },
})
