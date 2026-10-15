# Van molecuul tot biosfeer — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/cellen/van-molecuul-tot-biosfeer.html (audio in films/cellen/van-molecuul-tot-biosfeer/audio/) |
| Reeks / nummer | Cellen, korte losse film (aanvulling Cellen: "doe een korte van 5 min", met differentiatie, Kamiel 14 okt 2026). Sluit aan op Celorganellen (levenskenmerken) en Van cel tot lichaam (onderbouw) |
| Doelgroep / niveau | havo + vwo, begin bovenbouw; vwo-blok gelabeld: s13 (emergente eigenschappen van een populatie; leven als emergente eigenschap). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow 4gDMk8mMxONkvHlgf7ga "Cellen · Van molecuul tot biosfeer"; nodes in `stem/takes.json`) |
| Duur | spraak 6:11 (vwo) / 5:42 (havo). Speeltijd met kaarten en vragen: vwo ≈ 7 min, havo ≈ 6,5 min |
| Beeldstijl | Part C: Macro (Noor in bed met griep, zoomcirkel neus en keel, deur met deurklink), Schema (bord met levenskenmerken, koolmees, ladder van elf niveaus met de zeven examenniveaus vetter, eiwit, celkern, spiercel, spierweefsel, hart, bloedvatenstelsel, populatie koolmezen, merel, rups, eik, paddenstoel, onderzoeker met thermometer en bodem, rupsenpiek tegenover jonge koolmezen, aarde), Micro (bevruchte eicel die deelt en differentieert met 'genen aan', griepvirus met RNA, eiwitmantel en vetlaagje naast een bacterie, gastheercel die virussen maakt). Kleuren in `scenes.js`: `VIR`, `RNA`, `VET`, `MEES_G`, `MEES_B`, `SPIER`, `ZENUW`, `HUIDC`, `BAC` |
| Audio-opslag | 13 losse mp3's in audio/ (s01 … s16), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en `lib_hormonen.js` (`person`, `circ`); helpers `tag`, `regel`, `kruis`, `vink` uit de afweerreeks; alle figuren nieuw getekend |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` + `sections.html` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen; checkvragen en docentdeel staan in `sections.html` |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js`, `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` (reeks) en **`uitspraak_film.json`** (alleen deze film: homeostase, emergente, abiotische) |
| `reviews/` | Expert (cel, ecologie, virologie), didactiek + taal, curriculum (met checkvragen, ook los in `checkvragen.html`), eindreview `eind.md` |

