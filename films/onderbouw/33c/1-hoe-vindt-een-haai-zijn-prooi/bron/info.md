# Hoe vindt een haai zijn prooi? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/33c/1-hoe-vindt-een-haai-zijn-prooi/index.html`. De audio staat los in `audio/` (16 mp3's) en zit niet in de HTML. |
| Reeks | Kerndoelen onderbouw, losse film. Kerndoel **32A** bullets 2–3: bouw van dierlijke organen en weefsels (zintuigen, skelet, kieuwen). **32B** bullet 3: natuurlijke selectie. **33C** bullets 2 en 4: voedselweb en dynamisch evenwicht. **29B** bullets 2–3: structuur en functie, schaal en hoeveelheid. Bron: SLO, definitieve conceptkerndoelen mens en natuur, nov. 2025. |
| Doelgroep / niveau | Onderbouw leerjaar 1–3, één niveau (basis) zonder uitdagingsblok, dus geen niveauschakelaar. Volgens BEELDAFSPRAKEN (Onderbouw) noemt de film nergens schoolniveaus: niet in beeld, stem of docentdeel. |
| Versie / datum | 1.0 · 16 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per segment, flow `1XH3BOpKpHaUR1wxI2vR`. De generatie-id's staan in `stem/generaties.json`; `versie: 2` = opnieuw ingesproken na de review. |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes. Alle 16 takes kloppen woord voor woord met de schermtekst. |
| Duur | 252 s gesproken audio. Met hoofdstukkaarten, vier vragen en de eindkaart (12 s) is de speeltijd ± 5:50. |
| Beeldstijl | Part C. **Macro-nacht onder water** (`sea()`) voor de jacht en de baai; **Schema** voor de zijlijn, het skelet, lever/zwemblaas, de tanden, selectie, het voedselweb en de getallen. De rode draad is één haai op nachtjacht met een **afstandsbalk** bovenin (`distBar`): honderden m → ± 15 m → ± 2 m → ± 20 cm. Personage: Daan (lib_cast) bij de oorschelp. De beeldcheck staat in `stijlframes/beeldcheck_v1.jpg`. |
| Audio-opslag | Losse mp3's per segment, gemasterd naar −16 LUFS (ffmpeg loudnorm in twee passes, 128 kbps, 44,1 kHz). |
| Herkomst | Uitlegfilm-prompt v6, Part D onderbouw. Script en filmbrief staan in de Claude-doc "Filmbrief + script — Hoe vindt een haai je?". Kamiel gaf akkoord op het script ("het is goed"). Een frisse review leidde tot v2 (`reviews/`). |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Het script; dit is de bron van alles. `script_v1.md` is de versie vóór de review. |
| `script.md` | Tekst per segment met tijden en het audiobestand. |
| `stem/segmenten_stem-invoer.json` | Per segment de schermtekst (`display`) en de letterlijke stem-invoer (`voice`). |
| `stem/woordtijden/sNN.json` · `stem/generaties.json` | Woordtijden per take (Scribe) · generatie-id, duur en (tijdelijke) url per take. |
| `filmdata.json` | De data zoals die in de film is ingebed. |
| `src/lib.js`, `src/helpers1.js` | De Part C-bibliotheek en algemene hulpjes (uit de vertering-film). |
| `src/lib_cast.js` | Kopie van `personages/lib_cast.js`. |
| `src/scenes_haai.js` | Haai-tekenwerk en één scènefunctie per segment (zie onder). |
| `src/player.js`, `src/page.html` | De speler (meta "onderbouw · kerndoelen · haaien", hoofdstuk-subtitels in `mini`, geen niveauschakelaar) en het paginasjabloon met checkvragen, begrippen en docentdeel. Sinds 16 okt 2026 is de speler die van Vertering, met afspeelsnelheid (0,75–1,5×) en **Vragen aan/uit**. Beide worden onthouden (`bk-snelheid`, `bk-vragen`), net als in de andere films. Bij Vragen uit vallen de vraagkaarten weg en knipt `vraagCuts` de gesproken vraagzinnen ("… Wat denk je?") uit s03, s06, s09 en s15. |
| `bouw/make_segments.py` | `script_v2.md` → `segments.json`. Een lege regel betekent een nieuwe take; respellings staan in `subs`. |
| `bouw/build_data.py` | Segments + woordtijden + vragen (`answers`, `qtext`) → `filmdata.json`. `HOLD` = hoe lang de eindkaart blijft staan. |
| `bouw/build.py` | Plakt helpers1 + lib_cast + scenes_haai tot `scenes.js`, voegt lib/player in `page.html` in en schrijft `film/index.html`. |
| `bouw/cuecheck.py` | Controleert of elk `q.at()`-woord voorkomt. |
| `bouw/shots.py`, `bouw/shots_at.py` | Stills en contactsheet (Playwright; lettertypes lokaal invoegen als Google Fonts niet bereikbaar is). |
| `bouw/fetch.py` | Takes en woordtijden ophalen. |

