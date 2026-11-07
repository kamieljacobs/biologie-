import numpy as np
from scipy import stats
from itertools import combinations
C=np.array(list(combinations(range(20),10)))
rng=np.random.default_rng(11); f=0
for it in range(300000):
    a=np.round(rng.normal(40,3,10)); b=np.round(rng.normal(43,3,10))
    a[-1]+=400-a.sum(); b[-1]+=430-b.sum()
    sa,sb=a.std(ddof=1),b.std(ddof=1)
    if not(abs(sa-3)<0.12 and abs(sb-3)<0.12 and len(set(a))>6 and len(set(b))>6): continue
    p=stats.ttest_ind(b,a).pvalue
    if not 0.036<p<0.044: continue
    al=np.concatenate([a,b]); s=al[C].sum(1); d=(al.sum()-s)/10-s/10
    pe=(np.abs(d)>=3-1e-9).mean()
    if 0.036<pe<0.044:
        print(sorted(a.astype(int).tolist()),sorted(b.astype(int).tolist()),round(sa,2),round(sb,2),round(p,4),round(pe,4)); f+=1
        if f>5: break
