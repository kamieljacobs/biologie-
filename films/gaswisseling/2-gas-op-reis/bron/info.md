# Gas op reis — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gaswisseling/2-gas-op-reis.html (audio in films/gaswisseling/2-gas-op-reis/audio/) |
| Reeks / nummer | Gaswisseling en uitscheiding, film 2 van 3 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s08 (zuurstofbindingscurve) en s12–s14 (koolzuuranhydrase, vraag q13, Bohr-effect). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow ExxVWu6QXhP1Zodfkof6; nodes in `stem/takes.json`); s14 opnieuw opgenomen na de eindreview |
| Duur | spraak 8:59 (vwo) / 7:22 (havo). Speeltijd met kaarten en vragen: vwo ≈ 11 min, havo ≈ 9 min |
| Beeldstijl | Part C: Macro (klas), Micro (longblaasje, rode bloedcel, hemoglobine, spiercel), Schema (curves, regelkring, hoofd met ademcentrum, huis met toestellen, berg, nieren → beenmerg). Kleuren in `scenes.js`: zuurstof `#E0705A`, koolstofdioxide `#9A8FB8`, koolmonoxide `#4A4E58`, lucht `#9FC3E0`, bloed zuurstofarm `#8E3E46` → zuurstofrijk `#D9483E`, ijzer `#C98A3E` |
| Audio-opslag | 15 losse mp3's in audio/ (s01 … s21), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en de bibliotheek `lib_hormonen.js` (algemene helpers) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap`. Let op: in s20 is `ee-pee-oo` na een punt met de hand naar `Ee-pee-oo` gezet |
| `film.py` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen, checkvragen en docentdeel (HTML) |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js`, `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` |
| `reviews/` | Expert, didactiek + taal, curriculum (met checkvragen), eindreview (fresh eyes, na de bouw) |

**Werkmap opzetten:** maak `g2/` met `script_v2.md`, `film.py`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/2-gas-op-reis/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py g2 script_v2.md && (cd g2 && python3 film.py) && python3 engine/build_data.py g2 && python3 engine/build.py g2` → `g2/film/2-gas-op-reis.html`. (Zet daarna in `segments.json` s20 weer `Ee-pee-oo` na een punt, als je die alinea opnieuw opneemt.)

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | I · Macro | Leerling zit in de klas en houdt zijn adem in; klok 10–20–30 s; vraag q02 |
| Titel | Micro | Bloedsomloop als ellips met longen en spiercel; rode bloedcellen laden zuurstof op en koolstofdioxide af |
| H1 Zuurstof aan boord (s04–s08) | B · Micro + Schema | Longblaasje; staven 98 % / 2 %; rode bloedcel vol hemoglobine; hemoglobine met vier ijzerplekken waar zuurstof bindt; rode bloedcel reist van longblaasje naar spiercel met zuurstofspanningsmeters; vraag q06 (in rust); drie rode bloedcellen 98 % / 75 % / veel lager; longslagader en longader. Vwo s08: zuurstofbindingscurve met vlak (longen) en steil (weefsels) deel |
| H2 Koolstofdioxide terug (s09–s14) | B · Micro + Schema | Spiercel geeft CO₂ af; vraag q10; reactie in de rode bloedcel, HCO₃⁻ naar het plasma; cirkeldiagram 70/20/10; hemoglobine met CO₂ op het eiwit; in de longen andersom. Vwo s12: CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻ met koolzuuranhydrase, H⁺ op hemoglobine (buffer), werkende spier; vraag q13; s14 curve schuift naar rechts (Bohr-effect) |
| H3 Wie bepaalt hoe snel je ademt? (s15–s16) | D · Schema | Hoofd met ademcentrum en chemoreceptoren, zenuwen naar borstkas; regelkring (geregelde waarde, sensor, regelcentrum, effector, negatieve terugkoppeling); grafiek sporten; twee panelen adem inhouden (zuurstof bijna vol, CO₂ stijgt tot de drempel); twee panelen hyperventileren (zuurstof onder de flauwvaldrempel vóór CO₂ de ademdrang bereikt) |
| H4 Als het gas niet klopt (s17–s20) | I · Schema | Huis met cv-ketel, geiser, kachel en koolmonoxide; hemoglobine met CO op de ijzerplekken; vraag q18; drie meters (CO₂ normaal, opgeloste O₂ normaal, O₂ aan hemoglobine veel minder); klachten; melder met drie stappen; berg met fietser en luchtvakjes (21 % zuurstof, minder moleculen); nieren → EPO → rood beenmerg → rode bloedcellen; grafiek hemoglobine in weken; doping |
| Recap (s21) | Macro | Terug in de klas; de antwoordketen als vier labels |
| Eindkaart (s22) | Schema | Vier kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Wat dwingt je om weer te ademen als je je adem inhoudt? | b te veel koolstofdioxide (onthulling in s16 en recap) |
| q06 | basis | Hoeveel zuurstof zit er in rust nog in het bloed dat terugkomt naar het hart? | b nog ongeveer driekwart |
| q10 | basis | Hoe reist het meeste koolstofdioxide terug naar de longen? | b als waterstofcarbonaat in het plasma |
| q13 | vwo | Laat hemoglobine in een werkende spier meer of minder zuurstof los? | a meer: de curve schuift naar rechts |
| q18 | basis | Wat merk je van koolmonoxide? | b bijna niets |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling ("Antwoord aa/bee") staat wél in de audio van s07, s11, s14, s16 en s19.

