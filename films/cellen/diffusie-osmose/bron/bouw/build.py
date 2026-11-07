import json
# Versie 2.0 (29 okt 2026): scèneblok = lib_cast.js (actuele castboek-kopie) + voeding_deel.js (V, hexagon, bead uit lib_voeding.js)
# + lib_bio_deel.js (uittreksel uit bibliotheek/lib_bio.js, zie bio_deel.py) + scenes_lib.js + scenes_mol.js + scenes.js
page=open('src/page.html',encoding='utf-8').read()
page=page.replace('/*FILMDATA*/', json.dumps(json.load(open('filmdata.json')),ensure_ascii=False))
page=page.replace('/*LIB*/', open('src/lib.js',encoding='utf-8').read())
blok='\n'.join(open('src/'+f,encoding='utf-8').read() for f in ['lib_cast.js','voeding_deel.js','lib_bio_deel.js','scenes_lib.js','scenes_mol.js','scenes.js'])
page=page.replace('/*SCENES*/', blok)
page=page.replace('/*PLAYER*/', open('src/player.js',encoding='utf-8').read())
nav='<nav class="sitenav nav"><a href="../../../index.html#home">Biologie bij Kamiel</a><a href="../../../index.html#cellen" id="back" class="terug">← Terug naar Cellen</a></nav><script>document.getElementById("back").addEventListener("click",function(e){ try{ if(document.referrer && new URL(document.referrer).origin===location.origin && history.length>1){ e.preventDefault(); history.back(); } }catch(_){} });</script>'
open('film/index.html','w',encoding='utf-8').write(page.replace('/*NAV*/',nav))
open('film/standalone.html','w',encoding='utf-8').write(page.replace('/*NAV*/',''))
print(len(page))
