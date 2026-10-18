"""Zet js/oefenen.js ('Zelf aan de slag' onder de begrippen) in elke film waar een oefenen.json bij hoort.
Waar staat de data?  films/<map>/index.html      -> films/<map>/oefenen.json
                     films/<map>/<slug>.html     -> films/<map>/<slug>/oefenen.json
Gebruik: python3 scripts/oefenen.py   (idempotent; controleert ook de JSON). Zonder oefenen.json wordt een oude tag weggehaald."""
import json, os, re, subprocess, sys
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = subprocess.check_output(['git', 'ls-files', '--cached', '--others', '--exclude-standard', 'films/*.html', 'films/**/*.html'], cwd=R, text=True).split()
TAG = re.compile(r'<script src="[^"]*js/oefenen\.js"[^>]*></script>\n?')
SOORTEN = {'volgorde', 'schema', 'uitleg'}


def controleer(pad):
    d = json.load(open(pad, encoding='utf-8'))
    fouten = []
    ids = set()
    for k, o in enumerate(d.get('oefeningen', [])):
        w = f'{os.path.relpath(pad, R)} #{k + 1}'
        if o.get('soort') not in SOORTEN: fouten.append(f'{w}: onbekende soort {o.get("soort")!r}')
        if not o.get('id') or o['id'] in ids: fouten.append(f'{w}: id ontbreekt of dubbel')
        ids.add(o.get('id'))
        if o.get('soort') == 'volgorde' and not (2 <= len(o.get('stappen', [])) <= 8): fouten.append(f'{w}: 2–8 stappen verwacht')
        if o.get('soort') == 'schema':
            for v in o.get('vakjes', []):
                if not {'naam', 'x', 'y', 'punt'} <= set(v): fouten.append(f'{w}: vakje mist naam/x/y/punt')
        if o.get('soort') == 'uitleg':
            for veld in ('begrippen', 'checklist', 'model'):
                if not o.get(veld): fouten.append(f'{w}: {veld} ontbreekt')
    return fouten


n = 0; alle_fouten = []; met = []
for f in sorted(set(files)):
    if '/bron/' in f or '/_bouw/' in f or f.endswith('presentatie.html'):
        continue
    p = os.path.join(R, f); s = open(p, encoding='utf-8').read()
    d, naam = os.path.split(p)
    kandidaat = os.path.join(d, 'oefenen.json') if naam == 'index.html' else os.path.join(d, naam[:-5], 'oefenen.json')
    if os.path.exists(kandidaat):
        alle_fouten += controleer(kandidaat); met.append((f, os.path.relpath(kandidaat, R).replace(os.sep, '/')))
        root = os.path.relpath(R, d).replace(os.sep, '/') + '/'
        data = os.path.relpath(kandidaat, d).replace(os.sep, '/')
        tag = f'<script src="{root}js/oefenen.js" data-oefenen="{data}" defer></script>\n'
        if TAG.search(s):
            s2 = TAG.sub(lambda m: tag, s, count=1)
        else:
            i = s.lower().rfind('</body>')
            s2 = s[:i] + tag + s[i:] if i >= 0 else s + tag
    else:
        s2 = TAG.sub('', s)
    if s2 != s:
        open(p, 'w', encoding='utf-8').write(s2); n += 1
# lijst van films met oefeningen: OEFENEN in index.html (knop + aanklikbare opdrachten in de filmlijst)
# en oefenlijst.json (voor de losse oefenpagina oefenen.html)
ip = os.path.join(R, 'index.html'); idx = open(ip, encoding='utf-8').read()
hs = idx.index('const HOOFDSTUKKEN = '); he = idx.index('\n};\n', hs)
HFD = json.loads(idx[hs + len('const HOOFDSTUKKEN = '):he + 2])
info = {}
for hid, h in HFD.items():
    for film in h.get('films', []):
        info.setdefault(film['href'], (film.get('titel', ''), hid, h.get('titel', hid)))
lijst = {}
for f, pad in sorted(met):
    d = json.load(open(os.path.join(R, pad), encoding='utf-8'))
    titel, hid, htitel = info.get(f, ('', '', ''))
    lijst[f] = {'titel': titel, 'hoofdstuk': hid, 'htitel': htitel, 'json': pad,
                'oef': [[o['id'], o.get('titel', ''), o.get('soort', ''), 1 if o.get('vwo') else 0] for o in d.get('oefeningen', [])]}
regel = 'const OEFENEN = ' + json.dumps(lijst, ensure_ascii=False, separators=(',', ':')) + ';'
idx2 = re.sub(r'^const OEFENEN = .*;$', lambda m: regel, idx, count=1, flags=re.M)
if idx2 != idx: open(ip, 'w', encoding='utf-8').write(idx2); print('index.html: OEFENEN bijgewerkt')
lp = os.path.join(R, 'oefenlijst.json')
oud = open(lp, encoding='utf-8').read() if os.path.exists(lp) else ''
nieuw = json.dumps(lijst, ensure_ascii=False, indent=1) + '\n'
if nieuw != oud: open(lp, 'w', encoding='utf-8').write(nieuw); print('oefenlijst.json bijgewerkt')
print(n, 'films bijgewerkt')
if alle_fouten:
    print('\n'.join(alle_fouten)); sys.exit(1)
