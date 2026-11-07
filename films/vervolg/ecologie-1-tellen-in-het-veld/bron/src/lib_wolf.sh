#!/bin/bash
# Haalt uit ec1/lib_dieren.js (kopie van bibliotheek/dieren, 25 okt 2026) alleen wat de wolf nodig heeft:
# dierOog (dier_basis.js) en het hele blok wolf_pop.js (WolfPop + wolf()). De rest van de bibliotheek (1,1 MB)
# en base.js (andere _mix/circ dan lib_cast) blijven buiten de film.
L=/home/claude/hw/ec1/lib_dieren.js
echo '// ---- uit bibliotheek/dieren/lib_dieren.js: dierOog + wolf_pop.js (goedgekeurde wolf) ----'
awk '/^function dierOog\(/{p=1} /^\/\/ patroon binnen/{exit} p' "$L"
awk '/^\/\/ ===== wolf_pop.js =====/{p=1;next} /^\/\/ ===== pop_honden.js =====/{p=0} p' "$L"
