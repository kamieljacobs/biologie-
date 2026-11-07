"""vervang.py <film.html> <bronmap> [--filmdata <filmdata.json>] [--nieuw s05,s07]

Werkt een gebouwde voedingsfilm bij zonder hem helemaal opnieuw te bouwen (20 okt 2026).
De HTML op de site bevat na de bouw nog latere aanpassingen (speler, flipkaarten, oefenen, teller,
licentie, tabellen); bouwen met build.py zou die kwijtraken. Dit script vervangt alleen:
  - het scènesblok tussen /*@@SCENES*/ en /*@@/SCENES*/ door src/lib_cast.js + src/cast_hulp.js + src/scenes.js
  - met --filmdata: window.FILMDATA (uit build_data.py). Bestaande ?v=N bij audio blijft staan;
    segmenten in --nieuw krijgen ?v=N+1 (opnieuw ingesproken, anders speelt de browser de oude mp3 uit de cache).
Draai daarna de idempotente scripts uit CLAUDE.md (spelerfix, flipkaarten, oefenen, teller, licentie, tabel_mobiel).
"""
import sys, os, re, json
html, bron = sys.argv[1], sys.argv[2]; a = sys.argv[3:]
h = open(html, encoding='utf-8').read(); S = lambda f: open(os.path.join(bron, 'src', f), encoding='utf-8').read()
blok = '/*@@SCENES*/\n' + S('lib_cast.js') + '\n' + S('cast_hulp.js') + '\n' + S('scenes.js') + '\n/*@@/SCENES*/'
i, j = h.index('/*@@SCENES*/'), h.index('/*@@/SCENES*/') + len('/*@@/SCENES*/'); h = h[:i] + blok + h[j:]
if '--filmdata' in a:
    m = re.search(r'window\.FILMDATA=(\{.*?\});?</script>', h); cur = json.loads(m.group(1)); new = json.load(open(a[a.index('--filmdata') + 1]))
    nieuw = a[a.index('--nieuw') + 1].split(',') if '--nieuw' in a else []; ca = {s['id']: s.get('audio') for s in cur['segments']}
    for sg in new['segments']:
        if 'audio' not in sg: continue
        oud = ca.get(sg['id']) or sg['audio']; v = int(oud.split('?v=')[1]) if '?v=' in oud else 1
        if sg['id'] in nieuw: sg['audio'] = sg['audio'].split('?')[0] + f'?v={v + 1}'
        elif '?v=' in oud: sg['audio'] = sg['audio'].split('?')[0] + '?v=' + oud.split('?v=')[1]
    h = h[:m.start(1)] + json.dumps(new, ensure_ascii=False) + h[m.end(1):]
open(html, 'w', encoding='utf-8').write(h); print('bijgewerkt', html)
