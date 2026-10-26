# Bouwen vanuit /home/claude/hw (engine = bron/src + bron/bouw; mi = bronbestanden)
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js mi/teken_mi.js mi/scenes_mi.js; } > mi/scenes.js
(cd mi && python3 film.py) && python3 engine/build_data.py mi && python3 engine/build.py mi
