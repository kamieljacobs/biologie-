# Ademhaling en bloedsomloop — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32a/4-ademhaling-en-bloedsomloop/index.html` (audio in `audio/`: 15 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, film 4 (32A Organismen; bullet 3: ademhalingsstelsel en bloedvatenstelsel; bullet 4: verbranden met zuurstof, samenwerkende stelsels) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde klassen; geen schoolniveaus in beeld, stem of docentdeel. Basislijn + één blok **uitdaging** (s12: kleine en grote bloedsomloop). Schakelaar **Basis / Uitdaging** (`?niveau=basis`) |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per segment, flow `RqpkQL8Lshm53TvXJJdw` (generatie-id's in `stem/generaties.json`, node- en sessie-id's in `stem/tts_sessies.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes (verbonden met de tts-node); alle 15 takes woord voor woord gelijk aan het script |
| Duur | audio 289 s (+ 0,45 s per take); speeltijd Uitdaging ± 5:55, Basis ± 5:35; met Vragen uit ± 5:05 |
| Beeldstijl | Part C, vlak. Rode draad: één zuurstofdeeltje op een **routekaart** van het lichaam (Schema, van voren bekeken): neus → luchtpijp → longen → hart → slagader → haarvaten in de kuit → ader → hart → longen. Micro alleen in zoomcirkels (longblaasje, haarvat bij een spiercel). Macro-dag: zwembad met Noor (cold open, s16). Bloed nergens blauw |
| Audio-opslag | losse mp3's per segment, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v6 + Part D; brief, script v1 → drie reviews → v2, draaiboek: zie hieronder; gebouwd zonder checkpoint (fase 2, Kamiel 19 okt "doe ook maar die stappen") |
| Credits | TTS 4234 tekens (eleven_v4); Scribe 289 s audio |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `brief.md` | ingevulde filmbrief (Part A1 + D): kerndoel, puzzel, haak, rode draad, wat er níet in zit |
| `script_v2.md` | het script (bron van alles); `script_v1.md` de versie vóór de reviews; `reviews/` vakinhoud, begrijpelijkheid, film/beeld |
| `script.md` | gesproken tekst per segment met starttijd, duur, audiobestand en stem-invoer |
| `draaiboek.md` | per segment de look, wat er in beeld gebeurt, cues, herbruikte en nieuwe tekeningen |
| `uitspraak.md` | toegepaste respellings en de wachtlijst voor de batchtest |
| `docentdeel.md`, `begrippen.json`, `index_entry.json`, `tts_schatting` | fase-1-materiaal (docentdeel staat als HTML in `src/docent.html`) |
| `stem/segmenten_stem-invoer.json` | per segment de schermtekst (`display`) en de letterlijke stem-invoer (`voice`) |
| `stem/woordtijden/sNN.json` · `stem/generaties.json` | woordtijden per take (Scribe) · generatie-id en duur per take |
| `filmdata.json` | de data zoals ingebed in de film |
| `src/lib.js`, `src/helpers.js`, `src/lib_cast.js` | Part C-bibliotheek; hulpjes uit films 1–3 (lichaam, hart, longen, spiercel, cel); personages (Noor) |
| `src/scenes4.js` | alle tekeningen en scènes van deze film (zie draaiboek) |
| `src/player.js`, `src/page.html`, `src/check.html`, `src/docent.html` | speler (met spelerfix 20 okt: knipmarge en CARD_DUR 1,3) en paginasjabloon met checkvragen en docentdeel |
| `bouw/film.json` | titel, meta, hoofdstuk-subtitels (`mini`), vragen, begrippen, voet, eindkaart-hold |
| `bouw/make_segments.py` → `bouw/build_data.py` → `bouw/build.py` | script → segments.json (stem-invoer via `films/uitspraak.json`) → filmdata.json → `film/index.html` |
| `bouw/cuecheck.py`, `bouw/shots.py`, `bouw/speeltest.py`, `bouw/rangeserver.py` | cue-controle (`T('woord',n)` = heel woord, n-de keer) · stills en contactsheet · alle frames in Basis/Uitdaging × Vragen aan/uit + afspelen op 1,5× · lokale server met Range |
| `bouw/fetch_tts.py`, `bouw/fetch_words.py`, `bouw/maakbron.py` | takes en woordtijden ophalen uit een ElevenLabs-statusbestand · film + bronmap in de repo zetten |

