# T-cellen en virussen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/afweer/3-t-cellen-en-virussen.html (audio in films/afweer/3-t-cellen-en-virussen/audio/) |
| Reeks / nummer | Bescherming en afweer, film 3 van 4 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s13–s14 (MHC-I en MHC-II, thymus-selectie, transplantatie) en s18 (hiv als retrovirus, reverse transcriptase). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow WcsexV97auoKZ8EXmbLl; nodes in `stem/takes.json`) |
| Duur | spraak 7:22 (vwo) / 5:56 (havo). Speeltijd met kaarten en vragen: vwo ≈ 9 min, havo ≈ 8 min |
| Beeldstijl | Part C: Macro (slaapkamer met Noor in bed en haar moeder), Micro (bacterie in doorsnede, virus, gekaapte luchtwegcel, darmbacteriën en resistentie, T-killercel, lymfeknoop, zenuwcel en gordelroos, MHC, donornier, retrovirus in een T-helpercel), Schema (hiv-grafiek, regelaar-schema, overdracht, hiv-remmers). Kleuren in `scenes.js`: ziekteverwekkers `VIR #E07A5F`, T-killercellen `TK #3E9E6A`, T-helpercellen `TH #7FC48F`, B-cellen `BCOL`, antistoffen `AS`, eigen cellen `EIGEN #8C7BBF`, celwand `WAND`, MHC-houders `MHCK` |
| Audio-opslag | 16 losse mp3's in audio/ (s01 … s20), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en de bibliotheek `lib_hormonen.js` (algemene helpers); figuren `virus`, `bCel`, `tCel`, `antistof` uit film 2 |

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
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` |
| `reviews/` | Expert (viroloog/immunoloog), didactiek + taal, curriculum (met checkvragen, ook los in `checkvragen.html`), eindreview `eind.md` (fresh eyes, na de bouw) |

**Werkmap opzetten:** maak `a3/` met `script_v2.md`, `film.py`, `sections.html`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/3-t-cellen-en-virussen/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py a3 script_v2.md && (cd a3 && python3 film.py) && python3 engine/build_data.py a3 && python3 engine/build.py a3` → `a3/film/3-t-cellen-en-virussen.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | I · Macro | Noor met griep in bed (± 39 °C); haar moeder belt de huisarts over antibiotica; vraag q02 |
| Titel | Micro | Geïnfecteerde cel met stukjes virus op het oppervlak; T-killercel |
| H1 Een gekaapte cel (s04–s06) | D + I · Micro | Bacterie in doorsnede (celwand, ribosomen, DNA); pil; celwand breekt; jouw cel zonder celwand; virus op schaal, zoomcirkel eiwitmantel en erfelijk materiaal; griepvirus kaapt een luchtwegcel, nieuwe virusdeeltjes komen vrij; antwoord a; darmbacteriën: gevoelige gaan dood, gemuteerde blijven over (resistentie) |
| H2 Een cel die zichzelf verraadt (s07–s14) | D · Micro | Antistoffen vangen een vrij virus, niet een virus in een cel; vraag q08; beenmerg → thymus → T-cel; gezonde cel met eigen stukjes, geïnfecteerde met stukjes virus; T-killercel met passende receptor; B-cel tegenover T-cel (inzet); gaatjes, cel breekt zichzelf af, fagocyt ruimt op, antistoffen vangen ontsnapte virussen; lymfeknoop: fagocyt toont stukjes, T-helpercel geeft startsein met signaalstoffen, kloon met geheugencellen; humoraal tegenover cellulair; zenuwcel en gordelroos. Vwo s13–s14: MHC-I (lichaamscel, T-killercel) en MHC-II (fagocyt, T-helpercel); thymus schakelt zelfreactieve T-cellen uit; donornier met vreemde MHC wordt aangevallen |
| H3 Als de regelaar wegvalt (s15–s19) | D + I · Schema | Grafiek T-helpercellen en virus over 12 jaar, normaal 500–1500, grens 200 (aids); vraag q16; regelaar-schema met doorgestreepte T-helpercel; andere ziekteverwekkers. Vwo s18: retrovirus, RNA → reverse transcriptase → DNA, ingebouwd in het DNA van de T-helpercel. Overdracht, condoom; hiv-remmers: virus onder de meetgrens |
| Recap (s20) | Macro | Noor weer op, met haar moeder; antwoordketen; bruggetje naar vaccins |
| Eindkaart (s21) | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom helpen antibiotica niet tegen griep? | a een virus is geen cel: er is niets wat antibiotica kunnen remmen (onthulling in s06 en recap) |
| q08 | basis | Hoe ruimt je afweer een virus op dat al in een cel zit? | c de hele cel wordt gedood, met het virus erin |
| q16 | basis | Waarom wordt iemand met aids ziek van infecties die anderen nauwelijks merken? | b zonder T-helpercellen krijgen B-cellen en T-killercellen geen startsein |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling ("Antwoord aa/cee/bee") staat wél in de audio van s06, s09 en s17.

Checkvragen (statisch in de pagina): 1 Antibiotica en resistentie (tabel) · 2 T-killercellen aan het werk (experiment) · 3 Hiv in de loop van de jaren (tabel) · 4 Een nier van wie? (HLA-typering, vwo).

Begrippen: virus, antibiotica, resistentie, T-cellen, T-killercel, T-helpercel, cellulaire afweer, hiv en aids, hiv-remmers; vwo: MHC, retrovirus.

## Waar wat in de HTML zit (regelnummers in `3-t-cellen-en-virussen.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Afweer" |
| 76–99 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 100–154 | Checkvragen (100–121), Voor de docent (122–154) |
| 155 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 156–377 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 378–948 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 949–1199 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1200–1297 | `scenes.js`: hulpstukken van deze film |
| 1298–1526 | `SCENES`: title 1299 · s01 1304 · s04 1310 · s05 1330 · s06 1346 · s07 1365 · s09 1372 · s10 1387 · s11 1407 · s12 1422 · s13 1434 · s14 1443 · s15 1459 · s17 1472 · s18 1484 · s19 1499 · s20 1518 |
| 1527–1694 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'eet' vindt eerst 'beetje' en 'niet' ook 'niets').
- **Figuren:** `lCel(ctx, x, y, r, t, {geinf, toon, eigenToon, nieuw, gaatjes, kapot, mhc, mhcCol, col})` (lichaamscel; `toon` = stukjes virus op het oppervlak), `bacterieGroot(ctx, x, y, w, h, t, {kapot})`, `tCel(ctx, x, y, r, t, {col: TK of TH, label})`, `virus`, `bCel`, `antistof`, `sleutel`, `fagocyt`, `thymus`, `bot`, `pil`, `slaapkamer(ctx, t, {opBed, ma, telefoon})`, `hivGrafiekT` / `hivGrafiekV` (curves voor s15).
- **Checkvragen of docentdeel:** `sections.html` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`, vooral haa-ie-vee, eets, em-haa-cee, tiemus, tee-killercel, erenaa en reverse transcriptase. Een blinde controle was in deze sessie niet mogelijk.
- Checkvraag 1 gebruikt vereenvoudigde, afgeronde voorbeeldwaarden (aangegeven in de vraag); vervang ze desgewenst door actuele ECDC-cijfers.
- De viruscurve in s15 is relatief (geen eigen as).
- Eindreview: 12 punten; 11 verwerkt zonder nieuwe opname. Niet overgenomen: de ondertitel "Antwoord aa./bee./cee." blijft zoals in film 1 en 2 (zie `reviews/eind.md`).

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'ribosomen', 'eiwitmantel', 'erfelijk materiaal', 'receptor', 'MHC'. Gecontroleerd op stills van alle scènes met namen. Ook doorgevoerd in `bron/src/lib.js` en `bron/src/scenes.js`.


## Wijziging 19–20 okt 2026: alinea's opnieuw ingesproken na de uitspraaktest

Kamiel koos in de uitspraaktest (18–19 okt, 4 rondes) hoe deze woorden moeten klinken. Opnieuw ingesproken: **s10, s11, s13, s14, s15, s17, s18** (alleen deze alinea's; de rest van de audio is ongewijzigd). Stem-invoer = de oude invoer van die alinea met alleen deze woorden vervangen (inhoud gelijk):

| Woord | Oude stem-invoer | Nieuwe stem-invoer | Alinea's |
|---|---|---|---|
| fagocyt(en) | `faagosieten` | `Fagocyten` | s10, s11, s17 |
| MHC | `em-haa-cee` | `MHC` | s13, s14 |
| aids | `eets` | `aids` | s15 |
| RNA (los woord) | `erenaa` | `er-en-aa` | s18 |

Roos (7qdUFMklKPaaAVMsBTBt), eleven_v4, één take per alinea (flow WcsexV97auoKZ8EXmbLl; nieuwe nodes in `stem/takes.json`, generatie-id's en duur in `stem/gen.json` met `heropname: uitspraaktest 19 okt 2026`). TTS-credits: 3124; Scribe-woordtijden (eleven_scribe_v1) per take, op de ondertitelwoorden uitgelijnd met `align.py` (alle takes ratio 1,0, geen verschillen); ruwe transcripten in `stem/status_timing_uitspraak_19okt.json`. In de HTML zijn alleen de woordtijden en `dur` van deze segmenten in `window.FILMDATA` vervangen (speler, beeld en cues ongewijzigd; de ondertitels waren al goed). `segments.json` (voice + vmap) en de duren in `script.md` zijn bijgewerkt. Bij opnieuw bouwen: de nieuwe invoer staat in `segments.json`; `bouw/uitspraak_subs.json` heeft de oude respellings voor deze woorden niet meer.
