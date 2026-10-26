# Bouwen vanuit /home/claude/hw (vd1 = Bij de diëtist). build.py neemt vd1/lib_cast.js (actueel castboek).
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js vd/teken_vd.js vd1/teken_vd1.js vd1/scenes_vd1.js; } > vd1/scenes.js
(cd vd1 && python3 film.py) && python3 engine/build_data.py vd1 && python3 engine/build.py vd1
