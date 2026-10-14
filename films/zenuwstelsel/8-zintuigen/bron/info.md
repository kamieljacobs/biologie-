# Zintuigen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/zenuwstelsel/8-zintuigen.html (audio in films/zenuwstelsel/8-zintuigen/audio/) |
| Reeks / nummer | Zenuwstelsel, losse film 8 (aanvulling Regeling: zintuigen ontbrak, 14 okt 2026); bouwt voort op film 1 "Eén seconde" (receptor, prikkel, impuls). Film 7 "Slaap en stress" staat nog open |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s13 (rodopsine, staafje wordt negatiever, convergentie) en s19 (basilair membraan, toonhoogte). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow jwxXn0Jgpax90BkTRIQ3 "Zenuwstelsel · Zintuigen"; nodes in `stem/takes.json`) |
| Duur | spraak 8:08 (vwo) / 6:55 (havo). Speeltijd met kaarten en vragen: vwo ≈ 10 min, havo ≈ 9 min |
| Beeldstijl | Part C: Macro (avond, fel verlicht kunstgrasveld, donker fietspad met bomen, Noor in een rode jas die grijs wordt), Schema (doorsnede van het oog met hoornvlies, iris, lens, straalvormig lichaam, lensbandjes, netvlies, gele en blinde vlek, oogzenuw; lichtstralen; vooraanzicht iris en pupil; bijziend/verziend met brillenglazen; doorsnede van het oor met zones, gehoorbeentjes, buis van Eustachius, slakkenhuis, kanalen; evenwichtsorgaan met hoofd in profiel; slakkenhuis uitgerold), Micro (staafjes en kegeltjes, adaptatiegrafiek, rodopsine, convergentie, haarcellen, dB-tabel). Kleuren in `scenes.js`: `LICHT`, `NETV`, `IRIS`, `LENS`, `STRAAL`, `ZENUW`, kegeltjes `KEG` (rood, groen, blauw), `STAAF`, `SLAK`, `KANAAL`, `BOT` |
| Audio-opslag | 15 losse mp3's in audio/ (s01 … s20), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en de bibliotheek `lib_hormonen.js` (`person`, `circ`); helpers `tag`, `regel`, `kruis`, `vink` overgenomen uit de afweerreeks; oog, oor en receptoren nieuw getekend |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` + `sections.html` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen; checkvragen en docentdeel staan in `sections.html` |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js`, `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` (reeks) en **`uitspraak_film.json`** (alleen deze film: rodopsine, Eustachius, decibel, basilair, lichtreceptoren) |
| `reviews/` | Expert (oogarts/audioloog), didactiek + taal, curriculum (met checkvragen, ook los in `checkvragen.html`), eindreview `eind.md` |

