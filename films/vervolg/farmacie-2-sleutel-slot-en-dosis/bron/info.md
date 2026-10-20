# Sleutel, slot en dosis — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/farmacie-2-sleutel-slot-en-dosis.html` (audio in `farmacie-2-sleutel-slot-en-dosis/audio/`) |
| Reeks | Wat word jij? · Farmacie |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 3.012 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:15 (195 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Part C · Schema, met cast (Sam met een verzwikte enkel; Bilal als proefpersoon, Yasmin als onderzoeker) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Sam op de bank met een ingezwachtelde enkel omhoog; strip ibuprofen; één tablet geslikt, twee extra in zijn hand |
| Hoofdstuk 1 — Waar een medicijn aangrijpt | s04 | cel met vier doelwitten: receptor in het membraan, enzym, transporteiwit, ionkanaal; ibuprofen als blokje in een enzym; korte herhaling agonist (sleutel die opent) en antagonist (sleutel die vastzit); naloxon duwt morfine van een receptor; verwijzing naar Knoeien met de spleet |
| Hoofdstuk 2 — De dosis-responscurve | s05, q06, s07 | grafiek dosis tegen effect, curve die stijgt en afvlakt; daaronder enzymen die één voor één bezet raken tot bijna alle vol zijn; twee curves die even hoog eindigen, de ene verder naar links |
| Hoofdstuk 3 — Tussen werkzaam en giftig | s08, q09, s10 | twee curves naast elkaar: werkzaam en schadelijk; brede kloof bij penicilline, smalle kloof bij lithium; bloedbuisje en een balk met twee grenzen; paracetamoldoosje met maximum per dag |
| Hoofdstuk 4 — Hetzelfde slot, een andere plek | s11 | lichaam met het enzym in het gewricht én in de maagwand; ibuprofen remt beide; beschermlaag van de maag wordt dunner; prednison met receptoren in bijna elke cel: bloedsuiker omhoog, huid en bot dunner; verwijzing naar Stress |
| Recap | s12, s13 | Sam met een koelpak en één tablet; de afvlakkende curve; lab met cellen in schaaltjes |

## Vragen
q02 → b; q06 → a; q09 → c (zie film.py).

## Begrippen
aangrijpingspunt, agonist, antagonist, enzymremmer, dosis-responscurve, maximaal effect, potentie, therapeutische breedte, farmacodynamiek.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 153 | `window.FILMDATA` |
| 1523 | `const SCENES = {}` |
| 1859 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/f2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> farmacie`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Dosis-as lineair getekend (in het vak meestal logaritmisch); het woord potentie valt niet.
- Prednisonreceptor zit in de cel maar is getekend als dezelfde V-vorm.
- Sam zit met getekende benen (geen zittende pose in de cast).
- Animatie gebouwd door een helper volgens films/vervolg/BOUWEN.md, nagekeken in de hoofdsessie.
