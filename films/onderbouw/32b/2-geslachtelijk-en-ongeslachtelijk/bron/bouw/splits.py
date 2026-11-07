# splits.py <filmmap> <scribe_status.json>: woorden van de ene blinde Scribe-run per take terugzetten (tijden relatief) + vergelijking met stem-invoer
import json,sys,re,difflib,os,subprocess
D,F=sys.argv[1],sys.argv[2]; st=json.load(open(F)); tr=st['transcripts'][0]
ws=tr.get('words') or []
if len([w for w in ws if w.get('type','word')=='word'])<tr.get('word_count',0) or not ws:
    ws=json.loads(subprocess.check_output(['curl','-sS',tr['words_download_url']])); ws=ws['words'] if isinstance(ws,dict) else ws
ws=[w for w in ws if w.get('type','word')=='word']
off=json.load(open(f'{D}/stem/offsets.json')); segs={s['id']:s for s in json.load(open(f'{D}/segmenten.json')) if s['kind']=='speech'}
n=lambda s:re.sub(r'[^0-9a-zà-ÿ]','',s.lower()); os.makedirs(f'{D}/stem/woordtijden',exist_ok=True)
for sid,(a,b) in off.items():
    mine=[dict(w,start=round(w['start']-a,3),end=round(w['end']-a,3)) for w in ws if a-0.3<=w['start']<b+0.5]
    json.dump({'words':mine,'text':' '.join(w['text'] for w in mine)},open(f'{D}/stem/woordtijden/{sid}.json','w'),ensure_ascii=False)
    x=[n(v) for v in segs[sid]['voice'].split()]; y=[n(w['text']) for w in mine]
    diff=[(' '.join(segs[sid]['voice'].split()[i1:i2]),' '.join(w['text'] for w in mine[j1:j2])) for op,i1,i2,j1,j2 in difflib.SequenceMatcher(None,x,y,autojunk=False).get_opcodes() if op!='equal']
    print(sid,len(mine),len(segs[sid]['display'].split()),'OK' if not diff else diff)
