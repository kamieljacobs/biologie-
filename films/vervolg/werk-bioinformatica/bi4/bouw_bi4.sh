cd /home/claude/hw
# eindkaart: eerste regel is te breed voor het scherm → ingekort (kaart wordt niet uitgesproken)
python3 - <<'PY'
import json
p='bi4/segments.json'; S=json.load(open(p))
for x in S:
  if x['kind']=='card' and x['lines'][0].startswith('De vorm van een eiwit volgt meestal uit de volgorde, en'):
    x['lines'][0]='De vorm van een eiwit volgt meestal uit de volgorde en bepaalt wat het eiwit kan.'  # te breed voor het scherm; '(en waar een medicijn past)' weggelaten (niet gesproken)
json.dump(S,open(p,'w'),ensure_ascii=False,indent=1)
PY
{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js engine/lib_bio.js bi4/teken_bi4.js bi4/scenes_bi4.js; } > bi4/scenes.js
(cd bi4 && python3 film.py) && python3 engine/build_data.py bi4 && python3 engine/build.py bi4
