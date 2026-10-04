import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [vue({ template: { transformAssetUrls } }), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  build: {
    // mantém a pasta usada pelo `serve -s build` (deploy no Heroku)
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/vuetify')) return 'vuetify'
          if (id.includes('node_modules/')) return 'vendor'
          if (id.includes('src/data/municipios.json')) return 'municipios'
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    server: {
      deps: { inline: ['vuetify'] },
    },
  },
})
