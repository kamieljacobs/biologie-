# Keyframes/testvel voor de Voeding-reeks: python3 render.py <keyframes.js> <uitmap> [ids...]
import asyncio, os, sys
from playwright.async_api import async_playwright
E_='/home/claude/hw/engine'; V='/home/claude/hw/vd'
def rd(p): return open(p,encoding='utf-8').read()
kf, uit = sys.argv[1], sys.argv[2]; ids = sys.argv[3:]
scn = rd(E_+'/scenes.js').split('\n')[:32]
extra = [rd(p) for p in os.environ.get('VD_EXTRA','').split(':') if p]
js = '\n'.join([rd(E_+'/lib.js'), rd(E_+'/lib_hormonen.js'), rd('/home/claude/biologie-/personages/lib_cast.js'), rd(V+'/cast_vd.js'), rd(E_+'/lib_bio.js'), rd(E_+'/lib_voeding.js'), '\n'.join(scn), 'const SCENES={};', rd(E_+'/brein.js'), rd(E_+'/teken.js'), rd(E_+'/extra.js')] + extra + [rd(kf)])
fonts = rd(E_+'/fonts.css')
html = f"<!doctype html><meta charset=utf-8><style>{fonts}body{{margin:0;background:#000}}</style><canvas id=c width=1920 height=1080></canvas><script>{js}</script>"
os.makedirs(uit, exist_ok=True); open(uit+'/kf.html','w').write(html)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width':1920,'height':1080}); errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://'+uit+'/kf.html'); await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(400)
        lijst = ids or await pg.evaluate('Object.keys(KF)')
        for i in lijst:
            r = await pg.evaluate(f"()=>{{try{{const c=document.getElementById('c').getContext('2d'); c.setTransform(1,0,0,1,0,0); c.globalAlpha=1; c.clearRect(0,0,1920,1080); KF['{i}'](c); return 'ok'}}catch(e){{return String(e)+' '+e.stack}}}}")
            if r!='ok': print(i, r[:400]); continue
            await (await pg.query_selector('#c')).screenshot(path=f'{uit}/{i}.png')
        if errs: print('ERR', errs[:3])
        await b.close()
asyncio.run(main())
