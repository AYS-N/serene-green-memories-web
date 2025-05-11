
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-green-50 border-t border-green-100">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-4">優心遺品整理</h3>
            <p className="text-gray-600 mb-4">
              心を込めて、大切な思い出の整理をお手伝いいたします。故人様の想いを尊重し、ご遺族様の気持ちに寄り添うサービスを提供しています。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-4">サービスメニュー</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-600 hover:text-green-600">遺品整理サービス</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-green-600">生前整理サービス</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-green-600">特殊清掃</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-green-600">不用品回収</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-4">お問い合わせ</h3>
            <address className="not-italic text-gray-600">
              <p>〒123-4567</p>
              <p>東京都○○区○○町1-2-3</p>
              <p className="mt-2">TEL: 03-1234-5678</p>
              <p>受付時間: 9:00〜18:00 (年中無休)</p>
            </address>
            <div className="mt-4">
              <Link to="/contact" className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                お問い合わせフォーム
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-100 mt-8 pt-8 text-center">
          <nav className="mb-4">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-green-600">トップ</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-green-600">サービス内容</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-green-600">会社概要</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-green-600">よくある質問</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-green-600">お問い合わせ</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600">プライバシーポリシー</a></li>
            </ul>
          </nav>
          <p className="text-gray-500 text-sm">&copy; {currentYear} 優心遺品整理 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
