#!/usr/bin/env python3
"""Afl. 6 aanvulling (16 okt 2026): woordtijden en regelgrenzen voor n10b en n11b uit Scribe (afl6/raw/<id>_words.json),
   en n11 ingekort (laatste regel 'Nu: waar komen…' verhuisd naar n11b). Draai in de bouwmap: python3 make_words6b.py"""
import json,re,difflib,subprocess
RESP={'ee-koolie':'ecoli','lak-operon':'lacoperon','deeënaa':'dna','er-en-aa-polymerase':'rnapolymerase','em-er-en-aa':'mrna',
      'er-en-aa-interferentie':'rnainterferentie','er-en-aa':'rna','mikro-er-en-aa':'microrna','es-ie-er-en-aa':'sirna','risk':'risc'}
def norm(s): return re.sub(r"[^0-9a-zà-ÿ]","",s.lower())
def nresp(s):
    k=re.sub(r"[.,:;?!]","",s.lower()); return norm(RESP.get(k,k))
S={s.get('id'):s for s in json.load(open('data/afl6_script.json'))['SCRIPT']}
W=json.load(open('data/afl6_words.json'))
for key in ('n10b','n11b'):
    lines=S[key]['lines']; dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'data/afl6_audio/{key}.mp3']).strip())
    disp=[{'t':w,'li':li} for li,l in enumerate(lines) for w in l.split()]
    tw=[w for w in json.load(open(f'afl6/raw/{key}_words.json'))['words'] if w.get('type','word')=='word']
    # 'E. coli' = twee schermwoorden voor één gesproken woord
    dn=[norm(d['t']) for d in disp]
    sm=difflib.SequenceMatcher(None,dn,[nresp(w['text']) for w in tw],autojunk=False); m=0
    for a,b,k in sm.get_matching_blocks():
        for j in range(k): disp[a+j].update(s=round(tw[b+j]['start'],3),e=round(tw[b+j]['end'],3),m=1); m+=1
    j=0
    while j<len(disp):
        if disp[j].get('m'): j+=1; continue
        k=j
        while k<len(disp) and not disp[k].get('m'): k+=1
        lo=disp[j-1]['e'] if j>0 else 0.0; hi=disp[k]['s'] if k<len(disp) else dur-0.2; n=k-j; st=(hi-lo)/n
        for q in range(j,k): disp[q]['s']=round(lo+st*(q-j),3); disp[q]['e']=round(lo+st*(q-j+1)-0.02,3)
        j=k
    bounds=[round(([d for d in disp if d['li']==li-1][-1]['e']+[d for d in disp if d['li']==li][0]['s'])/2,3) for li in range(1,len(lines))]
    W[key]={'words':[{'t':d['t'],'s':d['s'],'e':d['e']} for d in disp],'dur':round(dur,3),'bounds':bounds,'src':f'scribe {m}/{len(disp)}'}
    print(key,W[key]['src'],'niet gematcht:',' '.join(d['t'] for d in disp if not d.get('m')),'| bounds',bounds)
# n11 ingekort tot en met '…versterkt.'
n=W['n11']; nl=len(S['n11']['lines'])
if len(n['bounds'])>=nl:
    cut=n['bounds'][nl-1]; n['words']=[w for w in n['words'] if w['s']<cut]; n['bounds']=n['bounds'][:nl-1]
n['dur']=round(float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','data/afl6_audio/n11.mp3']).strip()),3)
print('n11',len(n['words']),n['words'][-1],n['bounds'],n['dur'])
json.dump(W,open('data/afl6_words.json','w'),ensure_ascii=False)
