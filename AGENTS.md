# AGENTS.md

## Project overview
- Vite + React + TypeScript app with Tailwind and shadcn/ui components.
- Source code lives in `src/`; static HTML files in repo root are legacy templates.
- Blog data is intended to come from microCMS (see `src/lib/microcms.ts`).
- Blog pages are currently implemented as static HTML + vanilla JS under `blog.html`, `blog-detail.html`, and `js/`.

## Key directories
- `src/` application code
- `src/components/` reusable UI components
- `src/lib/` utilities (API clients, helpers)
- `public/` static assets
- `css/` stylesheets (main: `style.css`)
- `images/` image assets and SVG icons
- `js/` legacy JavaScript for static HTML pages

## Common commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`

## Environment variables
- Uses microCMS; set required keys in a local `.env` file (do not commit).
- Runtime fallback: `public/microcms-config.js` can provide `window.__MICROCMS__` for static hosting.

## Key pages
- `index.html` - Top page with main visual, services, testimonials
- `services.html` - Service details
- `about.html` - Company info
- `contact.html` - Contact page with phone, form, and LINE options
- `blog.html` / `blog-detail.html` - Blog list and detail pages
- `faq.html` - FAQ page

## Styling conventions

### CSS Variables (defined in `:root`)
- `--color-primary`: #3f7d39 (green)
- `--color-primary-dark`: #336330
- `--color-primary-light`: #569e4b
- `--color-primary-bg`: #f2f8f0
- `--font-sans`: 'Noto Sans JP'
- `--font-serif`: 'Noto Serif JP'

### Main visual section
- Desktop: Side-by-side layout with person image on right
- Mobile (<=840px): Person image is hidden, text centered
- Title uses `.main-visual-title` with 3-line layout:
  - Line 1: おかたずけの
  - Line 2: プロフェッショナル
  - Line 3: 整理のミカタ (styled with `.brand-name` - green, larger, bold)

### Responsive breakpoints
- 840px: Main visual layout changes (column, person hidden)
- 768px: Navigation switches to mobile menu, footer layout changes
- 640px: Blog grid becomes single column

## Icon files (`images/`)
- `icon-tel.svg` - Phone icon
- `icon-mail.svg` - Mail/envelope icon
- `icon-line.svg` - LINE messenger icon
- `icon-heart.svg`, `icon-pro.svg`, `icon-price.svg`, `icon-support.svg` - Feature icons

## Conventions
- Prefer editing React pages/components under `src/` rather than root HTML files.
- Keep changes minimal and consistent with existing component patterns.
- Avoid non-ASCII characters unless the file already contains them.
- Blog list/detail styling lives in `css/style.css` and uses classes like `.blog-grid`, `.blog-card`, `.pagination`, `.blog-detail-*`.
- Use CSS variables for colors and fonts to maintain consistency.
- Mobile-first considerations: test layouts at 375px width for smartphone view.
