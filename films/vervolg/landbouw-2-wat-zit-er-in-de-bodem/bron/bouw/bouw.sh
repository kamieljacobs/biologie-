# Bouwen vanuit /home/claude/hw (engine = bron/src + bron/bouw van biotechnologie-2; lb2 = bronbestanden)
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js lb2/decor_lb2.js lb2/teken_lb1.js lb2/teken_lb2.js lb2/scenes_lb2.js; } > lb2/scenes.js
(cd lb2 && python3 film.py) && python3 engine/build_data.py lb2 && python3 engine/build.py lb2
