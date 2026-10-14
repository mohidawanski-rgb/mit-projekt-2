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
   Billeder markeret  example: true  vises som eksempel og må ikke præsenteres
   som udførte projekter. De nuværende er illustrationsfotos fra Unsplash.
   ========================================================================== */
window.GALLERY_CATEGORIES = {
  facade: 'Facadeskilte',
  lys: 'Lysskilte',
  bil: 'Bildekoration',
  folie: 'Vinduesfolie',
  print: 'Print',
  indoor: 'Indendørs'
};

window.GALLERY_ITEMS = [
  {local: 'assets/img/galleri-1.jpg', src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=85', title: 'Café', type: 'Vinduesfolie', category: 'folie', alt: 'Eksempelbillede af café med vinduesfolie', example: true},
  {local: 'assets/img/galleri-2.jpg', src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=85', title: 'Tandlægeklinik', type: 'Indendørs skilt', category: 'indoor', alt: 'Eksempelbillede af klinik med indendørs skilt', example: true},
  {local: 'assets/img/galleri-3.jpg', src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=85', title: 'Advokat', type: 'Facadeskilt', category: 'facade', alt: 'Eksempelbillede af kontor med facadeskilt', example: true},
  {local: 'assets/img/galleri-4.jpg', src: 'https://images.unsplash.com/photo-1566939886041-4e3bf98e1d35?auto=format&fit=crop&w=800&q=85', title: 'Firmabil', type: 'Bildekoration', category: 'bil', alt: 'Eksempelbillede af firmabil med bildekoration', example: true},
  {local: 'assets/img/galleri-5.jpg', src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85', title: 'Bageri', type: 'Facadeskilt', category: 'facade', alt: 'Eksempelbillede af bageri med facadeskilt', example: true},
  {src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85', title: 'Kontorbygning', type: 'Facadeskilt', category: 'facade', alt: 'Eksempelbillede af facade med skilt', example: true},
  {src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=85', title: 'Restaurant', type: 'Lysskilt', category: 'lys', alt: 'Eksempelbillede af belyst skiltning', example: true},
  {src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=85', title: 'Varebil', type: 'Bildekoration', category: 'bil', alt: 'Eksempelbillede af køretøj til bildekoration', example: true},
  {src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=85', title: 'Butik', type: 'Print & dekoration', category: 'print', alt: 'Eksempelbillede af farverigt print', example: true},
  {src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85', title: 'Reception', type: 'Indendørs skilt', category: 'indoor', alt: 'Eksempelbillede af reception med skiltning', example: true},
];
