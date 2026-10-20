# Leren: van Pavlov tot je telefoon — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/7-leren.html (audio in films/gedrag/7-leren/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19), film 7 van 12 |
| Niveau | havo + vwo; vwo-blok s11 (dopamine en voorspellingsfout) |
| Versie / datum | 1.0 · 15 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow VaUKBcIQncHYXzgP7ehy; geen respellings meer (dopamine sinds 20 okt in gewone spelling; zie `uitspraak.md`) |
| Duur | spraak 4:48 (vwo) / 4:04 (havo); speeltijd met kaarten en vragen ± 6 min |
| Beeldstijl | Part C: Schema |
| Personages | Daan (castboek) |
| Audio-opslag | 8 losse mp3's in audio/ (s01, s04, s05, s07, s08, s10, s11, s12) |
| Herkomst | Hoofdengine, werkmap `hw/gd7`; gebouwd met Claude op verzoek van Kamiel (geplande film 'Leren: van Pavlov tot je telefoon') |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Daan, telefoon trilt; meldingen (reclame, groepsapp, bericht met hartje). q02 (antwoord in H3) |
| H1 Gewenning | s04 | Zeehaas trekt zijn sifon steeds minder in |
| H2 Klassieke conditionering | s05, q06, s07 | Pavlov: drie panelen (aangeboren / samen, steeds opnieuw / geluid maar geen eten meer) met metronoom; uitdoving en 'niet gewist' |
| H3 Operante conditionering | s08, q09, s10, s11 (vwo) | Skinnerbox; bekrachtiging en straf; rat A (altijd) vs rat B (af en toe), curves na stoppen; telefoon = onvoorspelbare beloning; tip meldingen bundelen; vwo: dopamine-rijen (onverwacht, na het lampje, beloning blijft uit) |
| Recap | s12 | Vier panelen: zeehaas, Pavlovs hond, Skinnerbox, telefoon |
| Eindkaart | s13 | drie regels |

## Vragen (allemaal antwoord b)
- q02: waarom blijft Daan kijken? a meestal belangrijk · **b soms, onvoorspelbaar, iets leuks** · c trillen vervelend
- q06: geluid zonder eten — het kwijlen? a even sterk · **b steeds minder** · c sterker
- q09: voer stopt — welke rat drukt het langst? a rat A · **b rat B (onvoorspelbaar beloond)** · c even snel

## Begrippen
gewenning, klassieke conditionering, (on)voorwaardelijke prikkel en reflex, uitdoving, operante conditionering, positieve/negatieve bekrachtiging, straf, beloningsschema, voorspellingsfout (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (welke vorm van leren, Pavlov, beloningsschema, vwo: voorspellingsfout), hoe de film het uitlegt, achtergrond en vereenvoudigingen (Kandel/Aplysia, Pavlov, spontaan herstel, Skinner, variabele schema's, Schultz, Fitz e.a. 2019), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/7-leren.html)
- regel 69: sitebalk (← Terug naar Gedrag)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 146: `window.FILMDATA`
- regel 1250: `persoon()` uit lib_cast.js (Daan)
- regel 1441: `telefoon()` en `melding()` (cold open en recap)
- regel 1444: `zeehaas()`
- regel 1454: `hond()`; regel 1461: `metronoom()`
- regel 1464: `skinnerbox()`; regel 1471: `curve()` (uitdovingscurves, dopamine)
- regel 1480: `const SCENES` (title, s01 … s12)
- regel 1591 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd7` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/7-leren/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gd7 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd7` → `engine/build.py gd7` → `bash pack.sh gd7 7-leren gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd7` → pack. Let op: cues zoeken op deel van een woord ('voorwaardelijke' vindt ook 'onvoorwaardelijke'; gebruik het n-de voorkomen).

## Aandachtspunten
- Uitspraakwachtlijst: Pavlov, Skinner, loot boxes, zeehaas, sifon, metronoom.
- Pavlov gebruikte vooral metronoom en zoemer; de 'bel' is grotendeels een mythe, daarom een metronoom in beeld.
- Effect van meldingen bundelen is bescheiden (één studie, Fitz e.a. 2019); in de film als tip, niet als harde claim.

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). De gedragsfilms gebruiken vooral `tag`/`regel`/`chip`; geen scène toont `label()`. Alleen de functie is vervangen; geen andere wijslijnen gevonden. In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.

## Wijziging 20 okt 2026

Uitspraak na de uitspraaktest van 18 okt: stem-invoer Dopaminuh → Dopamine en dopaminuh-neuronen → dopamine-neuronen; beide regels uit `uitspraak_film.json` gehaald (het bestand is nu leeg). Alinea s11 opnieuw ingesproken (Roos, eleven_v4, 1 take, flow VaUKBcIQncHYXzgP7ehy; 666 credits TTS + Scribe voor de woordtijden). Alleen `audio/s11.mp3` en de woordtijden van s11 in `window.FILMDATA` zijn vervangen; beeld, speler en de rest van de film ongewijzigd.
