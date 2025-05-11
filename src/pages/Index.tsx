
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-green-50 py-20 px-4 sm:px-6">
          <div className="container-custom">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
                心を込めて、<br />大切な思い出の<span className="text-green-600">整理</span>をお手伝い
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                故人様の想いを尊重し、ご遺族様の気持ちに寄り添う遺品整理サービスを提供しています。
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <Link to="/contact">無料相談はこちら</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  <Link to="/services">サービス詳細</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-gray-900">サービス内容</h2>
              <p className="mt-4 text-lg text-gray-600">
                お客様のニーズに合わせた丁寧なサービスを提供しております
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: '遺品整理',
                  description: '故人様の大切な思い出の品々を丁寧に整理し、供養品は適切に処理いたします。',
                },
                {
                  title: '生前整理',
                  description: 'ご自身の思い出の品々を整理し、大切な方々への負担を軽減します。',
                },
                {
                  title: '特殊清掃',
                  description: '特殊な状況下での清掃も、プロの技術と経験で対応いたします。',
                },
                {
                  title: '不用品回収',
                  description: '不要になった家具や家電などを適切に回収・処分いたします。',
                }
              ].map((service, index) => (
                <div key={index} className="bg-green-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-green-700 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link to="/services" className="text-green-600 hover:text-green-700 inline-flex items-center">
                    詳しく見る
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link to="/services">すべてのサービスを見る</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Us Summary */}
        <section className="section-padding bg-green-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">私たちについて</h2>
                <p className="text-lg text-gray-700 mb-4">
                  優心遺品整理は、故人様とご遺族様の気持ちに寄り添い、心を込めた丁寧なサービスを提供しています。
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  お客様一人ひとりの状況に合わせたオーダーメイドの対応で、遺品整理や生前整理のお手伝いをいたします。
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600">24時間365日対応可能</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600">経験豊富なスタッフによる丁寧な対応</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600">明確な料金体系で安心</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    <Link to="/about">会社概要を見る</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="aspect-w-16 aspect-h-9 mb-6 bg-green-100 rounded-md flex items-center justify-center">
                  <p className="text-green-700 text-center p-12">会社イメージ写真</p>
                </div>
                <blockquote className="italic text-gray-700 border-l-4 border-green-300 pl-4">
                  "お客様の気持ちに寄り添い、一つ一つの品物に心を込めて向き合います。故人様の想いを大切に、ご遺族様の心の負担を少しでも軽くできるよう努めています。"
                </blockquote>
                <p className="text-right mt-2 text-gray-600">- 代表 山田 優心</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 bg-green-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-semibold mb-4">お気軽にご相談ください</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              遺品整理や生前整理に関するご質問、ご相談はお電話またはお問い合わせフォームからお気軽にどうぞ。
              無料でご相談を承っています。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-green-700">
                <a href="tel:0312345678">03-1234-5678</a>
              </Button>
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Link to="/contact">お問い合わせフォーム</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
