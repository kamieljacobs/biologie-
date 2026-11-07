# Wat staat er op je bloeduitslag? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/labtechniek-3-wat-staat-er-op-je-bloeduitslag.html` (audio in `labtechniek-3-wat-staat-er-op-je-bloeduitslag/audio/`) |
| Reeks | Wat word jij? · Laboratoriumtechniek |
| Niveau | havo · vwo (één niveau) |
| Versie | 1.1 · oktober 2026 · 24 oktober 2026 (script v2) · heropname 25 okt 2026 (2: ALAT gewone spelling) |
| Prompt | v6 + WERKWIJZE-LESSEN van 24 okt (frisse eindreview, eenheden voluit); nog niet nagelopen tegen v10 |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.773 credits (flow in `stem/sessions.json`) |
| Duur | spraak 6:11 (371 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Schema-look van de Wat word jij?-films (navy, castpersonages, lijntekening) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 24 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Opa Henk naast Dr. Kim; vier buisjes met doppen paars, geel, grijs, paars; labformulier van Dr. Kim met Hb, leukocyten, CRP, bloedgroep; Yasmin in labjas |
| Hoofdstuk 1 — Buisjes, stolling en centrifuge | s04 | paars buisje met EDTA dat calciumionen vangt, cellen blijven los; geel buisje: stolsel, centrifuge, gel-laagje, serum erboven; grijs buisje: fluoride remt glucoseverbruik, glucosemeter die zonder fluoride daalt |
| Hoofdstuk 2 — Het bloedbeeld | s05, s06 | celteller; cellen één voor één door een nauwe opening, elk een piekje in een stroomsignaal (groot = rode bloedcel, klein = bloedplaatje); laserstraal voor witte bloedcellen; Hb: cellen barsten open, lichtstraal; uitslagformulier met Hb, leukocyten, trombocyten en balkjes met het referentiebereik |
| Hoofdstuk 3 — Klinische chemie | s07, s08, q09, s10 | chemie-analyser met cuvetjes; pipetpunt, reagens, kleur en troebeling; verwijzing ijklijn naar Van buisje tot uitslag; CRP-curve na begin ontsteking (uren, dagen), lever die CRP afgeeft; glucose uit grijs buisje; levercel die ALAT lekt; formulier met ALAT 48 net boven de streep 45; daarna een klokvormige verdeling van gezonde mensen met 95 % gekleurd |
| Hoofdstuk 4 — In de bloedbank | s11, q12, s13 | kaartje met drie putjes anti-A, anti-B, anti-D en Opa Henks rode bloedcellen (klonteren bij anti-A en anti-D); daarna plasma bij testcellen A en B (klonteren bij B); twee buisjes met twee afnamemomenten; antistofscreening; kruisproef: plasma van Opa Henk met rode bloedcellen uit een donorzakje |
| Recap | s14, s15 | het ingevulde formulier bij Dr. Kim en Opa Henk; twee opleidingen; werkplekken |

## Vragen
q02 → b; q09 → c; q12 → a (zie film.py).

## Begrippen
EDTA-buis, serum, bloedbeeld, Hb (hemoglobine), leukocyten en trombocyten, CRP, ALAT, referentiewaarde, kruisproef.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 112 | Voor de docent |
| 154 | `window.FILMDATA` |
| 1839 | `const SCENES = {}` |
| 2131 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/lt3` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> labtechniek`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Referentiewaarden verschillen per lab; stem zegt 'rond de'
- Serumbuis geel (merkafhankelijk, soms rood)
- Opa Henk (H. de Vries) is patiënt in lt2, lt3 en lt4
