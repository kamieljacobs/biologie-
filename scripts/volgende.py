"""Maakt films/volgende.json voor de knop 'Volgende film' (js/volgende.js, Kamiel 7 nov 2026:
'als je een film hebt gezien kun je doorklikken naar de volgende van dat thema').

Reeksen:
  <thema>        de films van een thema, in de volgorde van HOOFDSTUKKEN in index.html
  <thema>+       de extra films van dat thema ('Nieuwsgierig?', HOOFDSTUKKEN.extra met thema=<thema>)
  v:<gebied>     de films van een 'Wat word jij?'-gebied, in de volgorde van 'basis' in GEBIEDEN (vervolg.html)
Alleen films die echt bestaan; archief en 'komt nog' doen niet mee.

Gebruik: python3 scripts/volgende.py   (idempotent; draai opnieuw na een nieuwe of verplaatste film)."""
import json, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sitedata import R, lees

H, _ = lees()
bestaat = lambda href: bool(href) and os.path.exists(os.path.join(R, href))
reeksen, film = {}, {}


def reeks(rid, titel, terug, films):
    films = [f for f in films if bestaat(f[0])]
    if not films:
        return
    reeksen[rid] = {'titel': titel, 'terug': terug, 'films': films}
    for f in films:
        film.setdefault(f[0], [])
        if rid not in film[f[0]]:
            film[f[0]].append(rid)


rij = lambda f: [f['href'], f['titel'], f.get('duur') or 0]
# onderbouw: per kerndoel een eigen reeks (map films/onderbouw/<kd>/), naam uit NIVEAUS.onderbouw
_, N = lees()
kdnaam = {s[0].lower(): s[1] for o in N.get('onderbouw', {}).get('ond', []) for s in o.get('subs', [])}
for f in H.get('kerndoelen', {}).get('films', []):
    m = re.match(r'films/onderbouw/([^/]+)/', f['href'])
    kd = m.group(1) if m else 'overig'
    naam = 'Kerndoel ' + kd.upper() + (' · ' + kdnaam[kd] if kd in kdnaam else '')
    reeksen.setdefault('kd:' + kd, {'titel': naam, 'terug': 'index.html#kerndoelen', 'films': []})
for f in H.get('kerndoelen', {}).get('films', []):
    m = re.match(r'films/onderbouw/([^/]+)/', f['href'])
    rid = 'kd:' + (m.group(1) if m else 'overig')
    reeksen[rid]['films'].append(rij(f))
for rid in [k for k in reeksen if k.startswith('kd:')]:
    r = reeksen.pop(rid)
    reeks(rid, r['titel'], r['terug'], r['films'])
for hid, h in H.items():
    if hid in ('extra', 'kerndoelen'):
        continue
    reeks(hid, h.get('titel') or hid, 'index.html#' + hid, [rij(f) for f in h.get('films', [])])
for hid, h in H.items():
    if hid == 'extra':
        continue
    ex = [rij(f) for f in H.get('extra', {}).get('films', []) if f.get('thema') == hid]
    reeks(hid + '+', 'Nieuwsgierig? · ' + (h.get('titel') or hid), 'index.html#' + hid, ex)

# Wat word jij?: GEBIEDEN uit vervolg.html (JS, dus via node)
vh = open(os.path.join(R, 'vervolg.html'), encoding='utf-8').read()
a = vh.index('const GEBIEDEN = ')
i = vh.index('[', a)
d = 0
for j in range(i, len(vh)):
    if vh[j] == '[':
        d += 1
    elif vh[j] == ']':
        d -= 1
        if not d:
            break
G = json.loads(subprocess.check_output(['node', '-e', 'process.stdout.write(JSON.stringify(' + vh[i:j + 1] + '))']))
duur = {}
vj = os.path.join(R, 'films', 'vervolg', 'films.json')
if os.path.exists(vj):
    duur = {f['href']: f.get('duur') or 0 for f in json.load(open(vj, encoding='utf-8'))}
for g in G:
    fs = [[b[1], b[0], duur.get(b[1], 0)] for b in g.get('basis', []) if len(b) > 1 and isinstance(b[1], str)]
    reeks('v:' + g['id'], g.get('naam') or g['id'], 'vervolg.html#' + g['id'], fs)

uit = {'reeksen': reeksen, 'film': film}
p = os.path.join(R, 'films', 'volgende.json')
nieuw = json.dumps(uit, ensure_ascii=False, separators=(',', ':'))
oud = open(p, encoding='utf-8').read() if os.path.exists(p) else ''
if nieuw != oud:
    open(p, 'w', encoding='utf-8').write(nieuw)
print(len(reeksen), 'reeksen,', len(film), 'films', '(bijgewerkt)' if nieuw != oud else '(ongewijzigd)')
