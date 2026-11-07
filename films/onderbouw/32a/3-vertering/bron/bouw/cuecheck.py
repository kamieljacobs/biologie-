import re, json, unicodedata
src=open('src/scenes3.js').read()
data=json.load(open('filmdata.json'))
segs={s['id']:s for s in data['segments'] if 'words' in s}
def norm(w): return ''.join(c for c in unicodedata.normalize('NFD',w.lower()) if unicodedata.category(c)!='Mn' and (c.isalnum() or c in "'-"))
for m in re.finditer(r"^(s\d\d)\(ctx,t,q\)\{(.*?)(?=^s\d\d\(ctx|^\};)",src,flags=re.S|re.M):
    sid,body=m.group(1),m.group(2)
    words=[w['t'] for w in segs[sid]['words']]
    for cm in re.finditer(r"q\.at\(['\"]([^'\"]+)['\"](?:,(\d+))?\)",body):
        w,n=cm.group(1),int(cm.group(2) or 1); c=0; hit=None
        for i,x in enumerate(words):
            if norm(w) in norm(x):
                c+=1
                if c==n: hit=(i,x); break
        allhits=[x for x in words if norm(w) in norm(x)]
        if not hit: print(sid,'MISSING',w,n)
        elif len(allhits)>1: print(sid,w,n,'->',hit[1],'| alle:',allhits)
