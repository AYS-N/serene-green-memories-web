
import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import { componentTagger } from "lovable-tagger"

const generatedBlogInputs = fs.existsSync('generated/blog')
  ? Object.fromEntries(
      fs.readdirSync('generated/blog')
        .filter((file) => file.endsWith('.html'))
        .map((file) => [
          `generatedBlog${path.parse(file).name.replace(/[^a-zA-Z0-9_]/g, '_')}`,
          `generated/blog/${file}`,
        ])
    )
  : {}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    open: '/',
  },
  plugins: [
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        services: 'services.html',
        contact: 'contact.html',
        faq: 'faq.html',
        blog: 'blog.html',
        blogDetail: 'blog-detail.html',
        price: 'price.html',
        privacy: 'privacy.html',
        thanks: 'thanks.html',
        ...generatedBlogInputs
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
}))
