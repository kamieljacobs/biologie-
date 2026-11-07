# Bouwen vanuit /home/claude/hw (engine = bron/src + bron/bouw; gz1 = bronbestanden). build.py neemt gz1/lib_cast.js (actueel castboek, met Farid).
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js gz1/decor_gz1.js gz1/teken_gz1.js gz1/scenes_gz1.js; } > gz1/scenes.js
(cd gz1 && python3 film.py) && python3 engine/build_data.py gz1 && python3 engine/build.py gz1
