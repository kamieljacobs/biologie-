import re, json, sys, os, unicodedata
src=open(sys.argv[1]).read()
def norm(s): return ''.join(c for c in unicodedata.normalize('NFD',s.lower()) if unicodedata.category(c)!='Mn')
def kaal(s): return re.sub(r'[^\w-]','',norm(s))
pos=[(m.group(1),m.start()) for m in re.finditer(r"\n  ([a-z]+\d\d)\(ctx, t(?:, q)?\) ?\{",src)]+[('END',len(src))]
# cycleRing cues gaan naar de alinea die hem aanroept
extra={'s06':re.findall(r"q\.at\('([^']+)'",src[src.find('function cycleRing'):src.find('function cycleRing')+4000]) if 'function cycleRing' in src else []}
for (sid,a),(_,b) in zip(pos,pos[1:]):
    f=f'film/words/{sid}.json'
    if not os.path.exists(f): continue
    W=[w['text'] for w in json.load(open(f))['words']]
    for c in re.finditer(r"q\.(?:on|at)\('([^']+)'(?:,\s*(\d+))?",src[a:b]):
        w,n=c.group(1),int(c.group(2) or 1); hits=[x for x in W if norm(w) in norm(x)]
        if len(hits)<n: print(sid,'MIST',w,n); continue
        got=hits[n-1]
        if kaal(got)!=kaal(w): print(sid, repr(w), n, '->', repr(got), '| alle:', [h for h in hits][:6])
