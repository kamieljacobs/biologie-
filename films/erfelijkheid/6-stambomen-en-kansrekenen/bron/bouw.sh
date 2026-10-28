set -e; cd /home/claude/hw/erf6; E=eng
{ sed -n 1,32p $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_bio.js $E/lib_micro_evo.js $E/teken_chr1.js teken_erf6.js scenes_erf6.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
