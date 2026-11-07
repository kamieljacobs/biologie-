# concat.py <filmmap>: alle takes achter elkaar met 2 s stilte -> stem/alles.mp3 + stem/offsets.json (voor één blinde Scribe-run)
import json,subprocess,sys,os
D=os.path.abspath(sys.argv[1]); segs=[s for s in json.load(open(f'{D}/segmenten.json')) if s['kind']=='speech']
dur=lambda f: float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
os.makedirs(f'{D}/tmpc',exist_ok=True); subprocess.run(['ffmpeg','-y','-loglevel','error','-f','lavfi','-i','anullsrc=r=44100:cl=mono','-t','2','-ar','44100','-ac','1',f'{D}/tmpc/sil.wav'],check=True)
lst=[];off={};t=0.0
for s in segs:
    f=f"{D}/film/audio/{s['id']}.mp3"; w=f"{D}/tmpc/{s['id']}.wav"; subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f,'-ar','44100','-ac','1',w],check=True)
    d=dur(w); off[s['id']]=[round(t,3),round(t+d,3)]; lst+= [w,f'{D}/tmpc/sil.wav']; t+=d+2.0
open(f'{D}/tmpc/l.txt','w').write(''.join(f"file '{x}'\n" for x in lst))
subprocess.run(['ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i',f'{D}/tmpc/l.txt','-b:a','96k',f'{D}/stem/alles.mp3'],check=True)
json.dump(off,open(f'{D}/stem/offsets.json','w'),indent=0); print(os.path.getsize(f'{D}/stem/alles.mp3'),'bytes', round(t),'s')
