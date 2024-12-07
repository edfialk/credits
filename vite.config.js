import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        "name": "Rewards",
        "short_name": "Rewards",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "lang": "en",
        "scope": "/",
        "icons": [
          {
            "src": "images/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "images/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
          }
        ],
        "theme_color": "#111826"
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
