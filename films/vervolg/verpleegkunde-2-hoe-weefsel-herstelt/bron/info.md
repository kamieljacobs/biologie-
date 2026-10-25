# Hoe weefsel herstelt — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/verpleegkunde-2-hoe-weefsel-herstelt.html` (audio in `verpleegkunde-2-hoe-weefsel-herstelt/audio/`) |
| Reeks | Wat word jij? · Verpleegkunde en Fysiotherapie (gedeelde film) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 3.804 credits (flow in `stem/sessions.json`) |
| Duur | spraak 4:01 (241 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Part C · Schema en Micro, met cast (Lotte, Sam, Opa Henk, Verpleegkundige Jesse, Fysiotherapeut Femke nieuw in het castboek) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Lotte met een schaafwond op haar knie na een val met de fiets; Sam met een gescheurde achillespees na een sprint; kalender met een week en drie maanden |
| Hoofdstuk 1 — Vier fasen | s04 | tijdlijn met vier fasen; doorsnede van de huid met de wond; bloedplaatjes en fibrinedraden die een korst vormen; witte bloedcellen die naar de wond komen, rood en warm; cellen die eiwitdraden maken en nieuwe bloedvaatjes; opperhuid die over de wond schuift; litteken met minder netjes geordende draden; verwijzing naar Wat er in je bloed zit en De eerste verdediging |
| Hoofdstuk 2 — Snel of traag | s05, q06, s07 | doorsnede huid met veel haarvaten en een onderste laag cellen die steeds delen; pees met lange draden en bijna geen bloedvaten; kraakbeen in de knie zonder bloedvaten; hartspier na een infarct met een litteken; verwijzing naar Stamcellen |
| Hoofdstuk 3 — Wat herstel tegenhoudt | s08, q09, s10 | Opa Henk lang in bed; druk op zijn hiel en stuitje; haarvaatjes die worden dichtgedrukt; plek die rood en later donker wordt; Jesse die Henk op zijn zij draait en een kussen onder zijn kuiten legt; pictogrammen voor infectie, roken en diabetes |
| Hoofdstuk 4 — Rusten of belasten | s11 | Sam met een loopschoen met een hakje; pees met eiwitdraden die eerst kriskras liggen en zich bij belasten in de lengte richten; grafiek belasting tegen weken die geleidelijk oploopt; fysiotherapeut naast Sam |
| Recap | s12, s13 | Lotte met een litteken op haar knie; Sam die weer rent; tijdlijn met de vier fasen; Jesse bij het bed; opleidingen verpleegkunde en fysiotherapie |

## Vragen
q02 → a; q06 → b; q09 → c (zie film.py).

## Begrippen
wondgenezing, stolling, ontsteking, opbouwfase, verbouwen, collageen, litteken, doorliggen (decubitus), achillespees, fysiotherapeut.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 112 | Voor de docent |
| 151 | `window.FILMDATA` |
| 1527 | `const SCENES = {}` |
| 1921 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/v2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> verpleegkunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Vier fasen; veel bronnen gebruiken er drie en de fasen overlappen.
- Behandeling achillespees volgens de NL-richtlijn (schoen met hakje, krukken, opbouwen); terugkeer naar sport ± 24–26 weken.
- Henk zit in bed (geen liggende pose in de cast); draaien aangeduid met een pijl.
- Gedeelde film: staat ook bij Fysiotherapie (id herstel).
- Animatie gebouwd door een helper volgens films/vervolg/BOUWEN.md, nagekeken in de hoofdsessie.
- 25 okt 2026: henkBed in verhouding (bed- en beenlengte volgen H), overgenomen uit de feedback op Fysiotherapie 2
