# Scribe-uitvoer (status-json) -> words/sNN.json; koppelt op tekstgelijkenis en controleert woordaantallen
import json,sys,re,difflib
segs=json.load(open('segments.json')); sp={s['id']:s for s in segs if s['kind']=='speech'}
n=lambda s:re.sub(r'[^a-z0-9 ]','',s.lower())
d=json.load(open(sys.argv[1])); ok=True; rep=[]
for tr in d['transcripts']:
    txt=tr.get('text','')
    sid=max(sp,key=lambda k: difflib.SequenceMatcher(None,n(sp[k]['voice']),n(txt)).ratio())
    ws=[x for x in tr['words'] if x.get('type','word')=='word']
    json.dump({'words':ws},open(f'words/{sid}.json','w'),ensure_ascii=False)
    disp=sp[sid]['display'].split(); m=[]
    for tok in disp:
        if m and m[-1] in ("'s","’s"): m[-1]+=' '+tok
        else: m.append(tok)
    same=len(ws)==len(m); ok&=same
    diffs=[(a,b['text']) for a,b in zip(m,ws) if n(a).replace(' ','')!=n(b['text']).replace(' ','')]
    rep.append((sid,len(ws),len(m),'OK' if same else 'MISMATCH',diffs))
for r in sorted(rep): print(*r)
print('alles gelijk' if ok else 'LET OP: verschil in aantal woorden')
