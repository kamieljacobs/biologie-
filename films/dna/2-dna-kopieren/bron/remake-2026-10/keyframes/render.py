import sys, os, asyncio
from playwright.async_api import async_playwright
D = os.path.dirname(os.path.abspath(__file__)); out = sys.argv[1]; names = sys.argv[2:]
libs = ['lib.js','lib_voeding.js','lib_hormonen.js','lib_cast.js','kop.js','lib_bio.js','lib_micro_evo.js','teken_dna2.js','kf_scenes.js']
html = '<!doctype html><html><head><meta charset="utf-8"><style>' + open(os.path.join(D,'fonts.css')).read() + 'body{margin:0;background:#000}</style></head><body><canvas id="c" width="1920" height="1080"></canvas>'
html += ''.join('<script>' + open(os.path.join(D,f)).read() + '</script>' for f in libs)
html += '<script>window.draw=(n)=>{const ctx=document.getElementById("c").getContext("2d");ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;KF[n](ctx);return true};window.names=()=>Object.keys(KF);</script></body></html>'
open(os.path.join(D,'kf.html'),'w').write(html)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width':1920,'height':1080}); errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: m.type=='error' and errs.append(m.text))
        await pg.goto('file://'+os.path.join(D,'kf.html')); await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(500)
        ns = names or await pg.evaluate('names()')
        os.makedirs(out, exist_ok=True)
        for n in ns:
            try: await pg.evaluate(f'draw({n!r})')
            except Exception as e: print('FOUT', n, str(e)[:300]); continue
            await (await pg.query_selector('#c')).screenshot(path=os.path.join(out, n+'.png'))
        if errs: print('ERRORS', errs[:5])
        await b.close()
asyncio.run(main())
from PIL import Image
for n in os.listdir(out):
    if n.endswith('.png'):
        im = Image.open(os.path.join(out,n)).convert('RGB'); im = im.resize((960,540), Image.LANCZOS); im.save(os.path.join(out,n[:-4]+'.webp'), quality=82); os.remove(os.path.join(out,n))
print('klaar')
