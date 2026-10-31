# DNA 7 2.0 bouwen (FILMDATA-straat, zoals DNA 1 en 2). Werkmap buiten de repo: kopieer bron/* erheen, src/* naar bouw/, ../audio naar audio/ en maak 7-dna-lezen/audio -> ../audio (build_data verwijst naar <slug>/audio/<id>.mp3). Daarna: bash bouw.sh; stills: python3 bouw/stills.py . qa contact
set -e; cd "$(dirname "$0")"; E=bouw
{ cat $E/lib_dieren.js; sed -n 1,32p $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_bio.js $E/lib_micro_evo.js $E/teken_dna7.js $E/scenes_dna7.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
