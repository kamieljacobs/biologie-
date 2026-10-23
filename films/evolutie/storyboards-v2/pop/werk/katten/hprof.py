import json, numpy as np, cv2, sys
C=json.load(open('contouren_px.json'))
naam=sys.argv[1]; ys=list(map(int,sys.argv[2:]))
c=np.array(C[naam]['pts']); m=np.zeros((720,1280),np.uint8); cv2.fillPoly(m,[c.astype(np.int32)],1)
for y in ys:
    row=m[y]; runs=[];s=None
    for x in range(1280):
        if row[x] and s is None: s=x
        if not row[x] and s is not None: runs.append((s,x-1)); s=None
    print(naam,'y',y,runs)
