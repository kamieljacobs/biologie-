import json,sys,subprocess,re
n=lambda s:re.sub(r'\W','',s.lower())[:40]
segs=json.load(open('segments.json')); byv={n(s['voice']):s['id'] for s in segs if s['kind']=='speech'}
d=json.load(open(sys.argv[1])); out={}
for g in d['generations']:
    k=byv.get(n(g['prompt']));
    if not k: print('??',g['prompt'][:40]); continue
    out[k]={'id':g['id'],'dur':g['duration_secs'],'model':g.get('model_id')}
    subprocess.run(['curl','-sS','-o',f'raw/{k}.mp3',g['content_url']],check=True)
json.dump(out,open('generaties.json','w'),indent=1); print(len(out),'takes',round(sum(v['dur'] for v in out.values()),1),'s')
