# Bouwen vanuit een werkmap /home/claude/hw (engine = bron/src + bron/bouw van deze film, bt2 = bronbestanden)
# teken_bt1.js (reeksbibliotheek uit film 1) staat in src/ en gaat dus naar engine/
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js engine/teken_bt1.js bt2/teken_bt2.js bt2/scenes_bt2.js; } > bt2/scenes.js
(cd bt2 && python3 film.py) && python3 engine/build_data.py bt2 && python3 engine/build.py bt2
python3 engine/pak.py bt2 biotechnologie
