# polygonen -> JS-data (cm, oorsprong midden onder), met schaalcorrectie naar de bronmaat
import cv2, numpy as np, json
R = json.load(open('/root/evo2/ref9/trek.json'))
# doellengte (cm) per dier: tekstbron wint van de AI-plaat
DOEL = {'nandoeGroot': ('hoog', 150), 'nandoeKlein': ('hoog', 97), 'schildKoepel': ('breed', 150), 'schildZadel': ('breed', 140),
        'megatherium': ('breed', 600), 'glyptodon': ('breed', 380), 'gordeldier': ('breed', 48), 'spotlijster': ('breed', 25), 'luiaard': ('hoog', 75)}
out = {}
for k, (as_, cm) in DOEL.items():
    r = R[k]; f = cm / r['breed_cm' if as_ == 'breed' else 'hoog_cm']
    area = lambda p: abs(cv2.contourArea(np.array(p, np.float32)))
    om = max(r['omtrek'], key=area); A = area(om)
    lagen = []
    for t in r['tonen']:
        ps = [p for p in t['vlakken'] if len(p) > 3 and area(p) > A * 0.006]
        lagen.append([[[round(x * f, 1), round(y * f, 1)] for x, y in p] for p in ps])
    out[k] = {'om': [[round(x * f, 1), round(y * f, 1)] for x, y in om], 'lagen': lagen, 'rgb': [t['rgb'] for t in r['tonen']], 'f': round(f, 3), 'ref': r['ref'], 'k': round(f*100/r['pxm'], 4)}
    print(k, round(f, 2), len(om), [len(l) for l in lagen])
open('/root/evo2/ref9/vormen.js', 'w').write('const V9 = ' + json.dumps(out, separators=(',', ':')) + ';\n')
