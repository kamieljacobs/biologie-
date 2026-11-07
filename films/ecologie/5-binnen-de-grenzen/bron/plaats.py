"""Zet Binnen de grenzen uit de werkmap in de site-repo, met bronmap (gebaseerd op engine/pak.py, doel films/ecologie/)."""
import json, os, shutil, glob
W = '/home/claude/hw/mm'; E = '/home/claude/hw/engine'; REPO = '/home/claude/biologie-'
film = json.load(open(f'{W}/film.json', encoding='utf-8')); slug = film['slug']
segs = json.load(open(f'{W}/segments.json', encoding='utf-8'))
gen = json.load(open(f'{W}/stem/gen.json')); ses = json.load(open(f'{W}/stem/sessions.json'))
dst = f'{REPO}/films/ecologie'; fb = f'{dst}/{slug}'; bron = f'{fb}/bron'
os.makedirs(f'{fb}/audio', exist_ok=True); os.makedirs(bron, exist_ok=True)
shutil.copy(f'{W}/film/{slug}.html', f'{dst}/{slug}.html')
for f in glob.glob(f'{W}/audio/s*.mp3'): shutil.copy(f, f'{fb}/audio/')
L = [f"# {film['title']} — gesproken tekst ({film['version']})", '', f"Stem Roos (7qdUFMklKPaaAVMsBTBt), ElevenLabs eleven_v4, één take per alinea, flow {ses.get('flow')}. Audio: `../audio/<id>.mp3` (loudnorm −16 LUFS); woordtijden: `stem/woordtijden/<id>.json` (silalign). Stem-invoer staat erbij waar die afwijkt van de ondertitel.", '']
hfd = None; tijd = 0.0
for s in segs:
    if s['chapter'] != hfd: hfd = s['chapter']; L += [f'## {hfd}', '']
    if s['kind'] == 'speech':
        g = gen.get(s['id'], {}); L += [f"**{s['id']}** · audio `{s['id']}.mp3` · {g.get('dur', 0):.1f} s · generation `{g.get('generation_id', '?')}`", '', s['display'], '']
        if s['voice'] != s['display']: L += [f"_Stem-invoer:_ {s['voice']}", '']
    elif s['kind'] == 'question':
        q = film['questions'][s['id']]; L += [f"**{s['id']}** · vraag: {q['q']}"] + [f"- {'abcd'[i]}) {o}" + ('  ✓' if i == q['correct'] else '') for i, o in enumerate(s['options'])] + ['']
    elif s['kind'] == 'title': L += [f"**{s['id']}** · titelkaart: {s['text']}", '']
    else: L += [f"**{s['id']}** · eindkaart:"] + [f'- {x}' for x in s['lines']] + ['']
open(f'{bron}/script.md', 'w', encoding='utf-8').write('\n'.join(L))
for f in ['film.json', 'film.py', 'sections.html', 'segments.json', 'uitspraak_film.json', 'info.md', 'uitspraak.md', 'brief.md', 'script_v1.md', 'script_v2.md', 'bouw.sh', 'plaats.py']:
    if os.path.exists(f'{W}/{f}'): shutil.copy(f'{W}/{f}', f'{bron}/{f}')
for sub, files in [('src', [f'{E}/{x}' for x in ['lib.js', 'lib_cast.js', 'lib_hormonen.js', 'lib_voeding.js', 'player.js', 'page.html', 'fonts.css', 'brein.js', 'teken.js', 'extra.js', 'scenes.js']] + [f'{W}/teken_basis.js', f'{W}/teken_mm.js', f'{W}/scenes_mm.js', f'{W}/scenes.js']),
                   ('bouw', [f'{E}/{x}' for x in ['make_segments.py', 'build_data.py', 'build.py', 'silalign.py', 'stills.py', 'fakewords.py', 'cuecheck.py', 'sheet.py', 'uitspraak_subs.json']]),
                   ('reviews', glob.glob(f'{W}/review_*.md'))]:
    os.makedirs(f'{bron}/{sub}', exist_ok=True)
    for f in files:
        if os.path.exists(f): shutil.copy(f, f'{bron}/{sub}/' + ('scenes_engine_kop.js' if f == f'{E}/scenes.js' else os.path.basename(f)))
os.makedirs(f'{bron}/stem/woordtijden', exist_ok=True)
for f in ['gen.json', 'sessions.json']: shutil.copy(f'{W}/stem/{f}', f'{bron}/stem/{f}')
for f in glob.glob(f'{W}/words/s*.json'): shutil.copy(f, f'{bron}/stem/woordtijden/')
print(slug, 'geplaatst')
