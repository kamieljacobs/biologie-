# Bouwen vanuit /home/claude/hw (engine = bron/src + bron/bouw; lb3 = bronbestanden). build.py neemt lb3/lib_cast.js (actueel castboek) in plaats van engine/lib_cast.js.
cd /home/claude/hw
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js lb3/decor_lb3.js;
  echo 'if (typeof EVO === "undefined") var EVO = { a1: "#5BA4C9", a2: "#C9A35C" };';
  cat lb3/lib_micro_evo_min.js lb3/hoefpop.js lb3/teken_lb3.js lb3/scenes_lb3.js; } > lb3/scenes.js
(cd lb3 && python3 film.py) && python3 engine/build_data.py lb3 && python3 engine/build.py lb3
