# Bouwen vanuit /home/claude/hw (engine = bron/src + bron/bouw). build.py neemt vdz/lib_cast.js (actueel castboek).
cd /home/claude/hw
{ cat vdz/kop.js; echo 'const SCENES = {};'; cat vdz/lib_anatomie.js engine/brein.js engine/teken.js engine/extra.js decor/decor_ziekenhuis.js vdz/teken_vd.js vdz/teken_vdz.js vdz/scenes_vdz.js; } > vdz/scenes.js
(cd vdz && python3 film.py) && python3 engine/build_data.py vdz && python3 engine/build.py vdz
