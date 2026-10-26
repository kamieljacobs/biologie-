# Bouwt kf.html (keyframes/testvel) uit de engine + teken_mi.js + kf_mi.js
cd /home/claude/hw
{ echo '<!doctype html><meta charset="utf-8"><style>'; cat engine/fonts.css; echo 'body{margin:0;background:#000}</style><canvas id="c" width="1920" height="1080"></canvas><script>';
  cat engine/lib.js engine/lib_voeding.js engine/lib_hormonen.js engine/lib_cast.js;
  sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js mi/teken_mi.js mi/kf/kf_mi.js;
  echo '</script>'; } > mi/kf/kf.html
