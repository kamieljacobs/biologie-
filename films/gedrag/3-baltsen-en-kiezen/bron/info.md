# Baltsen en kiezen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gedrag/3-baltsen-en-kiezen.html (audio in films/gedrag/3-baltsen-en-kiezen/audio/) |
| Reeks | Gedrag (hoofdstuk `gedrag`: havo eigen pakket Gedrag, vwo H1 + H19), film 3 van 12 |
| Niveau | havo + vwo; vwo-blok s11 (handicapprincipe) |
| Versie / datum | 1.0 · 15 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow 3aktrwWwSxVTGIFRVK1h; geen respellings (zie `uitspraak.md`) |
| Duur | spraak 4:48 (vwo) / 4:21 (havo); speeltijd met kaarten en vragen ± 6 min |
| Beeldstijl | Part C: Macro (cold open: weide met pauw en vos), Schema (rest) |
| Personages | geen (dierenfilm) |
| Audio-opslag | 8 losse mp3's in audio/ (s01, s04, s05, s07, s08, s10, s11, s12) |
| Herkomst | Hoofdengine, werkmap `hw/gd3`; gebouwd met Claude op verzoek van Kamiel (reeks Gedrag) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Pauw spreidt zijn staart, energiebalkje, vos sluipt dichterbij. q02 (antwoord in H1) |
| H1 Kiezen | s04, s05, q06, s07 | Darwin; natuurlijke vs seksuele selectie; eicel/zaadcellen, weegschaal; edelherten (vechten), pauw (showen); widavogels kort / controle / verlengd; staafjes met nesten; denkwolk doorgestreept; prikkel tegen staartlengte |
| H2 De dans van de stekelbaars | s08, q09, s10, s11 (vwo) | Aquarium; actie-reactieketen in twee kolommen; Tinbergen met glazen staafje bij het nest; eitjes; drie functies (soortherkenning, afstemming, kwaliteit tonen); vwo: gezonde vs zwakke pauw, vos |
| Recap | s12 | Vier panelen: seksuele selectie, investering, staartlengte, keten |
| Eindkaart | s13 | drie regels |

## Vragen (allemaal antwoord b)
- q02: waarom de staart? a roofdieren afschrikken · **b hennen kiezen vaak hanen met indrukwekkende staart** · c helpt bij vliegen
- q06: meeste nesten? a korte staart · **b extra lange staart** · c evenveel
- q09: glazen staafje? a niets · **b legde toch eieren** · c zwom weg

## Begrippen
seksuele selectie, balts, actie-reactieketen, investering, handicapprincipe (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (zwaluwstaarten met controlegroep, waarom vrouwtjes kiezen, actie-reactieketen ordenen + glazen staafje, vwo: eerlijke signalen), hoe de film het uitlegt, achtergrond (pauw: gemengd bewijs; Andersson 1982; rolomkering; Tinbergen; Zahavi/Grafen), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/gedrag/3-baltsen-en-kiezen.html)
- regel 69: sitebalk (← Terug naar Gedrag)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 145: `window.FILMDATA`
- regel 1438: `stekelbaars()` (uit film 1), `aquarium()`, `nest()`
- regel 1462: `pauw()` (open = waaier, tril, glans), `vos()`, `eicel()`, `zaadcel()`, `hert()`
- regel 1485: `wida()` (staartlengte L, knip/plak-markering), `grootNest()`, `nestje()`, `vrouwtje()` (dikke buik, kop omhoog), `weegschaal()`
- regel 1502: `KETEN` (stappen met cue-woorden) en `keten()` (twee kolommen met pijlen)
- regel 1511: `const SCENES` (title, s01 … s12)
- regel 1607 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gd3` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/3-baltsen-en-kiezen/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gd3 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py gd3` → `engine/build.py gd3` → `bash pack.sh gd3 3-baltsen-en-kiezen gedrag`.
- beeld: alleen `scenes.js` → `engine/build.py gd3` → pack. Een stap van de keten wijzigen: pas `KETEN` aan (tekst + cue-woord).

## Aandachtspunten
- Uitspraakwachtlijst: Charles Darwin, pauwhennen, edelherten, widavogel, staartwortel, actie-reactieketen, handicapprincipe.
- De staafjes met nesten zijn schematisch (verhoudingen, niet de echte getallen van Andersson).

## Wijzigingen
- 1.0 (15 okt 2026): eerste versie. Script na één gecombineerde review (zie `reviews/review_v1.md`).