**Werkmap opzetten:** maak `c1/` met `script_v2.md`, `film.py`, `sections.html`, `scenes.js` (uit `src/`), `uitspraak_film.json` (uit `bouw/`), `words/` (= `stem/woordtijden/`) en `film/van-molecuul-tot-biosfeer/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py c1 script_v2.md && (cd c1 && python3 film.py) && python3 engine/build_data.py c1 && python3 engine/build.py c1` → `c1/film/van-molecuul-tot-biosfeer.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | C · Macro | Noor in bed met griep; zoomcirkel met griepvirussen in neus en keel; griepprik; deurklink met één virus (eet niet, groeit niet); vraag q02 (antwoord in s15 en de recap) |
| Titel | Schema | Ladder van elf niveaus, koolmees |
| H1 Wat is leven? (s04–s05) | C · Schema | Bord met zes levenskenmerken; koolmees vinkt ze af (rupsen, ei, legt, vliegt, warm); los eiwit leeft niet; bacterie = één cel, leeft; de cel is het kleinste niveau dat leeft; virus "straks" |
| H2 De ladder (s06–s13) | B · Schema/Micro | Ladder met de koolmees: eiwit, celkern, spiercel; differentiatie (bevruchte eicel deelt, spier-, zenuw- en huidcel, dezelfde DNA-streng met andere genen aan); spierweefsel, hart, hart + bloedvaten, koolmees; bacterie: cel = organisme; populatie koolmezen, merel, rups, eik, paddenstoel; onderzoeker met temperatuur en bodem, vraag q10; ecosysteem met zon, water, bodem en de rupsenpiek die te vroeg komt; aarde = biosfeer; spiercel tegenover hart: emergente eigenschap. Vwo s13: populatie met dichtheid, geboortecijfer en evolutie; losse moleculen tegenover een cel |
| H3 Leeft een virus? (s14–s15) | C · Micro | Virus naast de ladder ("geen cel"); RNA, eiwitmantel, vetlaagje; virus krimpt op schaal naast de bacterie; bord met kruisjes; virus dringt de cel van Noor binnen en de cel maakt nieuwe virussen; antwoord a; grensgeval; erfelijk materiaal = een molecuul |
| Recap (s16) | Schema | Ladder van cel tot biosfeer met het virus ernaast; koolmees en Noor verbonden met 'organisme' |
| Eindkaart (s17) | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Leeft een griepvirus? | a nee: het heeft geen eigen stofwisseling, het laat een cel werken (onthulling in s15 en de recap s16) |
| q10 | basis | Een onderzoeker telt rupsen en eiken, en meet temperatuur en bodemvocht. Welk niveau? | b een ecosysteem |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling staat wél in de audio van s11, s15 en s16.

Checkvragen (statisch in de pagina): 1 Een sloot in de polder (niveaus ordenen, levensgemeenschap tegenover ecosysteem, populatie, eencellige) · 2 Leeft het of niet? (muildier, tarwezaad, griepvirus, prion) · 3 Reus of dwerg (griepvirus, mimivirus, Chlamydia, E. coli, tetracycline, emergentie; vwo).

Begrippen: levenskenmerken, homeostase, organisatieniveaus, weefsel, orgaanstelsel, differentiatie, populatie, levensgemeenschap, ecosysteem, biotische en abiotische factoren, biosfeer, emergente eigenschap, virus.

## Waar wat in de HTML zit (regelnummers in `van-molecuul-tot-biosfeer.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Cellen" |
| 76–99 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 100–165 | Checkvragen (100–131), Voor de docent (132–165) |
| 166 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 167–388 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 389–959 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 960–1210 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1211–1270 | `scenes.js`: hulpstukken van deze film |
| 1271–1392 | `SCENES`: title 1272 · s01 1274 · s04 1282 · s05 1293 · s06 1299 · s07 1305 · s08 1319 · s09 1328 · s11 1340 · s12 1353 · s13 1358 · s14 1366 · s15 1379 · s16 1385 |
| 1393–1560 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py` (met `uitspraak_film.json` in de werkmap), neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'Neem' vindt ook 'neemt' en 'orgaan' ook 'orgaanstelsel').
- **Figuren:** `ladder(ctx, lit[11], {x, y0, dy, a, cur, virus, t})` (lit = helderheid per niveau, `cur` = gemarkeerd niveau, `virus` = het virus naast de ladder; `NIV` en `EXAMEN` bovenin), `bord(ctx, x, y, w, rijen, kolommen)` (levenskenmerken met vinkjes en kruisjes), `griepvirus`, `koolmees`, `merel`, `rups`, `eik`, `paddenstoel`, `eiwit`, `celkern`, `spiercel`, `zenuwcel`, `huidcel`, `bolcel`, `hart`, `aarde`, `bacterieC`, `deur`, `noorBed`.
- **Checkvragen of docentdeel:** `sections.html` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md` (homeo-staaze, ee-mer-gente, aa-biotische, biosfeer). Een blinde controle was in deze sessie niet mogelijk.
- De lijst levenskenmerken verschilt per methode; de film zegt dat ook. Controleer of de lijst past bij je eigen editie van Biologie voor jou en Nectar.
- Eindreview: 12 punten, alle verwerkt zonder nieuwe opname (zie `reviews/eind.md`).

## Wijzigingen

- 15 okt 2026 (versie 1.1): s11, s12, s13 en s16 opnieuw ingesproken na feedback van Kamiel: 'abiotische' zonder dubbele a (stem-invoer `abiotische`), 'emergente' met klemtoon op gen (`emergénte`); in s13 is "Voor vwo gaan we hier nog een stap verder." weggelaten (havo/vwo kies je in de speler). Let op: regelnummers en tijden hierboven kunnen enkele seconden verschoven zijn.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'erfelijk materiaal (RNA)', 'eiwitmantel', 'vetlaagje'. Gecontroleerd op stills van alle scènes met namen. Ook doorgevoerd in `bron/src/lib.js` en `bron/src/scenes.js`.
