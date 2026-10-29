const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

/* ── NAV GLASS ON SCROLL ── */
(function () {
  const nav = document.querySelector('nav');
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── TYPEWRITER ── */
(function () {
  const h1 = document.querySelector('#hero h1');
  const fullText = h1.textContent.trim();
  h1.textContent = '';

  const cursor = document.createElement('span');
  cursor.className = 'tw-cursor';
  h1.appendChild(cursor);

  let idx = 0;
  function tick() {
    if (idx < fullText.length) {
      h1.insertBefore(document.createTextNode(fullText[idx]), cursor);
      idx++;
      setTimeout(tick, 72);
    } else {
      cursor.classList.add('tw-done');
    }
  }
  setTimeout(tick, 350);
})();

/* ── FADE IN ON SCROLL ── */
(function () {
  const fadeSections = document.querySelectorAll('section:not(#hero)');
  fadeSections.forEach(s => s.classList.add('fade-in-section'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  fadeSections.forEach(s => fadeObserver.observe(s));
})();
