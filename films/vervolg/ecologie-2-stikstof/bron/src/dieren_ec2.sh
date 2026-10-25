#!/bin/bash
# Haalt uit bibliotheek/dieren/lib_dieren.js wat film 2 nodig heeft: koe7 (pop_hoef.js) en koolmees (pop_vogels.js),
# met hun hulpen (base.js zonder circ/_mix/pijl, dier_basis.js, dieren_overig.js). dieren_zoog.js (muis) en de andere poppen blijven buiten.
L=/home/claude/biologie-/bibliotheek/dieren/lib_dieren.js
echo '// ---- uit bibliotheek/dieren/lib_dieren.js (25 okt 2026): koe7 + koolmees met hulpen; circ/_mix/pijl komen uit de film zelf ----'
echo "function _mixDier(hex, k, met) { const a = parseInt(hex.slice(1), 16), b = parseInt(met.slice(1), 16); const m = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => m(s).toString(16).padStart(2, '0')).join(''); }"
awk 'NR>=6&&NR<=11' "$L"
echo "const _dk = (hex, k = 0.25) => _mixDier(hex, k, '#000000');"
echo "const _lt = (hex, k = 0.25) => _mixDier(hex, k, '#FFFFFF');"
awk '/^\/\/ ===== dier_basis.js =====/{p=1} /^\/\/ ===== dieren_zoog.js =====/{p=0} p' "$L"
awk '/^\/\/ ===== dieren_overig.js =====/{p=1} /^\/\/ ===== wolf_pop.js =====/{p=0} p' "$L"
awk '/^\/\/ ===== pop_hoef.js =====/{p=1} /^\/\/ ===== pop_rept_chimp.js =====/{p=0} p' "$L"
awk '/^\/\/ ===== pop_vogels.js =====/{p=1} /^\/\/ ===== pop_zwemmers.js =====/{p=0} p' "$L"
