#!/usr/bin/env python3
"""Zet de vier hulpstanden (tools/examen-standen.js) in de oefenexamens en houdt de ?v= van dat bestand gelijk.
Idempotent. Gebruik: python3 scripts/oefenexamen/standen.py [tool.html ...]   (zonder argument: alle tools/examen-*.html)
Vervangt de oude knoppen Hulpstand/Examenstand en setMode() door EXSTAND.init(...), en geeft de knop
'Laat zien waarom' de klasse waarombtn (verborgen in de stand 'Echt examen')."""
import sys, os, re, glob, hashlib
R = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
v = hashlib.md5(open(f'{R}/tools/examen-standen.js', 'rb').read()).hexdigest()[:8]
files = sys.argv[1:] or sorted(glob.glob(f'{R}/tools/examen-*.html'))
OUD_KNOP = re.compile(r'<div class="seg" role="group" aria-label="Stand">\s*<button id="m-hulp"[^<]*</button>\s*<button id="m-examen"[^<]*</button>\s*</div>')
OUD_JS = re.compile(r'function setMode\(m\)\{.*?\}\n', re.S)
for f in files:
    s = o = open(f).read()
    s = OUD_KNOP.sub('<div class="seg" id="standen" role="group" aria-label="Hoeveel hulp wil je?"></div>', s)
    s = OUD_JS.sub('', s, count=1)
    s = re.sub(r'\$\("#m-hulp"\)\.onclick=.*\n', '', s)
    s = re.sub(r'setMode\(store\.mode==="examen"\?"examen":"hulp"\);', 'EXSTAND.init({store,save,setVrij});', s)
    s = s.replace('el("button",{class:"ghost"},"Laat zien waarom ›")', 'el("button",{class:"ghost waarombtn"},"Laat zien waarom ›")')
    tag = f'<script src="examen-standen.js?v={v}"></script>'
    if 'examen-standen.js' in s:
        s = re.sub(r'<script src="examen-standen\.js\?v=[0-9a-f]*"></script>', tag, s)
    else:
        s = re.sub(r'(<script src="examen-stof\.js\?v=[0-9a-f]*"></script>)', r'\1\n' + tag, s, count=1)
    if 'EXSTAND.init' not in s or 'id="standen"' not in s:
        print('LET OP: niet herkend, niet aangepast:', f); continue
    if s != o:
        open(f, 'w').write(s); print('aangepast:', os.path.relpath(f, R))
    else:
        print('al goed:', os.path.relpath(f, R))
