# Emotieregulatie — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/5-emotieregulatie.html (audio in films/gedrag/5-emotieregulatie/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19), film 5 van 12 |
| Niveau | havo + vwo; vwo-blok s08 (orthosympathisch/parasympathisch, adrenaline, cortisol) |
| Versie / datum | 1.0 · 15 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow 7hVkaiVHzsXLtRvQMaIA; respellings amygdala → amígdala, co-regulatie → ko-regulatie (zie `uitspraak.md`) |
| Duur | spraak 4:33 (vwo) / 4:03 (havo); speeltijd met kaarten en vragen ± 6 min |
| Beeldstijl | Part C: Schema |
| Personages | Bilal (castboek); ouder en peuter als eigen figuurtjes (uit film 4) |
| Audio-opslag | 7 losse mp3's in audio/ (s01, s04, s05, s07, s08, s09, s10) |
| Herkomst | Hoofdengine, werkmap `hw/gd5`; gebouwd met Claude op verzoek van Kamiel (vervolg op Hechting) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Bilal met controller, scherm telt af naar GAME OVER, bonkend hart, rood gezicht. q02 (antwoord in H2) |
| H1 Waarom we emoties hebben | s04 | Lichaam (hart, longen, spieren), angst/boosheid; brein met amygdala (alarm) en prefrontale cortex (rem); schematische curven tienerbrein |
| H2 Wat kun je doen? | s05, q06, s07, s08 (vwo) | Vier stappen met strategieën; proef groep A (onderdrukken) en B (herwaarderen); balkjes; benoemen in de hersenscanner; Bilal met gedachtewolk en 'kunnen kiezen'; vwo-schema autonoom zenuwstelsel en hormonen, ademcurve |
| H3 Eerst samen, dan zelf | s09 | Ouder wiegt peuter (co-regulatie, veilige haven); samen → zelf; Bilal met appje van een vriend; volwassenen ook |
| Recap | s10 | Vier panelen: alarm en rem, vier stappen, onderdrukken vs herwaarderen, samen naar zelf |
| Eindkaart | s11 | drie regels |

## Vragen (allemaal antwoord b)
- q02: wat helpt Bilal? a wegdrukken · **b benoemen en anders bekijken** · c meteen een nieuw potje
- q06: groep die niets mocht laten merken? a rustiger · **b buitenkant minder, lichaam sterker** · c geen verschil

## Begrippen
emotie, amygdala, prefrontale cortex, emotieregulatie, herwaarderen, onderdrukken, co-regulatie, orthosympathisch/parasympathisch (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (alarm en rem, vier stappen bij Noors presentatie, proef van Gross met controlegroep, vwo: adrenaline vs cortisol), hoe de film het uitlegt, achtergrond (vereenvoudiging amygdala/PFC, dual-systems model en kritiek, Gross 1998, Lieberman 2007, Gross & John 2003, Webb 2012, Bonanno, Coan 2006, ademhaling), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/5-emotieregulatie.html)
- regel 69: sitebalk (← Terug naar Gedrag)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 150: `window.FILMDATA`
- regel 1254: `persoon()` uit lib_cast.js (Bilal)
- regel 1442: `ouder()`, `peuter()`, `hartslag()` (uit film 4), `hartje()`, `controller()`
- regel 1465: `scherm()` (spel met timer en GAME OVER)
- regel 1474: `brein()` (amygdala-alarm, prefrontale cortex, rempijl), `lijf()`, `balk()`
- regel 1491: `STAP` (vier stappen met strategieën en cue-woorden)
- regel 1494: `const SCENES` (title, s01 … s10)
- regel 1595 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd5` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/5-emotieregulatie/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gd5 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd5` → `engine/build.py gd5` → `bash pack.sh gd5 5-emotieregulatie gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd5` → pack. Let op deelwoorden: 'andere' vindt ook 'veranderen', 'zelf' ook 'zichzelf', 'stap' ook 'stappen'.

## Aandachtspunten
- Uitspraakwachtlijst: amygdala (amígdala), co-regulatie (ko-regulatie), orthosympathische, parasympathische, cortisol, 'close'.
- De balkjes en curven zijn schematisch (geen echte meetwaarden).

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).
