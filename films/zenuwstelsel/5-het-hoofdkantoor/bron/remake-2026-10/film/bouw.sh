# Bouwt de film opnieuw (werkmap: film/ met segments.json, words/, audio/, film.py, sections.html, teken_z5.js, scenes_z5.js; engine in ../eng = src/ + bouw/)
set -e; cd "$(dirname "$0")"; E=../eng
{ cat $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_anatomie.js $E/lib_bio.js teken_z5.js scenes_z5.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
