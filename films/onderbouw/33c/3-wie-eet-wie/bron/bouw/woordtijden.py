# woordtijden.py <filmmap>: stem/scribe_status.json -> stem/woordtijden/sNN.json + uitlijning op display-woorden + verschillenlijst
import json,re,sys,os,difflib,subprocess
D=sys.argv[1]
segs={s['id']:s for s in json.load(open(f'{D}/segmenten.json')) if s['kind']=='speech'}
st=json.load(open(f'{D}/stem/scribe_status.json')); assert st['all_completed'] and not st['has_failures']
n=lambda s:re.sub(r'[^0-9a-zà-ÿ]','',s.lower())
os.makedirs(f'{D}/stem/woordtijden',exist_ok=True)
def disp_tokens(s):
    m=[]
    for tok in s.split():
        if m and m[-1] in ("'s","’s"): m[-1]+=' '+tok
        else: m.append(tok)
    return m
rap=[]
for t in st['transcripts']:
    sid=max(segs,key=lambda k:difflib.SequenceMatcher(None,n(segs[k]['voice']),n(t['text'])).ratio())
    ws=t.get('words') or []
    if len([w for w in ws if w.get('type')=='word'])<t.get('word_count',0):
        ws=json.loads(subprocess.check_output(['curl','-sS',t['words_download_url']]))
        ws=ws['words'] if isinstance(ws,dict) else ws
    ws=[w for w in ws if w.get('type','word')=='word']
    json.dump({'words':ws,'text':t['text']},open(f'{D}/stem/woordtijden/{sid}.json','w'),ensure_ascii=False)
    # vergelijk met stem-invoer (blinde controle: transcript is los van de tekst)
    a=[n(x) for x in segs[sid]['voice'].split()]; b=[n(w['text']) for w in ws]
    diff=[(' '.join(segs[sid]['voice'].split()[i1:i2]),' '.join(w['text'] for w in ws[j1:j2])) for op,i1,i2,j1,j2 in difflib.SequenceMatcher(None,a,b,autojunk=False).get_opcodes() if op!='equal']
    rap.append((sid,len(ws),diff))
for sid,nw,diff in sorted(rap):
    print(sid,nw,'OK' if not diff else diff)
