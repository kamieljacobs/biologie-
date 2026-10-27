# teken_dna2.js zit al in lib_bio.js (DNA 2-deel); los erbij geeft een dubbele const (RNA_BASE) en dan laadt niets.
set -e; cd "$(dirname "$0")"; E=bouw  # werkmap: kopieer bron/ naar een map buiten de repo, src/* naar bouw/ en audio naar audio/
{ sed -n 1,32p $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_bio.js $E/lib_micro_evo.js scenes_dna2.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
