# Skiltefabrikken – hjemmeside

Flersidet statisk hjemmeside (HTML, CSS, JavaScript). Ingen framework og ingen build-proces ved hosting.

## Sider
`index.html` (forside) · `skilte.html` · `folie.html` · `print-og-events.html` · `design-og-special.html` · `galleri.html` · `om-os.html` · `kontakt.html` · `privatlivspolitik.html` · `handelsbetingelser.html` · `cookies.html`

## Sådan kommer du i gang
1. Upload alle `.html`-filer, `style.css`, `script.js` og mappen `assets/` til dit webhotel (typisk `public_html`).
2. Åbn domænet i browseren.

## Rediger indhold
Siderne er genereret af `tools/build.py`. Tekster, produkter, FAQ og menu står øverst i scriptet. Efter ændringer kører du `python3 tools/build.py`, og de nye `.html`-filer skrives i projektets rod. Scriptet er ikke nødvendigt på webhotellet.

## Billeder
Billederne er illustrationsfotos fra Unsplash (de samme som i de oprindelige filer), hentet direkte fra Unsplash. De er ikke rigtige Skiltefabrikken-projekter. Udskift dem med egne fotos i `tools/build.py` (listen `IMG`, brug en lokal sti i stedet for Unsplash-adressen) før lancering.

## Kontaktformular
Formularen på `kontakt.html` åbner kundens mailprogram med en færdig mail til adressen i `contactEmail` øverst i `script.js` (nu `mohidawanski@gmail.com`). Skift den til firmamailen før lancering. Filer kan ikke vedhæftes automatisk, så kunden bliver bedt om at vedhæfte dem i mailen.

## Før lancering
- Kontroller telefon (`+45 44 11 94 91`) og e-mail (`info@skiltefabrikken.dk`).
- Tilføj adresse og CVR i footeren, når de er klar (i `tools/build.py`).
- Få privatlivspolitik, handelsbetingelser og cookies gennemgået (de er standardskabeloner).
- Anmeldelser: udfyld `reviews` i `script.js` med **rigtige** udtalelser. Sektionen på forsiden er skjult, til der er mindst én.
- Test på mobil, tablet og computer.

## Designfarver
- Primær blå `#0866F5`, hover `#0554D2`
- Navy `#061421`, sekundær navy `#071B2A`, mørke kort `#102333`
- Hvid `#FFFFFF`, lys baggrund `#F5F7FA`
- Tekst `#111827`, sekundær tekst `#526174`, kant `#E2E8F0`, stjerner `#F5B400`
- Font: Inter (Google Fonts), fallback Arial/sans-serif
