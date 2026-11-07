# Bouwen vanuit /home/claude/hw (engine = bron/src + bron/bouw; tu1 = bronbestanden). build.py neemt tu1/lib_cast.js (actueel castboek met Jeroen).
cd /home/claude/hw
{ sed -n 1,32p /home/claude/biologie-/films/vervolg/gezondheidswetenschappen-3-roken-en-longkanker/bron/src/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js decor/decor_tuin.js;
  cat tu1/teken_tu1.js tu1/scenes_tu1.js; } > tu1/scenes.js
(cd tu1 && python3 film.py) && python3 engine/build_data.py tu1 && python3 engine/build.py tu1
