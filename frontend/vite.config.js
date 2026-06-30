import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Optional: include shared variables, mixins, etc.
        // additionalData: `@import "./src/styles/variables.scss";`
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // backend base URL
    },
  },
})
