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

// ---------- Billedpladser: vis pladsholder hvis billedet mangler ----------
$$('.ph img').forEach(img => {
  const mark = () => img.parentElement.classList.add('empty');
  if (img.complete && img.naturalWidth === 0) mark();
  img.addEventListener('error', mark);
});

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
  $$('.sub a', menu).forEach(link => link.addEventListener('click', () => closeSubMenus()));
});
document.addEventListener('click', () => closeSubMenus());
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  closeSubMenus();
  setMenu(false);
  setSearch(false);
});

// Aktivt menupunkt ved scroll
const navLinks = $$('.desktop-nav > a');
const sectionIds = ['top', 'galleri', 'om-os', 'kontakt'];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    });
  }, {rootMargin: '-45% 0px -50% 0px'});
  sectionIds.map(id => document.getElementById(id)).filter(Boolean).forEach(el => observer.observe(el));
}

// ---------- Søgning i produkter ----------
const searchToggle = $('.search-toggle');
const searchbar = $('#searchbar');
const searchInput = $('#site-search');
const searchEmpty = $('#search-empty');
const productCards = $$('.product-card');
function setSearch(open) {
  searchToggle.setAttribute('aria-expanded', String(open));
  searchbar.hidden = !open;
  if (open) searchInput.focus();
  else { searchInput.value = ''; filterProducts(''); }
}
function filterProducts(query) {
  const q = query.trim().toLowerCase();
  let shown = 0;
  productCards.forEach(card => {
    const match = !q || card.textContent.toLowerCase().includes(q) || (card.dataset.produkt || '').toLowerCase().includes(q);
    card.hidden = !match;
    if (match) shown++;
  });
  searchEmpty.hidden = !q || shown > 0;
}
searchToggle.addEventListener('click', () => setSearch(searchbar.hidden));
searchInput.addEventListener('input', () => {
  filterProducts(searchInput.value);
  if (searchInput.value.trim()) $('#produkter').scrollIntoView({behavior: 'smooth', block: 'start'});
});

// ---------- Galleri ----------
const gallery = $('#gallery-track');
$('.gallery-arrow.prev').addEventListener('click', () => gallery.scrollBy({left: -gallery.clientWidth * .8, behavior: 'smooth'}));
$('.gallery-arrow.next').addEventListener('click', () => gallery.scrollBy({left: gallery.clientWidth * .8, behavior: 'smooth'}));
gallery.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') gallery.scrollBy({left: gallery.clientWidth * .4, behavior: 'smooth'});
  if (event.key === 'ArrowLeft') gallery.scrollBy({left: -gallery.clientWidth * .4, behavior: 'smooth'});
});

// ---------- Anmeldelser ----------
const validReviews = reviews.filter(review => review.text && review.name
  && Number.isInteger(review.stars) && review.stars >= 1 && review.stars <= 5);
const reviewSection = $('#anmeldelser');
const reviewTrack = $('#review-track');
const ratingLink = $('#rating-link');

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

if (validReviews.length) {
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
  const gap = 12;
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
const formStatus = $('#form-status');
const productSelect = $('#product-select');

// Klik på et produkt vælger emnet i formularen
$$('[data-produkt]').forEach(el => el.addEventListener('click', () => {
  const wanted = el.dataset.produkt;
  const option = [...productSelect.options].find(o => o.value === wanted || o.textContent === wanted);
  if (option) productSelect.value = option.value;
}));

quoteForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;
  const data = new FormData(quoteForm);
  const body = [
    `Navn: ${data.get('name')}`,
    `Telefon: ${data.get('phone') || '-'}`,
    `E-mail: ${data.get('email')}`,
    `Emne: ${data.get('product') || '-'}`,
    '',
    String(data.get('message')),
    '',
    '(Husk at vedhæfte logo eller filer til denne mail)'
  ].join('\n');
  const subject = `Tilbudsforespørgsel fra ${data.get('name')}`;
  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = 'Din mail er klar i dit mailprogram. Tryk send der, og vedhæft gerne logo eller filer.';
});

// ---------- År i footer ----------
$('#year').textContent = String(new Date().getFullYear());
