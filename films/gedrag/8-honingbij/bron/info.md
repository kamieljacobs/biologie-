# De dans van de honingbij — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/8-honingbij.html (audio in films/gedrag/8-honingbij/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19), film 8 van 12 |
| Niveau | havo + vwo; vwo-blok s11 (bewijs voor de danstaal: robotbij, harmonische radar) |
| Versie / datum | 1.0 · 15 oktober 2026 |
| Prompt | onbekend · gemaakt 15 okt |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow msw1MBdp22XXrtDujTpB; respelling von Frisch → fon Frisj (zie `uitspraak.md`) |
| Duur | spraak 5:27 (vwo) / 4:33 (havo); speeltijd met kaarten en vragen ± 6,5 min |
| Beeldstijl | Part C: Schema |
| Personages | Opa Henk (imker) en Noor (castboek) |
| Audio-opslag | 8 losse mp3's in audio/ (s01, s04, s05, s07, s08, s10, s11, s12) |
| Herkomst | Hoofdengine, werkmap `hw/gd8`; gebouwd met Claude op verzoek van Kamiel (geplande film 'De dans van de honingbij') |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Opa Henk bij zijn kasten, Noor met een schaaltje suikerwater op bijna 1 km; één bij, een halfuur later tientallen. q02 (antwoord in H1) |
| H1 Een dans als boodschap | s04 | Twee misconcepties weggestreept; zender → signaal (dans) → ontvanger; von Frisch met glazen kast en gemerkte bijen; rondedans op de raat |
| H2 De kwispeldans | s05, q06, s07 | Achtvormige dans; raat rechtop, recht omhoog = zon; 40° op de raat ↔ 40° op de kaart; stopwatch en balken (1 s ≈ 1 km); vaker herhalen; antwoord met kaart; volgers in het donker (voelsprieten, zoemen, trillingen, geur en smaak) |
| H3 Een klok in haar hoofd | s08, q09, s10, s11 (vwo) | Zon langs de hemel met klok; dans om 10:00 en 12:00; inwendige klok; aangeboren, dialecten per ras; oriëntatievluchten; vwo: robotbij en voerplekken met dezelfde geur, harmonische radar met verplaatste bij |
| Recap | s12 | Vier panelen: dans = signaal, rondedans, kwispeldans (hoek, duur), zon schuift op |
| Eindkaart | s13 | drie regels |

## Vragen (allemaal antwoord b)
- q02: hoe vonden de bijen het schaaltje? a achter de eerste aan · **b de eerste vertelde het in de kast** · c geroken vanaf de kast
- q06: recht omhoog, 2 s kwispelen? a 2 km met de zon in je rug · **b 2 km in de richting van de zon** · c vlak bij de kast
- q09: dans om 10 en om 12 uur? a precies hetzelfde · **b het rechte stuk draait mee met de zon** · c ze danst niet meer

## Begrippen
communicatie, verkenster, rondedans, kwispeldans, inwendige klok, dialect, harmonische radar (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (rondedans of kwispeldans, de dans lezen, zon en tijd, vwo: bewijs met verplaatste bijen), hoe de film het uitlegt, achtergrond en vereenvoudigingen (von Frisch, grens rondedans, kalibratie afstand, zonbeweging, Lindauer, Dyer & Dickinson, Rinderer & Beaman, Wenner & Johnson, Michelsen, Riley e.a. 2005), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/8-honingbij.html)
- regel 69: sitebalk (← Terug naar Gedrag)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 148: `window.FILMDATA`
- regel 1252: `persoon()` uit lib_cast.js (Opa Henk, Noor)
- regel 1442: `bij()` (bij van bovenaf; opties wag, dot, robot, antenne)
- regel 1453: `dansPos()` en regel 1457 `dans()` (kwispeldans: run = seconden kwispelen, rot = hoek); regel 1460 `rondedans()`
- regel 1463: `raat()`; 1466 `zon()`; 1467 `kast()`; 1473 `stopwatch()`; 1474 `klok()` (overschrijft de ongebruikte `klok` uit lib_voeding); 1478 `hoekboog()`
- regel 1485: `const SCENES` (title, s01 … s12)
- regel 1627 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd8` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/8-honingbij/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gd8 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd8` → `engine/build.py gd8` → `bash pack.sh gd8 8-honingbij gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd8` → pack. Let op: cues zoeken op deel van een woord ('acht' vindt 'achterlijf', 'tien' vindt 'vijftien', 'verder' staat al in de eerste zin van s05).

## Aandachtspunten
- Uitspraakwachtlijst: von Frisch (fon Frisj), kwispeldans, oriëntatievluchten, robotbij.
- '1 seconde ≈ 1 km' is een vuistregel; de rondedans bevat volgens nieuwer onderzoek wel wat richting (docentdeel).
- Hoeken op de kaarten in s10 (75° en 120°) zijn schematisch, niet berekend voor een echte datum.

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). De gedragsfilms gebruiken vooral `tag`/`regel`/`chip`; geen scène toont `label()`. Alleen de functie is vervangen; geen andere wijslijnen gevonden. In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.
