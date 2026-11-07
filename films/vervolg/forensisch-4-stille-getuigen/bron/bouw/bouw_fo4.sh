cd /home/claude/hw
{ cat engine/scenes_kop.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js decor/decor_fo4.js fo4/teken_fo4.js fo4/scenes_fo4.js; } > fo4/scenes.js
(cd fo4 && python3 film.py) && python3 engine/build_data.py fo4 && python3 engine/build.py fo4
