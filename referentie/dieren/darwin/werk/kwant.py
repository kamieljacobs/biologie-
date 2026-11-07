import cv2, numpy as np, sys, json
from seg import seg
def hx(h): h=h.lstrip('#'); return np.array([int(h[4:6],16),int(h[2:4],16),int(h[0:2],16)],float)
def kwant(fn, box, pal, out, z=3):
    im,m,o,bg,rows = seg(fn); x,y,w,h = box
    sub = im[y:y+h,x:x+w].astype(float); mm = m[y:y+h,x:x+w]>0
    P = np.stack([hx(v) for v in pal.values()]); d = np.linalg.norm(sub[:,:,None,:]-P[None,None],axis=3); cls = d.argmin(axis=2)
    vis = P[cls].astype(np.uint8); vis[~mm] = (255,255,255)
    cv2.imwrite(out, cv2.resize(vis,(w*z,h*z),interpolation=cv2.INTER_NEAREST))
if __name__=='__main__':
    fn, box, pal, out = sys.argv[1], tuple(map(int,sys.argv[2].split(','))), json.loads(sys.argv[3]), sys.argv[4]
    kwant(fn, box, pal, out)
