# Bouwen vanuit /home/claude/hw (engine = bron/src + bron/bouw; mb3 = bronbestanden; decor/decor_marien.js = bron/src/decor_marien.js). Werkmap opzetten: zie films/vervolg/BOUWEN.md.
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js decor/decor_marien.js mb3/teken_mb3.js mb3/scenes_mb3.js; } > mb3/scenes.js
(cd mb3 && python3 film.py) && python3 engine/build_data.py mb3 && python3 engine/build.py mb3
