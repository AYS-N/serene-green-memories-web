
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const FaqPage = () => {
  const faqs = [
    {
      category: '遺品整理について',
      questions: [
        {
          question: '遺品整理はどのようなサービスですか？',
          answer: '遺品整理は、故人様が残された家財道具や思い出の品を整理し、必要なものを仕分け、不用品を適切に処分するサービスです。大切な思い出の品の整理から、家財の処分、清掃まで一括して対応いたします。',
        },
        {
          question: '遺品整理の流れを教えてください',
          answer: '初めにお電話やメールでご相談いただき、現地調査・お見積りを行います。お見積りにご納得いただけましたら、作業日を決定し、当日は専門スタッフが丁寧に整理・処分作業を行います。作業完了後、最終確認をしていただき、お支払いとなります。',
        },
        {
          question: '遺品整理の料金はどのくらいですか？',
          answer: '料金は、お部屋の広さや遺品の量、作業内容によって異なります。一般的な1LDKのアパートの場合、50,000円〜となります。現地調査後に正確なお見積りを提示いたしますので、お気軽にご相談ください。',
        },
        {
          question: '遺品整理の所要時間はどのくらいですか？',
          answer: '作業時間は物の量や内容によって異なりますが、1Kなら半日程度、一般的な一軒家なら1〜2日程度かかります。特殊な状況や大量の遺品がある場合は、さらに時間がかかる場合があります。',
        },
      ],
    },
    {
      category: '生前整理について',
      questions: [
        {
          question: '生前整理とは何ですか？',
          answer: '生前整理とは、ご本人が元気なうちに、所有する物の整理や処分を行い、残される方への負担を減らす取り組みです。思い出の整理や重要書類の整理なども含まれます。',
        },
        {
          question: '生前整理はどのような方に向いていますか？',
          answer: '「将来、家族に迷惑をかけたくない」「身の回りの物が多く、整理したい」「終活の一環として準備しておきたい」といった方に適しています。また、施設への入居前や住み替えの際にも便利です。',
        },
        {
          question: '生前整理で何をしますか？',
          answer: '所有物の仕分け、不用品の処分、思い出の品の整理、重要書類の確認などを行います。ご希望に応じて、デジタルデータの整理なども対応可能です。ご本人の意向を尊重しながら進めていきます。',
        },
      ],
    },
    {
      category: '特殊清掃について',
      questions: [
        {
          question: '特殊清掃とはどのようなサービスですか？',
          answer: '特殊清掃とは、通常の清掃会社では対応が難しい特殊な状況下での清掃サービスです。長期間放置された物件の清掃、悪臭がある場合の消臭・除菌、害虫・害獣の駆除などが含まれます。',
        },
        {
          question: '特殊清掃は誰が行いますか？',
          answer: '特殊清掃の専門知識と経験を持った専門スタッフが対応いたします。適切な保護具を着用し、専門的な機材と薬剤を使用して安全かつ確実に清掃を行います。',
        },
      ],
    },
    {
      category: '不用品回収について',
      questions: [
        {
          question: '不用品回収の対象となるものは何ですか？',
          answer: '家具、家電、寝具、食器、書籍、衣類など、一般的な家庭から出る不用品のほとんどを回収できます。ただし、産業廃棄物や危険物など、一部回収できないものもありますので、詳しくはお問い合わせください。',
        },
        {
          question: '不用品回収の料金はどのように決まりますか？',
          answer: '不用品の量や種類、作業の難易度、搬出経路などによって料金が変わります。まずは無料見積りをご利用いただき、正確な料金をご案内いたします。',
        },
        {
          question: 'リサイクル可能なものはリサイクルされますか？',
          answer: 'はい、弊社では環境に配慮し、可能な限りリサイクルを行っています。再利用可能な家具や家電は、リサイクルショップへの買取や寄付などの選択肢もご提案しています。',
        },
      ],
    },
    {
      category: 'その他のご質問',
      questions: [
        {
          question: '遠方に住んでいますが、対応してもらえますか？',
          answer: 'はい、対応可能です。遠方にお住まいの方でも、現地での立ち会いなしでサービスを提供することができます。電話やメールでの丁寧な打ち合わせ、作業途中の写真送付などで安心してご依頼いただけます。',
        },
        {
          question: '急な依頼でも対応してもらえますか？',
          answer: '可能な限り対応いたします。スケジュールの都合がつく場合は、最短で翌日からの作業も可能です。急な依頼の場合は、まずはお電話でご相談ください。',
        },
        {
          question: '見積りは無料ですか？',
          answer: 'はい、現地調査・お見積りは完全無料です。お見積り後の追加料金も一切ありませんので、安心してご相談ください。',
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-green-50 py-12 px-4 sm:px-6">
          <div className="container-custom">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">よくある質問</h1>
            <p className="mt-4 text-xl text-gray-700 max-w-3xl">
              遺品整理や生前整理に関するよくあるご質問をまとめました。
              お探しの情報が見つからない場合は、お気軽にお問い合わせください。
            </p>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {faqs.map((category, index) => (
                <a 
                  key={index}
                  href={`#category-${index}`}
                  className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
                >
                  <h3 className="text-lg font-medium text-green-700">{category.category}</h3>
                  <p className="text-sm text-gray-600 mt-1">質問 {category.questions.length}件</p>
                </a>
              ))}
            </div>

            {/* FAQ Accordions */}
            <div className="space-y-8">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex} id={`category-${categoryIndex}`} className="scroll-mt-24">
                  <h2 className="text-2xl font-semibold text-green-700 mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="border rounded-lg overflow-hidden">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`} className="border-b last:border-b-0">
                        <AccordionTrigger className="px-4 text-left hover:bg-green-50 hover:no-underline data-[state=open]:bg-green-50">
                          <span className="text-gray-800">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-2">
                          <p className="text-gray-600">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="section-padding bg-green-50">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">まだ質問がありますか？</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              お探しの情報が見つからない場合は、お気軽にお問い合わせください。
              専門のスタッフが丁寧にお答えいたします。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <a href="tel:0312345678">03-1234-5678</a>
              </Button>
              <Button asChild size="lg" className="bg-green-600 text-white hover:bg-green-700">
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

export default FaqPage;
