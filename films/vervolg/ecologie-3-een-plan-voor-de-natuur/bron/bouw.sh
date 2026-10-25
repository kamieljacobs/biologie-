#!/bin/sh
# Bouwt Ecologie 3 (Een plan voor de natuur) in de werkmap /home/claude/hw: scenes.js samenstellen, film.py, build_data, build.
# Volgorde: engine-kop (scenes.js r.1–32), brein, teken, extra, lib_bio, gedeelde reeksobjecten (ec_reeks.js), eigen tekeningen, scènes.
set -e
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js ec_reeks.js ec3/teken_ec3.js ec3/scenes_ec3.js; } > ec3/scenes.js
(cd ec3 && python3 film.py) && python3 engine/build_data.py ec3 && python3 engine/build.py ec3
