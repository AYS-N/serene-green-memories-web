
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    open: '/',
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        services: 'services.html',
        contact: 'contact.html',
        faq: 'faq.html'
      }
    }
  }
}))
