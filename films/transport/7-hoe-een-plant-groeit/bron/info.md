# Hoe een plant groeit — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/transport/7-hoe-een-plant-groeit.html (audio in films/transport/7-hoe-een-plant-groeit/audio/) |
| Reeks | Planten (hoofdstuk `planten` op de site, vwo H20); bestand staat om historische redenen in films/transport/ |
| Niveau | vwo (één niveau; `film.alleen = "vwo"` verbergt de havo/vwo-schakelaar) |
| Versie / datum | 1.0 · 15 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow p1OIm7h3RGpVBKSmumfR |
| Duur | spraak 5:46; speeltijd met kaarten en vragen ± 7:20 |
| Beeldstijl | Part C: Macro (cold open, kamer met raam, Daan), Schema (meeste scènes), Micro (H1 zones, H2 cel) |
| Personage | Daan (castboek `personages/lib_cast.js`; de engine laadt lib_cast.js nu mee) |
| Audio-opslag | 13 losse mp3's in audio/ (s01, s04, s06, s07, s08, s09, s11, s12, s13, s14, s16, s17, s18) |
| Herkomst | Hoofdengine (zoals de hormonen- en voedingfilms), werkmap `hw/p1`; gebouwd met Claude op verzoek van Kamiel ('komt nog' bij Transport) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Daan zet een zonnebloempje op de vensterbank; timelapse: buigt naar het raam. Vraag q02 (antwoord in H4, s13) |
| H1 Waar groeit een plant? | s04, q05, s06, s07 | Mens vs plant; spijker in een boom (q05); boom groeit alleen bij de top, meristeem in top en wortelpunten, cambiumring in doorsnede; zones achter de stengeltop (delen, strekken, differentiëren; houtvat en bastvat) |
| H2 Groeien met water | s08 | Cel neemt water op (osmose), vacuole zwelt, turgor, celwand soepel, cel rekt tot 10× |
| H3 Een stof uit de top | s09, q10, s11 | Darwin (kapje op het topje / lager), Went (agar, blokje scheef op een stengel zonder top, in het donker), auxine |
| H4 Naar het licht | s12, s13 | Stengelstuk als twee rijen cellen; auxine naar de schaduwkant; schaduwkant strekt meer; fototropie; antwoord openingsvraag |
| H5 Stengel omhoog, wortel omlaag | s14, q15, s16 | Liggende kiemplant in het donker; zoom wortelmuts met statolieten; auxine aan de onderkant; vraag q15; gevoeligheidscurven met nullijn, één concentratielijn; stengelstuk (onderkant langer → omhoog) en wortelstuk (onderkant korter → omlaag) |
| H6 Meer plantenhormonen | s17 | Vier kaarten: gibberelline, cytokinine, abscisinezuur (huidmondje sluit), ethyleen (banaan) |
| Recap | s18 | Vier panelen: meristemen, delen/strekken, naar het licht, op zijn kant |
| Eindkaart | s19 | drie regels |

## Vragen (allemaal antwoord b)
- q02: hoe buigt de plant? a lichtkant groeit harder en trekt · **b schaduwkant wordt langer** · c plant groeit naar het licht omdat hij licht nodig heeft
- q05: spijker na 10 jaar? a hoger · **b nog op één meter** · c lager
- q10: kapje op het topje? a buigt gewoon · **b blijft recht** · c buigt van het licht af
- q15: wat doet de wortel? a omhoog · **b omlaag** · c recht door

## Begrippen
meristeem, cambium, wortelmutsje, strekking, differentiatie, turgor, auxine, fototropie, gravitropie, statolieten, gibberelline, cytokinine, abscisinezuur, ethyleen (zie `film.json` → glossary).

## Docentdeel
In `sections.html`: checkvragen (5), hoe de film het uitlegt, vereenvoudigingen (Darwin/Went-historie, fototropines, zuurgroei, statolieten, schematische curven), leerdoelen, misconcepties, practicumsuggesties.

## Waar wat in de HTML zit (films/transport/7-hoe-een-plant-groeit.html)
- regel ± 100: checkvragen en docentdeel (uit `sections.html`)
- regel 157: `window.FILMDATA` (segmenten, woordtijden, vragen)
- regel ± 1261: `persoon()` uit lib_cast.js (Daan)
- regel ± 1483: `drawStrip()` — stengel/wortelstuk als twee rijen cellen; kromming = (La − Lb) / breedte
- regel ± 1504: `auxGrafiek()` — gevoeligheidscurven (`fStengel`, `fWortel`)
- regel ± 1552: `const SCENES` (title, s01 … s18)
- regel ± 1748 e.v.: speler (`buildTimeline`, `vwoCuts`, `antwCuts`, vragen- en snelheidsknop)

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/p1` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/7-hoe-een-plant-groeit/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v3.md` aanpassen → `python3 engine/make_segments.py p1 script_v3.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py p1` → `engine/build.py p1` → `bash pack.sh p1 7-hoe-een-plant-groeit transport`.
- beeld: alleen `scenes.js` → `engine/build.py p1` → pack. Cue-woorden: `q.at('woord', n)` zoekt op deelwoorden (bv. 'blokje' vindt ook 'blokjes'), tel dus de n mee.
- uitspraak: `uitspraak_film.json` (auxine → auxinuh enz.), zie `uitspraak.md`.

## Aandachtspunten
- Uitspraakwachtlijst: auxine (auxinuh), gibberelline, cytokinine, abscisinezuur, meristeem, cambium, fototropie, gravitropie, statolieten — nog door Kamiel te beluisteren.
- `auxGrafiek` heet zo omdat lib_hormonen.js al een `grafiek()` heeft.
- Planner en PTA-route: film nog toevoegen bij het juiste subonderdeel als Kamiel hem daar wil.

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).
