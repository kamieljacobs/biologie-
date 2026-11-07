import re,json
src=open('scenes_zen6.js').read()
segs={s['id']:s for s in json.load(open('segments.json')) if s['kind']=='speech'}
norm=lambda s: re.sub(r'[^a-zà-ÿ0-9]','',s.lower())
for m in re.finditer(r"\n  (\w+)\(ctx, t(?:, q)?\) \{(.*?)(?=\n  \w+\(ctx, t|\n\}\);)",src,re.S):
    sid,body=m.group(1),m.group(2)
    if sid not in segs: continue
    W=json.load(open(f'words/{sid}.json'))['words']; disp=segs[sid]['display'].split()
    seen=set()
    for c in re.finditer(r"q\.(?:on|at)\('([^']+)'(?:,\s*(\d+))?",body):
        w,n=c.group(1),int(c.group(2) or 1)
        if (w,n) in seen: continue
        seen.add((w,n)); hits=[(d,x['start']) for d,x in zip(disp,W) if norm(w) in norm(d)]
        if len(hits)<n: print(sid,'MIST',w,n); continue
        d,ts=hits[n-1]; flag='' if norm(d)==norm(w) else '  <-- SUBSTRING '+d
        print(sid,w,n,ts,flag)
