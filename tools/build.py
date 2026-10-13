#!/usr/bin/env python3
"""Genererer alle HTML-sider til Skiltefabrikken.
Kør:  python3 tools/build.py   (output skrives i projektets rod)
Hosting kræver IKKE dette script – det er kun til at redigere indhold ét sted."""
import os, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHONE_TEL, PHONE_TXT = 'tel:+4544119491', '+45 44 11 94 91'
MAIL = 'info@skiltefabrikken.dk'

def U(photo, w=800):
    return f'https://images.unsplash.com/photo-{photo}?auto=format&fit=crop&w={w}&q=85'
IMG = {  # kun billederne fra brugerens egne filer
 'facade': '1486406146926-c627a92ad1ab', 'indoor': '1497366754035-f200968a6e72',
 'bil': '1544620347-c4fd4a3d5957', 'glas': '1497366811353-6870744d04b2',
 'print': '1542038784456-1ea8e935640e', 'lys': '1519608487953-e999c86e7455',
 'cafe': '1554118811-1e0d58224f24', 'tandlaege': '1629909613654-28e377c37b09',
 'firmabil': '1566939886041-4e3bf98e1d35', 'bageri': '1509440159596-0249088772ff',
 'raad': '1503387762-592deb58ef4e', 'design': '1455390582262-044cdead277a',
 'montering': '1504307651254-35680f356dfd'}

def ic(n, c='ic'):
    return f'<svg class="{c}" aria-hidden="true"><use href="assets/icons.svg#i-{n}"/></svg>'

def pic(key, alt, cls='', w=800, ratio='4/3', lazy=True):
    l = ' loading="lazy"' if lazy else ''
    return (f'<span class="ph {cls}" style="aspect-ratio:{ratio}"><img src="{U(IMG[key], w)}" alt="{alt}"'
            f'{l} decoding="async" referrerpolicy="no-referrer"></span>')

# ---------- Indhold ----------
PRODUCTS = {  # id: (titel, billede, tekst, punkter)
 'facadeskilte': ('Facadeskilte', 'facade', 'Et facadeskilt er din virksomheds ansigt udadtil. Vi designer, producerer og monterer skilte, der passer til bygning, placering og dit brand.',
   ['Skræddersyet til din facade', 'Holdbare materialer til udendørs brug', 'Design, produktion og montering ét sted']),
 '3d-bogstaver': ('3D-bogstaver', 'bageri', 'Bogstaver og logoer med dybde giver din facade et markant og eksklusivt udtryk, både i dagslys og med belysning.',
   ['Logo og skrift i den udformning, du ønsker', 'Med eller uden belysning', 'Tilpasset underlag og montering']),
 'lysskilte': ('Lysskilte & LED-skilte', 'lys', 'Skilte med lys skaber opmærksomhed, også når det er mørkt. Vi rådgiver om den løsning, der passer til din placering.',
   ['LED-belysning', 'Skræddersyet design', 'Rådgivning om udformning og placering']),
 'indendors-skilte': ('Indendørs skilte', 'indoor', 'Skab et professionelt miljø indenfor med receptionsskilte, vejvisning og dekoration, der understøtter dit brand.',
   ['Receptionsskilte og logovægge', 'Vejvisning og information', 'Tilpasset din indretning']),
 'pyloner-og-standere': ('Pyloner & standere', 'facade', 'Synlighed ved vej, indgang og parkering. Pyloner og standere gør det nemt for kunderne at finde dig.',
   ['Fritstående løsninger', 'Tilpasset din placering', 'Design og montering']),
 'bildekoration': ('Bildekoration & bilreklamer', 'bil', 'Din virksomhed på farten. Vi dekorerer firmabiler, så de bliver rullende reklamer for dit brand.',
   ['Fuld eller delvis bildekoration', 'Logo, tekst og kontaktoplysninger', 'Professionel montering']),
 'vinduesfolie': ('Vinduesfolie & vinduesdekoration', 'glas', 'Dekoration og diskretion i ét. Vinduesfolie giver både synlighed og privatliv i butik, kontor eller klinik.',
   ['Dekorative folier med logo og tekst', 'Diskretion og lysstyring', 'Professionel montering']),
 'print-og-bannere': ('Storformatprint, bannere & reklameprint', 'print', 'Storformat print i høj kvalitet til butik, kampagner og udstillinger.',
   ['Bannere og plakater', 'Print til butik og udstilling', 'Tilpasset størrelse og formål']),
 'messer-og-events': ('Skilte til messer & events', 'lys', 'Skil dig ud på messen og ved events med skilte og bannere, der er tilpasset dit stand.',
   ['Skilte og bannere til stand', 'Løsninger tilpasset dit stand', 'Design og produktion']),
 'grafisk-design': ('Grafisk design', 'design', 'Har du ikke et færdigt logo eller design? Vores grafiker hjælper dig fra idé til produktionsklar fil.',
   ['Logo og visuel identitet', 'Layout til skilte, folie og print', 'Filer klargjort til produktion']),
 'specialloesninger': ('Specialdesignede skilteløsninger', 'montering', 'Har du en idé, der ikke findes på hylden? Vi udvikler skræddersyede løsninger til netop dit behov.',
   ['Udvikling efter dine ønsker', 'Rådgivning om materialer og udførelse', 'Design, produktion og montering']),
}
CATS = {  # side: (titel, undertitel, billede, [produkt-id])
 'skilte': ('Skilte', 'Facadeskilte, 3D-bogstaver og lysskilte, der gør din virksomhed synlig dag og nat.', 'facade',
            ['facadeskilte', '3d-bogstaver', 'lysskilte', 'indendors-skilte', 'pyloner-og-standere']),
 'folie': ('Folie', 'Bildekoration og vinduesfolie, der forvandler flader til reklameplads.', 'bil', ['bildekoration', 'vinduesfolie']),
 'print-og-events': ('Print & events', 'Storformatprint, bannere og skilte til messer og events.', 'print', ['print-og-bannere', 'messer-og-events']),
 'design-og-special': ('Design & specialløsninger', 'Grafisk design og skræddersyede skilteløsninger.', 'design', ['grafisk-design', 'specialloesninger']),
}
CAT_OF = {p: c for c, v in CATS.items() for p in v[3]}
SERVICES = [('Rådgivning', 'Vi finder den bedste løsning til dine behov.', 'chat', 'raad'),
 ('Grafisk design', 'Vi tilbyder en grafiker, der udvikler dit design og gør din idé klar til produktion.', 'pen', 'design'),
 ('Produktion', 'Vi producerer i høj kvalitet med de bedste materialer.', 'print', 'print'),
 ('Montering', 'Professionel opsætning af dit skilt.', 'tools', 'montering')]
