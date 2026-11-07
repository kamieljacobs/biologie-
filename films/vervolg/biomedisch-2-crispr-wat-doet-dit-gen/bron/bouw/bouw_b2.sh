#!/bin/sh
# Bouwscript voor b2 (CRISPR: wat doet dit gen?). Draai vanuit /home/claude/hw.
# Audio staat in b2/raw/ en b2/audio/; woordtijden in b2/words/ komen van silalign (echte tijden).
# Na een nieuwe take: mp3 naar raw/ en audio/, dan python3 engine/silalign.py b2 <sid>, dan dit script.
set -e
cd "$(dirname "$0")/.."
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js b2/teken_b2.js b2/scenes_b2.js; } > b2/scenes.js
(cd b2 && python3 film.py)
python3 engine/cuecheck.py b2 b2/scenes_b2.js
python3 engine/build_data.py b2
python3 engine/build.py b2
rm -rf b2/qa && python3 engine/stills.py b2 b2/qa contact
python3 engine/sheet.py b2/qa /tmp/claude-0/-home-claude/bca50db5-8e94-51a4-91d2-9a0a766aa95f/scratchpad/sheet_b2.png 4
