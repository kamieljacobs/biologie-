"""Meet de houdingen van de wolfpop uit punten.json (gewrichtspunten op modelblad.png).

python3 referentie/wolfpop/meet_houdingen.py   (vanuit /home/claude/evo2)

- Houding 'staan' = ruststand: geeft botlengtes, rusthoeken en aanhechtingen.
- Andere houdingen: hoeken 'achtervolgen' de gekozen punten vanaf het al berekende ouderpunt
  (botlengtes blijven vast); poten met 2-bots-IK zodat de kogel precies op het gekozen punt staat
  (elleboog naar achter, knie naar voren).
- Schrijft het blok tussen // <<TABELLEN en // TABELLEN>> in src/wolf_pop.js en
  de omtrekken (alleen voor het testvel) tussen // <<OMTREK en // OMTREK>> in src/tv_wolfpop.js.
"""
import json, math, os, re
HIER = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HIER, '..', '..'))
P = json.load(open(os.path.join(HIER, 'punten.json')))
OMTREK = json.load(open(os.path.join(HIER, 'contouren_px.json')))
R = P['staan']; G0 = R['grond']; X0 = R['x0']
K = (G0 - 62) / 80.0          # px per cm: schoft (vacht) op y=62, schofthoogte 80 cm

# bot: naam, ouder, rust-beginpunt, rust-eindpunt, punt-in-houding voor eindpunt
BOTEN = [
  ('rompV', None, 'midrug', 'nekBasis'), ('rompA', None, 'midrug', 'kruis'),
  ('nek', 'rompV', 'nekBasis', 'kop'), ('kop', 'nek', 'kop', 'neus'), ('kaak', 'kop', 'kaak', 'kin'),
  ('scap', 'rompV', 'schoft', 'schouder'), ('hum', 'scap', 'schouder', 'elleboog'), ('rad', 'hum', 'elleboog', 'pols'),
  ('mc', 'rad', 'pols', 'vkogel'), ('vp', 'mc', 'vkogel', 'vteen'),
  ('scapF', 'rompV', 'schoft', 'schouder'), ('humF', 'scapF', 'schouder', 'elleboog'), ('radF', 'humF', 'elleboog', 'pols'),
  ('mcF', 'radF', 'pols', 'vkogel'), ('vpF', 'mcF', 'vkogel', 'vteen'),
  ('dij', 'rompA', 'heup', 'knie'), ('schn', 'dij', 'knie', 'hak'), ('mt', 'schn', 'hak', 'akogel'), ('ap', 'mt', 'akogel', 'ateen'),
  ('dijF', 'rompA', 'heup', 'knie'), ('schnF', 'dijF', 'knie', 'hak'), ('mtF', 'schnF', 'hak', 'akogel'), ('apF', 'mtF', 'akogel', 'ateen'),
  ('st0', 'rompA', 'staart0', 'staart1'), ('st1', 'st0', 'staart1', 'staart2'), ('st2', 'st1', 'staart2', 'staart3'),
]
B = {b[0]: b for b in BOTEN}
cm = lambda p: [(p[0] - X0) / K, (p[1] - G0) / K]
J = {k: cm(v) for k, v in R.items() if isinstance(v, list)}
sub = lambda a, b: [a[0] - b[0], a[1] - b[1]]
ang = lambda v: math.atan2(v[1], v[0])
ln = lambda v: math.hypot(v[0], v[1])
rot = lambda v, a: [v[0] * math.cos(a) - v[1] * math.sin(a), v[0] * math.sin(a) + v[1] * math.cos(a)]
L, A0, OFF = {}, {}, {}
for n, par, j0, j1 in BOTEN:
    v = sub(J[j1], J[j0]); L[n] = ln(v); A0[n] = ang(v)
    OFF[n] = [0, 0] if par is None else rot(sub(J[j0], J[B[par][2]]), -A0[par])

def ik(p0, t, l1, l2, teken):
    d = sub(t, p0); dd = ln(d); rek = dd / (l1 + l2)
    dd = max(abs(l1 - l2) + 1e-3, min(l1 + l2 - 1e-3, dd))
    al = math.acos(max(-1, min(1, (l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd))))
    a1 = ang(d) + teken * al; j = [p0[0] + l1 * math.cos(a1), p0[1] + l1 * math.sin(a1)]
    return a1, ang(sub(t, j)), rek

