# Skiltefabrikken – hjemmeside

Almindelige HTML-filer (HTML, CSS, JavaScript). Ingen framework og ingen build-proces: du kan åbne `index.html` direkte i en browser eller uploade mappen til dit webhotel.

## Filer
- **Sider:** `index.html` (forside), `produkter.html`, produktsider (`facadeskilte.html`, `indendoers-skilte.html`, `bildekoration.html`, `vinduesfolie.html`, `print-og-dekoration.html`, `lysskilte.html`, `3d-bogstaver.html`, `pyloner-og-standere.html`, `messer-og-events.html`, `specialloesninger.html`), `services.html`, `galleri.html`, `om-os.html`, `kontakt.html`, `privatlivspolitik.html`, `handelsbetingelser.html`, `cookies.html`
- `style.css` (design), `script.js` (funktioner og indstillinger), `gallery-data.js` (galleriets billeder)
- `assets/` (logo `logo-skilton.png` til lys baggrund, `logo-skilton-hvid.png` til mørk baggrund/footer, favicon, ikoner og reserve-illustrationer), `assets/gallery/` (dine egne galleribilleder)

## Upload
Upload alle filer og mapperne `assets/` til dit webhotel (typisk `public_html`), og åbn domænet. Husk `gallery-data.js` og `script.js`, ellers virker galleri og formular ikke.

## Sådan redigerer du
- **Tekster:** åbn den relevante `.html`-fil og ret teksten direkte. Header og footer er ens på alle sider og står markeret med kommentarerne `HEADER` og `FOOTER`.
- **Galleri:** læg billedet i `assets/gallery/` og tilføj en linje i `gallery-data.js` (vejledning står øverst i filen). Fjern `example: true`, når billedet er et rigtigt projekt.
- **Egne produktbilleder:** erstat Unsplash-adressen i `src` på billedet med `assets/img/dit-billede.jpg`. Hvis et foto ikke kan hentes, vises i stedet en illustration fra `assets/img/`.
- **Anmeldelser:** udfyld `reviews` i `script.js` (plads til 20; felter: `title`, `text`, `stars`, `name`, `company`, `date`, `logo`). Kun rigtige anmeldelser fra egne kunder, der har givet lov. Vises 3 ad gangen på computer, 2 på tablet og 1 på mobil, med pile, swipe og "Læs mere". Pladsholderne i designet slås fra med `SHOW_REVIEW_PLACEHOLDERS = false`.
- **Adresse og CVR:** står som pladsholdere i footeren (`[Indsæt adresse]`, `[Indsæt CVR-nummer]`). Søg efter `[Indsæt` i filerne, og ret dem.
- **Telefon:** nummeret vises ikke på siden. "Ring til os"-knapperne bruger linket `tel:+4544119491`. Søg efter `tel:` og ret nummeret, hvis det skal ændres.

## Kontaktformular
Formularen kan sende på to måder (indstilles øverst i `script.js`):
1. **Rigtig afsendelse (anbefalet):** opret en formular hos fx Formspree og indsæt adressen i `formEndpoint`. Så sendes forespørgslen direkte, med vedhæftede filer, hvis abonnementet understøtter filer.
2. **Uden modtager (nu):** formularen åbner kundens mailprogram med en færdig mail til `contactEmail` (nu `mohidawanski@gmail.com`; skift til firmamailen før lancering). Filer kan ikke vedhæftes automatisk, så kunden bliver bedt om at vedhæfte dem i mailen.

## Logo
Logoet er `assets/logo-skilton.png` (header) og `assets/logo-skilton-hvid.png` (footer, hvid skrift til den mørke baggrund). Begge har gennemsigtig baggrund. Skal logoet skiftes igen, erstattes de to filer (samme filnavne, samme højde-til-bredde-forhold), og `assets/favicon-skilton.png` (browserfane-ikon) og `assets/logo-ikon-hvid.png` (svagt ikon i footeren) opdateres.

## Før lancering
- Kontroller e-mail (`info@skiltefabrikken.dk`) og telefonlink.
- Udskift eksempelbillederne (illustrationsfotos fra Unsplash) med egne fotos.
- Få privatlivspolitik, handelsbetingelser og cookies gennemgået (de er standardskabeloner).
- Test på mobil, tablet og computer.

## Designfarver
Primær blå `#0866F5` (hover `#0554D2`), navy `#061421`, mørke kort `#102333`, hvid `#FFFFFF`, lys baggrund `#F5F7FA`, tekst `#111827`, sekundær tekst `#526174`, kant `#E2E8F0`. Font: Inter (Google Fonts). Ingen grøn.
