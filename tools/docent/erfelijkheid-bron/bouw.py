#!/usr/bin/env python3
"""Bouwt tools/docent/erfelijkheid-<n>/index.html uit de gedeelde kern + les<n>/ (meta.json, schermen.js, briefing.md).
Gebruik: python3 bouw.py 1 [2 3]"""
import json, os, re, sys, shutil, subprocess
HIER = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(os.path.dirname(os.path.dirname(HIER)))
lees = lambda p: open(os.path.join(HIER, p), encoding='utf-8').read()
def bouw(n):
    m = json.loads(lees(f'les{n}/meta.json'))
    kop = lees('_kop.html')
    kop = re.sub(r'<title>.*?</title>', f'<title>Les {n} · {m["titel"]} · Erfelijkheid · Biologie bij Kamiel</title>', kop)
    kop = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{m["desc"]}">', kop)
    kop = kop.replace('<style>\n<style>', '<style>').replace('</style>\n</style>', '</style>')
    kop = re.sub(r'/\* Uitleg in stappen · DNA · les 3 · versie 1.0 · 28 oktober 2026', f'/* Uitleg in stappen · Erfelijkheid · les {n} · versie {m["versie"]} · {m["datum"]}', kop)
    body = f'''<body>
<div class="wrap">
<nav class="sitenav" aria-label="Site">
  <a class="merk" href="../../../index.html#home">Biologie bij Kamiel</a>
  <a class="terug" href="../../../index.html#lessen-erfelijkheid">← Alle lessen</a>
  <a class="terug" href="../../../index.html#erfelijkheid">Erfelijkheid</a>
  <span class="rechts"><button type="button" class="icoon" data-thema-knop></button></span>
</nav>

<header class="tool-kop">
  <div class="mono">Les {n} · Erfelijkheid · voor de docent</div>
  <h1>{m["titel"]}</h1>
  <p>{m["intro"]}</p>
</header>

'''
    speler = lees('_speler.html').replace('(rechts, primer …)', '')
    docent = f'''

<details class="docent">
  <summary><h2>Voor de docent</h2></summary>
  <div class="kolommen">
{m["docent"]}
  </div>
</details>

<footer class="tool-voet">Biologie bij Kamiel · Uitleg in stappen · Erfelijkheid les {n} · versie {m["versie"]} · {m["datum"]}</footer>
</div>

<script src="../../../personages/lib_cast.js"></script>
<script>
'use strict';
/* =====================================================================================
   Basis: tekenruimte, kleuren (licht/donker), hulpfuncties
   ===================================================================================== */
'''
    js = lees('_basis.js') + '\n' + lees('erf_lib.js') + '\n' + '''/* =====================================================================================
   SCHERMEN — per scherm: titel (knop), kop (boven het beeld), deel, stappen (t = tekst onder het beeld,
   th = havotekst, n = notitie voor de docent, vwo = alleen in vwo) en teken(ctx, S).
   In teken: S.on(k, duur, vertraging) = voortgang 0..1 van stap k (1 als die stap al geweest is, 0 als hij nog moet komen),
   S.T = tijd sinds het begin van het scherm (s), S.vwo = niveau.
   ===================================================================================== */
const SCHERMEN = [];
''' + lees(f'les{n}/schermen.js') + '\n' + lees('_motor.js') + '\n</script>\n</body>\n</html>\n'
    uitdir = os.path.join(REPO, f'tools/docent/erfelijkheid-{n}'); os.makedirs(uitdir, exist_ok=True)
    oud = os.path.join(uitdir, 'index.html'); vorige = open(oud, encoding='utf-8').read() if os.path.exists(oud) else ''
    html = kop + body + speler + docent + js
    # bestaande briefing/licentie/teller-regels die door de repo-scripts zijn toegevoegd: briefing.py en licentie_noot.py zetten ze opnieuw
    open(oud, 'w', encoding='utf-8').write(html)
    if os.path.exists(os.path.join(HIER, f'les{n}/briefing.md')): shutil.copy(os.path.join(HIER, f'les{n}/briefing.md'), os.path.join(uitdir, 'briefing.md'))
    print('gebouwd', oud, len(html))
if __name__ == '__main__':
    for n in sys.argv[1:]: bouw(int(n))
