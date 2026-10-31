"""python3 testvel.py <js-bestand met function vel(ctx,t)> <uit.png> [t]: tekent één 1920x1080-vel met de film-engine."""
import sys, os, asyncio
from playwright.async_api import async_playwright
E='bouw'; js=open(sys.argv[1]).read(); out=sys.argv[2]; t=float(sys.argv[3]) if len(sys.argv)>3 else 1.0
parts=[open(os.path.join(E,f)).read() for f in ['lib.js','lib_voeding.js','lib_hormonen.js','lib_cast.js']]
html='<!doctype html><meta charset=utf-8><style>'+open(os.path.join(E,'fonts.css')).read()+'body{margin:0}</style><canvas id=c width=1920 height=1080></canvas>'
for p in parts: html+='<script>'+p+'</script>'
html+='<script>'+open('scenes.js').read()+'</script><script>'+js+'\nconst ctx=document.getElementById("c").getContext("2d"); document.fonts.ready.then(()=>{ try{ vel(ctx,'+str(t)+'); }catch(e){ document.title="ERR "+e.message+" "+e.stack; } document.body.dataset.klaar=1; });</script>'
open('_testvel.html','w').write(html)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1920,'height':1080}); errs=[]
        pg.on('pageerror',lambda e: errs.append(str(e))); pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
        await pg.goto('file://'+os.path.abspath('_testvel.html')); await pg.wait_for_selector('body[data-klaar]')
        ti=await pg.title()
        if ti.startswith('ERR'): print(ti[:800])
        if errs: print('ERRORS',errs[:5])
        await (await pg.query_selector('#c')).screenshot(path=out); await b.close()
asyncio.run(main()); print('ok',out)
