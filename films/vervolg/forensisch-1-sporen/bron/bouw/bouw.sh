cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js fo1/teken_fo1.js fo1/scenes_fo1.js; } > fo1/scenes.js
(cd fo1 && python3 film.py) && python3 engine/build_data.py fo1 && python3 engine/build.py fo1
