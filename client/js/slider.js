/* =========================================================
   A S ENGINEERING WORK - SLIDER MODULE & HERO SHOWCASE
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initProductSwiper();
  initHeroRealProductsSwiper();
  initHeroTabToggle();
  initKeyProductsCoverflow();
});

/**
 * Initialize 3D Coverflow Perspective Key Products Slider
 */
function initKeyProductsCoverflow() {
  const coverflowElem = document.querySelector('.key-products-coverflow-swiper');
  if (!coverflowElem) return;

  new Swiper('.key-products-coverflow-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    slideToClickedSlide: true,
    initialSlide: 2,
    loop: true,
    loopedSlides: 2,
    speed: 600,
    coverflowEffect: {
      rotate: 15,
      stretch: 0,
      depth: 120,
      modifier: 1,
      slideShadows: false,
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.coverflow-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.coverflow-next',
      prevEl: '.coverflow-prev',
    },
  });
}

/**
 * Initialize Swiper.js Carousel for Products Showcase
 */
function initProductSwiper() {
  const swiperElem = document.querySelector('.products-swiper');
  if (!swiperElem) return;

  new Swiper('.products-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 30,
      }
    }
  });
}

/**
 * Initialize Client's Real SS Products Hero Swiper
 */
function initHeroRealProductsSwiper() {
  const heroSwiperElem = document.querySelector('.hero-real-products-swiper');
  if (!heroSwiperElem) return;

  new Swiper('.hero-real-products-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 800,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.hero-swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.hero-swiper-next',
      prevEl: '.hero-swiper-prev',
    }
  });
}

/**
 * Tab Toggle Switcher between Real Product Slideshow & 3D Factory Scene
 */
function initHeroTabToggle() {
  const tabBtns = document.querySelectorAll('.hero-tab-btn');
  const views = document.querySelectorAll('.hero-showcase-view');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));

      btn.classList.add('active');
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add('active');
      }
    });
  });
}
