"""cuecheck_vmb.py <scenes_vmb.js> <filmdata.json> — per scène elke q.on/q.at: welk woord het raakt en wanneer (substring, zoals de speler)."""
import re, sys, json
src = open(sys.argv[1], encoding='utf-8').read(); fd = json.load(open(sys.argv[2], encoding='utf-8'))
W = {s['id']: s.get('words', []) for s in fd['segments']}
norm = lambda s: re.sub(r'[^a-zà-ÿ0-9]', '', s.lower())
for m in re.finditer(r'^  (s\d\d)\(ctx, t, q\) \{(.*?)(?=^  (?:s\d\d|eind|title)\(|^\}\);)', src, re.S | re.M):
    sid, body = m.group(1), m.group(2); words = W.get(sid, [])
    seen = set()
    for c in re.finditer(r"q\.(?:on|at)\('([^']+)'(?:,\s*(\d+))?", body):
        w, n = c.group(1), int(c.group(2) or 1)
        if (w, n) in seen: continue
        seen.add((w, n)); hits = [x for x in words if norm(w) in norm(x['t'])]
        if len(hits) < n: print(f'{sid}  {w!r} {n}: GEEN TREFFER'); continue
        h = hits[n - 1]; flag = '' if norm(h['t']).startswith(norm(w)) and len(norm(h['t'])) - len(norm(w)) <= 3 else '   <-- let op'
        print(f"{sid}  {w!r} {n}: {h['t']} @{h['s']:.1f}{flag}")
