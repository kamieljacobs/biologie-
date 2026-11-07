#!/bin/bash
# Havo/vwo-niveau in een stofwisselingsfilm bouwen (18 okt 2026).
# Gebruik: scripts/stofwisseling_niveau/bouw.sh <nr 1-3> <film.html zonder niveau> <uit.html> <werkmap buiten de repo>
# De film zonder niveau is de versie van vóór 18 okt 2026 (git show <commit>:films/stofwisseling/<film>.html).
set -e
H=$(cd "$(dirname "$0")" && pwd); R=$(cd "$H/../.." && pwd)
rm -rf "$4"; python3 "$R/scripts/filmbron.py" uitpakken "$2" "$4" >/dev/null
python3 "$H/niveau_data.py" "$4" "$H/specs/f$1.json" "$H/tts"
python3 "$H/niveau_page.py" "$4" "$H/havo/f$1.js" "$H/specs/tweaks_f$1.json"
python3 "$R/scripts/filmbron.py" inpakken "$4" "$3"
