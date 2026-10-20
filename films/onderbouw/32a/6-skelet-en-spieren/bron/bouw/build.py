import json, os
cfg=json.load(open('film.json',encoding='utf-8')); D='src/'
rd=lambda f: open(D+f,encoding='utf-8').read()
scenes='\n'.join(rd(f) for f in cfg['scene_files'])
open(D+'scenes.js','w',encoding='utf-8').write(scenes)
glos='const GLOSSARY='+json.dumps([dict(t=g[0],d=g[1],**({'vwo':True} if len(g)>2 and g[2] else {})) for g in cfg['glossary']],ensure_ascii=False)+';\n'
glos+='const FILMMETA='+json.dumps(cfg['meta'],ensure_ascii=False)+';\nconst MINI='+json.dumps(cfg['mini'],ensure_ascii=False)+';\n'
page=rd('page.html')
for k in ['TITLE','NR','SUB','DUUR','CHECK','DOCENT','FOOTER']:
    v=cfg[k.lower()]; v=open(v,encoding='utf-8').read() if isinstance(v,str) and v.endswith('.html') else str(v)
    page=page.replace('{{'+k+'}}',v)
page=page.replace('/*FILMDATA*/',json.dumps(json.load(open('filmdata.json')),ensure_ascii=False))
page=page.replace('/*LIB*/',rd('lib.js')).replace('/*SCENES*/',scenes).replace('/*PLAYER*/',glos+rd('player.js'))
nav='<nav class="sitenav nav"><a href="../../../../index.html#home">Biologie bij Kamiel</a><a href="../../../../index.html#kerndoelen" id="back" class="terug">← Terug naar Kerndoelen onderbouw</a></nav><script>document.getElementById("back").addEventListener("click",function(e){ try{ if(document.referrer && new URL(document.referrer).origin===location.origin && history.length>1){ e.preventDefault(); history.back(); } }catch(_){} });</script>'
page=page.replace('/*NAV*/',nav)
assert '{{' not in page, page[page.index('{{'):page.index('{{')+40]
os.makedirs('film',exist_ok=True); open('film/index.html','w',encoding='utf-8').write(page); print(len(page),'bytes')
