# Adem in, adem uit — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gaswisseling/1-adem-in-adem-uit.html (audio in films/gaswisseling/1-adem-in-adem-uit/audio/) |
| Reeks / nummer | Gaswisseling en uitscheiding, film 1 van 3 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s12 (onderdruk tussen de vliezen) en s14 (dode ruimte). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Prompt | onbekend · gemaakt 14 okt |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow nhqJkqxyYfxMTT3UE9uw; nodes in `stem/takes.json`) |
| Duur | spraak 8:08 (vwo) / 7:08 (havo). Speeltijd met kaarten en vragen: vwo ≈ 10 min, havo ≈ 9 min |
| Beeldstijl | Part C: Macro (woonkamer, röntgenfoto), Schema (navy: luchtwegen, borstkas met middenrif en tussenribspieren, vliezen, spirogram), Micro (trilhaarepitheel, longblaasje). Kleuren in `scenes.js`: lucht `#9FC3E0`, zuurstof `#E0705A`, koolstofdioxide `#9A8FB8`, long `#D98C8C`, spier `#B36A5E`, vocht teal |
| Audio-opslag | 14 losse mp3's in audio/ (s01 … s19), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en de bibliotheek `lib_hormonen.js` (alleen algemene helpers) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen, checkvragen en docentdeel (HTML) |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js`, `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` |
| `reviews/` | Expert (longarts), didactiek + taal, curriculum (met checkvragen), eindreview (fresh eyes, na de bouw) |

**Werkmap opzetten:** maak `g1/` met `script_v2.md`, `film.py`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/1-adem-in-adem-uit/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py g1 script_v2.md && (cd g1 && python3 film.py) && python3 engine/build_data.py g1 && python3 engine/build.py g1` → `g1/film/1-adem-in-adem-uit.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | I · Macro | Daan zit op de bank, hand op zijn borst; röntgenfoto (kamer gedimd) met ingezakte rechterlong en zwarte lucht tussen long en borstwand; vraag q02 |
| Titel | Schema | Ademende borstkas |
| H1 De weg van de lucht (s04–s07) | B · Schema + Micro | Hoofd en romp: neusholte, keelholte, strottenhoofd, luchtpijp met kraakbeenringen, bronchiën, bronchiolen, longblaasjes lichten één voor één op; vraag q06 (rokershoest); trilhaarepitheel met slijm dat naar de keel gaat, verlamd door rook |
| H2 De borstkas als pomp (s08–s10) | D · Schema | Borstkas met ribben, middenrif en longen; vraag q09; inademen (middenrif zakt, ribben omhoog, longen rekken mee), drukmeter buiten/in je longen, luchtpijlen door de luchtpijp; uitademen; buik- en borstademhaling |
| H3 Waarom je long meegaat (s11–s12) | D + I · Schema | Long met longvlies, borstvlies en vocht; natte glasplaatjes; klaplong (long veert terug) en herstel met een slangetje. Vwo: long trekt naar binnen, borstkas naar buiten, drukmeter "tussen de vliezen" |
| H4 Zeventig vierkante meter (s13–s18) | B + D · Schema + Micro | Spirogram met ademvolume, vitale capaciteit, restvolume; vwo: dode ruimte en verse lucht per minuut (4,2 tegen 2,4 L); longblaasjes als spons en badmintonveld; longblaasje met haarvat en diffusie; vraag q17; staven in- en uitgeademde lucht |
| Recap (s19) | Schema | Ademende borstkas, ingezakte long vouwt weer open |
| Eindkaart (s20) | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom zakt de long in als er lucht tussen long en borstwand komt? | a de long wordt niet meer meegetrokken door de borstkas (onthulling in H3 en recap) |
| q06 | basis | Waarom hoesten rokers slijm op? | a rook verlamt de trilhaartjes |
| q09 | basis | Wat doet het middenrif bij inademen? | b trekt samen, wordt platter, zakt |
| q17 | basis | Hoeveel zuurstof zit er in uitgeademde lucht? | b ongeveer 16 % |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling ("Antwoord aa/bee") staat wél in de audio van s07, s10, s11 en s18.

