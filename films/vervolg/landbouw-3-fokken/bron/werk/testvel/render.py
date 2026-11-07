import asyncio, os, sys
from playwright.async_api import async_playwright
E_='/home/claude/hw/engine'; L='/home/claude/hw/lb3'
def rd(p): return open(p,encoding='utf-8').read()
scn = rd(E_+'/scenes.js').split('\n')[:32]
js = '\n'.join([rd(E_+'/lib.js'), rd(E_+'/lib_hormonen.js'), rd(L+'/lib_cast.js'), rd(E_+'/lib_bio.js'), '\n'.join(scn), rd(E_+'/extra.js'),
  rd('/home/claude/biologie-/bibliotheek/dieren/lib_evo.js') if False else 'const EVO={a1:"#5BA4C9",a2:"#C9A35C"};',
  rd(L+'/lib_micro_evo_min.js'), rd(L+'/hoefpop.js'), rd(L+'/teken_lb3.js'), rd(L+'/testvel/keyframes.js')])
fonts = rd(E_+'/fonts.css') if os.path.exists(E_+'/fonts.css') else ''
html = f"<!doctype html><meta charset=utf-8><style>{fonts}body{{margin:0;background:#000}}</style><canvas id=c width=1920 height=1080></canvas><script>{js}</script>"
open(L+'/testvel/kf.html','w').write(html)
ids = sys.argv[1:] or ['d%d'%i for i in range(1,11)]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width':1920,'height':1080}); errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://'+L+'/testvel/kf.html'); await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(500)
        os.makedirs(L+'/testvel/png', exist_ok=True)
        for i in ids:
            r = await pg.evaluate(f"()=>{{try{{const c=document.getElementById('c').getContext('2d'); c.setTransform(1,0,0,1,0,0); c.globalAlpha=1; c.clearRect(0,0,1920,1080); KF['{i}'](c); return 'ok'}}catch(e){{return String(e)+' '+e.stack}}}}")
            if r!='ok': print(i, r); continue
            await (await pg.query_selector('#c')).screenshot(path=f'{L}/testvel/png/{i}.png')
        if errs: print('ERR', errs[:3])
        await b.close()
asyncio.run(main())
