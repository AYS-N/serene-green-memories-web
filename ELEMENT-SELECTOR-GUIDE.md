# 🎯 要素選択ツール使い方ガイド

ブラウザでクリックした要素を選択して、Claude Codeで編集できるツールです。

## 📦 セットアップ

### 1. 必要なパッケージをインストール

```bash
npm install express cors
```

### 2. サーバーを起動

```bash
node element-selector-server.js
```

サーバーが `http://localhost:3001` で起動します。

## 🚀 使い方

### 方法1: ブラウザコンソールから（推奨）

1. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

2. **ブラウザでページを開く**
   - http://localhost:8080/

3. **ブラウザのコンソールを開く**
   - Windows/Linux: `F12` または `Ctrl + Shift + I`
   - Mac: `Cmd + Option + I`

4. **要素選択ツールを読み込む**

   コンソールに以下を貼り付けて実行:
   ```javascript
   const script = document.createElement('script');
   script.src = '/element-selector.js';
   document.body.appendChild(script);
   ```

5. **左下に表示されるボタンをクリック**
   - 「🎯 要素選択モード: OFF」→「ON」に切り替わります

6. **編集したい要素をクリック**
   - ホバーすると緑色にハイライト表示されます
   - クリックすると要素情報パネルが表示されます

7. **「💾 保存」ボタンをクリック**
   - 要素情報が `selected-element.json` に保存されます

8. **Claude Codeで修正指示を出す**
   ```
   selected-element.json を読んで、この要素の背景色を赤に変更して
   ```

## 📝 使用例

### 例1: 画像を変更する

1. ブラウザで画像をクリック
2. 「💾 保存」をクリック
3. Claude Codeに指示:
   ```
   selected-element.json を読んで、この画像を別の画像 (images/new-image.png) に変更して
   ```

### 例2: テキストを変更する

1. ブラウザでテキスト要素をクリック
2. 「💾 保存」をクリック
3. Claude Codeに指示:
   ```
   selected-element.json を読んで、このテキストを「新しいテキスト」に変更して
   ```

### 例3: スタイルを変更する

1. ブラウザでボタンをクリック
2. 「💾 保存」をクリック
3. Claude Codeに指示:
   ```
   selected-element.json を読んで、このボタンの色を青に、サイズを大きくして
   ```

### 例4: レイアウトを変更する

1. ブラウザでセクションをクリック
2. 「💾 保存」をクリック
3. Claude Codeに指示:
   ```
   selected-element.json を読んで、このセクションを2カラムから3カラムレイアウトに変更して
   ```

## 🎨 保存される情報

`selected-element.json` には以下の情報が保存されます:

```json
{
  "element": {
    "tagName": "IMG",
    "selector": "img.hero-image",
    "id": "main-hero",
    "className": "hero-image fade-in",
    "textContent": "",
    "innerHTML": "",
    "src": "http://localhost:8080/images/hero.jpg",
    "position": {
      "top": 100,
      "left": 200,
      "width": 800,
      "height": 400
    },
    "styles": {
      "color": "rgb(0, 0, 0)",
      "backgroundColor": "rgb(255, 255, 255)",
      "fontSize": "16px",
      "fontFamily": "Noto Sans JP"
    },
    "xpath": "/HTML/BODY/DIV[1]/IMG[1]"
  },
  "timestamp": "2026-01-23T07:00:00.000Z",
  "url": "http://localhost:8080/"
}
```

## 🛠️ トラブルシューティング

### サーバーに接続できない場合

サーバーが起動していない可能性があります:
```bash
node element-selector-server.js
```

別のターミナルで実行してください。

### 「💾 保存」が失敗する場合

ローカルストレージに保存されます。以下の手順で取得:

1. ブラウザのコンソールを開く
2. 以下を実行:
   ```javascript
   console.log(JSON.parse(localStorage.getItem('selectedElement')))
   ```
3. 表示された内容をコピー
4. Claude Codeに貼り付けて指示

## 💡 ヒント

- **複数の要素を選択したい場合**: 1つずつ選択→保存→修正を繰り返します
- **細かい要素を選択したい場合**: ブラウザのズーム機能を使用
- **HTMLを直接編集したい場合**: selected-element.json の `innerHTML` を参照

## 🔗 関連ファイル

- `element-selector.js` - ブラウザで動作する要素選択ツール
- `element-selector-server.js` - 要素情報を受け取るサーバー
- `selected-element.json` - 選択した要素情報の保存先

## 📞 サポート

問題が発生した場合は、ブラウザのコンソールでエラーメッセージを確認してください。
