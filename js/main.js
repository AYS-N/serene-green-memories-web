document.addEventListener('DOMContentLoaded', function() {
  // 現在の年を取得してコピーライトに設定
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll('#current-year');
  yearElements.forEach(function(element) {
    element.textContent = currentYear;
  });
  
  // モバイルメニューの開閉
  initMobileMenu();
  
  // お客様の声スライダー
  initTestimonialSlider();
  
  // FAQのアコーディオン初期化
  initFaq();
  
  // お問い合わせフォームの送信処理
  initContactForm();
  
  // URLハッシュに該当するFAQカテゴリまでスクロール
  scrollToHashElement();
});

// モバイルメニューの初期化
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navSp = document.getElementById('nav-sp');
  
  if (navToggle && navSp) {
    // イベントリスナーを修正して正常に動作させる
    navToggle.addEventListener('click', function(e) {
      e.preventDefault(); // デフォルトの動作を防止
      navToggle.classList.toggle('active');
      navSp.classList.toggle('active');
      console.log('ハンバーガーメニューがクリックされました'); // デバッグログ
    });
    
    // メニュー内のリンクをクリックした時にメニューを閉じる
    const navLinks = navSp.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navSp.classList.remove('active');
      });
    });
  } else {
    console.log('ナビゲーション要素が見つかりません'); // デバッグログ
  }
}

// お客様の声スライダーの初期化
function initTestimonialSlider() {
  const testimonialSlider = document.getElementById('testimonial-slider');
  if (testimonialSlider) {
    const testimonialItems = testimonialSlider.querySelectorAll('.testimonial-item');
    if (testimonialItems && testimonialItems.length > 0) {
      const prevBtn = document.getElementById('testimonial-prev');
      const nextBtn = document.getElementById('testimonial-next');
      let currentIndex = 0;
      
      // 初期状態で最初のテスティモニアルを表示
      testimonialItems[0].classList.add('active');
      
      // 次のスライドを表示
      function showNextSlide() {
        if (testimonialItems && testimonialItems.length > 0) {
          testimonialItems[currentIndex].classList.remove('active');
          currentIndex = (currentIndex + 1) % testimonialItems.length;
          testimonialItems[currentIndex].classList.add('active');
        }
      }
      
      // 前のスライドを表示
      function showPrevSlide() {
        if (testimonialItems && testimonialItems.length > 0) {
          testimonialItems[currentIndex].classList.remove('active');
          currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
          testimonialItems[currentIndex].classList.add('active');
        }
      }
      
      // ボタンクリック時のイベント
      if (nextBtn) {
        nextBtn.addEventListener('click', showNextSlide);
      }
      
      if (prevBtn) {
        prevBtn.addEventListener('click', showPrevSlide);
      }
      
      // 自動スライド（5秒ごと）
      setInterval(showNextSlide, 5000);
    }
  }
}

// FAQのアコーディオン初期化
function initFaq() {
  // FAQのアコーディオン関数をグローバルに設定
  window.toggleAnswer = function(element) {
    const answer = element.nextElementSibling;
    const isActive = element.classList.contains('active');
    
    // すべてのFAQ質問を非アクティブにする
    const allQuestions = document.querySelectorAll('.faq-question');
    allQuestions.forEach(function(question) {
      question.classList.remove('active');
      const answerElement = question.nextElementSibling;
      if (answerElement && answerElement.classList.contains('faq-answer')) {
        answerElement.style.display = 'none';
      }
    });
    
    // クリックされた質問をトグルする
    if (!isActive) {
      element.classList.add('active');
      if (answer && answer.classList.contains('faq-answer')) {
        answer.style.display = 'flex';
      }
    }
  }
}

// お問い合わせフォームの初期化
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 本来はここでフォームデータをサーバーに送信する処理を行う
      // 今回はデモとして、成功メッセージを表示するだけ
      
      // フォームを非表示にし、成功メッセージを表示
      if (formSuccess) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // ページの先頭までスクロール
        window.scrollTo({
          top: document.querySelector('.contact-form-section').offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  }
}

// URLハッシュに該当する要素までスクロール
function scrollToHashElement() {
  if (window.location.hash && document.querySelector(window.location.hash)) {
    setTimeout(function() {
      const element = document.querySelector(window.location.hash);
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: 'smooth'
      });
    }, 100);
  }
}

// 即時実行関数でメニュー初期化を行う
(function() {
  // ページ読み込み状態に関わらず、メニュー初期化を実行
  if (document.readyState === 'complete' || document.readyState === 'interactive' || document.readyState === 'loading') {
    // すでにDOMが利用可能な場合は直接初期化
    setTimeout(function() {
      initMobileMenu();
      console.log('ハンバーガーメニューを初期化しました');
    }, 0);
  }
  
  // 念のためDOMContentLoadedイベントでも初期化
  window.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    console.log('DOMContentLoadedでメニューを初期化しました');
  });
})();
