cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js bi1/teken_bi1.js bi1/scenes_bi1.js; } > bi1/scenes.js
(cd bi1 && python3 film.py) && python3 engine/build_data.py bi1 && python3 engine/build.py bi1
