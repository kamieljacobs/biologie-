#!/bin/bash
# Bouwscript MBRT 2 · Bestraling. Na het downloaden van de takes naar raw/<sid>.mp3 (generation_ids in stem/gen.json):
#   cp raw/*.mp3 audio/ && python3 ../engine/silalign.py . && ./bouw_m2.sh
set -e; cd /home/claude/hw/m2; E=/home/claude/hw/engine
{ sed -n 1,32p $E/scenes.js; echo 'const SCENES = {};'; cat $E/brein.js $E/teken.js $E/extra.js teken_m2.js scenes_m2.js; } > scenes.js
python3 film.py && python3 $E/build_data.py . && python3 $E/build.py .
python3 $E/cuecheck.py . scenes_m2.js
