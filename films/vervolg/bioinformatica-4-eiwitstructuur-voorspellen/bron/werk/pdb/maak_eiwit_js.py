"""5DFR (E. coli DHFR, Cα) -> eiwit_5dfr.js: gecentreerde, gedraaide Cα-coördinaten (Å), volgorde, secundaire structuur.
Bron: openmm/openmm examples/benchmarks/5dfr_minimized.pdb (commit c403e95, energie-geminimaliseerde 5DFR, 159 aminozuren).
Secundaire structuur uit de Cα-geometrie (helix: i→i+2/3/4 = 5,5/5,3/6,4 Å; streng: ladders met buren < 5,8 Å),
gecontroleerd tegen PDB-101 (acht centrale β-strengen, vier α-helices). Gebruik: python3 -I maak_eiwit_js.py <pdb> <uit.js>"""
import sys, json, numpy as np
src, uit = sys.argv[1], sys.argv[2]
AA = {'ALA':'A','ARG':'R','ASN':'N','ASP':'D','CYS':'C','GLN':'Q','GLU':'E','GLY':'G','HIS':'H','HID':'H','HIE':'H','HIP':'H','ILE':'I','LEU':'L','LYS':'K','MET':'M','PHE':'F','PRO':'P','SER':'S','THR':'T','TRP':'W','TYR':'Y','VAL':'V'}
P, seq = [], []
for l in open(src):
    if l.startswith('ATOM') and l[12:16].strip() == 'CA':
        P.append([float(l[30:38]), float(l[38:46]), float(l[46:54])]); seq.append(AA[l[17:20].strip()])
P = np.array(P); N = len(P); P -= P.mean(0)
D = np.linalg.norm(P[:, None] - P[None], axis=2)
ss = ['l'] * N
for i in range(N - 4):
    if abs(D[i, i+2] - 5.5) < 0.5 and abs(D[i, i+3] - 5.3) < 0.5 and abs(D[i, i+4] - 6.4) < 0.6:
        for k in range(i, i + 5): ss[k] = 'h'
cut = 5.8
for i in range(1, N - 1):
    if ss[i] == 'h': continue
    for j in range(1, N - 1):
        if abs(i - j) < 4 or ss[j] == 'h': continue
        if (D[i, j] < cut and ((D[i-1, j+1] < cut and D[i+1, j-1] < cut) or (D[i-1, j-1] < cut and D[i+1, j+1] < cut))) or (D[i, j] < cut + .7 and D[i-1, j-1] < cut + .7 and D[i+1, j+1] < cut + .7):
            ss[i] = 's'; break
def runs(c):
    out = []; i = 0
    while i < N:
        if ss[i] == c:
            j = i
            while j < N and ss[j] == c: j += 1
            out.append((i, j - 1)); i = j
        else: i += 1
    return out
for a, b in runs('s'):
    if b - a + 1 < 3:
        for k in range(a, b + 1): ss[k] = 'l'
for a, b in runs('h'):
    if b - a + 1 < 6:
        for k in range(a, b + 1): ss[k] = 'l'
helices, strengen = runs('h'), runs('s')
# holte = plek waar folaat/trimethoprim binden (actief centrum): Ile5, Ala7, Met20, Asp27, Leu28, Phe31, Ile94, Thr113
site = [5, 7, 20, 27, 28, 31, 94, 113]
pc = P[[s - 1 for s in site]].mean(0)
# opening van de holte: richting met de minste Cα in een kegel van 35° tot 16 Å vanaf het midden van de holte
best, UIT = 1e9, None
rng = np.random.default_rng(1)
dirs = rng.normal(size=(4000, 3)); dirs /= np.linalg.norm(dirs, axis=1)[:, None]
V = P - pc; Vn = np.linalg.norm(V, axis=1)
for d in dirs:
    cosang = (V @ d) / np.maximum(Vn, 1e-6)
    n = np.sum((cosang > np.cos(np.radians(35))) & (Vn < 16))
    if n < best: best, UIT = n, d
# draaien: opening naar de kijker (iets omhoog) bij de standaardcamera yaw 0,95, pitch −0,32; lange as horizontaal
yaw, pitch = 0.95, -0.32
cy, sy, cp, sp = np.cos(yaw), np.sin(yaw), np.cos(pitch), np.sin(pitch)
Ry = np.array([[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]])
Rx = np.array([[1, 0, 0], [0, cp, -sp], [0, sp, cp]])  # y2 = y cp − z1 sp ; z2 = y sp + z1 cp
Rc = Rx @ Ry
e3 = np.array([0.18, 0.42, 1.0]); e3 /= np.linalg.norm(e3)
cov = np.cov((P - (P @ UIT)[:, None] * UIT).T); w, vecs = np.linalg.eigh(cov); ax = vecs[:, -1]
u3 = UIT; u1 = ax - (ax @ u3) * u3; u1 /= np.linalg.norm(u1); u2 = np.cross(u3, u1)
e1 = np.array([1.0, 0, 0]); e1 -= (e1 @ e3) * e3; e1 /= np.linalg.norm(e1); e2 = np.cross(e3, e1)
F = np.stack([e1, e2, e3], 1); G = np.stack([u1, u2, u3], 1)
M = Rc.T @ F @ G.T
Q = P @ M.T; pcQ = M @ pc; UITq = M @ UIT
out = {
  'bron': '5DFR (E. coli dihydrofolaatreductase, zonder ligand; Bystroff & Kraut 1991), Cα uit openmm examples/benchmarks/5dfr_minimized.pdb @c403e95',
  'P': [[round(float(v), 2) for v in p] for p in Q], 'SEQ': ''.join(seq), 'SS': ''.join(ss),
  'helices': [[a, b] for a, b in helices], 'strengen': [[a, b] for a, b in strengen],
  'POCKET': [round(float(v), 2) for v in pcQ], 'UIT': [round(float(v), 3) for v in UITq], 'site': site }
js = '// gegenereerd door werk/pdb/maak_eiwit_js.py (uitvoer: teken_bi4_5dfr.js) — niet met de hand aanpassen\n'
js += '// ' + out['bron'] + '\n'
js += 'const PDB5DFR = ' + json.dumps(out, separators=(',', ':')) + ';\n'
open(uit, 'w').write(js)
print(N, 'Cα;', 'helices', [(a+1, b+1) for a, b in helices], 'strengen', [(a+1, b+1) for a, b in strengen], 'opening: Cα in kegel', best)
