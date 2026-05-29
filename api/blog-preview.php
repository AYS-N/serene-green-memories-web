<?php
declare(strict_types=1);
require dirname(__DIR__) . '/includes/microcms.php';

header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

$blogs = microcms_list_blogs(3, 0);
$contents = is_array($blogs['contents'] ?? null) ? $blogs['contents'] : [];

if ($contents === []) {
    echo '<p class="info-message">ブログ記事は準備中です。</p>';
    exit;
}

foreach ($contents as $blog) {
    echo render_blog_card($blog), PHP_EOL;
}
