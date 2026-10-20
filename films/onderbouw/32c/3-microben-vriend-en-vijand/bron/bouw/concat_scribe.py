# concat_scribe.py <filmmap>: film/audio/*.mp3 -> stem/alles.mp3 (2 s stilte ertussen) + stem/offsets.json
import json,subprocess,sys,os,glob
D=os.path.abspath(sys.argv[1]); fs=sorted(glob.glob(f'{D}/film/audio/s*.mp3')); GAP=2.0
os.makedirs(f'{D}/tmpwav',exist_ok=True); off={}; t=0; lst=[]
subprocess.run(['ffmpeg','-y','-loglevel','error','-f','lavfi','-i','anullsrc=r=44100:cl=mono','-t',str(GAP),f'{D}/tmpwav/gap.wav'],check=True)
for f in fs:
    k=os.path.basename(f)[:-4]; w=f'{D}/tmpwav/{k}.wav'
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f,'-ac','1','-ar','44100',w],check=True)
    d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',w]))
    off[k]=[round(t,3),round(t+d,3)]; t+=d+GAP; lst+= [w,f'{D}/tmpwav/gap.wav']
open(f'{D}/tmpwav/list.txt','w').write(''.join(f"file '{x}'\n" for x in lst))
subprocess.run(['ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i',f'{D}/tmpwav/list.txt','-b:a','96k',f'{D}/stem/alles.mp3'],check=True)
json.dump(off,open(f'{D}/stem/offsets.json','w'),indent=0); print(len(off),'takes',round(t),'s', os.path.getsize(f'{D}/stem/alles.mp3'))
