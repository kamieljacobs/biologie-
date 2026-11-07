"""python3 render.py <uitmap> [keys...]  — tekent keyframes uit keyframes.js naar webp/png"""
import sys, os, asyncio
from playwright.async_api import async_playwright
H=os.path.dirname(os.path.abspath(__file__)); out=sys.argv[1]; keys=sys.argv[2:]; os.makedirs(out,exist_ok=True)
fonts=open(os.path.join(H,'../eng/fonts.css')).read()
src=open(os.path.join(H,'harness.html')).read().replace('/*FONTS*/',fonts); open(os.path.join(H,'_h.html'),'w').write(src)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1920,'height':1080}); errs=[]
        pg.on('pageerror',lambda e: errs.append(str(e))); pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
        await pg.goto('file://'+os.path.join(H,'_h.html')); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(500)
        ks=keys or await pg.evaluate("lijst()")
        for k in ks:
            t=0
            if '@' in k: k,t=k.split('@'); t=float(t)
            try: await pg.evaluate(f"teken({k!r},{t})")
            except Exception as e: print('FOUT',k,str(e)[:300]); continue
            await (await pg.query_selector('#c')).screenshot(path=os.path.join(out,k+'.png'))
        if errs: print('ERRORS',errs[:6])
        await b.close()
asyncio.run(main()); print('klaar')
