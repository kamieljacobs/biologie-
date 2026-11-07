set -e; cd /home/claude/hw/erf5/w; E=../eng
{ cat $E/scenes_kop.js | sed -n 1,32p; echo 'const SCENES = {};'; cat $E/lib_bio.js $E/lib_micro_evo.js $E/teken_chr1.js teken_erf5.js scenes_erf5.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