BENEFITS = [('diamond', 'Høj kvalitet', 'Holdbare løsninger'), ('bulb', 'Skræddersyet design', 'Tilpasset din virksomhed'),
 ('truck', 'Hurtig levering', 'I hele Danmark'), ('tools', 'Professionel montering', 'Vi sørger for opsætningen'),
 ('shield', 'Komplet service', 'Fra idé til færdigt resultat')]
WHY = [('medal', 'Erfaring og ekspertise', 'Faglig viden og gennemført håndværk'), ('diamond', 'Høj kvalitet', 'Holdbare materialer og flot finish'),
 ('bulb', 'Skræddersyede løsninger', 'Tilpasset din virksomhed og dit brand'), ('team', 'Samlet løsning', 'Design, produktion og montering'),
 ('truck', 'Levering i Danmark', 'Vi hjælper med dit projekt'), ('heart', 'Personlig rådgivning', 'Vi er med dig hele vejen')]
STEPS = [('01', 'Henvendelse', 'Du fortæller om din idé og dit behov – gerne med logo eller skitse.'),
 ('02', 'Design', 'Vi udvikler dit design. Har du intet logo, hjælper vores grafiker.'),
 ('03', 'Produktion', 'Vi producerer i høj kvalitet med materialer valgt til din opgave.'),
 ('04', 'Montering', 'Professionel opsætning på facade, vindue eller bil.')]
GALLERY = [('cafe', 'Café', 'Vinduesfolie'), ('tandlaege', 'Tandlægeklinik', 'Indendørs skilt'), ('glas', 'Advokatkontor', 'Facadeskilt'),
 ('firmabil', 'Firmabil', 'Bildekoration'), ('bageri', 'Bageri', 'Facadeskilt'), ('facade', 'Kontorbygning', 'Facadeskilt'),
 ('indoor', 'Reception', 'Indendørs skilt'), ('bil', 'Varebil', 'Bildekoration'), ('print', 'Butik', 'Print & dekoration'),
 ('lys', 'Restaurant', 'Lysskilt')]
