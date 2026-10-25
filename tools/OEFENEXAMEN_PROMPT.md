# Prompt: een oefenexamen (doorklik-examen) bouwen

Versie 1 · 25 okt 2026 · leidend voor elk nieuw oefenexamen en voor aanpassingen aan de bestaande (`tools/examen-havo-2026-1.html`, `tools/examen-havo-2026-2.html`). Een wijziging aan de werkwijze gaat in dit bestand, in hetzelfde werk, met commit + push (beide Claude-accounts lezen hem hier).

## Wat het is

Een tool waarin een leerling een heel centraal examen biologie zelf maakt, vraag voor vraag, met hulp die hij aan of uit zet. Het moet aanvoelen als het échte examen (Kamiel), maar je leert er meer van dan van het examen alleen. Kamiel vond de denkstappen 'heel leerzaam'.

Per vraag, van boven naar beneden:

1. **Wit papiervak** (`.papier`, lichte tokens) = de officiële examentekst, letterlijk: informatie sinds de vorige vraag (`pre`), figuren, tabellen, de echte foto's, en de vraagzin (`.qtext`, de vraag vet). Bovenaan per opgave de inleiding (`CTX<N>`) als papiervak.
2. **Uitleg van de stof** (uitklapblok, dicht): korte theorie, schema of klik-animatie, 1–2 knoppen naar de passende film op de site. Verraadt het antwoord niet. Verborgen in de examenstand.
3. **Hulpvragen** (donker vak, label 'niet uit het examen'): 2–3 denkstappen die de redenering opbouwen. Bij fout een hint, nooit het antwoord; bij goed kort bevestigen en doorverbinden. De laatste stap ontgrendelt het antwoordvak.
4. **Jouw antwoord op de examenvraag**: bovenaan **de examenvraag nog een keer** (klein wit vak met 'Examenvraag N' en de `.qtext`, automatisch door `open()`; Kamiel 25 okt 2026: niet terug hoeven scrollen), daaronder het antwoorden en nakijken precies volgens het correctievoorschrift.
5. **Laat zien waarom**: korte uitleg en, waar het de redenering zichtbaar maakt, een klik-animatie die déze vraag stap voor stap oplost tot het antwoord van het correctievoorschrift.

Verder: hulpstand / examenstand, schakelaar 'Vrij doorklikken' (anders pas door na nakijken), score per opgave en voor het hele examen met **het cijfer volgens de officiële omzettingstabel**, voortgang in localStorage `examen-<niveau><jj>-<tijdvak>` (bv. `examen-vwo26-1`).

## Wat Kamiel aanlevert

De pdf's van het examen (`…-o.pdf`), het correctievoorschrift (`…-c.pdf`) en een eventuele aanvulling (`…-c-a1….pdf`). De omzettingstabel staat op examenblad.nl als webpagina ('omzettingstabel normering', bij het examen); de N-term staat op de pagina 'N-termen <jaar>'. Daarnaast heeft de Examenatlas uitsneden per vraag in `examenatlas/img/<niveau>/<jaar>-<I|II>/` (`<nr>a.webp`/`<nr>b.webp` = vraag, `a<nr>a.webp` = correctievoorschrift), handig voor helpers.

## Regels

