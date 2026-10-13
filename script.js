'use strict';

// ---------- Indstillinger ----------
// Tilbudsforespørgsler sendes til denne adresse (åbner kundens mailprogram).
const contactEmail = 'mohidawanski@gmail.com';

// Anmeldelser: indsæt kun rigtige. Sektionen vises først, når der er mindst én.
// Eksempel: { text: 'Virkelig flot arbejde!', stars: 5, name: 'Anna', company: 'Firma ApS', logo: 'assets/firma-logo.png' }
const reviews = [];
// Link til jeres egen Google-/Trustpilot-side (valgfrit).
const reviewPlatformUrl = '';

// ---------- Hjælpere ----------
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
document.documentElement.classList.add('js');

// ---------- Menu ----------
const menuToggle = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Luk menu' : 'Åbn menu');
  mobileNav.hidden = !open;
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
$$('a', mobileNav).forEach(link => link.addEventListener('click', () => setMenu(false)));

// Undermenuer (hover på computer, tryk på mobil/tastatur)
const subMenus = $$('.has-sub');
function closeSubMenus(except) {
  subMenus.forEach(menu => {
    if (menu === except) return;
    menu.classList.remove('open');
    $('.sub-toggle', menu).setAttribute('aria-expanded', 'false');
  });
}
subMenus.forEach(menu => {
  const toggle = $('.sub-toggle', menu);
  toggle.addEventListener('click', event => {
    event.stopPropagation();
    const open = !menu.classList.contains('open');
    closeSubMenus(menu);
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
});
document.addEventListener('click', () => closeSubMenus());
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  closeSubMenus();
  setMenu(false);
});

// ---------- Animation ved scroll ----------
const revealItems = $$('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, {rootMargin: '0px 0px -8% 0px', threshold: 0.05});
  revealItems.forEach(el => observer.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('in'));
}

// ---------- FAQ: kun ét spørgsmål åbent ad gangen ----------
const faqItems = $$('.faq-list details');
faqItems.forEach(item => item.addEventListener('toggle', () => {
  if (item.open) faqItems.forEach(other => { if (other !== item) other.open = false; });
}));

// ---------- Anmeldelser ----------
const validReviews = reviews.filter(review => review.text && review.name
  && Number.isInteger(review.stars) && review.stars >= 1 && review.stars <= 5);
const reviewSection = $('#anmeldelser');

function createReviewCard(review) {
  const card = document.createElement('article');
  card.className = 'review-card';
  const mark = document.createElement('div'); mark.className = 'quote-mark'; mark.textContent = '“';
  const text = document.createElement('p'); text.className = 'review-text'; text.textContent = review.text;
  const stars = document.createElement('div'); stars.className = 'stars';
  stars.setAttribute('aria-label', `${review.stars} ud af 5 stjerner`);
  stars.textContent = '★'.repeat(review.stars) + '☆'.repeat(5 - review.stars);
  const person = document.createElement('div'); person.className = 'review-person';
  const nameBox = document.createElement('div');
  const name = document.createElement('strong'); name.textContent = review.name;
  const company = document.createElement('small'); company.textContent = review.company || '';
  nameBox.append(name, company); person.append(nameBox);
  if (review.logo) {
    const logo = document.createElement('img');
    logo.src = review.logo; logo.alt = `Logo for ${review.company || review.name}`; logo.loading = 'lazy';
    person.append(logo);
  }
  card.append(mark, text, stars, person);
  return card;
}

if (reviewSection && validReviews.length) {
  const reviewTrack = $('#review-track');
  const ratingLink = $('#rating-link');
  reviewSection.hidden = false;
  const average = validReviews.reduce((sum, r) => sum + r.stars, 0) / validReviews.length;
  $('.avg', ratingLink).textContent = `${average.toLocaleString('da-DK', {maximumFractionDigits: 1})} ud af 5`;
  if (reviewPlatformUrl) ratingLink.href = reviewPlatformUrl;
  else { ratingLink.removeAttribute('href'); ratingLink.removeAttribute('target'); }

  const loop = validReviews.length > 1;
  const items = loop ? [...validReviews, ...validReviews, ...validReviews] : validReviews;
  items.forEach(item => reviewTrack.append(createReviewCard(item)));
  const viewport = $('.review-viewport');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let offset = 0, lastTime = 0, paused = false;
  const gap = 16;
  const cardStep = () => $('.review-card', reviewTrack).getBoundingClientRect().width + gap;
  const groupWidth = () => cardStep() * validReviews.length;
  const draw = () => { reviewTrack.style.transform = `translate3d(${-offset}px,0,0)`; };

  function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const delta = Math.min(timestamp - lastTime, 60);
    lastTime = timestamp;
    if (!paused && !motion.matches) {
      offset += cardStep() / 4.5 * delta / 1000; // ét kort på ca. 4,5 sekunder
      const width = groupWidth();
      if (width > 0 && offset >= width) offset %= width;
      draw();
    }
    requestAnimationFrame(animate);
  }
  function moveCard(direction) {
    if (!loop) return;
    const width = groupWidth();
    offset = (((offset + direction * cardStep()) % width) + width) % width;
    draw();
  }
  if (loop) requestAnimationFrame(animate);
  viewport.addEventListener('mouseenter', () => { paused = true; });
  viewport.addEventListener('mouseleave', () => { paused = false; lastTime = 0; });
  viewport.addEventListener('focusin', () => { paused = true; });
  viewport.addEventListener('focusout', () => { paused = false; lastTime = 0; });
  $('.review-arrow.prev').addEventListener('click', () => moveCard(-1));
  $('.review-arrow.next').addEventListener('click', () => moveCard(1));
  let touchX = null;
  viewport.addEventListener('touchstart', event => { touchX = event.touches[0].clientX; paused = true; }, {passive: true});
  viewport.addEventListener('touchend', event => {
    if (touchX !== null) {
      const difference = touchX - event.changedTouches[0].clientX;
      if (Math.abs(difference) > 35) moveCard(difference > 0 ? 1 : -1);
    }
    touchX = null; paused = false; lastTime = 0;
  }, {passive: true});
  window.addEventListener('resize', () => { offset = 0; draw(); });
  document.addEventListener('visibilitychange', () => { lastTime = 0; });
}

// ---------- Kontaktformular (åbner kundens mailprogram) ----------
const quoteForm = $('#quote-form');
if (quoteForm) {
  const formStatus = $('#form-status');
  const productSelect = $('#product-select');
  const wanted = new URLSearchParams(window.location.search).get('produkt');
  if (wanted && [...productSelect.options].some(o => o.value === wanted)) productSelect.value = wanted;

  quoteForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const data = new FormData(quoteForm);
    const subjectOption = productSelect.options[productSelect.selectedIndex];
    const body = [
      `Navn: ${data.get('name')}`,
      `Telefon: ${data.get('phone') || '-'}`,
      `E-mail: ${data.get('email')}`,
      `Emne: ${data.get('product') ? subjectOption.textContent : '-'}`,
      '',
      String(data.get('message')),
      '',
      '(Husk at vedhæfte logo eller filer til denne mail)'
    ].join('\n');
    const subject = `Tilbudsforespørgsel fra ${data.get('name')}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formStatus.textContent = 'Din mail er klar i dit mailprogram. Tryk send der, og vedhæft gerne logo eller filer.';
  });
}

// ---------- År i footer ----------
const year = $('#year');
if (year) year.textContent = String(new Date().getFullYear());
