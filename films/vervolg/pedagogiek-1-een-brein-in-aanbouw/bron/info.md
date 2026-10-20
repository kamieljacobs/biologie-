# Een brein in aanbouw — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/pedagogiek-1-een-brein-in-aanbouw.html` (audio in `pedagogiek-1-een-brein-in-aanbouw/audio/`) |
| Reeks | Wat word jij? · Pedagogiek (pedagogiek, pedagogische wetenschappen, jeugdzorg) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v3 = v2 met gevarieerde antwoordletters) |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, ± 4.900 credits incl. heropname s07, s14, s18 (flow in `stem/sessions.json`) |
| Duur | spraak 4:24 (264 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Part C · Schema, met cast (Bilal met Sam en Daan bij het verkeerslicht, de baby, Opa Henk als rijcoach) |
| Bouwvorm | FILMDATA-straat van de psychologiefilms (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie; `brein()` en `teken.js` uit Kijken in een denkend brein |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → v3 (antwoordletters) → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | kruising met verkeerslicht; Bilal alleen wacht, met Sam en Daan fietst hij door rood |
| H1 De eerste jaren | s04, s05, q06 | baby; hersenen groeien; netwerk wordt dichter; klanken van twee talen (verwijzing Inprenting) |
| H2 Snoeien en isoleren | s07, s08, q09, s10 | netwerk gesnoeid tot paden in een bos; axon met myeline; zijaanzicht dat van achter naar voor rijpt |
| H3 Het puberbrein | s11, s12, q13, s14, s15 | beloning vooruit, rem later; rijspel (Chicken) met een muur, alleen en met vrienden; staafjes risico per leeftijd (schematisch) |
| H4 Wat doe je ermee? | s16, q17, s18 | verbieden tegen begeleiden; rijexamen op 17 met coach (Opa Henk); trap met ruimte die groeit; ouders, scholen, jeugdhulp |
| Recap | s19, s20 | Bilal bij het verkeerslicht; opleidingen |

## Vragen
q02 → b; q06 → c; q09 → b; q13 → a; q17 → c (zie film.py).

## Begrippen
verbindingen (synapsen), sensitieve periode, snoeien, myeline, voorhoofdskwab, beloningssysteem, model 'beloning vooruit, rem later', begeleid rijden, pedagoog.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 132 | `window.FILMDATA` |
| 1496 | `brein()` (uit Kijken in een denkend brein) |
| 1625 | eigen tekeningen (teken_*.js) |
| 1494 | `const SCENES = {}` |
| 1689 | scènes per alinea (`Object.assign(SCENES, …)`) |

## Hoe je de film aanpast
Werkmap `hw/p1` (kopie van deze bronmap: `src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v3.md` aan, `python3 engine/make_segments.py p1 script_v3.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py p1 <sid>`, werk `stem/gen.json` bij. De opties van vraagkaarten en de eindkaart worden niet uitgesproken: die kun je zonder heropname wijzigen.
- Beeld: bewerk `scenes_p1.js` / `teken_p1.js` (cues: `q.on('woord', n)` = n-de woord in de alinea dat het stukje bevat), dan `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js p1/teken_p1.js p1/scenes_p1.js; } > p1/scenes.js`.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py p1 && python3 engine/build.py p1`; stills: `python3 engine/stills.py p1 p1/qa contact`; in de repo zetten: `python3 engine/pak.py p1 pedagogiek`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Het model 'beloning vooruit, rem later' (dual-systems) wordt in beeld en tekst als model gebracht; onderzoekers discussiëren erover.
- De staafjes in het rijspel zijn schematisch (pubers ± verdubbeling met leeftijdgenoten, jongvolwassenen ± +50 %, volwassenen geen effect).
- Opa Henk is hier rijcoach (bv.); in andere films is hij patiënt.
- Eindreview-KAN niet verwerkt: losse neuronen in het netwerk 'jij' (s05), volwassen omtrek bij hersengroei (s05).
- Woordtijden via silalign; bij s18 vielen 3 van de 10 leestekens niet op een stilte.
