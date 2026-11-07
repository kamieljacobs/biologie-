#!/bin/bash
# Bouwt film b1 met de eigen engine-map b1eng (hw/engine wordt door andere films gedeeld en overschreven).
set -e; H=/home/claude/hw; D=$H/b1; E=$H/b1eng; cd $H
{ sed -n 1,32p $E/scenes.js; echo 'const SCENES = {};'; cat $E/brein.js $E/teken.js $E/extra.js $D/teken_b1.js $D/scenes_b1.js; } > $D/scenes.js
(cd $D && python3 film.py) && python3 $E/build_data.py $D && python3 $E/build.py $D
mkdir -p $D/film/biomedisch-1-signalen-in-de-cel; cp $D/audio/*.mp3 $D/film/biomedisch-1-signalen-in-de-cel/
python3 $E/cuecheck.py $D $D/scenes_b1.js
