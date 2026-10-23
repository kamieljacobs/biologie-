import cv2, numpy as np, json, sys
def seg(fn):
    im = cv2.imread(fn); h,w,_ = im.shape
    bg = np.median(im[5:15,5:200].reshape(-1,3),axis=0)
    d = np.linalg.norm(im.astype(float)-bg,axis=2)
    m = (d>28).astype(np.uint8)
    # remove thin horizontal ground lines: open vertically
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT,(3,5)))
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((5,5),np.uint8))
    n,lab,st,cen = cv2.connectedComponentsWithStats(m)
    out=[]
    for i in range(1,n):
        x,y,ww,hh,a = st[i]
        if a<1500: continue
        out.append((x,y,ww,hh,a))
    return im,m,out,bg
for fn in sys.argv[1:]:
    im,m,o,bg = seg(fn); print(fn,bg)
    for b in sorted(o,key=lambda b:(b[1]//150,b[0])): print('  ',b)
