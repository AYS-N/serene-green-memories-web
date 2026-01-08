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
  
  // フローティングボタンのスクロール表示制御
  initFloatingButtons();
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
  
  // 希望日時のドロップダウンを初期化
  initPreferredDateSelect();
  
  // 住所自動入力機能を初期化
  initAutoFillAddress();
  
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

// 希望日時のドロップダウンを初期化（今日から1ヶ月先まで）
function initPreferredDateSelect() {
  const preferredDateSelect = document.getElementById('preferred_date');
  if (!preferredDateSelect) return;
  
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const today = new Date();
  
  // 1ヶ月分の日付を追加
  for (let i = 0; i < 31; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    
    const option = document.createElement('option');
    option.value = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    option.textContent = `${year}/${month}/${day}(${weekday})`;
    preferredDateSelect.appendChild(option);
  }
}

// 郵便番号から住所を自動入力する機能
function initAutoFillAddress() {
  const autoFillLink = document.getElementById('autoFillAddress');
  const postalCodeInput = document.getElementById('postalcode');
  const addressInput = document.getElementById('address');
  
  if (!autoFillLink || !postalCodeInput || !addressInput) return;
  
  autoFillLink.addEventListener('click', function(e) {
    e.preventDefault();
    
    // 郵便番号を取得（ハイフンを除去）
    const postalCode = postalCodeInput.value.replace(/-/g, '');
    
    if (postalCode.length !== 7) {
      alert('郵便番号は7桁で入力してください（例：000-0000）');
      return;
    }
    
    // 郵便番号検索API（zipcloud）を使用
    fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`)
      .then(response => response.json())
      .then(data => {
        if (data.results) {
          const result = data.results[0];
          const address = result.address1 + result.address2 + result.address3;
          addressInput.value = address;
        } else {
          alert('住所が見つかりませんでした。郵便番号を確認してください。');
        }
      })
      .catch(error => {
        console.error('住所検索エラー:', error);
        alert('住所の検索中にエラーが発生しました。');
      });
  });
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

// フローティングボタンのスクロール表示制御
function initFloatingButtons() {
  const floatingButtons = document.querySelector('.floating-buttons');
  if (!floatingButtons) return;
  
  const scrollThreshold = 200; // 200px以上スクロールで表示
  
  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      floatingButtons.classList.add('visible');
    } else {
      floatingButtons.classList.remove('visible');
    }
  }
  
  // 初期状態をチェック
  handleScroll();
  
  // スクロールイベントを監視
  window.addEventListener('scroll', handleScroll);
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
