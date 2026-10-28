set -e; cd /home/claude/hw/erf4; E=engbouw
{ sed -n 1,32p $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_bio.js teken_erf4.js scenes_erf4.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
