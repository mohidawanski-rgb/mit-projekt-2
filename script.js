'use strict';

/* ==========================================================================
   INDSTILLINGER
   ========================================================================== */
// Hvor tilbudsforespørgsler sendes hen, når der ikke er en formularmodtager (se nedenfor).
const contactEmail = 'mohidawanski@gmail.com';

// RIGTIG AFSENDELSE (anbefalet): opret en gratis formular hos fx Formspree (formspree.io)
// og indsæt adressen her, fx 'https://formspree.io/f/xxxxxxxx'. Så sendes forespørgslen
// direkte – også med vedhæftede filer (hvis jeres abonnement understøtter det).
// Er feltet tomt, åbnes i stedet kundens mailprogram med en færdig mail til contactEmail.
const formEndpoint = '';

// ANMELDELSER – plads til 20. Skriv kun rigtige anmeldelser. Sektionen vises først, når der er mindst én.
// Tilføj fx:
//   {title: 'Flot arbejde', text: 'Virkelig flot arbejde!', stars: 5, name: 'Anna Jensen', company: 'Firma ApS', date: '12. marts 2026', logo: 'assets/firma-logo.png'},
// "title" (overskrift), "company", "date" og "logo" er valgfrie. "stars" er et heltal fra 1 til 5.
// Kun anmeldelser fra kunder, der har købt hos jer og har givet lov, må stå her.
const reviews = [
];
// Link til jeres egen Google-/Trustpilot-side (valgfrit).
const reviewPlatformUrl = '';
const MAX_REVIEWS = 20;
// Forhåndsvisning af anmeldelsessektionen med pladsholdere ("[Skriv anmeldelsen her]"), som i designet.
// Sæt til false for at skjule sektionen, indtil der er rigtige anmeldelser i "reviews" ovenfor.
// Findes der rigtige anmeldelser, vises kun de rigtige.
const SHOW_REVIEW_PLACEHOLDERS = true;

/* ==========================================================================
   HJÆLPERE
   ========================================================================== */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
document.documentElement.classList.add('js');

/* ---------- Menu og søgning (paneler under headeren) ---------- */
const menuToggle = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
const searchToggle = $('.search-toggle');
const searchPanel = $('#search-panel');
function setMenu(open) {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Luk menu' : 'Åbn menu');
  mobileNav.hidden = !open;
  if (open) setSearch(false);
}
function setSearch(open) {
  if (!searchToggle || !searchPanel) return;
  searchToggle.setAttribute('aria-expanded', String(open));
  searchPanel.hidden = !open;
  if (open) { setMenu(false); $('#site-search').focus(); }
}
if (menuToggle) {
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', mobileNav).forEach(link => link.addEventListener('click', () => setMenu(false)));
}
if (searchToggle) {
  searchToggle.addEventListener('click', () => setSearch(searchPanel.hidden));
  // Søgeindeks: sider, produkter og services
  // [navn, adresse, type, søgeord]
  const searchIndex = [
    ['Forside', 'index.html', 'Side', ''], ['Produkter', 'produkter.html', 'Side', 'alle produkter'], ['Services', 'services.html', 'Side', ''],
    ['Galleri', 'galleri.html', 'Side', 'billeder eksempler'], ['Om os', 'om-os.html', 'Side', ''], ['Kontakt og tilbud', 'kontakt.html', 'Side', 'tilbud formular telefon mail'],
    ['Facadeskilte', 'facadeskilte.html', 'Produkt', 'skilt facade udendørs'], ['Indendørs skilte', 'indendoers-skilte.html', 'Produkt', 'reception indendørs'],
    ['Bildekoration', 'bildekoration.html', 'Produkt', 'folie bil bilreklame reklame'], ['Vinduesfolie', 'vinduesfolie.html', 'Produkt', 'folie vindue dekoration'],
    ['Print & dekoration', 'print-og-dekoration.html', 'Produkt', 'storformat banner bannere plakat reklameprint'], ['Lysskilte og LED-skilte', 'lysskilte.html', 'Produkt', 'led lys neon'],
    ['3D-bogstaver', '3d-bogstaver.html', 'Produkt', 'bogstaver facade logo'], ['Pyloner og standere', 'pyloner-og-standere.html', 'Produkt', 'pylon stander'],
    ['Messer og events', 'messer-og-events.html', 'Produkt', 'messe stand event'], ['Specialløsninger', 'specialloesninger.html', 'Produkt', 'special skræddersyet'],
    ['Rådgivning', 'services.html#raadgivning', 'Service', 'hjælp'], ['Grafisk design', 'services.html#grafisk-design', 'Service', 'logo grafiker design'],
    ['Produktion', 'services.html#produktion', 'Service', ''], ['Montering', 'services.html#montering', 'Service', 'opsætning'],
    ['Spørgsmål og svar (FAQ)', 'kontakt.html#faq', 'Side', 'faq pris leveringstid'], ['Privatlivspolitik', 'privatlivspolitik.html', 'Side', ''],
    ['Handelsbetingelser', 'handelsbetingelser.html', 'Side', ''], ['Cookies', 'cookies.html', 'Side', '']
  ];
  const input = $('#site-search');
  const results = $('#search-results');
  const render = () => {
    const q = input.value.trim().toLowerCase();
    results.innerHTML = '';
    const hits = q ? searchIndex.filter(([name, , , words]) => `${name} ${words}`.toLowerCase().includes(q)) : [];
    hits.forEach(([name, href, kind]) => {
      const li = document.createElement('li');
      const a = document.createElement('a'); a.href = href; a.textContent = name;
      const span = document.createElement('span'); span.textContent = kind; a.append(span);
      li.append(a); results.append(li);
    });
    if (q && !hits.length) {
      const li = document.createElement('li');
      li.innerHTML = '<a href="kontakt.html">Ingen resultater – spørg os i stedet<span>Kontakt</span></a>';
      results.append(li);
    }
  };
  input.addEventListener('input', render);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') { const first = $('a', results); if (first) window.location.href = first.getAttribute('href'); }
  });
}

