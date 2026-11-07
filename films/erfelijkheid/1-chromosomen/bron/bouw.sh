set -e; cd /home/claude/hw/chr1; E=../chr1eng
{ sed -n 1,32p $E/scenes.js; echo 'const SCENES = {};'; cat $E/lib_bio.js $E/lib_micro_evo.js teken_chr1.js scenes_chr1.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
