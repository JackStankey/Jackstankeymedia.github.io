// ==========================================
// JACK STANKEY MEDIA â script.js
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

// --- Scroll reveal (trigger earlier so content is visible sooner) ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- Active nav link highlighting (scroll-based, not intersection) ---
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY + window.innerHeight * 0.35;
  let currentId = '';

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      currentId = section.getAttribute('id');
    }
  });

  // If we're near the top, default to home
  if (window.scrollY < 100) currentId = 'home';

  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
