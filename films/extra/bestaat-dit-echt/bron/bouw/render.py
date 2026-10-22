"""python3 render.py <scenes.js> <outdir> id[:t] ...  — tekent losse sb-scènes uit SB (storyboard) naar PNG (1920x1080)."""
import sys, os, asyncio, json
from playwright.async_api import async_playwright
E = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'engine')
B = os.path.dirname(os.path.abspath(__file__))
scen, out = sys.argv[1], sys.argv[2]; specs = sys.argv[3:]; os.makedirs(out, exist_ok=True)
def rd(p): return open(p, encoding='utf-8').read()
head = open(os.path.join(E, 'scenes.js'), encoding='utf-8').read().split('\n')[:32]
js = '\n'.join([rd(os.path.join(E, f)) for f in ['lib.js', 'lib_hormonen.js', 'lib_cast.js']] + ['\n'.join(head), 'const SCENES={};', rd(os.path.join(E, 'teken.js')), rd(os.path.join(E, 'teken_dg0.js')), rd(os.path.join(B, 'teken_bd1.js')), rd(os.path.join(B, 'teken_bd1b.js')), rd(scen)])
html = f"<html><head><style>{rd(os.path.join(E,'fonts.css'))} body{{margin:0;background:#000}}</style></head><body><canvas id=c width=1920 height=1080></canvas><script>{js}\nwindow.teken=(id,t)=>{{const ctx=document.getElementById('c').getContext('2d');ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,1920,1080);SB[id](ctx,t);return true;}};window.ids=()=>Object.keys(SB);</script></body></html>"
open(os.path.join(B, '_r.html'), 'w', encoding='utf-8').write(html)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        await pg.goto('file://' + os.path.join(B, '_r.html')); await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(300)
        sp = specs if specs != ['alle'] else await pg.evaluate('ids()')
        for s in sp:
            sid, t = (s.split(':') + ['0'])[:2]
            try: await pg.evaluate(f'teken({json.dumps(sid)},{float(t)})')
            except Exception as e: print('FOUT', sid, e); continue
            await (await pg.query_selector('#c')).screenshot(path=os.path.join(out, f'{sid}.png'))
        if errs: print('ERRORS', errs[:5])
        await b.close()
asyncio.run(main()); print('klaar')
