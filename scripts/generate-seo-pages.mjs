import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const siteUrl = 'https://seirino-mikata.com';
const generatedBlogDir = path.join(root, 'generated', 'blog');
const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/services.html', priority: '0.9', changefreq: 'monthly' },
  { loc: '/price.html', priority: '0.8', changefreq: 'monthly' },
  { loc: '/about.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog.html', priority: '0.7', changefreq: 'weekly' },
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

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function stripHtml(value = '') {
  return String(value).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function formatDate(dateString) {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(dateString));
}

function normalizeTemplatePaths(html) {
  return html
    .replaceAll('href="css/', 'href="/css/')
    .replaceAll('src="images/', 'src="/images/')
    .replaceAll('srcset="images/', 'srcset="/images/')
    .replaceAll('src="./js/', 'src="/js/')
    .replaceAll('src="/js/blog-detail.js"', 'src="/js/blog-detail.js"')
    .replace(/\bhref="(index|services|price|about|contact|blog|faq|privacy|thanks)\.html/g, 'href="/$1.html');
}

async function fetchAllBlogs() {
  await readDotEnv();
  const serviceDomain = process.env.VITE_MICROCMS_SERVICE_DOMAIN || process.env.MICROCMS_SERVICE_DOMAIN || '';
  const apiKey = process.env.VITE_MICROCMS_API_KEY || process.env.MICROCMS_API_KEY || '';

  if (!serviceDomain || !apiKey) {
    console.log('microCMS credentials not found. Blog detail pages were not generated.');
    return [];
  }

  const all = [];
  const limit = 100;
  let offset = 0;

  while (true) {
    const url = `https://${serviceDomain}.microcms.io/api/v1/blogs?limit=${limit}&offset=${offset}`;
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
  return `/generated/blog/${encodeURIComponent(blog.id)}.html`;
}

function replaceMeta(html, selector, content) {
  const escaped = escapeHtml(content);
  return html.replace(selector, (_, prefix) => `${prefix}${escaped}"`);
}

function renderBlogPage(template, blog, recentBlogs, categories) {
  const title = `${blog.title} | 整理のミカタ`;
  const description = `${stripHtml(blog.content).slice(0, 120)}...`;
  const url = `${siteUrl}${blogPageUrl(blog)}`;
  const image = blog.eyecatch?.url || `${siteUrl}/images/seirino-mikata-logo.webp`;
  const dateLabel = formatDate(blog.publishedAt);
  const category = blog.category?.name || '';
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'ブログ', item: `${siteUrl}/blog.html` },
      { '@type': 'ListItem', position: 3, name: blog.title, item: url },
    ],
  };
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description,
    image,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.revisedAt || blog.publishedAt,
    url,
    publisher: {
      '@type': 'Organization',
      name: '整理のミカタ',
      url: `${siteUrl}/`,
      logo: `${siteUrl}/images/seirino-mikata-logo.webp`,
    },
  };

  let html = normalizeTemplatePaths(template);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = replaceMeta(html, /(<meta name="description" content=")[^"]*"/, description);
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  html = replaceMeta(html, /(<meta property="og:title" content=")[^"]*"/, title);
  html = replaceMeta(html, /(<meta property="og:description" content=")[^"]*"/, description);
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${escapeHtml(image)}" />`);
  html = replaceMeta(html, /(<meta name="twitter:title" content=")[^"]*"/, title);
  html = replaceMeta(html, /(<meta name="twitter:description" content=")[^"]*"/, description);
  html = html.replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${escapeHtml(image)}" />`);
  html = html.replaceAll('https://seirino-mikata.com/images/seirino-mikata-logo.png', 'https://seirino-mikata.com/images/seirino-mikata-logo.webp');
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${JSON.stringify(breadcrumb, null, 2)}\n  </script>`);
  html = html.replace(/<script id="article-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="article-structured-data" type="application/ld+json">\n${JSON.stringify(article, null, 2)}\n  </script>`);
  html = html.replace(/(<li id="blog-title"[^>]*>)[\s\S]*?(<\/li>)/, `$1${escapeHtml(blog.title)}$2`);
  html = html.replace(/(<h1 id="blog-detail-title"[^>]*>)[\s\S]*?(<\/h1>)/, `$1${escapeHtml(blog.title)}$2`);
  html = html.replace(/<time id="blog-detail-date" datetime="">[\s\S]*?<\/time>/, `<time id="blog-detail-date" datetime="${escapeHtml(blog.publishedAt || '')}">公開日: ${escapeHtml(dateLabel)}</time>`);
  html = html.replace(/(<span id="blog-detail-category"[^>]*>)[\s\S]*?(<\/span>)/, `$1${escapeHtml(category)}$2`);
  html = html.replace(/<div class="blog-detail-eyecatch">[\s\S]*?<\/div>/, blog.eyecatch
    ? `<div class="blog-detail-eyecatch">\n          <img id="blog-detail-image" src="${escapeHtml(blog.eyecatch.url)}" alt="${escapeHtml(blog.title)}" width="${blog.eyecatch.width || 1200}" height="${blog.eyecatch.height || 630}" loading="eager" decoding="async" />\n        </div>`
    : '<div class="blog-detail-eyecatch" style="display: none;"></div>');
  html = html.replace(/<div id="blog-detail-content" class="blog-detail-content">[\s\S]*?<\/div>\s*<div class="blog-detail-navigation">/, `<div id="blog-detail-content" class="blog-detail-content">\n${blog.content || ''}\n        </div>\n        \n        <div class="blog-detail-navigation">`);
  html = html.replace(/<ul id="blog-categories" class="blog-categories">[\s\S]*?<\/ul>/, `<ul id="blog-categories" class="blog-categories">\n${categories.map((item) => `            <li><a href="/blog.html?category=${encodeURIComponent(item.id)}">${escapeHtml(item.name)}</a></li>`).join('\n')}\n          </ul>`);
  html = html.replace(/<ul id="blog-recent" class="blog-recent">[\s\S]*?<\/ul>/, `<ul id="blog-recent" class="blog-recent">\n${recentBlogs.filter((item) => item.id !== blog.id).slice(0, 5).map((item) => `            <li><a href="${blogPageUrl(item)}"><div class="blog-recent-title">${escapeHtml(item.title)}</div><div class="blog-recent-date">${escapeHtml(formatDate(item.publishedAt))}</div></a></li>`).join('\n')}\n          </ul>`);
  html = html.replace(/\s*<script type="module" src="\/js\/microcms-config\.js"><\/script>/, '');
  html = html.replace(/\s*<script type="module" src="\/js\/blog-detail\.js"><\/script>/, '');
  return html;
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

await fs.rm(generatedBlogDir, { recursive: true, force: true });
await fs.mkdir(generatedBlogDir, { recursive: true });

const blogs = await fetchAllBlogs();
if (blogs.length > 0) {
  const template = await fs.readFile(path.join(root, 'blog-detail.html'), 'utf8');
  const categories = [...new Map(blogs.filter((blog) => blog.category).map((blog) => [blog.category.id, blog.category])).values()];
  const recentBlogs = [...blogs].sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));
  for (const blog of blogs) {
    await fs.writeFile(path.join(generatedBlogDir, `${blog.id}.html`), renderBlogPage(template, blog, recentBlogs, categories));
  }
}

await writeSitemap(blogs);
console.log(`Generated ${blogs.length} static blog pages and sitemap.xml.`);
