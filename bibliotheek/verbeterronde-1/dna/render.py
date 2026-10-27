import asyncio, sys, json, os
from playwright.async_api import async_playwright
# gebruik: render.py obj v1 v2 ...  -> obj/raw_<v>.png
async def main():
    obj=sys.argv[1]; vs=sys.argv[2:]
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1280,'height':720})
        for v in vs:
            errs=[]; pg.on('pageerror',lambda e: errs.append(str(e))); pg.on('console',lambda m: errs.append('console '+m.text) if m.type=='error' else None)
            await pg.goto(f'http://localhost:{os.environ["PORT"]}/harness.html?obj={obj}&v={v}'); await pg.wait_for_timeout(900)
            ok=await pg.evaluate('window.KLAAR||window.FOUT||0')
            await (await pg.query_selector('#c')).screenshot(path=f'{obj}/raw_{v}.png')
            print(obj,v,ok,errs[:3]); pg.remove_listener('pageerror',pg.listeners('pageerror')[0]) if False else None
            pg=await b.new_page(viewport={'width':1280,'height':720})
        await b.close()
asyncio.run(main())
