# Op lengte gesorteerd — bronmap

Versie 2.0 is een beeld-remake op prompt v13 met behoud van de take (brief `films/OPWAARDEREN-DNA-7-8-TECHNIEKEN.md`, 31 okt 2026). De oude 'Labjournaal'-film (1.0, eigen speler `OLG`, één canvas met eigen look) staat in `oud/` (`index-1.0.html`, `info-1.0.md`, `script-1.0.md`). Lijsten voor Kamiel: `opwaardering-v13.md`; storyboard: `storyboard-remake.md`; bronnen: `bronnen.md`.

| Veld | Waarde |
|---|---|
| Bestand | films/dna-technieken/2-op-lengte-gesorteerd/index.html (audio in `audio/s01–s38.mp3`; `gelfilm.mp3` blijft staan voor het practicum) |
| Reeks / nummer | DNA-technieken, film 2 van 2 (vorige: Op maat gekopieerd · PCR); hoort bij de stap Gelfoto van `tools/dna-profielen/` |
| Doelgroep / niveau | havo + vwo, één niveau (geen vwo-blokken); geen voorspelvragen (zoals 1.0) |
| Versie / datum | 2.0 · 31 okt 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (31 okt 2026, beeld-remake, takes behouden). Bewust niet: geen voorspelvragen (was al zo; de take heeft er geen) |
| Stem / model | Roos (ElevenLabs), de oorspronkelijke doorlopende take van 1.0 (model onbekend); niet opnieuw ingesproken |
| Duur | spraak 232 s; met titel, vijf hoofdstukkaarten en eindkaart 252,7 s = **4:13** (was 3:59) |
| Beeldstijl | Part C: Schema (gelfoto, gelbak, schema's), Micro zonder korrel (agarose-netwerk, dna-stukken), Macro-achtig lab in de opening (Noor bij het gel-documentatiekastje) |
| Audio-opslag | 38 losse mp3's (`../audio/sNN.mp3`, 96 kbps mono), per regel geknipt uit `gelfilm.mp3` op de regeltijden van `OLG_TL` (`olg_tl.json`); knippunten per segment in `segments.json` (`src`) en `script.md`; woordtijden `stem/woordtijden/` (silalign, op de stem-invoer met getallen voluit) |
| Engine | FILMDATA-straat (zelfde speler als de DNA-reeks: snelheid, Vragen aan/uit, Havo/Vwo, review) |

## Opbouw
| Hoofdstuk | Segmenten | Look | Kernbeeld |
|---|---|---|---|
| Opening | s01–s03 | Schema/lab | doorlopende zoom van het gel-documentatiekastje met Noor (outfit practicum) naar de gelfoto; baan Sp en band 140 bp; twee vraagkaartjes |
| 1 Hoe de gel werkt | s04–s12 | Schema + Micro | zoomcirkel naar agarose; putje in doorsnede met `micropipet` (bibliotheek) en zakkende laadbuffer; dna-stuk met min-tekens tussen min en plus; gelbak in bovenaanzicht (min boven, zoals de foto); kort glipt/lang haakt; drie lengtes in één baan; kopieën → één band; 1 % tegen 4 % met baantjes; ongekleurd → kleurstof + blauw licht |
| 2 Lengte aflezen | s13–s20 | Schema | marker/spoor/ladder uitvergroot (`GZOOM`); lijn naar de marker; ± 140 bp; afstanden tussen markerbanden; lengtegebieden per STR op dezelfde schaal; STR-stuk met flanken en 13 × TCTA; 140 − 88 = 52, 52 : 4 = 13; allelladder |
| 3 Profielen vergelijken | s21–s28 | Schema | chromosoom 8 van vader (donkerblauw) en moeder (zandgeel); één of twee banden; amelogenine; lijnen door de banden van het spoor; B valt af (TPOX 80 bp), A past (portretjes: figuranten); menigte; kansladder |
| 4 Controles en rare banden | s29–s36 | Schema | NC met `pcrBuisje`, primer-dimeren, tijdelijk besmet; PC met vinkjes, tijdelijk leeg (en C leeg); stotterband 172/168; mal met uitgeluste herhaling en polymerase; mengsel D3S1358 met de eigenaar |
| Samenvatting | s37–s38 | Schema | vier kaartjes: sorteren, aflezen, controles, vergelijken; eindkaart |

## Vragen
Geen voorspelvragen. Checkvragen A–F en docentdeel staan in `film.py` (overgenomen uit 1.0 via `oud_page.json`; tekst ongewijzigd).

## Begrippen en docentdeel
Begrippen (14, tekst gelijk aan 1.0) en het docentdeel in `film.py` (`glossary`, `sections`). Docentdeel uitgebreid met 'Hoe de film het uitlegt', 'Getallen' (kit, kansladder) en 'Vereenvoudigingen'.

## Waar wat in de HTML zit
Regelnummers in `../index.html` (2.0): r. 103 begrippen, r. 105 checkvragen, r. 114 docentdeel, r. 145 `window.FILMDATA`; r. 11012 gelmodel (`KIT`, `PROFILES`, `LANE_BANDS`, `gelGeo`, lay-outs `GFULL`/`GLINKS`/`GZOOM`), r. 11080 `gelFoto`, r. 11190 `gelbakBoven`, r. 11215 `Object.assign(SCENES, …)` (s01 r. 11220, s13 r. 11340, s21 r. 11397, s29 r. 11461), r. 11538 `samenKaarten`.

## Zo pas je deze film aan
- `bash bron/bouw.sh <werkmap buiten de repo>` zet de werkmap op en bouwt `film/2-op-lengte-gesorteerd.html`. Kopieer die naar `../index.html`, zet het regeltje 'donker is standaard' direct na `<meta charset>` en draai in de repo spelerfix, antwoordtekst, kortantwoord, antwoordletter, flipkaarten, tabel_mobiel, licentie_noot, teller en oefenen.
- Scènes: `src/scenes_gel.js` (één functie per regel, cue-woorden met `q.at`), tekenhulpen en gelmodel: `src/teken_gel.js`. Pagina-inhoud: `film.py`.
- **Gelmodel = practicum.** `KIT`, `PROFILES`, `profileBands`, marker en allelladder zijn byte-gelijk aan versie 1.0 en aan de kopie in `tools/dna-profielen/index.html` (r. 3776 e.v.). Verander je de kit of profielen, doe het dan ook in het practicum.
- **Het practicum speelt nog de oude film.** `tools/dna-profielen/` heeft een eigen kopie van de 1.0-engine en speelt `gelfilm.mp3`; die mp3 blijft daarom staan. Wil Kamiel ook in het practicum het nieuwe beeld, dan moet het practicum naar deze pagina (of naar `audio/`) gaan verwijzen (zie vragen in `opwaardering-v13.md`).
- Een regel opnieuw inspreken: nieuwe mp3 als `audio/sNN.mp3`, woordtijden opnieuw met `bouw/silalign.py` (zie `bouw/cut.py` voor de aanroep), daarna bouwen.

## Aandachtspunten
- Woordtijden zijn geschat uit stiltes (silalign), niet getranscribeerd; de beeldmomenten hangen aan woorden, een afwijking van een paar tienden is mogelijk.
- 'Een ander spoor' in s36 is een tweede, bedacht spoor (mengsel bij D3S1358); het spoor van de volle gel is geen mengsel.

## Wijzigingen
- 31 okt 2026 — Versie 2.0: beeld-remake op prompt v13, take behouden (per regel geknipt). Van de eigen 'Labjournaal'-speler naar de FILMDATA-straat; alle scènes opnieuw getekend (zie `opwaardering-v13.md`, per scène één regel). Hoofdstukkaarten 1,3 s, titel en eindkaart nieuw; sitebalk '← Terug naar DNA' en 'donker is standaard' behouden.
