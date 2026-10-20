# Biologie bij Kamiel — werkafspraken voor Claude

Statische site (GitHub Pages, branch `main`, map `/`): `index.html` is de nieuwe site (sinds 12 okt 2026; de inhoud staat als JSON in `HOOFDSTUKKEN` en `NIVEAUS` bovenin het script, hash-routes `#<hoofdstuk>`, `#films`, `#tools`). De oude site staat als `oud.html` en wordt niet meer bijgewerkt; `nieuw/` stuurt door naar de hoofdpagina. Films in `films/<hoofdstuk>/`, tools in `tools/`, `pta-route.html`. `examenatlas.html` is de Examenatlas (CE biologie 2018–2026, ingang per PTA-subonderdeel; data per niveau in `examenatlas/havo.json` en `examenatlas/vwo.json`, gemaakt met `scripts/examenatlas_bouwen.py` uit de oude claude.ai-atlas; koppeling onderwerp → subonderdeel via de methodehoofdstukken, handmatige correcties in `OVERRIDE`; de echte vragen en antwoorden staan als webp-uitsneden in `examenatlas/img/<niveau>/<examen>/` (`<nr>a.webp` = vraag met info sinds de vorige vraag, `a<nr>a.webp` = beoordelingsmodel), gemaakt met `scripts/examenknip/knip.py`, `knip_c.py` en `knip_u.py` (`u<nr>a.webp` = deel van de uitwerkbijlage) uit de pdf's van Kamiel en gekoppeld met `scripts/examenatlas_vragen.py` — draai dat opnieuw na `examenatlas_bouwen.py`). `challenges.html` is een aparte pagina met biologische challenges (hoofdvraag + subvragen); een nieuwe challenge = blok in `CHALLENGES` plus een lijntekening in `KUNST` (sleutel = id), bovenin het script van die pagina. `vervolg.html` ('Wat word jij?', studie en beroep) toont vervolgopleidingen per richting (`CLUSTERS`) en gebied (`GEBIEDEN`); per gebied staan de extra films voor dat vak, buiten het PTA (`basis`; een geplande film is een object `{titel, vraag, opbouw, nieuw, bouwt, advies, was, id}` en verschijnt als uitklapbare 'komt nog'-rij met startvraag, hoofdstukken, wat hij toevoegt en de PTA-films waarop hij voortbouwt; dezelfde `id` in meerdere gebieden = één gedeelde film; `schrappen:true` + `reden` = voorstel om te schrappen, alleen zichtbaar met `?k=1`; de films mogen buiten de biologie gaan en laten zien wat je in dat vak echt doet: methoden, gesprekken, techniek, beleid; een af onderwerp wordt `[titel, href]`; zulke films staan in `films/vervolg/`, duur in `films/vervolg/films.json`), en apart daarvan bestaande films uit de lesstof (`pta`: lijst met hrefs, op de pagina 'Al op de site · uit de lesstof (PTA)'; dit blok staat sinds 20 okt 2026 op Kamiels verzoek uit via `TOON_PTA=false` in vervolg.html, de data blijft staan; ook het blok 'De gedeelde kern' (`KERN`) staat uit via `TOON_KERN=false`: Kamiel vindt dat leerlingen eerst het hele curriculum doen voordat ze deze films kijken). Titels en hoofdstuk van die films komen uit `FILMS` in vervolg.html: draai `python3 scripts/vervolg_films.py` na het toevoegen of hernoemen van films (meldt ook dode hrefs). Stap 4 'Opleidingen' (sinds 20 okt 2026, eerst alleen psychologie als voorbeeld): veld `opleidingen` per gebied `{gecontroleerd, jaar, routes:[{niveau, naam, waar, duur, toelating, selectie, link}], let, doorstroom, kennismaken, meer:[[tekst,url]]}`, getoond door `opleidingenBlok` in het tabblad Stap 4. Elke gebiedskaart heeft sinds 20 okt 2026 een tabrij met de 4 stappen (`STAPPEN`, panelen `data-paneel`); Stap 1 (de films) staat standaard open, stap 2/3 en een stap 4 zonder data tonen een 'komt later'-tekst; instellingen dicht bij huis eerst (Radboud, HAN, ROC Nijmegen, Wageningen), feiten opzoeken en datum bijwerken. Stap 2 'Een dag uit het werk' volgt (pilot psychologie); stap 3 'Praktijkopdracht' blijft bewust 'later' tot de tools beter zijn, ideeën per gebied in `films/vervolg/STAP3-WENSEN.md`.

## Elke nieuwe of aangepaste film krijgt een bronmap

Kamiel wil films later makkelijk kunnen aanpassen. Daarom geldt bij **elke** film die op de site komt:

1. Zet de film in `films/<hoofdstuk>/` (eigen bestanden, nooit een link naar claude.ai).
2. Maak in **dezelfde commit** de bronmap `bron/` naast de film (zie `films/BRONMAPPEN.md` voor de plek):
   - `bron/info.md` — kenmerken (bestand, reeks, niveau, versie/datum, stem, duur, beeldstijl, audio-opslag, herkomst), opbouw per hoofdstuk, vragen met antwoord, begrippen, docentdeel, **waar wat in de HTML zit** (met regelnummers uit `film.src.html`) en **hoe je de film aanpast**, plus aandachtspunten.
   - `bron/script.md` — de gesproken tekst per hoofdstuk/segment met tijden en het bijbehorende audiofragment.
   - Maak je de film zelf: schrijf de stem-invoer met respellings (uitspraaklijst) en het ElevenLabs-model erbij; die staan niet in de HTML en zijn later niet terug te halen.
3. Hulpmiddelen: `python3 scripts/filmbron.py uitpakken <film.html> <werkmap>` (werkmap buiten de repo); voor films in de "Uitgelegd"-engine maakt `scripts/maakbron_uitgelegd.py` een eerste versie van info.md en script.md die je daarna nakijkt.
4. Voeg de film toe aan de tabel/bouwvormen in `films/BRONMAPPEN.md` als het een nieuwe bouwvorm is.
5. Zet in de film de sitebalk (`<nav class="sitenav">`) met "← Terug naar <hoofdstuk>" naar `index.html#<hoofdstuk>`. Voeg de film toe aan `HOOFDSTUKKEN.<hoofdstuk>.films` in `index.html` (href, titel, vraag, tekst, duur, bij) en geef hem een lijntekening in `FILMKUNST` (sleutel = bestandsnaam zonder .html). Een nieuw hoofdstuk krijgt een eigen `HOOFDSTUKKEN`-blok, een kleur in `KLEUR` en een verwijzing (`#<id>`) in `NIVEAUS`.

Controle vóór elke push: `find films -name '*.html' -not -path '*/bron/*'` mag geen film opleveren zonder bronmap.

## Speler: snelheid en Vragen aan/uit

Elke film heeft in de speler een **afspeelsnelheid** (0,75 / 1 / 1,25 / 1,5×) en een knop **Vragen aan/uit**. Beide worden onthouden over alle films heen (localStorage `bk-snelheid` en `bk-vragen`; ook `?snelheid=` en `?vragen=`). Bij Vragen uit vallen de vraagkaarten weg en wordt de gesproken vraagzin geknipt. Kamiel wil dit bij alle video's (16 okt 2026). Een nieuwe film in de FILMDATA-bouwvorm neemt de speler over van `films/gedrag/5-emotieregulatie/bron/src/player.js` (actueel, met spelerfix); veel andere `bron/src/player.js` zijn verouderd (geen Vragen aan/uit) en mogen niet als bron dienen. Bij Vragen uit knipt de speler in de echte stilte vóór de vraag en dempt tot na de sprong; hoofdstukkaart 1,3 s (20 okt 2026). Draai `python3 scripts/spelerfix.py` na elke (her)bouw of nieuwe audio, controle `python3 scripts/spelerfix.py --check` en `grep -L bk-vragen` op de films mag niets opleveren. Details: `films/BRONMAPPEN.md`.

## Flipkaarten bij begrippen

Elke film met een begrippenlijst (`<div id="glossary">` met `.term` = `<b>begrip</b><p>uitleg</p>`) krijgt boven de lijst een knop 'Oefen met flipkaarten' (`js/flipkaarten.js`: omdraaien, wist ik / nog oefenen, schudden, uitleg eerst, gemiste opnieuw; alleen zichtbare begrippen, dus in de havo-stand zonder vwo-begrippen). Draai `python3 scripts/flipkaarten.py` na het toevoegen van een film (idempotent).

## Zelf aan de slag (oefeningen)

Onder de begrippen (na de sectie met `#glossary`) kan een film een blok 'Zelf aan de slag' krijgen (`js/oefenen.js`, alles in de browser, niets verstuurd; kop gekloond van de kop 'Begrippen', kaartjes in flipkaartstijl, licht/donker volgt de pagina). Kamiel akkoord 18 okt 2026: alleen bij films waar het goed past (processen, bouw, examenwaardige waarom-vragen), niet bij elke film. Data per film in `oefenen.json`: naast `index.html` in dezelfde map, of bij `<slug>.html` in `<slug>/oefenen.json`. Formaat: `{"intro", "oefeningen": [...]}`, elke oefening heeft `id` (uniek, ook sleutel voor localStorage), `soort`, `titel`, `opdracht` en optioneel `"vwo": true` (verborgen in de havo-stand, `body.havo`). Soorten: `volgorde` (`stappen`: 4–7 × `{tekst, uitleg}` in de júiste volgorde; de pagina zet ze geschud in een bak naast lege genummerde plekken, slepen of tikken; stappen met dezelfde `groep` mogen onderling wisselen, gebruik dat als twee stappen tegelijk gelden), `schema` (`svg` = binnenkant van een eigen lijntekening, `breed`/`hoog` = viewBox, `vakbreed`; `vakjes`: `{naam, x, y, punt:[x,y], uitleg}` met x/y = midden van het vakje en punt = waar de wijslijn eindigt; optioneel `afleiders`; klassen `acc` (goud), `vul`, `zacht`; onder 600 px worden de vakjes een genummerde lijst) en `uitleg` ('Leg het uit': `begrippen` = `{naam, varianten[]}` met stam-/voorvoegselmatching, `checklist` (3–4 punten, leerling vinkt zelf af), `model` = lijst alinea's). Een film toevoegen: maak het JSON-bestand (inhoud uit `bron/script.md` en de begrippenlijst) en draai `python3 scripts/oefenen.py` (zet de scripttag met `data-oefenen` idempotent in de film en controleert de JSON; werkt ook `OEFENEN` in `index.html` en `oefenlijst.json` bij: in de filmlijst krijgt de film een knop 'Oefenen' en een rij aanklikbare opdrachten, die openen op de losse oefenpagina `oefenen.html?film=<href>#<id>` (zonder `film` = overzicht van alle films met oefeningen); in de film zelf opent `#oe-<id>` één opdracht). Antwoorden worden per film bewaard (sleutel = pad van oefenen.json), dus filmpagina en oefenpagina delen ze. De pilotdata is gegenereerd met een hulpscript; bewerk voortaan gewoon het JSON-bestand.

## Tabellen op de telefoon

Tabellen in films scrollen op een smal scherm horizontaal binnen de tabel (anders werd de hele pagina breder): draai `python3 scripts/tabel_mobiel.py` na het toevoegen van een film met een tabel (idempotent).

## Licentie

Alles op de site valt onder CC BY-NC-SA 4.0 (© Kamiel Jacobs; uitleg in `gebruik.html`, tekst in `LICENSE.md`; examenvragen in de Examenatlas © CvTE). Elke pagina draagt onderaan of in de footer de licentievermelding: draai `python3 scripts/licentie_noot.py` na het toevoegen van een nieuwe pagina, film of tool (idempotent).

## Presentaties bij films

Een film kan een klassikale presentatie krijgen: `films/<hoofdstuk>/<film>/presentatie.html` (of naast `<slug>.html`), gemaakt met `python3 scripts/presentatie.py <spec.json> <uit.html>` uit een JSON-spec met dia's (`titel`, `inhoud`, `samenvatting`; Kamiel wil weinig tekst per dia, géén denkvragen en eigen schema's (SVG in `presentatie/svg/`, veld `svg`) in plaats van stills uit de film; uitleg hoort in `notities`). Zet de spec en de beelden in een map `presentatie/` naast de film, en voeg in `HOOFDSTUKKEN` bij de film het veld `"pres": "<pad>"` toe: dan verschijnt er een knop Presentatie. Noteer de presentatie in `bron/info.md` van de film. Voorbeeld: Celorganellen.

## Geplande films ('komt nog')

Geplande films staan per hoofdstuk in `HOOFDSTUKKEN.<id>.komt` (titel, vraag, niveau) en verschijnen grijs met 'komt nog'. Zodra een film af is: haal hem uit `komt` en zet hem in `films`. Films buiten het PTA staan in het hoofdstuk `extra` (op de site: 'Nieuwsgierig?').

## Reviewstatus van films

Kamiel bekijkt de films en geeft feedback. De status staat in `REVIEW` bovenin het script van `index.html` (sleutel = href van de film): ontbreekt = nog bekijken, `'feedback'` = opmerkingen nog te verwerken, `'ok'` = klaar. Alleen zichtbaar als stipje met `?k=1` (uit met `?k=0`). Werk dit bij zodra Kamiel een film bekeken heeft of feedback verwerkt is; een nieuwe of flink aangepaste film krijgt weer status 'nog bekijken'.

## Uitspraak

Goedgekeurde uitspraken staan centraal in `films/UITSPRAAK.md` (leesbaar) en `films/uitspraak.json` (vervangregels voor de stem-invoer). Gebruik ze bij elke nieuwe of opnieuw ingesproken film. Nieuwe risicowoorden gaan op de wachtlijst van de film (`bron/uitspraak.md`) en worden in batches getest met de luisterpagina Uitspraaktest (claude.ai-artifact, keuzes in collectie `keuzes`); goedgekeurde keuzes daarna in beide centrale bestanden zetten.

## Beeldafspraken

Algemene beeldfeedback van Kamiel staat in `films/BEELDAFSPRAKEN.md`: lees die vóór elke nieuwe of aangepaste film en vul hem aan als feedback voor meerdere films geldt.

## Huisstijl van tools

Tools gebruiken dezelfde opmaak als site en films via `tools/huisstijl.css` (kleuren als variabelen, licht/donker, Fraunces/Source Sans 3/IBM Plex Mono, sitebalk, knoppen, panelen, voet) en `tools/huisstijl.js` (themaknop met `data-thema-knop`, zelfde voorkeur `thema` als de site). Nieuwe of aangepaste tools gebruiken die; geen eigen lettertypes of vaste kleuren. Al omgezet: Aardappellab, Eiwitfabriek (Celbouwer en Virtuele microscoop zaten al dicht bij de stijl); de overige tools volgen.

## Personages

Vaste personages staan in `personages/lib_cast.js` (castboek: `personages/index.html`, niet gelinkt, noindex; opnieuw bouwen met `scripts/castboek.py`). Gebruik ze in nieuwe films.

## Kijkcijfers

Elke pagina laadt `js/teller.js` (GoatCounter `biologiebijkamiel`, zonder cookies). Films tellen daarnaast `start/`, `halverwege/` (±45% van `duur` aan afgespeeld geluid) en `uitgekeken/` (±85%) als gebeurtenis; de duur komt uit `HOOFDSTUKKEN` en staat als `data-duur` op de scripttag. Draai `python3 scripts/teller.py` na het toevoegen van een nieuwe pagina, film of tool, of na het wijzigen van een filmduur (idempotent). Elke nacht haalt `.github/workflows/statistieken.yml` (secret `GOATCOUNTER_TOKEN`) de totalen op met `scripts/statistieken_ophalen.py` naar `statistieken/data.json`; het dashboard is `statistieken/index.html` (niet gelinkt, noindex).


## Reviewtool

Kamiel geeft zijn oordeel over films in de artifact Filmreview (https://claude.ai/artifact/5X2WM9veyo6tNJMVFGnAF5, bron `/home/claude/filmreview/filmreview.html`, db-collectie `status`: doc-id = href met niet-alfanumeriek → `_`, velden `href`, `status` ('open'/'feedback'/'ok'), `notitie`, `tijd`). Lees die collectie aan het begin van een werkronde, verwerk feedback en zet `REVIEW` in `index.html` gelijk. Nieuwe films: draai de filmlijst opnieuw in de pagina en publiceer.

## Zuinig met tokens (20 okt 2026)

- Feedback bundelen: Kamiel zet opmerkingen per film in de Filmreview; Claude leest ze in één keer en verwerkt ze per film in één ronde.
- Hooguit 3–4 helpers tegelijk; geef elke helper een korte brief met verwijzingen (niet de inhoud overtypen).
- Routinewerk (ondertitels, REVIEW, scripts draaien, kleine tekstfixes, herinspreken volgens een lijst) met een helper op `model: sonnet`; script schrijven, vakinhoud en nieuw beeld ontwerpen op het sterkste model.
- Lees geen hele film-HTML (1000+ regels): zoek met grep of gebruik de regelnummers uit `bron/info.md`.
- Stills alleen van de gewijzigde scènes bekijken, op lage resolutie; Playwright alleen op de gewijzigde film.
- Geen 'alle films nalopen' tenzij het om een fout in de gedeelde speler gaat; gebruik de idempotente scripts.
- Lange sessies worden duur (alles wordt steeds opnieuw meegestuurd): start per groot thema een nieuwe sessie; de afspraken staan hier en in de bronmappen.