Checkvragen (statisch in de pagina): 1 Bloedvaten en koolmonoxide · 2 Vrijduiken · 3 Hoogtestage (tabel; e is vwo) · 4 Bohr-effect in een werkende spier (vwo).

Begrippen: hemoglobine, oxyhemoglobine, zuurstofspanning, verzadiging, waterstofcarbonaat, ademcentrum, chemoreceptoren, negatieve terugkoppeling, hyperventileren, koolmonoxide, EPO; vwo: zuurstofbindingscurve, koolzuuranhydrase, Bohr-effect.

## Waar wat in de HTML zit (regelnummers in `2-gas-op-reis.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Gaswisseling" |
| 76–100 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 101–158 | Checkvragen (101–124), Voor de docent (125–158) |
| 159 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 160–381 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 382–952 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 953–1203 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1204–1275 | `scenes.js`: hulpstukken van deze film |
| 1276–1495 | `SCENES`: title 1277 · s01 1282 · s04 1293 · s05 1322 · s07 1326 · s08 1345 · s09 1353 · s11 1362 · s12 1377 · s14 1390 · s15 1399 · s16 1421 · s17 1442 · s19 1454 · s20 1468 · s21 1488 |
| 1496–1663 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'los' vindt ook 'lost', en 'Sensor' vindt eerst 'sensoren').
- **De zuurstofbindingscurve:** `sat(p, p50)` in `scenes.js` (Hill-vergelijking, n = 2,7, P50 = 3,6 kPa; Bohr-curve P50 = 4,6 kPa).
- **Checkvragen of docentdeel:** `film.py` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`, vooral chemoreceptoren, koolzuuranhydrase, EPO en Boor-effect. Een blinde controle was in deze sessie niet mogelijk.
- "Na een paar dagen maken je nieren meer EPO" (s20): EPO stijgt in werkelijkheid al binnen een à twee dagen; bij een nieuwe opname kan dat "binnen een paar dagen" worden.
- De grafieken voor adem inhouden en hyperventileren zijn schematisch (zonder meetwaarden); dat staat in het docentdeel.
- Eindreview: 15 punten, verwerkt met één nieuwe opname (s14) (zie `reviews/eindreview.md`).

## Wachtlijst opnieuw inspreken

Aanvullingen 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`; zet ze bij het opnemen ook in `script_v2.md`). Per alinea: `make_segments.py`, alleen die take opnieuw (Roos, eleven_v4, één take), Scribe + `align.py`, mp3 genormaliseerd in `audio/`, opnieuw bouwen. De take wordt langer, dus alle cues erna in die alinea schuiven mee (cues hangen aan woorden, dus dat gaat vanzelf na `align.py`).

- **H1 · s04** (basis): de definitie van zuurstofspanning wordt "de druk van de zuurstof" (oude zin doorgestreept); nieuw: alleen opgeloste zuurstof telt mee voor de zuurstofspanning, zuurstof aan hemoglobine niet, dus hemoglobine laadt veel op zonder dat de spanning meteen stijgt, zodat het verschil met het longblaasje blijft. Take s04 opnieuw (≈ +16 s). Cue `q.on('zuurstofspanning', 1)` blijft werken.
- **H1 · s08** (vwo): affiniteit (meer affiniteit = curve meer naar links) en myoglobine (één keten, grotere affiniteit, curve links van hemoglobine, zuurstofvoorraad in de spier). Take s08 opnieuw (≈ +25 s). Myoglobine stond tot nu toe alleen in checkvraag 4d en het antwoordmodel (`film.py`, regels 57–58), niet in het script of in beeld: in s08 komt het nu voor het eerst in de film zelf. Voeg "affiniteit" en "myoglobine" toe aan de vwo-begrippen in `film.py`.
- **H2 · s14** (vwo): één zin: het Bohr-effect verlaagt de affiniteit. Take s14 opnieuw (≈ +4 s).
- **Beeld nodig**: s04: drie kleine meters of een splitsing "opgelost in plasma (telt voor de zuurstofspanning)" tegenover "aan hemoglobine (telt niet)", in de stijl van de drie meters uit s19. s08: label "affiniteit" bij een pijl naar links; tweede curve voor myoglobine links van hemoglobine (hyperbolisch, geen S-vorm: bijv. `p/(p+0,4)` in plaats van `sat(p, p50)`), met een spiercel en een pijl zuurstof Hb → myoglobine. s14: label "lagere affiniteit" bij de goudkleurige curve.
- **Risicowoorden (uitspraaktest)**:
  - **myoglobine**: Nederlands /mi.joː.ɣloːˈbi.nə/ (mie-joo-gloo-BIE-nə; analoog aan hemoglobine /ˌɦeː.moː.ɣloːˈbi.nə/, -ine-uitgang hoorbaar, niet Frans). Stem-invoer: eerst zoals geschreven `myoglobine`; als de y als "ie" of de -ne wegvalt: `mie-ooglobinuh`.
  - **affiniteit**: /ɑ.fi.niˈtɛit/ (af-fie-nie-TEIT, klemtoon op -teit). Stem-invoer: zoals geschreven.
  - **eiwitketen**: zoals geschreven.
