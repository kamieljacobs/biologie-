# Biologie bij Kamiel — werkafspraken voor Claude

Statische site (GitHub Pages, branch `main`, map `/`): `index.html` is de nieuwe site (sinds 12 okt 2026; de inhoud staat als JSON in `HOOFDSTUKKEN` en `NIVEAUS` bovenin het script, hash-routes `#<hoofdstuk>`, `#films`, `#tools`). De oude site staat als `oud.html` en wordt niet meer bijgewerkt; `nieuw/` stuurt door naar de hoofdpagina. Films in `films/<hoofdstuk>/`, tools in `tools/`, `pta-route.html`. `examenatlas.html` is de Examenatlas (CE biologie 2018–2026, ingang per PTA-subonderdeel; data per niveau in `examenatlas/havo.json` en `examenatlas/vwo.json`, gemaakt met `scripts/examenatlas_bouwen.py` uit de oude claude.ai-atlas; koppeling onderwerp → subonderdeel via de methodehoofdstukken, handmatige correcties in `OVERRIDE`; de echte vragen en antwoorden staan als webp-uitsneden in `examenatlas/img/<niveau>/<examen>/` (`<nr>a.webp` = vraag met info sinds de vorige vraag, `a<nr>a.webp` = beoordelingsmodel), gemaakt met `scripts/examenknip/knip.py`, `knip_c.py` en `knip_u.py` (`u<nr>a.webp` = deel van de uitwerkbijlage) uit de pdf's van Kamiel en gekoppeld met `scripts/examenatlas_vragen.py` — draai dat opnieuw na `examenatlas_bouwen.py`). `challenges.html` is een aparte pagina met biologische challenges (hoofdvraag + subvragen); een nieuwe challenge = blok in `CHALLENGES` plus een lijntekening in `KUNST` (sleutel = id), bovenin het script van die pagina.

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

## Licentie

Alles op de site valt onder CC BY-NC-SA 4.0 (© Kamiel Jacobs; uitleg in `gebruik.html`, tekst in `LICENSE.md`; examenvragen in de Examenatlas © CvTE). Elke pagina draagt onderaan of in de footer de licentievermelding: draai `python3 scripts/licentie_noot.py` na het toevoegen van een nieuwe pagina, film of tool (idempotent).

## Presentaties bij films

Een film kan een klassikale presentatie krijgen: `films/<hoofdstuk>/<film>/presentatie.html` (of naast `<slug>.html`), gemaakt met `python3 scripts/presentatie.py <spec.json> <uit.html>` uit een JSON-spec met dia's (`titel`, `inhoud`, `samenvatting`; Kamiel wil weinig tekst per dia, géén denkvragen en eigen schema's (SVG in `presentatie/svg/`, veld `svg`) in plaats van stills uit de film; uitleg hoort in `notities`). Zet de spec en de beelden in een map `presentatie/` naast de film, en voeg in `HOOFDSTUKKEN` bij de film het veld `"pres": "<pad>"` toe: dan verschijnt er een knop Presentatie. Noteer de presentatie in `bron/info.md` van de film. Voorbeeld: Celorganellen.

## Reviewstatus van films

Kamiel bekijkt de films en geeft feedback. De status staat in `REVIEW` bovenin het script van `index.html` (sleutel = href van de film): ontbreekt = nog bekijken, `'feedback'` = opmerkingen nog te verwerken, `'ok'` = klaar. Alleen zichtbaar als stipje met `?k=1` (uit met `?k=0`). Werk dit bij zodra Kamiel een film bekeken heeft of feedback verwerkt is; een nieuwe of flink aangepaste film krijgt weer status 'nog bekijken'.

## Beeldafspraken

Algemene beeldfeedback van Kamiel staat in `films/BEELDAFSPRAKEN.md`: lees die vóór elke nieuwe of aangepaste film en vul hem aan als feedback voor meerdere films geldt.

## Personages

Vaste personages staan in `personages/lib_cast.js` (castboek: `personages/index.html`, niet gelinkt, noindex; opnieuw bouwen met `scripts/castboek.py`). Gebruik ze in nieuwe films.

