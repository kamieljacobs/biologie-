import json, os
D='src/'
# volgorde: castboek, hulpjes film 1 en 2, anatomie (vervangt bodyOrgans en het poppetje), scènes (21 okt 2026)
open(D+'scenes.js','w',encoding='utf-8').write('\n'.join(open(D+f,encoding='utf-8').read() for f in ['lib_cast.js','helpers1.js','helpers2.js','anatomie.js','scenes2b.js']))
page=open(D+'page.html',encoding='utf-8').read()
page=page.replace('/*FILMDATA*/', json.dumps(json.load(open('filmdata.json')),ensure_ascii=False))
page=page.replace('/*LIB*/', open(D+'lib.js',encoding='utf-8').read())
page=page.replace('/*SCENES*/', open(D+'scenes.js',encoding='utf-8').read())
page=page.replace('/*PLAYER*/', open(D+'player.js',encoding='utf-8').read())
nav='<nav class="sitenav nav"><a href="../../../../index.html#home">Biologie bij Kamiel</a><a href="../../../../index.html#kerndoelen" id="back" class="terug">← Terug naar Kerndoelen onderbouw</a></nav><script>document.getElementById("back").addEventListener("click",function(e){ try{ if(document.referrer && new URL(document.referrer).origin===location.origin && history.length>1){ e.preventDefault(); history.back(); } }catch(_){} });</script>'
os.makedirs('film',exist_ok=True)
open('film/index.html','w',encoding='utf-8').write(page.replace('/*NAV*/',nav))
print(len(page))
