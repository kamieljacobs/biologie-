# bronmd.py <filmmap>: schrijft script.md (tekst per take met filmtijd) en regels.md (regelnummers in film/index.html)
import json, re, sys, os
D=sys.argv[1]; fd=json.load(open(f'{D}/filmdata.json')); cfg=json.load(open(f'{D}/src/config.json')); segs={s['id']:s for s in json.load(open(f'{D}/segmenten.json'))}
CARD=1.3; QD=8.0; t=0; ch=None; out=[f"# {cfg['titel']} — gesproken tekst per take\n","Filmtijd = stand Uitdaging, Vragen aan, zonder wachten op een antwoord (hoofdstukkaart ± 1,3 s, vraag ± 8 s). Stem-invoer staat in `stem/segmenten_stem-invoer.json` (`voice`); alleen waar die afwijkt staat hij hieronder.\n"]
for s in fd['segments']:
    if s['chapter']!=ch:
        ch=s['chapter']; out.append(f"\n## {ch}\n")
        if ch not in ('Cold open','Titel','Eindkaart'): t+=CARD
    if s['kind']=='speech':
        txt=' '.join(w['t'] for w in s['words']); v=segs[s['id']]['voice']; lvl=' · uitdaging' if s['level']=='vwo' else ''
        out.append(f"**{s['id']}** ({int(t//60)}:{t%60:04.1f}, {s['dur']:.1f} s, `audio/{s['id']}.mp3`{lvl})  \n{txt}\n" + (f"\n> stem-invoer: {v}\n" if v!=txt else ''))
        t+=s['dur']
    else:
        out.append(f"**{s['id']}** vraag ({int(t//60)}:{t%60:04.1f}): {s['q']} — " + ' · '.join(('**'+o+'**' if i==s['correct'] else o) for i,o in enumerate(s['options']))+"\n"); t+=QD
out.append(f"\nTotaal ± {int(t//60)}:{t%60:02.0f} (zonder wachttijd bij de vragen).\n")
open(f'{D}/script.md','w').write('\n'.join(out))
L=open(f'{D}/film/index.html',encoding='utf-8').read().split('\n'); r=[]
def find(pat):
    for i,l in enumerate(L,1):
        if re.search(pat,l): return i
for nm,pat in [('checkvragen','<h2>Checkvragen'),('docentdeel','<h2>Voor de docent'),('FILMDATA','window.FILMDATA='),('lib_32c (gedeelde 32C-tekeningen)','Kerndoel 32C \\(gezond leven\\) — gedeelde'),('scènes van deze film','^// ===== 32C film'),('const SCENES','^const SCENES=\\{'),('GLOSSARY','const GLOSSARY=\\['),('drawChapterCard','function drawChapterCard')]:
    r.append(f'- {nm}: regel {find(pat)}')
r.append('- scènefuncties: '+', '.join(f"`{m.group(1)}` {i}" for i,l in enumerate(L,1) for m in [re.match(r'^(s\d\d)\(ctx,t,q\)',l)] if m))
open(f'{D}/regels.md','w').write('\n'.join(r)+'\n'); print(open(f'{D}/regels.md').read()); print(out[-1])
