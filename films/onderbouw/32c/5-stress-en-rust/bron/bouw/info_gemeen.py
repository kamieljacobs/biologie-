# info_gemeen.py <filmmap>: plakt info_eigen.md + gedeelde secties (bronbestanden, werkmap, regelnummers, aanpassen) tot info.md
import sys, json, os
D=sys.argv[1]; cfg=json.load(open(f'{D}/src/config.json')); sc=cfg['scenes']
eigen=open(f'{D}/info_eigen.md').read(); regels=open(f'{D}/regels.md').read()
bron=f"""## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `brief.md` · `docentdeel.md` · `begrippen.json` · `uitspraak.md` · `index_entry.json` · `tts_schatting` | brief, docentdeel (wordt bij het bouwen HTML), begrippen, uitspraak-wachtlijst, site-item |
| `script_v2.md` | het script (bron van alles); `script_v1.md` vóór de reviews; `reviews/` de reviewpasses; `script.md` de ingesproken tekst per take met filmtijd |
| `stem/segmenten_stem-invoer.json` | per segment `display` en `voice`; vragen met antwoord en uitleg |
| `stem/woordtijden/sNN.json` · `stem/generaties.json` · `stem/tts.json` · `stem/scribe.json` | woordtijden · generatie-id en duur · flow en sessies |
| `filmdata.json` | de data zoals ingebed in de film |
| `src/{sc}` · `src/lib_32c.js` | scènes en film-eigen tekeningen · gedeelde 32C-tekeningen (zelfde bestand in alle 32C-films) |
| `src/config.json` · `src/vragen.json` · `src/uitspraak_film.json` | titel, meta, `mini`, `hold`, checkvragen · vraagteksten · film-eigen stem-regels |
| `src/head.html`, `src/lib.js`, `src/helpers.js`, `src/lib_cast.js`, `src/player_block.html`, `src/tail.html` | gedeelde onderbouw-onderdelen (speler met snelheid, Vragen aan/uit en spelerfix; overgenomen van 32A film 9) |
| `bouw/` | bouwstraat van 32A film 9 plus `bronmd.py` (script.md + regelnummers), `info_gemeen.py`, `deploy.py` (film + bron + index.html), `push.sh` (rebase en push) |

**Werkmap opzetten:** maak een map met `script_v2.md`, `docentdeel.md`, `begrippen.json`, en `vragen.json` en `uitspraak_film.json` (uit `src/`), plus `src/` en `stem/`; zet `_base/` (head, lib, helpers, tail) en `_engine/player_block.html` naast `bouw/` en pas de paden bovenin `bouw/bouw.py` aan. Dan: `python3 bouw/maak_segmenten.py .` → `python3 bouw/bouw.py .` → `film/index.html`; audio in `film/audio/`.
"""
waar=f"""## Waar wat in de HTML zit (`index.html`, versie {cfg['versie']})

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

{regels}"""
aanpas=f"""## Zo pas je deze film aan

1. **Een scène**: functie `sNN` in `SCENES` (`src/{sc}`); cues hangen aan woorden via `q.at('woord', n)`; draai `bouw/cuecheck.py . {sc}` na een wijziging. Gedeelde tekeningen in `src/lib_32c.js`.
2. **Eén alinea opnieuw inspreken**: Roos, eleven_v4, één take, stem-invoer uit `voice`; Scribe op die take; `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen; `bouw.py`.
3. **Vraag**: opties in `script_v2.md`, vraagtekst/goed/uitleg in `src/vragen.json`; dan `maak_segmenten.py` en `bouw.py`.
4. **Basis of uitdaging**: [VWO-START] … [VWO-END] in `script_v2.md` (intern `level: vwo`, in beeld 'uitdaging'); checkvraag/begrip met `"uitdaging": true`.
5. **Docentdeel**: `docentdeel.md` (alles vóór "## Checkvragen"); checkvragen in `src/config.json`.
6. Na elke bouw: `python3 scripts/spelerfix.py --check <film>`.
"""
parts=eigen.split('## Opbouw',1)
open(f'{D}/info.md','w').write(parts[0]+bron+'\n## Opbouw'+parts[1].split('## Uitspraak',1)[0]+waar+'\n'+aanpas+'\n## Uitspraak'+parts[1].split('## Uitspraak',1)[1])
print('info.md', len(open(f'{D}/info.md').read()))
