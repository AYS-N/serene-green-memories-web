
document.addEventListener('DOMContentLoaded', function() {
  // 現在の年を取得してコピーライトに設定
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll('#current-year');
  yearElements.forEach(function(element) {
    element.textContent = currentYear;
  });
  
  // モバイルメニューの開閉
  const navToggle = document.getElementById('nav-toggle');
  const navSp = document.getElementById('nav-sp');
  
  if (navToggle && navSp) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navSp.classList.toggle('active');
    });
    
    // メニュー内のリンクをクリックした時にメニューを閉じる
    const navLinks = navSp.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navSp.classList.remove('active');
      });
    });
  }
  
  // お客様の声スライダー
  const testimonialSlider = document.getElementById('testimonial-slider');
  if (testimonialSlider) {
    const testimonialItems = testimonialSlider.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    let currentIndex = 0;
    
    // 初期状態で最初のテスティモニアルを表示
    if (testimonialItems.length > 0) {
      testimonialItems[0].classList.add('active');
    }
    
    // 次のスライドを表示
    function showNextSlide() {
      testimonialItems[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % testimonialItems.length;
      testimonialItems[currentIndex].classList.add('active');
    }
    
    // 前のスライドを表示
    function showPrevSlide() {
      testimonialItems[currentIndex].classList.remove('active');
      currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
      testimonialItems[currentIndex].classList.add('active');
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
  
  // FAQのアコーディオン
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
  
  // 初期表示時、URLハッシュに該当するFAQカテゴリまでスクロール
  if (window.location.hash && document.querySelector(window.location.hash)) {
    setTimeout(function() {
      const element = document.querySelector(window.location.hash);
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: 'smooth'
      });
    }, 100);
  }
  
  // お問い合わせフォームの送信処理
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
});
