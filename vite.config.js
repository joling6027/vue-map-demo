import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      external: ['vuetify/lib'], // Mark 'vuetify/lib' as external
    },
    define: {
      'process.env.VITE_APP_GOOGLE_API_KEY': JSON.stringify(process.env.VITE_APP_GOOGLE_API_KEY),
    },
  },
})
