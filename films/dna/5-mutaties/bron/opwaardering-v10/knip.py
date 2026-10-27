import json,subprocess,numpy as np,sys
D=json.load(open('filmdata.json'))
# id -> index of first kept word
KEEP={'n12':9,'n20':2,'n25':9,'n28':2}
res={}
for g in D['segments']:
  if g['id'] not in KEEP: continue
  i=KEEP[g['id']]; w=g['words']; prev,nxt=w[i-1],w[i]
  pcm=subprocess.run(['ffmpeg','-v','error','-i',g['id']+'.mp3','-f','f32le','-ac','1','-ar','16000','-'],capture_output=True).stdout
  x=np.frombuffer(pcm,dtype=np.float32); hop=160; n=len(x)//hop
  e=np.sqrt((x[:n*hop].reshape(n,hop)**2).mean(1))
  thr=max(0.002,np.sort(e)[int(n*0.9)]*0.03)
  # search window
  a=int((prev['e']-0.15)*100); b=int((nxt['s']+0.10)*100)
  seg=e[a:b]
  # onset: first frame after the quiet run where energy rises above thr*3, scanning backwards from b
  quiet=[k for k in range(len(seg)) if seg[k]<thr*2]
  # longest quiet run
  runs=[];st=None
  for k in range(len(seg)):
    q=seg[k]<thr*2
    if q and st is None: st=k
    if (not q or k==len(seg)-1) and st is not None: runs.append((st,k)); st=None
  r=max(runs,key=lambda r:r[1]-r[0]) if runs else None
  cut=(a+r[1])/100-0.04 if r else nxt['s']-0.05
  cut=max(cut,prev['e']+0.02)
  print(g['id'],'prev',prev['t'],prev['e'],'next',nxt['t'],nxt['s'],'run',r and ((a+r[0])/100,(a+r[1])/100),'cut',round(cut,3),'thr',thr)
  res[g['id']]=round(cut,3)
json.dump(res,open('cuts.json','w'))
