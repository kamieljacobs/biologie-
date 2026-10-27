# gebruik: python3 render.py PORT obj:variant:uit.png ...
import asyncio, sys, os
from playwright.async_api import async_playwright
W=os.path.dirname(os.path.abspath(__file__)); P=sys.argv[1]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); 
        for job in sys.argv[2:]:
            obj,var,uit=job.split(':')
            pg=await b.new_page(viewport={'width':1280,'height':720}); errs=[]
            pg.on('pageerror',lambda e: errs.append(str(e)))
            pg.on('console',lambda m: errs.append('console:'+m.text) if m.type=='error' else None)
            async def route(r):
                path=r.request.url.split('/__w/')[1].split('?')[0]
                await r.fulfill(path=os.path.join(W,path))
            await pg.route('**/__w/**',route)
            await pg.goto(f'http://localhost:{P}/__w/harness.html?v={obj}/{var}.js&s={obj}/scene.js'); await pg.wait_for_timeout(700)
            f=await pg.evaluate('window.FOUT||""')
            await (await pg.query_selector('#c')).screenshot(path=os.path.join(W,obj,uit))
            print(job,'OK' if not f and not errs else ('FOUT '+f[:300]+' '+str(errs)[:300]))
            await pg.close()
        await b.close()
asyncio.run(main())
