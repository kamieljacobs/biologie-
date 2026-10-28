import asyncio, sys, os
from playwright.async_api import async_playwright
# gebruik: PORT=… python3 render.py <obj> <v>[:<pal>][+mee1,mee2] …  -> <obj>/raw_<v>.png
async def main():
    obj=sys.argv[1]
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for arg in sys.argv[2:]:
            mee=''
            if '+' in arg: arg,mee=arg.split('+')
            v,pal=(arg.split(':')+[''])[:2]
            pg=await b.new_page(viewport={'width':1280,'height':720}); errs=[]
            pg.on('pageerror',lambda e: errs.append(str(e))); pg.on('console',lambda m: errs.append('console '+m.text) if m.type=='error' else None)
            q=f'obj={obj}&v={v}'+(f'&pal={pal}' if pal else '')+(f'&mee={mee}' if mee else '')
            await pg.goto(f'http://localhost:{os.environ["PORT"]}/bibliotheek/verbeterronde-2/dna/harness.html?{q}'); await pg.wait_for_timeout(1200)
            ok=await pg.evaluate('window.KLAAR||window.FOUT||0')
            await (await pg.query_selector('#c')).screenshot(path=f'{obj}/raw_{v}{"_"+pal if pal else ""}.png')
            print(obj,v,pal,ok,errs[:3]); await pg.close()
        await b.close()
asyncio.run(main())
