# herorden.py <filmmap> <doel,doel,...>: zet het goede antwoord van vraag k op positie doel[k] (a/b/c) in script_v2.md + vragen.json
import re, json, sys, os
D=sys.argv[1]; doel=sys.argv[2].split(',')
s=open(f'{D}/script_v2.md',encoding='utf-8').read(); vq=json.load(open(f'{D}/vragen.json',encoding='utf-8')); keys=list(vq)
lines=s.split('\n'); k=0
for i,l in enumerate(lines):
    if l.startswith('[VRAAG]') and '---' in s[:s.find(l)]:
        opts=[re.sub(r'^\(?[a-d]\)\s*','',o.strip()) for o in l.replace('[VRAAG]','').split('·')]
        g='abc'.index(vq[keys[k]]['goed']); goed=opts.pop(g); t='abc'.index(doel[k]); opts.insert(t,goed)
        lines[i]='[VRAAG] '+' · '.join(f'({"abc"[j]}) {o}' for j,o in enumerate(opts)); vq[keys[k]]['goed']=doel[k]; k+=1
open(f'{D}/script_v2.md','w',encoding='utf-8').write('\n'.join(lines)); json.dump(vq,open(f'{D}/vragen.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
import shutil; shutil.copy(f'{D}/vragen.json',f'{D}/src/vragen.json'); print(k,'vragen herordend')
