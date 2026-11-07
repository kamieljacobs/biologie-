import json, os, shutil, glob
W='/home/claude/hw/erf6'; E=W+'/eng'; R='/home/claude/biologie-'
dst=f'{R}/films/erfelijkheid'; slug='6-stambomen-en-kansrekenen'; fb=f'{dst}/{slug}'; bron=f'{fb}/bron'
oud=f'{bron}/oud'; os.makedirs(oud, exist_ok=True)
if not os.path.exists(f'{oud}/{slug}-v1.html'):
    shutil.copy(f'{dst}/{slug}.html', f'{oud}/{slug}-v1.html'); shutil.copy(f'{bron}/script.md', f'{oud}/script-v1.md'); shutil.copy(f'{bron}/info.md', f'{oud}/info-v1.md')
THEMA="<script>(function(){try{var t=localStorage.getItem('thema');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();</script>"
h=open(f'{W}/film/{slug}.html',encoding='utf-8').read()
if "getItem('thema')" not in h: h=h.replace('<meta charset="utf-8">','<meta charset="utf-8">\n'+THEMA,1)
open(f'{dst}/{slug}.html','w',encoding='utf-8').write(h)
os.makedirs(f'{fb}/audio',exist_ok=True)
for f in glob.glob(f'{W}/audio/s*.mp3'): shutil.copy(f,f'{fb}/audio/')
F=json.load(open(f'{W}/film.json',encoding='utf-8')); segs=json.load(open(f'{W}/segments.json',encoding='utf-8'))
gen=json.load(open(f'{W}/stem/gen.json')); ses=json.load(open(f'{W}/stem/sessions.json'))
L=[f"# {F['title']} {F['sub']} — gesproken tekst (versie {F['version']})",'',f"Stem Roos (7qdUFMklKPaaAVMsBTBt), ElevenLabs eleven_v4, één take per alinea, flow {ses['flow']}. Audio: `../audio/<id>.mp3` (loudnorm −16 LUFS / −1 dBTP); woordtijden: `stem/woordtijden/<id>.json` (silalign op de stem-invoer, lokaal). Stem-invoer staat erbij waar die afwijkt van de ondertitel. Oude versie: `oud/script-v1.md`. Geraamte en wijzigingen: `remake-2026-10/script_v2.md`.",'']
hfd=None
for s in segs:
    if s['chapter']!=hfd: hfd=s['chapter']; L+=[f'## {hfd}','']
    if s['kind']=='speech':
        g=gen.get(s['id'],{}); L+=[f"**{s['id']}** · audio `{s['id']}.mp3` · {g.get('dur',0):.1f} s · generation `{g.get('generation_id','?')}`",'',s['display'],'']
        if s['voice']!=s['display']: L+=[f"_Stem-invoer:_ {s['voice']}",'']
    elif s['kind']=='question':
        q=F['questions'][s['id']]; L+=[f"**{s['id']}** · vraag: {q['q']}"]+[f"- {'abc'[i]}) {o}"+('  ✓' if i==q['correct'] else '') for i,o in enumerate(s['options'])]+['']
    elif s['kind']=='title': L+=[f"**{s['id']}** · titelkaart: {s['text']}",'']
    else: L+=[f"**{s['id']}** · eindkaart:"]+[f'- {x}' for x in s['lines']]+['']
open(f'{bron}/script.md','w',encoding='utf-8').write('\n'.join(L))
for f in ['film.json','film.py','sections.html','segments.json','uitspraak_film.json','script_opname.md','bouw.sh','pak_repo.py']: shutil.copy(f'{W}/{f}',f'{bron}/{f}')
os.makedirs(f'{bron}/src',exist_ok=True); os.makedirs(f'{bron}/bouw',exist_ok=True)
for f in ['lib.js','lib_cast.js','lib_hormonen.js','lib_voeding.js','lib_bio.js','lib_micro_evo.js','player.js','page.html','fonts.css','scenes_kop.js','teken_chr1.js']: shutil.copy(f'{E}/{f}',f'{bron}/src/')
for f in ['teken_erf6.js','scenes_erf6.js','scenes.js']: shutil.copy(f'{W}/{f}',f'{bron}/src/')
for f in ['make_segments.py','build_data.py','build.py','silalign.py','silalign_v.py','stills.py','cuecheck.py','sheet.py','uitspraak_subs.json']: shutil.copy(f'{E}/{f}',f'{bron}/bouw/')
os.makedirs(f'{bron}/stem/woordtijden',exist_ok=True)
for f in ['gen.json','sessions.json','voice.txt']: shutil.copy(f'{W}/stem/{f}',f'{bron}/stem/{f}')
for f in glob.glob(f'{W}/words/s*.json'): shutil.copy(f,f'{bron}/stem/woordtijden/')
print('ok', len(h))
