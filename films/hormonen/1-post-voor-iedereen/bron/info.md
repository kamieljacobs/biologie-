# Post voor iedereen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/hormonen/1-post-voor-iedereen.html (audio in films/hormonen/1-post-voor-iedereen/audio/) |
| Reeks / nummer | Hormonen, film 1 van 5 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s09 (endocrien/exocrien, hypothalamus als schakel), s15–s18 met vraag q17 (membraanreceptor en signaaltransductie tegenover steroïdhormoon). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow MMVz2cMbifnhMLPuXMzr; nodes en sessies in `stem/takes.json`) |
| Duur | spraak 7:51 (vwo) / 6:00 (havo). Speeltijd met kaarten en vragen: vwo ≈ 9½ min, havo ≈ 7½ min |
| Beeldstijl | Part C: Macro (klaslokaal, cold open), Schema (navy #1A2740: lichaamskaart met klieren, bloedbaan, tabellen, bak met kraan, grafiek), Micro (#121A26: doelcellen, membraan, kern); UI-laag vast; canvas 1920×1080. Seriekleuren in `lib_hormonen.js` (`HK`): hormonen goud met eigen vorm (adrenaline druppel, insuline zeshoek, glucagon ruit, cortisol ring, thyroxine ster, ADH driehoek), klieren oker, zenuw paars, bloed #B5574A, receptor #AFC0D0 |
| Audio-opslag | 19 losse mp3's in audio/ (s01 … s23), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`), aangevuld met de seriebibliotheek `lib_hormonen.js` (nieuw; bevat ook `personReal` uit de DNA-bouwstraat) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen met bronnen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen, checkvragen en docentdeel (HTML) |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow, node en sessie per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js` (seriebibliotheek), `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py` (leest `lib_voeding.js` + `lib_hormonen.js`), `stills.py`, `fake_words.py`, `uitspraak_subs.json` |
| `reviews/` | Expert (endocrinoloog), didactiek + taal, curriculum (havo/vwo-CE), eindreview (fresh eyes, na de bouw) |

**Werkmap opzetten:** maak `f1/` met `script_v2.md`, `film.py`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/1-post-voor-iedereen/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f1 script_v2.md && (cd f1 && python3 film.py) && python3 engine/build_data.py f1 && python3 engine/build.py f1` → `f1/film/1-post-voor-iedereen.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | D · Macro | Klaslokaal; achter de leerling valt een stoel om; schrik; hartslagmeter 72 → 128 en blijft hoog; vraag q02 |
| Titel | Schema | Lichaamskaart met bijnieren, bloedlus met adrenalinedruppels |
| H1 Twee manieren (s04–s09) | B · Schema | Zenuw als vaste lijn hersenen → hand (puls, tot 100 m/s); bloedlus met druppels die zich in ≈ 1 minuut verspreiden; brief met één adres tegenover folder bij zeven huisjes; tabel snelheid/duur/bereik; voorbeelden (pan, groeien, maan/glucose/water); speekselklier met buis tegenover hormoonklier aan een bloedvat; lichaamskaart: hypothalamus, hypofyse, schildklier, bijnieren, alvleesklier (zoom: klierblaasjes met buis + eilandje van Langerhans aan een bloedvat), eierstokken/zaadballen. Vwo s09: endocrien/exocrien, hypothalamus met zenuwsignaal erin en hormoon eruit |
| H2 Wie leest de post? (s10–s18) | B · Schema + Micro | Zenuwsignaal naar de bijnier; zoom op schors en merg; adrenaline in de bloedlus; vraag q11; drie cellen in Micro (twee met receptoren lichten op, één niet); vier panelen hart / lever / vaten spieren / vaten darm en huid; koude teen; klaar voor inspanning. Vwo: membraan met receptor en cascade 1 → 3 → 9 enzymen; cortisol door het membraan, receptor in de cel, kern met gen aan, nieuwe eiwitten, klok; schildklierhormoon (vraag q17); samenvattende tabel |
| H3 Hoe lang duurt een bericht? (s19–s22) | D · Schema | Bak met kraan (klier) en afvoer (afbraak); peil = concentratie; knal: kraan open, peil omhoog, kraan dicht, peil zakt langzaam; grafiek extra adrenaline 100 → 50 → 25 → 12 (model, halfwaardetijd 2 min); vooruitblik Suiker in balans |
| Recap (s23) | Schema | Route knal → zenuw → bijniermerg → bloed → hart, lever, vaten; hartslag zakt met de grafiek; antwoord b |
| Eindkaart | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom stopt het hartbonzen niet meteen na de knal? | b er zit nog een stof in je bloed die je hart aanzet (onthulling in H3 en recap) |
| q11 | basis | Welke cellen reageren op de adrenaline? | c alleen cellen die adrenaline kunnen herkennen |
| q17 | vwo | Schildklierhormoon: waar zit de receptor? | a in de cel, en het zet genen aan of uit |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). Ze zijn dus zonder nieuwe opname aan te passen. De onthulling ("Antwoord c", "Antwoord a", "antwoord b") staat wél in de audio van s12, s18 en s23.

