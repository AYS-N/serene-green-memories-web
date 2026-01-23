/**
 * Element Selector Tool v2.0
 * 改良版: より確実に要素を選択できるようになりました
 */

(function() {
  // 既存のツールがあれば削除
  if (window.__elementSelectorActive) {
    console.log('既存のElement Selectorを削除します...');
    return;
  }
  window.__elementSelectorActive = true;

  let isActive = false;
  let overlay = null;
  let infoPanel = null;
  let selectedElement = null;
  let lastHoveredElement = null;

  // スタイル
  const styles = `
    .element-selector-overlay {
      position: fixed;
      pointer-events: none;
      border: 3px dashed #ff0000;
      background: rgba(255, 0, 0, 0.15);
      z-index: 2147483646;
      box-shadow: 0 0 0 4px rgba(255, 0, 0, 0.3), inset 0 0 20px rgba(255, 0, 0, 0.2);
      transition: all 0.05s ease-out;
    }
    .element-selector-label {
      position: fixed;
      background: #ff0000;
      color: white;
      padding: 4px 8px;
      font-size: 12px;
      font-family: monospace;
      z-index: 2147483647;
      pointer-events: none;
      border-radius: 2px;
      white-space: nowrap;
    }
    .element-selector-info-panel {
      position: fixed;
      top: 10px;
      right: 10px;
      background: #1a1a1a;
      color: white;
      padding: 20px;
      border-radius: 12px;
      z-index: 2147483647;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      max-width: 420px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      border: 1px solid #333;
    }
    .element-selector-info-panel h3 {
      margin: 0 0 15px 0;
      color: #00ff00;
      font-size: 18px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .element-selector-info-panel .info-item {
      margin: 10px 0;
      padding: 8px;
      background: #2a2a2a;
      border-radius: 6px;
      word-break: break-all;
    }
    .element-selector-info-panel .info-label {
      color: #00ff00;
      font-weight: bold;
      display: block;
      margin-bottom: 4px;
      font-size: 12px;
    }
    .element-selector-info-panel .info-value {
      color: #fff;
      font-family: monospace;
      font-size: 13px;
    }
    .element-selector-info-panel .btn-group {
      display: flex;
      gap: 10px;
      margin-top: 15px;
      flex-wrap: wrap;
    }
    .element-selector-info-panel button {
      padding: 10px 20px;
      background: #00ff00;
      color: black;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      font-size: 14px;
      transition: all 0.2s;
    }
    .element-selector-info-panel button:hover {
      background: #00cc00;
      transform: translateY(-1px);
    }
    .element-selector-info-panel .close-btn {
      background: #ff4444;
      color: white;
    }
    .element-selector-info-panel .close-btn:hover {
      background: #cc0000;
    }
    .element-selector-toggle {
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 14px 28px;
      background: linear-gradient(135deg, #00ff00 0%, #00cc00 100%);
      color: black;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      font-weight: bold;
      z-index: 2147483647;
      box-shadow: 0 4px 15px rgba(0, 255, 0, 0.4);
      font-size: 15px;
      transition: all 0.3s;
    }
    .element-selector-toggle:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 255, 0, 0.5);
    }
    .element-selector-toggle.active {
      background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
      box-shadow: 0 4px 15px rgba(255, 68, 68, 0.4);
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 4px 15px rgba(255, 68, 68, 0.4); }
      50% { box-shadow: 0 4px 25px rgba(255, 68, 68, 0.7); }
    }
    .element-selector-instructions {
      position: fixed;
      bottom: 80px;
      left: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      z-index: 2147483647;
      font-size: 14px;
      max-width: 300px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      display: none;
    }
    .element-selector-instructions.show {
      display: block;
    }
    .element-selector-instructions p {
      margin: 5px 0;
    }
    .element-selector-instructions .key {
      background: #333;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
    }
  `;

  // スタイルを注入
  const styleSheet = document.createElement('style');
  styleSheet.id = 'element-selector-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // オーバーレイを作成
  overlay = document.createElement('div');
  overlay.className = 'element-selector-overlay';
  overlay.style.display = 'none';
  document.body.appendChild(overlay);

  // ラベルを作成
  const label = document.createElement('div');
  label.className = 'element-selector-label';
  label.style.display = 'none';
  document.body.appendChild(label);

  // 説明を作成
  const instructions = document.createElement('div');
  instructions.className = 'element-selector-instructions';
  instructions.innerHTML = `
    <p><strong>📍 要素選択モード ON</strong></p>
    <p>・要素の上でクリックして選択</p>
    <p>・<span class="key">ESC</span> でモード終了</p>
    <p>・<span class="key">↑</span> で親要素を選択</p>
  `;
  document.body.appendChild(instructions);

  // トグルボタンを作成
  const toggleButton = document.createElement('button');
  toggleButton.className = 'element-selector-toggle';
  toggleButton.textContent = '🎯 要素選択モード';
  document.body.appendChild(toggleButton);

  // 要素のセレクタを生成（改良版）
  function getSelector(element) {
    if (!element || element === document.body || element === document.documentElement) {
      return element ? element.tagName.toLowerCase() : '';
    }

    // IDがある場合
    if (element.id) {
      return `#${element.id}`;
    }

    // クラスがある場合
    const classes = Array.from(element.classList).filter(c =>
      c && !c.startsWith('element-selector')
    );

    let selector = element.tagName.toLowerCase();

    if (classes.length > 0) {
      selector += '.' + classes.slice(0, 2).join('.');
    }

    // 親要素を含めてユニークにする
    const parent = element.parentElement;
    if (parent && parent !== document.body) {
      const parentSelector = getSelector(parent);
      if (parentSelector) {
        selector = parentSelector + ' > ' + selector;
      }
    }

    return selector;
  }

  // シンプルなセレクタを取得
  function getSimpleSelector(element) {
    if (element.id) return `#${element.id}`;

    const classes = Array.from(element.classList).filter(c =>
      c && !c.startsWith('element-selector')
    );

    if (classes.length > 0) {
      return `${element.tagName.toLowerCase()}.${classes[0]}`;
    }

    return element.tagName.toLowerCase();
  }

  // 要素の情報を取得
  function getElementInfo(element) {
    const rect = element.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(element);

    // 画像の場合は追加情報を取得
    let additionalInfo = {};
    if (element.tagName === 'IMG') {
      additionalInfo = {
        src: element.src,
        alt: element.alt,
        naturalWidth: element.naturalWidth,
        naturalHeight: element.naturalHeight
      };
    } else if (element.tagName === 'A') {
      additionalInfo = {
        href: element.href,
        target: element.target
      };
    }

    return {
      tagName: element.tagName,
      selector: getSelector(element),
      simpleSelector: getSimpleSelector(element),
      id: element.id || null,
      className: Array.from(element.classList).filter(c => !c.startsWith('element-selector')).join(' ') || null,
      textContent: element.textContent.trim().substring(0, 150),
      outerHTML: element.outerHTML.substring(0, 500),
      ...additionalInfo,
      position: {
        top: Math.round(rect.top + window.scrollY),
        left: Math.round(rect.left + window.scrollX),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      },
      styles: {
        color: computedStyle.color,
        backgroundColor: computedStyle.backgroundColor,
        fontSize: computedStyle.fontSize,
        fontWeight: computedStyle.fontWeight,
        padding: computedStyle.padding,
        margin: computedStyle.margin
      }
    };
  }

  // 情報パネルを表示
  function showInfoPanel(elementInfo) {
    if (infoPanel) {
      infoPanel.remove();
    }

    infoPanel = document.createElement('div');
    infoPanel.className = 'element-selector-info-panel';

    let htmlContent = `
      <h3>✅ 要素を選択しました</h3>
      <div class="info-item">
        <span class="info-label">タグ</span>
        <span class="info-value">${elementInfo.tagName}</span>
      </div>
      <div class="info-item">
        <span class="info-label">セレクタ</span>
        <span class="info-value">${elementInfo.simpleSelector}</span>
      </div>
    `;

    if (elementInfo.id) {
      htmlContent += `
        <div class="info-item">
          <span class="info-label">ID</span>
          <span class="info-value">#${elementInfo.id}</span>
        </div>
      `;
    }

    if (elementInfo.className) {
      htmlContent += `
        <div class="info-item">
          <span class="info-label">クラス</span>
          <span class="info-value">${elementInfo.className}</span>
        </div>
      `;
    }

    if (elementInfo.src) {
      htmlContent += `
        <div class="info-item">
          <span class="info-label">画像ソース</span>
          <span class="info-value">${elementInfo.src.split('/').pop()}</span>
        </div>
      `;
    }

    if (elementInfo.href) {
      htmlContent += `
        <div class="info-item">
          <span class="info-label">リンク先</span>
          <span class="info-value">${elementInfo.href}</span>
        </div>
      `;
    }

    if (elementInfo.textContent && elementInfo.tagName !== 'SCRIPT' && elementInfo.tagName !== 'STYLE') {
      htmlContent += `
        <div class="info-item">
          <span class="info-label">テキスト</span>
          <span class="info-value">${elementInfo.textContent.substring(0, 100)}${elementInfo.textContent.length > 100 ? '...' : ''}</span>
        </div>
      `;
    }

    htmlContent += `
      <div class="info-item">
        <span class="info-label">サイズ</span>
        <span class="info-value">${elementInfo.position.width} x ${elementInfo.position.height}px</span>
      </div>
      <div class="btn-group">
        <button class="save-btn">💾 保存してClaude Codeへ</button>
        <button class="copy-btn">📋 コピー</button>
        <button class="close-btn">✕</button>
      </div>
    `;

    infoPanel.innerHTML = htmlContent;
    document.body.appendChild(infoPanel);

    // 保存ボタン
    infoPanel.querySelector('.save-btn').addEventListener('click', async () => {
      const saveData = {
        element: elementInfo,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        pageTitle: document.title
      };

      try {
        const response = await fetch('http://localhost:3001/save-element', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saveData)
        });

        if (response.ok) {
          alert('✅ 保存しました！\n\nClaude Codeで以下のように指示してください:\n\n「selected-element.json を読んで、この要素を○○に変更して」');
        }
      } catch (error) {
        // ローカルストレージにも保存
        localStorage.setItem('selectedElement', JSON.stringify(saveData));

        // JSONファイルとしてダウンロード
        const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'selected-element.json';
        a.click();
        URL.revokeObjectURL(url);

        alert('✅ JSONファイルをダウンロードしました！\n\nプロジェクトフォルダに保存して、Claude Codeで指示してください。');
      }
    });

    // コピーボタン
    infoPanel.querySelector('.copy-btn').addEventListener('click', () => {
      const text = `セレクタ: ${elementInfo.simpleSelector}
タグ: ${elementInfo.tagName}
${elementInfo.id ? 'ID: #' + elementInfo.id : ''}
${elementInfo.className ? 'クラス: ' + elementInfo.className : ''}
${elementInfo.src ? '画像: ' + elementInfo.src : ''}
サイズ: ${elementInfo.position.width}x${elementInfo.position.height}px`;

      navigator.clipboard.writeText(text).then(() => {
        const btn = infoPanel.querySelector('.copy-btn');
        btn.textContent = '✓ コピーしました';
        setTimeout(() => btn.textContent = '📋 コピー', 2000);
      });
    });

    // 閉じるボタン
    infoPanel.querySelector('.close-btn').addEventListener('click', () => {
      infoPanel.remove();
      infoPanel = null;
    });
  }

  // マウスムーブイベント
  function handleMouseMove(e) {
    if (!isActive) return;

    const element = document.elementFromPoint(e.clientX, e.clientY);

    if (!element ||
        element === overlay ||
        element === label ||
        element === toggleButton ||
        element === instructions ||
        element === infoPanel ||
        element.closest('.element-selector-info-panel') ||
        element.closest('.element-selector-toggle') ||
        element.closest('.element-selector-instructions')) {
      return;
    }

    lastHoveredElement = element;
    const rect = element.getBoundingClientRect();

    // オーバーレイの位置を更新
    overlay.style.display = 'block';
    overlay.style.top = rect.top + 'px';
    overlay.style.left = rect.left + 'px';
    overlay.style.width = rect.width + 'px';
    overlay.style.height = rect.height + 'px';

    // ラベルを更新
    label.style.display = 'block';
    label.style.top = (rect.top - 25) + 'px';
    label.style.left = rect.left + 'px';
    label.textContent = getSimpleSelector(element);
  }

  // クリックイベント
  function handleClick(e) {
    if (!isActive) return;

    // ツールのUI要素は無視
    if (e.target === toggleButton ||
        e.target === overlay ||
        e.target === label ||
        e.target === instructions ||
        e.target.closest('.element-selector-info-panel') ||
        e.target.closest('.element-selector-toggle') ||
        e.target.closest('.element-selector-instructions')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const element = lastHoveredElement || document.elementFromPoint(e.clientX, e.clientY);

    if (element) {
      selectedElement = element;
      const elementInfo = getElementInfo(element);

      console.log('📍 選択した要素:', elementInfo);
      showInfoPanel(elementInfo);
    }

    return false;
  }

  // キーボードイベント
  function handleKeyDown(e) {
    if (!isActive) return;

    // ESCでモード終了
    if (e.key === 'Escape') {
      deactivate();
    }

    // ↑で親要素を選択
    if (e.key === 'ArrowUp' && lastHoveredElement) {
      e.preventDefault();
      const parent = lastHoveredElement.parentElement;
      if (parent && parent !== document.body && parent !== document.documentElement) {
        lastHoveredElement = parent;
        const rect = parent.getBoundingClientRect();
        overlay.style.top = rect.top + 'px';
        overlay.style.left = rect.left + 'px';
        overlay.style.width = rect.width + 'px';
        overlay.style.height = rect.height + 'px';
        label.textContent = getSimpleSelector(parent);
        label.style.top = (rect.top - 25) + 'px';
        label.style.left = rect.left + 'px';
      }
    }
  }

  // アクティベート
  function activate() {
    isActive = true;
    toggleButton.textContent = '🎯 選択モード ON (ESCで終了)';
    toggleButton.classList.add('active');
    instructions.classList.add('show');

    document.addEventListener('mousemove', handleMouseMove, true);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeyDown, true);

    // ページのスクロールを許可しつつ、リンククリックは防止
    document.body.style.cursor = 'crosshair';
  }

  // ディアクティベート
  function deactivate() {
    isActive = false;
    toggleButton.textContent = '🎯 要素選択モード';
    toggleButton.classList.remove('active');
    instructions.classList.remove('show');
    overlay.style.display = 'none';
    label.style.display = 'none';

    document.removeEventListener('mousemove', handleMouseMove, true);
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('keydown', handleKeyDown, true);

    document.body.style.cursor = '';
  }

  // トグルボタンのクリック
  toggleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isActive) {
      deactivate();
    } else {
      activate();
    }
  });

  console.log('');
  console.log('🎯 Element Selector v2.0 が読み込まれました！');
  console.log('');
  console.log('📍 使い方:');
  console.log('   1. 左下の緑のボタンをクリック');
  console.log('   2. 要素の上でクリックして選択');
  console.log('   3. 「💾 保存」をクリック');
  console.log('   4. Claude Codeで修正を指示');
  console.log('');
  console.log('⌨️ ショートカット:');
  console.log('   ESC: モード終了');
  console.log('   ↑: 親要素を選択');
  console.log('');
})();
