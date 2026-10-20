"""fetch_flow.py <werkmap> <slug> <status.json> [...]  — haalt TTS-audio en Scribe-woorden uit opgeslagen creative_get_flow_run_status-resultaten (stem/nodes.json: sid -> [node, sessie])."""
import json,sys,subprocess,os
F,slug=sys.argv[1],sys.argv[2]; N=json.load(open(f'{F}/stem/nodes.json')); s2id={v[1]:k for k,v in N.items()}
U=json.load(open(f'{F}/stem/urls.json')) if os.path.exists(f'{F}/stem/urls.json') else {}
for p in sys.argv[3:]:
    d=json.load(open(p))
    for m in d.get('media',[]):
        sid=[v for k,v in s2id.items() if k in m['url']]
        if sid: U.setdefault(sid[0],{}).update(mp3=m['url'],gen=m['generation_id'])
    for t in d.get('transcripts',[]):
        sid=[v for k,v in s2id.items() if k in t['source']['url']]
        if sid:
            u=U.setdefault(sid[0],{}); u['words']=t['words_download_url']
            if 'mp3' not in u: u['mp3']=t['source']['url']; u['gen']=t['source']['url'].split('/content.mp3')[0].split('/')[-1]
json.dump(U,open(f'{F}/stem/urls.json','w'),indent=0)
missing=[k for k in N if not (k in U and 'mp3' in U[k] and 'words' in U[k])]
if missing: print('ontbreekt nog:',missing); sys.exit(1)
segs={s['id']:s for s in json.load(open(f'{F}/segments.json')) if s['kind']=='speech'}
tr=[];gen={}; os.makedirs(f'{F}/raw',exist_ok=True); os.makedirs(f'{F}/film/{slug}/audio',exist_ok=True)
for sid,v in sorted(U.items()):
    subprocess.run(['curl','-sS','-o',f'{F}/raw/{sid}.mp3',v['mp3']],check=True)
    w=json.loads(subprocess.check_output(['curl','-sS',v['words']])); words=w['words'] if isinstance(w,dict) else w
    tr.append({'text':segs[sid]['voice'],'words':words,'generation_id':v['gen']})
    out=f'{F}/film/{slug}/audio/{sid}.mp3'
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{F}/raw/{sid}.mp3','-af','loudnorm=I=-15:TP=-1.5','-ac','1','-ar','44100','-b:a','96k',out],check=True)
    dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',out])); gen[sid]={'dur':round(dur,2),'generation_id':v['gen']}
json.dump({'all_completed':True,'has_failures':False,'transcripts':tr},open(f'{F}/stem/status_timing.json','w'),ensure_ascii=False)
json.dump(gen,open(f'{F}/stem/gen.json','w'),indent=1); json.dump({'nodes':{k:v[0] for k,v in N.items()}},open(f'{F}/stem/takes.json','w'))
print('ok',round(sum(g['dur'] for g in gen.values()),1),'s')
