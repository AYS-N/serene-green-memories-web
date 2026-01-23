/**
 * Element Selector Server
 * ブラウザから選択した要素情報を受け取るローカルサーバー
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 選択した要素情報を保存
app.post('/save-element', (req, res) => {
  const elementData = req.body;
  const filePath = path.join(__dirname, 'selected-element.json');

  fs.writeFileSync(filePath, JSON.stringify(elementData, null, 2), 'utf-8');

  console.log('✅ 要素情報を保存しました:');
  console.log(`   セレクタ: ${elementData.element.selector}`);
  console.log(`   タグ: ${elementData.element.tagName}`);
  console.log(`   ファイル: ${filePath}`);
  console.log('');
  console.log('💡 Claude Codeに以下のように指示してください:');
  console.log('   "selected-element.json を読んで、この要素を [修正内容] に変更して"');

  res.json({ success: true, message: '要素情報を保存しました' });
});

// 保存した要素情報を取得
app.get('/get-element', (req, res) => {
  const filePath = path.join(__dirname, 'selected-element.json');

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } else {
    res.status(404).json({ error: '選択した要素がありません' });
  }
});

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 Element Selector Server が起動しました！');
  console.log(`   ポート: ${PORT}`);
  console.log('');
  console.log('📝 使い方:');
  console.log('   1. ブラウザのコンソールで element-selector.js を読み込む');
  console.log('   2. 左下のボタンで要素選択モードをON');
  console.log('   3. 要素をクリックして選択');
  console.log('   4. "💾 保存" ボタンをクリック');
  console.log('   5. Claude Codeで修正指示を出す');
  console.log('');
});
