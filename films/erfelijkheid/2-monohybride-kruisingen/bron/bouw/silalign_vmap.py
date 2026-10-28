"""Zoals silalign.py, maar lijnt de stem-invoer uit (bv. 'grote A kleine a') en zet de tijden terug op de ondertitelwoorden via vmap.
Gebruik: python3 silalign_vmap.py <filmdir> [sid ...]"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from silalign import load, align
fdir = sys.argv[1]; want = set(sys.argv[2:])
segs = [s for s in json.load(open(os.path.join(fdir, 'segments.json'))) if s['kind'] == 'speech']
os.makedirs(os.path.join(fdir, 'words'), exist_ok=True)
for s in segs:
    if want and s['id'] not in want: continue
    p = os.path.join(fdir, 'raw', s['id'] + '.mp3')
    if not os.path.exists(p): print('geen audio', s['id']); continue
    rms, dur = load(p)
    vt = s['voice'].split(); disp = s['display'].split()
    out, m, K = align(vt, rms, dur)
    vw = [x for x in out if x.get('type', 'word') == 'word']
    assert len(vw) == len(vt), (s['id'], len(vw), len(vt))
    res = []
    for i, d in enumerate(disp):
        idx = [k for k, j in enumerate(s['vmap']) if j == i]
        res.append({'text': d, 'start': vw[idx[0]]['start'], 'end': vw[idx[-1]]['end'], 'type': 'word'})
    json.dump({'words': res, 'method': 'silalign+vmap'}, open(os.path.join(fdir, 'words', s['id'] + '.json'), 'w'), ensure_ascii=False)
    print(s['id'], 'dur %.1f' % dur, 'leestekens %d, gekoppeld %d' % (K, m))
