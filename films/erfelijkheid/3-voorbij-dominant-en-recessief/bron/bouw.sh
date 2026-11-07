set -e; cd "${1:-/home/claude/hw/erf3/w}"; E=${2:-../eng}
{ sed -n 1,32p $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_bio.js $E/lib_dieren.js teken_erf3.js scenes_erf3.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
# donker standaard (CLAUDE.md): regeltje direct na <meta charset>
python3 - <<'P'
p='film/3-voorbij-dominant-en-recessief.html'; s=open(p,encoding='utf-8').read()
L="<script>(function(){try{var t=localStorage.getItem('thema');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();</script>"
if L not in s: s=s.replace('<meta charset="utf-8">','<meta charset="utf-8">\n'+L,1)
open(p,'w',encoding='utf-8').write(s)
P
