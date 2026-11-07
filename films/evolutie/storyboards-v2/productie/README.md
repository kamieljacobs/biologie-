# Productie Evolutie v2 (vanaf 23 okt 2026, avond)

Werkmap `/root/hw` (buiten de repo): `engine/` = FILMDATA-straat (bron: films/vervolg/verpleegkunde-2-hoe-weefsel-herstelt/bron/src + bouw, met de actuele `films/uitspraak.json` en `personages/lib_cast.js`), `evolib/` = lib_bio, lib_evo, `bibliotheek/dieren/lib_dieren.js`, lib_micro_evo; `e<N>/` per film.

Opzetten in een nieuwe sessie: `~/evo2` zoals in OVERDRACHT.md, engine zoals hierboven, dan
```
python3 evo_script.py 1 2 3 4 5 6 7 8   # f<N>.json -> e<N>/script_v2.md, uitspraak_film.json, segments.json, map.json
python3 evo_film.py 1 2 3 4 5 6 7 8     # -> e<N>/film.py, sections.html, film.json
python3 evo_bouw.py <N>                 # scenes.js + filmdata + html (zie BOUWEN_EVO.md)
```
Eén storyboardscène = één gesproken alinea (segment); `map.json` koppelt ze. Inspreken: INSPREKEN.md (Roos, eleven_v4, één take). Bouwen: BOUWEN_EVO.md (helperbrief).
