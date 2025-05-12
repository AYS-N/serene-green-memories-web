
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8080,
    // Configure server to handle SPA-like navigation for HTML files
    open: '/',
  },
  build: {
    outDir: 'dist',
    // Ensure all HTML files are processed correctly
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
})
