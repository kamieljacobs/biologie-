# Bouwen van DNA 8 (versie 2.0) in een werkmap buiten de repo; zie info.md § 'Zo pas je deze film aan'.
#   werkmap/eng  = bron/src/* (behalve teken_dna8.js, scenes_dna8.js) + bron/bouw/*.py
#   werkmap/film = segments.json, film.py, sections.html, glossary.json, teken_dna8.js, scenes_dna8.js,
#                  words/ (= bron/stem/woordtijden/) en audio/ (= ../audio/)
set -e; cd "${1:-.}/film"; E=../eng
{ cat $E/kop.js; echo 'const SCENES = {};'; cat $E/lib_bio.js teken_dna8.js scenes_dna8.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
# daarna: film/8-wat-heb-jij-aan-dna.html → films/dna/, met het donker-standaard-regeltje direct na <meta charset>
