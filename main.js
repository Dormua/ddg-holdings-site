(function () {
  'use strict';

  // Nav background toggle after 40px of scroll
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Carousel prev/next controls (native scroll-snap handles drag/swipe)
  var carousel = document.getElementById('carousel');
  if (carousel) {
    var carouselReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('.carousel__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = Number(btn.getAttribute('data-dir'));
        var slide = carousel.querySelector('.carousel__slide');
        var gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
        var step = slide ? slide.getBoundingClientRect().width + gap : carousel.clientWidth;
        carousel.scrollBy({
          left: dir * step,
          behavior: carouselReduceMotion ? 'auto' : 'smooth',
        });
      });
    });
  }

  // Section reveal-on-scroll (fade + rise), once each, skipped if reduced motion
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = document.querySelectorAll('.reveal-on-scroll, .teaser__visual');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) {
      el.classList.add('in-view');
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
