/* ==========================================================================
   GALLERI – her tilføjer du nye billeder.

   Sådan tilføjer du et billede:
   1. Læg filen i mappen  assets/gallery/  (fx assets/gallery/facade-bageri.jpg)
   2. Tilføj en ny linje nedenfor (husk komma til sidst på linjen), fx:
      {src: 'assets/gallery/facade-bageri.jpg', title: 'Bageri', type: 'Facadeskilt', category: 'facade', alt: 'Facadeskilt til et bageri', ratio: '3 / 4', shape: 'tall'},
   3. Fjern  example: true  på de billeder, der er rigtige projekter.

   Felter: src = billedfil · title = navn under billedet · type = hvad der er lavet
           category = facade · lys · bil · folie · print · indoor (bruges af filtrene på gallerisiden)
           ratio = billedets format som 'bredde / højde' i pixels, fx '640 / 1138' (bruges til at vise billedet i sit eget
                   format på gallerisiden og til at undgå, at siden hopper, mens billedet hentes)
           shape = størrelse i forsidens mosaik: 'small' (lille firkant), 'tall' (høj, til højformat), 'big' (stor firkant, 2x2)
                   eller 'wide' (bred, 2 kolonner x 1 række). Mangler feltet, vælges den ud fra ratio.
           local = (valgfri) egen fil, der vises først, hvis den findes, fx 'assets/img/galleri-1.jpg'
           pos = (valgfri) hvor billedet beskæres i mosaikken, fx '50% 20%' (vandret og lodret placering)
           hero = (valgfri) true: billedet indgår i forsidens billedskift (hero). Er ingen markeret, bruges de første 4 rigtige.
           feature = (valgfri) true: billedet står først og stort i sin gruppe, fx i sektionen "Facadeskilte" på gallerisiden.
           Facadeskilte (category: 'facade', uden example: true) samles automatisk i sektionen "Facadeskilte" øverst på gallerisiden.
   Billeder markeret  example: true  vises som eksempel og må ikke præsenteres
   som udførte projekter. De nuværende er illustrationsfotos fra Unsplash.
   ========================================================================== */
window.GALLERY_CATEGORIES = {
  facade: 'Facadeskilte',
  lys: 'LED-lysskilte',
  bil: 'Bildekoration',
  folie: 'Vinduesfolie',
  print: 'Print',
  indoor: 'Indendørs'
};

