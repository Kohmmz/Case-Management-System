import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/auth': 'http://localhost:5000',
      '/api': 'http://localhost:5000',
      '/clients': 'http://localhost:5000',
      '/adv': 'http://localhost:5000',
      '/docs': 'http://localhost:5000',
      '/resources': 'http://localhost:5000',
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/.*/, to: '/index.html' }
      ],
    },
  },
})