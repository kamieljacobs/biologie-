"""Schrijft de referentie-omtrekken (px) als blok in src/tv_pop_katten.js (alleen voor het testvel)."""
import json, re, os
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(H, '..', '..', '..', '..'))
C = json.load(open(os.path.join(H, 'contouren_px.json')))
out = {k: {'g': v['grond'], 'p': [[int(x), int(y)] for x, y in v['pts']]} for k, v in C.items()}
blok = '// <<OMTREK (referentieplaten, px; alleen voor het testvel)\nconst KTV_OMTREK = ' + json.dumps(out, separators=(',', ':')) + ';\n// OMTREK>>'
f = os.path.join(ROOT, 'src', 'tv_pop_katten.js'); s = open(f).read()
s = re.sub(r'// <<OMTREK.*?// OMTREK>>', lambda m: blok, s, flags=re.S); open(f, 'w').write(s); print('ok', len(blok))
