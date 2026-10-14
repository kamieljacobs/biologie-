# Biologie bij Kamiel — werkafspraken voor Claude

Statische site (GitHub Pages, branch `main`, map `/`): `index.html` is de nieuwe site (sinds 12 okt 2026; de inhoud staat als JSON in `HOOFDSTUKKEN` en `NIVEAUS` bovenin het script, hash-routes `#<hoofdstuk>`, `#films`, `#tools`). De oude site staat als `oud.html` en wordt niet meer bijgewerkt; `nieuw/` stuurt door naar de hoofdpagina. Films in `films/<hoofdstuk>/`, tools in `tools/`, `pta-route.html`. `challenges.html` is een aparte pagina met biologische challenges (hoofdvraag + subvragen); een nieuwe challenge = blok in `CHALLENGES` plus een lijntekening in `KUNST` (sleutel = id), bovenin het script van die pagina.

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
