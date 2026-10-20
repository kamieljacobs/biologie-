# Zenuw- en hormoonstelsel — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32a/7-zenuw-en-hormoonstelsel/index.html` (audio in `audio/`: 12 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, film 7 (32A Organismen, bullet 3: samenwerking van organen in het zenuwstelsel en het hormoonstelsel; bullet 4: samenwerkende stelsels houden het lichaam gaande) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s06: de reflex). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea, flow `6oSfAQ8goWBUkX1rB5Yq` (node- en sessie-id's per take in `stem/tts.json`, generatie-id's in `stem/generaties.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes (`stem/scribe.json`); alle 12 takes woord voor woord gelijk aan de stem-invoer (blinde controle in `bouw/woordtijden.py`) |
| Duur | audio 272 s; speeltijd Uitdaging ± 5:35, Basis ± 5:10 (met vragen; hoofdstukkaarten 1,3 s) |
| Credits | TTS 3936 (= tekens); Scribe ± 1500 (raming 5,5/s; de tool meldde 0) |
| Beeldstijl | Part C, vlak. Eigen lichaamsschema (`lijf`, `zenuwnet`, `klier`, `adrenaline`, tabel `P7`): **zenuwsignaal teal** (puls die over de zenuw loopt), **hormoonklieren en adrenaline paars**, spieren koraal, goud = focus. Afwijking van film 2/2b: daar stond het zenuwstelsel paars (`bodyOrgans`); hier volgt de film Part C (teal = zenuwsignalen, paars = hormonen). Macro-dag voor klaslokaal en schoolplein met de vaste personages (Sam, Noor, Lotte; in de omroep ook Daan, Yasmin, Bilal). Beelden gecontroleerd op contactbladen (`bouw/shots.py`) |
| Audio-opslag | losse mp3's per take, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v6 Part D; fase 1 (brief, script v1, drie reviews, v2, draaiboek) en fase 2 (inspreken, bouwen) op 19–20 okt 2026 zonder checkpoint (Kamiel: "doe ook maar die stappen"); speler met spelerfix 20 okt (vragen-uit-knip, hoofdstukkaart 1,3 s) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `brief.md` · `draaiboek.md` · `docentdeel.md` · `begrippen.json` · `uitspraak.md` · `index_entry.json` · `tts_schatting` | fase 1: filmbrief, beeld per segment, docentdeel (wordt de docentsectie van de pagina), begrippen, uitspraakwachtlijst, regel voor `index.html`, tekentelling |
| `script_v2.md` | het script (bron van alles); `script_v1.md` de versie vóór de reviews; `reviews/` de drie reviews; `script.md` de ingesproken tekst per take met filmtijd |
| `stem/segmenten_stem-invoer.json` | per segment `display` (ondertitel) en `voice` (letterlijke stem-invoer); vragen met antwoord en uitleg |
| `stem/woordtijden/sNN.json` · `stem/generaties.json` · `stem/tts.json` · `stem/scribe.json` | Scribe-woorden per take · generatie-id en duur · flow/node/sessie per take |
| `filmdata.json` | de data zoals ingebed in de film |
| `src/scenes7.js` | alle tekeningen en scènes van deze film (één functie per segment) |
| `src/config.json` · `src/vragen.json` · `src/uitspraak_film.json` | titel, meta, hoofdstuk-subtitels (`mini`), eindkaart-`hold`, checkvragen · vraagteksten · film-eigen stem-regels ("1B" → "één-bee") |
| `src/head.html`, `src/lib.js`, `src/helpers.js`, `src/lib_cast.js`, `src/player_block.html`, `src/tail.html` | gedeelde onderbouw-onderdelen (kop/CSS van Vertering, Part C-bibliotheek, hulpjes film 1–2, personages, speler mét spelerfix, slot) |
| `bouw/` | `maak_segmenten.py` (script_v2 + vragen → segmenten, telling) · `haal_audio.py` (takes ophalen, −16 LUFS) · `woordtijden.py` (Scribe → woordtijden + blinde vergelijking) · `bouw.py` (alles → `film/index.html`) · `cuecheck.py` · `shots.py` (stills, contactbladen) · `speeltest.py` + `rangeserver.py` (Playwright: Basis/Uitdaging, Vragen aan/uit, 1,5×) |

