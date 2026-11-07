#!/bin/bash
# Bouwt de film b3 (Van lab tot patiënt). Met audio: zet raw/<sid>.mp3 neer en draai: bash bouw.sh echt
set -e; H=/home/claude/hw; D=$H/b3
if [ "$1" = echt ]; then cp $D/raw/s*.mp3 $D/audio/; python3 $H/engine/silalign.py $D; fi
{ sed -n 1,32p $H/engine/scenes.js; echo 'const SCENES = {};'; cat $D/lib_anatomie.js $H/engine/brein.js $H/engine/teken.js $H/engine/extra.js $D/teken_b3.js $D/scenes_b3.js; } > $D/scenes.js
(cd $D && python3 film.py) && python3 $H/engine/build_data.py $D && python3 $H/engine/build.py $D
python3 $H/engine/cuecheck.py $D $D/scenes_b3.js
