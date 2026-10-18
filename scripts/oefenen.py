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


n = 0; alle_fouten = []
for f in sorted(set(files)):
    if '/bron/' in f or '/_bouw/' in f or f.endswith('presentatie.html'):
        continue
    p = os.path.join(R, f); s = open(p, encoding='utf-8').read()
    d, naam = os.path.split(p)
    kandidaat = os.path.join(d, 'oefenen.json') if naam == 'index.html' else os.path.join(d, naam[:-5], 'oefenen.json')
    if os.path.exists(kandidaat):
        alle_fouten += controleer(kandidaat)
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
print(n, 'films bijgewerkt')
if alle_fouten:
    print('\n'.join(alle_fouten)); sys.exit(1)
