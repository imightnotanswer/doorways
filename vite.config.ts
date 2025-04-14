import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/doorways/',
  publicDir: 'public',
  server: {
    port: 5173,
    strictPort: true,
  },
  envPrefix: 'VITE_'
})