**Werkmap opzetten:** kopieer `src/`, `bouw/*.py` en `script_v2.md` naar een werkmap buiten de repo. Zet `stem/segmenten_stem-invoer.json` daar als `segments.json` en `stem/woordtijden/` als `words/`. Daarna geeft `python3 build_data.py && python3 build.py` het bestand `film/index.html`. De audio hoort in `film/audio/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro-nacht | bloedwolkje, haai in de verte, "klopt dat eigenlijk?", water wordt donker |
| s02 | Titel | Schema | "Haaien" met een grote haai |
| s03 | H1 Van ver naar dichtbij | Macro-nacht | spartelende vis, geluidsringen, afstandsbalk bij "honderden meters", gehoor → reuk |
| q04 | H1 | vraag | hoeveel water om één druppel bloed? |
| s05 | H1 | Schema | zwembad in de zee, bloed verdunt, stroming, "kilometers ver? nee" |
| s06 | H1 | Macro-nacht → Schema | ogen (± 15 m), schemakaart van de zijlijn, trillingen, de vis duikt het zand in |
| q07 | H1 | vraag | hoe vindt de haai de vis in het zand? |
| s08 | H1 | Macro-nacht | elektrische signalen van de vis, inzoomcirkel op de snuit met gaatjes, ± 20 cm |
| s09 | H2 Het lijf van een jager | Schema | tijdlijn 450 miljoen jaar (bomen, dinosauriërs), kraakbeenskelet, Daan met oorschelp, zakpijl |
| q10 | H2 | vraag | wat houdt hem het meest omhoog? |
| s11 | H2 | Schema | vis met zwemblaas naast een haai met lever vol olie, lift van de vinnen |
| s12 | H2 | Macro-nacht | witte haai zwemt (water langs de kieuwen), verpleegsterhaai op de bodem |
| s13 | H2 | Schema | kaak als lopende band: nieuwe tanden, in gebruik, valt uit |
| s14 | H2 | Schema | rij haaien met verschillende zijlijnen, meer eten, vaker jongen, generaties |
| s15 | H3 Wie is er bang voor wie? | Schema → Macro-nacht | voedselweb met de tijgerhaai bovenaan, daarna de baai: zeegras, doejongs, schildpadden, haaien in het ondiepe |
| q16 | H3 | vraag | de tijgerhaaien verdwijnen: wat met het zeegras? |
| s17 | H3 | Macro-nacht | baai zonder haaien: grazers overal, zeegras kaal; daarna weer terug |
| s18 | H3 | Schema | 65 mensen (9 rood) tegenover 80 haai-iconen (1 icoon = 1 miljoen) |
| s19 | Samenvatting | Macro-nacht | afstandsbalk met vier zintuig-iconen die oplichten |
| s20 | Eindkaart | Schema | Probeer het zelf: "Voel de trilling", denkvraag, credits; blijft 12 s staan |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q04 | Hoeveel water mag er hoogstens om één druppel bloed zitten, zodat een haai hem nog ruikt? | een emmer water · een groot zwembad · de hele oceaan | b |
| q07 | De vis ligt in het zand. Hoe vindt de haai hem nu? | met zijn ogen · met zijn zijlijn · met zijn elektrisch zintuig | c |
| q10 | Een haai is iets zwaarder dan water. Wat helpt hem het meest om niet te zakken? | een zwemblaas vol lucht · een grote lever vol olie, en zwemmen · zijn botten zijn hol | b |
| q16 | De tijgerhaaien verdwijnen uit de baai. Wat gebeurt er met het zeegras? | er komt meer zeegras · er komt minder zeegras · er verandert niets | b |

De uitleg per vraag staat in `bouw/build_data.py` (`answers`).

## Begrippen

zintuig, zijlijn, elektrisch zintuig, kraakbeen, natuurlijke selectie (met erfelijk), toppredator, voedselweb. Ze staan in `GLOSSARY` op regel 1090.

## Docentdeel

- Doelgroep en kerndoelen.
- Tabel per hoofdstuk.
- Vier misconcepties: de bloeddruppel van kilometers ver, altijd moeten zwemmen, aanpassen omdat het moet, minder roofdieren is beter.
- Pauzemomenten.
- Getallen met bronnen: reuk, ogen, zijlijn, elektrisch zintuig, 450 miljoen jaar, lever, tanden, ISAF 2025, Worm et al. 2024.
- Vereenvoudigingen: afstanden niet op schaal; "zeekoeien" zijn doejongs; Shark Bay met het effect via gedrag.
- Leerdoelen met dekking.

Checkvragen: 1 zintuigen op volgorde, 2 natuurlijke selectie uitleggen, 3 wie is gevaarlijk voor wie / voedselweb.

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Er zijn geen blobs: `film.src.html` = `index.html`, dus de regelnummers zijn gelijk.

- Paginatekst: regel 90–146. Checkvragen vanaf 94, docentdeel vanaf 106, footer 146.
- `window.FILMDATA`: regel 147.
- Bibliotheek vanaf regel 150 (`zoomCircle` 234, `pill` 358). `persoon` (lib_cast) staat op 552.
- Haai-hulpjes: `sea` 742, `shark` 761. `distBar`, `fishy`, `cloud`, `schildpad`, `zeekoe` en `grasVeld` volgen daarna.
- Scènes: `const SCENES` regel 863.
  - `s01` 865, `s02` 876, `s03` 882, `s05` 896, `s06` 907, `s08` 927, `s09` 945
  - `s11` 967, `s12` 977, `s13` 989, `s14` 1007, `s15` 1019, `s17` 1034, `s18` 1041
  - `s19` 1054, `s20` 1067
  - `bayScene` 1075, `GLOSSARY` 1090

## Hoe je de film aanpast

- **Tekst van een segment:** pas `script_v2.md` aan en draai `make_segments.py`. Spreek alleen dat segment opnieuw in: Roos, eleven_v4, één take. Haal de woordtijden op met Scribe en master naar −16 LUFS. Draai daarna `build_data.py`, `cuecheck.py` en `build.py`.
- **Beeld:** pas de scènefunctie aan in `src/scenes_haai.js`. Beeldmomenten hangen aan gesproken woorden via `q.at('woord', n)`, dus na een tekstwijziging moet `cuecheck.py` opnieuw draaien.
- **Vraag of uitleg:** pas `answers`/`qtext` aan in `build_data.py`.
- **Docentdeel of begrippen:** pas `src/page.html` aan.

## Aandachtspunten

- **Uitspraak:** de stem-invoer schrijft getallen voluit: "vierhonderdvijftig miljoen" en "tachtig miljoen". De woorden risicowoorden zijn dinosauriërs, verpleegsterhaai, "in het jaar 2025" en 65. Blinde controle (Scribe op de geüploade mp3, zonder script) op 16 okt 2026: s09 "450 miljoen … dinosauriërs" en s12 "verpleegster haai" kwamen goed terug; s18 (2025, 65, tachtig miljoen) klopt in de woordtijden.
- **Getallen:** het zeegraseffect is gemeten als gedragseffect in Shark Bay. De film zegt daarom voorzichtig "kan kaal gegeten worden" en "helpt de baai gezond te houden".
- **Beeldafspraken:** geen grain, geen wijslijnen (labels staan direct bij het object).
