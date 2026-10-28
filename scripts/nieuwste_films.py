"""Filmdatums en de rij 'Nieuw op de site' (Kamiel 28 okt 2026: 'datums vanaf nu toevoegen').

Elke film heeft een veld "datum": "JJJJ-MM-DD" = de dag waarop deze versie van de film op de site kwam, in
HOOFDSTUKKEN in index.html (ook extra en onderbouw) en in films/vervolg/films.json. Zet het veld zelf bij een nieuwe
film; bij een remake (oude versie naar bron/oud/) zet je de datum van de remake.

Dit script (idempotent):
 1. vult een ontbrekende datum aan: de dag waarop de oude versie in bron/oud/ kwam (remake), anders de dag waarop
    het filmbestand voor het eerst in de repo kwam (git), anders vandaag (nog niet gecommit). Een bestaande datum
    blijft altijd staan.
 2. schrijft films/nieuwste.json: de [aantal] (standaard 10) nieuwste films, voor de rij op de hoofdpagina.
Gebruik: python3 scripts/nieuwste_films.py [aantal]   — draai het na elke nieuwe film of remake, in dezelfde commit.
Het aanvullen uit git vereist de volledige geschiedenis: bij een ondiepe clone eerst
  git fetch --filter=blob:none --unshallow origin main"""
import datetime, json, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sitedata import R, lees

N = int(sys.argv[1]) if len(sys.argv) > 1 else 10
VANDAAG = datetime.date.today().isoformat()
IDX = os.path.join(R, 'index.html')
VJ = os.path.join(R, 'films', 'vervolg', 'films.json')
pad = lambda href: href.split('#')[0].split('?')[0]

def bronmap(href):
    p = pad(href)
    return os.path.dirname(p) if p.endswith('/index.html') else re.sub(r'\.html$', '', p)

_git = None
def git_datums():
    """pad -> vroegste dag waarop het bestand werd toegevoegd, in één keer over de hele geschiedenis"""
    global _git
    if _git is None:
        if subprocess.check_output(['git', '-C', R, 'rev-parse', '--is-shallow-repository']).decode().strip() == 'true':
            sys.exit('Ondiepe clone: eerst  git fetch --filter=blob:none --unshallow origin main')
        log = subprocess.check_output(['git', '-C', R, 'log', '--no-renames', '--diff-filter=A', '--name-only',
                                       '--format=@%cI', '--', 'films']).decode()
        _git, d = {}, ''
        for regel in log.splitlines():
            if regel.startswith('@'):
                d = regel[1:11]
            elif regel:
                _git[regel] = d  # log loopt van nieuw naar oud: de laatste toewijzing is de vroegste
    return _git

def bepaal(href):
    g = git_datums()
    oud = bronmap(href) + '/bron/oud/'
    remake = [d for p, d in g.items() if p.startswith(oud)]
    if remake:
        return min(remake), 'remake'
    if pad(href) in g:
        return g[pad(href)], 'git'
    return VANDAAG, 'vandaag'

# --- 1. ontbrekende datums aanvullen in index.html ---
h, _ = lees()
filmhrefs = {f['href'] for v in h.values() for f in v.get('films', [])}
src = open(IDX, encoding='utf-8').read()
a = src.index('const HOOFDSTUKKEN ='); b = src.index('\n};\n', a)
blok, gevuld = src[a:b], []
def vul(m):
    href, rest = m.group(2), m.group(3)
    if href not in filmhrefs or '"datum"' in rest:
        return m.group(0)
    d, hoe = bepaal(href); gevuld.append((href, d, hoe))
    return f'{m.group(1)}"href": "{href}",\n{m.group(1)}"datum": "{d}",{rest}'
# één filmobject: de href-regel tot en met de sluitende accolade van dat object
blok = re.sub(r'( +)"href": "([^"]+)",((?:\n\1(?!"href")[^\n]*)*)', vul, blok)
if gevuld:
    open(IDX, 'w', encoding='utf-8').write(src[:a] + blok + src[b:])
    h, _ = lees()

# --- ook in films/vervolg/films.json ---
vfilms = json.load(open(VJ, encoding='utf-8')) if os.path.exists(VJ) else []
vgevuld = False
for i, f in enumerate(vfilms):
    if not f.get('datum'):
        d, hoe = bepaal(f['href']); gevuld.append((f['href'], d, hoe))
        vfilms[i] = {k: v for k, v in list(f.items())[:1]} | {'datum': d} | {k: v for k, v in list(f.items())[1:]}
        vgevuld = True
if vgevuld:
    json.dump(vfilms, open(VJ, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for href, d, hoe in gevuld:
    print(f'datum aangevuld ({hoe}): {d}  {href}')

# --- 2. films/nieuwste.json ---
films = {}
for hid, v in h.items():
    for f in v.get('films', []):
        thema = f.get('thema') if hid == 'extra' else hid
        titel = (h.get(thema) or {}).get('titel') or thema
        films.setdefault(f['href'], {'href': f['href'], 'titel': f['titel'], 'thema': thema, 'themaTitel': titel,
                                      'duur': f.get('duur') or 0, 'vraag': f.get('vraag', ''), 'extra': hid == 'extra',
                                      'datum': f.get('datum', '')})
for f in vfilms:
    films.setdefault(f['href'], {'href': f['href'], 'titel': f['titel'], 'thema': 'vervolg', 'themaTitel': 'Wat word jij?',
                                  'duur': f.get('duur') or 0, 'vraag': f.get('vraag', ''), 'extra': True, 'datum': f.get('datum', '')})
zonder = [f['href'] for f in films.values() if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', f['datum'])]
if zonder:
    sys.exit('Films zonder geldige datum: ' + ', '.join(zonder))
# zelfde dag: volgorde in de git-geschiedenis als tiebreak (nieuwste eerst), anders op titel
volg = {p: i for i, p in enumerate(reversed(list(git_datums())))} if os.path.isdir(os.path.join(R, '.git')) else {}
rij = sorted(films.values(), key=lambda f: (f['datum'], volg.get(pad(f['href']), 0)), reverse=True)[:N]
json.dump(rij, open(os.path.join(R, 'films', 'nieuwste.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'{len(films)} films met datum; nieuwste {len(rij)}:')
for f in rij:
    print(' ', f['datum'], f['titel'], '·', f['themaTitel'])
