#!/usr/bin/env python3
"""Woordtijden en regelgrenzen voor één ingevoegd segment (eigen id, bv. n9b) en voeg ze toe aan data/afl<n>_words.json.
   python3 make_words_nieuw.py <n> <id> <scribe.json>   (scribe.json = Scribe-woordenlijst: lijst of {words:[...]} met text/start/end)
   Audio: data/afl<n>_audio/<id>.mp3 (al genormaliseerd). Zelfde methode als make_words3/8: regelgrens = midden tussen laatste en eerste woord."""
import json,re,difflib,subprocess,sys
n,key,src=sys.argv[1],sys.argv[2],sys.argv[3]
def norm(s): return re.sub(r"[^0-9a-zà-ÿ]","",s.lower())
S=json.load(open(f'data/afl{n}_script.json'))['SCRIPT']; seg=next(s for s in S if s.get('id')==key)
lines=seg['lines'] if seg['kind']=='narr' else [seg['text']]
T=json.load(open(src)); tw=[w for w in (T['words'] if isinstance(T,dict) else T) if w.get('type','word')=='word']
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'data/afl{n}_audio/{key}.mp3']).strip())
disp=[{'t':w,'li':li} for li,l in enumerate(lines) for w in l.split()]
sm=difflib.SequenceMatcher(None,[norm(d['t']) for d in disp],[norm(w['text']) for w in tw],autojunk=False); m=0
for a,b,k in sm.get_matching_blocks():
    for j in range(k): disp[a+j].update(s=round(tw[b+j]['start'],3),e=round(tw[b+j]['end'],3),m=1); m+=1
j=0
while j<len(disp):
    if disp[j].get('m'): j+=1; continue
    k=j
    while k<len(disp) and not disp[k].get('m'): k+=1
    lo=disp[j-1]['e'] if j>0 else 0.0; hi=disp[k]['s'] if k<len(disp) else dur-0.2; st=(hi-lo)/(k-j)
    for q in range(j,k): disp[q]['s']=round(lo+st*(q-j),3); disp[q]['e']=round(lo+st*(q-j+1)-0.02,3)
    j=k
bounds=[round(([d for d in disp if d['li']==li-1][-1]['e']+[d for d in disp if d['li']==li][0]['s'])/2,3) for li in range(1,len(lines))]
W=json.load(open(f'data/afl{n}_words.json'))
W[key]={'words':[{'t':d['t'],'s':d['s'],'e':d['e']} for d in disp],'dur':round(dur,3),'bounds':bounds,'src':f'scribe {m}/{len(disp)}'}
json.dump(W,open(f'data/afl{n}_words.json','w'),ensure_ascii=False)
print(key,W[key]['src'],'dur',W[key]['dur'],'bounds',bounds,'mis:',' '.join(d['t'] for d in disp if not d.get('m')))
