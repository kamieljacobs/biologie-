# cuecheck.py <filmmap> <scenes.js>: elk q.at('w',n) -> welk woord; markeer gedeeltelijke of ontbrekende treffers
import re, json, sys, unicodedata
D,S=sys.argv[1],sys.argv[2]
src=open(f'{D}/src/{S}').read(); data=json.load(open(f'{D}/filmdata.json'))
segs={s['id']:s for s in data['segments'] if 'words' in s}
norm=lambda w: re.sub(r'[^a-zà-ÿ0-9]','',w.lower())
for m in re.finditer(r"^(s\d\d)\(ctx,t,q\)\{(.*?)(?=^s\d\d\(ctx|^\};)",src,flags=re.S|re.M):
    sid,body=m.group(1),m.group(2); words=[w['t'] for w in segs[sid]['words']]
    for cm in re.finditer(r"q\.at\(['\"]([^'\"]+)['\"](?:,(\d+))?\)",body):
        w,n=cm.group(1),int(cm.group(2) or 1); hits=[x for x in words if norm(w) in norm(x)]
        if len(hits)<n: print(sid,'ONTBREEKT',w,n)
        elif norm(hits[n-1])!=norm(w): print(sid,f"'{w}',{n} -> '{hits[n-1]}' (gedeeltelijk)  alle:",hits)
