/* ================================================
   LOPES MARKETING — main.js
   Cursor · Scroll · Nav · Parallax · Reveals
   ================================================ */

(function () {
  'use strict';

  // ─── CURSOR ───────────────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor states
    const hoverEls = document.querySelectorAll('a, button, .servico-item, .mvv-card, .contato-card');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '6px';
        cursor.style.height = '6px';
        follower.style.width = '56px';
        follower.style.height = '56px';
        follower.style.borderColor = 'rgba(122,14,37,0.6)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        follower.style.width = '36px';
        follower.style.height = '36px';
        follower.style.borderColor = 'rgba(255,255,255,0.5)';
      });
    });
  }

  // ─── NAV SCROLL ───────────────────────────────
  const nav = document.getElementById('nav');
  let lastScrollY = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── SMOOTH NAV LINKS ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── INTERSECTION OBSERVER — REVEALS ──────────
  const revealEls = document.querySelectorAll(
    '.mvv-card, .servico-item, .contato-card, .origem-quote, .origem-text, .timeline-item, .ceo-text, .ceo-graphic, .frase-inner'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // Stagger children of certain containers
  function staggerChildren(selector, delay = 80) {
    document.querySelectorAll(selector).forEach((parent, pi) => {
      parent.style.transitionDelay = (pi * delay) + 'ms';
    });
  }

  staggerChildren('.mvv-card', 100);
  staggerChildren('.servico-item', 60);
  staggerChildren('.timeline-item', 150);

  // ─── TIMELINE OBSERVER ────────────────────────
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => timelineObserver.observe(item));

  // ─── HERO PARALLAX ────────────────────────────
  const heroBgWord = document.querySelector('.hero-bg-word');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroBgWord && scrollY < window.innerHeight * 1.5) {
      heroBgWord.style.transform = `translateY(${scrollY * 0.18}px)`;
    }
  }, { passive: true });

  // ─── HERO TITLE MAGNETIC HOVER ────────────────
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.addEventListener('mousemove', e => {
      const rect = heroTitle.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      heroTitle.style.transform = `translate(${x * 6}px, ${y * 4}px)`;
    });
    heroTitle.addEventListener('mouseleave', () => {
      heroTitle.style.transform = '';
    });
  }

  // ─── COUNTER ANIMATION FOR YEAR ───────────────
  const yearEl = document.querySelector('.origem-year');
  if (yearEl) {
    const target = 2022;
    let started = false;

    const yearObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          let current = 2000;
          const step = () => {
            if (current < target) {
              current += 2;
              yearEl.textContent = current;
              requestAnimationFrame(step);
            } else {
              yearEl.textContent = target;
            }
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.5 });

    yearObserver.observe(yearEl);
  }

  // ─── SERVICO ITEMS — NUMBER ROLL ──────────────
  document.querySelectorAll('.servico-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
      const arrow = this.querySelector('.servico-arrow');
      if (!arrow._ani) {
        arrow._ani = true;
        arrow.style.transition = 'transform 0.35s cubic-bezier(0.76,0,0.24,1), color 0.35s';
        setTimeout(() => { arrow._ani = false; }, 400);
      }
    });
  });

  // ─── MARQUEE PAUSE ON HOVER ───────────────────
  const marquee = document.querySelector('.hero-marquee');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => {
      marquee.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
      marquee.style.animationPlayState = 'running';
    });
  }

  // ─── MVV CARD TILT ────────────────────────────
  document.querySelectorAll('.mvv-card:not(.featured)').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ─── CONTACT CARDS STAGGER ───────────────────
  const contactCards = document.querySelectorAll('.contato-card');
  contactCards.forEach((card, i) => {
    card.style.transitionDelay = (i * 80) + 'ms';
  });

  // ─── PAGE LOAD ────────────────────────────────
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  // ─── SCROLL PROGRESS INDICATOR ────────────────
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    width: 0%;
    background: linear-gradient(90deg, #7a0e25, #a01530);
    z-index: 9998;
    transition: width 0.1s;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    progressBar.style.width = progress + '%';
  }, { passive: true });

})();
