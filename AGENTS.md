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
- `css/`, `images/`, `js/` legacy assets for static HTML pages

## Common commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`

## Environment variables
- Uses microCMS; set required keys in a local `.env` file (do not commit).
- Runtime fallback: `public/microcms-config.js` can provide `window.__MICROCMS__` for static hosting.

## Conventions
- Prefer editing React pages/components under `src/` rather than root HTML files.
- Keep changes minimal and consistent with existing component patterns.
- Avoid non-ASCII characters unless the file already contains them.
- Blog list/detail styling lives in `css/style.css` and uses classes like `.blog-grid`, `.blog-card`, `.pagination`, `.blog-detail-*`.
