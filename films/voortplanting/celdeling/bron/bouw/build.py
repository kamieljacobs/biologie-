import json
page=open('src/page.html',encoding='utf-8').read()
page=page.replace('/*FILMDATA*/', json.dumps(json.load(open('filmdata.json')),ensure_ascii=False))
page=page.replace('/*LIB*/', open('src/lib.js',encoding='utf-8').read())
page=page.replace('/*SCENES*/', open('src/lib_cast.js',encoding='utf-8').read()+'\n'+open('src/lib_anatomie.js',encoding='utf-8').read()+'\n'+open('src/scenes_lib.js',encoding='utf-8').read()+'\n'+open('src/chrom_lib.js',encoding='utf-8').read()+'\n'+open('src/scenes.js',encoding='utf-8').read())
page=page.replace('/*PLAYER*/', open('src/player.js',encoding='utf-8').read())
nav='<nav class="sitenav nav"><a href="../../../index.html#home">Biologie bij Kamiel</a><a href="../../../index.html#cellen" id="back" class="terug">← Terug naar Cellen</a></nav><script>document.getElementById("back").addEventListener("click",function(e){ try{ if(document.referrer && new URL(document.referrer).origin===location.origin && history.length>1){ e.preventDefault(); history.back(); } }catch(_){} });</script>'
open('film/index.html','w',encoding='utf-8').write(page.replace('/*NAV*/',nav))
open('film/standalone.html','w',encoding='utf-8').write(page.replace('/*NAV*/',''))
print(len(page))
