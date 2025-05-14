
// microCMSの設定
const SERVICE_DOMAIN = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const API_KEY = import.meta.env.VITE_MICROCMS_API_KEY;

// DOM要素
const blogList = document.getElementById('blog-list');
const pagination = document.getElementById('blog-pagination');

// ページネーションの設定
let currentPage = 1;
const limit = 12;

// 日付をフォーマットする関数
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}

// ブログ記事一覧を取得する関数
async function fetchBlogs(page = 1) {
  try {
    if (!SERVICE_DOMAIN || !API_KEY) {
      if (blogList) {
        blogList.innerHTML = '<p class="info-message">microCMSの環境変数が設定されていません。</p>';
      }
      return null;
    }
    
    const offset = (page - 1) * limit;
    const response = await fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs?limit=${limit}&offset=${offset}`, {
      headers: {
        'X-API-KEY': API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error('ブログ記事の取得に失敗しました');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    if (blogList) {
      blogList.innerHTML = '<p class="error-message">ブログ記事の取得に失敗しました。しばらく経ってからもう一度お試しください。</p>';
    }
    return null;
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

// ページネーションを作成する関数
function createPagination(totalCount) {
  const totalPages = Math.ceil(totalCount / limit);
  let paginationHTML = '';
  
  // 前へボタン
  if (currentPage > 1) {
    paginationHTML += `<a href="#" class="pagination-item pagination-prev" data-page="${currentPage - 1}">前へ</a>`;
  }
  
  // ページ番号
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||                 // 最初のページ
      i === totalPages ||        // 最後のページ
      (i >= currentPage - 1 && i <= currentPage + 1) // 現在のページの前後1ページ
    ) {
      paginationHTML += `<a href="#" class="pagination-item ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationHTML += `<span class="pagination-dots">...</span>`;
    }
  }
  
  // 次へボタン
  if (currentPage < totalPages) {
    paginationHTML += `<a href="#" class="pagination-item pagination-next" data-page="${currentPage + 1}">次へ</a>`;
  }
  
  pagination.innerHTML = paginationHTML;
  
  // ページネーションのクリックイベントを設定
  const paginationItems = document.querySelectorAll('.pagination-item');
  paginationItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = parseInt(item.getAttribute('data-page'));
      if (page !== currentPage) {
        currentPage = page;
        loadBlogs();
        window.scrollTo(0, 0);
      }
    });
  });
}

// ブログ記事を表示する関数
async function loadBlogs() {
  blogList.innerHTML = '<div class="loading">Loading...</div>';
  
  const data = await fetchBlogs(currentPage);
  if (!data) return;
  
  blogList.innerHTML = '';
  
  if (data.contents.length === 0) {
    blogList.innerHTML = '<p class="no-posts">記事がありません。</p>';
    return;
  }
  
  data.contents.forEach(blog => {
    const card = createBlogCard(blog);
    blogList.appendChild(card);
  });
  
  createPagination(data.totalCount);
}

// ページ読み込み時にブログ記事を取得
document.addEventListener('DOMContentLoaded', () => {
  if (blogList) {
    loadBlogs();
  }
});
