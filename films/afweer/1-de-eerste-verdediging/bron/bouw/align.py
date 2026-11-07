"""python3 align.py <filmdir> <status.json> [...]  — Scribe-transcripten (creative_get_flow_run_status) -> words/<id>.json op de ondertitelwoorden.
Koppelt elk transcript aan het segment met de best passende stem-invoer, lijnt woord voor woord uit (difflib) en rapporteert verschillen."""
import json, re, difflib, os, sys
fdir = sys.argv[1]; tr = []
for f in sys.argv[2:]:
    d = json.load(open(f)); assert d['all_completed'] and not d['has_failures'], f; tr += d['transcripts']
segs = {s['id']: s for s in json.load(open(os.path.join(fdir, 'segments.json'))) if s['kind'] == 'speech'}
norm = lambda w: re.sub(r'[^a-z0-9à-ÿ]', '', w.lower())
os.makedirs(os.path.join(fdir, 'words'), exist_ok=True); report = []
for t in tr:
    best = max(segs, key=lambda k: difflib.SequenceMatcher(None, segs[k]['voice'], t['text']).ratio())
    s = segs[best]; r = difflib.SequenceMatcher(None, s['voice'], t['text']).ratio()
    tw = [w for w in t['words'] if w.get('type', 'word') == 'word']
    vw = s['voice'].split(); vn = [norm(w) for w in vw]; tn = [norm(w['text']) for w in tw]
    vt = [None] * len(vw)
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, vn, tn, autojunk=False).get_opcodes():
        if tag == 'equal':
            for k in range(i2 - i1): vt[i1 + k] = (tw[j1 + k]['start'], tw[j1 + k]['end'])
        else:
            report.append((best, tag, ' '.join(vw[i1:i2]), ' '.join(w['text'] for w in tw[j1:j2])))
            if j2 > j1:
                a, b = tw[j1]['start'], tw[j2 - 1]['end']; n = max(i2 - i1, 1)
                for k in range(i2 - i1): vt[i1 + k] = (a + (b - a) * k / n, a + (b - a) * (k + 1) / n)
    for i in range(len(vt)):
        if vt[i] is None:
            prev = next((vt[j][1] for j in range(i - 1, -1, -1) if vt[j]), 0); nxt = next((vt[j][0] for j in range(i + 1, len(vt)) if vt[j]), prev + 0.3)
            vt[i] = (prev, max(prev + 0.05, nxt))
    disp = s['display'].split(); out = []
    for di, d in enumerate(disp):
        idx = [k for k, m in enumerate(s['vmap']) if m == di]
        out.append({'text': d, 'start': round(min(vt[k][0] for k in idx), 3), 'end': round(max(vt[k][1] for k in idx), 3)})
    json.dump({'words': out, 'take_ratio': round(r, 4)}, open(os.path.join(fdir, 'words', best + '.json'), 'w'), ensure_ascii=False)
    print(best, round(r, 3), len(disp), out[-1]['end'])
print('verschillen:', report if report else 'geen')
