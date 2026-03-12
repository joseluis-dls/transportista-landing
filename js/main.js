/* ═══════════════════════════════════════════════════════════
   ORDUÑA TRANSPORTES — main.js
═══════════════════════════════════════════════════════════ */

// ── NAV: scroll effect + mobile toggle ──────────────────────
const nav       = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Cierra el menú al hacer click en un enlace (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


// ── REVEAL ON SCROLL ─────────────────────────────────────────
// Agrega la clase 'reveal' a los elementos que quieres animar.
// El observer los marca como 'visible' al entrar al viewport.
const revealEls = document.querySelectorAll(
  '.nosotros__grid, .servicio-card, .galeria__item, .contacto__grid, .nosotros__stats .stat'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger leve entre tarjetas del mismo contenedor
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Añade delays escalonados a grupos de elementos
function staggerGroup(selector, step = 100) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.dataset.delay = i * step;
  });
}
staggerGroup('.servicio-card', 80);
staggerGroup('.galeria__item', 60);
staggerGroup('.nosotros__stats .stat', 120);

revealEls.forEach(el => observer.observe(el));


// ── LIGHTBOX ─────────────────────────────────────────────────
// Funciona con <img> reales. Mientras uses placeholders,
// el lightbox se abre pero muestra un mensaje de "sin imagen".
const lightbox       = document.getElementById('lightbox');
const lightboxClose  = document.getElementById('lightboxClose');
const lightboxPrev   = document.getElementById('lightboxPrev');
const lightboxNext   = document.getElementById('lightboxNext');
const lightboxImgWrap = document.getElementById('lightboxImgWrap');

const galeriaItems = Array.from(document.querySelectorAll('.galeria__item'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const item = galeriaItems[index];
  const img  = item.querySelector('img');

  lightboxImgWrap.innerHTML = '';

  if (img) {
    const clone = img.cloneNode();
    clone.style.cssText = 'width:auto; height:auto; max-width:90vw; max-height:85vh; object-fit:contain;';
    lightboxImgWrap.appendChild(clone);
  } else {
    // Placeholder mientras no hay imagen real
    const msg = document.createElement('p');
    msg.textContent = item.dataset.label || 'Sin imagen';
    msg.style.cssText = 'color:#8a8278; font-family:var(--ff-display); font-size:1rem; letter-spacing:.1em;';
    lightboxImgWrap.appendChild(msg);
  }

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galeriaItems.length) % galeriaItems.length;
  openLightbox(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % galeriaItems.length;
  openLightbox(currentIndex);
}

galeriaItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Cierra con Escape, navega con flechas
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   showPrev();
  if (e.key === 'ArrowRight')  showNext();
});

// Cierra al hacer click fuera de la imagen
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});


// ── FORM (básico) ─────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Mensaje enviado';
    btn.disabled = true;
    btn.style.background = '#2a6a2a';
    btn.style.borderColor = '#2a6a2a';
    // Aquí conectarás tu backend / Formspree / EmailJS
  });
}