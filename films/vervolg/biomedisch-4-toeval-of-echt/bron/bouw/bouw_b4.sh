#!/bin/bash
# Bouwt film b4 (Toeval of echt?) opnieuw. Gebruik: bash /home/claude/hw/b4/bouw_b4.sh [align]
# Met 'align': eerst echte woordtijden uit raw/sNN.mp3 (download die eerst; ids in stem/gen.json: generation_id, session_id, history).
set -e; H=/home/claude/hw; cd $H
if [ "$1" = align ]; then python3 engine/silalign.py b4; fi
python3 engine/cuecheck.py b4 b4/scenes_b4.js
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js b4/teken_b4.js b4/scenes_b4.js; } > b4/scenes.js
(cd b4 && python3 film.py) && python3 engine/build_data.py b4 && python3 engine/build.py b4
rm -rf b4/qa && python3 engine/stills.py b4 b4/qa contact
python3 engine/sheet.py b4/qa /tmp/claude-0/-home-claude/bca50db5-8e94-51a4-91d2-9a0a766aa95f/scratchpad/sheet_b4.png 4
