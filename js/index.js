import { getMicrocmsConfig } from './microcms-config.js';

const { serviceDomain: SERVICE_DOMAIN, apiKey: API_KEY } = getMicrocmsConfig();
const blogPreview = document.getElementById('blog-preview');

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}

async function fetchRecentBlogs() {
  try {
    if (!SERVICE_DOMAIN || !API_KEY) {
      if (blogPreview) {
        blogPreview.innerHTML = '<p class="info-message">ブログの設定がまだ完了していません。</p>';
      }
      return [];
    }

    const response = await fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs?limit=3`, {
      headers: {
        'X-API-KEY': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('ブログ記事の取得に失敗しました');
    }

    const data = await response.json();
    return data.contents;
  } catch (error) {
    console.error('Error:', error);
    if (blogPreview) {
      blogPreview.innerHTML = '<p class="error-message">ブログ記事の取得に失敗しました。</p>';
    }
    return [];
  }
}

function createBlogCard(blog) {
  const card = document.createElement('div');
  card.className = 'blog-card';

  const imageHtml = blog.eyecatch
    ? `<img src="${blog.eyecatch.url}?w=400&h=250&fit=crop" alt="${blog.title}" class="blog-card-image">`
    : '<div class="blog-card-no-image">No Image</div>';

  const categoryHtml = blog.category
    ? `<span class="blog-card-category">${blog.category.name}</span>`
    : '';

  const rawContent = blog.content ? blog.content.replace(/<[^>]*>/g, '') : '';
  const excerpt = rawContent ? `${rawContent.substring(0, 100)}...` : '';

  card.innerHTML = `
    <a href="blog-detail.html?id=${blog.id}" class="blog-card-link">
      <div class="blog-card-image-container">
        ${imageHtml}
      </div>
      <div class="blog-card-content">
        <h3 class="blog-card-title">${blog.title}</h3>
        ${categoryHtml}
        <p class="blog-card-excerpt">${excerpt}</p>
        <div class="blog-card-meta">
          <time datetime="${blog.publishedAt}" class="blog-card-date">${formatDate(blog.publishedAt)}</time>
        </div>
      </div>
    </a>
  `;

  return card;
}

async function displayBlogPreview() {
  if (!blogPreview) return;

  const blogs = await fetchRecentBlogs();
  if (blogs.length === 0) return;

  blogPreview.innerHTML = '';
  blogs.forEach((blog) => {
    blogPreview.appendChild(createBlogCard(blog));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayBlogPreview();
});
