# Bouwt de film in /home/claude/werk/dif/film. Volgorde: engine-kop, keyframe-bibliotheken, basis-scènes, dan de scènes van de tekenaars (overschrijven de basis).
set -e; cd /home/claude/werk/dif/film; E=../eng; K=../kf
{ cat $E/scenes_kop.js; echo 'const SCENES = {};'; cat $K/base.js $K/dier_basis.js $K/dieren_zoog.js $K/pop_katten.js $K/lib_bio.js $K/lib_evo.js $K/lib_dif.js $K/sbw1.js $K/sbw2.js $K/sbw3.js $K/sbw4.js scenes_basis.js; for f in scenes_d1.js scenes_d2.js scenes_d3.js scenes_d4.js; do [ -f $f ] && cat $f; done; true; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . >/dev/null && python3 $E/build.py .
