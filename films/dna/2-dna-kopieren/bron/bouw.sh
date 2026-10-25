set -e; cd "$(dirname "$0")"; E=bouw  # werkmap: kopieer bron/ naar een map buiten de repo, src/* naar bouw/ en audio naar audio/
{ sed -n 1,32p $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_bio.js $E/lib_micro_evo.js teken_dna2.js scenes_dna2.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
