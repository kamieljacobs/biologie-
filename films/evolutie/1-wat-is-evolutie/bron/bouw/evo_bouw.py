"""Bouw een Evolutie-v2-film in de FILMDATA-straat.
Gebruik: python3 evo_bouw.py <N> [--statisch]
  scenes.js = engine-kop (scenes.js r.1-32) + SCENES + lib_bio + lib_evo + film-tekenbestanden + lib_dieren + lib_micro_evo + sb<N>.js + scenes_e<N>.js + uitzetters
  --statisch: maakt eerst scenes_e<N>.js waarin elk segment gewoon zijn keyframe tekent (rooktest)
Woordtijden: ontbreekt words/<sid>.json, dan fakewords (2,4 w/s)."""
import json, os, sys, subprocess
HW = os.path.expanduser('~/hw'); EVO = os.path.expanduser('~/evo2/src')
n = int(sys.argv[1]); d = f'{HW}/e{n}'
TEKEN = {1: ['teken_evo1'], 2: ['teken_evo2', 'teken_evo3', 'vragen23'], 3: ['teken_evo2', 'teken_evo3', 'vragen23'], 4: ['teken_evo4'],
         5: ['teken_evo5'], 6: ['teken_evo6'], 7: ['teken_evo7'], 8: ['teken_evo7', 'teken_evo8']}
def rd(p): return open(p, encoding='utf-8').read()
mp = json.load(open(f'{d}/map.json'))
if '--statisch' in sys.argv:
    L = [f'// rooktest: elk segment tekent zijn keyframe uit sb{n}.js', 'Object.assign(SCENES, {']
    for sid, seg in mp.items():
        if sid.endswith('_kaart') or seg == 'card': continue
        if seg.startswith('s') and seg != 'title':
            L.append(f'  {seg}(ctx, t, q) {{ SB{n}.{sid}(ctx, t); }},')
    L.append('});'); open(f'{d}/scenes_e{n}.js', 'w', encoding='utf-8').write('\n'.join(L) + '\n')
kop = ''.join(rd(f'{HW}/engine/scenes.js').splitlines(True)[:32])
delen = [kop, 'const SCENES = {};', rd(f'{HW}/evolib/lib_bio.js'), rd(f'{HW}/evolib/lib_evo.js')]
delen += [rd(f'{EVO}/{t}.js') for t in TEKEN[n]]
delen += [rd(f'{HW}/evolib/lib_dieren.js'), rd(f'{HW}/evolib/lib_micro_evo.js')]
eigen = f'{d}/teken_e{n}.js'
if os.path.exists(eigen): delen.append(rd(eigen))
delen += [rd(f'{EVO}/sb{n}.js'), rd(f'{d}/scenes_e{n}.js'),
          '// de speler tekent zelf de reeks/niveau-regel linksboven en de vwo-markering\nevoTag = function () {}; vwoMarker = function () {};']
open(f'{d}/scenes.js', 'w', encoding='utf-8').write('\n'.join(delen) + '\n')
subprocess.run(['python3', f'{HW}/engine/fakewords.py', d], check=True, capture_output=True)
subprocess.run(['python3', 'film.py'], cwd=d, check=True, capture_output=True)
for s in ['build_data.py', 'build.py']:
    r = subprocess.run(['python3', f'{HW}/engine/{s}', d], capture_output=True, text=True); print(r.stdout.strip()[-300:], r.stderr.strip()[-600:])
