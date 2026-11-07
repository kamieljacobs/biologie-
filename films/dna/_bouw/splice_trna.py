# Make every spoken "tRNA" in ep4 sound identical: paste one approved take (Kamiel, 12 okt 2026: nr 2 = n5 ≈ 7.6 s)
# over every other occurrence. Boundaries are found with MFCC subsequence-DTW against that take; plurals keep their own 's'.
# Originals: afl4/v3/pre_splice/. Output: afl4/v3/norm/<id>.mp3 + afl4/v3/splice.json (time map for word timings).
import json,subprocess,numpy as np,librosa
SR=44100; D='afl4/v3'; HOP=220
def load(f): return np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',f,'-f','f32le','-ac','1','-ar',str(SR),'-']),dtype=np.float32).copy()
def save(x,f): subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(SR),'-ac','1','-i','-','-ar',str(SR),'-b:a','96k',f],input=x.astype(np.float32).tobytes(),check=True)
def mf(x): m=librosa.feature.mfcc(y=x,sr=SR,n_mfcc=20,hop_length=HOP,n_fft=1024); return (m-m.mean(1,keepdims=True))/ (m.std(1,keepdims=True)+1e-6)
T=json.load(open(f'{D}/scribe.json'))
def words(k): return [w for w in T[k]['words'] if w['text'].lower().startswith('tee-er')]
def rms(x,t): a=int(t*SR); return float(np.sqrt(np.mean(x[a:a+441]**2)))
def quiet_near(x,t,lo,hi):  # time of lowest 10-ms energy in [t+lo,t+hi]
    ts=np.arange(t+lo,t+hi,0.005); return float(ts[np.argmin([rms(x,u) for u in ts])])
src=load(f'{D}/pre_splice/n5.mp3')
R0=quiet_near(src,7.6,-0.08,0.02); R1=8.27
REF=src[int(R0*SR):int(R1*SR)]; MR=mf(REF)
def fadeio(x,a=0.006,b=0.025):
    x=x.copy(); na=int(a*SR); nb=int(b*SR); x[:na]*=np.linspace(0,1,na); x[-nb:]*=np.linspace(1,0,nb); return x
last_cost=0
def openend(A,B):  # DTW with fixed start, free end in B; returns end frame of the best path
    global last_cost
    N,M=A.shape[1],B.shape[1]; C=np.sqrt(((A[:,:,None]-B[:,None,:])**2).sum(0)); Dm=np.full((N+1,M+1),np.inf); Dm[0,0]=0
    for i in range(1,N+1):
        for j in range(1,M+1): Dm[i,j]=C[i-1,j-1]+min(Dm[i-1,j],Dm[i,j-1],Dm[i-1,j-1])
    js=np.arange(int(0.7*N),min(M,int(1.8*N))+1); sc=Dm[N,js]/(N+js); j=js[np.argmin(sc)]; last_cost=float(sc.min()); return j
out={}; report=[]
for k in ['n5','n6','n23']:
    x=load(f'{D}/pre_splice/{k}.mp3'); segs=[]; pos=0; edits=[]
    for i,w in enumerate(words(k)):
        if k=='n5' and i==1: continue
        w0=max(0,w['start']-0.2); w1=w['end']+0.25; Y=x[int(w0*SR):int(w1*SR)]
        s=quiet_near(x,w['start'],-0.1,0.06)          # the closure before the t: a clean cut point
        Y=x[int(s*SR):int((s+1.6)*SR)]; e=s+openend(MR,mf(Y))*HOP/SR
        cost=last_cost
        if not w['text'].lower().rstrip('.,?').endswith("'s"):   # sentence-final: cut through the fading vowel to the pause
            for u in np.arange(e,e+0.2,0.005):
                if rms(x,u)<0.008: e=float(u); break
        a=int(s*SR); b=int(e*SR)
        rep=np.concatenate([np.zeros(int(0.005*SR)),fadeio(REF)])
        # blend: fade the original out over 25 ms after the cut so the next sound starts softly
        tail=x[b:b+int(0.02*SR)]*np.linspace(0,1,int(0.02*SR))
        segs+=[x[pos:a],rep,tail]; pos=b+int(0.02*SR)
        edits.append({'s':round(s,3),'e':round(e+0.02,3),'new':round(len(rep)/SR+0.02,4)})
        report.append((k,w['text'],round(s,2),round(e,2),round(cost,2)))
    segs.append(x[pos:]); y=np.concatenate(segs); save(y,f'{D}/norm/{k}.mp3'); out[k]=edits
# remap Scribe word times onto the spliced audio
def remap(t,ed):
    sh=0
    for d in ed:
        if t<d['s']: break
        if t<=d['e']: return d['s']+sh+(t-d['s'])*d['new']/(d['e']-d['s'])
        sh+=d['new']-(d['e']-d['s'])
    return t+sh
T2=json.loads(json.dumps(T))
for k,ed in out.items():
    for w in T2[k]['words']: w['start']=round(remap(w['start'],ed),3); w['end']=round(remap(w['end'],ed),3)
json.dump(T2,open(f'{D}/scribe_spliced.json','w'),ensure_ascii=False)
json.dump({'ref':[round(R0,3),R1],'edits':out},open(f'{D}/splice.json','w'),indent=1)
for r in report: print(*r)
