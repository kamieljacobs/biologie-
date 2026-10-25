#!/bin/bash
# Bouw Tellen in het veld (ec1) in de werkmap /home/claude/hw: scenes.js samenstellen, film.json, filmdata.json, html.
# Gebruik: bash ec1/bouw.sh            (vanuit elke map)
# Reeksobjecten: ec_reeks.js (gedeeld door de Ecologie-films) na lib_bio.js en vóór teken_ec1.js.
set -e
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js ec_reeks.js ec1/teken_ec1.js ec1/scenes_ec1.js; } > ec1/scenes.js
(cd ec1 && python3 film.py) && python3 engine/build_data.py ec1 && python3 engine/build.py ec1
python3 engine/cuecheck.py ec1 ec1/scenes_ec1.js
