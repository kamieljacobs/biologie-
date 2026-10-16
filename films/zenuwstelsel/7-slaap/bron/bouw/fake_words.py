"""Voorlopige woordtijden (≈ 2,4 woorden/s + pauzes bij leestekens) voor segmenten zonder opname."""
import json, sys, os
fdir = sys.argv[1]; os.makedirs(os.path.join(fdir, 'words'), exist_ok=True)
for s in json.load(open(os.path.join(fdir, 'segments.json'))):
    if s['kind'] != 'speech': continue
    out = os.path.join(fdir, 'words', s['id'] + '.json')
    if os.path.exists(out) and not json.load(open(out)).get('fake'): continue
    t = 0.1; ws = []
    for w in s['display'].split():
        d = 0.16 + 0.055 * len(w)
        ws.append({'text': w, 'start': round(t, 3), 'end': round(t + d, 3)}); t += d + 0.06
        if w[-1] in '.?!': t += 0.45
        elif w[-1] in ',:;': t += 0.2
    json.dump({'fake': True, 'words': ws}, open(out, 'w'), ensure_ascii=False)
print('ok')
