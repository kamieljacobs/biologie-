# Hechting: van baby tot verliefd — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/4-hechting.html (audio in films/gedrag/4-hechting/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19), film 4 van 12 |
| Niveau | havo + vwo; vwo-blok s09 (culturele verschillen, één meting) |
| Versie / datum | 1.0 · 15 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow poybOXe75lz2BKrGW0wD; geen respellings (zie `uitspraak.md`) |
| Duur | spraak 5:33 (vwo) / 5:07 (havo); speeltijd met kaarten en vragen ± 7 min |
| Beeldstijl | Part C: Schema (speelkamers, kooi, kaarten) |
| Personages | Lotte (castboek) in H3; Mila, Ties en de ouders zijn eigen figuurtjes (`peuter()`, `ouder()`), geen castpersonages |
| Audio-opslag | 9 losse mp3's in audio/ (s01, s04, s05, s07, s08, s09, s10, s12, s13) |
| Herkomst | Hoofdengine, werkmap `hw/gd4`; gebouwd met Claude op verzoek van Kamiel ("hechting vind ik wel belangrijk, ook omdat het leven van leerlingen daar ook door beïnvloed wordt: hun latere liefdesrelaties") |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Twee speelkamers met spiegelwand: Mila (huilt, laat zich troosten, speelt verder) en Ties (speelt door, kijkt nauwelijks op). q02 (antwoord in H2) |
| H1 Een band die troost | s04, s05, q06, s07 | Definitie; baby-signalen; Bowlby en functie; inprenting vs hechting; vader/opa/pleegouder; Harlows kooi met draad- en doekmoeder, tijd per dag, eng speelgoed; veilige haven en veilige basis; ethiek |
| H2 Veilig of onveilig | s08, s09 (vwo) | Stappen van de Vreemde Situatie (terugkomst gemarkeerd); drie stijlkaarten met hartslag; 'geen fouten, slimme aanpassingen'; fijngevoelig reageren + andere factoren; vwo: staafdiagram per land (afgerond, schematisch) |
| H3 Van baby tot verliefd | s10, q11, s12 | Binnenwerkmodel als bril; Lotte met appje en drie gedachtewolkjes; volwassen patronen, mengbalk; pad van onveilig naar veiliger; vooruitblik emotieregulatie |
| Recap | s13 | Vier panelen: troost > voedsel, terugkomst, drie patronen, kan veranderen |
| Eindkaart | s14 | drie regels |

## Vragen (allemaal antwoord b)
- q02: welk kind is veilig gehecht? a Ties · **b Mila** · c allebei
- q06: bij welke nepmoeder? a draadmoeder · **b zachte moeder** · c allebei even lang
- q11: onveilig gehecht als baby? a altijd slechte relaties · **b kans groter, maar kan veranderen** · c geen enkele invloed

## Begrippen
hechting, veilige haven, veilige basis, Vreemde Situatie, veilig / onveilig-vermijdend / onveilig-ambivalent, fijngevoelig, binnenwerkmodel — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (Harlow, drie kinderen indelen, 'huilde niet dus goed gehecht', vwo: Japans onderzoek), hoe de film het uitlegt, achtergrond (Bowlby, Harlow, Ainsworth, termen, gedesorganiseerd bewust weggelaten, hartslag/cortisol, fijngevoeligheid r ≈ 0,24, cultuur, stabiliteit, zorgnoot), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/4-hechting.html)
- regel 69: sitebalk (← Terug naar Gedrag)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 150: `window.FILMDATA`
- regel 1254: `persoon()` uit lib_cast.js (Lotte)
- regel 1447: `ouder()` (eenvoudige volwassene), `peuter()`, `speelgoed()`
- regel 1467: `kamer()` (speelkamer met spiegelwand, deur; momIn/huil/dicht)
- regel 1479: `aapje()`, `draadmoeder()`, `doekmoeder()`, `kooi()`, `enger()`, `hartslag()`, `bril()`, `telefoon()`
- regel 1497: `STIJL` (drie hechtingsstijlen met kleuren)
- regel 1500: `const SCENES` (title, s01 … s13)
- regel 1630 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd4` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/4-hechting/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gd4 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd4` → `engine/build.py gd4` → `bash pack.sh gd4 4-hechting gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd4` → pack.

## Aandachtspunten
- s12 is ingekort met ffmpeg; de originele take staat niet in de repo (werkmap `raw/s12_orig.mp3`).
- Gevoelig onderwerp: de toon is bewust niet deterministisch en niet beschuldigend; houd dat vast bij aanpassingen.
- Uitspraakwachtlijst: Bowlby, Ainsworth, Harlow, rhesusaapjes, binnenwerkmodel, onveilig-vermijdende/-ambivalente, fijngevoelig, 'oh'.
- De percentages in het vwo-blok zijn afgerond en schematisch.

## Wijzigingen
- 1.1 (15 okt 2026): op verzoek van Kamiel de zin 'praat erover met iemand die je vertrouwt, bijvoorbeeld je mentor' geschrapt: uit `audio/s12.mp3` geknipt (19,04–25,08 s van de originele take, geen nieuwe opname), woordtijden verschoven, mentorkaart vervangen door een vooruitblik op Emotieregulatie. Docentdeel aangevuld met de sterkte van het verband (Pinquart 2013, Fraley 2013, Simpson 2007).
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).
