# Bouwen vanuit /home/claude/hw (engine = bron/src + bron/bouw; vdb = bronbestanden). build.py neemt vdb/lib_cast.js (actueel castboek, met lars).
cd /home/claude/hw
{ cat vdb/scenes_kop.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js decor/decor_proeffabriek.js vdb/hoefpop.js vdb/koe_vdb.js vdb/teken_vdb.js vdb/scenes_vdb.js; } > vdb/scenes.js
(cd vdb && python3 film.py) && python3 engine/build_data.py vdb && python3 engine/build.py vdb
