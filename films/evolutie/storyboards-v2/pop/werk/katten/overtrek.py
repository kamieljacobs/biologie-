"""Trekt de VLAKKE onderste rij van tijger.png / huiskat.png over als vectorpaden per deel (zone) en per toon.
python3 overtrek.py  -> schrijft het blok // <<OVERTREK ... // OVERTREK>> in src/pop_katten.js
Per deel: basis = silhouet ∩ zone; lagen = (toonmasker ∩ zone) als polygonen, toon = dichtstbijzijnde paletkleur. Geen pixels, alleen paden."""
import cv2, numpy as np, json, re, os
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(H, '..', '..', '..', '..'))
def hx(h): h = h.lstrip('#'); return np.array([int(h[4:6], 16), int(h[2:4], 16), int(h[0:2], 16)], float)  # BGR
def trace(img, box, pal, zones, basisKleur, minA=10, eps=0.8, sluit=3):
    x0, y0, w, h = box; im = img.astype(float); bg = np.median(im[y0 + 2:y0 + 10, x0 + 2:x0 + 30].reshape(-1, 3), axis=0)
    sil = (np.linalg.norm(im - bg, axis=2) > 38).astype(np.uint8); sil[:y0] = 0; sil[y0 + h + 3:] = 0; sil[:, :x0] = 0; sil[:, x0 + w + 2:] = 0
    sil = cv2.morphologyEx(sil, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8)); sil = cv2.morphologyEx(sil, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))  # snorharen weg
    names = list(pal); P = np.stack([hx(pal[n]) for n in names] + [bg]); d = np.linalg.norm(im[:, :, None, :] - P[None, None], axis=3); cls = d.argmin(axis=2)
    out = {}
    for zn, z in zones.items():
        zm = np.zeros(sil.shape, np.uint8); cv2.fillPoly(zm, [np.array(z['p'], np.int32)], 1)
        if z.get('niet'):
            for q in z['niet']: cv2.fillPoly(zm, [np.array(q, np.int32)], 0)
        m = sil & zm; m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8)); lagen = []  # dunne repen langs de zonegrens weg
        cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        cs = [c for c in cs if cv2.contourArea(c) > 40]
        for c in sorted(cs, key=cv2.contourArea, reverse=True)[:1]:
            lagen.append({'c': z.get('basis', basisKleur), 'p': cv2.approxPolyDP(c, eps, True)[:, 0, :].tolist()})
        for ci, n in enumerate(names):
            if n == z.get('basis', basisKleur) or n in z.get('zonder', []): continue
            samen = z.get('samen', {}); 
            if any(n in v for v in samen.values()) or (z.get('lum') and any(n in v for k2, v in z.get('lumweg', {}).items())): continue  # opgenomen in een andere toon
            mi = (cv2.erode(sil, np.ones((3, 3), np.uint8), iterations=z.get('binnen', 0)) & zm) if z.get('binnen') else m  # alleen langs het silhouet, niet langs de zonegrens (gaf een reep basiskleur)  # donkere antialias-rand langs het silhouet niet meenemen
            mc = (np.isin(cls, [ci] + [names.index(x) for x in samen.get(n, [])]) & (mi > 0)).astype(np.uint8)
            islum = bool(z.get('lum') and n in z['lum'])
            if islum: mc = ((im.mean(axis=2) < z['lum'][n]) & (mi > 0)).astype(np.uint8)  # vlekken op helderheid
            elif z.get('groot'): k = z['groot']; mc = cv2.morphologyEx(cv2.morphologyEx(mc, cv2.MORPH_CLOSE, np.ones((k, k), np.uint8)), cv2.MORPH_OPEN, np.ones((k, k), np.uint8))  # alleen de grote vlakken
            if sluit: mc = cv2.morphologyEx(mc, cv2.MORPH_CLOSE, np.ones((sluit, sluit), np.uint8)); mc = cv2.morphologyEx(mc, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8)) if sluit > 1 else mc
            if z.get('dil', 1): mc = cv2.dilate(mc, np.ones((2, 2), np.uint8)) & m  # 1 px overlap: geen naden tussen de tonen
            cs, _ = cv2.findContours(mc, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
            for c in cs:
                if cv2.contourArea(c) < (minA if islum or not z.get('groot') else max(minA, z['groot'] ** 2 * 3 if z['groot'] > 2 else minA)) or cv2.contourArea(c) < 1.1 * cv2.arcLength(c, True) * 0.5: continue  # te kleine of te dunne repen weg
                p = cv2.approxPolyDP(c, eps, True)[:, 0, :].tolist()
                if len(p) >= 3: lagen.append({'c': n, 'p': p})
        # volgorde: basis, lichte tonen, donkere tonen (strepen bovenop)
        orde = z.get('orde', names); lagen = lagen[:1] + sorted(lagen[1:], key=lambda l: orde.index(l['c']) if l['c'] in orde else 99)
        out[zn] = lagen
    return out
CFG = json.load(open(os.path.join(H, 'overtrek.json')))
res = {}
for dier, c in CFG.items():
    img = cv2.imread(os.path.join(H, '..', c['plaat'])); r = {}
    for deel, d in c['delen'].items():
        t = trace(img, d['box'], c['pal'], {deel: d}, c['basis'], d.get('minA', 10), d.get('eps', 0.8), d.get('sluit', 3))
        r[deel] = t[deel]; print(dier, deel, len(t[deel]), 'lagen', sum(len(l['p']) for l in t[deel]), 'punten')
    res[dier] = r
blok = '// <<OVERTREK (gegenereerd door referentie/pop/katten/werk/overtrek.py uit de vlakke rij; niet met de hand aanpassen)\nconst KAT_OVERTREK = ' + json.dumps(res, separators=(',', ':')) + ';\n// OVERTREK>>'
f = os.path.join(ROOT, 'src', 'pop_katten.js'); s = open(f).read()
if '// <<OVERTREK' in s: s = re.sub(r'// <<OVERTREK.*?// OVERTREK>>', lambda m: blok, s, flags=re.S)
else: s = s.replace('// =====================================================================================================\n// LEEUW', blok + '\n\n// =====================================================================================================\n// LEEUW', 1)
open(f, 'w').write(s); print('blok', len(blok))
