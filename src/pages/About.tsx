
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-green-50 py-12 px-4 sm:px-6">
          <div className="container-custom">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">会社概要</h1>
            <p className="mt-4 text-xl text-gray-700 max-w-3xl">
              私たちは、故人様の想いを大切にし、ご遺族様の気持ちに寄り添う、心のこもった遺品整理サービスを提供しています。
            </p>
          </div>
        </section>

        {/* Company Philosophy */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-semibold text-green-700 mb-6">企業理念</h2>
                <p className="text-lg text-gray-700 mb-4">
                  「優しい心で、丁寧に、誠実に」をモットーに、遺品整理のプロフェッショナルとして、お客様一人ひとりに寄り添ったサービスを提供しています。
                </p>
                <p className="text-lg text-gray-700">
                  故人様の大切な思い出の品を整理する作業は、単なる物の整理ではなく、人生の記録や想いを整理する大切な作業です。
                  私たちは、その重要性を理解し、敬意と感謝の気持ちを持って、丁寧に対応いたします。
                </p>
              </div>
              <div className="bg-green-100 rounded-lg">
                <div className="aspect-w-4 aspect-h-3 flex items-center justify-center p-8 lg:p-16">
                  <p className="text-green-700 text-center">企業理念イメージ写真</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Information */}
        <section className="section-padding bg-green-50">
          <div className="container-custom">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">会社情報</h2>
            
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 max-w-3xl mx-auto">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-gray-700 font-medium w-1/3">会社名</th>
                    <td className="py-4 text-gray-800">優心遺品整理株式会社</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-gray-700 font-medium">代表者</th>
                    <td className="py-4 text-gray-800">山田 優心</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-gray-700 font-medium">設立</th>
                    <td className="py-4 text-gray-800">2015年4月1日</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-gray-700 font-medium">所在地</th>
                    <td className="py-4 text-gray-800">〒123-4567 東京都○○区○○町1-2-3</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-gray-700 font-medium">電話番号</th>
                    <td className="py-4 text-gray-800">03-1234-5678</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-gray-700 font-medium">営業時間</th>
                    <td className="py-4 text-gray-800">9:00〜18:00（年中無休）</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-gray-700 font-medium">対応エリア</th>
                    <td className="py-4 text-gray-800">東京都、神奈川県、埼玉県、千葉県</td>
                  </tr>
                  <tr>
                    <th className="py-4 text-left text-gray-700 font-medium">資格・加盟</th>
                    <td className="py-4 text-gray-800">
                      遺品整理士認定協会会員<br />
                      特殊清掃技能士<br />
                      古物商許可
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Our Strengths */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-2xl font-semibold text-gray-900 mb-12 text-center">私たちの強み</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: '豊富な経験と知識',
                  description: '遺品整理のプロフェッショナルとして、多数の実績があります。様々なケースに対応できる経験と知識を持ったスタッフが対応します。',
                  icon: 'experience',
                },
                {
                  title: '心に寄り添うサービス',
                  description: 'お客様の気持ちに寄り添い、一つ一つの品物に敬意を払って丁寧に対応します。故人様の想いを大切に扱います。',
                  icon: 'heart',
                },
                {
                  title: '明確な料金体系',
                  description: '追加料金なしの明確な料金体系でご案内します。お見積りの段階で詳しくご説明し、ご納得いただいた上で作業を進めます。',
                  icon: 'price',
                },
              ].map((strength, index) => (
                <div key={index} className="p-6 border border-green-100 rounded-lg hover:shadow-md transition-shadow">
                  <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <div className="text-green-600">
                      {strength.icon === 'experience' && (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                      {strength.icon === 'heart' && (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      )}
                      {strength.icon === 'price' && (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-green-700 mb-3">{strength.title}</h3>
                  <p className="text-gray-600">{strength.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 bg-green-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-semibold mb-4">心を込めたサービスをご提供します</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              遺品整理について、どんなことでもお気軽にご相談ください。
              無料相談・お見積りを承っております。
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

export default AboutPage;
