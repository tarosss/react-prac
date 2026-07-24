import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
import { createLocalApiMiddleware } from './src/server/api.js'

export default defineConfig({
  plugins: [
    react(),
    createLocalApiMiddleware(),
  ],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
})
