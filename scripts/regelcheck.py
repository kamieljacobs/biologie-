"""Bewaakt de erfelijke B15-regels (Kamiel 29 okt 2026: 'regels als data').

python3 scripts/regelcheck.py [--tegen <git-ref>]

Faalt (exit 1) als:
 1. films/logboek/regels.json kapot is of een regel een verkeerde status heeft;
 2. een regel die in de vorige versie (git, standaard origin/main of HEAD~1) bestond, nu ontbreekt;
 3. een regel 'uitgestorven' is zonder akkoord {datum, citaat} van Kamiel;
 4. een regel 'vast' is zonder akkoord én zonder herhaalde duidelijke winst (zie b15lib.herhaald);
 5. een proefregel-id (P<n>) die in een oudere films/PROMPT_v*.md staat, niet in regels.json staat
    (zo verdwenen P1 en P2 tussen v10 en v13);
 6. de nieuwste films/PROMPT_v*.md niet naar films/logboek/regels.json verwijst.
"""
import glob, json, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import b15lib

R = b15lib.R
REL = 'films/logboek/regels.json'
fouten, notities = [], []

try:
    data = b15lib.regels()
    regels = {r['id']: r for r in data['regels']}
except Exception as e:  # noqa
    sys.exit(f'regels.json is niet te lezen: {e}')

for r in data['regels']:
    for veld in ('id', 'status', 'tekst', 'sinds'):
        if not r.get(veld):
            fouten.append(f"{r.get('id', '?')}: veld '{veld}' ontbreekt")
    if r.get('status') not in ('proef', 'vast', 'uitgestorven'):
        fouten.append(f"{r['id']}: status '{r.get('status')}' (moet proef, vast of uitgestorven zijn)")
    akk = r.get('akkoord') or {}
    if r.get('status') == 'uitgestorven' and not (akk.get('datum') and akk.get('citaat')):
        fouten.append(f"{r['id']}: uitgestorven zonder akkoord van Kamiel (veld akkoord: {{datum, citaat}})")
    if r.get('status') == 'vast' and not (akk.get('datum') and akk.get('citaat')):
        ok, winst, buiten = b15lib.herhaald(r, b15lib.proefregel_bewijs(r))
        if not ok:
            fouten.append(f"{r['id']}: vast zonder akkoord en zonder herhaling "
                          f"({len(winst)} duidelijke winsten, {len(buiten)} buiten de ontdekkingsreeks)")

# 2. vergelijken met de vorige versie in git
args = sys.argv[1:]
tegen = args[args.index('--tegen') + 1] if '--tegen' in args else None
def git(*a):
    return subprocess.run(['git', '-C', R, *a], capture_output=True, text=True)
if not tegen:
    tegen = 'origin/main' if git('rev-parse', '--verify', '-q', 'origin/main').returncode == 0 else 'HEAD~1'
oud = git('show', f'{tegen}:{REL}')
if oud.returncode == 0:
    try:
        vorige = {r['id'] for r in json.loads(oud.stdout)['regels']}
        for rid in sorted(vorige - set(regels)):
            fouten.append(f'{rid} stond in {tegen} maar is uit regels.json verdwenen '
                          f"(uitsterven = status 'uitgestorven' met akkoord, nooit weghalen)")
    except Exception as e:  # noqa
        notities.append(f'vorige versie ({tegen}) niet te lezen: {e}')
else:
    notities.append(f'geen vorige versie van regels.json in {tegen} (eerste keer of ondiepe clone)')

# 5. proefregel-ids uit oudere prompts
def versie(p):
    m = re.search(r'PROMPT_v(\d+)', p)
    return int(m.group(1)) if m else -1
prompts = sorted(glob.glob(os.path.join(R, 'films', 'PROMPT_v*.md')), key=versie)
for p in prompts:
    tekst = open(p, encoding='utf-8').read()
    for rid in sorted(set(re.findall(r'\*\*(P\d+) ·', tekst))):
        if rid not in regels:
            fouten.append(f'{rid} staat als proefregel in {os.path.basename(p)} maar niet in regels.json')

# 6. de nieuwste prompt verwijst naar het bestand
if prompts:
    nieuwste = prompts[-1]
    if REL not in open(nieuwste, encoding='utf-8').read():
        fouten.append(f'{os.path.basename(nieuwste)} verwijst niet naar {REL}')

for n in notities:
    print('let op:', n)
if fouten:
    print('REGELCHECK FAALT')
    for f in fouten:
        print('  -', f)
    sys.exit(1)
print(f"regelcheck ok: {len(regels)} regels ({', '.join(f'{k} {v['status']}' for k, v in regels.items())})")
