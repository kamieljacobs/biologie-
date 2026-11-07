"""Woordtijden uit een blinde Scribe-transcriptie op de ondertitelwoorden zetten (tekenuitlijning)."""
import json, sys, difflib, re
seg = {s['id']: s for s in json.load(open('segments.json'))}
norm = lambda w: re.sub(r'[^0-9a-zà-ÿ]', '', w.lower().replace('22', 'tweeëntwintig'))
for sid in sys.argv[1:]:
    disp = seg[sid]['display'].split(); sw = [w for w in json.load(open(f'scribe/{sid}.json'))['words'] if w.get('type', 'word') == 'word']
    A = ''.join(norm(w) for w in disp); Bc = []; own = []
    for i, w in enumerate(sw):
        for c in norm(w['text']): Bc.append(c); own.append(i)
    m = {}; 
    for a, b, n in difflib.SequenceMatcher(None, A, ''.join(Bc), autojunk=False).get_matching_blocks():
        for k in range(n): m[a + k] = own[b + k]
    out = []; pos = 0; old = json.load(open(f'words/{sid}.json'))['words']; maxd = 0
    for i, w in enumerate(disp):
        L = len(norm(w)); ids = [m[p] for p in range(pos, pos + L) if p in m]; pos += L
        if not ids: out.append(None); continue
        out.append({'text': w, 'start': sw[ids[0]]['start'], 'end': sw[ids[-1]]['end']})
    for i, o in enumerate(out):  # gaten opvullen
        if o is None:
            p = out[i - 1]; out[i] = {'text': disp[i], 'start': p['end'], 'end': p['end'] + 0.1}
    for a, b in zip(out, old): maxd = max(maxd, abs(a['start'] - b['start']))
    big = [(a['text'], round(b['start'], 2), a['start']) for a, b in zip(out, old) if abs(a['start'] - b['start']) > 0.3]
    print(sid, len(out), 'max verschil %.2f' % maxd, big[:8])
    json.dump({'words': out, 'method': 'scribe blind (25 okt 2026), uitgelijnd op de ondertitel'}, open(f'words/{sid}.json', 'w'), ensure_ascii=False)
