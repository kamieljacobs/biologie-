set -e; cd /home/claude/werk/dna1/film; E=../eng
{ cat $E/kop.js; echo 'const SCENES = {};'; cat $E/lib_bio.js $E/lib_micro_evo.js teken_dna1.js scenes_dna1.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
