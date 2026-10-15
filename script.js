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

// ANMELDELSER – plads til 20. Kun rigtige anmeldelser fra kunder, der har købt hos jer. Sektionen vises først, når der er mindst én.
// Felter: title (overskrift), text (teksten; kan udelades, hvis kunden kun gav en overskrift), stars (1–5), name, date, company (valgfri), logo (valgfri).
// Tilføj fx:
//   {title: 'Flot arbejde', text: 'Virkelig flot arbejde!', stars: 5, name: 'Anna Jensen', date: '12. marts 2026'},
// De 20 anmeldelser nedenfor er fra før virksomhedens navneskifte til SKILTON; virksomhedsnavnet er opdateret i teksterne,
// og det oplyses diskret under sektionen (#review-note). Fjern anmeldelser, kunderne ikke vil have vist.
const reviews = [
  {title: "Bedste skilt service i Danmark", text: "Bedste skilt service i Danmark. Kan slet ikke sammenlignes! Deres pris, design evne, tilgang under arbejde og tilpasning af skilt er præcis det man forstiller sig. Hvis man også ønsker design eller kvalitet uanset om det er LED skilt, plakat eller merchandise skal man 100% bestille det hos SKILTON!!!❤️🔥\n\nHelt klar kan anbefales🤩", stars: 5, name: "Erfani", date: "28. juli 2026"},
  {title: "Dygtig til sit arbejde", text: "God service og rigtig dygtig til sit arbejde, varm anbefaling herfra.", stars: 5, name: "Sebastian Orale", date: "22. juli 2026"},
  {title: "God service og flotte skilte!", stars: 5, name: "Martin Petersen", date: "22. juli 2026"},
  {title: "VARM ANBEFALING!", text: "Vi kan varmt anbefale SKILTON!\n\nVi har fået leveret nogle virkelig flotte skilte, og hele forløbet har været en fantastisk oplevelse. Kvaliteten er helt i top, servicen er professionel, og de har været imødekommende og hjælpsomme fra start til slut.\n\nResultatet lever fuldt ud op til vores forventninger skiltene ser flotte ud og giver et professionelt indtryk. Vi er meget glade for samarbejdet og vil uden tvivl benytte SKILTON igen.\n\nStor tak for det flotte arbejde!", stars: 5, name: "Omar G", date: "21. juli 2026"},
  {title: "Jeg har brugt dette skiltefirma i over…", text: "Jeg har brugt dette skiltefirma i over 5 år, og de har lavet alle mine skilte. Altid høj kvalitet, professionel rådgivning og leveret til tiden. De er pålidelige, løsningsorienterede og nemme at arbejde sammen med. Kan klart anbefales, hvis man vil have skilte, der både holder og ser skarpe ud.", stars: 5, name: "Gihad Ibrahim", date: "25. januar 2026"},
  {title: "Fremragende", text: "Særdeles tilfreds med mine skilte til Batobehandler butikken! Kan helt klart anbefale SKILTON, altid behjælpelig og klar til at yde en ekstra service!\n\n5 stjerner herfra ⭐️⭐️⭐️⭐️⭐️‼️", stars: 5, name: "Bato Behandler", date: "25. januar 2026"},
  {title: "Vi fik lavet logo på vores 8 pallers…", text: "Vi fik lavet logo på vores 8 pallers lift bil og kan klart anbefale dem hurtige dygtige og så god service fra dem nu står vi med vores første bil med logo takket være dette skønne firma 5 stjerner her fra ville give mere hvis det var muligt\n\nMvh. HR Transport ApS", stars: 5, name: "HR Transport ApS", date: "7. januar 2026"},
  {title: "Fantastisk service - Kan helt klart anbefale", text: "Jeg har haft en rigtig god oplevelse med SKILTON. Fra første kontakt var kommunikationen professionel, imødekommende og meget effektiv. De var virkelig gode til at rådgive mig omkring de forskellige designs, materialer og løsninger, så vores skilte blev helt perfekte.\n\nDet var virkelig en fordel at kunne få lavet alt fra samme sted. Jeg fik både facadeskiltet, visitkort, klistermærker og t-shirts med vores logo. Det hele var præcis som jeg ønskede det.\n\nJeg kan klart anbefale SKILTON, hvis man ønsker en samlet løsning med flot resultat og god service.", stars: 5, name: "Marie isabella", date: "6. januar 2026"},
  {title: "Fantastisk service og flotte resultater!", text: "Jeg har fået lavet skilte til min klinik og resultatet er simpelthen perfekt. Jeg er yderst tilfreds med både kvaliteten og hele processen. Kundeservicen var i top, kommunikationen var hurtig og behagelig og ejeren er utrolig flink og imødekommende.\n\nJeg kan varmt anbefale dette firma til alle, der ønsker professionelt arbejde og en god oplevelse hele vejen igennem!", stars: 5, name: "Chantal", date: "10. december 2025"},
  {title: "Kanon service", text: "Ja hvad skal sige synes det er den absolut bedste service og et firma som virkelig er kreativ og betænksom som kommer med løsninger og hjælper hele vejen igennem til det mindste detaljer 😊😊, kan stærkt anbefale dem", stars: 5, name: "Minan Latif", date: "30. marts 2025"},
  {title: "Kan klart anbefales !!", text: "Kan klart anbefales !!! 😍😍😍\n\nJeg har netop fået lavet skilte til mine to butikker, og jeg kunne ikke være mere tilfreds! Servicen var helt i top fra start til slut, og resultatet overgik mine forventninger. Skiltene er flotte, professionelle og præcist, som jeg ønskede det. Kan varmt anbefale SKILTON til alle, der har brug for kvalitetsarbejde og god kundeservice!", stars: 5, name: "sara", date: "25. december 2024"},
  {title: "God kvalitet til gode priser", text: "Vi har brugt SKILTON siden vores første skilt tilbage i 2021 og har brugt dem siden til flere skilte med belysning sant foliering af to food trucks og kommer til at bruge dem fremadrettet også.", stars: 5, name: "Zinat", date: "7. december 2024"},
  {title: "⭐️⭐️⭐️⭐️⭐️", text: "⭐️⭐️⭐️⭐️⭐️\n\nJeg havde en fantastisk oplevelse med SKILTON ! Fra start til slut var teamet ekstremt professionelle og imødekommende. De tog sig tid til at forstå mine behov og kom med kreative forslag, der virkelig bragte mine idéer til live.\n\nKvaliteten af de 3D skilte, de producerede, var intet mindre end imponerende. Detaljerne og finishen var perfekte, og de tiltrak straks opmærksomhed. Jeg har modtaget så mange positive kommentarer fra både kunder og kolleger!\n\nDerudover var processen hurtig og effektiv. Leveringstiden blev overholdt, og priserne var rimelige i forhold til den høje kvalitet, jeg fik. Jeg vil helt klart anbefale SKILTON til alle, der søger efter pålidelige og kreative løsninger til reklamer og skilte. Jeg glæder mig til at arbejde sammen med dem igen i fremtiden!\n\nTak for en fantastisk service! 🙌✨", stars: 5, name: "Said Ghizzaui", date: "7. december 2024"},
  {title: "Vi har fået leveret facade-skiltning…", text: "Vi har fået leveret facade-skiltning til to butikker fra SKILTON, og vi kunne ikke være mere tilfredse! Resultatet er virkelig imponerende – skiltene er udført i høj kvalitet, og de ser både stilrene og professionelle ud.\n\nDet hele blev leveret hurtigt, og servicen undervejs var helt i top. Kommunikationen var klar og effektiv, og det var tydeligt, at SKILTON går op i at levere et produkt, der lever op til kundens forventninger.", stars: 5, name: "Kasper Lundsted Jensen", date: "7. december 2024"},
  {title: "Super positiv overrasket over det lækre…", text: "Super positiv overrasket over det lækre design som SKILTON har skabt for mig! Jeg kan ikke andet end at give 5 ⭐️⭐️⭐️⭐️⭐️\n\nSuper service, du får hvad du betaler for. Kan helt klart anbefales!\n\nBatobehandler", stars: 5, name: "Filip Ristic", date: "26. februar 2024"},
  {title: "Vi fik lavet et super fint facade skilt…", text: "Vi fik lavet et super fint facade skilt , med hurtig levering og super kvalitet.", stars: 5, name: "Denis", date: "18. december 2023"},
  {title: "Glad og tilfreds kunde", text: "Jeg er super glad for mit skilt som SKILTON har lavet. Den kunne ikke blive bedre. Også har jeg fået en rigtig god service.", stars: 5, name: "Coco Beauty & Skin", date: "5. december 2023"},
  {title: "Kan virkelig anbefale!", stars: 5, name: "Miro", date: "6. oktober 2023"},
  {title: "🌟 stjernet kundeservice og formidable priser", text: "Jeg kan klart anbefale SKILTON til alt der har med skilte at gøre.\n\nVi hos Astro Energi ledte efter et indendørs logo til vores kontor samt et facadeskilt til vores showroom. Her faldt vi over SKILTON og fik allerede besøg af Mehdi samme dag som vi tog kontakt. Han kom med rådgivning om, hvor stort skiltene skulle være for at de var dimensioneret korrekt og leverede det efter aftalte tid. 5 🌟 herfra!", stars: 5, name: "Kristoffer Dahlberg", date: "7. september 2023"},
  {title: "Brugt dem til facade skilte og kan…", text: "Brugt dem til facade skilte og kan absolut anbefale dem. Virkelig professionelle og meget kompetente.", stars: 5, name: "Eda Meric", date: "28. marts 2023"}
];
// Link til jeres egen Google-/Trustpilot-side (valgfrit).
const reviewPlatformUrl = '';
const MAX_REVIEWS = 20;
// Forhåndsvisning af anmeldelsessektionen med pladsholdere ("[Skriv anmeldelsen her]"), som i designet.
// Sæt til false for at skjule sektionen, indtil der er rigtige anmeldelser i "reviews" ovenfor.
// Findes der rigtige anmeldelser, vises kun de rigtige.
const SHOW_REVIEW_PLACEHOLDERS = true;
// Gennemsnit/samlet score vises ikke ved rigtige anmeldelser (ingen score uden korrekt grundlag). Sæt til true og angiv reviewPlatformUrl for at vise den.
const SHOW_REVIEW_AVERAGE = false;

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
// Viser/skjuler et panel. Er animationer slået til, får panelet et kort lukke-forløb, før det skjules.
function setPanel(panel, open) {
  clearTimeout(panel._closeTimer);
  if (open) { panel.classList.remove('closing'); panel.hidden = false; return; }
  if (panel.hidden || !document.documentElement.classList.contains('anim')) { panel.hidden = true; return; }
  panel.classList.add('closing');
  panel._closeTimer = setTimeout(() => { panel.hidden = true; panel.classList.remove('closing'); }, 210);
}
function setMenu(open) {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Luk menu' : 'Åbn menu');
  setPanel(mobileNav, open);
  if (open) setSearch(false);
}
function setSearch(open) {
  if (!searchToggle || !searchPanel) return;
  searchToggle.setAttribute('aria-expanded', String(open));
  setPanel(searchPanel, open);
  if (open) { setMenu(false); $('#site-search').focus(); }
}
if (menuToggle) {
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', mobileNav).forEach(link => link.addEventListener('click', () => setMenu(false)));
}
if (searchToggle) {
  searchToggle.addEventListener('click', () => setSearch(searchToggle.getAttribute('aria-expanded') !== 'true'));
  // Søgeindeks: sider, produkter og services
  // [navn, adresse, type, søgeord]
  const searchIndex = [
    ['Forside', 'index.html', 'Side', ''], ['Produkter', 'produkter.html', 'Side', 'alle produkter'], ['Services', 'services.html', 'Side', ''],
    ['Galleri', 'galleri.html', 'Side', 'billeder eksempler'], ['Om os', 'om-os.html', 'Side', ''], ['Kontakt og tilbud', 'kontakt.html', 'Side', 'tilbud formular telefon mail'],
    ['Facadeskilte', 'facadeskilte.html', 'Produkt', 'skilt facade udendørs'], ['Indendørs skilte', 'indendoers-skilte.html', 'Produkt', 'reception indendørs'],
    ['Bildekoration', 'bildekoration.html', 'Produkt', 'folie bil bilreklame reklame'], ['Vinduesfolie', 'vinduesfolie.html', 'Produkt', 'folie vindue dekoration'],
    ['Storformatprint', 'storformatprint.html', 'Produkt', 'storformat print banner bannere plakat plakater'], ['Reklame og print', 'reklame-og-print.html', 'Produkt', 'reklameprint tryksager klistermærker flyer folder dekoration'], ['LED-lysskilte', 'lysskilte.html', 'Produkt', 'led lys lysskilte neon belyst'],
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
  if (item.open) faqItems.forEach(other => { if (other !== item && !other.dataset.closing) other.open = false; });
}));

