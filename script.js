'use strict';

// NAVIGATION
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Luk menu' : 'Åbn menu');
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = String(new Date().getFullYear());

// GALLERI – pile og touch-scroll
const gallery = document.getElementById('gallery-track');
document.querySelector('.gallery-arrow.prev').addEventListener('click', () => gallery.scrollBy({left: -gallery.clientWidth * .8, behavior: 'smooth'}));
document.querySelector('.gallery-arrow.next').addEventListener('click', () => gallery.scrollBy({left: gallery.clientWidth * .8, behavior: 'smooth'}));

// ANMELDELSER: Udfyld kun de anmeldelser, du faktisk har fået.
// 20 redigerbare pladser. Tomme poster vises aldrig.
// Eksempel på udfyldning:
// { text: 'Virkelig flot arbejde!', stars: 5, name: 'Anna', company: 'Firma ApS', logo: '/assets/firma-logo.png' }
const reviews = Array.from({length: 20}, () => ({
  text: '[Skriv anmeldelsen her]',
  stars: 5,
  name: '[Navn]',
  company: '[Virksomhed]',
  logo: ''
}));
// Indsæt ægte anmeldelser her, fx: reviews[0] = {text:'...', stars:5, name:'...', company:'...', logo:''};
// Tilføj kun et verificeret link til jeres faktiske Google-/Trustpilot-side.
const reviewPlatformUrl = '';

const validReviews = reviews.filter(review => {
  return review.text && !review.text.includes('[') && review.name && !review.name.includes('[')
    && Number.isInteger(review.stars) && review.stars >= 1 && review.stars <= 5;
});
const reviewSection = document.getElementById('anmeldelser');
const reviewTrack = document.getElementById('review-track');
const ratingLink = document.getElementById('rating-link');
if (validReviews.length) {
  reviewSection.hidden = false;
  const average = validReviews.reduce((sum, r) => sum + r.stars, 0) / validReviews.length;
  ratingLink.firstChild.textContent = `${average.toLocaleString('da-DK', {maximumFractionDigits:1})} ud af 5 `;
  if (reviewPlatformUrl) ratingLink.href = reviewPlatformUrl;
  else { ratingLink.removeAttribute('href'); ratingLink.removeAttribute('target'); }
}
function createReviewCard(review) {
  const card = document.createElement('article');
  card.className = 'review-card';
  const mark = document.createElement('div'); mark.className = 'quote-mark'; mark.textContent = '“';
  const description = document.createElement('p'); description.className = 'review-text'; description.textContent = review.text;
  const stars = document.createElement('div'); stars.className = 'stars'; stars.setAttribute('aria-label', `${review.stars} ud af 5 stjerner`);
  stars.textContent = '★'.repeat(review.stars) + '☆'.repeat(5-review.stars);
  const person = document.createElement('div'); person.className = 'review-person';
  const nameBox = document.createElement('div');
  const name = document.createElement('strong'); name.textContent = review.name;
  const company = document.createElement('small'); company.textContent = review.company || '';
  nameBox.append(name, company); person.append(nameBox);
  if (review.logo) {
    const logo = document.createElement('img'); logo.src = review.logo; logo.alt = `Logo for ${review.company || review.name}`; logo.loading = 'lazy'; person.append(logo);
  }
  card.append(mark, description, stars, person);
  return card;
}

// Sømløs løkke ved mindst to anmeldelser; pause ved hover, fokus og reduceret bevægelse.
if (validReviews.length) {
  const items = validReviews.length === 1 ? validReviews : [...validReviews, ...validReviews, ...validReviews];
  items.forEach(item => reviewTrack.append(createReviewCard(item)));
  const viewport = document.querySelector('.review-viewport');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let offset = 0, lastTime = 0, paused = false, frame = null;
  const gap = 12;
  function groupWidth() {
    const first = reviewTrack.querySelector('.review-card');
    return first ? (first.getBoundingClientRect().width + gap) * validReviews.length : 0;
  }
  function draw() { reviewTrack.style.transform = `translate3d(${-offset}px,0,0)`; }
  function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const delta = Math.min(timestamp - lastTime, 60);
    lastTime = timestamp;
    if (!paused && !motion.matches && validReviews.length > 1) {
      // Ét kort på ca. 4,5 sekunder.
      const card = reviewTrack.querySelector('.review-card');
      const pixelsPerSecond = (card.getBoundingClientRect().width + gap) / 4.5;
      offset += pixelsPerSecond * delta / 1000;
      const width = groupWidth();
      if (width > 0 && offset >= width) offset %= width;
      draw();
    }
    frame = requestAnimationFrame(animate);
  }
  if (validReviews.length > 1) frame = requestAnimationFrame(animate);
  viewport.addEventListener('mouseenter', () => {paused = true;});
  viewport.addEventListener('mouseleave', () => {paused = false; lastTime = 0;});
  viewport.addEventListener('focusin', () => {paused = true;});
  viewport.addEventListener('focusout', () => {paused = false; lastTime = 0;});
  function moveCard(direction) {
    const card = reviewTrack.querySelector('.review-card');
    if (!card || validReviews.length < 2) return;
    const step = card.getBoundingClientRect().width + gap;
    const width = groupWidth();
    offset = ((offset + direction * step) % width + width) % width;
    draw();
  }
  document.querySelector('.review-arrow.prev').addEventListener('click', () => moveCard(-1));
  document.querySelector('.review-arrow.next').addEventListener('click', () => moveCard(1));
  // Touch swipe uden at deaktivere almindelig lodret sidescroll.
  let touchX = null;
  viewport.addEventListener('touchstart', event => { touchX = event.touches[0].clientX; paused = true; }, {passive:true});
  viewport.addEventListener('touchend', event => {
    if (touchX !== null) {
      const difference = touchX - event.changedTouches[0].clientX;
      if (Math.abs(difference) > 35) moveCard(difference > 0 ? 1 : -1);
    }
    touchX = null; paused = false; lastTime = 0;
  }, {passive:true});
  window.addEventListener('resize', () => {offset = 0; draw();});
  document.addEventListener('visibilitychange', () => {lastTime = 0;});
}

// KONTAKTFORMULAR
// Åbner kundens mailprogram med en færdigudfyldt mail. Skift modtager her:
const contactEmail = 'mohidawanski@gmail.com';
const quoteForm = document.getElementById('quote-form');
const formStatus = document.getElementById('form-status');
quoteForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;
  const data = new FormData(quoteForm);
  const body = [
    `Navn: ${data.get('name')}`,
    `Telefon: ${data.get('phone') || '-'}`,
    `E-mail: ${data.get('email')}`,
    '',
    String(data.get('message')),
    '',
    '(Husk at vedhæfte logo eller filer til denne mail)'
  ].join('\n');
  const subject = `Tilbudsforespørgsel fra ${data.get('name')}`;
  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = 'Din mail er klar i dit mailprogram. Tryk send der – og vedhæft gerne logo eller filer.';
});
