# haal_audio_scribe.py <filmmap> <flow> <credits>: audio via de bron-URL in stem/scribe_status.json (als tts_status ontbreekt) -> film/audio + stem/generaties.json + stem/tts.json
import json,re,subprocess,os,sys,difflib
D,flow,cred=sys.argv[1],sys.argv[2],float(sys.argv[3]); n=lambda s:re.sub(r'[^0-9a-zà-ÿ]','',s.lower())
segs={s['id']:s for s in json.load(open(f'{D}/segmenten.json')) if s['kind']=='speech'}
st=json.load(open(f'{D}/stem/scribe_status.json')); assert st['all_completed'] and not st['has_failures']
os.makedirs(f'{D}/raw',exist_ok=True); os.makedirs(f'{D}/film/audio',exist_ok=True); gen={}
for t in st['transcripts']:
    sid=max(segs,key=lambda k:difflib.SequenceMatcher(None,n(segs[k]['voice']),n(t['text'])).ratio())
    subprocess.run(['curl','-sS','-o',f'{D}/raw/{sid}.mp3',t['source']['url']],check=True)
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{D}/raw/{sid}.mp3','-af','loudnorm=I=-16:TP=-1','-ar','44100','-b:a','128k',f'{D}/film/audio/{sid}.mp3'],check=True)
    dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{D}/raw/{sid}.mp3']).decode())
    gid=re.search(r'content_generation/[^/]+/([^/]+)/content',t['source']['url']).group(1)
    gen[sid]={'id':gid,'dur':round(dur,2),'model':'eleven_v4','url':'(tijdelijk, vervallen)'}
json.dump(dict(sorted(gen.items())),open(f'{D}/stem/generaties.json','w'),indent=1)
json.dump({'flow':flow,'model':'eleven_v4','voice':'7qdUFMklKPaaAVMsBTBt (Roos)','scribe':'eleven_scribe_v1','tts_credits':cred},open(f'{D}/stem/tts.json','w'),indent=1)
print(len(gen),'takes,',round(sum(v['dur'] for v in gen.values())),'s; ontbreekt:',sorted(set(segs)-set(gen)))
