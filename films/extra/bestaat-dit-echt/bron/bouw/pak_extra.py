"""Zet een gebouwde film uit de werkmap in de site-repo, met bronmap.
Gebruik: python3 pak.py <werkmap> <gebied-anker>   (bv. n1 neurowetenschappen)
Schrijft films/vervolg/<slug>.html, <slug>/audio/*.mp3 en <slug>/bron/ (script.md gegenereerd, plus src/, bouw/, stem/, reviews/)."""
import json, os, shutil, sys, glob
W = os.path.abspath(sys.argv[1]); anker = sys.argv[2]; E = os.path.dirname(os.path.abspath(__file__))
REPO = '/tmp/claude-0/-home-claude/766725f8-2651-53ab-bc18-c6f436cccb00/scratchpad/repo'
film = json.load(open(os.path.join(W, 'film.json'), encoding='utf-8')); slug = film['slug']
segs = json.load(open(os.path.join(W, 'segments.json'), encoding='utf-8'))
gen = json.load(open(os.path.join(W, 'stem', 'gen.json'))); ses = json.load(open(os.path.join(W, 'stem', 'sessions.json')))
dst = os.path.join(REPO, 'films', 'extra'); fb = os.path.join(dst, slug); bron = os.path.join(fb, 'bron')
os.makedirs(os.path.join(fb, 'audio'), exist_ok=True); os.makedirs(bron, exist_ok=True)
# html met terugknop naar het gebied op Wat word jij?
h = open(os.path.join(W, 'film', slug + '.html'), encoding='utf-8').read()

open(os.path.join(dst, slug + '.html'), 'w', encoding='utf-8').write(h)
for f in glob.glob(os.path.join(W, 'audio', 's*.mp3')): shutil.copy(f, os.path.join(fb, 'audio', os.path.basename(f)))
# script.md
L = [f"# {film['title']} — gesproken tekst ({film['version']})", '', f"Stem Roos (7qdUFMklKPaaAVMsBTBt), ElevenLabs eleven_v4, één take per alinea, flow {ses.get('flow')}. Audio: `../audio/<id>.mp3`; woordtijden: `stem/woordtijden/<id>.json` (silalign). Stem-invoer staat erbij waar die afwijkt van de ondertitel.", '']
hfd = None
for s in segs:
    if s['chapter'] != hfd: hfd = s['chapter']; L += [f'## {hfd}', '']
    if s['kind'] == 'speech':
        g = gen.get(s['id'], {}); L += [f"**{s['id']}** · audio `{s['id']}.mp3` · {g.get('dur', 0):.1f} s · generation `{g.get('generation_id', '?')}`", '', s['display'], '']
        if s['voice'] != s['display']: L += [f"_Stem-invoer:_ {s['voice']}", '']
    elif s['kind'] == 'question':
        q = film['questions'][s['id']]; L += [f"**{s['id']}** · vraag: {q['q']}"] + [f"- {'abcd'[i]}) {o}" + ('  ✓' if i == q['correct'] else '') for i, o in enumerate(s['options'])] + ['']
    elif s['kind'] == 'title': L += [f"**{s['id']}** · titelkaart: {s['text']}", '']
    else: L += [f"**{s['id']}** · eindkaart:"] + [f'- {x}' for x in s['lines']] + ['']
open(os.path.join(bron, 'script.md'), 'w', encoding='utf-8').write('\n'.join(L))
# bronbestanden
for f in ['film.json', 'film.py', 'sections.html', 'segments.json', 'uitspraak_film.json', 'info.md', 'uitspraak.md', 'brief.md'] + [os.path.basename(x) for x in glob.glob(os.path.join(W, 'script_v*.md'))]:
    if os.path.exists(os.path.join(W, f)): shutil.copy(os.path.join(W, f), os.path.join(bron, f))
for sub, files in [('src', [os.path.join(E, x) for x in ['lib.js', 'lib_cast.js', 'lib_hormonen.js', 'lib_voeding.js', 'player.js', 'page.html', 'fonts.css', 'brein.js', 'teken.js', 'extra.js']] + glob.glob(os.path.join(W, 'teken_*.js')) + glob.glob(os.path.join(W, 'scenes_*.js')) + [os.path.join(W, 'scenes.js')]),
                   ('bouw', [os.path.join(E, x) for x in ['make_segments.py', 'build_data.py', 'build.py', 'silalign.py', 'stills.py', 'fakewords.py', 'pak.py', 'cuecheck.py', 'sheet.py', 'uitspraak_subs.json']]),
                   ('reviews', glob.glob(os.path.join(W, 'review_*.md')))]:
    os.makedirs(os.path.join(bron, sub), exist_ok=True)
    for f in files:
        if os.path.exists(f) and not os.path.basename(f).startswith('scenes_test'): shutil.copy(f, os.path.join(bron, sub, os.path.basename(f)))
os.makedirs(os.path.join(bron, 'stem', 'woordtijden'), exist_ok=True)
for f in ['gen.json', 'sessions.json']: shutil.copy(os.path.join(W, 'stem', f), os.path.join(bron, 'stem', f))
for f in glob.glob(os.path.join(W, 'words', 's*.json')): shutil.copy(f, os.path.join(bron, 'stem', 'woordtijden', os.path.basename(f)))
dur = sum(json.load(open(f)).get('words', [{}])[-1].get('end', 0) for f in glob.glob(os.path.join(W, 'words', 's*.json')))
print(slug, 'klaar; spraak %.0f s' % dur)
