# DNA-reeks — bouwstraat (Part C)

Gedeeld door alle DNA-films. Elke film is één zelfstandig HTML-bestand in `films/dna/`; dit is de bron waaruit ze gebouwd worden.

| Pad | Inhoud |
|---|---|
| `src/lib.js` | Part C-tokens en tekenbibliotheek (overgenomen van Celorganellen) + `metaCase` (kapitalen behalve eenheden) |
| `src/dnalib.js` | DNA-bibliotheek: basen met paarrand (A punt / T inkeping, C nok / G sleuf), RNA-tinten (teal), ruggengraat, ladder, helix, nucleotide, enzym, persoon, klok, schaalbalk |
| `src/scenes<n>.js` | scènes per film; `SCENES.<naam>=(ctx,li,lf,t,q)` (film 3: transcriptie, translatie met mRNA/ribosoom/tRNA, vaccin) |
| `src/player.js` | reeksspeler: ingesproken vragen, Havo/Vwo, Leerling/Klas, toetsen (spatie, ← → ±5 s, Shift ±30 s, ↑ ↓ hoofdstuk, A/B/C/1/2/3, Enter) |
| `src/page.tpl` | paginasjabloon |
| `films.py` | per film: titels, hoofdstukvragen, eindkaart, legenda, docenttabel "Hoe de film het uitlegt" (met look-kolom) |
| `data/afl<n>_script.json` | script, begrippen, checkvragen, getallen |
| `data/afl<n>_words.json` | woordtijden en regelgrenzen per segment |
| `data/afl<n>_stem.json` | letterlijke stem-invoer (respellings) en model |
| `data/afl<n>_docent.htmlfrag` | docentdeel (pauzes, vereenvoudigingen, leerdoelen) |
| `make_words3.py` | woordtijden en regelgrenzen uit Scribe-transcripten (film 3; regelgrens = midden tussen laatste woord en eerste woord van de volgende regel) |
| `fonts/` | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 (woff2-subsets) |

Bouwen (in een werkmap buiten de repo):

```
python3 haal_audio.py 1 ../1-wat-is-dna.html     # mp3's terug uit de gepubliceerde film
python3 build.py 1                                 # → out/1-wat-is-dna.html (+ .standalone.html)
node grab.js $PWD/out/1-wat-is-dna.standalone.html qa/a 6 && python3 sheet.py qa/a qa/a.png 7   # contactsheet (puppeteer nodig)
python3 mkbron.py 1 <repo>/films/dna               # bron/info.md en bron/script.md bijwerken
```

## Afl. 4 — audio-nabewerking (12 okt 2026)
De audio staat niet in deze map maar in de film zelf (`python3 scripts/filmbron.py uitpakken`). Volgorde na een nieuwe opname van n5, n6 of n23 (werkmap `afl4/v3/` buiten de repo):
1. `splice_trna.py` — plakt de goedgekeurde tRNA-uitspraak (n5 ≈ 7,6 s) over alle andere keren; tijdkaart in `afl4_v3/splice.json`.
2. `insert_n5.py` — voegt de extra zin over anticodon ↔ aminozuur in n5 in (woordtijden in `afl4_v3/n5_ins_words.json`).
3. `make_words4v3.py` → kopieer naar `data/afl4_audio/` → `python3 build.py 4` → `python3 mkbron.py 4 <repo>/films/dna`.
