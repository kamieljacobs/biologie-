# Slimme dieren — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/11-slimme-dieren.html (audio in films/gedrag/11-slimme-dieren/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19), film 11 van 12 |
| Niveau | havo + vwo; vwo-blok s11 (poetsvis en de betekenis van de spiegeltest) |
| Versie / datum | 1.0 · 15 oktober 2026 |
| Prompt | onbekend · gemaakt 15 okt |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow 2YLDOWn1Lpv6xOpYb37W; respellings Pfungst → Pfoengst, Köhler → Keuler, Nieuw-Caledonische → Nieuw-Kaledonische (zie `uitspraak.md`) |
| Duur | spraak 5:01 (vwo) / 4:14 (havo); speeltijd met kaarten en vragen ± 6,5 min |
| Beeldstijl | Part C: Schema; de Hans-scènes in sepia-'fotostijl' |
| Personages | Bilal (castboek) |
| Audio-opslag | 8 losse mp3's in audio/ (s01, s04, s05, s07, s08, s10, s11, s12) |
| Herkomst | Hoofdengine, werkmap `hw/gd11`; gebouwd met Claude op verzoek van Kamiel (geplande film 'Slimme dieren') |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Bilal; sepia-foto: vraagsteller met hoed, Hans tikt tot 5; rekenen, spellen, de datum; commissie: geen bedrog. q02 (antwoord in H1) |
| H1 Slim of niet? | s04 | Pfungst: vraagsteller weet het / weet het niet; vraagsteller richt zich bij 5 onbewust op; cognitie (opnemen → onthouden → gebruiken); controles; regel van Morgan (signalen lezen vs rekenen) |
| H2 Problemen oplossen | s05, q06, s07 | Proberen → werkt → vaker; Köhler: chimpansee springt, denkt, schuift een kist onder de banaan, later stapelen; Nieuw-Caledonische kraai met haakje; waterbuis met hapje, kurkjes en stenen; water stijgt; lastige versie met verborgen verbinding |
| H3 Ken jezelf | s08, q09, s10, s11 (vwo) | Chimpansee met rode vlek voor spiegel (zonder/met); ekster met geel stickertje; 2 van de 5, herhaling niet gelukt; hond, plas met/zonder extra geur; vwo: poetsvis met bruin vlekje, schrapen, twee interpretaties |
| Recap | s12 | Vier panelen: eerlijk testen, inzicht, kraai en waterbuis, spiegeltest |
| Eindkaart | s13 | drie regels |

## Vragen (allemaal antwoord b)
- q02: hoe wist Hans het? a echt rekenen · **b kleine signalen van de vraagsteller** · c antwoorden uit het hoofd
- q06: welke voorwerpen in de buis? a lichte die drijven · **b zware die zinken** · c maakte niet uit
- q09: eksters met stickertje? a pikten naar de spiegel-ekster · **b probeerden het van hun eigen keel te krijgen** · c imponeerden de spiegel-ekster

## Begrippen
cognitie, Clever Hans-effect, regel van Morgan, proefondervindelijk leren, inzichtelijk leren, spiegeltest, poetsvis (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (Hans met controle, proefondervindelijk of inzichtelijk, spiegeltest bij olifanten, vwo: poetsvis voor/tegen), hoe de film het uitlegt, achtergrond (Pfungst, Morgan 1894, Köhler, Birch, Hunt, Bird & Emery, Jelbert e.a., Gallup, Prior e.a., Soler e.a., Horowitz, Kohda e.a.), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/11-slimme-dieren.html)
- regel 69: sitebalk (← Terug naar Gedrag)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 147: `window.FILMDATA`
- regel 1251: `persoon()` uit lib_cast.js (Bilal)
- regel 1444: `hond()` (uit film 7); 1456 `paard()` (tik = hoef omhoog); 1462 `heer()` (buig = voorover)
- regel 1464: `chimp()` (pose zit/spring/denk/reik, dot, hand); 1473 `kraai()`; 1478 `buis()` (geeft het waterniveau terug)
- regel 1482: `ekster()`; 1488 `spiegel()`; 1489 `poetsvis()`
- regel 1495: `const SCENES` (title, s01 … s12)
- regel 1593 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd11` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/11-slimme-dieren/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gd11 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd11` → `engine/build.py gd11` → `bash pack.sh gd11 11-slimme-dieren gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd11` → pack. Let op: 'Met' komt in s08 eerst voor in 'met de spiegeltest' (daarom n = 2); 'Ook' in s05 is n = 2.

## Aandachtspunten
- Uitspraakwachtlijst: Pfungst (Pfoengst), Köhler (Keuler), Nieuw-Caledonische, Morgan, trial-and-error.
- De Hans-beelden zijn getekend in 'fotostijl'; het zijn geen echte foto's.

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). De gedragsfilms gebruiken vooral `tag`/`regel`/`chip`; geen scène toont `label()`. Alleen de functie is vervangen; geen andere wijslijnen gevonden. In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.
