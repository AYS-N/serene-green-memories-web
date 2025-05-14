
// microCMSの設定
const SERVICE_DOMAIN = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const API_KEY = import.meta.env.VITE_MICROCMS_API_KEY;

// DOM要素
const blogPreview = document.getElementById('blog-preview');

// 日付をフォーマットする関数
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}

// 最新のブログ記事を取得する関数
async function fetchRecentBlogs() {
  try {
    if (!SERVICE_DOMAIN || !API_KEY) {
      if (blogPreview) {
        blogPreview.innerHTML = '<p class="info-message">microCMSの環境変数が設定されていません。</p>';
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

// ブログカードを作成する関数
function createBlogCard(blog) {
  const card = document.createElement('div');
  card.className = 'blog-card';
  
  // 画像部分
  let imageHtml = '';
  if (blog.eyecatch) {
    imageHtml = `<img src="${blog.eyecatch.url}?w=400&h=250&fit=crop" alt="${blog.title}" class="blog-card-image">`;
  } else {
    imageHtml = `<div class="blog-card-no-image">No Image</div>`;
  }
  
  // カテゴリ部分
  let categoryHtml = '';
  if (blog.category) {
    categoryHtml = `<span class="blog-card-category">${blog.category.name}</span>`;
  }
  
  // 本文から最初の100文字を抽出（HTMLタグを除去）
  const content = blog.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...';
  
  card.innerHTML = `
    <a href="blog-detail.html?id=${blog.id}" class="blog-card-link">
      <div class="blog-card-image-container">
        ${imageHtml}
      </div>
      <div class="blog-card-content">
        <h3 class="blog-card-title">${blog.title}</h3>
        ${categoryHtml}
        <p class="blog-card-excerpt">${content}</p>
        <div class="blog-card-meta">
          <time datetime="${blog.publishedAt}" class="blog-card-date">${formatDate(blog.publishedAt)}</time>
        </div>
      </div>
    </a>
  `;
  
  return card;
}

// ブログプレビューを表示する関数
async function displayBlogPreview() {
  if (!blogPreview) return;
  
  const blogs = await fetchRecentBlogs();
  if (blogs.length === 0) return;
  
  blogPreview.innerHTML = '';
  
  blogs.forEach(blog => {
    const card = createBlogCard(blog);
    blogPreview.appendChild(card);
  });
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
  if (blogPreview) {
    displayBlogPreview();
  }
});
