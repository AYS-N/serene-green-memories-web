
import React from 'react';
import ContactForm from '@/components/ui/ContactForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-green-50 py-12 px-4 sm:px-6">
          <div className="container-custom">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">お問い合わせ</h1>
            <p className="mt-4 text-xl text-gray-700 max-w-3xl">
              遺品整理や生前整理に関するご質問、お見積りのご依頼など、お気軽にお問い合わせください。
              24時間以内に担当者より折り返しご連絡いたします。
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">お問い合わせ方法</h2>
                
                <div className="space-y-8">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">お電話でのお問い合わせ</h3>
                    <p className="text-gray-600 mb-2">お急ぎの方はお電話がおすすめです</p>
                    <a href="tel:0312345678" className="text-2xl font-semibold text-green-600 hover:text-green-700">03-1234-5678</a>
                    <p className="text-sm text-gray-500 mt-1">受付時間: 9:00〜18:00（年中無休）</p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">メールでのお問い合わせ</h3>
                    <p className="text-gray-600 mb-2">24時間受付中</p>
                    <a href="mailto:info@example.com" className="text-lg font-semibold text-green-600 hover:text-green-700">info@example.com</a>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">所在地</h3>
                    <address className="not-italic text-gray-600">
                      〒123-4567<br />
                      東京都○○区○○町1-2-3
                    </address>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">対応エリア</h3>
                  <p className="text-gray-600 mb-2">以下の地域を中心に対応しております</p>
                  <ul className="grid grid-cols-2 gap-2 text-gray-600">
                    <li>東京都</li>
                    <li>神奈川県</li>
                    <li>埼玉県</li>
                    <li>千葉県</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-4">※上記以外の地域もご相談ください</p>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">お問い合わせフォーム</h2>
                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border border-gray-100">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="section-padding bg-green-50">
          <div className="container-custom">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">アクセス</h2>
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Google マップなどの地図を埋め込む場所</p>
              </div>
            </div>
            <div className="mt-8 max-w-3xl mx-auto">
              <h3 className="text-xl font-medium text-gray-800 mb-3">交通アクセス</h3>
              <ul className="space-y-3 text-gray-600">
                <li>○○線 ○○駅より徒歩5分</li>
                <li>○○線 ○○駅より徒歩10分</li>
                <li>○○バス ○○バス停より徒歩3分</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
