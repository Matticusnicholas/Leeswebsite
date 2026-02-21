/* =============================================
   LEE'S AROMATHERAPY BEAUTY SALON — Main JS
   ============================================= */

(function () {
  'use strict';

  /* ----- DOM references ----- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const heroVideo = document.getElementById('hero-video');
  const yearEl = document.getElementById('current-year');

  /* ----- Current year in footer ----- */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ----- Mobile nav toggle ----- */
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----- Nav scroll shadow ----- */
  var lastScroll = 0;
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    if (scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  /* ----- Service card collapsible includes ----- */
  document.querySelectorAll('.service-card__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var list = btn.nextElementSibling;

      btn.setAttribute('aria-expanded', !expanded);
      if (list) {
        list.classList.toggle('open');
      }
    });
  });

  /* ----- Video play button helper ----- */
  function setupVideoPlayer(videoId, btnId) {
    var video = document.getElementById(videoId);
    var btn = document.getElementById(btnId);
    if (!video || !btn) return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(function () {
          btn.classList.add('hidden');
        }).catch(function () {
          // Browser blocked playback — keep button visible
        });
      } else {
        btn.classList.add('hidden');
      }
    });

    video.addEventListener('pause', function () {
      if (!video.ended) {
        btn.classList.remove('hidden');
      }
    });

    video.addEventListener('ended', function () {
      btn.classList.remove('hidden');
    });
  }

  setupVideoPlayer('showcase-video', 'showcase-play');
  setupVideoPlayer('equip-video', 'equip-play');
  setupVideoPlayer('promo-video', 'promo-play');

  /* ----- Hero video fallback ----- */
  if (heroVideo) {
    heroVideo.addEventListener('error', function () {
      heroVideo.style.display = 'none';
    });

    // If no source is set yet, hide the video element so fallback gradient shows
    if (!heroVideo.querySelector('source') && !heroVideo.src) {
      heroVideo.style.display = 'none';
    }
  }

  /* ----- Smooth scroll for anchor links (fallback for older browsers) ----- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ----- Scroll reveal animation ----- */
  var revealElements = document.querySelectorAll(
    '.service-category, .gallery__item, .why-us__card, .location__content, .contact__content'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }


})();
