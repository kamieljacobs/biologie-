# De kraamweek — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/verloskunde-5-de-kraamweek.html` (audio in `verloskunde-5-de-kraamweek/audio/`) |
| Reeks | Wat word jij? · Verloskunde |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.235 credits (flow in `stem/sessions.json`) |
| Duur | spraak 4:29 (269 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Schema, met cast (Verloskundige Mirjam, Esra; nieuw in het castboek) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Esra met Lina; Lina huilt; druppels melk; vraagteken |
| Hoofdstuk 1 — Borstvoeding | s04, s05, q06, s07 | borst in doorsnede met melkklierblaasjes en spiercellen eromheen; hypofyse: voorkwab prolactine, achterkwab oxytocine; placenta met progesteron als rem; colostrum met antistoffen die de darmwand bedekken |
| Hoofdstuk 2 — De baarmoeder krimpt | s08, s09 | baarmoeder op dag 1 tot de navel, daarna elke dag lager; 1 kilo naar ongeveer 60 gram; naweeën bij het voeden; kraamverzorgende en Mirjam op huisbezoek |
| Hoofdstuk 3 — De eerste testen | s10, s11, s12, q13 | hielprik met druppels op een kaart; oortje met tik in en echo uit het slakkenhuis; weegschaal: 3400 gram, dag 3: 3200 gram |
| Hoofdstuk 4 — Hoe gaat het met jou? | s14, s15, s16 | Esra op dag 4 met tranen en een glimlach; grafiek hormonen die na de geboorte dalen; twee kaartjes: kraamtranen (dagen, gaat vanzelf over) en postnatale depressie (weken, hulp nodig); nacontrole na zes weken |
| Recap | s17, s18 | tijdlijn van de hele reeks: intake, controles, screening, bevalling, kraamweek; Mirjam en Esra met Lina; opleiding |

## Vragen
q02 → b; q06 → a; q13 → c (zie film.py).

## Begrippen
prolactine, oxytocine, toeschietreflex, colostrum, naweeën, kraamverzorgende, gehoortest, kraamtranen, postnatale depressie.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 131 | `window.FILMDATA` |
| 1522 | `const SCENES = {}` |
| 1902 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/verloskunde5` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> verloskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Lina = baby uit het castboek
- Gehoortest als OAE beschreven
