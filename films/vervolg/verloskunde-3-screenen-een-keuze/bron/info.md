# Screenen: een keuze — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/verloskunde-3-screenen-een-keuze.html` (audio in `verloskunde-3-screenen-een-keuze/audio/`) |
| Reeks | Wat word jij? · Verloskunde |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.128 credits (flow in `stem/sessions.json`) |
| Duur | spraak 4:23 (263 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Schema, met cast (Verloskundige Mirjam, Esra; nieuw in het castboek) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | uitslagbrief 'verhoogde kans op trisomie 13'; vraagteken; Mirjam |
| Hoofdstuk 1 — Het gesprek | s04, s05, s06 | Mirjam en Esra; drie kaartjes: wel informatie, geen informatie, later beslissen; weegschaal zonder gewicht van Mirjam; Esra kiest |
| Hoofdstuk 2 — Wat de testen zoeken | s07, s08, s09 | bloed van de moeder met kleine DNA-stukjes van de placenta; chromosomen 21, 18, 13 met één extra; echoscherm met hart, ruggetje, lip, buikwand; Esra: beide goed |
| Hoofdstuk 3 — Rekenen met tienduizend | s10, s11, q12, s13 | raster van 10.000 stipjes; Down: 30 stippen met een verhoogde uitslag, 29 echt; Patau: 10 stippen, 5 echt; placenta met een cellenvlekje met een extra chromosoom |
| Hoofdstuk 4 — Zekerheid krijgen | s14, s15, q16, s17 | twee wegen: vlokkentest (naald naar de placenta, vanaf 11 weken), vruchtwaterpunctie (naald in de vruchtzak, vanaf 15 weken, losse cellen van het kind); kleine kans op miskraam; verwijzing naar het ziekenhuis |
| Recap | s18, s19 | Mirjam vertelt, Esra kiest; drie kaartjes; opleiding |

## Vragen
q02 → b; q12 → c; q16 → b (zie film.py).

## Begrippen
screening, neutraal informeren, NIPT, trisomie, 20-wekenecho, voorspellende waarde, placentamozaïek, vlokkentest, vruchtwaterpunctie.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 132 | `window.FILMDATA` |
| 1523 | `const SCENES = {}` |
| 1906 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/verloskunde3` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> verloskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Afbreken van de zwangerschap feitelijk en neutraal; geen kleuren als goed/fout
- Aantallen per 10.000 afgerond (TRIDENT-2)
