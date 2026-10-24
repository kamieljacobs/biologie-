# Van lab tot patiënt — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/biomedisch-3-van-lab-tot-patient.html` (audio in `biomedisch-3-van-lab-tot-patient/audio/`) |
| Reeks | Wat word jij? · Biomedische wetenschappen |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 24 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.638 credits (flow in `stem/sessions.json`) |
| Duur | spraak 5:01 (301 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Schema, met cast (Opa Henk, Dr. Kim, Noor; Erik en Joost als figuranten aan de EMA-tafel) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 24 okt 2026; script v1 → zelfcontrole met bronnen → v2 → ingesproken → frisse eindreview (reviews/review_eind.md) → hersteld |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | spreekkamer; Opa Henk en Noor tegenover Dr. Kim; folder 'onderzoek nieuw medicijn hartfalen'; tijdlijn van lab (meer dan tien jaar geleden) tot apotheek met een vraagteken |
| Hoofdstuk 1 — Van idee tot kandidaat | s04, q05, s06 | kweekplaat met veel putjes en een robotarm; eiwit dat bij de ziekte hoort met een passende stof; trechter van 10.000 stoffen naar 1 of 2; schaaltje cellen naast een lichaam met hart, lever en nieren; rat en tweede diersoort; vergunning CCD met weegschaal doel tegen ongerief; drie V's als kaartjes |
| Hoofdstuk 2 — Fase 1, 2 en 3 | s07 | Henk tekent het toestemmingsformulier, Noor naast hem, Dr. Kim; stempel medisch-ethische commissie; trap met drie treden: fase 1 kleine groep (20 tot 100), fase 2 een paar honderd, fase 3 honderden tot duizenden, vaccin tienduizenden; per trede de vraag; stoffen die afvallen; 1 op 10 en bij vaccins 1 op 3 |
| Hoofdstuk 3 — Eerlijk vergelijken | s08, q09, s10 | Henk met een potje met alleen een code; computer die loot: twee groepen die gemiddeld gelijk zijn; twee pillen die er hetzelfde uitzien; beide groepen ook de gewone medicijnen; Dr. Kim met een blinddoek; code die aan het eind opengaat; staafjes 8 tegen 162 |
| Hoofdstuk 4 — Toelating en bewaking | s11, q12, s13 | dossier naar het EMA; tafel met experts uit de EU-landen, ook het CBG; weegschaal voordelen tegen risico's; Europese Commissie, kaart van de EU; klokje ruim een jaar; fase 3 met een paar duizend poppetjes tegenover een bijwerking bij 1 op 100.000; Lareb met meldingen; vaccinflacon; leeftijdsgrens 60 |
| Recap | s14, s15 | Henk en Noor thuis met het potje met de code; tijdlijn lab, dieren, fase 1-2-3, toelating, bewaking; opleiding Biomedische wetenschappen |

## Vragen
q02 → b; q05 → c; q09 → a; q12 → b (zie film.py).

## Begrippen
geneesmiddelenonderzoek, drie V's, Centrale Commissie Dierproeven (CCD), medisch-ethische commissie, fase 1, 2 en 3, placebo, dubbelblind, loten (randomiseren), EMA, CBG en Lareb.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 152 | `window.FILMDATA` |
| 1837 | `const SCENES = {}` |
| 2428 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/b3` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> biomedisch`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- dierproeven 2024: 435.263 (Kamerbrief 5 juni 2026), s06 na de eindreview opnieuw ingesproken
- AstraZeneca: vooral vanaf 60, want de tweede prik bleef mogelijk
- s08 zegt nog "evenveel" (beeld: ongeveer evenveel)
