"""Maakt films/nieuwste.json: de 10 laatst gemaakte films van de site (Kamiel 28 okt 2026, rij 'Nieuw op de site' op de hoofdpagina).
'Gemaakt' = de datum waarop het filmbestand voor het eerst in de repo kwam (git-geschiedenis). Telt alle films uit HOOFDSTUKKEN in index.html
(ook 'extra') plus films/vervolg/films.json ('Wat word jij?'). Een remake op hetzelfde pad houdt dus de oude datum.
Gebruik: python3 scripts/nieuwste_films.py [aantal]   (standaard 10; idempotent). Draai het na elke nieuwe film, in dezelfde commit.
Vereist volledige git-geschiedenis: bij een ondiepe clone eerst  git fetch --filter=blob:none --unshallow origin main"""
import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sitedata import R, lees

N = int(sys.argv[1]) if len(sys.argv) > 1 else 10
if subprocess.check_output(['git', '-C', R, 'rev-parse', '--is-shallow-repository']).decode().strip() == 'true':
    sys.exit('Ondiepe clone: eerst  git fetch --filter=blob:none --unshallow origin main')

h, _ = lees()
films = {}
for hid, v in h.items():
    for f in v.get('films', []):
        thema = f.get('thema') if hid == 'extra' else hid
        if hid == 'kerndoelen':
            thema = 'kerndoelen'
        titel = (h.get(thema) or {}).get('titel') or ('Onderbouw' if thema == 'kerndoelen' else thema)
        films.setdefault(f['href'], {'href': f['href'], 'titel': f['titel'], 'thema': thema, 'themaTitel': titel,
                                      'duur': f.get('duur') or 0, 'vraag': f.get('vraag', ''), 'extra': hid == 'extra'})
vj = os.path.join(R, 'films', 'vervolg', 'films.json')
if os.path.exists(vj):
    for f in json.load(open(vj, encoding='utf-8')):
        films.setdefault(f['href'], {'href': f['href'], 'titel': f['titel'], 'thema': 'vervolg', 'themaTitel': 'Wat word jij?',
                                      'duur': f.get('duur') or 0, 'vraag': f.get('vraag', ''), 'extra': True})

# één keer door de hele geschiedenis: per pad de vroegste commit waarin het bestand werd toegevoegd
log = subprocess.check_output(['git', '-C', R, 'log', '--no-renames', '--diff-filter=A', '--name-only', '--format=@%cI', '--', 'films']).decode()
toegevoegd, d = {}, ''
for regel in log.splitlines():
    if regel.startswith('@'):
        d = regel[1:]
    elif regel:
        toegevoegd[regel] = d  # log loopt van nieuw naar oud, dus de laatste toewijzing is de vroegste

rij = []
for f in films.values():
    pad = f['href'].split('#')[0].split('?')[0]
    if pad in toegevoegd:
        rij.append({**f, 'datum': toegevoegd[pad]})
    else:
        print('geen datum (nog niet gecommit?):', pad)
rij.sort(key=lambda f: f['datum'], reverse=True)
uit = rij[:N]
json.dump(uit, open(os.path.join(R, 'films', 'nieuwste.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for f in uit:
    print(f['datum'][:10], f['titel'], '·', f['themaTitel'])
