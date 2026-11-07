"""Knipt de 16 ronde themapictogrammen uit een ElevenLabs-vel (raster 6x3 op 16:9, laatste twee vakken leeg).
Gebruik: python3 scripts/iconen_knippen.py <vel.png> <uitmap> [voorbeeld.png] [--ids a,b,c]
(--ids: andere volgorde/namen, bv. de vakgebieden van vervolg.html; vakken na de laatste id worden overgeslagen)
Zoekt per vak de gouden rand, knipt net binnen de rand en maakt er een ronde webp (192 px) van."""
import sys, os
import numpy as np
from PIL import Image, ImageDraw
IDS = ['cellen','dna','stofwisseling','voeding','transport','gaswisseling','afweer','regeling','voortplanting','erfelijkheid','evolutie','gedrag','planten','ecologie','milieu','examens']
if '--ids' in sys.argv:
    k = sys.argv.index('--ids'); IDS = sys.argv[k + 1].split(','); del sys.argv[k:k + 2]
vel, uit = sys.argv[1], sys.argv[2]
os.makedirs(uit, exist_ok=True)
im = Image.open(vel).convert('RGB'); a = np.asarray(im).astype(int); H, W = a.shape[:2]
R, G, B = a[..., 0], a[..., 1], a[..., 2]
goud = (R > 140) & (G > 100) & (B < 110) & (R - B > 70)
def grenzen(p, n, lengte):
    # n vakken: zoek tussen de vakken het minimum van het goudprofiel
    stap = lengte / n; g = [0]
    for k in range(1, n):
        lo, hi = int(stap * k - stap * .12), int(stap * k + stap * .12)
        v = p[lo:hi]; laag = np.nonzero(v <= v.min() + 1)[0]
        g.append(lo + int(laag.mean()))  # midden van de opening tussen twee cirkels
    return g + [lengte]
kol = grenzen(goud.sum(0), 6, W); rij = grenzen(goud.sum(1), 3, H)
blad = Image.new('RGB', (8 * 110, 2 * 110), 'white')
for k, i in enumerate(IDS):
    c0, c1 = kol[k % 6], kol[k % 6 + 1]; r0, r1 = rij[k // 6], rij[k // 6 + 1]
    # cirkelfit (kleinste kwadraten) op de goudpixels in en rond het vak
    m_ = 25; y0, y1 = max(0, r0 - m_), min(H, r1 + m_); x0, x1 = max(0, c0 - m_), min(W, c1 + m_)
    Y, X = np.nonzero(goud[y0:y1, x0:x1]); X = X + x0; Y = Y + y0
    gx, gy = (c0 + c1) / 2, (r0 + r1) / 2; R0 = min(c1 - c0, r1 - r0) / 2
    for _ in range(6):  # alleen punten dicht bij de huidige ring meenemen, dan opnieuw fitten
        d = np.hypot(X - gx, Y - gy); sel = np.abs(d - R0) < max(8, R0 * .12)
        A = np.c_[2 * X[sel], 2 * Y[sel], np.ones(sel.sum())]; b = X[sel] ** 2 + Y[sel] ** 2
        gx, gy, c = np.linalg.lstsq(A, b, rcond=None)[0]; R0 = np.sqrt(c + gx ** 2 + gy ** 2)
    cx, cy, rr = gx, gy, R0 - 10
    t = im.crop((round(cx - rr), round(cy - rr), round(cx + rr), round(cy + rr))).resize((264, 264), Image.LANCZOS)
    m = Image.new('L', (768, 768), 0); ImageDraw.Draw(m).ellipse([0, 0, 767, 767], fill=255); m = m.resize((264, 264), Image.LANCZOS)
    t.putalpha(m); t.save(os.path.join(uit, i + '.webp'), quality=86)
    k2 = t.resize((100, 100)); blad.paste(k2, ((k % 8) * 110 + 5, (k // 8) * 110 + 5), k2)
if len(sys.argv) > 3: blad.save(sys.argv[3])
print('kolommen', kol, 'rijen', rij)