/* ---------- Undersmenuer (hover på computer, tryk på mobil/tastatur) ---------- */
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
  const activeInside = el => el && document.activeElement && el.contains(document.activeElement);
  const returnTo = activeInside(mobileNav) ? menuToggle : (activeInside(searchPanel) ? searchToggle : null);
  const openMenu = $('.has-sub.open');
  const subToggle = openMenu ? $('.sub-toggle', openMenu) : null;
  closeSubMenus();
  setMenu(false);
  setSearch(false);
  if (returnTo) returnTo.focus();
  else if (subToggle && activeInside(openMenu)) subToggle.focus();
});

/* ---------- Reserve-billeder: vis egen illustration, hvis et foto ikke kan hentes ---------- */
function applyImageFallbacks(root = document) {
  $$('img[data-fb]', root).forEach(img => {
    // data-fb kan indeholde flere reserve-adresser adskilt af | (prøves i rækkefølge)
    const chain = img.dataset.fb.split('|');
    const next = () => { const url = chain.shift(); if (url) img.src = url; };
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) next();
    img.addEventListener('error', () => { if (chain.length) next(); });
  });
}
applyImageFallbacks();

/* ---------- Animation ved scroll ---------- */
function setupReveal() {
  const items = $$('.reveal:not(.in)');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, {rootMargin: '0px 0px -6% 0px', threshold: 0.04});
    items.forEach(el => observer.observe(el));
  } else {
    items.forEach(el => el.classList.add('in'));
  }
}
setupReveal();

/* ---------- FAQ: kun ét spørgsmål åbent ad gangen ---------- */
const faqItems = $$('.faq-list details');
faqItems.forEach(item => item.addEventListener('toggle', () => {
  if (item.open) faqItems.forEach(other => { if (other !== item) other.open = false; });
}));

/* ==========================================================================
   GALLERI (data hentes fra gallery-data.js)
   ========================================================================== */
const galleryItems = window.GALLERY_ITEMS || [];
const categoryFallback = {facade: 'facade', lys: 'lys', bil: 'bil', folie: 'folie', print: 'print', indoor: 'indoor'};
const galleryCategories = window.GALLERY_CATEGORIES || {};
const hasLightbox = $('#gallery-track') || $('#gallery-grid');
let lightbox = null;

