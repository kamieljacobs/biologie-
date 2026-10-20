# Zet film + bronmap klaar in de repo: python3 maakbron.py <repo-doelmap>  (bijv. /home/claude/biologie-/films/onderbouw/32a/4-ademhaling-en-bloedsomloop)
import json, os, shutil, sys, glob, re
dst=sys.argv[1]; B=dst+'/bron'
os.makedirs(dst+'/audio',exist_ok=True)
for d in ['bron/stem/woordtijden','bron/src','bron/bouw','bron/reviews']: os.makedirs(dst+'/'+d,exist_ok=True)
shutil.copy('film/index.html',dst+'/index.html')
for f in glob.glob('audio/*.mp3'): shutil.copy(f,dst+'/audio/')
for f in glob.glob('words/*.json'): shutil.copy(f,B+'/stem/woordtijden/')
shutil.copy('segments.json',B+'/stem/segmenten_stem-invoer.json'); shutil.copy('generaties.json',B+'/stem/generaties.json')
if os.path.exists('tts_sessions.json'): shutil.copy('tts_sessions.json',B+'/stem/tts_sessies.json')
shutil.copy('filmdata.json',B+'/filmdata.json')
for f in ['script_v1.md','script_v2.md','brief.md','draaiboek.md','uitspraak.md','docentdeel.md','begrippen.json','index_entry.json','tts_schatting']:
    if os.path.exists(f): shutil.copy(f,B+'/'+f)
for f in glob.glob('reviews/*.md'): shutil.copy(f,B+'/reviews/')
for f in glob.glob('src/*'):
    if not f.endswith('/scenes.js'): shutil.copy(f,B+'/src/')
for f in ['check.html','docent.html']: shutil.copy(f,B+'/src/'+f)
for f in glob.glob('*.py')+['film.json']: shutil.copy(f,B+'/bouw/')
# script.md: gesproken tekst per segment met start in de tijdlijn (Uitdaging, Vragen aan) en audiobestand
d=json.load(open('filmdata.json')); segs=json.load(open('segments.json')); sv={s['id']:s for s in segs}
cfg=json.load(open('film.json'))
out=[f"# {cfg['title']} — gesproken tekst\n","Per segment de ondertitel (`display`) en, waar anders, de stem-invoer (`voice`). Tijden: start in de tijdlijn (stand Uitdaging, Vragen aan, hoofdstukkaart 1,3 s, vraag 14 s). Stem Roos, eleven_v4, één take per segment.\n"]
t=0; ch=None
for s in d['segments']:
    if s['chapter']!=ch:
        ch=s['chapter']; out.append(f"\n## {ch}\n")
        if ch not in ('Cold open','Titel','Eindkaart'): t+=1.3
    if s['kind']=='speech':
        v=sv[s['id']]; lvl=' · uitdaging' if s['level']=='vwo' else ''
        out.append(f"**{s['id']}**{lvl} · start {int(t//60)}:{t%60:04.1f} · {s['dur']} s · `audio/{s['id']}.mp3`\n\n{v['display']}\n")
        if v['voice']!=v['display']: out.append(f"> stem-invoer: {v['voice']}\n")
        t+=s['dur']
    else:
        opts=' · '.join(f"({chr(97+i)}) {o}" for i,o in enumerate(s['options']))
        out.append(f"**{s['id']}** (vraag) · start {int(t//60)}:{t%60:04.1f} · {s['q']} {opts} — goed: {chr(97+s['correct'])}\n"); t+=14
open(B+'/script.md','w').write('\n'.join(out)); print('bron klaar, script.md', round(t),'s')
