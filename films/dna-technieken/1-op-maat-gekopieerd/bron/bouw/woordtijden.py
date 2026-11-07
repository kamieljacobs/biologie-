"""woordtijden.py <filmdir> <omg_tl.json>
Woordtijden per segment (31 okt 2026): silalign per regel binnen de regelgrenzen t0..t1 uit OMG_TL (die liggen vast
uit de oorspronkelijke tijdlijn), zodat een verkeerd gekoppelde stilte nooit over een regelgrens schuift.
Schrijft words/<sid>.json (tijden relatief aan het begin van raw/<sid>.mp3)."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from silalign import load, align
fdir, tlp = sys.argv[1], sys.argv[2]
tl = json.load(open(tlp, encoding='utf-8')); L = {(l['ch'], l['i']): l for l in tl['lines']}
segs = json.load(open(os.path.join(fdir, 'segments.json'), encoding='utf-8'))
os.makedirs(os.path.join(fdir, 'words'), exist_ok=True)
for s in segs:
    if s['kind'] != 'speech': continue
    rms, dur = load(os.path.join(fdir, 'raw', s['id'] + '.mp3')); k0 = s['bron']['knip'][0]
    ch = s['bron']['van'].split()[0]; a = int(s['bron']['van'].split('r')[1]); disp = s['display'].split(); idx = 0; out = []
    for i, txt in enumerate(s['lines']):
        l = L[(ch, a + i)]; nw = len(txt.split()); words = disp[idx:idx + nw]; idx += nw
        r0, r1 = max(0.0, l['t0'] - k0 - 0.04), min(dur, l['t1'] - k0 + 0.04)
        f0, f1 = int(r0 * 100), int(r1 * 100)
        w, _, _ = align(words, rms[f0:f1], (f1 - f0) / 100)
        for x in w: out.append({'text': x['text'], 'start': round(x['start'] + f0 / 100, 3), 'end': round(x['end'] + f0 / 100, 3)})
    assert idx == len(disp)
    json.dump({'words': out, 'method': 'silalign per regel (OMG_TL-grenzen)'}, open(os.path.join(fdir, 'words', s['id'] + '.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print('klaar')