function createGalleryCard(item) {
  const figure = document.createElement('figure');
  figure.className = 'gallery-card';
  figure.dataset.category = item.category;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'gallery-open';
  button.setAttribute('aria-label', `Forstør billede: ${item.title}`);
  const frame = document.createElement('span');
  frame.className = 'ph corners';
  frame.style.aspectRatio = '4 / 3';
  const img = document.createElement('img');
  img.alt = item.alt || item.title; img.loading = 'lazy'; img.decoding = 'async';
  img.referrerPolicy = 'no-referrer';
  if (item.pos) img.style.objectPosition = item.pos;
  const illustration = `assets/img/${categoryFallback[item.category] || 'facade'}.svg`;
  if (item.local) { img.src = item.local; img.dataset.fb = `${item.src}|${illustration}`; }
  else { img.src = item.src; img.dataset.fb = illustration; }
  frame.append(img); button.append(frame);
  applyImageFallbacks(frame);
  const caption = document.createElement('figcaption');
  const title = document.createElement('strong'); title.textContent = item.title;
  const sub = document.createElement('small');
  const what = item.type || galleryCategories[item.category] || '';
  sub.textContent = item.example ? `${what} · eksempel` : what;
  caption.append(title, sub);
  figure.append(button, caption);
  button.addEventListener('click', () => openLightbox(item));
  return figure;
}

function openLightbox(item) {
  if (!lightbox) {
    lightbox = document.createElement('dialog');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('aria-label', 'Forstørret billede');
    lightbox.innerHTML = '<button type="button" class="lightbox-close" aria-label="Luk billede"><svg class="ic" aria-hidden="true"><use href="assets/icons.svg#i-close"/></svg></button><figure><img alt=""><figcaption></figcaption></figure>';
    document.body.append(lightbox);
    $('.lightbox-close', lightbox).addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  }
  const img = $('img', lightbox);
  const illustration = `assets/img/${categoryFallback[item.category] || 'facade'}.svg`;
  const chain = [item.src.replace('w=800', 'w=1600'), illustration];
  img.onerror = () => { const next = chain.shift(); if (next) img.src = next; else img.onerror = null; };
  img.src = item.local || chain.shift(); img.alt = item.alt || item.title;
  $('figcaption', lightbox).textContent = item.example ? `${item.title} – ${item.type || ''} (eksempelbillede, ikke et udført projekt)` : `${item.title} – ${item.type || ''}`;
  if (typeof lightbox.showModal === 'function') lightbox.showModal();
}

// Karrusel på forsiden
const galleryTrack = $('#gallery-track');
if (galleryTrack) {
  galleryItems.forEach(item => galleryTrack.append(createGalleryCard(item)));
  const scrollBy = direction => {
    const card = $('.gallery-card', galleryTrack);
    const step = card ? card.getBoundingClientRect().width + 14 : galleryTrack.clientWidth * .8;
    galleryTrack.scrollBy({left: direction * step * 2, behavior: 'smooth'});
  };
  $('.gallery-arrow.prev').addEventListener('click', () => scrollBy(-1));
  $('.gallery-arrow.next').addEventListener('click', () => scrollBy(1));
  galleryTrack.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') scrollBy(.5);
    if (event.key === 'ArrowLeft') scrollBy(-.5);
  });
}

// Galleriside med kategorifiltre
const galleryGrid = $('#gallery-grid');
if (galleryGrid) {
  const filters = $('#gallery-filters');
  const cards = galleryItems.map(createGalleryCard);
  cards.forEach(card => galleryGrid.append(card));
  const used = [...new Set(galleryItems.map(i => i.category))];
  const makeButton = (key, label) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'filter-btn'; b.dataset.filter = key; b.textContent = label;
    b.setAttribute('aria-pressed', key === 'alle' ? 'true' : 'false');
    filters.append(b);
  };
  makeButton('alle', 'Alle');
  used.forEach(key => makeButton(key, galleryCategories[key] || key));
  filters.addEventListener('click', event => {
    const button = event.target.closest('.filter-btn');
    if (!button) return;
    $$('.filter-btn', filters).forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const key = button.dataset.filter;
    cards.forEach(card => { card.hidden = key !== 'alle' && card.dataset.category !== key; });
  });
}

/* ==========================================================================
   ANMELDELSER
   ========================================================================== */
const validReviews = reviews
  .filter(review => review
    && String(review.text || '').trim() && String(review.name || '').trim()
    && Number.isInteger(review.stars) && review.stars >= 1 && review.stars <= 5)
  .slice(0, MAX_REVIEWS);
