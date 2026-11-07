# Overtrekken van de vlakke rij op de referentieplaten: per dier omtrek + toonvlakken (k-means) -> polygonen in cm (oorsprong midden onder, y omhoog negatief)
import cv2, numpy as np, json, sys
def trek(src, box, pxm, k, naam, eps=0.8, minA=60, grond=None):
    im = cv2.imread(src)[box[1]:box[3], box[0]:box[2]].copy()
    bg = np.array([222,222,222]); bgc = np.median(np.concatenate([im[0],im[-1],im[:,0],im[:,-1]]),axis=0); d = np.linalg.norm(im.astype(int) - bgc.astype(int), axis=2)
    mask = (d > 18).astype(np.uint8)*255
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((3,3),np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(mask)
    i = 1 + np.argmax(st[1:, cv2.CC_STAT_AREA]); mask = ((lab == i)*255).astype(np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((5,5),np.uint8))
    ys, xs = np.nonzero(mask); y0 = ys.max() if grond is None else grond - box[1]; xm = (xs.min()+xs.max())/2
    def poly(m, e):
        cs,_ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE); out=[]
        for c in cs:
            if cv2.contourArea(c) < minA: continue
            a = cv2.approxPolyDP(c, e, True)[:,0,:]
            out.append([[round((x-xm)/pxm*100,1), round((y-y0)/pxm*100,1)] for x,y in a])
        return out
    res = {'ref': [box[0]+float(xm), box[1]+float(y0)], 'pxm': pxm, 'omtrek': poly(mask, eps), 'breed_cm': round((xs.max()-xs.min())/pxm*100), 'hoog_cm': round((y0-ys.min())/pxm*100)}
    px = im[mask>0].astype(np.float32)
    crit = (cv2.TERM_CRITERIA_EPS+cv2.TERM_CRITERIA_MAX_ITER, 30, 1.0)
    _, lb, cen = cv2.kmeans(px, k, None, crit, 4, cv2.KMEANS_PP_CENTERS)
    full = np.full(mask.shape, -1); full[mask>0] = lb[:,0]
    order = np.argsort(cen.sum(1))  # donker -> licht
    res['tonen'] = []
    for r, ci in enumerate(order):
        m = ((full == ci)*255).astype(np.uint8); m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3,3),np.uint8))
        res['tonen'].append({'rang': r, 'rgb': [int(v) for v in cen[ci][::-1]], 'vlakken': poly(m, eps*1.2)})
    print(naam, res['breed_cm'], res['hoog_cm'], [len(t['vlakken']) for t in res['tonen']], sum(len(p) for p in res['omtrek']), file=sys.stderr)
    return res
R = {}
V='/root/evo2/ref9/vogels.png'; Fo='/root/evo2/ref9/fossielen.png'
R['nandoeGroot'] = trek(V, (10,340,300,660), 200, 3, 'nandoe groot')
R['nandoeKlein'] = trek(V, (270,405,480,660), 200, 3, 'nandoe klein')
R['schildKoepel'] = trek(V, (465,455,795,650), 200, 3, 'koepel')
R['schildZadel'] = trek(V, (790,395,1090,650), 200, 3, 'zadel')
R['spotlijster'] = trek(V, (1115,515,1255,615), 200, 3, 'spot')
R['megatherium'] = trek(Fo, (5,370,590,640), 91, 3, 'mega')
R['glyptodon'] = trek(Fo, (565,440,915,640), 91, 3, 'glyp')
R['gordeldier'] = trek(Fo, (930,565,1120,640), 91, 3, 'gordel')
json.dump(R, open('/root/evo2/ref9/trek.json','w'))
R['luiaard'] = trek(Fo, (1085,425,1280,600), 91, 3, 'luiaard')
json.dump(R, open('/root/evo2/ref9/trek.json','w'))
