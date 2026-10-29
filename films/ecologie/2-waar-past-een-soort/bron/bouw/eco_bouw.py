"""Bouw een Ecologie-v2-film in de FILMDATA-straat.
Gebruik: python3 eco_bouw.py <N> [--statisch]
  scenes.js = engine-kop (scenes.js r.1-32) + SCENES + ecolib (base, dier_basis, lib_bio, lib_evo, dierbestanden, lib_eco)
              + film-tekenbestanden + teken_e<N>.js (eigen, optioneel) + sb<N>.js + scenes_e<N>.js + uitzetters
  --statisch: maakt eerst scenes_e<N>.js waarin elk segment gewoon zijn keyframe tekent (rooktest), plus title() = het beeld van de titelkaart
Na het bouwen opent een headless browser de standalone-pagina en tekent elk onderdeel op 50 % (titel, kaarten, alinea's, vraagkaarten):
'ERRORS […]' bij JS-fouten, anders 'rooktest ok'.
Woordtijden: ontbreekt words/<sid>.json, dan fakewords (2,4 w/s).
Aangepast van evo_bouw.py: dieren uit losse pop-bestanden (laadvolgorde als render.py van de storyboards),
lege stubs voor berkenspanner en rups vóór dieren_overig.js, base.js' _mix hernoemd zodat lib_cast's _mix blijft (zoals in render.html),
evoTag/vwoMarker/ecoTag uitgezet (de speler tekent reeks- en niveauregel zelf)."""
import json, os, sys, subprocess, asyncio
HW = '/root/hwe'; ECO = '/root/eco2/src'
n = int(sys.argv[1]); d = f'{HW}/e{n}'
TEKEN = {1: ['teken_eco1'], 2: ['teken_eco1', 'teken_eco2'], 3: ['teken_eco3'], 4: ['teken_eco4'], 5: ['teken_eco5'],
         6: ['e11_aarde', 'teken_eco6'], 7: ['teken_eco7'], 8: ['teken_eco8']}
ECOLIB = ['base', 'dier_basis', 'lib_bio', 'lib_evo', 'dieren_zoog', '!stub', 'dieren_overig', 'wolf_pop', 'pop_honden', 'pop_katten',
          'pop_hoef', 'pop_vogels', 'pop_darwin', 'pop_eco_rovers', 'pop_eco_hoef', 'pop_eco_klein', 'pop_eco_klein2', 'lib_eco']
STUB = '// stubs: dieren_overig.js wikkelt berkenspanner (teken_evo3.js) en rups (teken_evo2.js); die zijn hier niet geladen\nfunction berkenspanner() {}\nfunction rups() {}'
def rd(p): return open(p, encoding='utf-8').read()
mp = json.load(open(f'{d}/map.json'))
segs = json.load(open(f'{d}/segments.json', encoding='utf-8')); kind = {s['id']: s['kind'] for s in segs}
if '--statisch' in sys.argv:
    titel = [k for k, v in mp.items() if kind.get(v) == 'title'][0]
    L = [f'// rooktest: elk segment tekent zijn keyframe uit sb{n}.js', 'Object.assign(SCENES, {',
         f'  title(ctx, t) {{ const o = ecoTitelKaart; ecoTitelKaart = (c, f, ti, v, beeld) => {{ if (beeld) beeld(c); }}; try {{ SB{n}.{titel}(ctx, t); }} finally {{ ecoTitelKaart = o; }} }},']
    for sid, seg in mp.items():
        if sid.endswith('_kaart') or kind.get(seg) != 'speech': continue
        L.append(f'  {seg}(ctx, t, q) {{ SB{n}.{sid}(ctx, t); }},')
    L.append('});'); open(f'{d}/scenes_e{n}.js', 'w', encoding='utf-8').write('\n'.join(L) + '\n')
kop = ''.join(rd(f'{HW}/engine/scenes.js').splitlines(True)[:32])
delen = [kop, 'const SCENES = {};']
for b in ECOLIB:
    if b == '!stub': delen.append(STUB); continue
    s = rd(f'{HW}/ecolib/{b}.js')
    if b == 'base': s = s.replace('function _mix(hex, k, met)', 'function _mixBase(hex, k, met)')   # lib_cast.js levert _mix (zoals in render.html)
    delen.append(s)
delen += [rd(f'{ECO}/{t}.js') for t in TEKEN[n]]
eigen = f'{d}/teken_e{n}.js'
if os.path.exists(eigen): delen.append(rd(eigen))
delen += [rd(f'{ECO}/sb{n}.js'), rd(f'{d}/scenes_e{n}.js'),
          '// de speler tekent zelf de reeks/niveau-regel linksboven en de vwo-markering\nevoTag = function () {}; vwoMarker = function () {}; ecoTag = function () {};']
open(f'{d}/scenes.js', 'w', encoding='utf-8').write('\n'.join(delen) + '\n')
subprocess.run(['python3', f'{HW}/engine/fakewords.py', d], check=True, capture_output=True)
subprocess.run(['python3', 'film.py'], cwd=d, check=True, capture_output=True)
for s in ['build_data.py', 'build.py']:
    r = subprocess.run(['python3', f'{HW}/engine/{s}', d], capture_output=True, text=True); print(r.stdout.strip()[-300:], r.stderr.strip()[-600:])

async def rooktest():
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)[:200])); pg.on('console', lambda m: errs.append(m.text[:200]) if m.type == 'error' else None)
        await pg.goto('file://' + os.path.abspath(f'{d}/film/standalone.html')); await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(500)
        items = await pg.evaluate('__items()'); fout = []
        for it in items:
            key = it['id'] or ('title' if it['type'] == 'title' else 'end' if it['type'] == 'end' else 'card:' + it['chapter'])
            r = await pg.evaluate(f"(()=>{{ try {{ return __still({json.dumps(key)}, {it['dur'] * 0.5:.2f}) ? '' : 'niet gevonden'; }} catch (e) {{ return String(e); }} }})()")
            if r: fout.append(f'{key}: {r[:160]}')
        await pg.wait_for_timeout(200); await b.close()
        alles = fout + [e for e in errs if 'favicon' not in e and 'ERR_FILE_NOT_FOUND' not in e and 'Fetch API cannot load' not in e]
        print(('ERRORS ' + json.dumps(alles[:12], ensure_ascii=False)) if alles else f'rooktest ok ({len(items)} onderdelen)')
asyncio.run(rooktest())