Checkvragen (statisch in de pagina): 1 Roken en emfyseem · 2 Het klokmodel · 3 Longvolumes van Lisa (tabel; d is vwo) · 4 Een steekwond (vwo).

Begrippen: luchtwegen, strotklepje, trilhaarepitheel, middenrif, tussenribspieren, buik-/borstademhaling, longvlies en borstvlies, klaplong, ademvolume, ademminuutvolume, vitale capaciteit, restvolume, longblaasjes, gaswisseling; vwo: onderdruk, dode ruimte.

## Waar wat in de HTML zit (regelnummers in `1-adem-in-adem-uit.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Gaswisseling" |
| 76–100 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 101–147 | Checkvragen (101–114), Voor de docent (115–147) |
| 148 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 149–370 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 371–941 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 942–1192 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1193–1240 | `scenes.js`: hulpstukken van deze film |
| 1241–1370 | `SCENES`: title 1242 · s01 1244 · s04 1255 · s05 1270 · s07 1274 · s08 1283 · s10 1289 · s11 1302 · s12 1319 · s13 1329 · s14 1337 · s15 1342 · s16 1352 · s18 1353 · s19 1360 |
| 1371–1538 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'bloed' vindt ook 'bloedvaten').
- **Checkvragen of docentdeel:** `film.py` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`, vooral bronchiën/bronchiolen en "Antwoord aa". Een blinde controle was in deze sessie niet mogelijk.
- Het spirogram toont het totale longvolume (inclusief restvolume); een gewone spirometer meet alleen volumeveranderingen (staat in het docentdeel).
- Eindreview: 15 punten, alle verwerkt zonder nieuwe opnames (zie `reviews/eindreview.md`).

## Wachtlijst opnieuw inspreken

Aanvulling 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`; zet hem bij het opnemen ook in `script_v2.md`).

- **H4 Zeventig vierkante meter · nieuwe vwo-alinea na s15** (vwo): de drie factoren uit s15 (oppervlak, dikte van de wand, concentratieverschil) krijgen de naam wet van Fick. Eén nieuwe take (≈ 13 s), Roos, eleven_v4. Bestaande takes blijven ongewijzigd. Let op: `make_segments.py` nummert de id's opnieuw, dus de nieuwe alinea wordt s16 en s16–s19 (plus vraag q17) schuiven één nummer op: hernoem de mp3's in `audio/`, de woordtijden in `stem/woordtijden/`, de sleutels in `SCENES` (scenes.js) en de vraag-id in `film.py` mee. Markeer de alinea als vwo, zodat havo hem overslaat. Woordtijden met Scribe + `align.py`.
- **Beeld nodig**: nieuwe vwo-scène bij het longblaasje uit s15: de drie factoren als labels (oppervlak ↑, concentratieverschil ↑, afstand ↓) met een pijl "snellere diffusie" en het label "wet van Fick". Geen formule nodig (eventueel klein: snelheid ~ oppervlak × verschil / afstand).
- **Risicowoorden (uitspraaktest)**:
  - **Fick** (Adolf Fick, Duitse fysioloog): Duits /fɪk/, Nederlands net zo: korte i, harde k ("fik"). Stem-invoer: zoals geschreven `Fick`; klinkt het als "fiek", dan `Fik`.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'lucht tussen long en borstwand', 'middenrif', 'longvlies', 'haarvat', 'longblaasje', 'wand < 0,001 mm', 'vochtig'. Gecontroleerd op stills van alle scènes met namen. Ook doorgevoerd in `bron/src/lib.js` en `bron/src/scenes.js`.

## Wijziging 18 okt 2026
s05: cue 'Hoe' vond eerst 'hoesten'; nu het tweede voorkomen ('Hoe komt dat?').