FAQ = [('Hvad koster et skilt?', 'Prisen afhænger af størrelse, materiale, design og montering. Send en forespørgsel for tilbud.'),
 ('Hvor lang leveringstid har I?', 'Leveringstiden afhænger af opgaven, materialer og montering. Kontakt os for en konkret tidsplan.'),
 ('Tilbyder I også design, hvis vi ikke har en færdig fil?', 'Ja. Vi tilbyder grafisk design og hjælper med at gøre din idé klar til produktion.'),
 ('Hvilke materialer bruger I?', 'Vi vælger materialer efter anvendelse, holdbarhed, udseende og budget.'),
 ('Monterer I i hele Danmark?', 'Kontakt os med projektets adresse, så afklarer vi mulighederne.'),
 ('Kan I hjælpe med tilladelser?', 'Vi kan vejlede om typiske hensyn, men konkrete tilladelser afhænger af myndigheder og ejendom.'),
 ('Hvordan vedligeholdes skilte?', 'Det afhænger af materiale og placering. Vi rådgiver om passende rengøring.'),
 ('Tilbyder I rådgivning på stedet?', 'Kontakt os for at aftale mulighederne for besigtigelse.')]
TICKER = ['Skilte · Design · Print · Montering', 'Uforpligtende tilbud', 'Vi svarer inden for 1 hverdag', 'Levering i hele Danmark', 'Grafisk design hvis du mangler logo']

# ---------- Fælles dele ----------
BRAND = ('<a class="brand" href="index.html" aria-label="Skiltefabrikken – forsiden"><img class="brand-mark" src="assets/logo.svg" alt="" width="44" height="44">'
         '<span class="brand-copy"><strong>SKILTEFABRIKKEN</strong><small>SKILTE · DESIGN · PRINT · MONTERING</small></span></a>')

def prod_link(pid):
    return f'{CAT_OF[pid]}.html#{pid}'

def header(active):
    sub_p = ''.join(f'<a href="{prod_link(p)}">{PRODUCTS[p][0]}</a>' for p in PRODUCTS)
    sub_i = ('<a href="om-os.html">Om os</a><a href="om-os.html#services">Services</a><a href="om-os.html#proces">Sådan arbejder vi</a>'
             '<a href="kontakt.html#faq">Spørgsmål og svar</a><a href="kontakt.html">Kontakt</a>')
    def cur(n): return ' class="active"' if active == n else ''
    def has(label, href, sub, n):
        return (f'<div class="has-sub{" active" if active == n else ""}"><a href="{href}">{label}</a>'
                f'<button class="sub-toggle" type="button" aria-expanded="false" aria-label="Vis {label}-menu">{ic("chevron")}</button>'
                f'<div class="sub">{sub}</div></div>')
    nav = (f'<a{cur("forside")} href="index.html">Forside</a>' + has('Produkter', 'index.html#loesninger', sub_p, 'produkter')
           + f'<a{cur("galleri")} href="galleri.html">Galleri</a>' + has('Info', 'om-os.html', sub_i, 'info')
           + f'<a{cur("kontakt")} href="kontakt.html">Kontakt</a>')
    mob = ''.join(f'<a href="{h}">{t}</a>' for t, h in [('Forside', 'index.html'), ('Skilte', 'skilte.html'), ('Folie', 'folie.html'),
          ('Print & events', 'print-og-events.html'), ('Design & special', 'design-og-special.html'), ('Galleri', 'galleri.html'),
          ('Om os', 'om-os.html'), ('Kontakt', 'kontakt.html')])
    items = ''.join(f'<span>{t}</span>' for t in TICKER)
    return f'''<a class="skip-link" href="#main">Spring til indhold</a>
<div class="ticker" aria-label="Fordele"><div class="ticker-track">{items}{items}{items}{items}</div></div>
<header class="site-header" id="top"><div class="container header-inner">{BRAND}
<nav class="desktop-nav" aria-label="Hovednavigation">{nav}</nav>
<div class="header-actions"><a class="header-phone" href="{PHONE_TEL}">{ic("phone")} {PHONE_TXT}</a><a class="btn btn-primary btn-small" href="kontakt.html">Få et tilbud {ic("arrow")}</a></div>
<button class="icon-btn menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Åbn menu">{ic("menu")}</button></div>
<nav id="mobile-nav" class="mobile-nav" aria-label="Mobilnavigation" hidden>{mob}</nav></header>'''

