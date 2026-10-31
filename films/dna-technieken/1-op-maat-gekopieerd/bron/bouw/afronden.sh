# afronden in de repo (vanuit de repo-root): vaste scripts op deze film, dan het donker-regeltje direct na <meta charset>
F=films/dna-technieken/1-op-maat-gekopieerd/index.html
for s in spelerfix antwoordtekst kortantwoord antwoordletter; do python3 scripts/$s.py $F >/dev/null; done
for s in flipkaarten licentie_noot teller oefenen tabel_mobiel microteken; do python3 scripts/$s.py >/dev/null; done
python3 - "$F" <<'PY'
import sys,re
p=sys.argv[1]; s=open(p,encoding='utf-8').read()
d=re.search(r"<script>\(function\(\)\{try\{var t=localStorage.getItem\('thema'\).*?</script>\n?",s).group(0)
s=s.replace(d,'',1); s=s.replace('<meta charset="utf-8">','<meta charset="utf-8">'+d.rstrip('\n')+'\n',1)
open(p,'w',encoding='utf-8').write(s)
PY
for s in spelerfix antwoordtekst kortantwoord antwoordletter microteken; do python3 scripts/$s.py --check $F 2>&1 | tail -1; done
