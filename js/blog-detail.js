
// microCMSの設定
const SERVICE_DOMAIN = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const API_KEY = import.meta.env.VITE_MICROCMS_API_KEY;

// DOM要素
const blogTitle = document.getElementById('blog-title');
const blogDetailTitle = document.getElementById('blog-detail-title');
const blogDetailDate = document.getElementById('blog-detail-date');
const blogDetailCategory = document.getElementById('blog-detail-category');
const blogDetailImage = document.getElementById('blog-detail-image');
const blogDetailContent = document.getElementById('blog-detail-content');
const blogCategories = document.getElementById('blog-categories');
const blogRecent = document.getElementById('blog-recent');

// URLからIDを取得
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');

// 日付をフォーマットする関数
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}

// ブログ詳細を取得する関数
async function fetchBlogDetail() {
  try {
    if (!blogId) {
      window.location.href = 'blog.html';
      return null;
    }
    
    if (!SERVICE_DOMAIN || !API_KEY) {
      if (blogDetailContent) {
        blogDetailContent.innerHTML = '<p class="info-message">microCMSの環境変数が設定されていません。</p>';
      }
      return null;
    }
    
    const response = await fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs/${blogId}`, {
      headers: {
        'X-API-KEY': API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error('ブログ記事の取得に失敗しました');
    }
    
    const blog = await response.json();
    return blog;
  } catch (error) {
    console.error('Error:', error);
    if (blogDetailContent) {
      blogDetailContent.innerHTML = '<p class="error-message">ブログ記事の取得に失敗しました。しばらく経ってからもう一度お試しください。</p>';
    }
    return null;
  }
}

// カテゴリ一覧を取得する関数
async function fetchCategories() {
  try {
    const response = await fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/categories`, {
      headers: {
        'X-API-KEY': API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error('カテゴリの取得に失敗しました');
    }
    
    const data = await response.json();
    return data.contents;
  } catch (error) {
    console.error('Error:', error);
    blogCategories.innerHTML = '<p class="error-message">カテゴリの取得に失敗しました。</p>';
    return [];
  }
}

// 最新記事を取得する関数
async function fetchRecentBlogs() {
  try {
    const response = await fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs?limit=5`, {
      headers: {
        'X-API-KEY': API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error('最新記事の取得に失敗しました');
    }
    
    const data = await response.json();
    return data.contents;
  } catch (error) {
    console.error('Error:', error);
    blogRecent.innerHTML = '<p class="error-message">最新記事の取得に失敗しました。</p>';
    return [];
  }
}

// ブログ詳細を表示する関数
async function displayBlogDetail() {
  const blog = await fetchBlogDetail();
  if (!blog) return;
  
  // タイトル設定
  document.title = `${blog.title} | 整理のミカタ - 遺品整理のプロフェッショナル`;
  blogTitle.textContent = blog.title;
  blogDetailTitle.textContent = blog.title;
  
  // 日付設定
  const formattedDate = formatDate(blog.publishedAt);
  blogDetailDate.textContent = `公開日: ${formattedDate}`;
  blogDetailDate.setAttribute('datetime', blog.publishedAt);
  
  // カテゴリ設定
  if (blog.category) {
    blogDetailCategory.textContent = blog.category.name;
    blogDetailCategory.classList.add('active');
  } else {
    blogDetailCategory.style.display = 'none';
  }
  
  // アイキャッチ画像設定
  if (blog.eyecatch) {
    blogDetailImage.src = blog.eyecatch.url;
    blogDetailImage.alt = blog.title;
  } else {
    blogDetailImage.parentElement.style.display = 'none';
  }
  
  // 本文設定
  blogDetailContent.innerHTML = blog.content;
  
  // 関連記事を表示
  await displayCategories();
  await displayRecentBlogs();
}

// カテゴリ一覧を表示する関数
async function displayCategories() {
  const categories = await fetchCategories();
  if (categories.length === 0) return;
  
  let html = '';
  categories.forEach(category => {
    html += `<li><a href="blog.html?category=${category.id}">${category.name}</a></li>`;
  });
  
  blogCategories.innerHTML = html;
}

// 最新記事を表示する関数
async function displayRecentBlogs() {
  const blogs = await fetchRecentBlogs();
  if (blogs.length === 0) return;
  
  let html = '';
  blogs.forEach(blog => {
    if (blog.id !== blogId) {
      html += `<li>
        <a href="blog-detail.html?id=${blog.id}">
          <div class="blog-recent-title">${blog.title}</div>
          <div class="blog-recent-date">${formatDate(blog.publishedAt)}</div>
        </a>
      </li>`;
    }
  });
  
  blogRecent.innerHTML = html;
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
  if (blogDetailContent) {
    displayBlogDetail();
  }
});
