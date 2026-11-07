import json, subprocess, sys, os
sys.path.insert(0, 'eng')
import silalign
SRC='/home/claude/biologie-/films/dna-technieken/2-op-lengte-gesorteerd/gelfilm.mp3'
tl=json.load(open('olg_tl.json')); L=tl['lines']
CH={'H0':'Cold open','H1':'Hoofdstuk 1 — Hoe de gel werkt','H2':'Hoofdstuk 2 — Lengte aflezen','H3':'Hoofdstuk 3 — Profielen vergelijken','H4':'Hoofdstuk 4 — Controles en rare banden','H5':'Samenvatting — Kort gezegd'}
segs=[]; cuts=[]
for k,l in enumerate(L):
    sid='s%02d'%(k+1)
    gap = l['t0'] - (L[k-1]['t1'] if k else 0)
    lead = max(0.12, min(0.55, gap-0.45)) if k else min(0.5,l['t0'])
    a = l['t0']-lead
    nxt = L[k+1]['t0'] if k+1<len(L) else tl['duration']
    b = min(l['t1']+0.40, (l['t1']+nxt)/2 if nxt-l['t1']<0.8 else l['t1']+0.40)
    cuts.append((sid,a,b,l))
    subprocess.run(['ffmpeg','-v','error','-y','-ss','%.3f'%a,'-to','%.3f'%b,'-i',SRC,'-ac','1','-ar','44100','-c:a','libmp3lame','-b:a','96k','raw/%s.mp3'%sid],check=True)
    disp=l['text']; voice=l.get('say',disp)
    dw=disp.split(); vw=voice.split(); assert len(dw)==len(vw),(sid,dw,vw)
    rms,dur=silalign.load('raw/%s.mp3'%sid)
    out,m,K=silalign.align(vw,rms,dur)
    for o,d in zip(out,dw): o['text']=d
    json.dump({'words':out,'method':'silalign (gesneden uit gelfilm.mp3)','cut':[round(a,3),round(b,3)]},open('words/%s.json'%sid,'w'),ensure_ascii=False)
    segs.append({'id':sid,'kind':'speech','chapter':CH[l['ch']],'level':'basis','lines':[disp],'display':disp,'voice':voice,'src':{'take':'gelfilm.mp3','van':round(a,3),'tot':round(b,3),'regel':'%s r%d'%(l['ch'],l['i'])}})
    print(sid,'%.2f-%.2f'%(a,b),'dur %.2f'%dur,'K%d m%d'%(K,m), 'woord1 %.2f laatste %.2f'%(out[0]['start'],out[-1]['end']), 'verwacht %.2f-%.2f'%(l['t0']-a,l['t1']-a))
    if k==2: segs.append({'id':'tt','kind':'title','chapter':'Titel','level':'basis','text':'Op lengte gesorteerd'})
segs.append({'id':'eind','kind':'card','chapter':'Eindkaart','level':'basis','lines':['De gel sorteert DNA op lengte: hoe korter, hoe verder.','Met de marker lees je de lengte af; de lengte geeft de STR en het allel.','Kijk eerst naar de controles, vergelijk dan het spoor band voor band.']})
json.dump(segs,open('segments.json','w'),ensure_ascii=False,indent=1)
