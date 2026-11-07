# Bouwen vanuit een werkmap /home/claude/hw (engine = bron/src + bron/bouw van deze film, bt1 = bronbestanden)
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js bt1/teken_bt1.js bt1/scenes_bt1.js; } > bt1/scenes.js
(cd bt1 && python3 film.py) && python3 engine/build_data.py bt1 && python3 engine/build.py bt1
python3 engine/pak.py bt1 biotechnologie