**Werkmap opzetten:** maak `z8/` met `script_v2.md`, `film.py`, `sections.html`, `scenes.js` (uit `src/`), `uitspraak_film.json` (uit `bouw/`), `words/` (= `stem/woordtijden/`) en `film/8-zintuigen/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py z8 script_v2.md && (cd z8 && python3 film.py) && python3 engine/build_data.py z8 && python3 engine/build.py z8` → `z8/film/8-zintuigen.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | D · Macro | Noor traint op een fel verlicht kunstgrasveld en loopt een donker fietspad op: eerst zwart, dan bomen en pad in grijs, rode jas bijna zwart; vraag q02 (antwoord in s12 en de recap) |
| Titel | Schema | Oog in doorsnede |
| H1 Een camera met een levende lens (s04–s10) | B · Schema | Brug naar Eén seconde (prikkel → receptor → impuls; zintuig = receptoren + delen die opvangen en richten); doorsnede van het oog met labels; stralen knikken bij hoornvlies en lens, hoornvlies licht op bij 'tweederde'; straalvormig lichaam en lensbandjes; telefoon en bushalte, vraag q06; verte (plat) en dichtbij (bol), 'accommoderen', afleiders 'boller voor de verte' en camera; pupilreflex (vooraanzicht, zon); bijziende: dichtbij scherp, ver wazig, vraag q09; brandpunt vóór het netvlies, hol brillenglas; verziend met bol glas; oudziend met leesbril |
| H2 Twee soorten lichtreceptoren (s11–s13) | D · Micro | Klein oog met gele en blinde vlek; rij kegeltjes (drie kleuren) en staafjes; 120 miljoen tegenover 6 miljoen; antwoord b: pupil groter helpt een beetje, de stof in de staafjes wordt afgebroken en weer aangemaakt; adaptatiegrafiek met twee fasen (10 min, 20–30 min); rood wordt zwart; donker → licht binnen een minuut. Vwo s13: rodopsine (eiwit met lichtgevoelig deel) verandert van vorm en valt uit elkaar; lading van −40 naar −70 mV, minder signaalstof, impuls pas verderop; convergentie (staafjes) tegenover eigen zenuwcel (kegeltjes) |
| H3 Trillingen en evenwicht (s14–s19) | B · Schema | Oor in doorsnede met zones (uitwendig, midden, binnen), gehoorbeentjes, 'groot' en 'klein', druk ± 20×, haarcellen in een zoomcirkel, gehoorzenuw, 20–20 000 Hz; middenoor met lucht, buis van Eustachius naar de keel, luchtdruk in het vliegtuig, slikken; boxen en piep, vraag q16; haarcellen overbelast, herstel, één dood; tabel 80–100 dB; oordopjes; evenwichtsorgaan: hoofd draait, drie kanalen met vloeistof, haarcel in zoomcirkel, duizelig; evenwichtsblaasje met kalkkorreltjes. Vwo s19: uitgerold slakkenhuis, hoge toon aan het begin, lage aan het eind, begin kapot |
| Recap (s20) | Macro → Schema | Fietspad met tags (kegeltjes, afgebroken, weer aangemaakt, geen kleur, antwoord b); keten prikkel → zintuig → receptor → impuls |
| Eindkaart (s21) | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom ziet Noor eerst niets, en daarna alles grijs? | b andere cellen in haar ogen nemen het over, en die moeten opladen (onthulling in s12 en de recap s20) |
| q06 | basis | Je kijkt van je telefoon op naar een bord aan de overkant. Wat gebeurt er met je lens? | a die wordt platter: de kringspier eromheen ontspant |
| q09 | basis | Waar valt bij een bijziende het scherpe beeld van iets in de verte? | c vóór het netvlies, want zijn oog is te lang |
| q16 | basis | Na harde muziek hoor je een hoge piep. Wat is er aan de hand? | b de cellen die geluid opvangen zijn overbelast geraakt |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling staat wél in de audio van s07, s10, s12, s17 en s20.

Checkvragen (statisch in de pagina): 1 Een leesbril op je vijftigste (nabijheidspunt) · 2 Een vlekje in het donker (donkeradaptatie in twee series) · 3 Een piep na het feest (audiogram, buis van Eustachius) · 4 Scherp of gevoelig (convergentie, receptorpotentiaal, vitamine A; vwo).

Begrippen: zintuig, adequate prikkel, hoornvlies, iris en pupil, pupilreflex, lens/straalvormig lichaam/lensbandjes, accommodatie, bijziend/verziend/oudziend, netvlies/gele vlek/blinde vlek, staafjes en kegeltjes, adaptatie, middenoor en gehoorbeentjes, buis van Eustachius, slakkenhuis en haarcellen, evenwichtsorgaan; vwo: rodopsine en receptorpotentiaal, convergentie, basilair membraan.

## Waar wat in de HTML zit (regelnummers in `8-zintuigen.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Regeling" |
| 76–99 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 100–163 | Checkvragen (100–126), Voor de docent (127–163) |
| 164 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 165–386 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 387–957 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 958–1208 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1209–1337 | `scenes.js`: hulpstukken van deze film |
| 1338–1534 | `SCENES`: title 1339 · s01 1341 · s04 1350 · s05 1366 · s07 1375 · s08 1388 · s10 1403 · s11 1418 · s12 1428 · s13 1440 · s14 1461 · s15 1474 · s17 1483 · s18 1494 · s19 1513 · s20 1524 |
| 1535–1702 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py` (met `uitspraak_film.json` in de werkmap), neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'licht' vindt ook 'lichtgevoelige' en 'ring' ook 'kringspier').
- **Figuren:** `oog(ctx, x, y, R, {len, bol, pupil, a, gv, bv, straal})` geeft ankerpunten terug (`horn`, `iris`, `pupil`, `lens`, `straal`, `bandje`, `glas`, `netv`, `gv`, `bv`, `xr`, `lx`); `len` > 1 = te lang oog (bijziend), < 1 = te kort; `bol` 0–1 = platte tot bolle lens. Stralen: `stralen` (bron → lens → brandpunt), `stralenHorn` (knikt ook bij het hoornvlies), `stralenBril` (met brillenglas: k > 0 spreidt, k < 0 bundelt), `brilglas(ctx, x, y, h, hol)`. Oor: `oor(ctx, t, {tril, druk, buis, kan, open})` met vaste coördinaten (trommelvlies x ≈ 792, ovale venster 1010, slakkenhuis 1170/560) en `zones`; `haarcel(ctx, x, y, s, buig, a, kapot)`; `staafje(ctx, x, y, s, a, stof)` (stof 0–1 = hoeveel pigment), `kegeltje`; `adaptGraf`; `fietspad(ctx, t, {veld, zie, kleur, noorX})`; `hoofd(ctx, x, y, kanteling)`; `keten`.
- **Checkvragen of docentdeel:** `sections.html` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`, vooral Eu-staagie-jus, rodopsinuh, baazie-lèr, deesie-bel en accommoderen. Een blinde controle was in deze sessie niet mogelijk.
- Getallen staan in de kop van `script_v2.md` en in het docentdeel (pupil ± 16×, gehoorbeentjes ± 20×, 80 dB 40 uur per week, 3-dB-regel).
- De film heet in de index "film 8"; film 7 (Slaap en stress) bestaat nog niet. De andere zenuwstelselfilms noemen zelf hun eigen nummer.
- Eindreview: 15 punten, alle verwerkt zonder nieuwe opname (zie `reviews/eind.md`).
- Het evenwichtsorgaan is sterk vereenvoudigd getekend (drie bogen, één blaasje met de tekst "er zijn er twee").
