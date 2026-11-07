"""Trekt de VLAKKE rij van nandoe.png / gordeldier.png / schildpad.png over als vectorpaden per deel en per toon.
Uitvoer in cm (oorsprong = grondpunt 'ox', y omhoog negatief), blok // <<DARWIN_OVERTREK in src/pop_darwin.js.
python3 overtrek.py   (config in overtrek_cfg.py)"""
import cv2, numpy as np, json, re, os, sys
from overtrek_cfg import CFG
H = os.path.dirname(os.path.abspath(__file__))  # platen: zet nandoe.png, gordeldier.png, schildpad.png (uit ../*.webp) naast dit script
def hx(h): h=h.lstrip('#'); return np.array([int(h[4:6],16),int(h[2:4],16),int(h[0:2],16)],float)
def silhouet(im, box, bg):
    x0,y0,w,h = box; sil = (np.linalg.norm(im.astype(float)-bg,axis=2) > 30).astype(np.uint8)
    out = np.zeros_like(sil); out[y0:y0+h+2, x0:x0+w+2] = sil[y0:y0+h+2, x0:x0+w+2]
    out = cv2.morphologyEx(out, cv2.MORPH_CLOSE, np.ones((3,3),np.uint8)); out = cv2.morphologyEx(out, cv2.MORPH_OPEN, np.ones((3,3),np.uint8))
    return out
def poly(mask, eps, minA):
    cs,_ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE); r=[]
    for c in cs:
        if cv2.contourArea(c) < minA: continue
        p = cv2.approxPolyDP(c, eps, True)[:,0,:].tolist()
        if len(p) >= 3: r.append(p)
    return r
def doe(fig):
    im = cv2.imread(os.path.join(H, fig['plaat'])); bg = np.median(im[5:15,5:200].reshape(-1,3),axis=0)
    sil = silhouet(im, fig['box'], bg); ground = fig['grond']; K = fig['K']; ox = fig['ox']
    if fig.get('grondlijn'): sil[ground-1:ground+3] = 0
    names = list(fig['pal']); P = np.stack([hx(fig['pal'][n][0]) for n in names]+[bg])
    # elke klasse kan meerdere bronkleuren hebben
    cols=[]; idx=[]
    for i,n in enumerate(names):
        for c in fig['pal'][n]: cols.append(hx(c)); idx.append(i)
    cols.append(bg); idx.append(len(names)); P = np.stack(cols); idx=np.array(idx)
    d = np.linalg.norm(im.astype(float)[:,:,None,:]-P[None,None],axis=3); cls = idx[d.argmin(axis=2)]
    tocm = lambda p: [round((p[0]-ox)/K,2), round((p[1]-ground)/K,2)]
    out = {}
    for dn, z in fig['delen'].items():
        zm = np.zeros(sil.shape, np.uint8); cv2.fillPoly(zm, [np.array(z['p'],np.int32)], 1)
        for q in z.get('niet', []): cv2.fillPoly(zm, [np.array(q,np.int32)], 0)
        m = sil & zm
        if z.get('open',3): m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((z.get('open',3),)*2,np.uint8))
        mb = m if not z.get('basisKlassen') else (m & np.isin(cls, [names.index(n) for n in z['basisKlassen']]).astype(np.uint8))
        if z.get('basisKlassen'): mb = cv2.morphologyEx(cv2.morphologyEx(mb, cv2.MORPH_CLOSE, np.ones((5,5),np.uint8)), cv2.MORPH_OPEN, np.ones((3,3),np.uint8))
        basis = poly(mb, z.get('eps',0.8), 30); basis = sorted(basis, key=lambda p: -cv2.contourArea(np.array(p,np.int32)))[:z.get('nbasis',1)]
        lagen = [{'c': z['basis'], 'p': [tocm(p) for p in b]} for b in basis]
        for ci,n in enumerate(names):
            if n == z['basis'] or n in z.get('zonder',[]): continue
            mc = ((cls==ci) & ((mb if z.get('basisKlassen') else m)>0)).astype(np.uint8)
            g = z.get('groot',{}).get(n, z.get('grootAlle', 0))
            if g: mc = cv2.morphologyEx(cv2.morphologyEx(mc, cv2.MORPH_CLOSE, np.ones((g,g),np.uint8)), cv2.MORPH_OPEN, np.ones((g,g),np.uint8))
            else: mc = cv2.morphologyEx(mc, cv2.MORPH_CLOSE, np.ones((2,2),np.uint8))
            mc = cv2.dilate(mc, np.ones((2,2),np.uint8)) & (mb if z.get('basisKlassen') else m)
            minA = z.get('minA',{}).get(n, 14)
            for p in poly(mc, z.get('eps',0.8), minA): lagen.append({'c': n, 'p': [tocm(q) for q in p]})
        orde = z.get('orde', names); lagen = lagen[:len(basis)] + sorted(lagen[len(basis):], key=lambda l: orde.index(l['c']) if l['c'] in orde else 99)
        out[dn] = lagen; print(fig['naam'], dn, len(lagen), 'lagen', sum(len(l['p']) for l in lagen), 'punten')
    return out
res = {f['naam']: doe(f) for f in CFG}
blok = '// <<DARWIN_OVERTREK (gegenereerd door referentie/dieren/darwin/werk/overtrek.py uit de vlakke rij; niet met de hand aanpassen)\nconst DARWIN_OVERTREK = ' + json.dumps(res, separators=(',',':')) + ';\n// DARWIN_OVERTREK>>'
f = os.environ.get('POP_DARWIN', os.path.expanduser('~/evo2/src/pop_darwin.js'))  # werkmap; daarna naar films/evolutie/storyboards-v2/src kopieren
s = open(f).read() if os.path.exists(f) else ''
if '// <<DARWIN_OVERTREK' in s: s = re.sub(r'// <<DARWIN_OVERTREK.*?// DARWIN_OVERTREK>>', lambda m: blok, s, flags=re.S)
else: s = blok + '\n' + s
open(f,'w').write(s); print('blok', len(blok))
