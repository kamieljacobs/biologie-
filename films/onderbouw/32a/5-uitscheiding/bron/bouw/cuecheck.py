# Controle van cues: q.at('w',n), q.on('w',n), T('w',n). Meldt ontbrekende woorden en treffers die niet het hele woord zijn.
import re, json, glob, unicodedata
src=open(sorted(glob.glob('src/scenes[0-9]*.js'))[0]).read()
data=json.load(open('filmdata.json')); segs={s['id']:s for s in data['segments'] if 'words' in s}
def norm(w): return re.sub(r'[^a-zà-ÿ0-9]','',w.lower())
bad=0
for m in re.finditer(r"^(s\d\d)\(ctx,t,q\)\{(.*?)(?=^s\d\d\(ctx|^\};)",src,flags=re.S|re.M):
    sid,body=m.group(1),m.group(2)
    if sid not in segs: print(sid,'geen spraaksegment'); continue
    words=[w['t'] for w in segs[sid]['words']]
    for cm in re.finditer(r"(q\.at|q\.on|\bT|exactAt)\(['\"]([^'\"]+)['\"](?:,(\d+))?",body):
        kind,w,n=cm.group(1),cm.group(2),int(cm.group(3) or 1); c=0; hit=None
        exact=kind in ('T','exactAt')
        for x in words:
            if (norm(w)==norm(x)) if exact else (norm(w) in norm(x)):
                c+=1
                if c==n: hit=x; break
        if not hit: print(sid,'ONTBREEKT',w,n); bad+=1
        elif norm(hit)!=norm(w): print(sid,f"'{w}',{n} -> '{hit}' (deel van een ander woord)"); bad+=1
# tweePompen e.d. buiten de scènes: q.on in hulpfuncties worden niet gecontroleerd
print('cue-problemen:',bad)