/* ==========================================================================
   GALLERI (data hentes fra gallery-data.js)
   ========================================================================== */
const galleryItems = window.GALLERY_ITEMS || [];
const categoryFallback = {facade: 'facade', lys: 'lys', bil: 'bil', folie: 'folie', print: 'print', indoor: 'indoor'};
const galleryCategories = window.GALLERY_CATEGORIES || {};
const hasLightbox = $('#gallery-track') || $('#gallery-grid');
let lightbox = null;

// Størrelse i forsidens mosaik: small | tall | big | wide (valgfrit felt "shape", ellers udledt af "ratio")
function galleryShape(item) {
  if (['small', 'tall', 'big', 'wide'].includes(item.shape)) return item.shape;
  const [w, h] = String(item.ratio || '4 / 3').split('/').map(Number);
  const ratio = w && h ? w / h : 1.33;
  return ratio < 0.7 ? 'tall' : ratio > 1.7 ? 'wide' : 'small';
}

function createGalleryCard(item) {
  const figure = document.createElement('figure');
  figure.className = `gallery-card shape-${galleryShape(item)}`;
  figure.dataset.category = item.category;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'gallery-open';
  button.setAttribute('aria-label', `Forstør billede: ${item.title}`);
  const frame = document.createElement('span');
  frame.className = 'ph corners';
  frame.style.aspectRatio = item.ratio || '4 / 3'; // billedets eget format (bruges på gallerisiden)
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
  figure._item = item;
  button.addEventListener('click', () => openLightbox(item, figure));
  return figure;
}

