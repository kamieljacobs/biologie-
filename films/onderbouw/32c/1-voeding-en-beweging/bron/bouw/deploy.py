# deploy.py <filmmap> <slug>: zet film + audio + bron in de worktree, werkt index.html bij (komt -> films, FILMKUNST)
import json, os, re, sys, shutil, glob
D=os.path.abspath(sys.argv[1]); slug=sys.argv[2]; WT='/home/claude/wt-32c'; HERE=os.path.dirname(os.path.abspath(__file__))
dst=f'{WT}/films/onderbouw/32c/{slug}'; os.makedirs(dst+'/audio',exist_ok=True)
shutil.copy(f'{D}/film/index.html',dst+'/index.html')
for f in glob.glob(f'{D}/film/audio/*.mp3'): shutil.copy(f,dst+'/audio/')
b=dst+'/bron'; 
for sub in ['src','bouw','stem/woordtijden','reviews']: os.makedirs(f'{b}/{sub}',exist_ok=True)
for f in ['script_v1.md','script_v2.md','docentdeel.md','begrippen.json','brief.md','index_entry.json','uitspraak.md','filmdata.json','tts_schatting','info.md','script.md','STATUS.md']:
    if os.path.exists(f'{D}/{f}'): shutil.copy(f'{D}/{f}',b)
for f in glob.glob(f'{D}/src/*'): shutil.copy(f,b+'/src/')
for f in ['head.html','lib.js','helpers.js','tail.html']: shutil.copy(f'{HERE}/../_base/{f}',b+'/src/')
shutil.copy(f'{HERE}/../_engine/player_block.html',b+'/src/'); shutil.copy(f'{WT}/personages/lib_cast.js',b+'/src/')
for f in glob.glob(f'{HERE}/*.py'): shutil.copy(f,b+'/bouw/')
for f in glob.glob(f'{D}/reviews/*'): shutil.copy(f,b+'/reviews/')
shutil.copy(f'{D}/segmenten.json',b+'/stem/segmenten_stem-invoer.json')
for f in ['generaties.json','offsets.json']:
    if os.path.exists(f'{D}/stem/{f}'): shutil.copy(f'{D}/stem/{f}',b+'/stem/')
for f in glob.glob(f'{D}/stem/woordtijden/*.json'): shutil.copy(f,b+'/stem/woordtijden/')
# tts/scribe id's (zonder tijdelijke urls)
for nm in ['tts_status.json','scribe_status.json']:
    p=f'{D}/stem/{nm}'
    if os.path.exists(p):
        st=json.load(open(p)); out={'flow':st.get('flow_id'),'items':[{'id':g.get('id'),'dur':g.get('duration_secs'),'prompt':(g.get('prompt') or '')[:60]} for g in st.get('generations',[])]}
        if 'transcripts' in st: out['transcripts']=[{'session':x.get('session_id'),'text':x.get('text','')[:60]} for x in st['transcripts']]
        json.dump(out,open(f"{b}/stem/{nm.replace('_status','')}",'w'),ensure_ascii=False,indent=0)
# index.html
E=json.load(open(f'{D}/index_entry.json')); e=E['entry']; p=f'{WT}/index.html'; s=open(p,encoding='utf-8').read()
k0=s.index(' "kerndoelen": {')
m=re.compile(r'\n   \{\n    "titel": "'+re.escape(E.get('komt_titel',e['titel']))+r'",\n    "vraag": "[^"]*",\n    "niveau": "32C"\n   \},?').search(s,k0)
if m: s=s[:m.start()]+s[m.end():]; print('komt weg'); s=re.sub(r'\},\n  \],\n  "label": "Onderbouw"','}\n  ],\n  "label": "Onderbouw"',s)
if e['href'] not in s:
    fi=s.index('  "films": [',k0); fe=s.index('\n  ],',fi); lst=s[fi:fe]; ins=None
    for mm in re.finditer(r'   \{\n    "href": "films/onderbouw/(\d+[a-z])/(\d+)[a-z]?-[^"]*",.*?\n   \}',lst,re.S):
        if mm.group(1) in ('32a','32b') or (mm.group(1)=='32c' and int(mm.group(2))<int(slug.split('-')[0])): ins=fi+mm.end()
    if ins is None: ins=fe
    s=s[:ins]+',\n   '+json.dumps(e,ensure_ascii=False,indent=1).replace('\n','\n   ')+s[ins:]; print('films: ingevoegd')
key=E['filmkunst_sleutel']
if f"'{key}':" not in s:
    a=s.index("'3-vertering':`"); a=s.index('`,\n',a)+3; s=s[:a]+f"'{key}':`{E['filmkunst']}`,\n"+s[a:]; print('FILMKUNST')
open(p,'w',encoding='utf-8').write(s)