def footer():
    prods = ''.join(f'<a href="{prod_link(p)}">{PRODUCTS[p][0]}</a>' for p in PRODUCTS)
    return f'''<footer class="site-footer"><div class="container footer-grid">
<div>{BRAND.replace('class="brand"', 'class="brand footer-brand"')}<p>Vi skaber visuel kommunikation, der styrker din virksomhed. Fra idé og design til produktion og montering – altid med fokus på kvalitet.</p></div>
<div><h3>Sider</h3><a href="index.html">Forside</a><a href="skilte.html">Skilte</a><a href="folie.html">Folie</a><a href="print-og-events.html">Print &amp; events</a><a href="design-og-special.html">Design &amp; special</a><a href="galleri.html">Galleri</a><a href="om-os.html">Om os</a><a href="kontakt.html">Kontakt</a></div>
<div><h3>Vores produkter</h3>{prods}</div>
<div><h3>Kontakt os</h3><a href="mailto:{MAIL}">{ic("mail")} {MAIL}</a><a href="{PHONE_TEL}">{ic("phone")} {PHONE_TXT}</a><p>{ic("clock")} Hverdage kl. 8–16</p><a class="btn btn-primary btn-small" href="kontakt.html">Få et tilbud {ic("arrow")}</a></div>
</div><div class="container footer-bottom"><span>© <span id="year"></span> Skiltefabrikken. Alle rettigheder forbeholdes.</span>
<span><a href="privatlivspolitik.html">Privatlivspolitik</a> · <a href="handelsbetingelser.html">Handelsbetingelser</a> · <a href="cookies.html">Cookies</a></span></div></footer>
<div class="mobile-sticky"><a href="{PHONE_TEL}">{ic("phone")} Ring nu</a><a href="kontakt.html">Få et tilbud {ic("arrow")}</a></div>'''

def page(fname, title, desc, active, body):
    doc = f'''<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#061421">
<meta name="description" content="{html.escape(desc)}">
<title>{html.escape(title)}</title>
<link rel="icon" href="assets/logo.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
<script src="script.js" defer></script>
</head>
<body>
{header(active)}
<main id="main">
{body}
</main>
{footer()}
</body>
</html>
'''
    open(os.path.join(ROOT, fname), 'w', encoding='utf-8').write(doc)

def head(label, title, sub=''):
    s = f'<p class="section-sub">{sub}</p>' if sub else ''
    return f'<div class="section-head reveal"><p class="eyebrow">{label}</p><h2>{title}</h2>{s}</div>'

def page_head(title, sub, key, crumbs):
    trail = ' <span>/</span> '.join(f'<a href="{h}">{t}</a>' if h else f'<span>{t}</span>' for t, h in crumbs)
    return (f'<section class="page-head"><span class="ph page-head-bg" style="position:absolute;inset:0"><img src="{U(IMG[key], 1800)}" alt="" referrerpolicy="no-referrer"></span>'
            f'<div class="page-head-overlay"></div><div class="container page-head-inner"><p class="crumbs">{trail}</p><h1>{title}</h1><p>{sub}</p>'
            f'<div class="button-row"><a class="btn btn-primary" href="kontakt.html">Få et tilbud {ic("arrow")}</a><a class="btn btn-outline" href="{PHONE_TEL}">{ic("phone")} Ring til os</a></div></div></section>')

def cta_band(text='Klar til at blive set?'):
    return (f'<section class="cta-band"><div class="container cta-inner"><div><h2>{text}</h2><p>Fortæl os om dit projekt og få et uforpligtende tilbud. Vi svarer inden for 1 hverdag.</p></div>'
            f'<div class="button-row"><a class="btn btn-primary" href="kontakt.html">Få et tilbud {ic("arrow")}</a><a class="btn btn-outline" href="{PHONE_TEL}">{ic("phone")} {PHONE_TXT}</a></div></div></section>')

def faq_html(items=FAQ):
    return '<div class="faq-list">' + ''.join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q, a in items) + '</div>'

def process_html():
    return (f'<section class="section process" id="proces"><div class="container">{head("SÅDAN ARBEJDER VI", "FRA IDÉ TIL MONTAGE", "Fire trin fra første idé til færdigt resultat.")}'
            '<div class="steps">' + ''.join(f'<div class="step reveal"><span class="step-num">{n}</span><strong>{t}</strong><p>{d}</p></div>' for n, t, d in STEPS) + '</div></div></section>')

