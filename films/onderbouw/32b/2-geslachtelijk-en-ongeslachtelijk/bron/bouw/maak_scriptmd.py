# maak_scriptmd.py <filmmap> <titel> <flow>: bron/script.md (tekst per take, stem-invoer waar afwijkend, filmtijd)
import json,sys
D,titel,flow=sys.argv[1],sys.argv[2],sys.argv[3]
segs=json.load(open(f'{D}/segmenten.json')); fd={s['id']:s for s in json.load(open(f'{D}/filmdata.json'))['segments']}
o=[f'# {titel} — script (zoals ingesproken)\n',f'Stem Roos (ElevenLabs `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea, 20 oktober 2026. Flow `{flow}`. Bron van de tekst: `script_v2.md`. `[uitdaging]` = blok dat in de stand Basis wegvalt. Filmtijd = stand Uitdaging, vragen aan, zonder hoofdstukkaarten.\n']
t=0; ch=None
for s in segs:
    if s['chapter']!=ch: ch=s['chapter']; o.append(f'\n## {ch}\n')
    f=fd[s['id']]
    if s['kind']=='speech':
        tag=' [uitdaging]' if s['level']=='vwo' else ''
        o.append(f"**{s['id']}**{tag} · `audio/{s['id']}.mp3` · {f['dur']:.1f} s · filmtijd {int(t//60)}:{t%60:04.1f}\n\n{s['display']}\n")
        if s['voice']!=s['display']: o.append(f"Stem-invoer: {s['voice']}\n")
        t+=f['dur']
    else:
        L='abc'; o.append(f"**{s['id']}** vraag: {s['q']} — "+' · '.join(f'({L[i]}) {x}' for i,x in enumerate(s['options']))+f" — goed: {L[s['correct']]}. {s['explain']}\n"); t+=8+6
open(f'{D}/script.md','w').write('\n'.join(o)); print('script.md', round(t),'s')
