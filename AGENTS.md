# AGENTS.md

## プロジェクト概要
- Vite + React + TypeScript アプリ。Tailwind と shadcn/ui コンポーネントを使用。
- ソースコードは `src/` 配下。ルート直下の静的HTMLファイルはレガシーテンプレート。
- ブログデータは microCMS から取得予定（`src/lib/microcms.ts` 参照）。
- ブログページは現在、静的HTML + vanilla JS で実装（`blog.html`、`blog-detail.html`、`js/`）。

## 主要ディレクトリ
- `src/` - アプリケーションコード
- `src/components/` - 再利用可能なUIコンポーネント
- `src/lib/` - ユーティリティ（APIクライアント、ヘルパー）
- `public/` - 静的アセット
- `css/` - スタイルシート（メイン: `style.css`）
- `images/` - 画像アセットとSVGアイコン
- `js/` - 静的HTMLページ用のレガシーJavaScript

## よく使うコマンド
- 開発サーバー: `npm run dev`
- ビルド: `npm run build`
- ビルドプレビュー: `npm run preview`
- リント: `npm run lint`

## 環境変数
- microCMS を使用。必要なキーはローカルの `.env` ファイルに設定（コミット禁止）。
- ランタイムフォールバック: `public/microcms-config.js` で `window.__MICROCMS__` を提供可能（静的ホスティング用）。

## ページ構成
- `index.html` - トップページ（メインビジュアル、サービス紹介、お客様の声）
- `services.html` - サービス内容
- `price.html` - 料金について
- `about.html` - 会社概要
- `contact.html` - お問い合わせ（電話・フォーム・LINE）
- `thanks.html` - フォーム送信完了（サンクスページ）
- `blog.html` / `blog-detail.html` - ブログ一覧・詳細
- `faq.html` - よくある質問

## デザインファイル
- `pencil-new.pen` - Pencilデザインファイル（全ページのデザイン）
  - 「サービスページ（新提案）」フレーム（ID: DyFUy）- SERVICE-PAGE-DESIGN-PROPOSAL.md に基づく13セクション構成の新サービスページデザイン
    - ヒーロー / サービス概要 / 捨てない片付け / サービスの流れ / その他サポート / 対応エリア / 保障・資格 / 信頼バッジバー / 最終CTA / フッター
- `SERVICE-PAGE-DESIGN-PROPOSAL.md` - サービスページのデザイン提案書（13セクション構成・UX設計方針）

## メールフォーム（Mailform Pro 4.2.3）

### 概要
お問い合わせフォーム（contact.html）は、お名前ドットコムサーバー上で稼働中の Mailform Pro CGI にPOSTする構成。

### 設定情報
- **CGI URL**: `https://seirino-mikata.com/mailformpro/mailformpro.cgi`
- **設定ファイル**: サーバー上の `mailformpro/config.cgi`
- **メール送信先**: `info@seirino-mikata.com`
- **差出人名**: 整理のミカタ
- **サンクスページ**: `../thanks.html?no=%s`（相対パス、受付番号付き）

### フォームのname属性（Mailform Pro準拠）

| フィールド | name属性 |
|-----------|---------|
| 氏名 | `氏名` |
| ふりがな | `ふりがな` |
| 郵便番号 | `郵便番号` |
| 住所 | `住所` |
| 電話番号 | `電話番号` |
| 希望日時 | `希望日時` |
| ご相談内容 | `ご相談内容` |

### 注意事項
- フォームの `id` は `mailformpro` にすること（CGI側で参照）
- name属性は日本語（旧サイトと同一のフィールド名を維持）
- config.cgiを変更すると旧サイト・新サイト両方に影響する（共有CGI）

## 公式LINE
- **URL**: `https://lin.ee/zR7fCKt`
- サイト内の複数箇所で使用（ヘッダー、CTAセクション、お問い合わせページ、サンクスページ）

## 連絡先情報
- **フリーダイヤル**: 0120-433-233
- **受付時間**: 10:00〜19:00（年中無休）
- **メール**: info@seirino-mikata.com
- **住所**: 〒362-0035 埼玉県上尾市仲町1-7-25

## スタイル規約

### CSS変数（`:root` で定義）
- `--color-primary`: #5a9d64（グリーン）
- `--color-primary-dark`: #3d7a4a
- `--color-primary-light`: #7fb889
- `--color-primary-bg`: #F5FBF6
- `--font-sans`: 'Noto Sans JP'
- `--font-serif`: 'Noto Sans JP'

### メインビジュアルセクション
- デスクトップ: 左右並びレイアウト（右側に人物画像）
- モバイル（840px以下）: 人物画像は非表示、テキスト中央揃え
- タイトルは `.main-visual-title` で3行構成:
  - 1行目: おかたずけの
  - 2行目: プロフェッショナル
  - 3行目: 整理のミカタ（`.brand-name` でスタイル - グリーン、大きめ、太字）

### レスポンシブブレークポイント
- 840px: メインビジュアルのレイアウト変更（縦並び、人物非表示）
- 768px: ナビゲーションがモバイルメニューに切替、フッターレイアウト変更
- 640px: ブロググリッドが1カラムに

## アイコンファイル（`images/`）
- `icon-tel.svg` - 電話アイコン
- `icon-mail.svg` - メール/封筒アイコン
- `icon-line.svg` - LINEメッセンジャーアイコン
- `icon-heart.svg`、`icon-pro.svg`、`icon-price.svg`、`icon-support.svg` - 特徴アイコン

## 開発規約
- Reactページ/コンポーネントは `src/` 配下を優先して編集すること。
- 変更は最小限に、既存のコンポーネントパターンとの一貫性を保つこと。
- ブログ一覧/詳細のスタイルは `css/style.css` にあり、`.blog-grid`、`.blog-card`、`.pagination`、`.blog-detail-*` などのクラスを使用。
- 色やフォントにはCSS変数を使用して統一感を維持すること。
- モバイルファースト: スマートフォン表示（375px幅）でのレイアウトを確認すること。
