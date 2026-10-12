import json
page=open('src/page.html',encoding='utf-8').read()
page=page.replace('/*FILMDATA*/', json.dumps(json.load(open('filmdata.json')),ensure_ascii=False))
page=page.replace('/*LIB*/', open('src/lib.js',encoding='utf-8').read())
page=page.replace('/*SCENES*/', open('src/scenes.js',encoding='utf-8').read())
page=page.replace('/*PLAYER*/', open('src/player.js',encoding='utf-8').read())
nav='<nav class="nav"><a href="../../../index.html#cellen" id="back">← Terug</a><a href="../../../index.html">Hoofdpagina</a></nav><script>document.getElementById("back").addEventListener("click",function(e){ if(document.referrer && new URL(document.referrer).origin===location.origin && history.length>1){ e.preventDefault(); history.back(); } });</script>'
open('film/index.html','w',encoding='utf-8').write(page.replace('/*NAV*/',nav))
open('film/standalone.html','w',encoding='utf-8').write(page.replace('/*NAV*/',''))
print(len(page))
