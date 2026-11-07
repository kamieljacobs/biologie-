# Een mierenkolonie zonder baas — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/9-mierenkolonie.html (audio in films/gedrag/9-mierenkolonie/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19), film 9 van 12 |
| Niveau | havo + vwo; vwo-blok s11 (oogstmieren, regeling zonder baas, Deborah Gordon) |
| Versie / datum | 1.0 · 15 oktober 2026 |
| Prompt | onbekend · gemaakt 15 okt |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow KoaigBHPoLMvztc2Fdo4; respelling Deborah → Debbora (zie `uitspraak.md`) |
| Duur | spraak 4:29 (vwo) / 3:42 (havo); speeltijd met kaarten en vragen ± 5,5 min |
| Beeldstijl | Part C: Schema |
| Personages | Sam (castboek) |
| Audio-opslag | 8 losse mp3's in audio/ (s01, s04, s06, s07, s09, s10, s11, s12) |
| Herkomst | Hoofdengine, werkmap `hw/gd9`; gebouwd met Claude op verzoek van Kamiel (geplande film 'Een mierenkolonie zonder baas') |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Sam op het terras, koekkruimel; één zoekende mier, later een rechte mierenstraat vanuit een spleet. q02 (antwoord in H1) |
| H1 Een kolonie | s04, q05, s06 | Nest in doorsnede (kamers, gangen); koningin met eitjes, werksters, gevleugelde mannetjes; 'geen bevelen'; jong binnen bij broed, oud buiten; voedselzoekers weg → paarse werksters gaan naar buiten; flexibel |
| H2 Een spoor van geur | s07, q08, s09 | Geurspoor leggen (inzet achterlijf), spoor wordt sterker met meer mieren, positieve terugkoppeling, verdamping; dubbele brug met percentages die naar de korte brug schuiven |
| H3 Slim zonder baas | s10, s11 (vwo) | Drie regels; kolonie met twee voedselbronnen; alarmstof; computerprogramma met digitale geur en route langs adressen; vwo: oogstmieren bij de ingang, contact met terugkerende voedselzoekers, veel/weinig voedsel, hitte |
| Recap | s12 | Vier panelen: koningin, werk naar leeftijd, geurspoor, korte route |
| Eindkaart | s13 | drie regels |

## Vragen (allemaal antwoord b)
- q02: wie stuurde de mieren? a de koningin · **b niemand: ze vonden de weg samen** · c één leider
- q05: voedselzoekers weggehaald? a kolonie verhongert · **b andere werksters gaan voedsel zoeken** · c werk blijft liggen tot nieuwe mieren uit de pop komen
- q08: welke brug na een tijdje? a allebei evenveel · **b vooral de korte** · c vooral de lange

## Begrippen
sociale insecten, werkster, taakverdeling, feromoon, positieve terugkoppeling, zelforganisatie, oogstmieren (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (wie doet wat, het geurspoor, twee bruggen, vwo: oogstmieren), hoe de film het uitlegt, achtergrond en vereenvoudigingen (koloniegrootte, polyethisme, Wilson 1984, Gordon 1989, klieren, Goss e.a. 1989, Dorigo, Greene e.a. 2013, Gordon 2013), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/9-mierenkolonie.html)
- regel 69: sitebalk (← Terug naar Gedrag)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 148: `window.FILMDATA`
- regel 1252: `persoon()` uit lib_cast.js (Sam)
- regel 1446: `mier()` (opties kon, vleugel, zaad, alarm, col)
- regel 1456: `langs()` en 1458 `heenTerug()` (mieren over een pad); 1459 `spoorLijn()` (geurspoor; dikte = sterkte)
- regel 1468: `nest()` met `NEST`/`GANG` (kamers en gangen)
- regel 1474: `brugScene()` met `BRUG` (dubbele brug; p = aandeel korte brug)
- regel 1483: `const SCENES` (title, s01 … s12)
- regel 1580 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd9` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/9-mierenkolonie/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gd9 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd9` → `engine/build.py gd9` → `bash pack.sh gd9 9-mierenkolonie gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd9` → pack. Let op: cues zoeken op deel van een woord ('volg' vindt 'volgt', 'veel' vindt 'hoeveel'; gebruik het n-de voorkomen).

## Aandachtspunten
- Uitspraakwachtlijst: Deborah (Debbora), feromonen, oogstmieren, zelforganisatie.
- 'Zelforganisatie' staat niet in de syllabus; in de film als verbindend idee.
- Mieren zijn donker getekend en staan daarom altijd op een lichte ondergrond (terras, zand, aarde).

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). De gedragsfilms gebruiken vooral `tag`/`regel`/`chip`; geen scène toont `label()`. Alleen de functie is vervangen; geen andere wijslijnen gevonden. In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.
