// ==========================================
// JACK STANKEY MEDIA — script.js
// ==========================================

// --- Nav: solid background on scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// --- Mobile menu toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// --- Scroll reveal ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- Active nav link highlighting ---
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// --- Photo Carousel ---
(() => {
  const track = document.getElementById('track');
  const dotsContainer = document.getElementById('dots');
  const progressBar = document.getElementById('progressBar');
  const slides = track.querySelectorAll('.carousel-slide');
  const total = slides.length;
  let current = 0;
  const intervalTime = 4000;
  let timer, progressTimer, progressStart;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll('.dot');

  function goTo(index) {
    current = index;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    resetTimer();
  }
  function next() { goTo((current + 1) % total); }
  function animateProgress() {
    progressStart = performance.now();
    cancelAnimationFrame(progressTimer);
    function step(now) {
      const pct = Math.min(((now - progressStart) / intervalTime) * 100, 100);
      progressBar.style.width = pct + '%';
      if (pct < 100) progressTimer = requestAnimationFrame(step);
    }
    progressTimer = requestAnimationFrame(step);
  }
  function resetTimer() {
    clearInterval(timer);
    cancelAnimationFrame(progressTimer);
    progressBar.style.width = '0%';
    animateProgress();
    timer = setInterval(next, intervalTime);
  }

  const carousel = document.getElementById('carousel');
  carousel.addEventListener('mouseenter', () => { clearInterval(timer); cancelAnimationFrame(progressTimer); });
  carousel.addEventListener('mouseleave', () => resetTimer());

  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) diff < 0 ? goTo((current + 1) % total) : goTo((current - 1 + total) % total);
  }, { passive: true });

  resetTimer();
})();
