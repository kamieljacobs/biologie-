"""Zet js/flipkaarten.js (flipkaarten bij de begrippen) in elke film met een begrippenlijst (id="glossary").
Gebruik: python3 scripts/flipkaarten.py   (idempotent). Draai na het toevoegen van een film."""
import os, re, subprocess, sys
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = subprocess.check_output(['git', 'ls-files', '--cached', '--others', '--exclude-standard', 'films/*.html', 'films/**/*.html'], cwd=R, text=True).split()
TAG = re.compile(r'<script src="[^"]*js/flipkaarten\.js"[^>]*></script>\n?')
n = 0
for f in sorted(set(files)):
    if '/bron/' in f or '/_bouw/' in f or f.endswith('presentatie.html'):
        continue
    p = os.path.join(R, f); s = open(p, encoding='utf-8').read()
    if 'id="glossary"' not in s and "id='glossary'" not in s:
        continue
    root = os.path.relpath(R, os.path.dirname(p)).replace(os.sep, '/') + '/'
    tag = f'<script src="{root}js/flipkaarten.js" defer></script>\n'
    if TAG.search(s):
        s2 = TAG.sub(lambda m: tag, s, count=1)
    else:
        i = s.lower().rfind('</body>')
        s2 = s[:i] + tag + s[i:] if i >= 0 else s + tag
    if s2 != s:
        open(p, 'w', encoding='utf-8').write(s2); n += 1
print(n, 'films bijgewerkt')
