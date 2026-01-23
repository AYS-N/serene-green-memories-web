import { chromium } from 'playwright';

async function evaluateDesign() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const pages = [
    { name: 'index', url: 'http://localhost:8080/', description: 'トップページ' },
    { name: 'services', url: 'http://localhost:8080/services.html', description: 'サービスページ' },
    { name: 'about', url: 'http://localhost:8080/about.html', description: '会社概要' },
    { name: 'blog', url: 'http://localhost:8080/blog.html', description: 'ブログ一覧' },
    { name: 'contact', url: 'http://localhost:8080/contact.html', description: 'お問い合わせ' },
    { name: 'faq', url: 'http://localhost:8080/faq.html', description: 'FAQ' }
  ];

  for (const pageInfo of pages) {
    console.log(`📸 ${pageInfo.description} のスクリーンショットを撮影中...`);
    await page.goto(pageInfo.url, { waitUntil: 'networkidle' });

    // フルページスクリーンショット
    await page.screenshot({
      path: `screenshots/${pageInfo.name}-full.png`,
      fullPage: true
    });

    // ファーストビュー
    await page.screenshot({
      path: `screenshots/${pageInfo.name}-firstview.png`
    });

    console.log(`✅ ${pageInfo.description} 完了`);
  }

  // モバイルビュー
  console.log('\n📱 モバイルビューのスクリーンショットを撮影中...');
  await context.close();
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 }
  });
  const mobilePage = await mobileContext.newPage();

  await mobilePage.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({
    path: 'screenshots/index-mobile.png',
    fullPage: true
  });

  console.log('✅ モバイルビュー完了\n');

  await browser.close();
  console.log('🎉 すべてのスクリーンショット撮影が完了しました！');
}

evaluateDesign().catch(console.error);
