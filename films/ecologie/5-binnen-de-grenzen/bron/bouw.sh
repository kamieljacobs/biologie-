#!/bin/bash
cd /home/claude/hw/mm
{ sed -n 1,32p ../engine/scenes.js; echo 'const SCENES = {};'; cat ../engine/brein.js ../engine/teken.js ../engine/extra.js teken_basis.js teken_mm.js scenes_mm.js; } > scenes.js
python3 film.py >/dev/null && python3 ../engine/build_data.py . && python3 ../engine/build.py .
