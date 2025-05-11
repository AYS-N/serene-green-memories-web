
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ServicesPage = () => {
  const services = [
    {
      id: 'estate-cleanup',
      title: '遺品整理',
      description: '故人様の大切な思い出の品々を丁寧に整理し、ご遺族様の心に寄り添います。',
      details: [
        '遺品の仕分け・整理',
        '必要書類の確認と保管',
        '思い出の品の整理・梱包',
        '不用品の回収・処分',
        '特殊清掃（必要に応じて）',
        '供養品の適切な処理',
        'リサイクル・寄付の手配',
      ],
      image: 'estate-cleanup',
      price: '50,000円〜',
    },
    {
      id: 'lifetime-cleanup',
      title: '生前整理',
      description: 'ご自身の思い出の品々を整理し、大切な方々への負担を軽減します。将来に向けた準備をお手伝いします。',
      details: [
        '思い出の品の整理・分類',
        '資産・重要書類の整理',
        '不用品の処分アドバイス',
        '必要書類の確認と整理',
        '家財道具の整理・処分',
        'デジタルデータの整理',
      ],
      image: 'lifetime-cleanup',
      price: '40,000円〜',
    },
    {
      id: 'special-cleaning',
      title: '特殊清掃',
      description: '特殊な状況下での清掃も、プロの技術と経験で丁寧に対応いたします。',
      details: [
        '消臭・除菌作業',
        '特殊な汚れの除去',
        '原状回復作業',
        '害虫・害獣の駆除',
        '消毒・殺菌処理',
        '臭気対策',
      ],
      image: 'special-cleaning',
      price: '要相談',
    },
    {
      id: 'waste-collection',
      title: '不用品回収',
      description: '不要になった家具や家電などを適切に回収・処分いたします。リサイクル可能な品は環境に配慮して処理します。',
      details: [
        '家具・家電の回収',
        '大型ゴミの処分',
        '不要品の買取査定',
        'リサイクル品の分別',
        '産業廃棄物の適正処理',
        '引越し時の不用品回収',
      ],
      image: 'waste-collection',
      price: '10,000円〜',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-green-50 py-12 px-4 sm:px-6">
          <div className="container-custom">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">サービス内容</h1>
            <p className="mt-4 text-xl text-gray-700 max-w-3xl">
              私たちは、お客様のニーズに合わせた丁寧なサービスを提供しております。
              遺品整理、生前整理、特殊清掃、不用品回収など、様々なサービスをご用意しています。
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div key={service.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" id={service.id}>
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">{service.title}</h2>
                    <p className="text-lg text-gray-700 mb-6">{service.description}</p>
                    
                    <h3 className="text-lg font-medium text-gray-800 mb-3">サービス内容:</h3>
                    <ul className="space-y-2 mb-6">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="ml-2 text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="bg-green-50 p-4 rounded-lg mb-6">
                      <p className="text-sm text-gray-700">料金目安: <span className="font-medium">{service.price}</span></p>
                      <p className="text-xs text-gray-500 mt-1">※お客様の状況により異なります。詳しくはお問い合わせください。</p>
                    </div>
                    
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <Link to="/contact">お問い合わせ</Link>
                    </Button>
                  </div>
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} bg-green-100 rounded-lg`}>
                    <div className="aspect-w-4 aspect-h-3 flex items-center justify-center p-8 lg:p-16">
                      <p className="text-green-700 text-center">{service.title}のイメージ写真</p>
                    </div>
                  </div>
                  {index < services.length - 1 && (
                    <Separator className="col-span-1 lg:col-span-2 my-4 bg-green-100" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-green-50">
          <div className="container-custom">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">サービスの流れ</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: 'ご相談・お見積り',
                  description: '無料でご相談・お見積りを承ります。お客様のご要望をしっかりヒアリングし、最適なプランをご提案します。',
                },
                {
                  step: 2,
                  title: 'サービス内容の確定',
                  description: 'お見積り内容にご納得いただけましたら、サービス内容を確定し、作業日程を調整いたします。',
                },
                {
                  step: 3,
                  title: '作業実施・完了',
                  description: '専門スタッフが丁寧に作業を行います。作業完了後は、お客様に確認いただき、満足いただけるまで対応いたします。',
                }
              ].map((process) => (
                <div key={process.step} className="bg-white p-6 rounded-lg shadow-sm relative">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4 text-center">{process.title}</h3>
                  <p className="text-gray-600 text-center">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 bg-green-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-semibold mb-4">無料相談を受け付けております</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              遺品整理や生前整理に関するご不安やご質問、お見積りのご依頼など、
              お気軽にご相談ください。親身にお話をうかがいます。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-green-700">
                <a href="tel:0312345678">03-1234-5678</a>
              </Button>
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Link to="/contact">無料相談はこちら</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
