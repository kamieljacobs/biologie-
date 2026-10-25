import re, json, sys, os, unicodedata
d='film'; src=open(sys.argv[1]).read()
def norm(s): return ''.join(c for c in unicodedata.normalize('NFD',s.lower()) if unicodedata.category(c)!='Mn')
ids=[m.group(1) for m in re.finditer(r"\n  ([a-z]+\d\d)\(ctx, t(?:, q)?\) ?\{",src)]
pos=[(m.group(1),m.start()) for m in re.finditer(r"\n  ([a-z]+\d\d)\(ctx, t(?:, q)?\) ?\{",src)]+[('END',len(src))]
for (sid,a),(_,b) in zip(pos,pos[1:]):
    body=src[a:b]; f=os.path.join(d,'words',sid+'.json')
    if not os.path.exists(f): print(sid,'geen woorden'); continue
    W=[norm(w['text']) for w in json.load(open(f))['words']]
    for c in re.finditer(r"q\.(?:on|at)\('([^']+)'(?:,\s*(\d+))?",body):
        w,n=norm(c.group(1)),int(c.group(2) or 1)
        hits=sum(1 for x in W if w in x)
        if hits<n: print(sid,'MIST',repr(c.group(1)),n,'hits',hits)
print('klaar', ids)
