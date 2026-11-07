import json,sys,subprocess,re
sp_file,tr_file=sys.argv[1],sys.argv[2]
n=lambda s:re.sub(r'\W','',s.lower())[:30]
segs=json.load(open('segments.json')); sp={s['id']:s for s in segs if s['kind']=='speech'}
byv={n(s['voice']):s['id'] for s in sp.values()}
d=json.load(open(sp_file)); print('speech all',d['all_completed'],'fail',d['has_failures'])
out={}
for g in d['generations']:
    k=byv.get(n(g['prompt']))
    if not k: print('??',repr(g['prompt'][:50])); continue
    out[k]={'id':g['id'],'dur':g['duration_secs'],'url':g['content_url']}
    subprocess.run(['curl','-sS','-o',f'raw/{k}.mp3',g['content_url']],check=True)
json.dump(out,open('gen.json','w'),indent=1); print(len(out),'takes, tot',round(sum(v['dur'] for v in out.values())))
t=json.load(open(tr_file)); print('trans all',t['all_completed'],'fail',t['has_failures'])
bys={v:k for k,v in json.load(open('trans.json')).items()}
for tr in t['transcripts']:
    sid=bys.get(tr.get('session_id')) or byv.get(n(tr.get('text','')))
    if not sid: print('?? trans',tr.get('text','')[:40]); continue
    subprocess.run(['curl','-sS','-o',f'words/{sid}.json',tr['words_download_url']],check=True)
    w=json.load(open(f'words/{sid}.json')); ws=[x for x in (w['words'] if isinstance(w,dict) else w) if x.get('type','word')=='word']
    json.dump({'words':ws},open(f'words/{sid}.json','w'))
    disp=sp[sid]['display'].split(); m=[]
    for tok in disp:
        if m and m[-1] in ("'s","’s"): m[-1]+=' '+tok
        else: m.append(tok)
    print(sid,len(ws),len(m),'OK' if len(ws)==len(m) else 'MISMATCH '+' '.join(x['text'] for x in ws)[:300])