def why_html():
    return (f'<section class="why-section" id="hvorfor"><div class="container why-layout"><div class="why-intro reveal"><p class="eyebrow light">HVORFOR VÆLGE SKILTEFABRIKKEN?</p>'
            '<h2>DIN LOKALE PARTNER<br>I VISUEL KOMMUNIKATION</h2><p>Vi kombinerer kreativitet, kvalitet og erfaring for at skabe løsninger, der styrker din virksomheds identitet.</p>'
            f'<a class="btn btn-primary" href="kontakt.html">Få et tilbud {ic("arrow")}</a></div><div class="why-grid">'
            + ''.join(f'<article class="reveal">{ic(i, "ic")}<div><strong>{t}</strong><p>{s}</p></div></article>' for i, t, s in WHY) + '</div></div></section>')

def reviews_html():
    return (f'<section class="section reviews-section" id="anmeldelser" hidden aria-label="Kundeanmeldelser"><div class="container">{head("ANMELDELSER", "HVAD SIGER VORES KUNDER?")}'
            '<p class="rating-line"><span class="stars-line">★★★★★</span> <a id="rating-link" href="#anmeldelser" rel="noopener noreferrer" target="_blank"><span class="avg"></span></a></p>'
            f'<div class="review-carousel"><button type="button" class="round-arrow light review-arrow prev" aria-label="Forrige anmeldelser">{ic("left")}</button>'
            f'<div class="review-viewport"><div class="review-track" id="review-track"></div></div><button type="button" class="round-arrow light review-arrow next" aria-label="Næste anmeldelser">{ic("right")}</button></div></div></section>')

def gallery_grid(items):
    return '<div class="gallery-grid">' + ''.join(f'<figure class="gallery-item reveal">{pic(k, a + " – " + b, "", 700, "4/5")}<figcaption><strong>{a}</strong><small>{b}</small></figcaption></figure>' for k, a, b in items) + '</div>'

# ---------- Sider ----------
def build_index():
    solutions = ''.join(
        f'<a class="solution-card reveal" href="{c}.html">{pic(v[2], v[0], "", 700, "4/3")}<div><strong>{v[0]}</strong><p>{v[1]}</p><span class="more">Se mere {ic("arrow")}</span></div></a>'
        for c, v in CATS.items())
    body = f'''<section class="hero" aria-labelledby="hero-title"><span class="ph hero-media"><img src="{U(IMG['facade'], 2200)}" alt="" fetchpriority="high" referrerpolicy="no-referrer"></span>
<div class="hero-overlay"></div><div class="container hero-content"><p class="eyebrow light">SKRÆDDERSYEDE SKILTE <span>OG</span> VISUEL KOMMUNIKATION</p>
<h1 id="hero-title">SKILTE DER<br><span>STYRKER DIN</span><br>VIRKSOMHED</h1>
<p>Vi designer, producerer og monterer skræddersyede skilte, dekorationer og visuelle løsninger, der skaber synlighed og gør din virksomhed til at blive set.</p>
<div class="button-row"><a class="btn btn-primary" href="{PHONE_TEL}">{ic("phone")} Ring til os {ic("arrow")}</a><a class="btn btn-primary" href="kontakt.html">Få et tilbud {ic("arrow")}</a></div></div></section>
<section class="benefits" aria-label="Vores fordele"><div class="container benefit-grid">{''.join(f'<div>{ic(i, "ic benefit-icon")}<p><strong>{t}</strong><small>{s}</small></p></div>' for i, t, s in BENEFITS)}</div></section>
<section class="section solutions" id="loesninger"><div class="container">{head("VORES LØSNINGER", "STORT UDVALG AF SKILTE OG VISUEL KOMMUNIKATION", "Fire kerneområder – vælg ét, eller lad os tage hele opgaven.")}<div class="solution-grid">{solutions}</div></div></section>
{why_html()}
{process_html()}
<section class="gallery-section" id="galleri"><div class="container">{head("GALLERI", "INSPIRATION FRA VIRKELIGHEDEN", "Et udpluk af skilte og løsninger.")}{gallery_grid(GALLERY[:4])}
<p class="center"><a class="btn btn-outline" href="galleri.html">SE HELE GALLERIET {ic("arrow")}</a></p></div></section>
{reviews_html()}
<section class="section faq-section" id="faq"><div class="container narrow">{head("FAQ", "OFTE STILLEDE SPØRGSMÅL", "Kan du ikke finde svaret? Ring eller skriv – vi svarer gerne.")}{faq_html(FAQ[:5])}</div></section>
{cta_band()}'''
    page('index.html', 'Skiltefabrikken | Skilte der styrker din virksomhed', 'Skiltefabrikken – skræddersyede skilte, grafisk design, print og montering. Få et uforpligtende tilbud.', 'forside', body)

