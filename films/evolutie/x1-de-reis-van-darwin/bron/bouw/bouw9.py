"""Bouw film 9 zoals evo_bouw.py 9, maar met een lokale fix: teken_evo9.js gebruikt VogelZang al bij het laden,
terwijl lib_dieren.js (waar VogelZang staat) later komt. De vinken-IIFE wordt hier een functie die teken_e9.js aanroept."""
import json, os, subprocess, sys
HW = os.path.expanduser('~/hw'); EVO = os.path.expanduser('~/evo2/src'); n = 9; d = f'{HW}/e{n}'
def rd(p): return open(p, encoding='utf-8').read()
TEKEN = [f'teken_evo{i}' for i in range(1, 9)] + ['teken_evo9_data', 'teken_evo9']
kop = ''.join(rd(f'{HW}/engine/scenes.js').splitlines(True)[:32])
delen = [kop, 'const SCENES = {};', rd(f'{HW}/evolib/lib_bio.js'), rd(f'{HW}/evolib/lib_evo.js')]
for t in TEKEN:
    s = rd(f'{EVO}/{t}.js')
    if t == 'teken_evo9':
        a = '(function () { const D = VogelZang.DEFS;'; assert a in s
        s = s.replace(a, 'function _x9vinkDefs() { const D = VogelZang.DEFS;')
        i = s.index('function _x9vinkDefs'); j = s.index('})();', i); s = s[:j] + '}' + s[j + 5:]
    delen.append(s)
delen += [rd(f'{HW}/evolib/lib_dieren.js'), rd(f'{HW}/evolib/lib_micro_evo.js'), rd(f'{d}/teken_e9.js'), rd(f'{EVO}/sb9.js'), rd(f'{d}/scenes_e9.js'),
          '// de speler tekent zelf de reeks/niveau-regel linksboven en de vwo-markering\nevoTag = function () {}; vwoMarker = function () {};']
open(f'{d}/scenes.js', 'w', encoding='utf-8').write('\n'.join(delen) + '\n')
subprocess.run(['python3', f'{HW}/engine/fakewords.py', d], check=True, capture_output=True)
subprocess.run(['python3', 'film.py'], cwd=d, check=True, capture_output=True)
for s in ['build_data.py', 'build.py']:
    r = subprocess.run(['python3', f'{HW}/engine/{s}', d], capture_output=True, text=True); print(r.stdout.strip()[-300:], r.stderr.strip()[-600:])
