<?php
declare(strict_types=1);

const SITE_URL = 'https://seirino-mikata.com';
const SITE_NAME = '整理のミカタ';

function h(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function microcms_config(): array
{
    $configPath = dirname(__DIR__) . '/microcms-config.php';
    $fileConfig = [];

    if (is_file($configPath)) {
        $loaded = require $configPath;
        if (is_array($loaded)) {
            $fileConfig = $loaded;
        }
    }

    return [
        'service_domain' => trim((string) ($fileConfig['service_domain'] ?? getenv('MICROCMS_SERVICE_DOMAIN') ?: '')),
        'api_key' => trim((string) ($fileConfig['api_key'] ?? getenv('MICROCMS_API_KEY') ?: '')),
    ];
}

function microcms_is_configured(): bool
{
    $config = microcms_config();
    return $config['service_domain'] !== '' && $config['api_key'] !== '';
}

function starts_with(string $value, string $prefix): bool
{
    return substr($value, 0, strlen($prefix)) === $prefix;
}

function microcms_request(string $endpoint, array $query = []): ?array
{
    $config = microcms_config();
    if ($config['service_domain'] === '' || $config['api_key'] === '') {
        return null;
    }

    $endpoint = ltrim($endpoint, '/');
    $url = sprintf('https://%s.microcms.io/api/v1/%s', rawurlencode($config['service_domain']), $endpoint);
    if ($query !== []) {
        $url .= '?' . http_build_query($query, '', '&', PHP_QUERY_RFC3986);
    }

    $headers = [
        'X-API-KEY: ' . $config['api_key'],
        'Accept: application/json',
    ];

    $response = null;
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_CONNECTTIMEOUT => 8,
            CURLOPT_TIMEOUT => 15,
        ]);
        $response = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($response === false || $status < 200 || $status >= 300) {
            return null;
        }
    } else {
        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => implode("\r\n", $headers),
                'timeout' => 15,
                'ignore_errors' => false,
            ],
        ]);
        $response = @file_get_contents($url, false, $context);
        if ($response === false) {
            return null;
        }
    }

    $decoded = json_decode((string) $response, true);
    return is_array($decoded) ? $decoded : null;
}

function microcms_list_blogs(int $limit = 10, int $offset = 0, ?string $categoryId = null): array
{
    $query = [
        'limit' => max(1, min(100, $limit)),
        'offset' => max(0, $offset),
        'orders' => '-publishedAt',
    ];

    if ($categoryId !== null && $categoryId !== '') {
        $query['filters'] = 'category[equals]' . $categoryId;
    }

    return microcms_request('blogs', $query) ?? [
        'contents' => [],
        'totalCount' => 0,
        'limit' => $limit,
        'offset' => $offset,
    ];
}

function microcms_get_blog(string $id): ?array
{
    if ($id === '' || !preg_match('/^[a-zA-Z0-9_-]+$/', $id)) {
        return null;
    }

    return microcms_request('blogs/' . rawurlencode($id));
}

function microcms_list_categories(): array
{
    $data = microcms_request('categories', ['limit' => 100, 'orders' => 'name']);
    return is_array($data['contents'] ?? null) ? $data['contents'] : [];
}

function format_blog_date(?string $date): string
{
    if (!$date) {
        return '';
    }

    $timestamp = strtotime($date);
    if ($timestamp === false) {
        return '';
    }

    return date('Y.m.d', $timestamp);
}

function strip_html_text(?string $html, int $length = 120): string
{
    $text = trim(preg_replace('/\s+/u', ' ', strip_tags((string) $html)) ?? '');
    if (function_exists('mb_substr')) {
        return mb_substr($text, 0, $length, 'UTF-8');
    }

    return substr($text, 0, $length);
}

function blog_detail_url(array $blog): string
{
    return 'blog-detail.php?id=' . rawurlencode((string) ($blog['id'] ?? ''));
}

function safe_asset_url(?string $url): string
{
    $url = trim((string) $url);
    if ($url === '') {
        return '';
    }

    if (preg_match('#^https?://#i', $url) || starts_with($url, '/') || preg_match('#^[a-zA-Z0-9_./-]+$#', $url)) {
        return $url;
    }

    return '';
}

