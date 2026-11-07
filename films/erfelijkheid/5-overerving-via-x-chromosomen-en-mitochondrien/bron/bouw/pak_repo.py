import json, os, shutil, glob, subprocess
H='/home/claude/hw/erf5'; W=H+'/w'; E=H+'/eng'; R='/home/claude/biologie-'
dst=f'{R}/films/erfelijkheid'; slug='5-overerving-via-x-chromosomen-en-mitochondrien'; fb=f'{dst}/{slug}'; bron=f'{fb}/bron'
oud=f'{bron}/oud'; os.makedirs(oud, exist_ok=True)
if not os.path.exists(f'{oud}/{slug}-v1.html'):
    shutil.copy(f'{dst}/{slug}.html', f'{oud}/{slug}-v1.html'); shutil.copy(f'{bron}/script.md', f'{oud}/script-v1.md'); shutil.copy(f'{bron}/info.md', f'{oud}/info-v1.md')
THEMA="<script>(function(){try{var t=localStorage.getItem('thema');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();</script>"
h=open(f'{W}/film/{slug}.html',encoding='utf-8').read()
if "getItem('thema')" not in h:
    assert '<meta charset="utf-8">' in h; h=h.replace('<meta charset="utf-8">','<meta charset="utf-8">\n'+THEMA,1)
open(f'{dst}/{slug}.html','w',encoding='utf-8').write(h)
os.makedirs(f'{fb}/audio',exist_ok=True)
for f in glob.glob(f'{W}/audio/s*.mp3'): shutil.copy(f,f'{fb}/audio/')
F=json.load(open(f'{W}/film.json',encoding='utf-8')); segs=json.load(open(f'{W}/segments.json',encoding='utf-8'))
ses=json.load(open(f'{W}/stem/sessions.json'))
gen={'flow':ses['flow'],'stem':'Roos 7qdUFMklKPaaAVMsBTBt','model':'eleven_v4','takes':{},'geblokkeerd':{}}
tot=0
for k,v in ses.items():
    if k=='flow': continue
    if k.endswith('_geblokkeerd'): gen['geblokkeerd'][k]={'session_id':v[0],'generation_id':v[1],'credits':v[2],'noot':v[3] if len(v)>3 else ''}; tot+=v[2]; continue
    d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{W}/audio/{k}.mp3']).decode())
    gen['takes'][k]={'session_id':v[0],'generation_id':v[1],'credits':v[2],'dur':round(d,2)}; tot+=v[2]
gen['credits_totaal']=tot; gen['credits_takes']=sum(x['credits'] for x in gen['takes'].values())
os.makedirs(f'{W}/stem',exist_ok=True); json.dump(gen,open(f'{W}/stem/gen.json','w'),indent=1)
L=[f"# {F['title']} — gesproken tekst (versie {F['version']})",'',f"Stem Roos (7qdUFMklKPaaAVMsBTBt), ElevenLabs eleven_v4, één take per alinea, flow {ses['flow']}. Audio: `../audio/<id>.mp3` (loudnorm −16 LUFS / −1 dBTP); woordtijden: `stem/woordtijden/<id>.json` (silalign, lokaal). De stem-invoer staat erbij waar die afwijkt van de ondertitel (genotypen als 'iks grote A', Y als 'ei'). Oude versie: `oud/script-v1.md`.",'']
hfd=None
for s in segs:
    if s['chapter']!=hfd: hfd=s['chapter']; L+=[f'## {hfd}','']
    lv=' · vwo' if s.get('level')=='vwo' else ''
    if s['kind']=='speech':
        g=gen['takes'].get(s['id'],{}); L+=[f"**{s['id']}**{lv} · audio `{s['id']}.mp3` · {g.get('dur',0):.1f} s · generation `{g.get('generation_id','?')}`",'',s['display'],'']
        if s['voice']!=s['display']: L+=[f"_Stem-invoer:_ {s['voice']}",'']
    elif s['kind']=='question':
        q=F['questions'][s['id']]; L+=[f"**{s['id']}**{lv} · vraag: {q['q']}"]+[f"- {'abc'[i]}) {o}"+('  ✓' if i==q['correct'] else '') for i,o in enumerate(s['options'])]+[f"- uitleg: {q['explain']}",'']
    elif s['kind']=='title': L+=[f"**{s['id']}** · titelkaart: {s.get('text','')}",'']
    else: L+=[f"**{s['id']}** · eindkaart:"]+[f'- {x}' for x in s.get('lines',[])]+['']
open(f'{bron}/script.md','w',encoding='utf-8').write('\n'.join(L))
for f in ['film.json','film.py','sections.html','segments.json','uitspraak_film.json','script_opname.md','bouw.sh','make_segments.py']: shutil.copy(f'{W}/{f}',f'{bron}/{f}')
os.makedirs(f'{bron}/src',exist_ok=True); os.makedirs(f'{bron}/bouw',exist_ok=True)
for f in ['lib.js','lib_cast.js','lib_hormonen.js','lib_voeding.js','lib_bio.js','lib_micro_evo.js','player.js','page.html','fonts.css','scenes_kop.js','teken_chr1.js']: shutil.copy(f'{E}/{f}',f'{bron}/src/')
for f in ['teken_erf5.js','scenes_erf5.js','scenes.js']: shutil.copy(f'{W}/{f}',f'{bron}/src/')
for f in ['make_segments.py','build_data.py','build.py','silalign.py','stills.py','cuecheck.py','sheet.py','uitspraak_subs.json']: shutil.copy(f'{E}/{f}',f'{bron}/bouw/')
os.makedirs(f'{bron}/stem/woordtijden',exist_ok=True)
for f in ['gen.json','sessions.json']: shutil.copy(f'{W}/stem/{f}',f'{bron}/stem/{f}')
for f in glob.glob(f'{W}/words/s*.json'): shutil.copy(f,f'{bron}/stem/woordtijden/')
shutil.copy(f'{bron}/remake-2026-10/bronnen.md', f'{bron}/bronnen.md')
print('ok', len(h), 'credits', tot, 'takes', len(gen['takes']))
shutil.copy(__file__, f'{bron}/bouw/pak_repo.py')