def build_cat(c):
    title, sub, key, pids = CATS[c]
    secs = ''
    for n, p in enumerate(pids):
        t, img, txt, pts = PRODUCTS[p]
        lis = ''.join(f'<li>{ic("check")} {x}</li>' for x in pts)
        secs += (f'<section class="product-section {"alt" if n % 2 else ""}" id="{p}"><div class="container product-layout">'
                 f'<div class="product-media reveal">{pic(img, t, "", 900, "4/3")}</div>'
                 f'<div class="product-copy reveal"><p class="eyebrow">{title.upper()}</p><h2>{t}</h2><p>{txt}</p><ul class="checks">{lis}</ul>'
                 f'<a class="btn btn-primary" href="kontakt.html?produkt={p}">Få tilbud på {t.split(" &")[0].split(",")[0].lower()} {ic("arrow")}</a></div></div></section>')
    others = ''.join(f'<a href="{o}.html">{CATS[o][0]}</a>' for o in CATS if o != c)
    body = (page_head(title, sub, key, [('Forside', 'index.html'), (title, None)]) + secs
            + f'<section class="section related"><div class="container"><p class="related-line">Se også: {others}</p></div></section>' + cta_band())
    page(f'{c}.html', f'{title} | Skiltefabrikken', sub, 'produkter', body)

def build_gallery():
    body = (page_head('Galleri', 'Inspiration til skilte, folie og print. Et udpluk af løsninger.', 'lys', [('Forside', 'index.html'), ('Galleri', None)])
            + f'<section class="gallery-section page-gallery"><div class="container">{gallery_grid(GALLERY)}</div></section>' + cta_band())
    page('galleri.html', 'Galleri | Skiltefabrikken', 'Se inspiration til skilte, folie og print fra Skiltefabrikken.', 'galleri', body)

def build_about():
    cards = ''.join(f'<article class="service-card reveal">{pic(k, t, "", 700, "14/9")}<div><span class="num">0{n + 1}{ic(i, "ic")}</span><strong>{t}</strong><p>{d}</p></div></article>'
                    for n, (t, d, i, k) in enumerate(SERVICES))
    body = (page_head('Om Skiltefabrikken', 'Din lokale partner i visuel kommunikation – fra idé og design til produktion og montering.', 'montering', [('Forside', 'index.html'), ('Om os', None)])
            + why_html()
            + f'<section class="section services-section" id="services"><div class="container">{head("VORES SERVICES", "VI HJÆLPER DIG HELE VEJEN", "Uanset om du har en færdig idé eller har brug for sparring, står vi klar med rådgivning, design, produktion og montering.")}<div class="services-grid">{cards}</div></div></section>'
            + process_html() + cta_band())
    page('om-os.html', 'Om os | Skiltefabrikken', 'Læs om Skiltefabrikken og hvordan vi hjælper dig hele vejen fra idé til montering.', 'info', body)

