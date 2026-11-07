import numpy as np, itertools
from scipy import stats
rng=np.random.default_rng(7)
found=0
for it in range(500000):
    a=np.round(rng.normal(40,3,10)); b=np.round(rng.normal(43,3,10))
    a[-1]+=400-a.sum(); b[-1]+=430-b.sum()
    sa,sb=a.std(ddof=1),b.std(ddof=1)
    p=stats.ttest_ind(b,a).pvalue
    if abs(sa-3)<0.1 and abs(sb-3)<0.1 and 0.035<p<0.045 and len(set(a))>6 and len(set(b))>6:
        print(sorted(a.astype(int).tolist()),sorted(b.astype(int).tolist()),round(sa,3),round(sb,3),round(p,4)); found+=1
        if found>4: break