- **Examentekst letterlijk**: spelling, cursief, sub/sup, nummering van afbeeldingen en de verwijzingen '(afbeelding N)' zoals in het origineel.
- **Foto's en kaarten** komen als echte afbeelding uit de pdf: `pdfimages -png`, grijs, max 760 px breed, webp kwaliteit 80, in `tools/examen-img/<niveau>-<jaar>-<tijdvak>/`, getoond met `FOTO(naam, alt)` (klasse `.exfoto`) met `<div class="eyebrow">afbeelding N</div>` erboven. Nooit vervangen door een beschrijving tussen haken of een eigen tekening.
- **Grafieken, schema's, tabellen en stambomen** worden nagetekend (inline SVG of `table.data`), omdat de animaties ze nodig hebben. Waarden moeten kloppen: aflezen geeft hetzelfde antwoord als in het examen. Kleuren via de css-variabelen (`--text`, `--text2`, `--text3`, `--line2`, `--goud`, `--teal`, `--koraal`, `--groen`, `--paars`), nooit vaste kleuren; het moet werken in het witte papiervak én in de donkere stand.
- **Nakijken = correctievoorschrift**: punten per vraag gelijk aan het examen; meerkeuze met `mc` (goede index), juist/onjuist met `juistOnjuist` (of een variant met de deelscore van het CV), rekenen met `numAnswer` (marges zoals het CV toelaat), open vragen met `openAnswer` (één vinkje per beoordelingspunt, trouw aan het CV, de kern vet, een voorbeeldantwoord en een valkuil), combinaties met `selectAnswer` met een `score`-functie volgens het CV. Een aanvulling op het CV verwerk je in het nakijken.
- **'Kies alles wat klopt'** (`chipsStep`): de feedback zegt of er iets fout gekozen is of nog iets ontbreekt.
- **Uitleg van de stof** geeft het antwoord niet weg: theorie, niet de toepassing op de vraag. Geen voorbeeld dat op hetzelfde getal of dezelfde verhouding uitkomt, geen rijtje dat precies de goede antwoorden noemt. Films alleen uit `HOOFDSTUKKEN` in `index.html`, en alleen als ze echt over die stof gaan.
- **Toon**: kort, vriendelijk, concreet, 'je'. Geen lange gedachtestreepjes (—); gebruik een punt, dubbele punt of komma.
- **Huisstijl**: `tools/huisstijl.css` en `huisstijl.js`, donker standaard, sitebalk met '← Terug naar Examen' naar `../index.html#examens`, voettekst met © CvTE en de licentie.

## Werkwijze

1. **Geraamte**: `python3 scripts/oefenexamen/geraamte.py <werkmap buiten de repo> <niveau> <jaar> <tijdvak> <N-term> <max-punten>`. Dat maakt `geraamte.html` uit de nieuwste tool (alle bouwstenen, navigatie, `FOTO`, cijfer, herhaling van de vraag, koppeling met de uitleg, zonder opgaven), plus `samenvoegen.py`, `test.py` en een lege `frag/`. Controleer de omzettingstabel van examenblad.nl tegen `CIJFER` (de formule 9·S/L + N met de grensregels geeft precies de officiële tabel).
2. **Foto's** uit de pdf halen en in `tools/examen-img/…` zetten (zie Regels); noteer per foto bij welke opgave/vraag hij hoort.
3. **Opgaven**: per opgave een helper (meer helpers tegelijk mag), elk met een fragment `frag/opg<N>.js`: eigen figuren en teksten met voorvoegsel `O<N>_`, `const CTX<N>=…`, per vraag `Q.push({id, pts, t:"kort onderwerp", build(q){…}})` en `OPG.push({nr, kort, titel, ids, ctx})`, plus `frag/opg<N>.md` met per vraag het antwoord volgens het CV en twijfels. Bouwstenen en voorbeelden: lees de vragen van `tools/examen-havo-2026-2.html` (zoek met grep op `Q.push({id:`), niet het hele bestand. Testen met `python3 <werkmap>/test.py <N>`.
4. **Uitleg van de stof**: per opgave een blok in `tools/examen-stof.js` (zie de API bovenin dat bestand: `EXSTOF.zet(tool, [vragen], {titel, html, anim, films})` en `EXSTOF.waarom(tool, vraag, fn)` voor extra waarom-animaties). Daarna de `?v=` (md5, 8 tekens) in alle tools die het bestand laden bijwerken.
5. **Controle** door frisse helpers die het werk niet maakten: (a) elke sleutel, deelscore en elk vinkje naast het correctievoorschrift; (b) vakinhoud en 'geeft het antwoord niet weg' in de uitleg; (c) nagetekende figuren naast de pdf. Herstel wat ze vinden.
6. **Op de site**: `python3 <werkmap>/samenvoegen.py tools/examen-<niveau>-<jaar>-<tijdvak>.html`; kaart in `HOOFDSTUKKEN.examens.tools` in `index.html` (`href`, `naam`, `titel`, `opslag`, `punten`, `vragen`, `vraag`, `tekst`, `bij`); `python3 scripts/licentie_noot.py` en `python3 scripts/teller.py`; test in de browser (alle vragen open, geen fouten, telefoonbreedte zonder horizontaal scrollen, donker en licht); commit + push.

## Later aanpassen

Een wijziging aan de gedeelde opbouw (bouwstenen, navigatie, opmaak) doe je in álle oefenexamens tegelijk, zodat ze gelijk blijven, en daarna komt de nieuwe versie vanzelf in het geraamte (dat wordt uit de nieuwste tool gemaakt). Leg de nieuwe regel hier vast.
