set -e; cd /home/claude/werk/zen4/film; E=../eng
{ cat $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_anatomie.js $E/lib_bio.js synaps_z4.js teken_z4.js scenes_z4.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
# themaregel (donker standaard) na <meta charset>
python3 - <<'PY'
p='film/4-knoeien-met-de-spleet-nieuw.html'; s=open(p,encoding='utf-8').read()
r="<script>(function(){try{var t=localStorage.getItem('thema');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();</script>"
if r not in s: s=s.replace('<meta charset="utf-8">','<meta charset="utf-8">'+r,1)
open(p,'w',encoding='utf-8').write(s)
PY