def build_contact():
    opts = ''.join(f'<option value="{p}">{PRODUCTS[p][0]}</option>' for p in PRODUCTS) + '<option value="andet">Andet</option>'
    body = (page_head('Kontakt', 'Fortæl os om dit projekt og få et uforpligtende tilbud.', 'indoor', [('Forside', 'index.html'), ('Kontakt', None)])
            + f'''<section class="section contact-section" id="tilbud"><div class="container contact-grid"><div>
<p class="eyebrow">FÅ ET UFORPLIGTENDE TILBUD</p><h2>FORTÆL OS OM DIT PROJEKT</h2>
<form id="quote-form" class="quote-form" novalidate>
<div class="form-row"><label><span class="sr-only">Navn</span><input name="name" type="text" autocomplete="name" placeholder="Navn *" required></label><label><span class="sr-only">Telefon (valgfrit)</span><input name="phone" type="tel" autocomplete="tel" placeholder="Telefon (valgfri)"></label></div>
<label><span class="sr-only">E-mail</span><input name="email" type="email" autocomplete="email" placeholder="E-mail *" required></label>
<label><span class="sr-only">Hvad drejer det sig om</span><select name="product" id="product-select"><option value="">Hvad drejer det sig om? (valgfri)</option>{opts}</select></label>
<label><span class="sr-only">Projektbeskrivelse</span><textarea name="message" rows="5" placeholder="Hvad kan vi hjælpe dig med? *" required></textarea></label>
<div class="upload-field">{ic("upload")}<strong>Har du logo, filer eller billeder?</strong><small>Vedhæft dem i den mail, der åbner, når du trykker send.</small></div>
<button class="btn btn-primary submit-btn" type="submit">SEND FORESPØRGSEL {ic("arrow")}</button><p id="form-status" role="status" aria-live="polite"></p></form></div>
<aside class="contact-card"><h3>Hellere snakke?</h3><p>Ring til os på hverdage kl. 8–16. Vi svarer på forespørgsler inden for 1 hverdag.</p>
<a href="{PHONE_TEL}">{ic("phone")} {PHONE_TXT}</a><a href="mailto:{MAIL}">{ic("mail")} {MAIL}</a><span>{ic("clock")} Hverdage kl. 8–16</span></aside></div></section>
<section class="section faq-section" id="faq"><div class="container narrow">{head("FAQ", "OFTE STILLEDE SPØRGSMÅL", "Kan du ikke finde svaret? Ring eller skriv – vi svarer gerne.")}{faq_html()}</div></section>''')
    page('kontakt.html', 'Kontakt og tilbud | Skiltefabrikken', 'Kontakt Skiltefabrikken og få et uforpligtende tilbud på skilte, folie, print og design.', 'kontakt', body)

LEGAL = {
 'privatlivspolitik': ('Privatlivspolitik', '<h2>Hvilke oplysninger indsamler vi?</h2><p>Når du sender en forespørgsel, modtager vi dit navn, din e-mail, evt. telefonnummer og din beskrivelse af opgaven, samt eventuelle filer, du selv vedhæfter i din mail.</p><h2>Hvad bruger vi dem til?</h2><p>Kun til at besvare din forespørgsel og udarbejde et tilbud. Vi videregiver ikke oplysninger til tredjepart til markedsføring.</p><h2>Hvor længe gemmer vi dem?</h2><p>Så længe det er nødvendigt for at håndtere din henvendelse og opfylde lovkrav.</p><h2>Dine rettigheder</h2><p>Du kan bede om indsigt i, rettelse af eller sletning af dine oplysninger ved at skrive til os på <a href="mailto:' + MAIL + '">' + MAIL + '</a>.</p>'),
 'handelsbetingelser': ('Handelsbetingelser', '<h2>Tilbud</h2><p>Alle tilbud er uforpligtende og gælder i den periode, der fremgår af tilbuddet.</p><h2>Betaling</h2><p>Betalingsbetingelser aftales i tilbuddet.</p><h2>Specialfremstillede produkter</h2><p>Skræddersyede skilte og tryk fremstilles efter din bestilling.</p><h2>Levering og montering</h2><p>Leveringstid og montering aftales for det enkelte projekt.</p><h2>Reklamation</h2><p>Kontakt os hurtigst muligt, hvis du har bemærkninger til leverancen.</p>'),
 'cookies': ('Cookies', '<p>Hjemmesiden bruger ingen sporings- eller marketingcookies. Skrifttypen Inter hentes fra Google Fonts, hvilket kan medføre, at din IP-adresse deles med Google. Billeder hentes fra Unsplash.</p>'),
}
def build_legal():
    for f, (t, b) in LEGAL.items():
        body = f'<section class="section"><div class="container legal"><p class="note">Standardtekst som udgangspunkt. Få den gennemgået og tilpasset, og tilføj virksomhedens navn, adresse og CVR, før siden lanceres.</p><h1>{t}</h1>{b}</div></section>'
        page(f'{f}.html', f'{t} | Skiltefabrikken', f'{t} for Skiltefabrikken.', '', body)

if __name__ == '__main__':
    build_index(); [build_cat(c) for c in CATS]; build_gallery(); build_about(); build_contact(); build_legal()
    print('Sider genereret.')