**Werkmap opzetten:** kopieer `bouw/*` en `src/*` (src in een map `src/`) en `script_v2.md` naar een werkmap buiten de repo; zet `stem/segmenten_stem-invoer.json` daar als `segments.json`, `stem/woordtijden/` als `words/`, `stem/generaties.json` als `generaties.json`, `src/check.html` en `src/docent.html` naast `film.json`; mp3's in `audio/`. Dan `python3 build_data.py && python3 build.py` → `film/index.html` (kopieer `audio/` naar `film/audio/` om te testen).

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Zwembad → zoomcirkel | Noor onder water, teller 0:30, komt boven; een cel in de teen; spoor lucht → teen met "?" |
| s02 | Titel | Schema | titel, startvraag, routekaart met reizend deeltje |
| s03 | H1 Lucht naar binnen | Routekaart | neus, luchtpijp, linker- en rechterlong; "geen spieren"; middenrif trekt omlaag, borstkas groter |
| s04 | H1 | Routekaart + Micro | vertakking, longblaasjes (honderden miljoenen), haarvaten, dunne wand, veel → weinig, zuurstof erin, koolstofdioxide eruit |
| q05 | H1 | vraag | wat zit er in uitgeademde lucht? |
| s06 | H2 Rondgepompt | Schema → routekaart | twee bakken van 20 deeltjes (in/uit), driekwart, waterdamp; rode bloedcel naar het hart, ± 70/min |
| s07 | H2 | Routekaart → Micro | slagader (van het hart af, dikke wand, "slag·ader"), vertakking, haarvaten één voor één |
| s08 | H2 | Micro | spiercel in de kuit: zuurstof erin, voedingsstof + zuurstof → energie |
| s09 | H2 | Micro → routekaart → pols | koolstofdioxide het bloed in, ader naar het hart, pols met blauwige aders |
| q10 | H2 | vraag | welke kleur heeft het bloed in een blauwe ader? |
| s11 | H2 | pols → routekaart | donkerrood binnenin; helderrood/donkerrood; terug naar de longen; rondje ± 1 minuut |
| s12 | H2, uitdaging | Schema | twee pompen: kleine en grote bloedsomloop, dikkere wand links, twee keer door het hart |
| s13 | H3 Samen, ook onder water | Routekaart → Schema | ademhalingsstelsel + bloedvatenstelsel; Noor sport (tellers); te weinig rode bloedcellen |
| q14 | H3 | vraag | te weinig rode bloedcellen: waarom snel moe? |
| s15 | H3 | Schema | zuurstof genoeg, te weinig vervoer; ketting met gebroken schakel |
| s16 | H3 | Zwembad | Noor onder water: zuurstof daalt, koolstofdioxide stijgt, hersenen merken het |
| s17 | Samenvatting | Routekaart | hele route met namen, ketting, teen |
| s18 | Eindkaart | Schema | Probeer het zelf (hartslag, kalkwater, Vertering) + vraag bergbeklimmer; blijft 12 s staan |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q05 | Je ademt uit. Wat zit er in die lucht? | alleen koolstofdioxide · nog veel zuurstof, en meer koolstofdioxide · precies dezelfde lucht als je inademde | b |
| q10 | In een pols zie je blauwe aders. Welke kleur heeft het bloed daarin? | donkerrood, met minder zuurstof · blauw, want er zit geen zuurstof in · helderrood, net als in slagaders | a |
| q14 | Iemand heeft te weinig rode bloedcellen. Bij sport is hij snel moe. Hoe kan dat? | longen halen te weinig lucht binnen · hart pompt te langzaam · bloed kan minder zuurstof meenemen | c |

Eindkaart (open): de bergbeklimmer. Checkvragen 1–4 basis, 5 uitdaging (in `src/check.html`).

## Begrippen

