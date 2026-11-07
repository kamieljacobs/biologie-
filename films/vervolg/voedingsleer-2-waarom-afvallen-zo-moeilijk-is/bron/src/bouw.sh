#!/bin/sh
# Bouwt de film (vanuit /home/claude/hw): bundel scènes, film.json, filmdata.json, HTML
cd /home/claude/hw
d=vd2
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js vd/decor_vd.js vd/teken_vd.js $d/teken_$d.js $d/scenes_$d.js; } > $d/scenes.js
(cd $d && python3 film.py) && python3 engine/build_data.py $d && python3 engine/build.py $d
