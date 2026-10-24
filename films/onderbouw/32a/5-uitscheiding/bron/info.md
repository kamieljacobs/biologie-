# Uitscheiding — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32a/5-uitscheiding/index.html` (audio in `audio/`: 12 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, film 5 (32A Organismen; bullet 3: uitscheidingsstelsel; bullet 4: afval uit de stofwisseling, waterbalans, samenwerking) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde klassen; geen schoolniveaus in beeld, stem of docentdeel. Basislijn + één blok **uitdaging** (s10: nefronen, suiker in de urine). Schakelaar **Basis / Uitdaging** (`?niveau=basis`) |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Prompt | v6 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per segment, flow `XT4Y2pzH05Tmfe5jJJ6l` (generatie-id's in `stem/generaties.json`, node- en sessie-id's in `stem/tts_sessies.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes; alle 12 takes woord voor woord gelijk aan het script |
| Duur | audio 253 s; speeltijd Uitdaging ± 5:15, Basis ± 4:50; Vragen uit ± 4:25 |
| Beeldstijl | Part C, vlak. Rode draad: Daan en vijf glaasjes urine (bijna kleurloos → donkergeel); een ureumdeeltje op de **routekaart** van het lichaam (Schema, van voren bekeken). De nier als filter in twee stappen (Schema). Zoomcirkel naar een spiercel (Micro) en naar een nefron (Schema, vereenvoudigd). Macro-dag/avond: voetbalveld |
| Audio-opslag | losse mp3's per segment, −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v6 + Part D; brief, script v1 → drie reviews → v2, draaiboek; gebouwd zonder checkpoint (fase 2) |
| Credits | TTS 3676 tekens (eleven_v4); Scribe 253 s audio |

## Bronbestanden in deze map

Zelfde indeling als film 4 (*Ademhaling en bloedsomloop*): `brief.md`, `script_v1.md`, `reviews/`, `script_v2.md` (bron van alles), `script.md` (gesproken tekst met tijden), `draaiboek.md`, `uitspraak.md`, `docentdeel.md`, `begrippen.json`, `index_entry.json`, `tts_schatting`; `stem/` (stem-invoer, woordtijden, generaties); `filmdata.json`; `src/` (`lib.js`, `helpers.js`, `lib_cast.js`, `scenes5.js`, `player.js`, `page.html`, `check.html`, `docent.html`); `bouw/` (`film.json` en de scripts `make_segments.py`, `build_data.py`, `build.py`, `cuecheck.py`, `shots.py`, `speeltest.py`, `rangeserver.py`, `fetch_tts.py`, `fetch_words.py`, `maakbron.py`, `raster.py`).

**Werkmap opzetten:** kopieer `bouw/*`, `src/*` (in `src/`) en `script_v2.md` naar een werkmap buiten de repo; `stem/segmenten_stem-invoer.json` → `segments.json`, `stem/woordtijden/` → `words/`, `stem/generaties.json` → `generaties.json`, `src/check.html` en `src/docent.html` naast `film.json`, mp3's in `audio/`. Dan `python3 build_data.py && python3 build.py` → `film/index.html`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Voetbalveld dag → avond | Daan voetbalt, donkergeel; 's avonds fles water, bijna kleurloos; vijf glaasjes |
| s02 | Titel | Schema | titel, routekaart met reizend ureumdeeltje |
| s03 | H1 Afval van je cellen | Routekaart + Micro | spiercel: koolstofdioxide; eiwit → giftige stof → lever → ureum; te veel water of zout |
| s04 | H1 | Routekaart | definitie uitscheiding; longen, huid, nieren; urineglas met water, ureum, zout, kleurstof |
| q05 | H1 | vraag | wat hoort niet bij uitscheiding? |
| s06 | H2 Het filter | Schema → routekaart | appelresten nooit in het bloed; twee nieren (vuist), zoomcirkel nier |
| s07 | H2 | Schema (filter) | stap 1 eruit (± 180 L, badkuip), bloedcellen blijven; stap 2 terug; urine ± 1,5 L |
| q08 | H2 | vraag | Daan zweette veel: wat doen zijn nieren? |
| s09 | H2 | Schema (filter) | water vast → donkergeel; avond: veel water eruit → licht; evenwicht |
| s10 | H2, uitdaging | Routekaart + zoom | nefron: kluwen haarvaten, kronkelend buisje, terughalen; suiker in urine |
| s11 | H3 Naar buiten, en samen | Routekaart → keten | urineleiders, blaas (seintje), plasbuis; keten van vijf; nieren werken niet meer |
| q12 | H3 | vraag | nieren werken niet meer: wat gebeurt er? |
| s13 | H3 | Schema | afval hoopt op; dialyse; donornier |
| s14 | Samenvatting | Routekaart | route van het afval; Daans twee glazen |
| s15 | Eindkaart | Schema | Probeer het zelf (filterproef, teken de route, film 4) + vraag hete dag; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q05 | Welke van deze drie hoort niet bij uitscheiding? | koolstofdioxide uitademen · ureum in je urine · appelresten in je ontlasting | c |
| q08 | Daan zweette veel en dronk weinig. Wat doen zijn nieren? | ze houden veel water vast: weinig urine, donkergeel · ze maken juist meer urine, om hem af te koelen · ze maken evenveel urine als altijd | a |
| q12 | Iemands nieren werken niet meer. Wat gebeurt er? | niets, longen en huid nemen het over · afval en water hopen zich op in zijn bloed · zijn darmen maken dan de urine | b |

