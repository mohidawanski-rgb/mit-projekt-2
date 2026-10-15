/* ==========================================================================
   GALLERI – her tilføjer du nye billeder.

   Sådan tilføjer du et billede:
   1. Læg filen i mappen  assets/gallery/  (fx assets/gallery/facade-bageri.jpg)
   2. Tilføj en ny linje nedenfor (husk komma til sidst på linjen):
      {src: 'assets/gallery/facade-bageri.jpg', title: 'Bageri', type: 'Facadeskilt', category: 'facade', alt: 'Facadeskilt til et bageri'},
   3. Fjern  example: true  på de billeder, der er rigtige projekter.

   Felter: src = billedfil · title = navn under billedet · type = hvad der er lavet
           category = facade · lys · bil · folie · print · indoor (bruges af filtrene på gallerisiden)
           local = (valgfri) egen fil, der vises først, hvis den findes, fx 'assets/img/galleri-1.jpg'
           pos = (valgfri) hvor billedet beskæres i kortet, fx '50% 20%' (vandret og lodret placering)
   De første 4 rigtige projekter (uden  example: true ) vises også i forsidens billedskift (hero).
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
  {src: 'assets/gallery/puff-n-stuff.jpg', title: "Puff'n'Stuff", type: 'Facadeskilt og vinduesfolie', category: 'facade', alt: "Facade med lysskilt og vinduesfolie til Puff'n'Stuff", pos: '50% 0%'},
  {src: 'assets/gallery/kebabland.jpg', title: 'Kebabland', type: 'Facadeskilt med bogstaver', category: 'facade', alt: 'Facade med bogstavskilt til Kebabland', pos: '50% 22%'},
  {src: 'assets/gallery/zeynos-kebab.jpg', title: "Zeyno's Kebab", type: 'LED-neonskilt', category: 'lys', alt: "LED-neonskilt til Zeyno's Kebab", pos: '50% 50%'},
  {src: 'assets/gallery/rules-boxing-club.jpg', title: 'Rules Boxing Club', type: 'LED-neonskilt', category: 'lys', alt: 'Rødt LED-neonskilt med teksten Rules Boxing Club', pos: '50% 50%'},
  {src: 'assets/gallery/nails-head-spa.jpg', title: 'Nails & Head Spa', type: '3D-bogstaver med lys', category: 'lys', alt: 'Lysende 3D-bogstaver til Nails & Head Spa', pos: '50% 40%'},
  {src: 'assets/gallery/zorena.jpg', title: 'Zørena', type: '3D-bogstaver med bagbelysning', category: 'facade', alt: 'Sorte 3D-bogstaver med bagbelysning på facaden til Zørena', pos: '50% 46%'},
  {src: 'assets/gallery/basilikum.jpg', title: 'Basilikum', type: 'Lysbogstaver', category: 'lys', alt: 'Store lysende bogstaver til Basilikum', pos: '50% 55%'},
  {src: 'assets/gallery/thailand-food.jpg', title: 'Thailand Food', type: 'LED-bogstaver', category: 'lys', alt: 'Gule og hvide LED-bogstaver til Thailand Food', pos: '50% 45%'},
  {src: 'assets/gallery/mf-barbershop.jpg', title: 'MF Barbershop', type: 'Rund lysboks', category: 'lys', alt: 'Rund lysboks med logo til MF Barbershop', pos: '50% 50%'},
  {src: 'assets/gallery/osnacks.jpg', title: "O'Snacks", type: 'Udhængsskilt', category: 'facade', alt: "Udhængsskilt til O'Snacks", pos: '50% 36%'},
  {src: 'assets/gallery/repair-me.jpg', title: 'Repair ME', type: '3D-bogstaver indendørs', category: 'indoor', alt: 'Hvide 3D-bogstaver på en disk til Repair ME', pos: '50% 50%'},
  {src: 'assets/gallery/buddha-behandler.jpg', title: 'Buddha Behandler', type: 'Bagbelyste bogstaver', category: 'indoor', alt: 'Røde bagbelyste bogstaver på væg til Buddha Behandler', pos: '50% 29%'},
  {src: 'assets/gallery/coffee.jpg', title: 'Coffee', type: 'Lysboks', category: 'lys', alt: 'Lysboks med teksten Coffee', pos: '50% 50%'},
  {local: 'assets/img/galleri-1.jpg', src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=85', title: 'Café', type: 'Vinduesfolie', category: 'folie', alt: 'Eksempelbillede af café med vinduesfolie', example: true},
  {local: 'assets/img/galleri-2.jpg', src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=85', title: 'Tandlægeklinik', type: 'Indendørs skilt', category: 'indoor', alt: 'Eksempelbillede af klinik med indendørs skilt', example: true},
  {local: 'assets/img/galleri-3.jpg', src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=85', title: 'Advokat', type: 'Facadeskilt', category: 'facade', alt: 'Eksempelbillede af kontor med facadeskilt', example: true},
  {local: 'assets/img/galleri-4.jpg', src: 'https://images.unsplash.com/photo-1566939886041-4e3bf98e1d35?auto=format&fit=crop&w=800&q=85', title: 'Firmabil', type: 'Bildekoration', category: 'bil', alt: 'Eksempelbillede af firmabil med bildekoration', example: true},
  {local: 'assets/img/galleri-5.jpg', src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85', title: 'Bageri', type: 'Facadeskilt', category: 'facade', alt: 'Eksempelbillede af bageri med facadeskilt', example: true},
  {src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85', title: 'Kontorbygning', type: 'Facadeskilt', category: 'facade', alt: 'Eksempelbillede af facade med skilt', example: true},
  {src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=85', title: 'Restaurant', type: 'Lysskilt', category: 'lys', alt: 'Eksempelbillede af belyst skiltning', example: true},
  {src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=85', title: 'Varebil', type: 'Bildekoration', category: 'bil', alt: 'Eksempelbillede af køretøj til bildekoration', example: true},
  {src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=85', title: 'Butik', type: 'Storformatprint', category: 'print', alt: 'Eksempelbillede af farverigt print', example: true},
  {src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85', title: 'Reception', type: 'Indendørs skilt', category: 'indoor', alt: 'Eksempelbillede af reception med skiltning', example: true},
];
