"""Voorlopige woordtijden (2,4 woorden/s) voor alinea's zonder audio, om scènes te bouwen vóór het inspreken.
Gebruik: python3 fakewords.py <filmdir>   (overschrijft geen bestaande words/<sid>.json met method silalign)"""
import json, os, sys
fdir = sys.argv[1]
os.makedirs(os.path.join(fdir, 'words'), exist_ok=True)
for s in json.load(open(os.path.join(fdir, 'segments.json'))):
    if s['kind'] != 'speech': continue
    p = os.path.join(fdir, 'words', s['id'] + '.json')
    if os.path.exists(p) and json.load(open(p)).get('method') == 'silalign': continue
    t = 0.0; out = []
    for w in s['display'].split():
        d = 0.18 + 0.055 * len(w)
        out.append({'text': w, 'start': round(t, 3), 'end': round(t + d, 3)}); t += d + (0.35 if w[-1] in '.?!' else 0.12 if w[-1] in ',:;' else 0.04)
    json.dump({'words': out, 'fake': True}, open(p, 'w'), ensure_ascii=False)
print('ok')
