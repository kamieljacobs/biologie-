set -e; cd /home/claude/werk/geslacht/film; E=../eng
{ cat $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_bio.js teken_g2.js scenes_g2.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
