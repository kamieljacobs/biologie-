"""Maakt tabellen in films op een smal scherm (telefoon) horizontaal scrollbaar, zodat de pagina zelf niet breder wordt.
Zet één <style id="bk-tabel-mobiel"> vóór </head> in elke film met een <table>. Idempotent: python3 scripts/tabel_mobiel.py"""
import os, re, subprocess
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STIJL = ('<style id="bk-tabel-mobiel">@media (max-width:760px){table{display:block;max-width:100%;overflow-x:auto;'
         '-webkit-overflow-scrolling:touch}}</style>\n')
files = subprocess.check_output(['git', 'ls-files', 'films/*.html', 'films/**/*.html'], cwd=R, text=True).split()
n = 0
for f in files:
    if '/bron/' in f or '/_bouw/' in f: continue
    p = os.path.join(R, f); s = open(p, encoding='utf-8').read()
    if '<table' not in s or 'id="bk-tabel-mobiel"' in s: continue
    i = s.lower().find('</head>')
    if i < 0: continue
    open(p, 'w', encoding='utf-8').write(s[:i] + STIJL + s[i:]); n += 1
print(n, 'films bijgewerkt')
