import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        // target:"http://localhost:5002",
        target:"http://backend:5002",
        // target:"http://backend-service:5002",
        //target: import.meta.env.VITE_SOCKET_URL
        changeOrigin: true,
        secure: false,

      }
    }
  }
})
