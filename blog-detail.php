<?php
declare(strict_types=1);
require __DIR__ . '/includes/microcms.php';

$id = isset($_GET['id']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', (string) $_GET['id']) : '';
$blog = $id !== '' ? microcms_get_blog($id) : null;

if (!$blog) {
    http_response_code(404);
}

$recent = microcms_list_blogs(5, 0);
$recentBlogs = is_array($recent['contents'] ?? null) ? $recent['contents'] : [];
$categories = microcms_list_categories();

$title = (string) ($blog['title'] ?? 'ブログ記事が見つかりません');
$content = (string) ($blog['content'] ?? '');
$descriptionText = $blog ? strip_html_text($content, 120) : 'お探しのブログ記事は見つかりませんでした。';
$description = $descriptionText !== '' ? $descriptionText : '整理のミカタのブログ記事です。';
$canonical = SITE_URL . '/blog-detail.php?id=' . rawurlencode($id);
$image = safe_asset_url($blog['eyecatch']['url'] ?? '') ?: SITE_URL . '/images/seirino-mikata-logo.webp';
$publishedAt = (string) ($blog['publishedAt'] ?? $blog['createdAt'] ?? '');
$modifiedAt = (string) ($blog['updatedAt'] ?? $blog['revisedAt'] ?? $publishedAt);
$categoryName = (string) ($blog['category']['name'] ?? '');
$pageTitle = $title . ' | ' . SITE_NAME;
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= h($pageTitle) ?></title>
  <meta name="description" content="<?= h($description) ?>">
  <?php if ($blog): ?>
    <link rel="canonical" href="<?= h($canonical) ?>">
  <?php else: ?>
    <meta name="robots" content="noindex, follow">
  <?php endif; ?>
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="<?= h(SITE_NAME) ?>">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:title" content="<?= h($pageTitle) ?>">
  <meta property="og:description" content="<?= h($description) ?>">
  <meta property="og:url" content="<?= h($canonical) ?>">
  <meta property="og:image" content="<?= h($image) ?>">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?= h($pageTitle) ?>">
  <meta name="twitter:description" content="<?= h($description) ?>">
  <meta name="twitter:image" content="<?= h($image) ?>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;700&display=swap">
  <script type="application/ld+json">
  <?= json_encode([
      '@context' => 'https://schema.org',
      '@type' => 'BreadcrumbList',
      'itemListElement' => [
          ['@type' => 'ListItem', 'position' => 1, 'name' => 'トップ', 'item' => SITE_URL . '/'],
          ['@type' => 'ListItem', 'position' => 2, 'name' => 'ブログ', 'item' => SITE_URL . '/blog.php'],
          ['@type' => 'ListItem', 'position' => 3, 'name' => $title, 'item' => $canonical],
      ],
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) ?>
  </script>
  <?php if ($blog): ?>
    <script type="application/ld+json">
    <?= json_encode([
        '@context' => 'https://schema.org',
        '@type' => 'Article',
        'headline' => $title,
        'description' => $description,
        'image' => $image,
        'datePublished' => $publishedAt,
        'dateModified' => $modifiedAt,
        'url' => $canonical,
        'publisher' => [
            '@type' => 'Organization',
            'name' => SITE_NAME,
            'url' => SITE_URL . '/',
            'logo' => SITE_URL . '/images/seirino-mikata-logo.webp',
        ],
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) ?>
    </script>
  <?php endif; ?>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-7RNPK5XXBZ"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-7RNPK5XXBZ');
  </script>
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <div class="logo">
          <a href="index.html">
            <picture><source srcset="images/seirino-mikata-logo.webp" type="image/webp"><img src="images/seirino-mikata-logo.webp" alt="整理のミカタ" class="logo-img" width="1084" height="374" decoding="async"></picture>
          </a>
        </div>
        <nav class="nav-pc">
          <ul class="nav-list">
            <li><a href="index.html">トップ</a></li>
            <li><a href="services.html">サービス内容</a></li>
            <li><a href="price.html">料金について</a></li>
            <li><a href="about.html">会社概要</a></li>
            <li><a href="blog.php" class="active">ブログ</a></li>
            <li><a href="faq.html">よくある質問</a></li>
            <li><a href="contact.html">お問い合わせ</a></li>
          </ul>
        </nav>
        <div class="nav-contact-panel" aria-label="電話・メール・LINEでのお問い合わせ">
          <a href="tel:0120-433-233" class="nav-contact-phone" aria-label="電話で問い合わせる 0120-433-233">
            <span class="nav-contact-phone-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M8.4 2.3h7.2c1.1 0 2 .9 2 2v15.4c0 1.1-.9 2-2 2H8.4c-1.1 0-2-.9-2-2V4.3c0-1.1.9-2 2-2Z" />
                <path d="M10.1 4.6h3.8M10.8 19h2.4" />
              </svg>
            </span>
            <span class="nav-contact-phone-text">
              <span class="nav-contact-phone-number">0120-433-233</span>
              <span class="nav-contact-phone-hours">受付時間 10:00〜19:00</span>
            </span>
          </a>
          <div class="nav-contact-actions">
            <a href="contact.html" class="nav-contact-icon" aria-label="メールで問い合わせる">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M4.5 6.5h15v11h-15z" />
                <path d="m5.2 7.2 6.8 5.4 6.8-5.4" />
              </svg>
            </a>
            <a href="https://lin.ee/zR7fCKt" class="nav-contact-icon nav-contact-icon-line" aria-label="LINEで問い合わせる" target="_blank" rel="noopener">
              <span>LINE</span>
            </a>
          </div>
        </div>
        <button class="nav-toggle" id="nav-toggle" aria-label="メニュー">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <nav class="nav-sp" id="nav-sp">
      <ul class="nav-list">
        <li><a href="index.html">トップ</a></li>
        <li><a href="services.html">サービス内容</a></li>
        <li><a href="price.html">料金について</a></li>
        <li><a href="about.html">会社概要</a></li>
        <li><a href="blog.php" class="active">ブログ</a></li>
        <li><a href="faq.html">よくある質問</a></li>
        <li><a href="contact.html">お問い合わせ</a></li>
      </ul>
    </nav>
  </header>

  <div class="breadcrumb">
    <div class="container">
      <ul>
        <li><a href="index.html">トップ</a></li>
        <li><a href="blog.php">ブログ</a></li>
        <li><?= h($title) ?></li>
      </ul>
    </div>
  </div>

  <main class="main">
    <div class="container blog-detail-layout">
      <article class="blog-detail">
        <?php if ($blog): ?>
          <header class="blog-detail-header">
            <h1 class="blog-detail-title"><?= h($title) ?></h1>
            <div class="blog-detail-meta">
              <time datetime="<?= h($publishedAt) ?>">公開日: <?= h(format_blog_date($publishedAt)) ?></time>
              <?php if ($categoryName !== ''): ?>
                <span class="blog-detail-category active"><?= h($categoryName) ?></span>
              <?php endif; ?>
            </div>
          </header>

          <?php if (safe_asset_url($blog['eyecatch']['url'] ?? '') !== ''): ?>
            <div class="blog-detail-eyecatch">
              <img src="<?= h(safe_asset_url($blog['eyecatch']['url'] ?? '')) ?>" alt="<?= h($title) ?>" loading="eager" decoding="async">
            </div>
          <?php endif; ?>

          <div class="blog-detail-content">
            <?= sanitize_blog_html($content) ?>
          </div>
        <?php else: ?>
          <header class="blog-detail-header">
            <h1 class="blog-detail-title">記事が見つかりませんでした</h1>
          </header>
          <div class="blog-detail-content">
            <p>お探しの記事は削除されたか、URLが変更された可能性があります。</p>
          </div>
        <?php endif; ?>

        <div class="blog-detail-navigation">
          <a href="blog.php" class="btn btn-outline">一覧に戻る</a>
        </div>
      </article>

      <aside class="blog-sidebar">
        <?php if ($categories !== []): ?>
          <div class="blog-sidebar-section">
            <h3 class="blog-sidebar-title">カテゴリー</h3>
            <ul class="blog-categories">
              <li><a href="blog.php">すべて</a></li>
              <?php foreach ($categories as $category): ?>
                <li><a href="blog.php?category=<?= h((string) ($category['id'] ?? '')) ?>"><?= h((string) ($category['name'] ?? '')) ?></a></li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endif; ?>

        <?php if ($recentBlogs !== []): ?>
          <div class="blog-sidebar-section">
            <h3 class="blog-sidebar-title">最新記事</h3>
            <ul class="blog-recent">
              <?php foreach ($recentBlogs as $recentBlog): ?>
                <li>
                  <a href="<?= h(blog_detail_url($recentBlog)) ?>">
                    <div class="blog-recent-title"><?= h((string) ($recentBlog['title'] ?? 'ブログ記事')) ?></div>
                    <div class="blog-recent-date"><?= h(format_blog_date($recentBlog['publishedAt'] ?? $recentBlog['createdAt'] ?? null)) ?></div>
                  </a>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endif; ?>
      </aside>
    </div>
  </main>

  <section class="cta-section">
    <div class="container">
      <div class="cta-image-board">
        <img src="images/info2.webp" alt="まずは無料相談から。電話、メール、LINEで相談できます。" loading="lazy" width="2172" height="724" decoding="async">
        <a href="tel:0120-433-233" aria-label="電話で相談する"></a>
        <a href="contact.html" aria-label="メールで相談する"></a>
        <a href="https://lin.ee/zR7fCKt" target="_blank" rel="noopener" aria-label="LINEで相談する"></a>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <div class="footer-logo">株式会社タスカル</div>
          <address class="footer-address">
            〒362-0035<br>
            埼玉県上尾市仲町1-7-25<br>
            TEL: 0120-433-233<br>
            受付時間: 10:00〜19:00（年中無休）
          </address>
        </div>
        <div class="footer-menu">
          <div class="footer-menu-section">
            <h3 class="footer-menu-title">サービスメニュー</h3>
            <ul class="footer-menu-list">
              <li><a href="services.html#estate">遺品整理サービス</a></li>
              <li><a href="services.html#lifetime">生前整理サービス</a></li>
              <li><a href="services.html#cleanup">特殊清掃</a></li>
              <li><a href="services.html#waste">不用品回収</a></li>
            </ul>
          </div>
          <div class="footer-menu-section">
            <h3 class="footer-menu-title">会社情報</h3>
            <ul class="footer-menu-list">
              <li><a href="about.html">会社概要</a></li>
              <li><a href="blog.php">ブログ</a></li>
              <li><a href="faq.html">よくある質問</a></li>
              <li><a href="privacy.html">プライバシーポリシー</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <nav class="footer-nav">
          <ul class="footer-nav-list">
            <li><a href="index.html">トップ</a></li>
            <li><a href="services.html">サービス内容</a></li>
            <li><a href="about.html">会社概要</a></li>
            <li><a href="blog.php">ブログ</a></li>
            <li><a href="faq.html">よくある質問</a></li>
            <li><a href="contact.html">お問い合わせ</a></li>
            <li><a href="privacy.html">プライバシーポリシー</a></li>
          </ul>
        </nav>
        <div class="copyright">&copy; <span id="current-year"></span> 整理のミカタ All Rights Reserved.</div>
      </div>
    </div>
  </footer>
  <script type="module" src="./js/main.js"></script>
</body>
</html>
