# Skiltefabrikken – hjemmeside

Statisk hjemmeside (HTML, CSS, JavaScript). Ingen build-proces eller framework.

## Sådan kommer du i gang
1. Upload `index.html`, `style.css`, `script.js`, de tre juridiske sider og mappen `assets/` til dit webhotel (typisk `public_html`).
2. Åbn domænet i browseren.

## Billeder
Siden har faste billedpladser. Læg dine egne fotos i `assets/img/` med de filnavne, der står i `assets/img/README.md` (fx `hero.jpg`, `produkt-facade.jpg`, `galleri-1.jpg`). Mangler en fil, vises en pladsholder.

## Kontaktformular
Formularen åbner kundens mailprogram med en færdig mail til adressen i `contactEmail` øverst i `script.js` (nu `mohidawanski@gmail.com`). Skift den til firmamailen før lancering. Filer kan ikke vedhæftes automatisk, så kunden bliver bedt om at vedhæfte dem i mailen.

## Før lancering
- Kontroller telefon (`+45 44 11 94 91`) og e-mail (`info@skiltefabrikken.dk`) i `index.html`.
- Tilføj adresse og CVR i footeren, når de er klar.
- Få privatlivspolitik, handelsbetingelser og cookies gennemgået (de er standardskabeloner).
- Anmeldelser: udfyld `reviews` i `script.js` med **rigtige** udtalelser. Sektionen er skjult, til der er mindst én. Fra to anmeldelser ruller den automatisk.
- Test på mobil, tablet og computer.

## Designfarver
- Primær blå `#0866F5`, hover `#0554D2`
- Navy `#061421`, sekundær navy `#071B2A`, mørke kort `#102333`
- Hvid `#FFFFFF`, lys baggrund `#F5F7FA`
- Tekst `#111827`, sekundær tekst `#526174`, kant `#E2E8F0`, stjerner `#F5B400`
- Font: Inter (Google Fonts), fallback Arial/sans-serif
