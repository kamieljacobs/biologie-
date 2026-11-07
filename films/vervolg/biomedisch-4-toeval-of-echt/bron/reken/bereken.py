"""Rekenvoorbeeld 'Toeval of echt?' — alle getallen in de film. python3 bereken.py"""
import numpy as np
from scipy import stats
zonder = np.array([35,36,38,39,40,41,41,43,43,44])   # cm, zonder meststof
met    = np.array([39,41,41,41,42,43,44,44,46,49])   # cm, met meststof
for naam,x in [('zonder',zonder),('met',met)]:
    print(naam, 'n=%d gem=%.2f sd=%.3f se=%.3f min=%d max=%d'%(len(x),x.mean(),x.std(ddof=1),x.std(ddof=1)/np.sqrt(len(x)),x.min(),x.max()))
r = stats.ttest_ind(met, zonder)          # Student t-toets, gelijke varianties, tweezijdig
print('verschil', met.mean()-zonder.mean(), 't=%.3f df=%d p=%.4f'%(r.statistic, r.df, r.pvalue))
w = stats.ttest_ind(met, zonder, equal_var=False); print('Welch p=%.4f'%w.pvalue)
ci = r.confidence_interval(0.95); print('95%%-BI verschil: %.2f .. %.2f'%(ci.low, ci.high))
sp = np.sqrt(((len(met)-1)*met.var(ddof=1)+(len(zonder)-1)*zonder.var(ddof=1))/(len(met)+len(zonder)-2))
print('gepoolde sd %.3f, se verschil %.3f, effectgrootte d=%.2f'%(sp, sp*np.sqrt(2/10), 3/sp))
# permutatietoets: het toeval nadoen
rng = np.random.default_rng(2026); alle = np.concatenate([zonder, met]); N=100000; k=0
for _ in range(N):
    p = rng.permutation(alle); d = p[10:].mean()-p[:10].mean()
    if abs(d) >= 3 - 1e-9: k += 1
print('permutatie: %d van %d (p=%.4f) |verschil|>=3'%(k,N,k/N))
# exacte permutatie (alle 184756 verdelingen)
from itertools import combinations
tot=alle.sum(); cnt=0; n=0
for c in combinations(range(20),10):
    s=alle[list(c)].sum(); d=(tot-s)/10 - s/10; n+=1
    if abs(d)>=3-1e-9: cnt+=1
print('exact permutatie: %d/%d = %.4f'%(cnt,n,cnt/n))
# spreiding groot: zelfde gemiddelden, sd ~ 10
groot_z = np.array([25,29,33,37,40,42,45,47,50,52]); groot_m = groot_z + 3   # beeld s04: zonder 25-52, met 28-55 cm
print('groot: gem',groot_z.mean(),groot_m.mean(),'sd %.2f %.2f'%(groot_z.std(ddof=1),groot_m.std(ddof=1)),'p=%.3f'%stats.ttest_ind(groot_m,groot_z).pvalue)
# klein: sd ~ 1
klein_z=np.array([38,39,39,40,40,40,40,41,41,42]); klein_m=klein_z+3
print('klein: sd %.2f p=%.2e'%(klein_z.std(ddof=1), stats.ttest_ind(klein_m,klein_z).pvalue))
# hoeveel planten nodig? (power, tweezijdig alpha 0,05, d = 3/3 = 1)
def power(n, d=1.0, a=0.05):
    df=2*n-2; nc=d*np.sqrt(n/2); tc=stats.t.ppf(1-a/2,df)
    return 1-stats.nct.cdf(tc,df,nc)+stats.nct.cdf(-tc,df,nc)
for n in [3,5,10,17,20,30]: print('n=%d per groep: power %.2f'%(n,power(n)))
# simulatie power n=10 en n=17 (echt verschil 3 cm, sd 3)
for n in [3,10,17]:
    hits=sum(stats.ttest_ind(rng.normal(43,3,n),rng.normal(40,3,n)).pvalue<0.05 for _ in range(20000)); print('sim n=%d: %.3f'%(n,hits/20000))
# wiebelen van het gemiddelde: se = sd/sqrt(n)
for n in [3,10,40]: print('se bij n=%d: %.2f cm'%(n,3/np.sqrt(n)))
# drie planten per groep
print('n=3 voorbeeld p=%.3f'%stats.ttest_ind([42,43,44],[39,40,41]).pvalue)
# zonder effect: hoe vaak p<0,05 (20 toetsen)
print('kans minstens 1 van 20 toetsen p<0.05 zonder effect: %.2f'%(1-0.95**20))
# 95%-BI per groep (foutbalken) en overlap
for naam,x in [('zonder',zonder),('met',met)]:
    se=x.std(ddof=1)/np.sqrt(10); h=stats.t.ppf(0.975,9)*se; print('%s: gem %.1f, SE %.2f, 95%%-BI %.2f..%.2f (halve breedte %.2f)'%(naam,x.mean(),se,x.mean()-h,x.mean()+h,h))
print('python-regel: stats.ttest_ind(met, zonder).pvalue =', round(stats.ttest_ind(met, zonder).pvalue,3))
print('verwacht aantal p<0,05 bij 20000 genen zonder effect:', 20000*0.05)
