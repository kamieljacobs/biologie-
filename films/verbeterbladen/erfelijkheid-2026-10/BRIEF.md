# Brief: lichte remake fase 1, Erfelijkheid 2–6 (28 okt 2026)

Je werkt voor Kamiel (biologiedocent). Repo: /home/claude/biologie- (lees eerst CLAUDE.md, vooral 'Elke nieuwe of aangepaste film krijgt een bronmap', 'Bronnenlogboek', 'Speler', 'Personages', 'Gericht of remake', 'Lessen uit opmerkingen', 'Zuinig met tokens'). Kamiel heeft de erfelijkheidsfilms 2–6 bekeken en koos (28 okt 2026) voor een **lichte remake** per film (prompt v13 B16 in CLAUDE.md: oud script als geraamte en kritisch nagelopen, één script zonder B15-varianten, nieuw beeld en nieuwe stem op de nieuwste prompt, bronnenlogboek, frisse beeldreview; oude film in `bron/oud/` en online tot Kamiel de nieuwe goedkeurt).

Jij doet **fase 1** voor één film: script, storyboard, keyframes, twijfelscènes, uitspraakwachtlijst, bronnenlogboek. Daarna maakt de hoofdsessie één keuringsblad voor alle vijf films; pas na Kamiels keuring volgt fase 2 (stem en bouwen).

## Voorbeeld om na te doen
De lichte remakes van 25–26 okt: `films/dna/1-wat-is-dna/bron/remake-2026-10/` (script_v2.md, storyboard.json, keyframes/, tekeningen/, twijfel.md, uitspraak.md, bronnen.md, samenvatting.md) en hoe het keuringsblad ze gebruikt: `films/verbeterbladen/remake-2026-10/bouw_blad.py`. Volg die vorm precies, dan kan de hoofdsessie het blad zo bouwen.

## Wat je laadt (Laadwijzer prompt v13, niet de hele prompt)
- `films/PROMPT_v13.md`: B1–B4 (script), B6–B7 (storyboard, storyboardkeuring), C1–C6 en C8 (beeld), C10 + alleen de C9-recepten die je nodig hebt (nieuwe tekening), B5 (uitspraak).
- `films/BEELDAFSPRAKEN.md` (gaat vóór de prompt), `films/WERKWIJZE-LESSEN.md` (kandidaatlessen), `films/BRONNEN.md` (bronnenlogboek).
- Beeldbank: `bibliotheek/README.md`, `bibliotheek/lib_bio.js` en Kamiels nieuwste keuzes (28 okt 2026): **rustig, simpel, minimalistisch** ('DNA is al moeilijk genoeg'), eiwitten als **kralenketen**, minder paars, meer contrast tussen rood, groen en blauw. Zie `bibliotheek/verbeterronde-1/` en `-2/` (KENMERKEN.md, LEESMIJ.md). Dieren: `bibliotheek/dieren/` (uitknippop-rigs).
- Personages: `personages/LEVENSLOOP.md`, `personages/ROLLEN.md`, `personages/lib_cast.js`. Castpersonages in bovenbouwfilms worden **niet bij naam genoemd** in de gesproken tekst (27 okt 2026); ze staan wel in beeld. Gezin De Wit (film 1, albinisme, genotypen liggen vast) mag terugkomen waar het past; Sanne staat al in film 6. Nieuwe rol of gebeurtenis voor een vast personage = twijfelscène.
- Uitspraak: `films/UITSPRAAK.md` + `films/uitspraak.json`. **allel, allelen, gameet/gameten en de bloedgroepgenotypen (Iᴬ, Iᴮ, i) zijn nu in een aparte test bij Kamiel.** Schrijf ze in de stem-invoer gewoon uit en zet ze bovenaan je uitspraak.md als 'wacht op test 28 okt'. 'erwten' = 'erten' (al vastgesteld). Zoek voor andere risicowoorden de IPA op (afspraak Kamiel).

## De oude film
- Bronmap: `<film>/bron/info.md` en `bron/script.md` (één doorlopende take, oud model, oude engine). Grep in de HTML, lees hem niet helemaal. Uitpakken: `python3 scripts/filmbron.py uitpakken <film.html> <werkmap>`.
- De opmerkingen van Kamiel staan in `films/verbeterbladen/erfelijkheid-2026-10/opmerkingen.json` (sleutel = jouw film). **Elke opmerking komt terug** in het script, een twijfelscène of een keuze in samenvatting.md (met zijn id). De antwoorden op zijn vragen staan erbij; verwerk ze in de film.

## Bouwstraat voor de keyframes
De nieuwe film wordt gebouwd in de FILMDATA-straat zoals Chromosomen 2.1: engine in `films/erfelijkheid/1-chromosomen/bron/src/` + `bron/bouw/` (lees `films/erfelijkheid/1-chromosomen/bron/info.md`, 'Zo pas je deze film aan'). **Werk in een eigen map** `/home/claude/hw/<sleutel>/` met een eigen kopie van de engine (niet in een gedeelde engine-map: die werd eerder door een andere film overschreven). Maak keyframes (960 px, webp) van de twijfelscènes en een handvol kernscènes met een tijdelijke stilte-tijdlijn; Playwright en Chromium staan klaar (`require('playwright')`, niet opnieuw installeren). Nieuwe tekeningen als code in `remake-2026-10/tekeningen/`; gedeelde objecten pas na keuring naar `bibliotheek/lib_bio.js`.

## Niveau
De films stonden als vwo bovenbouw; op de site horen ze bij havo én vwo. Film 1 (2.1) is één niveau voor havo en vwo. Kijk in de syllabi (havo/vwo biologie, CvTE) welke delen vwo-only zijn; gebruik daarvoor vwo-blokken volgens prompt v13 (twee niveaus, B4) en zet de keuze als twijfelscène als het niet vanzelf spreekt. Houd de reeks consistent met film 1 (begrippen, notatie A/a, kleuren vader teal / moeder oker, kruisingsschema als in de vooruitblik van film 1).

## Grenzen
- Geen ElevenLabs-stem in fase 1. Hooguit één referentieplaat (één variant, ± 190 credits) als een nieuw dier of organisme anders niet goed te tekenen is; noem het in samenvatting.md.
- Schrijf alleen in `<film-map>/bron/remake-2026-10/` en `/home/claude/hw/<sleutel>/`. Niet committen, geen repo-brede scripts draaien, geen artifacts publiceren, niets aan andere films.
- Geen 'alle films nalopen'.

## Uitvoer
In `<film-map>/bron/remake-2026-10/`: `script_v2.md` (gesproken tekst per alinea + stem-invoer + vragen met antwoord, en per wijziging t.o.v. de oude film waarom), `storyboard.json`, `keyframes/`, `tekeningen/`, `twijfel.md` (alleen echte twijfel of keuzes voor Kamiel, met voorstel en alternatief, zoals het DNA-voorbeeld), `uitspraak.md`, `bronnen.md` (volgens films/BRONNEN.md; een `!` met ≥ 2 bronnen waarvan ≥ 1 niveau A pas je zelf aan), `samenvatting.md` (zoals het DNA-voorbeeld, met aantal takes, geschatte duur havo/vwo, credits stem ± 700 per minuut, verwerking van elke opmerking van Kamiel per id). Draai `python3 scripts/scriptcheck.py` op je script.

Eindbericht: alleen het pad van samenvatting.md, het aantal twijfelscènes en in 3 regels de belangrijkste keuzes.
