"""Zet js/oefenen.js ('Zelf aan de slag' onder de begrippen) in elke film waar een oefenen.json bij hoort.
Waar staat de data?  films/<map>/index.html      -> films/<map>/oefenen.json
                     films/<map>/<slug>.html     -> films/<map>/<slug>/oefenen.json
Gebruik: python3 scripts/oefenen.py   (idempotent; controleert ook de JSON). Zonder oefenen.json wordt een oude tag weggehaald."""
import json, os, re, subprocess, sys
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = subprocess.check_output(['git', 'ls-files', '--cached', '--others', '--exclude-standard', 'films/*.html', 'films/**/*.html'], cwd=R, text=True).split()
TAG = re.compile(r'<script src="[^"]*js/oefenen\.js"[^>]*></script>\n?')
SOORTEN = {'volgorde', 'schema', 'uitleg', 'indelen', 'pijlen', 'grafiek', 'puzzel', 'stamboom'}


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
        if o.get('soort') == 'indelen':
            namen = [b if isinstance(b, str) else b.get('naam') for b in o.get('bakken', [])]
            if not 2 <= len(namen) <= 4: fouten.append(f'{w}: 2–4 bakken verwacht')
            for c in o.get('kaartjes', []):
                b = c.get('bak')
                if not (isinstance(b, int) and 0 <= b < len(namen)) and b not in namen: fouten.append(f'{w}: kaartje {c.get("tekst")!r} heeft een onbekende bak')
            if len(o.get('kaartjes', [])) < 4: fouten.append(f'{w}: minstens 4 kaartjes verwacht')
        if o.get('soort') == 'pijlen':
            for r in o.get('rijen', []):
                if r.get('antwoord') not in ('+', '-', '='): fouten.append(f'{w}: rij {r.get("naam")!r}: antwoord moet + - of = zijn')
            if not o.get('rijen'): fouten.append(f'{w}: rijen ontbreken')
        if o.get('soort') == 'grafiek':
            if not o.get('svg'): fouten.append(f'{w}: svg ontbreekt')
            for q in o.get('vragen', []):
                if 'antwoord' not in q: fouten.append(f'{w}: vraag zonder antwoord')
                elif q.get('keuzes') and not (isinstance(q['antwoord'], int) and 0 <= q['antwoord'] < len(q['keuzes'])): fouten.append(f'{w}: keuze-antwoord buiten de lijst')
        if o.get('soort') == 'stamboom':
            nrs = []
            for q in o.get('personen', []):
                if not {'nr', 'x', 'y'} <= set(q): fouten.append(f'{w}: persoon mist nr/x/y')
                for ou in q.get('ouders') or []:
                    if ou not in nrs: fouten.append(f'{w}: ouder {ou} moet vóór persoon {q.get("nr")} staan')
                nrs.append(q.get('nr'))
        if o.get('soort') == 'puzzel':
            if not o.get('stappen'): fouten.append(f'{w}: stappen ontbreken')
            for st in o.get('stappen', []):
                if not st.get('velden'): fouten.append(f'{w}: stap zonder velden')
                for v in st.get('velden', []):
                    if 'antwoord' not in v: fouten.append(f'{w}: veld zonder antwoord')
                    elif v.get('opties') and v['antwoord'] not in v['opties']: fouten.append(f'{w}: antwoord {v["antwoord"]!r} staat niet in de opties')
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
