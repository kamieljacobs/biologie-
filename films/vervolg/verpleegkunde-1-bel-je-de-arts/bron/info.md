# Bel je de arts? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/verpleegkunde-1-bel-je-de-arts.html` (audio in `verpleegkunde-1-bel-je-de-arts/audio/`) |
| Reeks | Wat word jij? · Verpleegkunde |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 3.223 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:30 (210 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Part C · Schema, met cast (Opa Henk in een ziekenhuisbed, Verpleegkundige Jesse nieuw in het castboek, Dr. Kim aan de telefoon) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | ziekenhuiskamer; Opa Henk half rechtop in bed (kamerlucht, nog geen extra zuurstof); Verpleegkundige Jesse met een saturatiemeter; twee lijstjes metingen naast elkaar: ochtend en middag, de middagwaarden net iets anders |
| Hoofdstuk 1 — Zes metingen aan het bed | s04, q05, s06 | Henk in bed met zes symbolen rond hem: pols, bloeddruk, ademhaling, saturatie, temperatuur, bewustzijn; bij elk het orgaan waar het over gaat; saturatiemeter op een vinger met rood licht dat door de vingertop schijnt; rode bloedcellen met hemoglobine, de meeste beladen met zuurstof, een paar leeg |
| Hoofdstuk 2 — Het eerste teken | s07 | Jesse kijkt naar zijn horloge en telt Henks ademhalingen; borstkas die op en neer gaat; teller van 16 naar 24 per minuut; pijl van minder zuurstof en meer koolstofdioxide naar de hersenstam, die het ademen versnelt; verwijzing naar Uitscheiding en evenwicht |
| Hoofdstuk 3 — Optellen in een score | s08 | tabel met zes metingen en punten 0 tot 3; ochtend: alles groen, één punt; middag: vijf metingen elk een of twee punten; totaal 7 in een rode cirkel; drempel als streep |
| Hoofdstuk 4 — Het belgesprek | s09, q10, s11 | Jesse met de telefoon; Dr. Kim aan de andere kant; vier blokken S, B, A, R die één voor één oplichten: Situatie, Achtergrond, Beoordeling, Aanbeveling |
| Recap | s12, s13 | Dr. Kim bij Henks bed; extra zuurstof via het neusbrilletje; score die weer daalt; Jesse met de lijst; opleidingen: mbo-verpleegkunde en hbo-verpleegkunde |

## Vragen
q02 → b; q05 → a; q10 → c (zie film.py).

## Begrippen
vitale functies, ademfrequentie, saturatie, saturatiemeter (pulsoximeter), hemoglobine, hersenstam, waarschuwingsscore (early warning score), SBAR, longontsteking (pneumonie).

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 112 | Voor de docent |
| 151 | `window.FILMDATA` |
| 1527 | `const SCENES = {}` |
| 1846 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/v1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> verpleegkunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Score zoals NEWS2 (in NL meestal MEWS met eigen grenzen); exacte waarden staan in de kopregel van script_v2.md.
- Henk ademt tot en met H4 kamerlucht; extra zuurstof pas in de recap (anders klopt de score niet).
- Ondertitel s07 omhooggaat: woordtijden omhoog + gaat samengevoegd in stem/woordtijden/s07.json.
- Animatie gebouwd door een helper volgens films/vervolg/BOUWEN.md, nagekeken in de hoofdsessie.
