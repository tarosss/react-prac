import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // これを追加（0.0.0.0 でリッスンし、外部からのアクセスを許可）
    port: 5173,
    watch: {
      usePolling: true,
    },
    
  }
})
