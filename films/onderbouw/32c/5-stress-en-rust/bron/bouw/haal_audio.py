# haal_audio.py <filmmap>: stem/tts_status.json -> raw/*.mp3 -> audio/*.mp3 (-16 LUFS, 128k) + stem/generaties.json
import json,re,subprocess,os,sys
D=sys.argv[1]; n=lambda s:re.sub(r'\W','',s.lower())
segs=[s for s in json.load(open(f'{D}/segmenten.json')) if s['kind']=='speech']
byv={n(s['voice']):s['id'] for s in segs}
st=json.load(open(f'{D}/stem/tts_status.json')); assert st['all_completed'] and not st['has_failures']
os.makedirs(f'{D}/raw',exist_ok=True); os.makedirs(f'{D}/film/audio',exist_ok=True)
gen={}
for g in st['generations']:
    pk=n(g['prompt']); c=[v for kk,v in byv.items() if kk.startswith(pk) or pk.startswith(kk)]
    k=c[0] if len(c)==1 else None
    if not k: print('??',g['prompt'][:40]); continue
    subprocess.run(['curl','-sS','-o',f'{D}/raw/{k}.mp3',g['content_url']],check=True)
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{D}/raw/{k}.mp3','-af','loudnorm=I=-16:TP=-1','-ar','44100','-b:a','128k',f'{D}/film/audio/{k}.mp3'],check=True)
    gen[k]={'id':g['id'],'dur':g['duration_secs'],'model':g.get('model_id'),'url':'(tijdelijk, vervallen)'}
json.dump(dict(sorted(gen.items())),open(f'{D}/stem/generaties.json','w'),indent=1)
print(len(gen),'takes,',round(sum(v['dur'] for v in gen.values())),'s; ontbreekt:',sorted({s['id'] for s in segs}-set(gen)))
