"""Controle vóór elke push (Kamiel 29 okt 2026: 'poorten in code').

python3 scripts/controle.py [--tegen <git-ref>]

Draait de B15-kringloop en faalt (exit 1) als één onderdeel faalt:
  1. regelcheck   — geen erfelijke regel verdwenen, uitgestorven of gepromoveerd zonder grond
  2. b15-poort    — elke film sinds de poortdatum heeft B15 of een genoteerde uitzondering
  3. b15-rapport  — na elke 5 logregels ligt er een rapport (anders: python3 scripts/b15rapport.py)
Draait ook op GitHub na elke push (.github/workflows/controle.yml), zodat het niet afhangt van
of iemand eraan denkt.
"""
import os, subprocess, sys

S = os.path.dirname(os.path.abspath(__file__))
extra = sys.argv[1:]
stappen = [('regelcheck', ['regelcheck.py', *extra]), ('b15-poort', ['b15poort.py']),
           ('b15-rapport', ['b15rapport.py', '--check'])]
mis = []
for naam, cmd in stappen:
    r = subprocess.run([sys.executable, os.path.join(S, cmd[0]), *cmd[1:]], capture_output=True, text=True)
    print(f"[{'ok' if r.returncode == 0 else 'FOUT'}] {naam}")
    uit = (r.stdout + r.stderr).strip()
    if uit:
        print('     ' + uit.replace('\n', '\n     '))
    if r.returncode:
        mis.append(naam)
if mis:
    print('\nControle faalt:', ', '.join(mis))
    sys.exit(1)
print('\nControle ok.')
