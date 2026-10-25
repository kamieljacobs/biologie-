#!/bin/bash
# Bouwt film 2 Stikstof (ec2) vanuit de werkmap /home/claude/hw: scenes.js samenstellen, film.json, filmdata.json en de html.
# Volgorde: scenes.js r.1–32 · SCENES · brein · teken · extra · lib_bio · ec_reeks (gedeelde reeksobjecten) · teken_ec2 · scenes_ec2
set -e
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js ec_reeks.js ec2/teken_ec2.js ec2/scenes_ec2.js; } > ec2/scenes.js
(cd ec2 && python3 film.py)
python3 engine/build_data.py ec2
python3 engine/build.py ec2
python3 engine/cuecheck.py ec2 ec2/scenes_ec2.js
