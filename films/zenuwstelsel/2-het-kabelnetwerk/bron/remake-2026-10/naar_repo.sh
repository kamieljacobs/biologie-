# bouwt de film en zet hem als preview in de repo (oude film blijft staan)
set -e; cd /home/claude/werk/zen2/film; bash bouw.sh
R=/root/biologie-; F=films/zenuwstelsel/2-het-kabelnetwerk-nieuw.html
python3 - <<'PY'
s=open('film/2-het-kabelnetwerk-nieuw.html').read()
th="<script>(function(){try{var t=localStorage.getItem('thema');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();</script>\n"
s=s.replace('<meta charset="utf-8">\n','<meta charset="utf-8">\n'+th,1)
open('/root/biologie-/films/zenuwstelsel/2-het-kabelnetwerk-nieuw.html','w').write(s)
PY
mkdir -p $R/films/zenuwstelsel/2-het-kabelnetwerk/audio && cp raw/*.mp3 $R/films/zenuwstelsel/2-het-kabelnetwerk/audio/
cd $R; git add -N $F; for s in spelerfix antwoordtekst kortantwoord flipkaarten tabel_mobiel licentie_noot teller; do python3 scripts/$s.py $F >/dev/null 2>&1 || true; done
python3 scripts/flipkaarten.py >/dev/null; python3 scripts/licentie_noot.py >/dev/null; python3 scripts/teller.py >/dev/null
for s in spelerfix antwoordtekst kortantwoord; do python3 scripts/$s.py --check $F | tail -1; done
grep -c "flipkaarten.js" $F; grep -c "teller.js" $F
