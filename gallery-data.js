/* ==========================================================================
   GALLERI – her tilføjer du nye billeder.

   Sådan tilføjer du et billede:
   1. Læg filen i mappen  assets/gallery/  (fx assets/gallery/facade-bageri.jpg)
   2. Tilføj en ny linje nedenfor:
      {src: 'assets/gallery/facade-bageri.jpg', title: 'Facadeskilt', category: 'facade', alt: 'Facadeskilt til et bageri'},
   3. Fjern  example: true  på de billeder, der er rigtige projekter.

   Kategorier: facade · lys · bil · folie · print · indoor
   Billeder markeret  example: true  vises som "Eksempelbillede" og må ikke
   præsenteres som udførte projekter. De nuværende er illustrationsfotos fra Unsplash.
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
  {src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85', title: 'Facadeskilt', category: 'facade', alt: 'Eksempelbillede af facade med skilt', example: true},
  {src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=85', title: 'Lysskilt', category: 'lys', alt: 'Eksempelbillede af belyst skiltning', example: true},
  {src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=85', title: 'Bildekoration', category: 'bil', alt: 'Eksempelbillede af køretøj til bildekoration', example: true},
  {src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=85', title: 'Vinduesdekoration', category: 'folie', alt: 'Eksempelbillede af butiksvindue', example: true},
  {src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85', title: 'Facadeskilt med bogstaver', category: 'facade', alt: 'Eksempelbillede af facade med bogstavskilt', example: true},
  {src: 'https://images.unsplash.com/photo-1566939886041-4e3bf98e1d35?auto=format&fit=crop&w=800&q=85', title: 'Bilreklame', category: 'bil', alt: 'Eksempelbillede af firmabil', example: true},
  {src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=85', title: 'Vinduesfolie', category: 'folie', alt: 'Eksempelbillede af glaspartier', example: true},
  {src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=85', title: 'Storformatprint', category: 'print', alt: 'Eksempelbillede af farverigt print', example: true},
  {src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85', title: 'Indendørs skilt', category: 'indoor', alt: 'Eksempelbillede af reception med skiltning', example: true},
  {src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=85', title: 'Indendørs skiltning', category: 'indoor', alt: 'Eksempelbillede af klinikindretning', example: true}
];
