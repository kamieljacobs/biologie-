# Waarom helpen dieren elkaar? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/10-helpen.html (audio in films/gedrag/10-helpen/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19), film 10 van 12 |
| Niveau | havo + vwo; vwo-blok s11 (regel van Hamilton, haplodiploïdie met nuance) |
| Versie / datum | 1.0 · 15 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow FAYOZYeYxJBfkpVPBaVB; geen respellings (formule uitgeschreven, zie `uitspraak.md`) |
| Duur | spraak 4:48 (vwo) / 3:49 (havo); speeltijd met kaarten en vragen ± 6 min |
| Beeldstijl | Part C: Schema |
| Personages | Lotte en Yasmin (castboek) |
| Audio-opslag | 8 losse mp3's in audio/ (s01, s04, s05, s07, s08, s10, s11, s12) |
| Herkomst | Hoofdengine, werkmap `hw/gd10`; gebouwd met Claude op verzoek van Kamiel (geplande film 'Waarom helpen dieren elkaar?') |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Lotte kijkt een natuurfilm (scherm): grondeekhoorns, een wezel, één eekhoorn slaat trillend alarm, de anderen vluchten; de roeper valt op. q02 (antwoord in H2) |
| H1 Een raadsel | s04 | Helper − fitness, ander + fitness; aandeel helpers daalt; 'voor de soort' doorgestreept; populatie met niet-roepers die toenemen |
| H2 Familie | s05, q06, s07 | Genbalk 'jij' vs broer/zus ½, ouder ½, neef/nicht ⅛; verwantschapsselectie; vrouwtjes bij familie, mannetjes trekken weg; staafdiagram alarm (schematisch); koningin, werksters, larven |
| H3 Ik help jou, jij helpt mij | s08, q09, s10, s11 (vwo) | Ik/jij nu en later; vampiervleermuizen, bloed delen; A en B met honger; proef en voorwaarden, kosten/opbrengst; Lotte en Yasmin; vwo: r × B > C, genbalken koningin/mannetje/zussen, ¾ ½ ¼, termieten, monogame voorouders |
| Recap | s12 | Vier panelen: altruïsme, niet voor de soort, verwantschapsselectie, wederkerig altruïsme |
| Eindkaart | s13 | drie regels |

## Vragen (allemaal antwoord b)
- q02: waarom slaat ze alarm? a om de soort te redden · **b omdat er vaak familie in de buurt is** · c omdat ze zelf daardoor sneller wegkomt
- q06: wie slaat het vaakst alarm? a verhuisde mannetjes · **b vrouwtjes met familie in de buurt** · c vrouwtjes zonder familie
- q09: aan wie geeft de vleermuis bloed? a buur B · **b buur A** · c geen van beide

## Begrippen
altruïsme, fitness, verwantschapsselectie, verwantschap (r), wederkerig altruïsme, regel van Hamilton (vwo), haplodiploïdie (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (Florida-gaaien, 'voor de soort', voorwaarden wederkerigheid, vwo: rekenen met Hamilton), hoe de film het uitlegt, achtergrond (Sherman 1977/1985, r-definitie, groepsselectie, Wilkinson 1984, Carter & Wilkinson 2013, Trivers & Hare 1976, Hughes e.a. 2008), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/10-helpen.html)
- regel 69: sitebalk (← Terug naar Gedrag)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 146: `window.FILMDATA`
- regel 1250: `persoon()` uit lib_cast.js (Lotte, Yasmin)
- regel 1442: `mier()` (overgenomen uit film 9)
- regel 1456: `eekhoorn()` (r = rechtop, roep = geluidsgolven); 1464 `wezel()`; 1469 `vleermuis()`
- regel 1478: `genbalk()`; 1479 `scherm()` (tv-scherm in de cold open); 1481 `genVergelijk()`
- regel 1484: `const SCENES` (title, s01 … s12)
- regel 1582 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd10` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/10-helpen/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gd10 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd10` → `engine/build.py gd10` → `bash pack.sh gd10 10-helpen gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd10` → pack. Let op: 'honger' vindt ook 'hongerige' (daarom n = 2), 'bee' komt in s11 drie keer voor.

## Aandachtspunten
- Uitspraakwachtlijst: altruïsme, Hamilton, verwantschapsselectie.
- Het staafdiagram met alarmfrequenties (s07) is schematisch, niet de echte getallen van Sherman.
- Ondertitels tonen de formule als 'er keer bee is groter dan cee'; in beeld staat r × B > C.

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). De gedragsfilms gebruiken vooral `tag`/`regel`/`chip`; geen scène toont `label()`. Alleen de functie is vervangen; geen andere wijslijnen gevonden. In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.
