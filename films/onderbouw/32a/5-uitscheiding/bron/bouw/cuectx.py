# Toont per T('w',n)-cue het gevonden woord met context (alleen woorden die vaker voorkomen), om verkeerde treffers te zien
import re, json, glob
src=open(sorted(glob.glob('src/scenes[0-9]*.js'))[0]).read()
segs={s['id']:s for s in json.load(open('filmdata.json'))['segments'] if 'words' in s}
norm=lambda w: re.sub(r'[^A-Za-zÀ-ÿ0-9]','',w)
for m in re.finditer(r"^(s\d\d)\(ctx,t,q\)\{(.*?)(?=^s\d\d\(ctx|^\};)",src,flags=re.S|re.M):
    sid,body=m.group(1),m.group(2); W=[w['t'] for w in segs[sid]['words']]; seen=set()
    for cm in re.finditer(r"\bT\(['\"]([^'\"]+)['\"](?:,(\d+))?",body):
        w,n=cm.group(1),int(cm.group(2) or 1)
        if (w,n) in seen: continue
        seen.add((w,n)); idx=[i for i,x in enumerate(W) if norm(x)==norm(w)]
        if len(idx)>1 and n<=len(idx): i=idx[n-1]; print(sid,f"T('{w}',{n})",'→',' '.join(W[max(0,i-2):i+4]),f'({len(idx)}x)')
