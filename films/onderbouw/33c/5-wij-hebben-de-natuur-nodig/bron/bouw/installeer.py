# installeer.py <filmmap> <repo-doelmap>: film + audio + volledige bron/ naar de repo; maakt script.md met filmtijden
import json, os, shutil, sys, re
D, T = sys.argv[1], sys.argv[2]
R = '/home/claude/wt-33c'
os.makedirs(f'{T}/audio', exist_ok=True); B = f'{T}/bron'
for sub in ['src', 'bouw', 'stem/woordtijden', 'reviews']: os.makedirs(f'{B}/{sub}', exist_ok=True)
shutil.copy(f'{D}/film/index.html', f'{T}/index.html')
for f in os.listdir(f'{D}/film/audio'): shutil.copy(f'{D}/film/audio/{f}', f'{T}/audio/{f}')
for f in os.listdir(f'{D}/src'): shutil.copy(f'{D}/src/{f}', f'{B}/src/{f}')
base = os.path.dirname(os.path.abspath(__file__)) + '/..'
for f in ['head.html', 'lib.js', 'helpers.js', 'tail.html']: shutil.copy(f'{base}/_base/{f}', f'{B}/src/{f}')
shutil.copy(f'{base}/_engine/player_block.html', f'{B}/src/player_block.html')
shutil.copy(f'{R}/personages/lib_cast.js', f'{B}/src/lib_cast.js')
for f in os.listdir(f'{base}/bouw'):
    if f.endswith('.py'): shutil.copy(f'{base}/bouw/{f}', f'{B}/bouw/{f}')
for f in ['vragen.json', 'uitspraak_film.json']: shutil.copy(f'{D}/{f}', f'{B}/src/{f}')
for f in ['script_v1.md', 'script_v2.md', 'docentdeel.md', 'begrippen.json', 'filmdata.json', 'brief.md', 'uitspraak.md', 'index_entry.json', 'tts_schatting']:
    if os.path.exists(f'{D}/{f}'): shutil.copy(f'{D}/{f}', f'{B}/{f}')
for f in os.listdir(f'{D}/reviews'): shutil.copy(f'{D}/reviews/{f}', f'{B}/reviews/{f}')
shutil.copy(f'{D}/segmenten.json', f'{B}/stem/segmenten_stem-invoer.json')
for f in os.listdir(f'{D}/stem/woordtijden'): shutil.copy(f'{D}/stem/woordtijden/{f}', f'{B}/stem/woordtijden/{f}')
for f in ['generaties.json', 'tts.json']:
    if os.path.exists(f'{D}/stem/{f}'): shutil.copy(f'{D}/stem/{f}', f'{B}/stem/{f}')
# script.md met filmtijden (stand Uitdaging, vragen aan: kaart 1,3 s, vraag 14 s)
fd = json.load(open(f'{D}/filmdata.json')); segs = {s['id']: s for s in json.load(open(f'{D}/segmenten.json'))}
cfg = json.load(open(f'{D}/src/config.json'))
t = 0; prev = None; out = [f"# {cfg['titel']} — gesproken tekst per take\n", 'Tijden = filmtijd in de stand Uitdaging met Vragen aan (hoofdstukkaart 1,3 s, vraag 14 s). `voice` = letterlijke stem-invoer als die afwijkt.\n']
for s in fd['segments']:
    if s['chapter'] != prev and s['chapter'] not in ('Cold open', 'Titel', 'Eindkaart'): t += 1.3
    if s['chapter'] != prev: out.append(f"\n## {s['chapter']}\n"); prev = s['chapter']
    m, sec = divmod(t, 60)
    if s['kind'] == 'speech':
        g = segs[s['id']]; lvl = ' · uitdaging' if s['level'] == 'vwo' else ''
        out.append(f"**{s['id']}** · {int(m)}:{sec:04.1f} · `audio/{s['id']}.mp3` · {s['dur']:.1f} s{lvl}\n\n{g['display']}\n")
        if g['voice'] != g['display']: out.append(f"\nvoice: {g['voice']}\n")
        t += s['dur']
    else:
        out.append(f"**{s['id']}** · {int(m)}:{sec:04.1f} · vraag: {s['q']} — " + ' · '.join(f"({'abc'[i]}) {o}" for i, o in enumerate(s['options'])) + f" — goed: {'abc'[s['correct']]}\n")
        t += 14
open(f'{B}/script.md', 'w', encoding='utf-8').write('\n'.join(out))
print('geïnstalleerd in', T, '· speeltijd ±', f'{int(t//60)}:{int(t%60):02d}')
