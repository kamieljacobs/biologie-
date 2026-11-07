#!/bin/bash
# bouw.sh <dir> : concateneert engine + teken_ex18_*.js + scenes_ex18_*.js uit <dir> tot <dir>/scenes.js en bouwt de film
set -e; D=$1; cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js $D/teken_ex18_*.js; cat $D/scenes_ex18_*.js 2>/dev/null || true; } > $D/scenes.js
(cd $D && python3 film.py >/dev/null) && python3 engine/build_data.py $D && python3 engine/build.py $D
