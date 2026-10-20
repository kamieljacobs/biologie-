# split_scribe.py <filmmap> <scribe_status.json>: één transcript van alles.mp3 -> stem/woordtijden/sNN.json + blinde vergelijking
import json,re,sys,os,difflib,subprocess
D=sys.argv[1]; st=json.load(open(sys.argv[2])); off=json.load(open(f'{D}/stem/offsets.json'))
segs={s['id']:s for s in json.load(open(f'{D}/segmenten.json')) if s['kind']=='speech'}
tr=st['transcripts'][0]; ws=tr.get('words') or []
if len([w for w in ws if w.get('type','word')=='word'])<tr.get('word_count',0) or not ws:
    ws=json.loads(subprocess.check_output(['curl','-sS',tr['words_download_url']])); ws=ws['words'] if isinstance(ws,dict) else ws
ws=[w for w in ws if w.get('type','word')=='word']
n=lambda s:re.sub(r'[^0-9a-zà-ÿ]','',s.lower()); os.makedirs(f'{D}/stem/woordtijden',exist_ok=True)
for k,(a,b) in sorted(off.items()):
    mine=[dict(w,start=round(w['start']-a,3),end=round(w['end']-a,3)) for w in ws if a-0.3<=w['start']<b+0.3]
    json.dump({'words':mine,'text':' '.join(w['text'] for w in mine)},open(f'{D}/stem/woordtijden/{k}.json','w'),ensure_ascii=False)
    A=[n(x) for x in segs[k]['voice'].split()]; B=[n(w['text']) for w in mine]
    diff=[(' '.join(segs[k]['voice'].split()[i1:i2]),' '.join(w['text'] for w in mine[j1:j2])) for op,i1,i2,j1,j2 in difflib.SequenceMatcher(None,A,B,autojunk=False).get_opcodes() if op!='equal']
    print(k,len(mine),len(A),'OK' if not diff else diff)
