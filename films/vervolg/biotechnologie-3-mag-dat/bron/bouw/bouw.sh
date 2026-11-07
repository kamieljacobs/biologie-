# Bouwen vanuit een werkmap /home/claude/hw (engine = bron/src + bron/bouw van deze film, bt3 = bronbestanden)
# teken_bt1.js en teken_bt2.js (reeksbibliotheek uit film 1 en 2) staan in src/ en gaan dus naar engine/
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js engine/teken_bt1.js engine/teken_bt2.js bt3/teken_bt3.js bt3/scenes_bt3.js; } > bt3/scenes.js
(cd bt3 && python3 film.py) && python3 engine/build_data.py bt3 && python3 engine/build.py bt3
python3 engine/pak.py bt3 biotechnologie