let lightboxList = [];
let lightboxIndex = 0;
function openLightbox(item, card) {
  if (!lightbox) {
    lightbox = document.createElement('dialog');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('aria-label', 'Forstørret billede');
    const icon = name => `<svg class="ic" aria-hidden="true"><use href="assets/icons.svg#i-${name}"/></svg>`;
    lightbox.innerHTML = `<button type="button" class="lightbox-close" aria-label="Luk billede">${icon('close')}</button>`
      + `<button type="button" class="lightbox-nav prev" aria-label="Forrige billede">${icon('left')}</button>`
      + `<button type="button" class="lightbox-nav next" aria-label="Næste billede">${icon('right')}</button>`
      + '<figure><img alt=""><figcaption></figcaption><p class="lightbox-count" aria-live="polite"></p></figure>';
    document.body.append(lightbox);
    $('.lightbox-close', lightbox).addEventListener('click', () => lightbox.close());
    $('.lightbox-nav.prev', lightbox).addEventListener('click', () => showLightbox(lightboxIndex - 1, -1));
    $('.lightbox-nav.next', lightbox).addEventListener('click', () => showLightbox(lightboxIndex + 1, 1));
    lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
    lightbox.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); showLightbox(lightboxIndex - 1, -1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); showLightbox(lightboxIndex + 1, 1); }
    });
    let touchStartX = null;
    const figure = $('figure', lightbox);
    figure.addEventListener('touchstart', event => { touchStartX = event.touches[0].clientX; }, {passive: true});
    figure.addEventListener('touchend', event => {
      if (touchStartX === null) return;
      const difference = touchStartX - event.changedTouches[0].clientX;
      touchStartX = null;
      if (Math.abs(difference) > 45) showLightbox(lightboxIndex + (difference > 0 ? 1 : -1), difference > 0 ? 1 : -1);
    }, {passive: true});
  }
  // Billederne, der kan bladres imellem: de synlige kort i samme galleri (respekterer filteret)
  const holder = card && card.closest('#gallery-track, #gallery-page');
  lightboxList = holder ? $$('.gallery-card', holder).filter(c => !c.hidden && c._item).map(c => c._item) : [item];
  if (!lightboxList.includes(item)) lightboxList = [item];
  if (typeof lightbox.showModal === 'function' && !lightbox.open) lightbox.showModal();
  showLightbox(lightboxList.indexOf(item), 0);
}

