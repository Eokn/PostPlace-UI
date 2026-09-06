import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      // 1. Intercept any request starting with '/api'
      '/api': {
        // 2. Forward it to your backend server
        target: 'http://localhost:5000', 
        changeOrigin: true,
        // 3. Optional: Remove '/api' from the path before it hits your backend
        // Use this if your backend expects '/' instead of '/api'
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
})
