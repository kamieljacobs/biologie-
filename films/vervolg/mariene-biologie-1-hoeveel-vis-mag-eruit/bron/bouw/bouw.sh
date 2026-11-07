# Bouwen vanuit /home/claude/hw (engine = bron/src + bron/bouw; mb1 = bronbestanden; decor/decor_marien.js = bron/src/decor_marien.js). Werkmap opzetten: zie films/vervolg/BOUWEN.md.
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js decor/decor_marien.js mb1/teken_mb1.js mb1/scenes_mb1.js; } > mb1/scenes.js
(cd mb1 && python3 film.py) && python3 engine/build_data.py mb1 && python3 engine/build.py mb1