const usingPlaceholders = !validReviews.length && SHOW_REVIEW_PLACEHOLDERS;
const PLACEHOLDER_REVIEWS = Array.from({length: 8}, () => ({title: '[Overskrift]', text: '[Skriv anmeldelsen her]', stars: 5, name: 'Navn', company: 'Virksomhed', date: '[Dato]', placeholder: true}));
const shownReviews = usingPlaceholders ? PLACEHOLDER_REVIEWS : validReviews;
const reviewSection = $('#anmeldelser');

function createReviewCard(review, hidden) {
  const card = document.createElement('article');
  card.className = 'review-card';
  if (hidden) card.setAttribute('aria-hidden', 'true');
  const stars = document.createElement('div'); stars.className = 'stars';
  stars.setAttribute('role', 'img');
  stars.setAttribute('aria-label', `${review.stars} ud af 5 stjerner`);
  stars.textContent = '★'.repeat(review.stars) + '☆'.repeat(5 - review.stars);
  card.append(stars);
  if (review.title && String(review.title).trim()) {
    const title = document.createElement('h3'); title.className = 'review-title'; title.textContent = String(review.title).trim();
    card.append(title);
  }
  const text = document.createElement('p'); text.className = 'review-text'; text.textContent = String(review.text).trim();
  const more = document.createElement('button');
  more.type = 'button'; more.className = 'read-more'; more.textContent = 'Læs mere'; more.hidden = true;
  more.setAttribute('aria-expanded', 'false');
  if (hidden) more.tabIndex = -1;
  more.addEventListener('click', () => {
    const open = card.classList.toggle('open');
    more.textContent = open ? 'Vis mindre' : 'Læs mere';
    more.setAttribute('aria-expanded', String(open));
  });
  card.append(text, more);
  const person = document.createElement('div'); person.className = 'review-person';
  const nameBox = document.createElement('div');
  const name = document.createElement('strong'); name.textContent = String(review.name).trim();
  nameBox.append(name);
  const sub = [String(review.company || '').trim(), String(review.date || '').trim()].filter(Boolean).join(' · ');
  if (sub) { const small = document.createElement('small'); small.textContent = sub; nameBox.append(small); }
  person.append(nameBox);
  if (review.placeholder) {
    const ph = document.createElement('div'); ph.className = 'logo-ph'; ph.textContent = 'LOGO'; ph.setAttribute('aria-hidden', 'true');
    person.append(ph);
  } else if (review.logo) {
    const logo = document.createElement('img');
    logo.src = review.logo; logo.alt = `Logo for ${review.company || review.name}`; logo.loading = 'lazy';
    person.append(logo);
  }
  card.append(person);
  return card;
}

// Viser "Læs mere" kun på kort, hvor teksten er klippet
function updateReadMore(root) {
  root.querySelectorAll('.review-card').forEach(card => {
    const text = card.querySelector('.review-text');
    const more = card.querySelector('.read-more');
    if (!text || !more) return;
    const open = card.classList.contains('open');
    if (open) { more.hidden = false; return; }
    more.hidden = !(text.scrollHeight > text.clientHeight + 2);
  });
}

