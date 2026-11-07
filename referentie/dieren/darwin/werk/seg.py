import cv2, numpy as np, sys
def seg(fn, thr=28):
    im = cv2.imread(fn); bg = np.median(im[5:15,5:200].reshape(-1,3),axis=0)
    d = np.linalg.norm(im.astype(float)-bg,axis=2); m=(d>thr).astype(np.uint8)
    # grondlijnen: rijen die over >60% donker zijn
    r = m.mean(axis=1)>0.5; rows=[]
    i=0
    while i<len(r):
        if r[i]:
            j=i
            while j<len(r) and r[j]: j+=1
            if j-i<=3: rows+=list(range(i-1,j+1))
            i=j
        else: i+=1
    m2 = m.copy(); m2[rows]=0
    m2 = cv2.morphologyEx(m2, cv2.MORPH_CLOSE, np.ones((3,3),np.uint8))
    n,lab,st,cen = cv2.connectedComponentsWithStats(m2)
    out=[tuple(int(v) for v in st[i]) for i in range(1,n) if st[i][4]>800]
    return im,m2,sorted(out,key=lambda b:(b[1]//200,b[0])),bg,rows
if __name__=='__main__':
    for fn in sys.argv[1:]:
        im,m,o,bg,rows=seg(fn); print(fn,bg,'grondrijen',rows)
        for b in o: print('  ',b)
