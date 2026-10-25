cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js fo2/teken_fo2.js fo2/scenes_fo2.js; } > fo2/scenes.js
(cd fo2 && python3 film.py) && python3 engine/build_data.py fo2 && python3 engine/build.py fo2
