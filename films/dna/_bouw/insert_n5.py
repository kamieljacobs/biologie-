# Afl. 4, n5: insert the extra line (Kamiel 12 okt 2026: "zeg het ook in de tekst") after
# "Aan de andere kant draagt het tRNA één soort aminozuur." Run AFTER splice_trna.py (works on its output).
import json,subprocess,numpy as np
SR=44100; D='afl4/v3'
def load(f): return np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',f,'-f','f32le','-ac','1','-ar',str(SR),'-']),dtype=np.float32).copy()
def save(x,f): subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(SR),'-ac','1','-i','-','-ar',str(SR),'-b:a','96k',f],input=x.astype(np.float32).tobytes(),check=True)
T=json.load(open(f'{D}/scribe_spliced.json')); ws=T['n5']['words']
i=next(j for j,w in enumerate(ws) if w['text']=='aminozuur.' and ws[j+1]['text']=='Er')
t0=ws[i]['end']; t1=ws[i+1]['start']; cut=(t0+t1)/2
x=load(f'{D}/norm/n5.mp3'); ins=load(f'{D}/insert/n5_ins.mp3')
e=np.convolve(ins**2,np.ones(441)/441,'same'); idx=np.where(e>e.max()*0.002)[0]; a=max(0,idx[0]-441); b=min(len(ins),idx[-1]+2205)
ins=ins[a:b]; lead=a/SR
gap=np.zeros(int(0.3*SR)); c=int(cut*SR)
y=np.concatenate([x[:c],gap,ins,gap,x[c:]]); save(y,f'{D}/norm/n5.mp3')
off=cut+0.3-lead; sh=0.6+len(ins)/SR
new=[dict(w,start=round(w['start']+off,3),end=round(w['end']+off,3),type='word') for w in json.load(open(f'{D}/insert/n5_ins_words.json'))]
for w in ws[i+1:]: w['start']=round(w['start']+sh,3); w['end']=round(w['end']+sh,3)
T['n5']['words']=ws[:i+1]+new+ws[i+1:]
json.dump(T,open(f'{D}/scribe_spliced.json','w'),ensure_ascii=False)
print('ingevoegd op',round(cut,2),'s; +',round(sh,2),'s')
