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

## Ingevoegde segmenten (16 okt 2026)
Een nieuw stuk tekst zonder bestaande takes opnieuw op te nemen: zet een eigen segment met `"id"` (bv. `n9b`) in `data/afl<n>_script.json`; build.py gebruikt `id` als sleutel als die er is (anders `n`/`q` + plek in SCRIPT). Geef de segmenten erna hun oude sleutel als vaste `id`, zodat audio en woordtijden niet verschuiven. Normaliseren: `./norm16.sh ruw.mp3 data/afl<n>_audio/<id>.mp3`; woordtijden: `python3 make_words_nieuw.py <n> <id> <scribe.json>`; stills per segment: `NODE_PATH=$(npm root -g) node grabseg.js <html> <map> <id,id> [havo] [aantal]` (Playwright).

**Let op:** de gepubliceerde DNA-films hebben een nieuwere speler en labels dan `src/` (zie de afl. 5-noot). Een aanvulling zet je met `python3 patch_aanvulling.py <n> ../<film>.html <oude bouw> <oude src/scenes<n>.js>` in de gepubliceerde film (FILMDATA en GLOSSARY uit de nieuwe bouw; scène- en paginaverschillen als tekstvervanging); daarna `src/scenes<n>.js` = `out/scenes<n>.published.js`. Controle met Vragen uit: `NODE_PATH=$(npm root -g) node vragenuit.js <film> [havo]`.

## Afl. 5 — aanvulling 16 okt 2026 (n24b, n24c)
Ingevoegde segmenten n24b (goedaardig/kwaadaardig, scène `h4k`) en n24c (apoptose, telomeren, scène `h4r`); woordtijden met `make_words5b.py` uit `afl5/aanvulling_16okt/<id>_words.json`. `src/scenes5.js` is nu gelijk aan het gepubliceerde scèneblok (naamBij). De gepubliceerde DNA-films hebben speler- en labelwijzigingen die niet in `src/lib.js`, `src/player.js` en `src/page.tpl` staan; een kale `build.py 5` zou die terugdraaien. Daarom: `build.py 5`, dan `python3 afl5/aanvulling_16okt/patch5.py ../5-mutaties.html <oude bouw>` (zie bron/info.md van de film).
