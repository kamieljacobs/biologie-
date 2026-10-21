# Negen maanden bouwen — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/verloskunde-1-negen-maanden-bouwen.html` (audio in `verloskunde-1-negen-maanden-bouwen/audio/`) |
| Reeks | Wat word jij? · Verloskunde |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 6.087 credits (flow in `stem/sessions.json`) |
| Duur | spraak 6:24 (384 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Schema, met cast (Verloskundige Mirjam, Esra; nieuw in het castboek) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | praktijkkamer; Mirjam en Esra aan tafel; Esra 7 weken zwanger; potje foliumzuur; kalender |
| Hoofdstuk 1 — De intake | s04, s05, s06 | tijdlijn met eerste dag laatste menstruatie, bevruchting twee weken later, vandaag 7 weken; embryo van 5 weken; neurale buis die sluit; lijstje met vragen van Mirjam |
| Hoofdstuk 2 — Drie lagen | s07, s08, s09 | blastocyste in het baarmoederslijmvlies; kiemschijf met drie lagen in drie kleuren; per laag organen eruit; alles-of-niets als twee paden |
| Hoofdstuk 3 — De kwetsbare weken | s10, s11, s12, s13, s14, q15 | tijdbalk week 3 tot 8 na de bevruchting met organen die na elkaar aangelegd worden; Softenon-tijdvenster dag 20 tot 36; alcohol door de placenta; Esra met ibuprofen en paracetamol |
| Hoofdstuk 4 — Groeien en rijpen | s16, s17, s18, s19, q20 | drie silhouetten op schaal: 12 weken, 20 weken, 40 weken met lengte en gewicht; echo met kop-romplengte; longblaasje dat dichtklapt zonder surfactant; spuitje bij de moeder |
| Recap | s21, s22, s23 | tijdlijn van intake tot geboorte met de vier hoofdstukken; Mirjam en Esra; opleiding |

## Vragen
q02 → a; q15 → b; q20 → c (zie film.py).

## Begrippen
intake, zwangerschapsduur, neurale buis, foliumzuur, alles-of-niets-principe, kiembladen, organogenese, foetus, surfactant.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 132 | `window.FILMDATA` |
| 1523 | `const SCENES = {}` |
| 1920 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/verloskunde1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> verloskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Week 3–8 = na de bevruchting; zwangerschapsduur = vanaf laatste menstruatie
- Esra zwanger via o.zwanger (castboek)
