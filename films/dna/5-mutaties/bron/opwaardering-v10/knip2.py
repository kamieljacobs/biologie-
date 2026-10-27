import json,subprocess,base64
D=json.load(open('filmdata.json'))
CUT={'n12':(3.01,9),'n20':(1.72,2),'n25':(3.22,9),'n28':(1.06,2)}
log={}
for g in D['segments']:
  if g['id'] not in CUT: continue
  c,i=CUT[g['id']]
  subprocess.run(['ffmpeg','-v','error','-y','-ss',str(c),'-i',g['id']+'.mp3','-af','afade=t=in:d=0.012','-c:a','libmp3lame','-b:a','96k','-ar','44100','-ac','1',g['id']+'_knip.mp3'],check=True)
  dur_in=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',g['id']+'.mp3'],capture_output=True,text=True).stdout)
  dur_out=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',g['id']+'_knip.mp3'],capture_output=True,text=True).stdout)
  weg=[x['t'] for x in g['words'][:i]]
  w=g['words'][i:]
  for x in w: x['s']=round(max(0,x['s']-c),3); x['e']=round(max(0.01,x['e']-c),3)
  w[0]['t']=w[0]['t'][0].upper()+w[0]['t'][1:]
  g['words']=w
  b=[round(max(0,x-c),3) for x in g['bounds']]
  if g['id'] in('n12','n25'): b[0]=0.0
  log[g['id']]={'cut_s':c,'weg':' '.join(weg),'bounds_oud':g['bounds'],'bounds_nieuw':b,'dur_oud':g['dur'],'audio_in':dur_in,'audio_uit':dur_out}
  g['bounds']=b; g['dur']=round(g['dur']-(dur_in-dur_out),3); log[g['id']]['dur_nieuw']=g['dur']
  g['audio']='data:audio/mpeg;base64,'+base64.b64encode(open(g['id']+'_knip.mp3','rb').read()).decode()
json.dump(D,open('filmdata_nieuw.json','w'),ensure_ascii=False)
json.dump(log,open('knip_log.json','w'),indent=1,ensure_ascii=False); print(json.dumps(log,indent=1,ensure_ascii=False))