function showLightbox(index, direction) {
  const count = lightboxList.length;
  lightboxIndex = (index + count) % count;
  const item = lightboxList[lightboxIndex];
  const img = $('img', lightbox);
  const illustration = `assets/img/${categoryFallback[item.category] || 'facade'}.svg`;
  const chain = [item.src.replace('w=800', 'w=1600'), illustration];
  img.onerror = () => { const next = chain.shift(); if (next) img.src = next; else img.onerror = null; };
  img.src = item.local || chain.shift(); img.alt = item.alt || item.title;
  $('figcaption', lightbox).textContent = item.example ? `${item.title} – ${item.type || ''} (eksempelbillede, ikke et udført projekt)` : `${item.title} – ${item.type || ''}`;
  $$('.lightbox-nav', lightbox).forEach(button => { button.hidden = count < 2; });
  $('.lightbox-count', lightbox).textContent = count > 1 ? `${lightboxIndex + 1} / ${count}` : '';
  const figure = $('figure', lightbox);
  figure.classList.remove('slide-next', 'slide-prev');
  if (direction && document.documentElement.classList.contains('anim')) {
    void figure.offsetWidth;
    figure.classList.add(direction > 0 ? 'slide-next' : 'slide-prev');
  }
}

// Karrusel på forsiden
const galleryTrack = $('#gallery-track');
if (galleryTrack) {
  galleryItems.forEach(item => galleryTrack.append(createGalleryCard(item)));
  // Kortene har forskellig bredde, så der rulles ca. 80 % af sporets bredde ad gangen
  const scrollBy = direction => galleryTrack.scrollBy({left: direction * galleryTrack.clientWidth * .8, behavior: 'smooth'});
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
  // Rigtige facadeskilte samles øverst i sektionen "Facadeskilte": det markerede billede (feature) står først og stort
  const featureMain = $('#feature-main'), featureRest = $('#feature-rest');
  const groupFacade = $('#group-facade'), groupMore = $('#group-more'), moreHead = $('#more-head');
  const facadeCards = featureMain && featureRest
    ? cards.filter((card, i) => galleryItems[i].category === 'facade' && !galleryItems[i].example) : [];
  const mainCard = facadeCards.find(card => card._item.feature) || facadeCards[0];
  cards.forEach(card => {
    if (card === mainCard) { card.classList.add('is-feature'); featureMain.append(card); }
    else if (facadeCards.includes(card)) featureRest.append(card);
    else galleryGrid.append(card);
  });
  const updateGroups = key => {
    [groupFacade, groupMore].forEach(group => { if (group) group.hidden = !$$('.gallery-card:not([hidden])', group).length; });
    if (moreHead) moreHead.hidden = key !== 'alle' || !facadeCards.length;
  };
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
    updateGroups(key);
  });
  updateGroups('alle');
}

