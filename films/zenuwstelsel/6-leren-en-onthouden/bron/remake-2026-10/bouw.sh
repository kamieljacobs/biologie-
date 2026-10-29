set -e; cd /home/claude/werk/zen6/film; E=../eng
{ cat $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_anatomie.js $E/lib_bio.js hond_img.js teken_zen6.js scenes_zen6.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
