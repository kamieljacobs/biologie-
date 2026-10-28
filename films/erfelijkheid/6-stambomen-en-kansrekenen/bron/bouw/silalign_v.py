"""silalign op de stem-invoer (voice) en terug naar de ondertitelwoorden via vmap (erf6, 28 okt 2026).
Gebruik: python3 silalign_v.py <filmdir>"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from silalign import load, align
fdir = sys.argv[1]
for s in json.load(open(os.path.join(fdir, 'segments.json'))):
    if s['kind'] != 'speech': continue
    p = os.path.join(fdir, 'raw', s['id'] + '.mp3'); rms, dur = load(p)
    vw = s['voice'].split(); out, m, K = align(vw, rms, dur)
    disp = s['display'].split(); res = []
    for i, d in enumerate(disp):
        idx = [j for j, v in enumerate(s['vmap']) if v == i]
        res.append({'text': d, 'start': out[idx[0]]['start'], 'end': out[idx[-1]]['end']})
    json.dump({'words': res, 'method': 'silalign op stem-invoer + vmap'}, open(os.path.join(fdir, 'words', s['id'] + '.json'), 'w'), ensure_ascii=False)
    print(s['id'], 'dur %.1f' % dur, 'leestekens %d, gekoppeld %d' % (K, m))