/* ==========================================================================
   ANMELDELSER
   ========================================================================== */
const validReviews = reviews
  .filter(review => review
    && (String(review.text || '').trim() || String(review.title || '').trim()) && String(review.name || '').trim()
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
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('span');
    star.className = i < review.stars ? 'star' : 'star off';
    star.style.setProperty('--s', String(i));
    star.textContent = i < review.stars ? '★' : '☆';
    stars.append(star);
  }
  card.append(stars);
  if (review.title && String(review.title).trim()) {
    const title = document.createElement('h3'); title.className = 'review-title'; title.textContent = String(review.title).trim();
    card.append(title);
  }
  const text = document.createElement('p'); text.className = 'review-text'; text.textContent = String(review.text || '').trim();
  if (!text.textContent) text.hidden = true;
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
  // Rigtige anmeldelser: ingen samlet score, medmindre den udtrykkeligt er slået til
  ratingLink.hidden = !usingPlaceholders && !SHOW_REVIEW_AVERAGE;
  const reviewNote = $('#review-note');
  if (reviewNote) reviewNote.hidden = usingPlaceholders;

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

  const say = (text, kind = '') => { formStatus.className = ''; void formStatus.offsetWidth; formStatus.textContent = text; formStatus.className = kind; };
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
      submit.disabled = true; submit.classList.add('is-loading'); say('Sender forespørgsel …');
      try {
        data.set('Emne', topic || '-');
        const response = await fetch(formEndpoint, {method: 'POST', body: data, headers: {Accept: 'application/json'}});
        if (!response.ok) throw new Error('Afsendelse mislykkedes');
        say('Tak! Din forespørgsel er sendt. Vi vender tilbage hurtigst muligt.', 'ok');
        quoteForm.reset(); showFiles();
      } catch (error) {
        say('Der opstod en fejl. Prøv igen, eller skriv til os på e-mail.', 'err');
      } finally { submit.disabled = false; submit.classList.remove('is-loading'); }
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