def meet(naam):
    H = P[naam]; g = H['grond']; ox = H['midrug'][0] - (R['midrug'][0] - X0)
    c = lambda p: [(p[0] - ox) / K, (p[1] - g) / K]
    Q = {k: c(v) for k, v in H.items() if isinstance(v, list)}
    piv, A, rek = {}, {}, {}
    root = Q['midrug']
    def pivot(n):
        par = B[n][1]
        if par is None: return root
        return [piv[par][0] + rot(OFF[n], A[par])[0], piv[par][1] + rot(OFF[n], A[par])[1]]
    def eind(n): return [piv[n][0] + L[n] * math.cos(A[n]), piv[n][1] + L[n] * math.sin(A[n])]
    def zet(n, a): piv[n] = pivot(n); A[n] = a
    def jaag(n, doel): piv[n] = pivot(n); A[n] = ang(sub(Q[doel], piv[n]))
    jaag('rompV', 'nekBasis'); jaag('rompA', 'kruis'); jaag('nek', 'kop'); jaag('kop', 'neus')
    zet('kaak', A['kop'] + (A0['kaak'] - A0['kop']))
    for zij in ['', 'F']:
        zet('scap' + zij, A0['scap'] + A['rompV'] - A0['rompV'])
        S = eind('scap' + zij)
        e = lambda k: Q.get(k + zij, Q.get(k))
        amc = ang(sub(e('vkogel'), e('pols'))); T = sub(e('vkogel'), [L['mc'] * math.cos(amc), L['mc'] * math.sin(amc)])
        a1, a2, r = ik(S, T, L['hum'], L['rad'], +1); rek['V' + zij] = r
        zet('hum' + zij, a1); zet('rad' + zij, a2); zet('mc' + zij, amc); zet('vp' + zij, ang(sub(e('vteen'), e('vkogel'))))
        zet('dij' + zij, A0['dij'] + A['rompA'] - A0['rompA']); Hp = piv['dij' + zij]
        amt = ang(sub(e('akogel'), e('hak'))); T = sub(e('akogel'), [L['mt'] * math.cos(amt), L['mt'] * math.sin(amt)])
        a1, a2, r = ik(Hp, T, L['dij'], L['schn'], -1); rek['A' + zij] = r
        zet('dij' + zij, a1); zet('schn' + zij, a2); zet('mt' + zij, amt); zet('ap' + zij, ang(sub(e('ateen'), e('akogel'))))
    jaag('st0', 'staart1'); jaag('st1', 'staart2'); jaag('st2', 'staart3')
    return {'R': [round(root[0], 2), round(root[1], 2)], 'A': {n: round(math.degrees(A[n]), 1) for n in A}, 'rek': rek}, ox, g

def js(o): return json.dumps(o, separators=(',', ':'))
tab = {}; omtrek = {}
for i, naam in enumerate(['staan', 'contact', 'passeer', 'draf', 'zitten', 'liggen']):
    t, ox, g = meet(naam); tab[naam] = {'R': t['R'], 'A': t['A']}
    print(naam, 'rek (afstand/beenlengte, >1 = te kort):', {k: round(v, 2) for k, v in t['rek'].items()})
    omtrek[naam] = [[round((x - ox) / K, 1), round((y - g) / K, 1)] for x, y in OMTREK[i]['pts']]
blok = ('// <<TABELLEN (gegenereerd door referentie/wolfpop/meet_houdingen.py; niet met de hand aanpassen)\n'
        f'const WP_K = {K:.4f}, WP_X0 = {X0}, WP_G0 = {G0}; // px op modelblad -> cm\n'
        'const WP_BOTEN = ' + js([[n, par, j0, j1] for n, par, j0, j1 in BOTEN]) + ';\n'
        'const WP_J = ' + js({k: [round(v[0], 3), round(v[1], 3)] for k, v in J.items()}) + ';\n'
        'const WP_HOUDING = ' + js(tab) + ';\n// TABELLEN>>')
f = os.path.join(ROOT, 'src', 'wolf_pop.js'); s = open(f).read()
s = re.sub(r'// <<TABELLEN.*?// TABELLEN>>', lambda m: blok, s, flags=re.S); open(f, 'w').write(s)
f = os.path.join(ROOT, 'src', 'tv_wolfpop.js')
if os.path.exists(f):
    s = open(f).read(); blok2 = '// <<OMTREK (uit modelblad.png, alleen voor het testvel)\nconst WP_OMTREK = ' + js(omtrek) + ';\n// OMTREK>>'
    s = re.sub(r'// <<OMTREK.*?// OMTREK>>', lambda m: blok2, s, flags=re.S); open(f, 'w').write(s)
print('K =', round(K, 3), 'px/cm; lengtes (cm):', {n: round(L[n], 1) for n in L})
