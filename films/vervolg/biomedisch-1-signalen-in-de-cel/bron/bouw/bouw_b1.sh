#!/bin/bash
# Bouwt film b1 (Signalen in de cel). Gebruik: bash /home/claude/hw/b1/bouw_b1.sh [contact]
# Met echte audio: zet de mp3's in raw/<sid>.mp3 en audio/<sid>.mp3 en draai eerst:
#   python3 /home/claude/hw/engine/silalign.py /home/claude/hw/b1
# (generation_id, session en history per alinea: stem/gen.json; alle 11 takes gedownload, s01 en s12 heropname 24 okt)
set -e; H=/home/claude/hw; D=$H/b1; cd $H
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js $D/teken_b1.js $D/scenes_b1.js; } > $D/scenes.js
(cd $D && python3 film.py) && python3 engine/build_data.py $D && python3 engine/build.py $D
mkdir -p $D/film/biomedisch-1-signalen-in-de-cel; [ -d $D/audio ] && cp -n $D/audio/*.mp3 $D/film/biomedisch-1-signalen-in-de-cel/ 2>/dev/null || true
python3 engine/cuecheck.py $D $D/scenes_b1.js
if [ "$1" = contact ]; then rm -rf $D/qa; python3 engine/stills.py $D $D/qa contact; python3 engine/sheet.py $D/qa /tmp/claude-0/-home-claude/bca50db5-8e94-51a4-91d2-9a0a766aa95f/scratchpad/sheet_b1.png 4; fi