Checkvragen (statisch in de pagina): 1 Afvoerbuis en hormoonklier · 2 Zelfde hormoon, ander effect · 3 Halfwaardetijd · 4 Transcriptieremmer (vwo).

Begrippen: hormoon, hormoonklier, receptor, doelcel/doelorgaan, bijniermerg, adrenaline, hypothalamus, hypofyse, eilandjes van Langerhans, concentratie; vwo: endocriene/exocriene klier, signaaltransductie, steroïdhormoon.

## Waar wat in de HTML zit (regelnummers in `1-post-voor-iedereen.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Regeling" |
| 76–100 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 101–145 | Checkvragen (101–111), Voor de docent (112–145) |
| 146 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 147–368 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 369–939 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 940–1188 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1189–1268 | `scenes.js`: hulpstukken van deze film |
| 1269–1498 | `SCENES`: title 1270 · s01 1273 · s04 1285 · s05 1295 · s06 1306 · s07 1318 · s08 1340 · s09 1360 · s10 1373 · s12 1386 · s13 1397 · s14 1410 · s15 1418 · s16 1430 · s18 1449 · s19 1457 · s20 1463 · s21 1470 · s22 1478 · s23 1487 |
| 1499–1666 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)`.
- **Checkvragen of docentdeel:** `film.py` → `python3 film.py` → `build.py`.

## Aandachtspunten

- 14 oktober 2026 (later die dag): opnieuw gebouwd met de uitgebreide seriebibliotheek van film 2, zonder nieuwe opnames: insuline heeft nu een eigen vorm (afgerond vierkant) en glycogeen is een teal keten van glucose, zoals in de rest van de reeks.

- Uitspraak: zie `uitspraak.md`. Een blinde controle (losse transcriptie van de echte takes) was in deze sessie niet mogelijk; de risicowoorden staan op de wachtlijst voor Kamiel.
- De grafiek toont de extra adrenaline boven het rustniveau; de narratie "pas na een minuut of tien is bijna alles weg" slaat daarop.
- Eindreview: 14 punten; verwerkt: grafieklabel, opties q02 en q17, klaslokaal (stoel achter de leerling, leerling zit achter een schoolbank), hypofyse niet meer in het gezicht, bijnieren lichten op, merg in oker, koude teen, labels, rustpeil, begrip hypothalamus. Niet verwerkt: de eindkaart gebruikt de vaste speler-opmaak (geen seriekleuren); timing van enkele tags is een fractie later dan het woord.

- 15 okt 2026: vwo-segment opnieuw ingesproken zonder 'Voor vwo' (Roos, eleven_v4, één take, flow wSVfswmRwrmJKmHQ57hW); audio-URL met ?v=2. Overige 'Voor vwo'-aankondigingen worden door de speler weggeknipt (vwoCuts).

## Wachtlijst opnieuw inspreken

Aanvulling 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`; zet hem bij het opnemen ook in `script_v2.md`).

- **H2 Wie leest de post? · s15** (vwo): eerste boodschapper (het hormoon komt de cel niet in), G-eiwit, tweede boodschapper cAMP, vóór de bestaande enzymcascade. Take s15 opnieuw (≈ +12 s), Roos, eleven_v4, één take; Scribe + `align.py`; mp3 genormaliseerd in `audio/` (audio-URL met een nieuwe `?v=`). De cues `kettingreactie`, `signaaltransductie`, `seconden`, `voorbij` en `loslaat` hangen aan woorden en schuiven vanzelf mee. Voeg "tweede boodschapper (cAMP)" toe aan de vwo-begrippen in `film.py`; checkvraag 4 en het docentdeel zo nodig aanvullen.
- **Beeld nodig**: in de membraanscène van s15 (Micro): het hormoon blijft buiten met label "eerste boodschapper"; aan de binnenkant van het membraan een G-eiwit naast de receptor dat oplicht, dan een enzym aan het membraan dat kleine cAMP-deeltjes afgeeft (label "tweede boodschapper: cAMP"); die cAMP-deeltjes zetten het eerste enzym van de bestaande cascade 1 → 3 → 9 aan.
- **Risicowoorden (uitspraaktest)**:
  - **cAMP** (cyclisch AMP): in het Nederlands als letters, /seː.aː.ɛmˈpeː/ (cee-aa-em-PEE), niet als het Engelse woord "camp". Stem-invoer: `cee-aa-em-pee`. Zelfde respelling bij beide keren in de take, zodat het elke keer gelijk klinkt.
  - **G-eiwit**: /ɣeːˈɛi̯.ʋɪt/ (GEE-eiwit, de letter G als /ɣeː/). Stem-invoer: `gee-eiwit`.
  - **boodschapper**: zoals geschreven.
