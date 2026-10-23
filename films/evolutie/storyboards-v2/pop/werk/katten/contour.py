import cv2, numpy as np, json
from seg import seg
res = {}
def doe(fn, namen, gronden):
    im,m,o,bg = seg(fn)
    o = sorted(o,key=lambda b:(b[1]//150,b[0]))
    for (x,y,w,h,a),naam in zip(o,namen):
        sub = np.zeros_like(m); sub[y:y+h, x:x+w] = m[y:y+h, x:x+w]
        cs,_ = cv2.findContours(sub, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        c = max(cs, key=cv2.contourArea)
        c = cv2.approxPolyDP(c, 0.8, True)[:,0,:].tolist()
        g = min(gronden, key=lambda gy: abs(gy-(y+h)))
        res[naam] = {'pts': c, 'grond': g, 'box': [int(x),int(y),int(w),int(h)], 'plaat': fn}
        print(naam, x,y,w,h, 'grond', g, 'npts', len(c))
doe('../galop-luipaard.png', ['galop1','galop2','galop3','galop4','galop5','galop6','galop7','galop8','l_staan','l_stap','l_liggen'], [183,395,648])
doe('../stap-leeuw-kat.png', ['leeuw1','leeuw2','leeuw3','leeuw4','leeuw5','leeuw6','leeuw7','leeuw8','tijger_stap','kat_stap','kat_zitten','kat_liggen'], [210,431,662])
json.dump(res, open('contouren_px.json','w'))