function sanitize_blog_html(?string $html): string
{
    $html = (string) $html;
    if ($html === '') {
        return '';
    }

    $html = preg_replace('#<(script|style)\b[^>]*>.*?</\1>#is', '', $html) ?? '';
    $allowedTags = '<p><br><strong><b><em><i><u><ul><ol><li><h2><h3><h4><blockquote><a><img><figure><figcaption><table><thead><tbody><tr><th><td>';
    $html = strip_tags($html, $allowedTags);

    if (!class_exists('DOMDocument')) {
        $html = preg_replace('/\s+on[a-z]+\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+)/i', '', $html) ?? '';
        $html = preg_replace('/(href|src)\s*=\s*([\'"])\s*javascript:[^\'"]*\2/i', '', $html) ?? '';
        return $html;
    }

    $doc = new DOMDocument('1.0', 'UTF-8');
    libxml_use_internal_errors(true);
    $doc->loadHTML('<?xml encoding="UTF-8"><div>' . $html . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();

    $allowedAttrs = [
        'a' => ['href', 'title', 'target', 'rel'],
        'img' => ['src', 'alt', 'width', 'height', 'loading', 'decoding'],
        'th' => ['scope'],
        'td' => ['colspan', 'rowspan'],
    ];
    $globalAttrs = ['class'];

    $xpath = new DOMXPath($doc);
    foreach ($xpath->query('//*') as $node) {
        if (!$node instanceof DOMElement) {
            continue;
        }

        $tag = strtolower($node->tagName);
        foreach (iterator_to_array($node->attributes) as $attr) {
            $name = strtolower($attr->nodeName);
            $value = trim($attr->nodeValue);
            $isAllowed = in_array($name, $globalAttrs, true) || in_array($name, $allowedAttrs[$tag] ?? [], true);
            $isUnsafeUrl = in_array($name, ['href', 'src'], true) && !preg_match('#^(https?://|/|[a-zA-Z0-9_./-]+$)#i', $value);
            if (!$isAllowed || starts_with($name, 'on') || stripos($value, 'javascript:') !== false || stripos($value, 'data:text/html') !== false || $isUnsafeUrl) {
                $node->removeAttributeNode($attr);
            }
        }

        if ($tag === 'a' && $node->hasAttribute('target') && strtolower($node->getAttribute('target')) === '_blank') {
            $node->setAttribute('rel', 'noopener noreferrer');
        }

        if ($tag === 'img') {
            if (!$node->hasAttribute('src')) {
                if ($node->parentNode) {
                    $node->parentNode->removeChild($node);
                }
                continue;
            }
            if (!$node->hasAttribute('alt')) {
                $node->setAttribute('alt', '');
            }
            $node->setAttribute('loading', $node->getAttribute('loading') ?: 'lazy');
            $node->setAttribute('decoding', $node->getAttribute('decoding') ?: 'async');
        }
    }

    $container = $doc->getElementsByTagName('div')->item(0);
    $clean = '';
    if ($container) {
        foreach ($container->childNodes as $child) {
            $clean .= $doc->saveHTML($child);
        }
    }

    return $clean;
}

function render_blog_card(array $blog): string
{
    $title = (string) ($blog['title'] ?? 'ブログ記事');
    $eyecatch = safe_asset_url($blog['eyecatch']['url'] ?? '');
    $excerpt = strip_html_text($blog['content'] ?? '', 100);
    $date = format_blog_date($blog['publishedAt'] ?? $blog['createdAt'] ?? null);
    $category = (string) ($blog['category']['name'] ?? '');
    $url = blog_detail_url($blog);

    ob_start();
    ?>
    <div class="blog-card">
      <a href="<?= h($url) ?>" class="blog-card-link">
        <div class="blog-card-image-container">
          <?php if ($eyecatch !== ''): ?>
            <img src="<?= h($eyecatch) ?>" alt="<?= h($title) ?>" class="blog-card-image" loading="lazy" decoding="async">
          <?php else: ?>
            <div class="blog-card-no-image">No Image</div>
          <?php endif; ?>
        </div>
        <div class="blog-card-content">
          <h3 class="blog-card-title"><?= h($title) ?></h3>
          <?php if ($category !== ''): ?>
            <span class="blog-card-category"><?= h($category) ?></span>
          <?php endif; ?>
          <p class="blog-card-excerpt"><?= h($excerpt) ?><?= $excerpt !== '' ? '...' : '' ?></p>
          <div class="blog-card-meta">
            <time datetime="<?= h((string) ($blog['publishedAt'] ?? '')) ?>" class="blog-card-date"><?= h($date) ?></time>
          </div>
        </div>
      </a>
    </div>
    <?php
    return trim((string) ob_get_clean());
}
