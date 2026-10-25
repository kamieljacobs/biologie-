cd /home/claude/hw
python3 - <<'PY'
import json
p='bi2/segments.json'; S=json.load(open(p))
for x in S:
  if x['kind']=='card':
    L=[]
    for l in x['lines']:
      if ';' in l:
        a,b=l.split(';',1); L+=[a.strip()+'.', b.strip()[0].upper()+b.strip()[1:]]
      else: L.append(l)
    x['lines']=L
json.dump(S,open(p,'w'),ensure_ascii=False,indent=1)
PY
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js bi2/teken_bi2.js bi2/scenes_bi2.js; } > bi2/scenes.js
(cd bi2 && python3 film.py) && python3 engine/build_data.py bi2 && python3 engine/build.py bi2
