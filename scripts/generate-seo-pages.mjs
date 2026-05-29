import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const siteUrl = 'https://seirino-mikata.com';
const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/services.html', priority: '0.9', changefreq: 'monthly' },
  { loc: '/price.html', priority: '0.8', changefreq: 'monthly' },
  { loc: '/about.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog.php', priority: '0.7', changefreq: 'weekly' },
  { loc: '/faq.html', priority: '0.6', changefreq: 'monthly' },
  { loc: '/contact.html', priority: '0.8', changefreq: 'monthly' },
  { loc: '/privacy.html', priority: '0.3', changefreq: 'yearly' },
];

async function readDotEnv() {
  const envPath = path.join(root, '.env');
  try {
    const raw = await fs.readFile(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    // Local .env is optional.
  }
}

async function fetchAllBlogs() {
  await readDotEnv();
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || '';
  const apiKey = process.env.MICROCMS_API_KEY || '';

  if (!serviceDomain || !apiKey) {
    console.log('microCMS credentials not found. Sitemap will include static pages only.');
    return [];
  }

  const all = [];
  const limit = 100;
  let offset = 0;

  while (true) {
    const url = `https://${serviceDomain}.microcms.io/api/v1/blogs?limit=${limit}&offset=${offset}&orders=-publishedAt`;
    const response = await fetch(url, { headers: { 'X-API-KEY': apiKey } });
    if (!response.ok) throw new Error(`microCMS fetch failed: ${response.status} ${response.statusText}`);
    const data = await response.json();
    all.push(...(data.contents || []));
    offset += limit;
    if (offset >= (data.totalCount || 0)) break;
  }

  return all;
}

function blogPageUrl(blog) {
  return `/blog-detail.php?id=${encodeURIComponent(blog.id)}`;
}

async function writeSitemap(blogs) {
  const entries = [
    ...staticPages.map((page) => ({ ...page, lastmod: today })),
    ...blogs.map((blog) => ({
      loc: blogPageUrl(blog),
      lastmod: (blog.updatedAt || blog.revisedAt || blog.publishedAt || today).slice(0, 10),
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((entry) => `  <url>\n    <loc>${siteUrl}${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
  await fs.writeFile(path.join(root, 'public', 'sitemap.xml'), xml);
}

const blogs = await fetchAllBlogs();
await writeSitemap(blogs);
console.log(`Generated sitemap.xml with ${blogs.length} microCMS blog URLs.`);
