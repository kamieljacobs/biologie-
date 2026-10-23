import json, numpy as np, cv2, sys
C=json.load(open('contouren_px.json'))
naam=sys.argv[1]; xs=range(int(sys.argv[2]),int(sys.argv[3]),int(sys.argv[4]))
c=np.array(C[naam]['pts']); m=np.zeros((720,1280),np.uint8); cv2.fillPoly(m,[c.astype(np.int32)],1)
for x in xs:
    runs=[];s=None
    for y in range(720):
        if m[y,x] and s is None: s=y
        if not m[y,x] and s is not None: runs.append((s,y-1)); s=None
    print(x,runs)