Eindkaart (open): zweten op een hete dag. Checkvragen 1–4 basis, 5 uitdaging (`src/check.html`).

## Begrippen

uitscheiding, ureum, urine, nieren, urineleider, blaas en plasbuis · uitdaging: nefron. `GLOSSARY` op regel 1074 (uit `bouw/film.json`).

## Docentdeel

Doelgroep en kerndoel, tabel per deel, vijf misconcepties (met de nuance over galkleurstof), pauzemomenten en Probeer het zelf (filterproef), getallen met bronnen, vereenvoudigingen (ammoniak, ADH, eiwitten, kleurstof), dekking. Bron: `src/docent.html`.

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

- Pagina-tekst: checkvragen vanaf regel 97, docentdeel vanaf 114, voet 152. `window.FILMDATA`: 153.
- Part C-bibliotheek vanaf 154; hulpjes films 1–3 vanaf 357; personages (`persoon`) vanaf 690.
- Film 5 vanaf regel 868: gedeelde hulpjes uit film 4 (`exactAt` 876, moleculen, paden); deeltjes en glazen vanaf 896 (`hexMix`, `waterDot`, `zout`, `ureum`, `gifStof`, `kleurstof`, `glas` 903, `glazen`); routekaart `BM` 908, `bodyMap5` 914; filter `filterBase` 929, `filterDeeltjes` 942; `nefron` 955; `keten5` 967; `dialyse` 971; voetbalveld `veld` 976.
- Scènes: `const SCENES` regel 984; `s01` 985, `s02` 992, `s03` 994, `s04` 1009, `s06` 1016, `s07` 1026, `s09` 1034, `s10` 1041, `s11` 1046, `s13` 1054, `s14` 1060, `s15` 1066.
- `GLOSSARY` 1074; speler vanaf 1077; `drawChapterCard()` 1143.

## Zo pas je deze film aan

1. **Routekaart**: `BM`, organen `NIER_L/R`, `BLAAS`, `LEVER`, paden `LEIDER_L/R`, `PLASBUIS`, `VAN_SPIER`, `NAAR_LEVER`, `LEVER_NIER`; `bodyMap5(o)` met `longen`, `hart`, `lever`, `nieren`, `leiders`, `blaas`, `plasbuis`, `vaten`, `huid`, `vol` (blaasvulling) en `…Hl` (goud).
2. **Het filter**: `filterBase` (bloedbuis `BUIS_Y`, zeef `ZEEF_X`, voorurinebuis `FILT_Y`, glas `GLAS_X`) en `filterDeeltjes(t,{mode:'eruit'|'terug', waterTerug})`; de soort per deeltje staat in `FSOORT`.
3. **Kleur van urine**: `glas(x,y,k,lvl)` met k = 0 (bijna kleurloos) … 1 (donkergeel); kleuren `PLAS_LICHT`, `PLAS_DONKER`.
4. **Cues**: `T('woord',n)` = n-de héle woord in de take (`exactAt`); na tekstwijziging `python3 cuecheck.py`.
5. **Eén segment opnieuw inspreken**: Roos, eleven_v4, één take, `voice` uit `stem/segmenten_stem-invoer.json`; Scribe (`fetch_words.py`); mp3 (−16 LUFS) en woordtijden vervangen; `build_data.py`, `build.py`.
6. **Vragen, begrippen, basis/uitdaging, eindkaart**: zoals bij film 4 (`script_v2.md`, `bouw/film.json`, `src/check.html`, `s15`).
7. Na het bouwen: `python3 scripts/spelerfix.py --check` op de film (moet OK geven).

## Uitspraak

Toegepast: koolstofdioxide → "koolstofdie-oxide", 's avonds → "Savonds". **Wachtlijst:** ureum, urine, urineleiders, plasbuis, nefronen, dialyse, appelresten, kluwen, honderdtachtig (zie `uitspraak.md`).

## Aandachtspunten

- De vraag "wat hoort niet bij uitscheiding" gebruikt bewust "appelresten in je ontlasting": galkleurstof in de ontlasting is formeel wél uitscheiding (docentdeel).
- De nier als filter is een schema met deeltjes die het pad volgen (`along`); het aantal teruggaande waterdeeltjes (`waterTerug`) is een beeld, geen meting.
- Daan is het enige personage; niemand wordt gevraagd iets over zijn eigen plas te vertellen.

## Wijziging 20 okt 2026 (later die dag)
Cues hoofdlettergevoelig gemaakt (`exactAt`: "Je" ≠ "je"), zodat elke `T(woord,n)` op het bedoelde woord valt; enkele cue-indexen aangepast. Gecontroleerd met `bouw/cuectx.py` (nieuw). Geen nieuwe audio.