**Werkmap opzetten:** maak een map met de naam van de film; zet `script_v2.md`, `docentdeel.md`, `begrippen.json` erin, `src/vragen.json` en `src/uitspraak_film.json` in de map zelf, `stem/` en `src/` ernaast; maak `_base/` (head, lib, helpers, tail uit `src/`) en `_engine/player_block.html` op de paden die bovenin `bouw/bouw.py` staan (of pas die paden aan). Dan: `python3 bouw/maak_segmenten.py .` → `python3 bouw/bouw.py .` → `film/index.html`; audio in `film/audio/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro: klas → plein | Sam en Noor achter de tafel; brandalarm (bel met teal ringen); ze springen op; buiten op het plein met Lotte, hartslag-pil "bonk bonk"; "hoe wisten je benen en je hart het?" |
| s02 | Titel | Schema | titel met lichaam, teal puls over het zenuwnet, paarse klieren |
| s03 | H1 Het snelle bericht | Schema | twee manieren (pillen); oor = zintuig; geluid/licht/warmte/aanraking; teal signaal; zoomcirkel doorsnede zenuw; vraagteken bij de benen |
| q04 | H1 | vraag | welke weg naar je benen? |
| s05 | H1 | Schema | puls oor → hersenen ("alarm!") → ruggenmerg → beenspieren (koraal, korter); zenuwstelsel benoemd; voetbalveld met teal stip (± 100 m/s) |
| s06 | H1, uitdaging | Schema | arm bij hete pan; puls hand → ruggenmerg → armspier, hand weg; tweede puls naar de hersenen, "au!" daarna; reflex |
| s07 | H2 Het lange bericht | Macro plein → Schema | hart bonkt nog; puls hersenen → bijnieren (via een zenuw); bijnieren paars op de nieren; adrenaline het bloed in; kaart "hormoon" |
| q08 | H2 | vraag | waar komt de adrenaline terecht? |
| s09 | H2 | Schema + omroep | adrenaline overal (1 minuut rond); schoolomroep met klas 1A/1B/1C, alleen 1B loopt; hart, longen, lever lichten op; balkje adrenaline zakt in minuten |
| s10 | H2 | Schema | vijf hormoonklieren met taak (hypofyse, schildklier, bijnieren, alvleesklier, eierstokken of zaadballen); "hormonen regelen" |
| s11 | H3 Twee manieren, één team | Schema | telefoon → één spier (teal) naast luidspreker → hele lichaam (paars); rijen SNEL/LANGZAMER, ÉÉN PLEK/OVERAL, KORT/LANG |
| q12 | H3 | vraag | welk bericht gaat via een hormoon? |
| s13 | H3 | Schema | kaartjes schuiven naar zenuwen/hormonen; hersenen → zenuwen en hypofyse → andere klieren; tijdlijn: teal piek (< 1 s) en paarse heuvel (minuten); haak "twee orgaanstelsels, één reactie" |
| s14 | Samenvatting | Schema | twee kaarten (zenuwstelsel · hormoonstelsel); lichaam: benen via zenuwen, hart via adrenaline |
| s15 | Eindkaart | Schema | Probeer het zelf: liniaalproef, zenuw of hormoon?, rondleiding; open vraag; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q04 | Welke weg neemt het bericht naar je benen? | oor → zenuw → beenspieren · oor → hersenen → ruggenmerg → beenspieren · oor → bloed → beenspieren | b |
| q08 | Adrenaline moet je hart sneller laten kloppen. Waar komt hij terecht? | alleen bij je hart · alleen in je hersenen · overal | c |
| q12 | Welk bericht gaat via een hormoon? | groeien · knipperen · voet terugtrekken | a |
| eindkaart | Je hart bonkt nog minuten na de schrik, je benen trillen al niet meer. Hoe kan dat? | open | — |

## Waar wat in de HTML zit (`index.html`)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk (versie 1.0).

- Pagina-tekst (kop, speler, checkvragen, docentdeel): regel 1–148; checkvragen vanaf 96, docentdeel vanaf 112.
- `window.FILMDATA` (segmenten, woordtijden, vragen): regel 149.
- Tekenbibliotheek (`lib.js`) vanaf regel 150; hulpjes film 1 en 2 vanaf 354; personages (`lib_cast.js`) vanaf 635; scènes van deze film vanaf 865.
- `const SCENES` regel 945; `s01` 947, `s02` 958, `s03` 962, `s05` 977, `s06` 991, `s07` 1010, `s09` 1023, `s10` 1044, `s11` 1052, `s13` 1064, `s14` 1088, `s15` 1098.
- Begrippen: `GLOSSARY` regel 1107. Speler vanaf regel 1116; `drawChapterCard()` 1182 (subtitels in `mini`).

## Zo pas je deze film aan

1. **Het lichaam**: ankerpunten in `P7`, maat in `LB` (`src/scenes7.js`); zenuwnet in `zenuwnet()`, klieren in `klier()`, adrenaline-doelen in `ADR_DOEL`. Paden van de pulsen: `PAD_OOR_BREIN`, `PAD_BREIN_BEEN(2)`, `PAD_BREIN_BIJ`.
2. **Een scène**: functie `sNN` in `SCENES`; cues hangen aan woorden via `q.at('woord', n)` (n = de hoeveelste keer dat het woord in de take voorkomt; draai `bouw/cuecheck.py` na een wijziging).
3. **Eén alinea opnieuw inspreken**: Roos, eleven_v4, één take, stem-invoer uit `voice`; daarna Scribe op die take; `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen, `bouw.py` opnieuw.
4. **Vraag aanpassen**: in `script_v2.md` (opties, volgorde) en `src/vragen.json` (vraagtekst, goed, uitleg), dan `maak_segmenten.py` en `bouw.py`.
5. **Basis of uitdaging**: [VWO-START] … [VWO-END] in `script_v2.md` (intern `level: vwo`, in beeld 'uitdaging'); checkvraag met `"uitdaging": true` in `config.json`; begrip met `"uitdaging": true`.
6. **Docentdeel**: `docentdeel.md` wordt bij het bouwen omgezet (alles vóór "## Checkvragen"); checkvragen staan in `config.json`.
7. Na elke bouw: `python3 scripts/spelerfix.py --check <film>` moet OK geven.

## Uitspraak

Geen uitspraaktest vooraf (afspraak 13-10-2026). Stem-invoer: gewone spelling (eleven_v4), behalve "1B" → `één-bee`. Blinde Scribe-controle: alle risicowoorden kwamen terug zoals bedoeld. **Wachtlijst voor de batchtest:** adrenaline (s07, s09, s13, s14), hypofyse (s10, s13; 2b gebruikte "hiepofyse"), bijnieren (s07), hormoonklier(en) (s07, s10, s13, s14), reflex (s06), één-bee (s09). Zie `uitspraak.md`.

## Aandachtspunten

- Kleur zenuwstelsel wijkt bewust af van film 2/2b (zie Beeldstijl).
- Het opspringen bij het alarm loopt in de film via de hersenen ("je hersenen herkennen het geluid"); dat het een grotendeels onbewuste schrikreactie is, staat in het docentdeel.
- Dat het hart minuten doorbonkt wordt alleen aan adrenaline toegeschreven (vereenvoudiging, docentdeel).
- Liniaalproef op de eindkaart is nog geen tool of werkblad op de site; link later toevoegen.
