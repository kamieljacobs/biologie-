# Bouwen vanuit /home/claude/hw (engine = bron/src + bron/bouw; mk1 = bronbestanden). build.py neemt mk1/lib_cast.js (actueel castboek).
cd /home/claude/hw
{ cat mk1/scenes_kop.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js decor/decor_buurtuin.js mk1/teken_mk1.js mk1/scenes_mk1.js; } > mk1/scenes.js
(cd mk1 && python3 film.py) && python3 engine/build_data.py mk1 && python3 engine/build.py mk1
