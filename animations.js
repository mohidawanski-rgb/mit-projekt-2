/* ==========================================================================
   SKILTON – animationer (indlæses efter script.js)
   Gør siden levende uden at ændre design, layout, farver eller indhold.
   - Slår sig selv fra ved "reducer bevægelse" og i browsere uden IntersectionObserver.
   - Mus-effekter (tilt, magnetiske knapper, lysfølger) kun med mus – aldrig på touchskærme.
   - Fejler noget her, fjernes animationerne, og siden vises som før.
   ========================================================================== */
(() => {
  'use strict';
  if (window.__skCleanup) window.__skCleanup();
  const undo = [];
  window.__skCleanup = () => { undo.splice(0).forEach(fn => { try { fn(); } catch (error) { /* ignorer */ } }); };
  const on = (target, type, handler, options) => {
    target.addEventListener(type, handler, options);
    undo.push(() => target.removeEventListener(type, handler, options));
  };
  const root = document.documentElement;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduce || !('IntersectionObserver' in window)) { root.classList.remove('anim'); return; }
  root.classList.add('anim');
  try { init(); } catch (error) {
    root.classList.remove('anim');
    $$('.a-el').forEach(el => el.classList.add('a-in'));
  }

  function init() {
    const startedAt = performance.now();
    setupReveal(startedAt);
    $$('.hero h1, .page-head h1').forEach(splitWords);
    heroShow();
    if (fine) { heroGlow(); tiltCards(); magneticButtons(); }
    rippleButtons();
    scrollEffects();
    panelsAndIcons();
    faqAccordion();
    formEffects();
    galleryFilterEffects();
  }

  /* ---------- Elementer, der kommer frem ved scroll ---------- */
  function setupReveal(startedAt) {
    // [vælger, variant]  (første match vinder; "none" markerer kun, at sektionen er kommet til syne)
    const groups = [
      ['.section-heading', 'mask'], ['.category-block > h2, .category-block > p', 'mask'],
      ['.why-intro > *', 'left'], ['.services-intro > *', 'left'],
      ['.benefit-grid > div', 'pop'], ['.product-grid > *', 'up'],
      ['.why-grid > article:nth-child(3n+1)', 'left'], ['.why-grid > article:nth-child(3n+2)', 'up'], ['.why-grid > article:nth-child(3n)', 'right'],
      ['.services-grid > *', 'up'], ['.gallery-wrap', 'zoom'], ['.gallery-grid > .gallery-card', 'zoom'],
      ['.gallery-note, .gallery-filters', 'up'], ['.review-carousel', 'zoom'],
      ['.contact-grid > div:first-child', 'left'], ['.contact-grid > div:last-child, .contact-card', 'right'],
      ['.faq-list details', 'up'], ['.steps > .step', 'up'], ['.checks > li', 'left'],
      ['.product-media', 'wipe'], ['.product-copy', 'right'], ['.about-text', 'up'],
      ['.cta-inner > *', 'up'], ['.legal > *', 'up'],
      ['.footer-grid > div', 'up'], ['.footer-bottom', 'up'],
      ['.steps, .why-section, .reviews-section, .gallery-section, .cta-band, .services-section, .products-section', 'none']
    ];
    const mark = (el, variant) => {
      if (el.classList.contains('a-el') || el.closest('.hero, .page-head')) return;
      el.classList.add('a-el');
      el.dataset.a = variant;
    };
    groups.forEach(([selector, variant]) => $$(selector).forEach(el => mark(el, variant)));
    $$('.reveal').forEach(el => mark(el, 'up'));

    const observer = new IntersectionObserver(entries => {
      const batch = entries.filter(entry => entry.isIntersecting).sort((a, b) =>
        a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      const boot = root.classList.contains('has-loader') && performance.now() - startedAt < 1400;
      batch.forEach((entry, index) => {
        const el = entry.target;
        el.style.setProperty('--bi', String(Math.min(index, 7)));
        if (boot) el.style.setProperty('--boost', '.85s');
        el.classList.add('a-in');
        observer.unobserve(el);
      });
    }, {rootMargin: '0px 0px -7% 0px', threshold: 0.06});
    $$('.a-el').forEach(el => observer.observe(el));
    undo.push(() => observer.disconnect());

    // Sikkerhedsnet: elementer, der er i billedet (eller sprunget over ved hurtig scroll), men ikke nåede observatørens grænse
    // (fx nederst på siden eller på korte sider), vises, når scrollingen har hvilet et øjeblik – og senest 1,2 sek. efter indlæsning.
    const sweep = () => $$('.a-el:not(.a-in)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.height && rect.top < window.innerHeight - 1) el.classList.add('a-in');   // i billedet eller allerede rullet forbi
    });
    let sweepTimer = 0;
    const scheduleSweep = (delay = 220) => { clearTimeout(sweepTimer); sweepTimer = setTimeout(sweep, delay); };
    undo.push(() => clearTimeout(sweepTimer));
    on(window, 'scroll', () => scheduleSweep(), {passive: true});
    on(window, 'resize', () => scheduleSweep(400));
    scheduleSweep(1200);
    on(window, 'beforeprint', () => $$('.a-el').forEach(el => el.classList.add('a-in')));
  }

  /* ---------- Overskrifter, der kommer frem ord for ord ---------- */
  function splitWords(el) {
    if (el.dataset.split) return;
    el.dataset.split = '1';
    let count = 0;
    const walk = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === 3) {
          const fragment = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { fragment.append(part); return; }
            const outer = document.createElement('span'); outer.className = 'w';
            const inner = document.createElement('span'); inner.className = 'wi';
            inner.style.setProperty('--w', String(count++));
            inner.textContent = part; outer.append(inner); fragment.append(outer);
          });
          child.replaceWith(fragment);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') walk(child);
      });
    };
    walk(el);
    el.classList.add('split');
    // Når sidste ord er kommet frem, må glød og skygger igen brede sig uden for ordets ramme
    const inners = $$('.wi', el);
    const done = () => el.classList.add('words-done');
    if (inners.length) inners[inners.length - 1].addEventListener('animationend', done, {once: true});
    const timer = setTimeout(done, 4000);
    undo.push(() => clearTimeout(timer));
  }

  /* ---------- Hero: billedskift mellem rigtige projekter + lys, der følger musen ---------- */
  function heroShow() {
    const hero = $('.hero');
    const media = hero && $('.hero-media');
    const first = media && $('img', media);
    if (!first) return;
    first.classList.add('hero-slide', 'is-active');
    // Kun rigtige projekter (ikke markeret som eksempel) indgår i billedskiftet
    const real = (window.GALLERY_ITEMS || []).filter(item => !item.example && item.src);
    const flagged = real.filter(item => item.hero);   // "hero: true" i gallery-data.js vælger billederne; ellers de første 4
    const projects = (flagged.length ? flagged : real).slice(0, 4);
    if (!projects.length) return;
    const slides = [{img: first, label: ''}];
    projects.forEach(item => {
      const img = document.createElement('img');
      img.className = 'hero-slide is-project';
      img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
      if (item.pos) img.style.objectPosition = item.pos;
      img.src = item.src;
      media.append(img);
      slides.push({img, label: [item.title, item.type].filter(Boolean).join(' · ')});
    });
    const meta = document.createElement('div');
    meta.className = 'hero-meta';
    const caption = document.createElement('p'); caption.className = 'hero-caption';
    const dots = document.createElement('div'); dots.className = 'hero-dots'; dots.setAttribute('role', 'group'); dots.setAttribute('aria-label', 'Vælg billede');
    const buttons = slides.map((slide, index) => {
      const button = document.createElement('button'); button.type = 'button';
      button.setAttribute('aria-label', `Vis billede ${index + 1} af ${slides.length}`);
      button.append(document.createElement('i')); dots.append(button);
      button.addEventListener('click', () => show(index));
      return button;
    });
    meta.append(caption, dots); hero.append(meta);

    let current = 0;
    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.img.classList.toggle('is-active', i === current));
      buttons.forEach((button, i) => {
        button.classList.remove('is-active', 'is-done');
        if (i < current) button.classList.add('is-done');
        if (i === current) { void button.offsetWidth; button.classList.add('is-active'); }
      });
      caption.textContent = slides[current].label;
    }
    buttons.forEach((button, index) => {
      const fill = $('i', button);
      fill.addEventListener('animationend', () => { if (index === current) show(current + 1); });
    });
    show(0);
    // Pause, når fanen er skjult, eller når hero ikke er i billedet
    let visible = true;
    const sync = () => hero.classList.toggle('is-paused', document.hidden || !visible);
    const heroObserver = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    heroObserver.observe(hero);
    undo.push(() => heroObserver.disconnect());
    on(document, 'visibilitychange', sync);
  }

  function heroGlow() {
    const hero = $('.hero');
    if (!hero) return;
    const glow = document.createElement('div'); glow.className = 'hero-glow'; glow.setAttribute('aria-hidden', 'true');
    $('.hero-overlay', hero).after(glow);
    const media = $('.hero-media', hero);
    let frame = 0;
    on(hero, 'pointermove', event => {
      if (event.pointerType !== 'mouse' || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width, y = (event.clientY - rect.top) / rect.height;
        hero.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        hero.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
        if (media) media.style.setProperty('--px', ((0.5 - x) * 16).toFixed(1) + 'px');
        hero.classList.add('is-hovered');
      });
    });
    on(hero, 'pointerleave', () => { hero.classList.remove('is-hovered'); if (media) media.style.setProperty('--px', '0px'); });
  }

  /* ---------- Scroll: fremdriftslinje, header-skygge og parallax ---------- */
  function scrollEffects() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress'; bar.setAttribute('aria-hidden', 'true');
    document.body.append(bar); undo.push(() => bar.remove());
    const header = $('.site-header');
    // [element, hastighed, tilstand]: "scroll" = følger sidens scroll (hero), "center" = forskydes inden i sit billedudsnit
    const layers = [];
    const add = (selector, speed, mode) => $$(selector).forEach(el => { if (!el.closest('.gallery-track')) layers.push({el, speed, mode, ref: mode === 'center' ? el.parentElement : el, visible: mode === 'scroll'}); });
    add('.hero-media', 0.2, 'scroll');
    add('.page-head-bg', 0.16, 'scroll');
    add('.service-card .ph img, .product-media .ph img', 1, 'center');
    layers.filter(layer => layer.mode === 'center').forEach(layer => layer.el.setAttribute('data-par', ''));
    const layerObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      const layer = layers.find(item => item.ref === entry.target);
      if (layer) layer.visible = entry.isIntersecting;
    }), {rootMargin: '80px'});
    layers.filter(layer => layer.mode === 'center').forEach(layer => layerObserver.observe(layer.ref));
    undo.push(() => layerObserver.disconnect());

    let queued = false;
    const frame = () => {
      queued = false;
      const y = window.scrollY, vh = window.innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      bar.style.transform = `scaleX(${Math.min(1, y / max).toFixed(4)})`;
      if (header) header.classList.toggle('is-scrolled', y > 8);
      const reads = layers.filter(layer => layer.visible).map(layer => {
        if (layer.mode === 'scroll') return {layer, value: Math.min(y * layer.speed, layer.el.classList.contains('hero-media') ? 56 : 58)};
        const rect = layer.ref.getBoundingClientRect();
        const t = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)));
        return {layer, value: -t * rect.height * 0.065};
      });
      reads.forEach(({layer, value}) => layer.el.style.setProperty('--py', value.toFixed(1) + 'px'));
    };
    const queue = () => { if (!queued) { queued = true; requestAnimationFrame(frame); } };
    on(window, 'scroll', queue, {passive: true});
    on(window, 'resize', queue);
    frame();
  }

  /* ---------- Menu: trappede links og ikonskift ---------- */
  function panelsAndIcons() {
    $$('.panel-links a, .mobile-cta a').forEach((link, index) => link.style.setProperty('--i', String(index)));
    $$('.sub').forEach(sub => $$('a', sub).forEach((link, index) => link.style.setProperty('--i', String(index))));
    const swap = (button, from, to) => {
      const use = $('use', button);
      if (!use) return;
      const apply = () => {
        const open = button.getAttribute('aria-expanded') === 'true';
        const href = use.getAttribute('href') || '';
        const next = open ? href.replace(from, to) : href.replace(to, from);
        if (next === href) return;
        use.setAttribute('href', next);
        button.classList.remove('swap'); void button.offsetWidth; button.classList.add('swap');
      };
      const observer = new MutationObserver(apply);
      observer.observe(button, {attributes: true, attributeFilter: ['aria-expanded']});
      undo.push(() => observer.disconnect());
    };
    const menu = $('.menu-toggle'), search = $('.search-toggle');
    if (menu) swap(menu, 'i-menu', 'i-close');
    if (search) swap(search, 'i-search', 'i-close');
  }

  /* ---------- Knapper: klik-bølge og magnetisk hover ---------- */
  function rippleButtons() {
    on(document, 'pointerdown', event => {
      const button = event.target.closest && event.target.closest('.btn');
      if (!button || event.button > 0) return;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      const wave = document.createElement('span');
      wave.className = 'ripple';
      wave.style.cssText = `width:${size}px;height:${size}px;left:${event.clientX - rect.left - size / 2}px;top:${event.clientY - rect.top - size / 2}px`;
      button.append(wave);
      setTimeout(() => wave.remove(), 750);
    }, {passive: true});
  }
  function magneticButtons() {
    $$('.hero .btn, .header-actions .btn, .cta-band .btn, .why-intro .btn, .services-intro .btn').forEach(button => {
      button.classList.add('mag');
      on(button, 'pointermove', event => {
        if (event.pointerType !== 'mouse') return;
        const rect = button.getBoundingClientRect();
        button.style.setProperty('--mx', ((event.clientX - rect.left - rect.width / 2) * 0.16).toFixed(1) + 'px');
        button.style.setProperty('--my', ((event.clientY - rect.top - rect.height / 2) * 0.22).toFixed(1) + 'px');
      });
      on(button, 'pointerleave', () => { button.style.removeProperty('--mx'); button.style.removeProperty('--my'); });
    });
  }

  /* ---------- 3D-tilt på produkt- og servicekort ---------- */
  function tiltCards() {
    $$('.product-card, .service-card').forEach(card => {
      card.classList.add('tilt');
      on(card, 'pointermove', event => {
        if (event.pointerType !== 'mouse') return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width, y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--ry', ((x - 0.5) * 9).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - y) * 9).toFixed(2) + 'deg');
        card.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      });
      on(card, 'pointerleave', () => { ['--rx', '--ry'].forEach(name => card.style.removeProperty(name)); });
    });
  }

  /* ---------- FAQ: blød åbning og lukning ---------- */
  function faqAccordion() {
    const items = $$('.faq-list details');
    const ease = 'cubic-bezier(.2,.75,.2,1)';
    const animate = (details, open) => {
      const body = $('p', details);
      if (!body) { details.open = open; return; }
      if (details._run) details._run.cancel();
      const style = getComputedStyle(body);
      const padding = style.paddingBottom;
      body.style.overflow = 'hidden';
      if (open) {
        details.open = true;
        const height = body.offsetHeight;
        details._run = body.animate([
          {height: '0px', opacity: 0, paddingBottom: '0px'},
          {height: height + 'px', opacity: 1, paddingBottom: padding}
        ], {duration: 380, easing: ease});
        details._run.onfinish = () => { body.style.overflow = ''; details._run = null; };
      } else {
        details.dataset.closing = '1';
        const height = body.offsetHeight;
        details._run = body.animate([
          {height: height + 'px', opacity: 1, paddingBottom: padding},
          {height: '0px', opacity: 0, paddingBottom: '0px'}
        ], {duration: 300, easing: ease});
        details._run.onfinish = () => { details.open = false; delete details.dataset.closing; body.style.overflow = ''; details._run = null; };
        details._run.oncancel = () => { delete details.dataset.closing; };
      }
    };
    items.forEach(details => {
      const summary = $('summary', details);
      on(summary, 'click', event => {
        event.preventDefault();
        const opening = !details.open || details.dataset.closing === '1';
        if (opening) items.forEach(other => { if (other !== details && other.open && other.dataset.closing !== '1') animate(other, false); });
        animate(details, opening);
      });
    });
  }

  /* ---------- Formular: ryst ved ugyldigt felt ---------- */
  function formEffects() {
    const form = $('#quote-form');
    if (!form) return;
    on(form, 'invalid', event => {
      const field = event.target;
      field.classList.remove('shake'); void field.offsetWidth; field.classList.add('shake');
      setTimeout(() => field.classList.remove('shake'), 520);
    }, true);
  }

  /* ---------- Galleri: kort glider ind igen ved filtrering ---------- */
  function galleryFilterEffects() {
    const filters = $('#gallery-filters');
    const grid = $('#gallery-grid');
    if (!filters || !grid) return;
    on(filters, 'click', event => {
      if (!event.target.closest('.filter-btn')) return;
      $$('.gallery-card:not([hidden])', grid).forEach((card, index) => {
        card.style.setProperty('--fi', String(Math.min(index, 10)));
        card.classList.remove('filter-in'); void card.offsetWidth; card.classList.add('filter-in');
      });
    });
  }
})();