if (reviewSection && shownReviews.length) {
  const carousel = $('.review-carousel');
  const reviewTrack = $('#review-track');
  const ratingLink = $('#rating-link');
  const viewport = $('.review-viewport');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const gap = 12;
  let offset = 0, lastTime = 0, paused = false, looping = false, lastWidth = 0, frameId = 0;

  reviewSection.hidden = false;
  const average = shownReviews.reduce((sum, r) => sum + r.stars, 0) / shownReviews.length;
  const rounded = Math.round(average);
  $('.avg', ratingLink).textContent = usingPlaceholders ? 'Gennemsnit: [X,X] ud af 5' : `Gennemsnit: ${average.toLocaleString('da-DK', {maximumFractionDigits: 1})} ud af 5`;
  const starsLine = $('.stars-line', ratingLink);
  starsLine.textContent = '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
  if (reviewPlatformUrl && !usingPlaceholders) ratingLink.href = reviewPlatformUrl;
  else { ratingLink.removeAttribute('href'); ratingLink.removeAttribute('target'); }

  const cardStep = () => $('.review-card', reviewTrack).getBoundingClientRect().width + gap;
  const groupWidth = () => cardStep() * shownReviews.length;
  const draw = () => { reviewTrack.style.transform = `translate3d(${-offset}px,0,0)`; };

  // Opbyg karrusellen. Er der færre anmeldelser, end der kan vises ad gangen, vises de statisk (ingen gentagelser, ingen pile).
  function build() {
    reviewTrack.innerHTML = '';
    shownReviews.forEach(r => reviewTrack.append(createReviewCard(r, false)));
    const step = cardStep();
    const visible = Math.max(1, Math.floor((viewport.clientWidth + gap) / step));
    looping = shownReviews.length > visible;
    carousel.classList.toggle('static', !looping);
    if (looping) {
      for (let copy = 0; copy < 2; copy++) shownReviews.forEach(r => reviewTrack.append(createReviewCard(r, true)));
    }
    offset = looping ? offset % groupWidth() : 0;
    draw();
    updateReadMore(reviewTrack);
  }
  function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const delta = Math.min(timestamp - lastTime, 60);
    lastTime = timestamp;
    if (looping && !paused && !motion.matches && !reviewTrack.querySelector('.review-card.open')) {
      offset += cardStep() / 4.5 * delta / 1000; // ét kort på ca. 4,5 sekunder
      const width = groupWidth();
      if (width > 0 && offset >= width) offset %= width;
      draw();
    }
    frameId = requestAnimationFrame(animate);
  }
  function moveCard(direction) {
    if (!looping) return;
    const width = groupWidth();
    reviewTrack.classList.add('smooth');
    offset += direction * cardStep();
    if (offset < 0) { reviewTrack.classList.remove('smooth'); offset += width; draw(); reviewTrack.getBoundingClientRect(); reviewTrack.classList.add('smooth'); offset -= cardStep(); }
    else if (offset >= width) { reviewTrack.classList.remove('smooth'); offset -= width; draw(); reviewTrack.getBoundingClientRect(); reviewTrack.classList.add('smooth'); offset += cardStep(); }
    draw();
    setTimeout(() => reviewTrack.classList.remove('smooth'), 450);
  }
  build();
  lastWidth = window.innerWidth;
  frameId = requestAnimationFrame(animate);
  viewport.addEventListener('mouseenter', () => { paused = true; });
  viewport.addEventListener('mouseleave', () => { paused = false; lastTime = 0; });
  viewport.addEventListener('focusin', () => { paused = true; });
  viewport.addEventListener('focusout', () => { paused = false; lastTime = 0; });
  $('.review-arrow.prev').addEventListener('click', () => moveCard(-1));
  $('.review-arrow.next').addEventListener('click', () => moveCard(1));
  carousel.addEventListener('mouseenter', () => { paused = true; });
  carousel.addEventListener('mouseleave', () => { paused = false; lastTime = 0; });
  carousel.addEventListener('focusin', () => { paused = true; });
  carousel.addEventListener('focusout', () => { paused = false; lastTime = 0; });
  let touchX = null;
  viewport.addEventListener('touchstart', event => { touchX = event.touches[0].clientX; paused = true; }, {passive: true});
  viewport.addEventListener('touchend', event => {
    if (touchX !== null) {
      const difference = touchX - event.changedTouches[0].clientX;
      if (Math.abs(difference) > 35) moveCard(difference > 0 ? 1 : -1);
    }
    touchX = null; paused = false; lastTime = 0;
  }, {passive: true});
  // Genopbyg kun, når bredden faktisk ændres (mobilbrowsere udløser resize ved scroll)
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth; build();
  });
  document.addEventListener('visibilitychange', () => { lastTime = 0; });
}

/* ==========================================================================
   KONTAKTFORMULAR
   ========================================================================== */
