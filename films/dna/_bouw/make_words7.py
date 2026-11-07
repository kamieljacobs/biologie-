import json,re,difflib,subprocess
def norm(s): return re.sub(r"[^0-9a-zà-ÿ]","",s.lower())
S=json.load(open('data/afl7_script.json'))['SCRIPT']; TR=json.load(open('afl7/scribe.json'))
res={}
for i,s in enumerate(S):
    if s['kind'] not in('narr','q'): continue
    key=('n' if s['kind']=='narr' else 'q')+str(i)
    lines=s['lines'] if s['kind']=='narr' else [s['text']]
    dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'afl7/norm/{key}.mp3']).strip())
    disp=[{'t':w,'li':li} for li,l in enumerate(lines) for w in l.split()]
    tw=TR[key]['words']
    sm=difflib.SequenceMatcher(None,[norm(d['t']) for d in disp],[norm(w['text']) for w in tw],autojunk=False)
    m=0
    for a,b,k in sm.get_matching_blocks():
        for j in range(k): disp[a+j]['s']=round(tw[b+j]['start'],3); disp[a+j]['e']=round(tw[b+j]['end'],3); disp[a+j]['m']=1; m+=1
    idxs=[j for j,d in enumerate(disp) if d.get('m')]
    j=0
    while j<len(disp):
        if disp[j].get('m'): j+=1; continue
        k=j
        while k<len(disp) and not disp[k].get('m'): k+=1
        lo=disp[j-1]['e'] if j>0 else 0.0; hi=disp[k]['s'] if k<len(disp) else dur-0.2
        n=k-j; st=(hi-lo)/n
        for q in range(j,k): disp[q]['s']=round(lo+st*(q-j),3); disp[q]['e']=round(lo+st*(q-j+1)-0.02,3)
        j=k
    bounds=[]
    for li in range(1,len(lines)):
        last=[d for d in disp if d['li']==li-1][-1]; first=[d for d in disp if d['li']==li][0]
        bounds.append(round((last['e']+first['s'])/2,3))
    miss=[d['t'] for d in disp if not d.get('m')]
    res[key]={'words':[{'t':d['t'],'s':d['s'],'e':d['e']} for d in disp],'dur':round(dur,3),'bounds':bounds,'src':f'scribe {m}/{len(disp)}'}
    print(key,res[key]['src'],'mis:',' '.join(miss)[:150])
json.dump(res,open('data/afl7_words.json','w'),ensure_ascii=False)
