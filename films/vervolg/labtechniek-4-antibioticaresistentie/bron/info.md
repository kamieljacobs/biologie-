# Antibioticaresistentie — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/labtechniek-4-antibioticaresistentie.html` (audio in `labtechniek-4-antibioticaresistentie/audio/`) |
| Reeks | Wat word jij? · Laboratoriumtechniek |
| Niveau | havo · vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 24 oktober 2026 (script v2) |
| Prompt | v6 + WERKWIJZE-LESSEN van 24 okt (frisse eindreview, eenheden voluit); nog niet nagelopen tegen v10 |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.112 credits in de huidige takes; samen 5.745 credits gegenereerd, incl. de eerste s18 (flow in `stem/sessions.json`) |
| Duur | spraak 5:34 (334 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Schema-look van de Wat word jij?-films (navy, castpersonages, lijntekening) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 24 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | lab; Yasmin in labjas met een potje urine met etiket; Opa Henk bij de balie met een leeg doosje antibiotica |
| Hoofdstuk 1 — Steriel werken | s04, s05, q06 | werkbank; gasvlam; entoog die gloeiend heet wordt en afkoelt; petrischaal die maar een klein stukje opengaat; veiligheidskabinet met luchtstroom naar binnen door een filter; extra plaat als controle |
| Hoofdstuk 2 — Kolonies en tellen | s07, s08, s09, q10 | petrischaal met heldere agar; één bacterie die zich steeds deelt tot een bolletje; rij buisjes van de verdunningsreeks, elk 1 op 10; pipet met 0,1 milliliter; drie platen met 680, 68 en 7 kolonies |
| Hoofdstuk 3 — Het antibiogram | s11, s12, s13, q14 | de middelste plaat omlijst met de rekenregel erbij; dan een plaat met vier papieren schijfjes en remzones van verschillende grootte, liniaal die 24 en 9 millimeter aflegt, kaartje met het breekpunt en een smalle tussenstrook; tot slot een rij buisjes waarin de concentratie verdubbelt |
| Hoofdstuk 4 — Hoe resistentie ontstaat | s15, s16, q17, s18 | MIC naast het breekpunt; grote plaat met een dichte waas bacteriën; dezelfde hoeveelheid op een plaat met antibioticum: zeven losse kolonies; één bacterie met een veranderd gen in haar DNA |
| Hoofdstuk 5 — Plasmiden | s19 | twee bacteriën van verschillende soort, elk met hun DNA-ring binnen het membraan; een pilus ertussen; een kopie van het plasmide die door het membraan naar de andere cel gaat; de donor houdt haar eigen plasmide |
| Recap | s20, s21 | Yasmin met het antibiogram aan de telefoon, Dr. Kim aan de andere kant; de plaat met zeven kolonies ernaast; daarna Opa Henk weer fit en twee opleidingskaartjes |

## Vragen
q02 → b; q06 → c; q10 → a; q14 → b; q17 → a (zie film.py).

## Begrippen
steriel werken, voedingsbodem (agar), kolonie, verdunningsreeks, positieve en negatieve controle, antibiogram, MIC en breekpunt, resistent, conjugatie.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 163 | `window.FILMDATA` |
| 1848 | `const SCENES = {}` |
| 2374 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/lt4` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> labtechniek`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Geen breekpuntgetallen per middel (EUCAST-tabel niet leesbaar)
- S/I/R: stem houdt een tweedeling, tussengebied alleen in beeld
- s18 opnieuw ingesproken na review (kopieerfout ± 1 per 1000 delingen)
- Arm bij kijk:-1 opgelost met persoonK() in deze film; fout zit in lib_cast.js
- Ook extra film bij Evolutie
