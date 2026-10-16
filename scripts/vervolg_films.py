"""Werkt in vervolg.html ('Wat word jij?') de lijst FILMS bij: titel en hoofdstuk van alle films op de site
(uit HOOFDSTUKKEN in index.html). Per gebied in GEBIEDEN wijst 'pta' naar films uit de lesstof (href);
die verschijnen in een apart blok, los van de extra films voor het vak ('basis').
Gebruik: python3 scripts/vervolg_films.py   (idempotent; meldt hrefs in 'pta' die niet (meer) op de site staan)."""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sitedata import R, lees
h, _ = lees()
films = {}
for hid, v in h.items():
    if hid in ('kerndoelen', 'extra'):
        continue
    for f in v.get('films', []):
        films.setdefault(f['href'], [f['titel'], v.get('titel') or hid, hid])
p = os.path.join(R, 'vervolg.html'); s = open(p, encoding='utf-8').read()
blok = '/* FILMS:start (scripts/vervolg_films.py) */\nconst FILMS = ' + json.dumps(films, ensure_ascii=False, separators=(',', ':')) + ';\n/* FILMS:end */'
if '/* FILMS:start' in s:
    s = re.sub(r'/\* FILMS:start.*?/\* FILMS:end \*/', lambda m: blok, s, flags=re.S)
else:
    s = s.replace('const GEBIEDEN = [', blok + '\nconst GEBIEDEN = [', 1)
open(p, 'w', encoding='utf-8').write(s)
mis = sorted({x for x in re.findall(r"'(films/[^']+\.html)'", s.split('const GEBIEDEN = [', 1)[1].split('];', 1)[0]) if x not in films and not x.startswith('films/vervolg/')})
print(len(films), 'films;', 'onbekend in pta:', mis or 'geen')
