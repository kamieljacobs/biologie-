# Bronst, dekken en kalven — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/diergeneeskunde-2-bronst-dekken-kalven.html` (audio in `diergeneeskunde-2-bronst-dekken-kalven/audio/`) |
| Reeks | Wat word jij? · Diergeneeskunde |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.732 credits (flow in `stem/sessions.json`) |
| Duur | spraak 4:55 (295 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Schema (FILMDATA-straat), vaste cast (Dierenarts Mila, Lotte, Veehouder Gerrit e.a.), gedeelde dierentekeningen in teken_dg0.js |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | melkveestal; Lotte en Mila; een koe die op een andere koe springt; sensor om de hals |
| Hoofdstuk 1 — Elke drie weken een kans | s04, s05, s06 | cyclusklok van 21 dagen met een smal tochtvak; koe die blijft staan; staafjes stappen per dag met één piek; melding op een telefoon; hormoonlijnen zoals in Van bevruchting tot baby |
| Hoofdstuk 2 — Een andere klok | s07, s08, q09, s10, s11 | jaarkalender; schapen tochtig in de herfst, paarden in het voorjaar; lammeren en veulens allebei in het voorjaar; nacht met melatonine uit de pijnappelklier; merrie onder een lamp in een donkere stal; kat en kater |
| Hoofdstuk 3 — Een rietje uit de stikstof | s12, s13 | één stier, duizenden rietjes; vat met vloeibare stikstof; inseminatie met een lange pipet; daarna een topkoe met meerdere eicellen, embryo's die worden uitgespoeld en in andere koeien geplaatst |
| Hoofdstuk 4 — Drachtig en verlossen | s14, s15, q16, s17, s18 | echobeeld met een vruchtje en een kloppend hartje; negen maanden later, nacht; kalf in de juiste ligging met voorpoten en kop; twee pootjes met de zolen omhoog; daarna een gespierd dikbilrund en een keizersnede bij een staande koe |
| Recap | s19, s20 | tijdlijn van één koe: tocht, inseminatie, echo, kalf; Lotte en Mila; daarna de opleiding |

## Vragen
q02 → b; q09 → c; q16 → a (zie film.py).

## Begrippen
tochtig, staande tocht, seizoensgebonden bronst, melatonine, geïnduceerde eisprong, kunstmatige inseminatie (KI), embryotransplantatie, drachtigheidscontrole, Belgisch witblauw.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 136 | `window.FILMDATA` |
| 1533 | `const SCENES = {}` |
| 1984 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/diergeneeskunde-2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> diergeneeskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- s04 opnieuw ingesproken (maar maar → en dan maar)
- Liggingen van het kalf in kalfLigging() in teken_dg0.js
