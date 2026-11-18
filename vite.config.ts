import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Deployed at https://livoist.github.io/Portfolio/ (GitHub Pages project site)
  base: '/Portfolio/',
  plugins: [vue()],
  build: {
    rolldownOptions: {
      output: {
        // Split third-party code that rarely changes into its own chunks, so a deploy
        // that only touches our own code (new portfolio item, copy edits, ...) keeps
        // their filename hashes — returning visitors reuse them from browser cache and
        // only re-download the small app chunk.
        //
        // NOTE: deliberately no catch-all `/node_modules/` group. three.js and
        // three.meshline are lazy-loaded via import('@/meshAn') in EnterView.vue; a
        // catch-all would pull them into a vendor chunk loaded up front and undo that.
        codeSplitting: {
          groups: [
            {
              name: 'vue-vendor',
              test: /[\\/]node_modules[\\/](@vue|vue|pinia|vue-i18n|@intlify)[\\/]/,
            },
            {
              name: 'vendor',
              test: /[\\/]node_modules[\\/](gsap|smooth-scrollbar|core-js|tslib|charming)[\\/]/,
            },
          ],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@c': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@css': fileURLToPath(new URL('./src/assets/style', import.meta.url)),
      '@img': fileURLToPath(new URL('./src/assets/img', import.meta.url)),
    },
  },
})
