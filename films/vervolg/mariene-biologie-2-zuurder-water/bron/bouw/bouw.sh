# Bouwen vanuit /home/claude/hw (engine = bron/src + bron/bouw; mb2 = bronbestanden; decor/decor_marien.js = bron/src/decor_marien.js). Let op: segments.json heeft een met de hand ingekorte hoofdstuktitel H3; niet opnieuw make_segments.py draaien zonder dat te herhalen.
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js decor/decor_marien.js mb2/teken_mb2.js mb2/scenes_mb2.js; } > mb2/scenes.js
(cd mb2 && python3 film.py) && python3 engine/build_data.py mb2 && python3 engine/build.py mb2
