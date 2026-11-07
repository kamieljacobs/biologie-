cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js m1/teken_m1.js m1/scenes_m1.js; } > m1/scenes.js
(cd m1 && python3 film.py) && python3 engine/build_data.py m1 && python3 engine/build.py m1
