set -e; cd "$(dirname "$0")"
{ cat src/scenes_kop.js; echo 'const SCENES = {};'; cat src/lib_bio_deel.js src/teken_bv.js src/scenes_bv.js; } > scenes.js
python3 film.py >/dev/null && python3 src/build_data.py . && python3 src/build.py .
