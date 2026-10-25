"""Zet de teller (js/teller.js, GoatCounter) in de <head> van elke pagina van de site.
Gebruik: python3 scripts/teller.py   (idempotent; werkt ook de filmduur bij als die in index.html veranderd is)
Slaat over: bronmappen, bouwstraten (_bouw), oud.html, nieuw/, personages/ en statistieken/.
Zet ook het site-icoon (favicon, img/icoon/) erbij als de pagina er nog geen heeft.
Films krijgen data-duur (minuten, uit HOOFDSTUKKEN in index.html) zodat 'halverwege' en 'uitgekeken' gemeten kunnen worden."""
import os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sitedata import R, filmduren

files = subprocess.check_output(['git', 'ls-files', '*.html'], cwd=R, text=True).split()
nieuw = [f for f in subprocess.check_output(['git', 'ls-files', '--others', '--exclude-standard', '*.html'], cwd=R, text=True).split()]
files = sorted(set(files + nieuw))


def overslaan(f):
    return ('/bron/' in f or '/storyboards-' in f or '/_bouw/' in f or f.startswith('_') or f == 'oud.html'
            or f.startswith(('nieuw/', 'personages/', 'statistieken/', 'scripts/')))


duren = filmduren()
TAG = re.compile(r'<script src="[^"]*js/teller\.js"[^>]*></script>\n?')
n = 0
for f in files:
    if overslaan(f):
        continue
    p = os.path.join(R, f)
    s = open(p, encoding='utf-8').read()
    if '<head' not in s:
        continue
    rootrel = os.path.relpath(R, os.path.dirname(p)).replace(os.sep, '/')
    root = '' if rootrel == '.' else rootrel + '/'
    duur = duren.get(f)
    attr = f' data-duur="{duur}"' if duur else ''
    tag = f'<script src="{root}js/teller.js" data-root="{root or "./"}"{attr}></script>\n'
    if TAG.search(s):
        s2 = TAG.sub(lambda m: tag, s, count=1)
    else:
        # direct na de eerste <meta charset>, anders direct na <head>, buiten scripts
        m = re.search(r'<meta charset[^>]*>\s*', s, re.I) or re.search(r'<head(\s[^>]*)?>\s*', s, re.I)
        if not m:  # '<head' kwam alleen voor als '<header' of in een script: geen echte pagina-kop
            continue
        s2 = s[:m.end()] + tag + s[m.end():]
    if 'rel="icon"' not in s2:
        icoon = (f'<link rel="icon" href="{root}img/icoon/favicon.svg" type="image/svg+xml">\n'
                 f'<link rel="icon" href="{root}img/icoon/favicon-32.png" sizes="32x32" type="image/png">\n'
                 f'<link rel="apple-touch-icon" href="{root}img/icoon/apple-touch-icon.png">\n')
        m = TAG.search(s2)
        s2 = s2[:m.end()] + icoon + s2[m.end():]
    if s2 != s:
        open(p, 'w', encoding='utf-8').write(s2)
        n += 1
print(n, "pagina's bijgewerkt")