const quoteForm = $('#quote-form');
if (quoteForm) {
  const formStatus = $('#form-status');
  const productSelect = $('#product-select');
  const fileInput = $('#file-input');
  const fileList = $('#file-list');
  const dropZone = $('.upload-field', quoteForm);
  const MAX_TOTAL_MB = 10;

  // Emnet kan forudvælges fra et produktkort: kontakt.html?produkt=facadeskilte
  const wanted = new URLSearchParams(window.location.search).get('produkt');
  if (wanted && productSelect && [...productSelect.options].some(o => o.value === wanted)) productSelect.value = wanted;

  const say = (text, kind = '') => { formStatus.textContent = text; formStatus.className = kind; };
  const fileIcon = '<svg class="ic" aria-hidden="true"><use href="assets/icons.svg#i-check"/></svg>';
  function showFiles() {
    fileList.innerHTML = '';
    [...fileInput.files].forEach((file, index) => {
      const li = document.createElement('li');
      li.innerHTML = fileIcon;
      const mb = file.size / 1024 / 1024;
      const size = mb >= 0.1 ? `${mb.toLocaleString('da-DK', {maximumFractionDigits: 1})} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`;
      li.append(`${file.name} (${size}) `);
      const remove = document.createElement('button');
      remove.type = 'button'; remove.textContent = 'Fjern'; remove.className = 'file-remove';
      remove.setAttribute('aria-label', `Fjern ${file.name}`);
      remove.addEventListener('click', () => {
        const transfer = new DataTransfer();
        [...fileInput.files].forEach((f, i) => { if (i !== index) transfer.items.add(f); });
        fileInput.files = transfer.files; showFiles();
      });
      li.append(remove); fileList.append(li);
    });
  }
  fileInput.addEventListener('change', showFiles);
  ['dragenter', 'dragover'].forEach(type => dropZone.addEventListener(type, event => { event.preventDefault(); dropZone.classList.add('drag'); }));
  ['dragleave', 'drop'].forEach(type => dropZone.addEventListener(type, event => { event.preventDefault(); dropZone.classList.remove('drag'); }));
  dropZone.addEventListener('drop', event => {
    if (event.dataTransfer && event.dataTransfer.files.length && typeof DataTransfer === 'function') {
      const transfer = new DataTransfer();
      [...fileInput.files, ...event.dataTransfer.files].forEach(f => transfer.items.add(f));
      fileInput.files = transfer.files;
      showFiles();
    }
  });

  quoteForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const data = new FormData(quoteForm);
    if (data.get('_gotcha')) return; // spam-felt (skjult) er udfyldt
    const files = [...fileInput.files];
    const totalMb = files.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024;
    if (totalMb > MAX_TOTAL_MB) { say(`Filerne er for store (${totalMb.toLocaleString('da-DK', {maximumFractionDigits: 1})} MB). Maks. ${MAX_TOTAL_MB} MB i alt.`, 'err'); return; }
    const subjectOption = productSelect ? productSelect.options[productSelect.selectedIndex] : null;
    const topic = data.get('product') && subjectOption ? subjectOption.textContent : '';

    if (formEndpoint) {
      const submit = $('[type=submit]', quoteForm);
      submit.disabled = true; say('Sender forespørgsel …');
      try {
        data.set('Emne', topic || '-');
        const response = await fetch(formEndpoint, {method: 'POST', body: data, headers: {Accept: 'application/json'}});
        if (!response.ok) throw new Error('Afsendelse mislykkedes');
        say('Tak! Din forespørgsel er sendt. Vi vender tilbage hurtigst muligt.', 'ok');
        quoteForm.reset(); showFiles();
      } catch (error) {
        say('Der opstod en fejl. Prøv igen, eller skriv til os på e-mail.', 'err');
      } finally { submit.disabled = false; }
      return;
    }

    // Uden formularmodtager: åbn kundens mailprogram med en færdig mail.
    const lines = [
      `Navn: ${data.get('name')}`,
      `Telefon: ${data.get('phone') || '-'}`,
      `E-mail: ${data.get('email')}`,
      `Emne: ${topic || '-'}`,
      '', String(data.get('message')), ''
    ];
    if (files.length) lines.push(`Filer jeg vedhæfter manuelt: ${files.map(f => f.name).join(', ')}`);
    else lines.push('(Husk at vedhæfte logo eller billeder, hvis du har dem.)');
    const subject = `Tilbudsforespørgsel fra ${data.get('name')}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    say(files.length
      ? 'Din mail er klar i dit mailprogram. Vedhæft de valgte filer dér, og tryk send.'
      : 'Din mail er klar i dit mailprogram. Tryk send der, og vedhæft gerne logo eller billeder.', 'ok');
  });
}

/* ---------- År i footer ---------- */
const year = $('#year');
if (year) year.textContent = String(new Date().getFullYear());
