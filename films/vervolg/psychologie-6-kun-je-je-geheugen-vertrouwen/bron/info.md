# Kun je je geheugen vertrouwen? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/psychologie-6-kun-je-je-geheugen-vertrouwen.html` (audio in `psychologie-6-kun-je-je-geheugen-vertrouwen/audio/`) |
| Reeks | Wat word jij? · Psychologie (rechtspsychologie) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v2.1) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea (flow in `stem/sessions.json`), 4.863 + 841 (heropname s09) credits |
| Duur | spraak 5:24 (324 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Part C · Schema, met cast (Noor als ooggetuige, Dr. Kim als rechtspsycholoog, Daan en Yasmin als proefpersonen, Teun in de verhoorstudio en het winkelcentrum) |
| Bouwvorm | FILMDATA-straat van de therapiefilm (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; vervangt het geplande stressonderwerp (Kamiel akkoord); script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) → v2.1 |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | schoolplein, fietsenrek, een fiets verdwijnt; politiebureau: Noor wijst foto 4 aan (foto's met de achterkant naar de kijker), 'ZEKER' |
| H1 Onthouden is opnieuw opbouwen | s04 | filmrol met kruis; brokjes kleur/geluid/gevoel; gat 'wat logisch lijkt'; 'iets wat je later hoorde' schuift erin |
| H2 Eén woord in een vraag | s05, q06, s07, s08 | naamkaarten Loftus en Palmer; botsende auto's op een scherm; panelen RAAKTEN?/KNALDEN? met Daan en Yasmin; glasbalken 1 op 3 / 1 op 7 / 1 op 8; twee verklaringen; boekje met vier verhalen, VERZONNEN, Teun in het winkelcentrum, 6 van 24 stippen |
| H3 De confrontatie | s09, q10, s11 | 7 van 10 stippen; checklist eerlijke confrontatie (dubbelblind) met kruis bij 'achteraf geen reactie' (rechercheur: 'goed zo'); zekerheidsmeters; groeiende zekerheid; keer 1 / keer 2 |
| H4 Wat een rechtspsycholoog doet | s12, q13, s14 | Dr. Kim kijkt het verhoor van Noor terug op een monitor; drie vraagkaartjes (STUREND/open); verhoorstudio met camera; rapport; rechtspsycholoog vs forensisch psycholoog |
| Recap | s15 | Noor, zekerheidsmeters, 'MINDER WAARD'; drie taken van de rechtspsycholoog |

## Vragen
q02 → b; q06 → b; q10 → b; q13 → c (zie film.py).

## Begrippen
reconstructie, reconsolidatie, misinformatie-effect, valse herinnering, ooggetuige, confrontatie, dubbelblind, suggestieve vraag, studioverhoor, rechtspsycholoog, forensisch psycholoog.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100–109 | Checkvragen |
| 110–135 | Voor de docent |
| 136 | `window.FILMDATA` |
| 1497 | `const SCENES = {}` |
| 1498–1536 | fiets, auto (therapiefilm), gezichtIcoon, vraagKaartje, document_ en eigen tekeningen (tafel, fotoKaart, fotoRij, fietsenrek, schoolGebouw, filmrol, brokje, scherm, glasIcoon, zekerMeter, checkRij, boekje, verhaalKaart, winkelcentrum, monitor, camera, studio, vergelijkKaart, hBalk) |
| 1537–1641 | `Object.assign(SCENES, { title, s01 … s15 })` |

## Hoe je de film aanpast
Werkmap `hw/gh` (kopie van deze bronmap: `src/` en `bouw/` naar `engine/`, de rest naar de werkmap).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py gh script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py gh <sid>`, werk `stem/gen.json` bij.
- Beeld: bewerk `scenes_gh.js` (cues: `q.on('woord', n)` = n-de woord in de alinea dat het stukje bevat, hoofdletterongevoelig), dan `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat gh/extra.js gh/scenes_gh.js; } > gh/scenes.js`.
- Vragen, begrippen, docentdeel: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py gh && python3 engine/build.py gh`; stills: `python3 engine/stills.py gh gh/qa contact`.
- Daarna in de repo: html naar `films/vervolg/`, terugknop naar `../../vervolg.html#psychologie`, en `python3 scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- De foto's bij de confrontatie liggen bewust met de achterkant (nummer) naar de kijker: zo zijn er geen gezichten van verdachten nodig (castregel).
- De dief is niet in beeld (geen silhouet-poppetje volgens de beeldafspraken): alleen een fiets die wegrijdt en de chip 'een jongen neemt een fiets mee'.
- Dr. Kim draagt in het castboek een labjas met stethoscoop ('arts en onderzoeker'); in deze film is ze rechtspsycholoog. Open vraag aan Kamiel: andere outfit of ander personage?
- In de recap zegt de stem 'de agent zei goed zo'; in H3 is dat 'de rechercheur van de zaak' (ook een agent). Bewust niet opnieuw ingesproken.
- Woordtijden via silalign; bij s04, s07, s08, s11 en s15 vielen enkele leestekens niet op een stilte.

## Wijziging 20 okt 2026 (v2.1, na de eindreview)
Eindreview (`reviews/review_eind.md`, 8 MOET) verwerkt: 'goed zo' komt nu van de rechercheur van de zaak (de begeleidende agent wist het niet: dubbelblind), 'dubbelblind' wordt uitgesproken (s09 opnieuw ingesproken); Noor achter een dichte tafel; glasbalken op schaal 0–100%; label in de monitor vrij; stempel 'MINDER WAARD' vrij; percentages zonder bron weg; naamkaarten Loftus en Palmer aan het begin van H2; sprekers bij 'goed zo'; lost-in-the-mall-label voorzichtiger; vraagkaart q10 noemt 'eerlijke confrontatie'.