middenrif, longblaasjes, haarvaten, slagader, ader, ademhalingsstelsel en bloedvatenstelsel · uitdaging: kleine en grote bloedsomloop. `GLOSSARY` op regel 1123 (uit `bouw/film.json`).

## Docentdeel

Doelgroep en kerndoel, tabel per deel, vijf misconcepties, pauzemomenten en Probeer het zelf (hartslag, kalkwater), getallen met bronnen, vereenvoudigingen, dekking. Bron: `src/docent.html`.

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

- Pagina-tekst: checkvragen vanaf regel 97, docentdeel vanaf 114, voet 152.
- `window.FILMDATA`: regel 153.
- Part C-bibliotheek (`lib.js`) vanaf 154; hulpjes films 1–3 vanaf 357; personages (`persoon`) vanaf 690.
- Film 4 vanaf regel 868: `exactAt` 875, `o2`/`co2`/`voedsel`/`rbc2` 878, routekaart `BM`/paden 889, `bodyMap` 897, zwembad `poolBase` 919, `alveolus` 931, `capillaryCell` 945, `wrist` 958, `chain` 964, `tweePompen` 973.
- Scènes: `const SCENES` regel 993; `s01` 994, `s02` 1004, `s03` 1006, `s04` 1019, `s06` 1035, `s07` 1048, `s08` 1059, `s09` 1065, `s11` 1073, `s12` 1084, `s13` 1085, `s15` 1092, `s16` 1099, `s17` 1106, `s18` 1115.
- Begrippen `GLOSSARY` 1123; speler vanaf 1126; `drawChapterCard()` 1192.

## Zo pas je deze film aan

1. **De routekaart**: coördinaten in `BM` en de paden `AIR`, `LUNG2HEART`, `SLAG`, `ADER`, `HEART2LUNG` (`src/scenes4.js`); `bodyMap(o)` met opties `longen`, `vaten`, `hart`, `middenrif`, `md` (middenrif omlaag 0–1), `breath`, `slagHl`, `aderHl`, `hartHl`, `beat`.
2. **Cues**: in de scènes `T('woord',n)` = het n-de héle woord in de take (`exactAt`); na een tekstwijziging `python3 cuecheck.py` (moet 0 problemen geven).
3. **Eén segment opnieuw inspreken**: Roos, eleven_v4, één take, stem-invoer uit `voice`; Scribe-woordtijden (`fetch_words.py`); `audio/sNN.mp3` (−16 LUFS) en `words/sNN.json` vervangen; `build_data.py`, `build.py`.
4. **Vraag aanpassen**: tekst van de opties in `script_v2.md` ([VRAAG]-regel), vraagzin/goed/uitleg in `bouw/film.json` → `questions`.
5. **Basis of uitdaging**: [VWO-START] … [VWO-END] in `script_v2.md`; checkvraag `class="q vwo-only"`, begrip met derde veld `true` in `film.json`.
6. **Eindkaart**: tekst in `s18`; duur via `hold` in `film.json`.
7. Na het bouwen: `python3 scripts/spelerfix.py --check` op de film (moet OK geven); licentievermelding zit in `page.html`.

## Uitspraak

Geen uitspraaktest vooraf (afspraak 13-10-2026). Toegepast: koolstofdioxide → "koolstofdie-oxide" (centrale lijst). **Wachtlijst voor de batchtest:** middenrif (s03), longblaasjes (s04, s17), haarvaten (s04, s07, s17), slagader(s) (s07, s17), linkerlong/rechterlong (s03), rechterhelft/linkerhelft (s12), bloedsomloop (s02, s12), driekwart (s06). Zie `uitspraak.md`.

## Aandachtspunten

- Het lichaam is een schema, van voren bekeken: de linkerlong staat rechts op het scherm ("van voren bekeken" in Meta).
- Eén slagader naar de kuit en één ader terug staan voor alle bloedvaten; de longslagader (zuurstofarm) wordt in de basis niet genoemd.
- De tellers bij sport (± 15 → 40 ademhalingen, ± 70 → 150 slagen per minuut) zijn "ongeveer"-waarden, geen meting.
- Het zwembad volgt de Macro-dag-variant; Noor komt half boven water (lichaam achter een doorzichtig watervlak).
