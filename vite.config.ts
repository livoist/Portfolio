import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Deployed at https://livoist.github.io/Portfolio/ (GitHub Pages project site)
  base: '/Portfolio/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@c': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@css': fileURLToPath(new URL('./src/assets/style', import.meta.url)),
      '@img': fileURLToPath(new URL('./src/assets/img', import.meta.url)),
    },
  },
})
