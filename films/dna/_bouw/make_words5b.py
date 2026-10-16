"""Woordtijden en regelgrenzen voor de aanvulling van 16 okt 2026 (n24b, n24c): Scribe-woorden (afl5/aanvulling_16okt/<id>_words.json) 1-op-1 op de getoonde tekst
(zelfde aantal woorden; stem-invoer 'deeënaa-schade' wordt 'DNA-schade'), duur uit data/afl5_audio/<id>.mp3. Schrijft in data/afl5_words.json."""
import json,subprocess
S=json.load(open('data/afl5_script.json'))['SCRIPT']; W=json.load(open('data/afl5_words.json'))
for s in S:
    if s.get('id') not in ('n24b','n24c'): continue
    k=s['id']; d=json.load(open(f'afl5/aanvulling_16okt/{k}_words.json')); tw=[x for x in (d['words'] if isinstance(d,dict) else d) if x.get('type','word')=='word']
    disp=[{'t':w,'li':li} for li,l in enumerate(s['lines']) for w in l.split()]
    assert len(disp)==len(tw),(k,len(disp),len(tw))
    for a,b in zip(disp,tw): a['s']=round(b['start'],3); a['e']=round(b['end'],3)
    dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'data/afl5_audio/{k}.mp3']).strip())
    bounds=[round(([x for x in disp if x['li']==li-1][-1]['e']+[x for x in disp if x['li']==li][0]['s'])/2,3) for li in range(1,len(s['lines']))]
    W[k]={'words':[{'t':x['t'],'s':x['s'],'e':x['e']} for x in disp],'dur':round(dur,3),'bounds':bounds,'src':f'scribe {len(tw)}/{len(disp)}'}
    print(k,W[k]['dur'],bounds)
json.dump(W,open('data/afl5_words.json','w'),ensure_ascii=False)
