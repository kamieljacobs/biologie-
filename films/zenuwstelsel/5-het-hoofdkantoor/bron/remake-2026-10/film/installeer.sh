# Zet de gebouwde film als preview in de repo (oude film blijft staan)
set -e; cd "$(dirname "$0")"; R=/root/biologie-/films/zenuwstelsel
python3 - <<'PY'
s=open('film/5-het-hoofdkantoor.html',encoding='utf-8').read()
regel="<script>(function(){try{var t=localStorage.getItem('thema');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();</script>"
if "getItem('thema')" not in s: s=s.replace('<meta charset="utf-8">','<meta charset="utf-8">\n'+regel,1)
open('/root/biologie-/films/zenuwstelsel/5-het-hoofdkantoor-nieuw.html','w',encoding='utf-8').write(s)
PY
mkdir -p $R/5-het-hoofdkantoor/audio && cp audio/*.mp3 $R/5-het-hoofdkantoor/audio/
