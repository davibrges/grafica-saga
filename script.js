// Ativa comportamento de menu apenas quando JS está disponível
const body = document.body;
body.classList.add('js-ready');

// Menu mobile
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu ao clicar em um link
  nav.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Sombra do header ao rolar
const header = document.querySelector('.header');
const toggleHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 10);
};

toggleHeader();
window.addEventListener('scroll', toggleHeader, { passive: true });

// Revela seções com animação leve
const reveals = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}
