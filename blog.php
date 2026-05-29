<?php
declare(strict_types=1);
require __DIR__ . '/includes/microcms.php';

$page = max(1, (int) ($_GET['page'] ?? 1));
$limit = 6;
$offset = ($page - 1) * $limit;
$categoryId = isset($_GET['category']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', (string) $_GET['category']) : null;

$blogs = microcms_list_blogs($limit, $offset, $categoryId);
$contents = is_array($blogs['contents'] ?? null) ? $blogs['contents'] : [];
$totalCount = (int) ($blogs['totalCount'] ?? count($contents));
$totalPages = max(1, (int) ceil($totalCount / $limit));
$categories = microcms_list_categories();

$canonical = SITE_URL . '/blog.php' . ($page > 1 ? '?page=' . $page : '');
$pageTitle = 'ブログ | 整理のミカタ - 遺品整理・生前整理のプロフェッショナル';
$description = '整理のミカタのブログです。遺品整理や生前整理に関する役立つ情報をお届けします。';
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= h($pageTitle) ?></title>
  <meta name="description" content="<?= h($description) ?>">
  <link rel="canonical" href="<?= h($canonical) ?>">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="<?= h(SITE_NAME) ?>">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:title" content="<?= h($pageTitle) ?>">
  <meta property="og:description" content="<?= h($description) ?>">
  <meta property="og:url" content="<?= h($canonical) ?>">
  <meta property="og:image" content="<?= h(SITE_URL) ?>/images/seirino-mikata-logo.webp">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?= h($pageTitle) ?>">
  <meta name="twitter:description" content="<?= h($description) ?>">
  <meta name="twitter:image" content="<?= h(SITE_URL) ?>/images/seirino-mikata-logo.webp">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;700&display=swap">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "トップ", "item": "<?= h(SITE_URL) ?>/" },
      { "@type": "ListItem", "position": 2, "name": "ブログ", "item": "<?= h(SITE_URL) ?>/blog.php" }
    ]
  }
  </script>
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <div class="logo">
          <a href="index.html">
            <picture><source srcset="images/seirino-mikata-logo.webp" type="image/webp"><img src="images/seirino-mikata-logo.webp" alt="整理のミカタ" class="logo-img" width="1024" height="1024" decoding="async"></picture>
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

  <div class="page-title">
    <div class="container">
      <h1>ブログ</h1>
      <p>整理のミカタのブログでは、遺品整理や生前整理に関する役立つ情報を<br>スタッフの日々の活動とあわせてお届けしています。</p>
    </div>
  </div>

  <main class="main">
    <div class="container blog-detail-layout">
      <div>
        <div id="blog-list" class="blog-grid">
          <?php if ($contents !== []): ?>
            <?php foreach ($contents as $blog): ?>
              <?= render_blog_card($blog) ?>
            <?php endforeach; ?>
          <?php elseif (!microcms_is_configured()): ?>
            <p class="info-message">ブログ設定が未完了です。microcms-config.php をサーバーに設置してください。</p>
          <?php else: ?>
            <p class="info-message">ブログ記事は準備中です。</p>
          <?php endif; ?>
        </div>

        <?php if ($totalPages > 1): ?>
          <div id="blog-pagination" class="pagination">
            <?php for ($i = 1; $i <= $totalPages; $i++): ?>
              <?php $query = http_build_query(array_filter(['page' => $i, 'category' => $categoryId])); ?>
              <a class="pagination-item<?= $i === $page ? ' active' : '' ?>" href="blog.php?<?= h($query) ?>"><?= h((string) $i) ?></a>
            <?php endfor; ?>
          </div>
        <?php endif; ?>
      </div>

      <?php if ($categories !== []): ?>
        <aside class="blog-sidebar">
          <div class="blog-sidebar-section">
            <h3 class="blog-sidebar-title">カテゴリー</h3>
            <ul id="blog-categories" class="blog-categories">
              <li><a href="blog.php">すべて</a></li>
              <?php foreach ($categories as $category): ?>
                <li><a href="blog.php?category=<?= h((string) ($category['id'] ?? '')) ?>"><?= h((string) ($category['name'] ?? '')) ?></a></li>
              <?php endforeach; ?>
            </ul>
          </div>
        </aside>
      <?php endif; ?>
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