window.GALLERY_ITEMS = [
  {src: "assets/gallery/shawarma-no1-grill-house.jpg", title: "Shawarma No.1 Grill-House", type: "Facadeskilt med lys", category: "facade", alt: "Lysende facadeskilt til Shawarma No.1 Grill-House", ratio: "445 / 750", shape: "big", pos: "50% 26%", feature: true},
  {src: "assets/gallery/puff-n-stuff.jpg", title: "Puff'n'Stuff", type: "Facadeskilt og vinduesfolie", category: "facade", alt: "Facade med lysskilt og vinduesfolie til Puff'n'Stuff", ratio: "816 / 820", shape: "small", pos: "50% 12%", hero: true},
  {src: "assets/gallery/kebabland.jpg", title: "Kebabland", type: "Facadeskilt med bogstaver", category: "facade", alt: "Facade med bogstavskilt til Kebabland", ratio: "637 / 808", shape: "big", pos: "50% 24%", hero: true},
  {src: "assets/gallery/zeynos-kebab.jpg", title: "Zeyno's Kebab", type: "LED-neonskilt", category: "lys", alt: "LED-neonskilt til Zeyno's Kebab", ratio: "811 / 751", shape: "small", pos: "50% 50%", hero: true},
  {src: "assets/gallery/rules-boxing-club.jpg", title: "Rules Boxing Club", type: "LED-neonskilt", category: "lys", alt: "Rødt LED-neonskilt med teksten Rules Boxing Club", ratio: "640 / 632", shape: "small", pos: "50% 50%", hero: true},
  {src: "assets/gallery/zorena.jpg", title: "Zørena", type: "3D-bogstaver med bagbelysning", category: "facade", alt: "Sorte 3D-bogstaver med bagbelysning på facaden til Zørena", ratio: "640 / 1138", shape: "tall", pos: "15% 50%"},
  {src: "assets/gallery/byens-autohandel.jpg", title: "Byens Autohandel", type: "3D-bogstaver på facade", category: "facade", alt: "3D-bogstaver på facaden til Byens Autohandel", ratio: "442 / 647", shape: "small", pos: "50% 25%"},
  {src: "assets/gallery/nails-head-spa.jpg", title: "Nails & Head Spa", type: "3D-bogstaver med lys", category: "facade", alt: "Lysende 3D-bogstaver til Nails & Head Spa", ratio: "640 / 853", shape: "small", pos: "50% 40%"},
  {src: "assets/gallery/mf-barbershop.jpg", title: "MF Barbershop", type: "Rund lysboks", category: "lys", alt: "Rund lysboks med logo til MF Barbershop", ratio: "1200 / 1166", shape: "big", pos: "50% 50%"},
  {src: "assets/gallery/cafe-metro.jpg", title: "Café Metro", type: "Facadeskilt med lys", category: "facade", alt: "Lysende bogstaver på facaden til Café Metro", ratio: "445 / 678", shape: "tall", pos: "50% 30%"},
  {src: "assets/gallery/basilikum.jpg", title: "Basilikum", type: "Lysbogstaver", category: "lys", alt: "Store lysende bogstaver til Basilikum", ratio: "640 / 1138", shape: "tall", pos: "50% 55%"},
  {src: "assets/gallery/iron-and-ink.jpg", title: "Iron & Ink", type: "Facadeskilt med bagbelysning", category: "facade", alt: "Bagbelyste bogstaver på facaden til Iron & Ink", ratio: "448 / 504", shape: "small", pos: "50% 32%"},
  {src: "assets/gallery/thailand-food.jpg", title: "Thailand Food", type: "LED-bogstaver", category: "facade", alt: "Gule og hvide LED-bogstaver til Thailand Food", ratio: "640 / 643", shape: "small", pos: "50% 45%"},
  {src: "assets/gallery/osnacks.jpg", title: "O'Snacks", type: "Udhængsskilt", category: "facade", alt: "Udhængsskilt til O'Snacks", ratio: "640 / 853", shape: "small", pos: "50% 36%"},
  {src: "assets/gallery/maybe-chicken.jpg", title: "Maybe Chicken", type: "LED-facadeskilt", category: "facade", alt: "Rødt LED-facadeskilt til Maybe Chicken", ratio: "454 / 583", shape: "small", pos: "50% 30%"},
  {src: "assets/gallery/repair-me.jpg", title: "Repair ME", type: "3D-bogstaver indendørs", category: "indoor", alt: "Hvide 3D-bogstaver på en disk til Repair ME", ratio: "640 / 1138", shape: "tall", pos: "50% 50%"},
  {src: "assets/gallery/pippali.jpg", title: "Pippali Indian Grill", type: "Udhængsskilt med lys", category: "facade", alt: "Lysende udhængsskilt til Pippali Indian Grill", ratio: "640 / 1138", shape: "tall", pos: "8% 50%"},
  {src: "assets/gallery/i-fix-it.jpg", title: "I FIX IT", type: "Lysskilt med 3D-bogstaver", category: "lys", alt: "Lysskilt med blå 3D-bogstaver til I FIX IT Mobil & PC", ratio: "640 / 480", shape: "wide", pos: "50% 48%"},
  {src: "assets/gallery/vadehavshotellet.jpg", title: "Vadehavshotellet", type: "Udhængsskilt med lys", category: "facade", alt: "Bagbelyst udhængsskilt til Vadehavshotellet", ratio: "640 / 853", shape: "small", pos: "50% 36%"},
  {src: "assets/gallery/coffee.jpg", title: "Coffee", type: "Lysboks", category: "lys", alt: "Lysboks med teksten Coffee", ratio: "640 / 578", shape: "small", pos: "50% 50%"},
  {src: "assets/gallery/lyngs-jagt-outdoor.jpg", title: "Lyng's Jagt & Outdoor", type: "LED-neonskilt", category: "lys", alt: "LED-neonskilt til Lyng's Jagt & Outdoor", ratio: "640 / 1138", shape: "big", pos: "50% 40%"},
  {src: "assets/gallery/buddha-behandler.jpg", title: "Buddha Behandler", type: "Bagbelyste bogstaver", category: "indoor", alt: "Røde bagbelyste bogstaver på væg til Buddha Behandler", ratio: "640 / 734", shape: "small", pos: "50% 29%"},
  {src: "assets/gallery/vivah.jpg", title: "Vivah", type: "Bagbelyste 3D-bogstaver", category: "indoor", alt: "Bagbelyste 3D-bogstaver på væg til Vivah", ratio: "640 / 1138", shape: "tall", pos: "45% 50%"},
  {src: "assets/gallery/the-vibe-lounge.jpg", title: "The Vibe Lounge", type: "Udhængsskilt med lys", category: "facade", alt: "Lysende udhængsskilt til The Vibe Lounge", ratio: "276 / 342", shape: "small", pos: "50% 40%"},
  {src: "assets/gallery/norrebros-shawarma.jpg", title: "Nørrebro's Shawarma", type: "LED-neonskilt", category: "facade", alt: "LED-neonskilt til Nørrebro's Shawarma", ratio: "275 / 178", shape: "wide", pos: "50% 45%"},
  {src: "assets/gallery/find-your-zyn.jpg", title: "Find Your ZYN", type: "Rund lysboks", category: "lys", alt: "Rund lysboks med teksten Find your ZYN", ratio: "275 / 371", shape: "big", pos: "50% 50%"},
  {local: "assets/img/galleri-1.jpg", src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=85", title: "Café", type: "Vinduesfolie", category: "folie", alt: "Eksempelbillede af café med vinduesfolie", ratio: "4 / 3", shape: "big", example: true},
  {local: "assets/img/galleri-2.jpg", src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=85", title: "Tandlægeklinik", type: "Indendørs skilt", category: "indoor", alt: "Eksempelbillede af klinik med indendørs skilt", ratio: "3 / 4", shape: "tall", example: true},
  {local: "assets/img/galleri-3.jpg", src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=85", title: "Advokat", type: "Facadeskilt", category: "facade", alt: "Eksempelbillede af kontor med facadeskilt", ratio: "1 / 1", shape: "small", example: true},
  {local: "assets/img/galleri-4.jpg", src: "https://images.unsplash.com/photo-1566939886041-4e3bf98e1d35?auto=format&fit=crop&w=800&q=85", title: "Firmabil", type: "Bildekoration", category: "bil", alt: "Eksempelbillede af firmabil med bildekoration", ratio: "4 / 3", shape: "small", example: true},
  {local: "assets/img/galleri-5.jpg", src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85", title: "Bageri", type: "Facadeskilt", category: "facade", alt: "Eksempelbillede af bageri med facadeskilt", ratio: "3 / 4", shape: "tall", example: true},
  {src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85", title: "Kontorbygning", type: "Facadeskilt", category: "facade", alt: "Eksempelbillede af facade med skilt", ratio: "16 / 10", shape: "big", example: true},
  {src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=85", title: "Restaurant", type: "Lysskilt", category: "lys", alt: "Eksempelbillede af belyst skiltning", ratio: "1 / 1", shape: "small", example: true},
  {src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=85", title: "Varebil", type: "Bildekoration", category: "bil", alt: "Eksempelbillede af køretøj til bildekoration", ratio: "3 / 2", shape: "small", example: true},
  {src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=85", title: "Butik", type: "Storformatprint", category: "print", alt: "Eksempelbillede af farverigt print", ratio: "1 / 1", shape: "small", example: true},
  {src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85", title: "Reception", type: "Indendørs skilt", category: "indoor", alt: "Eksempelbillede af reception med skiltning", ratio: "4 / 3", shape: "small", example: true},
];
